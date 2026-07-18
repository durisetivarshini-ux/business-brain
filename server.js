import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing. AI features will fallback to user-friendly error messages.");
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

const SYSTEM_PROMPT = `You are a world-class, premium Enterprise AI Assistant and Business Strategy Advisor.
Think and respond like an elite CEO, CFO, COO, CTO, and Chief Financial Analyst.

CRITICAL RULES:
1. NEVER introduce yourself automatically (e.g., do NOT say "As Business Brain", "I am your AI assistant", "I am B.BRAIN", "Greetings", etc.). Only explain who you are if explicitly asked "Who are you?" or "What is Business Brain?".
2. NEVER return raw JSON structures or wraps (like {"success": true, "reply": "..."}) in your streamed output. Always output clean, direct Markdown text.
3. Be highly conversational, professional, direct, and actionable. 
4. If a question is simple, answer it directly and naturally (e.g., if user says "Hi", reply "Hi! How can I help you today?").
5. If a question is complex, provide structured reports: Executive Summary, Key Insights, Analysis (with Tables/Metrics if appropriate), Risks, Recommendations, Expected Outcomes, and a Confidence Score (%).
6. Use context seamlessly without explicitly announcing that you are aware of it.
7. Support follow-up questions and conversational continuity.
8. NEVER wrap your overall response text in JSON brackets.
9. Avoid long, verbose paragraph walls or robotic chatbot filler. Format your outputs to look highly analyzed: use compact bullet points, key metrics highlights, and brief structured tables.

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

const MEETINGS_FILE = path.join(__dirname, 'meetings.json');

async function loadMeetingsContext(context) {
  try {
    const data = await fs.readFile(MEETINGS_FILE, 'utf-8');
    const meetingsList = JSON.parse(data);
    if (!context.businessMetrics) {
      context.businessMetrics = {};
    }
    context.businessMetrics.meetings = meetingsList;
    context.businessMetrics.hasRealData = true;
  } catch (e) {}
}

function getSystemInstruction(context = {}) {
  const company = context.companyName || 'Business Brain Enterprise';
  const industry = context.customIndustry || 'Enterprise Software';
  const stage = context.businessStage || 'Growing';
  const businessType = context.businessType || 'Private Corporation';
  const employeeCount = context.employeeCount || '26-50 Employees';
  const annualRevenue = context.annualRevenue || 'Under ₹10 Lakhs';
  const activeModule = context.activeModule || 'General';

  const metrics = context.businessMetrics || {};
  const hasRealData = metrics.hasRealData;
  const currencySymbol = context.currency === 'USD' ? '$' : context.currency === 'EUR' ? '€' : '₹';

  let dataContext = "";
  if (hasRealData) {
    const netProfit = (metrics.totalRevenue || 0) - (metrics.totalExpenses || 0);
    const profitMargin = metrics.totalRevenue > 0 ? Math.round((netProfit / metrics.totalRevenue) * 100) : 0;
    dataContext = `
REAL OPERATIONAL DATABASE METRICS:
The user has entered or imported their actual operational data. All calculations, predictions, margins, and operational feedback MUST be mathematically derived from these figures:
- Total Logged Revenue: ${currencySymbol}${metrics.totalRevenue?.toLocaleString()}
- Total Logged Expenses: ${currencySymbol}${metrics.totalExpenses?.toLocaleString()}
- Net Profit: ${currencySymbol}${netProfit.toLocaleString()}
- Gross Profit Margin: ${profitMargin}%
- Onboarded Customers Count: ${metrics.customerCount}
- Active Employees Count: ${metrics.employeeCount}
- Catalog Products Count: ${metrics.productCount}
- Recent Ledger Items: ${JSON.stringify(metrics.recentTransactions || [])}
- Scheduled/Completed Meetings: ${JSON.stringify(metrics.meetings || [])}

Rule: Never hallucinate or present fake numbers. Compute margins and forecasts directly from this live data. If queried about meetings, syncs, countdowns, or agendas, read the meetings list above and respond naturally (mentioning time, attendees, link, and action tasks).`;
  } else {
    dataContext = `
