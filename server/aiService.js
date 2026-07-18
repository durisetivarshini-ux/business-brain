import { GoogleGenAI } from '@google/genai';
import { toolDeclarations, executeTool } from './tools.js';

let aiClientInstance = null;

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
    console.log('[AI INIT] Initializing GoogleGenAI client singleton...');
    aiClientInstance = new GoogleGenAI({ apiKey });
  }
  return aiClientInstance;
}

/**
 * Validates request input fields.
 * @param {string} prompt Input message.
 * @param {Array} history Conversation history logs.
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

  // 1. Map role keys to model/user and discard setup/error entries
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

  // 2. Ensure history begins with a 'user' message
  while (parsed.length > 0 && parsed[0].role === 'model') {
    console.log('[AI HISTORY SANITIZER] Shifted out leading model message to ensure user starts.');
    parsed.shift();
  }

  // 3. Collapse consecutive messages with same role to ensure strict alternating order
  const sanitized = [];
  parsed.forEach(msg => {
    if (sanitized.length === 0) {
      sanitized.push(msg);
    } else {
      const last = sanitized[sanitized.length - 1];
      if (last.role === msg.role) {
        console.log(`[AI HISTORY SANITIZER] Collapsed consecutive ${msg.role} messages.`);
        // Append text parts
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
 * @param {string} apiKey Gemini API Key.
 * @param {string} prompt Prompt message.
 * @param {Array} history Conversation history.
 * @param {string} systemInstruction Core module behaviors.
 * @param {Array} attachments Multimodal/Inline text documents.
 * @param {Object} context Workspace session context.
 * @returns {AsyncGenerator<string>} Yields response chunks as text.
 */
export async function* generateContentStream(apiKey, prompt, history = [], systemInstruction = '', attachments = [], context = {}) {
  validateRequest(prompt, history);
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

  // Compile parts
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

  for (const modelConfig of modelsToTry) {
    for (let attempt = 1; attempt <= modelConfig.attemptCount; attempt++) {
      try {
        console.log(`[AI SERVICE CONNECTIVITY] Querying model "${modelConfig.name}" (Attempt ${attempt}/${modelConfig.attemptCount})...`);
        
        // Start a chat session with secure tools enabled
        const chat = ai.chats.create({
          model: modelConfig.name,
          history: sanitizedHistory,
          config: {
            systemInstruction: systemInstruction,
            tools: [{ functionDeclarations: toolDeclarations }]
          }
        });

        // Send initial message stream
        let responseStream = await chat.sendMessageStream({
          message: parts
        });

        let currentStream = responseStream;
        let hasExecutedTools = true;

        while (hasExecutedTools) {
          hasExecutedTools = false;
          let functionCalls = [];

          for await (const chunk of currentStream) {
            // Check if the model requests a function call execution
            if (chunk.functionCalls && chunk.functionCalls.length > 0) {
              functionCalls = chunk.functionCalls;
              break; 
            }
            if (chunk.text) {
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
                console.error(`[AI SERVICE TOOL ERROR] Tool "${call.name}" failed:`, toolErr.message);
                toolResults.push({
                  functionResponse: {
                    name: call.name,
                    response: { result: { success: false, error: toolErr.message } }
                  }
                });
              }
            }

            // Return the function execution result back to Gemini and get a new stream
            console.log('[AI SERVICE CONNECTIVITY] Returning tool response payload to Gemini...');
            currentStream = await chat.sendMessageStream({
              message: toolResults
            });
            hasExecutedTools = true; 
          }
        }

        console.log(`[AI SERVICE SUCCESS] Streaming completed successfully with model "${modelConfig.name}".`);
        return;
      } catch (err) {
        console.warn(`[AI SERVICE FALLBACK WARNING] Model "${modelConfig.name}" failed on attempt ${attempt}:`, err.message);
        lastError = err;
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }

  throw lastError || new Error("All Gemini models and retry attempts exhausted.");
}
