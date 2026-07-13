import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

async function getUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    if (e.code === 'ENOENT') {
      const defaultUser = {
        id: "1",
        name: "Admin User",
        email: "admin@businessbrain.ai",
        password: await bcrypt.hash("password123", 10),
        role: "Administrator",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Admin"
      };
      await fs.writeFile(USERS_FILE, JSON.stringify([defaultUser], null, 2));
      return [defaultUser];
    }
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

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

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  
  const users = await getUsers();
  const user = users.find(u => u.email === email);
  if (!user || !user.password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
});

app.post('/api/auth/google', async (req, res) => {
  const { email, name, picture, sub } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  
  const users = await getUsers();
  let user = users.find(u => u.email === email);
  
  if (!user) {
    user = {
      id: Date.now().toString(),
      email,
      name,
      role: 'Google Account',
      avatarUrl: picture,
      googleId: sub
    };
    users.push(user);
    await saveUsers(users);
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
});

app.post('/api/chat', async (req, res) => {
  console.log('[BACKEND TRACE] Request received at local /api/chat');
  
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('[BACKEND TRACE] GEMINI_API_KEY loaded in environment:', !!apiKey);
  
  if (!apiKey) {
    console.error('[BACKEND ERROR] API key is completely missing from environment variables.');
    return res.status(500).json({ 
      error: 'Environment variable GEMINI_API_KEY is missing on the server.',
      code: 'API_KEY_MISSING' 
    });
  }

  try {
    const { prompt, history = [], attachments = [] } = req.body;
    console.log(`[BACKEND TRACE] Payload received. Prompt length: ${prompt?.length || 0}, History length: ${history?.length || 0}, Attachments: ${attachments?.length || 0}`);
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-lite-latest",
      systemInstruction: SYSTEM_PROMPT
    });
    console.log('[BACKEND TRACE] Gemini client initialized successfully with model gemini-flash-lite-latest.');

    // Format history for Gemini
    const formattedHistory = [];

    history.forEach(msg => {
      if (msg.type !== 'setup' && msg.type !== 'error') {
        formattedHistory.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content || ' ' }]
        });
      }
    });

    console.log('[BACKEND TRACE] Starting chat session with formatted history...');
    const chat = model.startChat({ history: formattedHistory });

    const parts = [];
    if (prompt) {
      parts.push({ text: prompt });
    } else {
      parts.push({ text: 'Analyze the attached files.' });
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

    console.log('[BACKEND TRACE] Sending message stream to Gemini...');
    const result = await chat.sendMessageStream(parts);
    console.log('[BACKEND TRACE] Stream established successfully. Sending response to client.');
    
    // Set headers for Server-Sent Events / Chunked transfer
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    
    console.log('[BACKEND TRACE] Stream completed successfully.');
    res.end();
  } catch (error) {
    console.error('[BACKEND ERROR] Full Gemini Error Stack Trace:');
    console.error(error.stack || error);
    
    // Return the EXACT error message to the frontend, no masking
    res.status(500).json({ 
      error: error.message || 'Unknown Gemini API Error',
      name: error.name || 'Error',
      status: error.status || 500
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Secure AI Backend running on http://localhost:${PORT}`);
});
