import { GoogleGenerativeAI } from '@google/generative-ai';

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

function getSystemInstruction(context = {}) {
  const company = context.companyName || 'Business Brain Enterprise';
  const industry = context.customIndustry || 'Enterprise Software';
  const stage = context.businessStage || 'Growing';
  const businessType = context.businessType || 'Private Corporation';
  const employeeCount = context.employeeCount || '26-50 Employees';
  const annualRevenue = context.annualRevenue || 'Under ₹10 Lakhs';
  const activeModule = context.activeModule || 'General';

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

export default async function handler(req, res) {
  const startTime = Date.now();
  const requestId = `req-${Math.floor(100000 + Math.random() * 900000)}`;
  console.log(`[${requestId}] serverless /api/chat Request Received`);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn(`[${requestId}] GEMINI_API_KEY is missing on the server.`);
    return res.status(200).json({
      success: false,
      message: "I couldn't reach the AI service. Please try again."
    });
  }

  try {
    const { message, prompt, history = [], attachments = [], context = {} } = req.body;
    const rawMessage = message || prompt;
    
    if (!rawMessage && attachments.length === 0) {
      return res.status(400).json({ success: false, message: 'message or prompt or attachment is required' });
    }

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

    const parts = [];
    if (rawMessage) {
      parts.push({ text: rawMessage });
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

    console.log(`[${requestId}] Fetching reply from Gemini with retries...`);
    const result = await startGeminiStreamWithRetry(genAI, systemInstruction, formattedHistory, parts);

    let replyText = '';
    for await (const chunk of result.stream) {
      replyText += chunk.text();
    }

    const executionTime = Date.now() - startTime;
    console.log(`[${requestId}] Request processed in ${executionTime}ms.`);
    return res.json({ success: true, reply: replyText });
  } catch (error) {
    console.error(`[${requestId}] serverless request failed:`, error.stack || error);
    return res.status(200).json({
      success: false,
      message: "I couldn't reach the AI service. Please try again."
    });
  }
}
