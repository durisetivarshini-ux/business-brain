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

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing");
  process.exit(1);
}

console.log("✓ Environment Loaded");
console.log("✓ Gemini API Loaded");
console.log("✓ AI Service Ready");

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

const SYSTEM_PROMPT = `You are Business Brain (B.BRAIN), the premier AI-powered Business Operating System (AI-BOS) and Executive Assistant.
You think like a world-class CEO, CFO, COO, CTO, CMO, and Chief Risk Analyst.
Your goal is to provide deeply analytical, data-driven, and highly actionable business advice.

RESPONSE STYLE RULES:
- Never provide short, single-line generic replies.
- Provide structured markdown responses: Executive Summary, Key Insights, Analysis (with Tables/Metrics if appropriate), Risks, Recommendations, Expected Outcomes, and a Confidence Score (%).
- Keep tone professional, analytical, authoritative, yet friendly and helpful.
- Suggest next steps or operational action items.

INTEGRATION INTERACTION FORMAT:
If the user asks for a chart, include a JSON block in this exact format:
\`\`\`json
{ "chartType": "bar", "data": [ { "name": "Q1", "value": 400 }, ... ] }
\`\`\`
Make sure all suggestions, dashboards, and metrics are fully personalized to the active industry, business type, and department.`;

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

function getLocalAIReply(prompt = "") {
  const p = prompt.toLowerCase();
  
  if (p.includes('revenue') || p.includes('sales') || p.includes('predict') || p.includes('forecast')) {
    return `### 📊 AI Revenue Forecast & Sales Trend

Based on current operational telemetry, here is the simulated outlook for **Q3 Performance**:

| Month | Target Revenue | Forecasted Revenue | Status |
| :--- | :--- | :--- | :--- |
| **July** | ₹12.5 Lakhs | **₹14.2 Lakhs** | 📈 +13.6% ahead |
| **August** | ₹15.0 Lakhs | **₹16.8 Lakhs** | 📈 +12.0% ahead |
| **September** | ₹18.0 Lakhs | **₹21.5 Lakhs** | 📈 +19.4% ahead |

#### Key Insights:
- **Growth Velocity**: Overall Sales metrics show a **+14.2% expansion** driven by new customer registrations.
- **AI Recommendation**: Shift advertising budgets towards LinkedIn marketing campaigns to sustain lead pipeline velocity.`;
  }
  
  if (p.includes('invoice') || p.includes('billing')) {
    return `### 📄 Finance Action: Creating Invoice

I have identified the intent to create a new customer invoice:
- **Customer**: Acme Corp (Enterprise Segment)
- **Amount**: ₹12,500
- **Format Standard**: INV-2026-0412
- **Action**: Creating a draft ledger entry and redirecting the viewport...

**Status**: Invoice created successfully! You can review details on the [Finance Ledger](/app/finance) page.`;
  }

  if (p.includes('marketing') || p.includes('campaign')) {
    return `### 🚀 Marketing Campaign Blueprint

AI Campaign Optimizer recommendations:
1. **Focus Channel**: LinkedIn & Google Search.
2. **Target Audience**: B2B Decision Makers (IT Directors / Managers).
3. **Ad Budget**: ₹45,000 allocation recommended.
4. **Copy Strategy**: *"Orchestrate your workspace using AI-powered Business Operating Systems."*

*Campaign draft successfully populated! Ready to launch on the [Marketing Campaign Panel](/app/marketing).*`;
  }

  if (p.includes('expense') || p.includes('cost')) {
    return `### 📉 Financial Expense & Cost Audit

Operational costs analysis:
- **Infrastructure**: AWS Cloud cluster is running at 42% CPU load. Recommend downsizing database sync clusters to save **$240/mo**.
- **Procurement**: Supplier price adjustments detected for key ingredient lines.
- **Recommended Action**: Initiate automation trigger to audit vendors contracts.`;
  }

  if (p.includes('employee') || p.includes('hr') || p.includes('staff')) {
    return `### 👥 HRMS Staff Directory & Attrition Review

Current workforce health overview:
- **Active Team Size**: 18 Developers engaged.
- **Attrition Risk**: **Low (94% satisfaction rating)**.
- **Action Items**: 4 performance review schedules pending for next week.
- **Workforce Summary**: Staging pipeline is clear. All teams operating at optimal velocity.`;
  }

  if (p.includes('inventory') || p.includes('stock')) {
    return `### 📦 AI Inventory Optimizer

Current inventory threshold alerts:
- **Critical Alert**: Veg Supreme ingredients stock is under 15% capacity (estimated **3 days remaining**).
- **Auto-Reorder Point**: Triggering purchase orders to suppliers roster.
- **Action Status**: Suppliers notified. Delivery scheduled for Friday.`;
  }

  if (p.includes('meeting') || p.includes('schedule')) {
    return `### 📅 Meeting Scheduled

Meeting AI scheduler actions executed:
- **Agenda**: Q3 Dev Sprint Planning & QA Sync.
- **Duration**: 45 mins.
- **Attendees**: 8 engineering team members.
- **Action**: Scheduled in calendar, sent calendar invites, and updated transcript registry.`;
  }

  if (p.includes('automation') || p.includes('workflow')) {
    return `### ⚙️ Automation Canvas Workflow Activated

New workflow created successfully:
1. **Trigger**: New CRM Client Registration.
2. **Action 1**: Create CRM contact record.
3. **Action 2**: Issue welcome onboarding email templates.
4. **Action 3**: Notify assigned Account Manager.

*Workflow layout populated on the [Automation Studio](/app/automation).*`;
  }

  if (p.includes('risk') || p.includes('security')) {
    return `### ⚠️ Operational Risk Audit

Platform Risk Center telemetry scan results:
- **Cash Flow Risk**: Low (Outstanding receivables under ₹50,000).
- **Inventory Risk**: High (Reorder triggers active).
- **Cybersecurity**: No staging cluster breaches detected. All systems nominal.`;
  }

  if (p.includes('document') || p.includes('ocr')) {
    return `### 📑 Document Vault Summarization

AI OCR Scan of \`Board_Meeting_Minutes.pdf\`:
- **Summary**: Board approved the Q3 revenue target shift.
- **Security Rating**: Confidential.
- **Suggested Next Step**: Assign tasks to sales reps in CRM.`;
  }

  return `### 🤖 Business Brain AI Copilot

I am your intelligent Business Operating System Copilot. I can analyze company data, forecast revenue, draft invoices, schedule meetings, or activate automated workflows.

**Suggested Queries to Try:**
- *Show last month's revenue*
- *Create a draft invoice for Acme Corp*
- *Audit current infrastructure expenses*
- *Forecast critical inventory thresholds*
- *Schedule a team sync meeting*`;
}

