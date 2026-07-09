import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper to get the API dynamically so the user can add it via UI
function getGenAI() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  const localKey = localStorage.getItem('GEMINI_API_KEY');
  const key = localKey || envKey;
  return key && key !== 'your-api-key-here' ? new GoogleGenerativeAI(key) : null;
}

// The overarching system prompt for the Business Brain persona
const SYSTEM_PROMPT = `
You are Business Brain Copilot, an advanced AI assistant.
You are extremely professional, insightful, and capable of answering ANY question.
You can analyze data, write code in any language (Python, React, JavaScript, SQL, etc.), solve math problems, provide translations, and formulate business strategies.
You are not restricted to business topics. You can answer general knowledge, science, technology, and coding questions.
Always format your responses cleanly using Markdown. Use tables, bolding, code blocks with syntax highlighting, and bullet points where appropriate.
Be concise but thorough.
`;

export async function generateAIResponse(prompt, history = [], attachments = [], abortSignal = null) {
  const genAI = getGenAI();
  if (!genAI) {
    throw new Error('API_KEY_MISSING');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Format history for Gemini
    const formattedHistory = history.map(msg => {
      const parts = [{ text: msg.content }];
      if (msg.attachments && msg.attachments.length > 0) {
        msg.attachments.forEach(att => {
          if (att.inlineData) parts.push({ inlineData: att.inlineData });
        });
      }
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: parts
      };
    });

    // Start chat
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: 'System initialized. I am Business Brain. How may I assist you today?' }]
        },
        ...formattedHistory
      ],
      generationConfig: {
        maxOutputTokens: 8000,
      },
    });

    // Prepare current prompt parts (text + attachments)
    const promptParts = [{ text: prompt }];
    if (attachments && attachments.length > 0) {
      attachments.forEach(att => {
        if (att.inlineData) promptParts.push({ inlineData: att.inlineData });
      });
    }

    // We'll use streaming for a premium feel
    const result = await chat.sendMessageStream(promptParts, { signal: abortSignal });
    return result; // We return the stream so the component can consume it
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Stream aborted by user');
      throw error;
    }
    console.error("AI Generation Error:", error);
    throw error;
  }
}
