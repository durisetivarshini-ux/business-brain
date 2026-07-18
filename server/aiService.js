import { GoogleGenAI } from '@google/genai';
import { toolDeclarations, executeTool } from './tools.js';

let aiClientInstance = null;

// In-Memory Optimizations Registries
const rateLimitRegistry = new Map(); // userId -> { count, windowStart }
const responseCache = new Map();     // cacheKey -> { responseText, timestamp }
const activeLocks = new Set();        // Set of userId_module locks

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL
const RATE_LIMIT_MAX = 30;          // Max 30 queries per minute
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const TIMEOUT_LIMIT_MS = 15000;     // 15 seconds request timeout guard

/**
 * Initializes the unified GoogleGenAI client singleton safely.
 * @param {string} apiKey Gemini API Key from environment.
 * @returns {GoogleGenAI} Instantiated AI client.
 */
export function getAIClient(apiKey) {
  if (!apiKey) {
    throw new Error("Missing Gemini API Key configuration.");
  }
  if (!aiClientInstance) {
    console.log(JSON.stringify({
      eventType: 'ai_initialization',
      message: 'Initializing GoogleGenAI client singleton...',
      timestamp: new Date().toISOString()
    }));
    aiClientInstance = new GoogleGenAI({ apiKey });
  }
  return aiClientInstance;
}

/**
 * Checks and updates rate limits per user.
 * @param {string} userId Active Firebase user ID.
 */
function enforceRateLimiting(userId) {
  const now = Date.now();
  const limit = rateLimitRegistry.get(userId);

  if (!limit) {
    rateLimitRegistry.set(userId, { count: 1, windowStart: now });
    return;
  }

  if (now - limit.windowStart > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    limit.count = 1;
    limit.windowStart = now;
    return;
  }

  limit.count++;
  if (limit.count > RATE_LIMIT_MAX) {
    console.warn(JSON.stringify({
      eventType: 'ai_rate_limit_exceeded',
      userId,
      count: limit.count,
      timestamp: new Date().toISOString()
    }));
    throw new Error(`Rate limit exceeded: Max ${RATE_LIMIT_MAX} requests per minute. Please wait a moment.`);
  }
}

/**
 * Acquires a lock for a user session to prevent duplicate concurrent queries.
 * @param {string} userId Firebase user ID.
 * @param {string} moduleName Current active dashboard module.
 */
function acquireLock(userId, moduleName) {
  const lockKey = `${userId}_${moduleName}`;
  if (activeLocks.has(lockKey)) {
    console.warn(JSON.stringify({
      eventType: 'ai_duplicate_request_blocked',
      userId,
      moduleName,
      timestamp: new Date().toISOString()
    }));
    throw new Error("A request is already in progress for this module. Please wait for it to complete.");
  }
  activeLocks.add(lockKey);
}

/**
 * Releases a user session request lock.
 * @param {string} userId Firebase user ID.
 * @param {string} moduleName Current active dashboard module.
 */
function releaseLock(userId, moduleName) {
  const lockKey = `${userId}_${moduleName}`;
  activeLocks.delete(lockKey);
}

/**
 * Generates a unique cache key based on prompt and history payloads.
 */
function generateCacheKey(userId, activeModule, prompt, history) {
  return `${userId}_${activeModule}_${prompt}_${JSON.stringify(history)}`;
}

/**
 * Validates request input fields.
 */
function validateRequest(prompt, history) {
  if (!prompt && (!history || history.length === 0)) {
    throw new Error("Request validation failed: both prompt and history are empty.");
  }
  if (history && !Array.isArray(history)) {
    throw new Error("Request validation failed: history must be a structured array.");
  }
}

/**
 * Sanitizes conversation history to comply with Gemini API specifications:
 * 1. Removes setup / UI-only logs.
 * 2. Ensures the first message starts with the 'user' role.
 * 3. Enforces strictly alternating roles ('user' -> 'model' -> 'user' -> 'model').
 * @param {Array} rawHistory Raw message logs from the client.
 * @returns {Array} Sanitized history for Gemini API.
 */
export function sanitizeHistory(rawHistory) {
  if (!rawHistory || !Array.isArray(rawHistory)) return [];

  const parsed = [];
  rawHistory.forEach(msg => {
    if (msg.role && msg.content && msg.type !== 'setup' && msg.type !== 'error') {
      const mappedRole = msg.role === 'assistant' || msg.role === 'ai' || msg.role === 'model' ? 'model' : 'user';
      parsed.push({
        role: mappedRole,
        parts: [{ text: msg.content || ' ' }]
      });
    }
  });

  while (parsed.length > 0 && parsed[0].role === 'model') {
    parsed.shift();
  }

  const sanitized = [];
  parsed.forEach(msg => {
    if (sanitized.length === 0) {
      sanitized.push(msg);
    } else {
      const last = sanitized[sanitized.length - 1];
      if (last.role === msg.role) {
        const originalText = last.parts[0].text;
        const newText = msg.parts[0].text;
        last.parts = [{ text: `${originalText}\n${newText}` }];
      } else {
        sanitized.push(msg);
      }
    }
  });

  return sanitized;
}

