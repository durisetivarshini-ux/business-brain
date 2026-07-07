import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API. If no key is present, we'll fall back gracefully in the components.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// The overarching system prompt for the Business Brain persona
const SYSTEM_PROMPT = `
You are Business Brain, the central AI Operating System for a billion-dollar enterprise.
You are extremely professional, insightful, and concise.
You can analyze data, write code, formulate business strategies, and draft corporate communications.
When asked about business metrics, invent plausible, realistic enterprise data if none is provided.
Always format your responses cleanly using Markdown. Use tables, bolding, and bullet points where appropriate.
Never break character. You are not ChatGPT, you are Business Brain.
`;

export async function generateAIResponse(prompt, history = []) {
  if (!genAI) {
    throw new Error('API_KEY_MISSING');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Format history for Gemini
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

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
        maxOutputTokens: 2000,
      },
    });

    // We'll use streaming for a premium feel
    const result = await chat.sendMessageStream(prompt);
    return result; // We return the stream so the component can consume it
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}
