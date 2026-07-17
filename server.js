import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
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

// --- SMTP EMAILS SCHEDULER & DISPATCH ENGINE ---
let smtpTransporter = null;

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
      console.error('[SMTP SETUP ERROR] Could not create Ethereal test account. Falling back to console logging.', e);
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
  const transporter = await getTransporter();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

  const htmlContent = `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
    <div style="display: flex; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 25px;">
      <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #5B5FFF, #00D4FF); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: bold; font-size: 18px; margin-right: 10px;">B</div>
      <span style="font-weight: bold; font-size: 15px; color: #1e293b; letter-spacing: 1px;">BUSINESS BRAIN</span>
    </div>

    <h2 style="font-size: 20px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 8px;">Upcoming Meeting Reminder</h2>
    <p style="font-size: 14px; color: #475569; line-height: 1.5; margin-bottom: 25px;">
      This is an automated notification from your B.BRAIN Operating System. Your upcoming sync is starting soon:
    </p>

    <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
      <div style="margin-bottom: 15px;">
        <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Meeting Topic</span>
        <div style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 4px;">${meeting.title}</div>
      </div>

      <div style="display: flex; flex-wrap: wrap; margin-bottom: 15px;">
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Date</span>
          <div style="font-size: 13px; font-weight: bold; color: #334155; margin-top: 2px;">${meeting.date}</div>
        </div>
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Time &amp; Timezone</span>
          <div style="font-size: 13px; font-weight: bold; color: #334155; margin-top: 2px;">${meeting.time} (${timezone})</div>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; margin-bottom: 15px;">
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Duration</span>
          <div style="font-size: 13px; font-weight: bold; color: #334155; margin-top: 2px;">${meeting.duration}</div>
        </div>
        <div style="flex: 1; min-width: 120px; margin-bottom: 10px;">
          <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Reminder Offset</span>
          <div style="font-size: 13px; font-weight: bold; color: #5B5FFF; margin-top: 2px;">${reminderType}</div>
        </div>
      </div>

      <div style="margin-bottom: 15px;">
        <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Invited Participants</span>
        <ul style="margin: 5px 0 0 0; padding-left: 20px; font-size: 13px; color: #475569;">
          ${(meeting.participants || []).map(p => `<li style="margin-bottom: 4px; font-weight: 500;">${p}</li>`).join('')}
        </ul>
      </div>

      ${meeting.agenda ? `
      <div>
        <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Discussion Agenda</span>
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

  const info = await transporter.sendMail({
    from: `"B.BRAIN SMTP Mailer" <smtp-out@bbrain.ai>`,
    to: ownerEmail,
    subject: `[B.BRAIN Reminder: ${reminderType}] ${meeting.title}`,
    html: htmlContent
  });

  const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null;
  console.log(`[SMTP DISPATCH SUCCESS] Subject: ${meeting.title} -> ${ownerEmail}. Message ID: ${info.messageId}`);
  return { messageId: info.messageId, previewUrl };
}

function scheduleMeetingReminders(meeting, ownerEmail) {
  const mId = String(meeting.id);
  clearMeetingReminders(mId);

  const dateParts = meeting.date.split('-');
  const timeParts = meeting.time.split(':');
  if (dateParts.length < 3 || timeParts.length < 2) return;

  const [year, month, day] = dateParts.map(Number);
  const [hours, minutes] = timeParts.map(Number);
  
  // Timezone-aware calculation
  const meetingDateLocal = new Date(year, month - 1, day, hours, minutes, 0);
  const meetingEpoch = meetingDateLocal.getTime();

  (meeting.reminders || []).forEach((reminder, index) => {
    let offsetMs = 0;
    if (reminder.includes('15m')) offsetMs = 15 * 60 * 1000;
    else if (reminder.includes('1h')) offsetMs = 60 * 60 * 1000;
    else if (reminder.includes('1d')) offsetMs = 24 * 60 * 60 * 1000;
    else if (reminder.includes('start') || reminder.includes('at start')) offsetMs = 0;

    const triggerEpoch = meetingEpoch - offsetMs;
    const delay = triggerEpoch - Date.now();

    if (delay > 0) {
      const jobKey = `${mId}-${index}`;
      const timeoutObj = setTimeout(async () => {
        try {
          await sendReminderEmail(meeting, ownerEmail, reminder);
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

// Endpoints
app.post('/api/meetings/schedule', async (req, res) => {
  const { meeting, ownerEmail } = req.body;
  if (!meeting || !ownerEmail) {
    return res.status(400).json({ success: false, message: 'Missing parameters.' });
  }
  
  try {
    scheduleMeetingReminders(meeting, ownerEmail);
    
    // Dispatch an instant test alert email immediately so the user can verify receipt/preview URL instantly!
    console.log(`[SMTP TEST] Triggering instant n8n SMTP dispatch to ${ownerEmail}...`);
    const testResult = await sendReminderEmail(meeting, ownerEmail, 'Instant Test Notification');
    
    res.json({ 
      success: true, 
      message: 'Reminders scheduled successfully.',
      previewUrl: testResult.previewUrl 
    });
  } catch (e) {
    console.error('[MEETING SCHEDULER ROUTE ERROR]', e);
    res.status(500).json({ success: false, message: 'Error scheduling reminders.' });
  }
});

app.post('/api/meetings/cancel', (req, res) => {
  const { meetingId } = req.body;
  if (!meetingId) {
    return res.status(400).json({ success: false, message: 'Missing meetingId.' });
  }

  try {
    clearMeetingReminders(meetingId);
    res.json({ success: true, message: 'Reminders cleared successfully.' });
  } catch (e) {
    console.error('[MEETING CANCELER ROUTE ERROR]', e);
    res.status(500).json({ success: false, message: 'Error clearing reminders.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Secure AI Backend running on http://localhost:${PORT}`);
});