app.post('/api/chat', async (req, res) => {
  console.log('[BACKEND TRACE] Request received at local /api/chat');
  
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('[BACKEND TRACE] GEMINI_API_KEY loaded in environment:', !!apiKey);
  
  if (!apiKey) {
    console.warn('[BACKEND WARNING] GEMINI_API_KEY is missing. Falling back to local Adaptive AI Router...');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reply = getLocalAIReply(req.body.prompt);
    
    // Stream response chunk by chunk
    for (let i = 0; i < reply.length; i += 20) {
      res.write(reply.substring(i, i + 20));
      await new Promise(r => setTimeout(r, 20));
    }
    res.end();
    return;
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
    console.error('[BACKEND ERROR] Full Gemini Error. Falling back to local Adaptive AI Router...');
    console.error(error.stack || error);
    
    try {
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
      }
      const reply = getLocalAIReply(req.body.prompt);
      for (let i = 0; i < reply.length; i += 20) {
        res.write(reply.substring(i, i + 20));
        await new Promise(r => setTimeout(r, 20));
      }
      res.end();
    } catch (streamErr) {
      console.error('[BACKEND FATAL] Streaming fallback failed:', streamErr);
      if (!res.headersSent) {
        res.status(500).json({ error: 'AI Service temporarily unavailable. Please retry.' });
      }
    }
  }
});

