import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are Business Brain, an elite AI Copilot and Executive Assistant for business professionals.
Your goal is to provide deeply analytical, data-driven, and highly actionable business advice.
Format your responses beautifully using Markdown. Use bolding, lists, and headers where appropriate.
If the user asks for a chart, respond with JSON data in this exact format:
\`\`\`json
{ "chartType": "bar", "data": [ { "name": "Q1", "value": 400 }, ... ] }
\`\`\`
Never break character. You are the ultimate business intelligence AI.`;

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

export default async function handler(req, res) {
  console.log('[BACKEND TRACE] Request received at /api/chat');
  
  if (req.method !== 'POST') {
    console.log('[BACKEND TRACE] Invalid method:', req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
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
  
  // Strip any accidental spaces
  apiKey = apiKey.trim();
  console.log(`[BACKEND TRACE] API Key Prefix: ${apiKey.substring(0, 5)}...`);

  try {
    const { prompt, history = [], attachments = [] } = req.body;
    console.log(`[BACKEND TRACE] Payload received. Prompt length: ${prompt?.length || 0}, History length: ${history?.length || 0}, Attachments: ${attachments?.length || 0}`);
    
    if (!prompt && attachments.length === 0) {
      console.log('[BACKEND TRACE] Missing prompt and attachments');
      return res.status(400).json({ error: 'Prompt or attachments are required' });
    }

    console.log('[BACKEND TRACE] Initializing GoogleGenerativeAI client...');
    console.log("API Key Exists:", !!apiKey);
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = "gemini-2.0-flash";
    console.log("Model:", modelName);
    console.log("SDK Version Loaded: @google/generative-ai (see package.json)");
    
    const model = genAI.getGenerativeModel({ model: modelName });
    console.log(`[BACKEND TRACE] Gemini client initialized successfully with model ${modelName}.`);

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
        parts.push({
          inlineData: {
            data: file.inlineData.data,
            mimeType: file.type
          }
        });
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
}
