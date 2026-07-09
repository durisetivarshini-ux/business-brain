import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const SYSTEM_PROMPT = `You are Business Brain, an elite AI Copilot and Executive Assistant for business professionals.
Your goal is to provide deeply analytical, data-driven, and highly actionable business advice.
Format your responses beautifully using Markdown. Use bolding, lists, and headers where appropriate.
If the user asks for a chart, respond with JSON data in this exact format:
\`\`\`json
{ "chartType": "bar", "data": [ { "name": "Q1", "value": 400 }, ... ] }
\`\`\`
Never break character. You are the ultimate business intelligence AI.`;

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'AI service is temporarily unavailable. Please try again shortly.' });
  }

  try {
    const { prompt, history = [], attachments = [] } = req.body;
    
    if (!prompt && attachments.length === 0) {
      return res.status(400).json({ error: 'Prompt or attachments are required' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Format history for Gemini
    const formattedHistory = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: 'model',
        parts: [{ text: 'System initialized. I am Business Brain. How may I assist you today?' }]
      }
    ];

    history.forEach(msg => {
      // Avoid passing back raw setup or error messages from the frontend
      if (msg.type !== 'setup' && msg.type !== 'error') {
        formattedHistory.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content || ' ' }]
        });
      }
    });

    const chat = model.startChat({ history: formattedHistory });

    const parts = [];
    if (prompt) {
      parts.push({ text: prompt });
    } else {
      parts.push({ text: 'Analyze the attached files.' });
    }

    if (attachments && attachments.length > 0) {
      attachments.forEach(file => {
        parts.push({
          inlineData: {
            data: file.inlineData.data,
            mimeType: file.type
          }
        });
      });
    }

    const result = await chat.sendMessageStream(parts);
    
    // Set headers for Server-Sent Events / Chunked transfer
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    
    res.end();
  } catch (error) {
    console.error('Backend Gemini Error:', error);
    res.status(500).json({ error: 'AI service is temporarily unavailable. Please try again shortly.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Secure AI Backend running on http://localhost:${PORT}`);
});