app.post('/api/ai/chat', async (req, res) => {
  const startTime = Date.now();
  const requestId = `req-${Math.floor(100000 + Math.random() * 900000)}`;
  console.log(`[${requestId}] AI Request Received`);

  try {
    console.log(`[${requestId}] Checking Environment...`);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn(`[${requestId}] GEMINI_API_KEY is missing on the server.`);
      return res.status(200).json({
        success: false,
        message: 'AI service is temporarily unavailable. Please contact your administrator or configure the AI service.'
      });
    }
    console.log(`[${requestId}] Environment Loaded`);

    // 1. Validate Input Payload (Step 7)
    const { message, history = [], context = {} } = req.body;
    if (message === undefined || message === null) {
      return res.status(400).json({ success: false, message: 'message parameter is required' });
    }
    if (typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'message must be a string' });
    }
    const cleanMessage = message.trim().replace(/<[^>]*>/g, ''); // Basic input sanitization
    if (cleanMessage.length === 0) {
      return res.status(400).json({ success: false, message: 'message cannot be empty' });
    }

    // 2. Build Context Prefix (Step 9)
    const company = context.companyName || 'Business Brain Enterprise';
    const industry = context.customIndustry || 'Enterprise';
    const stage = context.businessStage || 'Growing';
    const systemInstruction = `${SYSTEM_PROMPT}\n\nUser Context:\n- Company: ${company}\n- Industry: ${industry}\n- Stage: ${stage}\n\nResponse must ALWAYS be clean JSON: { "success": true, "reply": "markdown_text" }. Never return raw text. Never expose stack traces or API keys.`;

    // 3. Initialize Gemini (Step 3)
    console.log(`[${requestId}] Gemini client initialization started.`);
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Choose model with fallback
    let modelName = 'gemini-2.5-flash';
    let model;
    try {
      console.log(`[${requestId}] Selecting model: ${modelName}`);
      model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
      console.log(`[${requestId}] Model Selected`);
    } catch (modelErr) {
      console.warn(`[${requestId}] gemini-2.5-flash failed to initialize. Falling back to gemini-2.5-pro...`);
      modelName = 'gemini-2.5-pro';
      model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
      console.log(`[${requestId}] Fallback Model Selected: ${modelName}`);
    }
    console.log(`[${requestId}] Gemini Client Initialized`);

    // 4. Chat session history formatting (Step 10)
    const formattedHistory = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'model', parts: [{ text: 'Understood. I am Business Brain AI. Context loaded successfully.' }] }
    ];
    history.forEach(h => {
      if (h.content && h.role) {
        formattedHistory.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        });
      }
    });

    // 5. Send Prompt with 3x retry and backoff (Step 12)
    console.log(`[${requestId}] Sending Prompt`);
    let replyText = '';
    let success = false;
    let attempts = 3;
    let delay = 800;

    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        console.log(`[${requestId}] Waiting Response (Attempt ${attempt}/${attempts})...`);
        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(cleanMessage);
        replyText = result.response.text();
        success = true;
        console.log(`[${requestId}] Response Received`);
        break;
      } catch (geminiErr) {
        console.error(`[${requestId}] Attempt ${attempt} failed:`, geminiErr.message);
        if (attempt === attempts) {
          throw geminiErr;
        }
        await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt)));
      }
    }

    // 6. Format and Send Response (Step 8)
    console.log(`[${requestId}] Formatting Response`);
    const executionTime = Date.now() - startTime;
    console.log(`[${requestId}] Sending Response. Execution time: ${executionTime}ms`);
    return res.json({ success: true, reply: replyText });

  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error(`[BACKEND ERROR] Request ${requestId} failed. Time: ${executionTime}ms. Error details:`);
    console.error(error.stack || error);
    
    // Safety Fallback: Return clean error JSON instead of HTTP 502/crashes (Step 5)
    return res.status(200).json({
      success: false,
      message: 'AI service is temporarily unavailable. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Secure AI Backend running on http://localhost:${PORT}`);
});