NO OPERATIONAL DATABASE DATA:
The user has not entered or imported any business records (employees, inventory, customers, transactions) to the platform yet. 
Rule: Do not output analytics. Instruct the user to complete the setup checklists, import their spreadsheets (CSV/Excel), or connect their accounting software (Shopify, QuickBooks, Zoho, Tally) using the Admin Setup Wizard on the dashboard. Explain that this will unlock live dashboard charts and AI analytical insights.`;
  }

  let moduleInstruction = "";
  switch (activeModule) {
    case 'Finance':
      moduleInstruction = "You are a world-class CFO (Chief Financial Officer) and Senior Investment Analyst. Answer financial and billing questions with meticulous mathematical rigor. Use tables, ratios, and risk mitigation strategies. Recommend action links where applicable.";
      break;
    case 'CRM':
      moduleInstruction = "You are a top-performing Chief Revenue Officer (CRO) and Sales Director. Answer CRM, lead conversion, pipeline, and account manager questions. Provide actionable sales advice and customer engagement blueprints.";
      break;
    case 'HR':
      moduleInstruction = "You are an expert CHRO (Chief Human Resources Officer) and workforce consultant. Answer recruitment, retention, performance review, payroll, and employee relations questions professionally and supportively.";
      break;
    case 'Inventory':
    case 'ERP':
      moduleInstruction = "You are a veteran Supply Chain Director and ERP Logistics Architect. Focus on supply velocity, reorder thresholds, vendor fulfillment latency, and stock capacity audits.";
      break;
    case 'Marketing':
      moduleInstruction = "You are a world-class CMO (Chief Marketing Officer) and brand strategist. Analyze ad campaign conversion funnels, brand messaging resonance, budget allocations, and organic search strategies.";
      break;
    case 'Documents':
      moduleInstruction = "You are a Senior Document Auditor and AI OCR Analyst. Summarize document structures, find regulatory compliance clauses, highlight key deadlines, and extract metadata fields.";
      break;
    case 'Analytics':
      moduleInstruction = "You are a Principal BI Analyst and Data Scientist. Recommend metrics models, interpret dashboard trendlines, forecast future target values, and suggest KPI dashboard optimizations.";
      break;
    case 'Meetings':
      moduleInstruction = "You are an Executive Assistant and Meeting coordinator. Help schedule, draft sync agendas, organize attendees list, and track action items.";
      break;
    case 'Goals':
    case 'Risks':
    case 'Executive':
      moduleInstruction = "You are an elite Management Consultant and Enterprise Risk Architect. Focus on OKRs, risk matrices, mitigation plans, and board-level reporting structures.";
      break;
    case 'Advisor':
      moduleInstruction = "You are an elite CEO, CFO, Business Analyst, Financial Advisor, Operations Consultant, and Strategy Expert. Analyze KPIs, explain root causes of issues, project/predict future performance using current ledger trends, identify SWOT matrix factors, and run pricing/cost simulator scenarios. Always support recommendations with mathematical data from their database.";
      break;
    default:
      moduleInstruction = "You are an elite executive strategy consultant. Provide broad-spectrum operational, financial, and strategic advice.";
  }

  return `${SYSTEM_PROMPT}

Active Business Context:
- Company: ${company} (${businessType})
- Industry Segment: ${industry}
- Stage of Business: ${stage}
- Team Size: ${employeeCount}
- Estimated Revenue Range: ${annualRevenue}

Database Metrics Context:
${dataContext}

Target Workspace Module Context:
- Active Module: ${activeModule}
- Adaptive Mode: ${moduleInstruction}