/**
 * Generates streaming content with auto-retry fallbacks across Gemini models.
 * Includes timeout guards, rate limiting, caching, duplicate locks, and performance monitoring.
 * @param {string} apiKey Gemini API Key.
 * @param {string} prompt Prompt message.
 * @param {Array} history Conversation history.
 * @param {string} systemInstruction Core module behaviors.
 * @param {Array} attachments Multimodal/Inline text documents.
 * @param {Object} context Workspace session context.
 * @returns {AsyncGenerator<string>} Yields response chunks as text.
 */
export async function* generateContentStream(apiKey, prompt, history = [], systemInstruction = '', attachments = [], context = {}) {
  const startTime = Date.now();
  const userId = context.userId || 'guest';
  const activeModule = context.activeModule || 'General';

  validateRequest(prompt, history);
  enforceRateLimiting(userId);
  acquireLock(userId, activeModule);

  try {
    // 1. Check in-memory cache
    const cacheKey = generateCacheKey(userId, activeModule, prompt, history);
    const cachedEntry = responseCache.get(cacheKey);
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_TTL_MS)) {
      console.log(JSON.stringify({
        eventType: 'ai_cache_hit',
        userId,
        activeModule,
        timestamp: new Date().toISOString()
      }));
      yield cachedEntry.responseText;
      return;
    }

    const ai = getAIClient(apiKey);
    const modelsToTry = [
      { name: 'gemini-2.0-flash', attemptCount: 2 },
      { name: 'gemini-2.5-flash', attemptCount: 2 },
      { name: 'gemini-flash-latest', attemptCount: 2 },
      { name: 'gemini-2.5-pro', attemptCount: 1 },
      { name: 'gemini-pro-latest', attemptCount: 1 },
      { name: 'gemini-1.5-flash', attemptCount: 1 },
      { name: 'gemini-1.5-pro', attemptCount: 1 }
    ];

    const sanitizedHistory = sanitizeHistory(history);

    const parts = [];
    if (prompt) {
      parts.push({ text: prompt });
    } else {
      parts.push({ text: 'Analyze the attached details.' });
    }

    if (attachments && attachments.length > 0) {
      attachments.forEach(file => {
        if (file.inlineData) {
          parts.push({
            inlineData: {
              data: file.inlineData.data,
              mimeType: file.type
            }
          });
        } else if (file.textData) {
          parts.push({ text: file.textData });
        }
      });
    }

    let lastError = null;
    let accumulatedText = "";

    for (const modelConfig of modelsToTry) {
      for (let attempt = 1; attempt <= modelConfig.attemptCount; attempt++) {
        try {
          console.log(JSON.stringify({
            eventType: 'ai_model_attempt',
            model: modelConfig.name,
            attempt,
            userId,
            activeModule,
            timestamp: new Date().toISOString()
          }));

          const chat = ai.chats.create({
            model: modelConfig.name,
            history: sanitizedHistory,
            config: {
              systemInstruction: systemInstruction,
              tools: [{ functionDeclarations: toolDeclarations }]
            }
          });

          // Timeout Guard: Races the API request against a timeout promise
          const streamPromise = chat.sendMessageStream({ message: parts });
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Gemini API connection timed out.")), TIMEOUT_LIMIT_MS)
          );

          let responseStream = await Promise.race([streamPromise, timeoutPromise]);
          let currentStream = responseStream;
          let hasExecutedTools = true;

          while (hasExecutedTools) {
            hasExecutedTools = false;
            let functionCalls = [];

            for await (const chunk of currentStream) {
              if (chunk.functionCalls && chunk.functionCalls.length > 0) {
                functionCalls = chunk.functionCalls;
                break;
              }
              if (chunk.text) {
                accumulatedText += chunk.text;
                yield chunk.text;
              }
            }

            if (functionCalls.length > 0) {
              const toolResults = [];
              for (const call of functionCalls) {
                yield `[Executing Tool: ${call.name}...]`;
                try {
                  const result = await executeTool(call.name, call.args, context);
                  toolResults.push({
                    functionResponse: {
                      name: call.name,
                      response: { result }
                    }
                  });
                } catch (toolErr) {
                  console.error(JSON.stringify({
                    eventType: 'ai_tool_error',
                    toolName: call.name,
                    error: toolErr.message,
                    userId,
                    timestamp: new Date().toISOString()
                  }));
                  toolResults.push({
                    functionResponse: {
                      name: call.name,
                      response: { result: { success: false, error: toolErr.message } }
                    }
                  });
                }
              }

              const streamPromiseTool = chat.sendMessageStream({ message: toolResults });
              currentStream = await Promise.race([streamPromiseTool, timeoutPromise]);
              hasExecutedTools = true;
            }
          }

          // Request succeeded: Save to cache and log structured metrics
          responseCache.set(cacheKey, {
            responseText: accumulatedText,
            timestamp: Date.now()
          });

          console.log(JSON.stringify({
            eventType: 'ai_request_completed',
            model: modelConfig.name,
            userId,
            activeModule,
            latencyMs: Date.now() - startTime,
            success: true,
            timestamp: new Date().toISOString()
          }));
          return;
        } catch (err) {
          console.warn(JSON.stringify({
            eventType: 'ai_model_attempt_failed',
            model: modelConfig.name,
            attempt,
            error: err.message,
            userId,
            activeModule,
            timestamp: new Date().toISOString()
          }));
          lastError = err;
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    }

    throw lastError || new Error("All Gemini models and retry attempts exhausted.");
  } finally {
    releaseLock(userId, activeModule);
  }
}