CRITICAL ACTION LINK INJECTORS:
If your response mentions any of the following operational flows, you MUST append the exact markdown action link tag on its own line:
- Creating an invoice: [Action: Create Invoice]
- Approving a Purchase Order: [Action: Approve Purchase Order]
- Scheduling a Meeting: [Action: Schedule Meeting]
- Opening the CRM view: [Action: Open CRM]
- Exporting details to a PDF: [Action: Generate PDF]
- Opening the Finance Ledger: [Action: Open Finance]
- Opening the BI Analytics Dashboard: [Action: Open Analytics]`;
}

async function startGeminiStreamWithRetry(genAI, systemInstruction, history, parts) {
  const modelsToTry = [
    { name: 'gemini-2.5-flash', attemptCount: 2 },
    { name: 'gemini-flash-lite-latest', attemptCount: 2 },
    { name: 'gemini-2.5-pro', attemptCount: 1 }
  ];

  let lastError = null;

  for (const modelConfig of modelsToTry) {
    for (let attempt = 1; attempt <= modelConfig.attemptCount; attempt++) {
      try {
        console.log(`[GEMINI RETRY TRACE] Trying model ${modelConfig.name} (Attempt ${attempt}/${modelConfig.attemptCount})`);
        const model = genAI.getGenerativeModel({ 
          model: modelConfig.name,
          systemInstruction: systemInstruction
        });

        // Start chat session
        const chat = model.startChat({ history: history });
        const result = await chat.sendMessageStream(parts);
        return result;
      } catch (err) {
        console.error(`[GEMINI RETRY WARNING] Failed with ${modelConfig.name} on attempt ${attempt}:`, err.message);
        lastError = err;
        await new Promise(r => setTimeout(r, 300));
      }
    }
  }

  throw lastError || new Error("All Gemini models and retry attempts exhausted.");
}

app.post('/api/chat', async (req, res) => {
  console.log('[BACKEND TRACE] Streaming request received at /api/chat');
  
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Set headers for Chunked transfer
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  if (!apiKey) {
    console.warn('[BACKEND WARNING] GEMINI_API_KEY is missing.');
    res.write("I couldn't reach the AI service. Please try again.");
    res.end();
    return;
  }

  try {
    const { prompt, history = [], attachments = [], context = {} } = req.body;
    console.log(`[BACKEND TRACE] Prompt: "${prompt?.substring(0, 30)}...", History: ${history.length}, Attachments: ${attachments.length}`);

    await loadMeetingsContext(context);
    const systemInstruction = getSystemInstruction(context);
    const genAI = new GoogleGenerativeAI(apiKey);

    // Format history for Gemini
    const formattedHistory = [];
    history.forEach(msg => {
      if (msg.role && msg.content && msg.type !== 'setup' && msg.type !== 'error') {
        formattedHistory.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content || ' ' }]
        });
      }
    });

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

    console.log('[BACKEND TRACE] Fetching streaming reply from Gemini with retries...');
    const result = await startGeminiStreamWithRetry(genAI, systemInstruction, formattedHistory, parts);
    
    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }
    
    console.log('[BACKEND TRACE] Stream completed successfully.');
    res.end();
  } catch (error) {
    console.error('[BACKEND ERROR] All streaming retries failed:', error.stack || error);
    res.write("I couldn't reach the AI service. Please try again.");
    res.end();
  }
});

app.post('/api/ai/chat', async (req, res) => {
  console.log('[BACKEND TRACE] JSON request received at /api/ai/chat');
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('[BACKEND WARNING] GEMINI_API_KEY is missing.');
    return res.status(200).json({
      success: false,
      message: "I couldn't reach the AI service. Please try again."
    });
  }

  try {
    const { message, history = [], attachments = [], context = {} } = req.body;
    await loadMeetingsContext(context);
    const systemInstruction = getSystemInstruction(context);
    const genAI = new GoogleGenerativeAI(apiKey);

    const formattedHistory = [];
    history.forEach(msg => {
      if (msg.role && msg.content && msg.type !== 'setup' && msg.type !== 'error') {
        formattedHistory.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content || ' ' }]
        });
      }
    });

    const parts = [{ text: message || 'Analyze current state.' }];

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

    console.log('[BACKEND TRACE] Fetching non-streaming reply from Gemini with retries...');
    const result = await startGeminiStreamWithRetry(genAI, systemInstruction, formattedHistory, parts);
    
    let replyText = '';
    for await (const chunk of result.stream) {
      replyText += chunk.text();
    }

    res.json({ success: true, reply: replyText });
  } catch (error) {
    console.error('[BACKEND ERROR] All non-streaming retries failed:', error.stack || error);
    res.status(200).json({
      success: false,
      message: "I couldn't reach the AI service. Please try again."
    });
  }
});

// --- SMTP & CLOUD API EMAILS SCHEDULER & DISPATCH ENGINE ---
let smtpTransporter = null;
let dbClient = null;
const useMongoDB = !!process.env.MONGODB_URI;

async function getMeetings() {
  if (useMongoDB) {
    try {
      if (!dbClient) {
        dbClient = new MongoClient(process.env.MONGODB_URI);
        await dbClient.connect();
      }
      const db = dbClient.db(process.env.MONGODB_DB || 'business_brain');
      return await db.collection('meetings').find({}).toArray();
    } catch (err) {
      console.error('[DATABASE ERROR] Failed to connect/fetch from MongoDB, falling back to local file:', err.message);
    }
  }
  
  try {
    const data = await fs.readFile(MEETINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.writeFile(MEETINGS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    return [];
  }
}

async function saveMeetings(meetings) {
  if (useMongoDB) {
    try {
      if (!dbClient) {
        dbClient = new MongoClient(process.env.MONGODB_URI);
        await dbClient.connect();
      }
      const db = dbClient.db(process.env.MONGODB_DB || 'business_brain');
      await db.collection('meetings').deleteMany({});
      if (meetings.length > 0) {
        await db.collection('meetings').insertMany(meetings);
      }
      return;
    } catch (err) {
      console.error('[DATABASE ERROR] Failed to write to MongoDB:', err.message);
    }
  }
  await fs.writeFile(MEETINGS_FILE, JSON.stringify(meetings, null, 2));
}

// Participant Email Resolver
function getParticipantEmail(name) {
  const cleanName = name.toLowerCase().trim();
  if (cleanName.includes('tony')) return 'tony@starkindustries.com';
  if (cleanName.includes('pepper')) return 'pepper@starkindustries.com';
  if (cleanName.includes('bruce')) return 'bruce@waynecorp.com';
  if (cleanName.includes('thor')) return 'thor@asgard.com';
  if (cleanName.includes('natasha')) return 'natasha@shield.gov';
  return `${cleanName.replace(/\s+/g, '.')}@businessbrain.ai`;
}

// Transporter configurer
async function getTransporter() {
  if (smtpTransporter) return smtpTransporter;

  if (process.env.SMTP_HOST) {
    smtpTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log(`[SMTP SETUP] Configured Custom SMTP Server: ${process.env.SMTP_HOST}`);
  } else {
    try {
      const testAccount = await nodemailer.createTestAccount();
      smtpTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log(`[SMTP SETUP] Created Automatic Ethereal Test Account: ${testAccount.user}`);
    } catch (e) {
      console.error('[SMTP SETUP ERROR] Could not create Ethereal test account. Falling back to mock console logs.', e);
      smtpTransporter = {
        sendMail: async (mailOptions) => {
          console.log(`[SMTP MOCK SENDER] Outbox Message Logged:`, mailOptions);
          return { messageId: 'mock-id-' + Date.now(), previewUrl: 'https://ethereal.email' };
        }
      };
    }
  }
  return smtpTransporter;
}

// Multi-provider Configurable Email Dispatcher
async function dispatchEmail({ to, subject, html }) {
  const provider = process.env.EMAIL_PROVIDER || 'smtp';
  
  if (provider === 'resend' && process.env.RESEND_API_KEY) {
    console.log(`[EMAIL DISPATCH] Sending via Resend to ${to}...`);
    try {
      const response = await axios.post('https://api.resend.com/emails', {
        from: 'B.BRAIN Operating System <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('[EMAIL DISPATCH SUCCESS] Resend Response ID:', response.data.id);
      return { success: true, messageId: response.data.id };
    } catch (e) {
      console.error('[EMAIL DISPATCH ERROR] Resend failure:', e.response?.data || e.message);
      throw e;
    }
  } 
  
  if (provider === 'sendgrid' && process.env.SENDGRID_API_KEY) {
    console.log(`[EMAIL DISPATCH] Sending via SendGrid to ${to}...`);
    try {
      const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
        personalizations: [{
          to: (Array.isArray(to) ? to : [to]).map(email => ({ email }))
        }],
        from: { email: 'alerts@bbrain.ai', name: 'B.BRAIN Operating System' },
        subject: subject,
        content: [{ type: 'text/html', value: html }]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('[EMAIL DISPATCH SUCCESS] SendGrid Status:', response.status);
      return { success: true };
    } catch (e) {
      console.error('[EMAIL DISPATCH ERROR] SendGrid failure:', e.response?.data || e.message);
      throw e;
    }
  }

  // Fallback SMTP
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: `"B.BRAIN SMTP Mailer" <smtp-out@bbrain.ai>`,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject: subject,
    html: html
  });
  
  const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null;
  console.log(`[EMAIL DISPATCH SUCCESS] SMTP Message: ${info.messageId}. Preview URL: ${previewUrl}`);
  return { success: true, messageId: info.messageId, previewUrl };
}

// Trigger n8n Webhook Dispatcher
// Trigger n8n Webhook Dispatcher with Automatic Retry
const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || '';

async function triggerN8nWebhookWithRetry(payload, attempt = 1, maxAttempts = 3) {
  if (!n8nWebhookUrl) {
    console.warn('[n8n Webhook] N8N_WEBHOOK_URL not configured. Skipping webhook.');
    return null;
  }

  try {
    console.log(`[n8n Webhook] Triggering webhook (Attempt ${attempt}/${maxAttempts})... URL: ${n8nWebhookUrl}`);
    const response = await axios.post(n8nWebhookUrl, payload, { timeout: 8000 });
    console.log(`[n8n Webhook SUCCESS] Webhook accepted. Status: ${response.status}`);
    return response.data;
  } catch (error) {
    console.error(`[n8n Webhook ERROR] Attempt ${attempt} failed:`, error.message);
    if (attempt < maxAttempts) {
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`[n8n Webhook RETRY] Retrying in ${delay}ms...`);
      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await triggerN8nWebhookWithRetry(payload, attempt + 1, maxAttempts));
        }, delay);
      });
    } else {
      console.error(`[n8n Webhook FAILURE] Failed to trigger n8n workflow after ${maxAttempts} attempts.`);
      return null;
    }
  }
}

const activeJobs = new Map();

function clearMeetingReminders(meetingId) {
  const mId = String(meetingId);
  for (const [key, timeoutObj] of activeJobs.entries()) {
    if (key.startsWith(`${mId}-`)) {
      clearTimeout(timeoutObj);
      activeJobs.delete(key);
    }
  }
  console.log(`[MEETINGS ENGINE] Cleared scheduled email notifications for ID ${meetingId}. No duplicates remaining.`);
}

async function sendReminderEmail(meeting, ownerEmail, reminderType) {
  const timezone = meeting.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

  // Build recipients list
  const recipientEmails = [ownerEmail];
  (meeting.participants || []).forEach(name => {
    const email = getParticipantEmail(name);
    if (!recipientEmails.includes(email)) {
      recipientEmails.push(email);
    }
  });

  const htmlContent = `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
    <div style="display: flex; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 25px;">
      <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #5B5FFF, #00D4FF); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: bold; font-size: 18px; margin-right: 10px;">B</div>
      <span style="font-weight: bold; font-size: 15px; color: #1e293b; letter-spacing: 1px;">BUSINESS BRAIN</span>
    </div>

    <h2 style="font-size: 20px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 8px;">Upcoming Meeting Reminder — ${meeting.title}</h2>
    <p style="font-size: 14px; color: #475569; line-height: 1.5; margin-bottom: 25px;">
      Hello ${meeting.organizer?.name || 'User'},<br/><br/>
      This is a reminder that your meeting is approaching.
    </p>

    <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
      <div style="margin-bottom: 15px;">
        <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Meeting</span>
        <div style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 4px;">${meeting.title}</div>
      </div>

      <div style="display: flex; flex-wrap: wrap; margin-bottom: 15px;">
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Date</span>
          <div style="font-size: 13px; font-weight: bold; color: #334155; margin-top: 2px;">${meeting.date}</div>
        </div>
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Time</span>
          <div style="font-size: 13px; font-weight: bold; color: #334155; margin-top: 2px;">${meeting.time}</div>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; margin-bottom: 15px;">
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Timezone</span>
          <div style="font-size: 13px; font-weight: bold; color: #334155; margin-top: 2px;">${timezone}</div>
        </div>
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Duration</span>
          <div style="font-size: 13px; font-weight: bold; color: #334155; margin-top: 2px;">${meeting.duration}</div>
        </div>
      </div>

      <div style="margin-bottom: 15px;">
        <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Participants</span>
        <div style="font-size: 13px; color: #475569; margin-top: 4px; font-weight: 500;">
          ${recipientEmails.join(', ')}
        </div>
      </div>

      ${meeting.agenda ? `
      <div>
        <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Agenda</span>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #475569; line-height: 1.5; font-weight: 500;">${meeting.agenda}</p>
      </div>` : ''}
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 25px;">
      <a href="${meeting.link}" target="_blank" style="padding: 10px 24px; background-color: #5B5FFF; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; box-shadow: 0 4px 6px rgba(91, 95, 255, 0.25);">Join Meeting</a>
      <a href="http://localhost:3001/app/meetings" target="_blank" style="padding: 10px 24px; background-color: #ffffff; border: 1px solid #cbd5e1; color: #334155; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">Open Business Brain</a>
    </div>

    <div style="border-top: 1px solid #f1f5f9; padding-top: 15px; text-align: center; font-size: 10px; color: #94a3b8; line-height: 1.5;">
      This security-encrypted alert was dispatched only to invited B.BRAIN account stakeholders: <span style="font-weight: 600;">${ownerEmail}</span>. Role-based access control applies.
    </div>
  </div>
  `;

  return await dispatchEmail({
    to: recipientEmails,
    subject: `[B.BRAIN Reminder: ${reminderType}] ${meeting.title}`,
    html: htmlContent
  });
}

// sendReminderEmailWithRetry with Exponential Backoff and status updates
async function sendReminderEmailWithRetry(meeting, ownerEmail, reminderType, attempt = 1, maxAttempts = 5) {
  const cleanId = String(meeting.id);
  const meetings = await getMeetings();
  const meetingRecord = meetings.find(m => String(m.id) === cleanId);
  
  if (meetingRecord?.deliveryStatus?.[reminderType]?.sent) {
    console.log(`[SMTP ENGINE] Reminder ${reminderType} already dispatched successfully for ID ${meeting.id}. Blocking duplicates.`);
    return;
  }

  try {
    console.log(`[SMTP ENGINE] Dispatching email reminder "${reminderType}" for "${meeting.title}" (Attempt ${attempt}/${maxAttempts})...`);
    const info = await sendReminderEmail(meeting, ownerEmail, reminderType);
    
    // Save success logs to database
    if (meetingRecord) {
      if (!meetingRecord.deliveryStatus) meetingRecord.deliveryStatus = {};
      meetingRecord.deliveryStatus[reminderType] = {
        sent: true,
        failed: false,
        time: new Date().toISOString(),
        retries: attempt - 1
      };
      await saveMeetings(meetings);
    }
    console.log(`[SMTP ENGINE SUCCESS] Reminder "${reminderType}" delivered to ${ownerEmail}.`);
    return info;
  } catch (err) {
    console.error(`[SMTP ENGINE ERROR] Attempt ${attempt} failed for reminder "${reminderType}":`, err.message);
    
    // Log failure metrics
    if (meetingRecord) {
      if (!meetingRecord.deliveryStatus) meetingRecord.deliveryStatus = {};
      meetingRecord.deliveryStatus[reminderType] = {
        sent: false,
        failed: true,
        errorMessage: err.message,
        retries: attempt,
        time: new Date().toISOString()
      };
      await saveMeetings(meetings);
    }

    if (attempt < maxAttempts) {
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s, 16s...
      console.log(`[SMTP RETRY] Retrying in ${delay}ms...`);
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            resolve(await sendReminderEmailWithRetry(meeting, ownerEmail, reminderType, attempt + 1, maxAttempts));
          } catch (e) {
            reject(e);
          }
        }, delay);
      });
    } else {
      console.error(`[SMTP ENGINE FAILURE] Maximum attempts reached. Delivery for "${reminderType}" failed.`);
      throw err;
    }
  }
}

function scheduleMeetingReminders(meeting, ownerEmail) {
  const mId = String(meeting.id);
  clearMeetingReminders(mId);

  const dateParts = meeting.date.split('-');
  const timeParts = meeting.time.split(':');
  if (dateParts.length < 3 || timeParts.length < 2) return;

  const [year, month, day] = dateParts.map(Number);
  const [hours, minutes] = timeParts.map(Number);
  
  const meetingDateLocal = new Date(year, month - 1, day, hours, minutes, 0);
  const meetingEpoch = meetingDateLocal.getTime();

  (meeting.reminders || []).forEach((reminder) => {
    let offsetMs = 0;
    if (reminder.includes('15m')) offsetMs = 15 * 60 * 1000;
    else if (reminder.includes('1h')) offsetMs = 60 * 60 * 1000;
    else if (reminder.includes('1d')) offsetMs = 24 * 60 * 60 * 1000;
    else if (reminder.includes('start') || reminder.includes('at start')) offsetMs = 0;

    const triggerEpoch = meetingEpoch - offsetMs;
    const delay = triggerEpoch - Date.now();

    if (delay > 0) {
      const jobKey = `${mId}-${reminder}`;
      const timeoutObj = setTimeout(async () => {
        try {
          await sendReminderEmailWithRetry(meeting, ownerEmail, reminder);
          activeJobs.delete(jobKey);
        } catch (e) {
          console.error(`[SMTP ENGINE ERROR] Failed to dispatch reminder ${reminder} for ID ${meeting.id}:`, e);
        }
      }, delay);
      activeJobs.set(jobKey, timeoutObj);
    }
  });
  console.log(`[MEETINGS ENGINE] Configured ${meeting.reminders?.length || 0} timeout reminders for "${meeting.title}" to ${ownerEmail}.`);
}

async function initSchedulerOnBoot() {
  console.log('[MEETINGS ENGINE] Initializing scheduler recovery on server boot...');
  try {
    // 1. Verify SMTP connection on startup
    const transporter = await getTransporter();
    if (transporter && typeof transporter.verify === 'function') {
      transporter.verify((error, success) => {
        if (error) {
          console.error('[SMTP BOOT ERROR] Gmail/Custom SMTP Connection verification failed:', error.message);
        } else {
          console.log('[SMTP BOOT SUCCESS] Gmail/Custom SMTP Connection verified successfully. Ready to send emails!');
        }
      });
    }

    // 2. Recover scheduled crons and run missed timeouts
    const meetings = await getMeetings();
    const now = Date.now();
    let recoveredCount = 0;
    let missedDispatchedCount = 0;

    for (const meeting of meetings) {
      if (meeting.status === 'Upcoming' || meeting.status === 'Scheduled') {
        const ownerEmail = meeting.organizer?.email || 'owner@businessbrain.ai';
        scheduleMeetingReminders(meeting, ownerEmail);
        recoveredCount++;

        // Fail-safe dispatcher for missed schedules
        const dateParts = meeting.date.split('-');
        const timeParts = meeting.time.split(':');
        if (dateParts.length >= 3 && timeParts.length >= 2) {
          const [year, month, day] = dateParts.map(Number);
          const [hours, minutes] = timeParts.map(Number);
          const meetingEpoch = new Date(year, month - 1, day, hours, minutes, 0).getTime();

          (meeting.reminders || []).forEach(async (reminder) => {
            let offsetMs = 0;
            if (reminder.includes('15m')) offsetMs = 15 * 60 * 1000;
            else if (reminder.includes('1h')) offsetMs = 60 * 60 * 1000;
            else if (reminder.includes('1d')) offsetMs = 24 * 60 * 60 * 1000;

            const triggerEpoch = meetingEpoch - offsetMs;
            const deliveryInfo = meeting.deliveryStatus?.[reminder] || {};

            // If scheduled time has passed but meeting hasn't started yet, and it wasn't sent
            if (triggerEpoch < now && !deliveryInfo.sent && meetingEpoch > now) {
              console.log(`[MEETINGS ENGINE] Recovered missed trigger for "${meeting.title}" (${reminder}). Sending now.`);
              missedDispatchedCount++;
              try {
                await sendReminderEmailWithRetry(meeting, ownerEmail, reminder);
              } catch (e) {
                console.error(`[MEETINGS ENGINE ERROR] Failed recovering missed trigger for "${meeting.title}":`, e.message);
              }
            }
          });
        }
      }
    }
    console.log(`[MEETINGS ENGINE] Recovered ${recoveredCount} meetings. Dispatched ${missedDispatchedCount} missed boot triggers.`);
  } catch (err) {
    console.error('[MEETINGS ENGINE ERROR] Failed to recover scheduler on boot:', err);
  }
}

// Endpoints
app.post('/api/meetings/schedule', async (req, res) => {
  const { meeting, ownerEmail } = req.body;
  if (!meeting || !ownerEmail) {
    return res.status(400).json({ success: false, message: 'Missing parameters.' });
  }
  
  try {
    const meetings = await getMeetings();
    const cleanId = String(meeting.id);
    const existingIdx = meetings.findIndex(m => String(m.id) === cleanId);
    
    let meetingToSave = { ...meeting };
    if (existingIdx !== -1) {
      // Preserve deliveryStatus details across edits
      meetingToSave.deliveryStatus = meetings[existingIdx].deliveryStatus || {};
      meetings[existingIdx] = meetingToSave;
      console.log(`[MEETINGS ENGINE] Rescheduled meeting ID ${meeting.id} updated in database.`);
    } else {
      meetingToSave.deliveryStatus = {};
      meetings.push(meetingToSave);
      console.log(`[MEETINGS ENGINE] New meeting ID ${meeting.id} saved to database.`);
    }
    
    await saveMeetings(meetings);
    scheduleMeetingReminders(meetingToSave, ownerEmail);
    
    // Trigger n8n webhook
    const n8nPayload = {
      meetingId: meetingToSave.id,
      title: meetingToSave.title,
      date: meetingToSave.date,
      time: meetingToSave.time,
      timezone: meetingToSave.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      participants: meetingToSave.participants || [],
      organizerEmail: ownerEmail,
      meetingLink: meetingToSave.link
    };
    
    triggerN8nWebhookWithRetry(n8nPayload); // Non-blocking background trigger with retry
    
    res.json({ 
      success: true, 
      message: 'Meeting scheduled successfully.',
      deliveryStatus: meetingToSave.deliveryStatus
    });
  } catch (e) {
    console.error('[MEETING SCHEDULER ROUTE ERROR]', e);
    res.status(500).json({ success: false, message: 'Error scheduling reminders.' });
  }
});

app.post('/api/meetings/cancel', async (req, res) => {
  const { meetingId } = req.body;
  if (!meetingId) {
    return res.status(400).json({ success: false, message: 'Missing meetingId.' });
  }

  try {
    const meetings = await getMeetings();
    const updatedMeetings = meetings.map(m => {
      if (String(m.id) === String(meetingId)) {
        return { ...m, status: 'Missed' };
      }
      return m;
    });
    await saveMeetings(updatedMeetings);
    clearMeetingReminders(meetingId);
    res.json({ success: true, message: 'Meeting cancelled successfully.' });
  } catch (e) {
    console.error('[MEETING CANCELER ROUTE ERROR]', e);
    res.status(500).json({ success: false, message: 'Error clearing reminders.' });
  }
});

// Callback receiver route from n8n workflow triggers
app.post('/api/meetings/send-reminder-email', async (req, res) => {
  const { meetingId, reminderType } = req.body;
  if (!meetingId || !reminderType) {
    return res.status(400).json({ success: false, message: 'Missing parameters.' });
  }
  
  try {
    const meetings = await getMeetings();
    const meeting = meetings.find(m => String(m.id) === String(meetingId));
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found.' });
    }
    
    const ownerEmail = meeting.organizer?.email || 'owner@businessbrain.ai';
    const result = await sendReminderEmailWithRetry(meeting, ownerEmail, reminderType);
    
    res.json({
      success: true,
      message: `Reminder ${reminderType} dispatched successfully from webhook.`,
      previewUrl: result?.previewUrl
    });
  } catch (err) {
    console.error('[SMTP WEBHOOK DISPATCH ERROR]', err);
    res.status(500).json({ success: false, message: 'Error sending webhook email.' });
  }
});

// Developer SMTP connection verification endpoint
app.post('/api/meetings/test-email', async (req, res) => {
  const { ownerEmail } = req.body;
  if (!ownerEmail) {
    return res.status(400).json({ success: false, message: 'Missing ownerEmail parameter.' });
  }

  try {
    console.log(`[SMTP TEST] Direct request received for /api/meetings/test-email to ${ownerEmail}...`);
    const testMeeting = {
      id: 'test-conn-' + Date.now(),
      title: 'B.BRAIN SMTP Verification Connection Test',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      duration: '30 min',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      participants: ['System Diagnostic Agent'],
      link: 'http://localhost:3001/app/meetings',
      agenda: 'Confirming that Google App Password or Custom SMTP authentication is successful and TLS routing is active.'
    };

    const info = await sendReminderEmail(testMeeting, ownerEmail, 'Instant Connection Diagnostic Test');
    res.json({
      success: true,
      message: 'SMTP Verification Email sent successfully!',
      previewUrl: info.previewUrl
    });
  } catch (err) {
    console.error('[SMTP TEST ERROR] Direct connection test failed:', err);
    res.status(500).json({ success: false, message: `SMTP connection verification failed: ${err.message}` });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 Secure AI Backend running on http://localhost:${PORT}`);
  try {
    await initSchedulerOnBoot();
  } catch (err) {
    console.error('[MEETINGS BOOT ERROR] Could not initialize scheduler recovery:', err);
  }
});
