import { generateContentStream } from '../server/aiService.js';

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
  const biz = context.businessContext || {};
  const company = biz.company?.name || context.companyName || 'Business Brain Enterprise';
  const industry = biz.company?.industry || context.customIndustry || 'Enterprise Software';
  const stage = biz.company?.stage || context.businessStage || 'Growing';
  const businessType = biz.company?.type || context.businessType || 'Private Corporation';
  const employeeCount = biz.company?.teamSize || context.employeeCount || '26-50 Employees';
  const annualRevenue = biz.company?.annualRevenueRange || context.annualRevenue || 'Under ₹10 Lakhs';
  const activeModule = context.activeModule || 'General';
  const currencySymbol = biz.company?.currency || '$';

  let dataContext = "";
  if (biz.hasRealData) {
    dataContext = `
# LIVE BUSINESS WORKSPACE DATABASE CONTEXT:
All calculations, predictions, margins, and operational strategy feedback MUST be mathematically derived from this live database context.

## Company Details:
- Name: ${company}
- Sector/Industry: ${industry}
- Stage: ${stage}
- Type: ${businessType}
- Size: ${employeeCount}
- Revenue Range: ${annualRevenue}
- Currency Symbol: ${currencySymbol}
- Timing: ${biz.company?.officeTiming || '09:00 - 18:00'}
- Working Days: ${biz.company?.workingDays || '5 Days'}

## Enabled Modules:
${JSON.stringify(biz.enabledModules || [])}

## CRM (Leads & Customers):
- Total Customers: ${biz.crm?.totalCustomers || 0}
- Customer Pipeline Stages: ${JSON.stringify(biz.crm?.pipelineStages || [])}
- Active Customer Profiles: ${JSON.stringify(biz.crm?.customers || [])}

## Inventory:
- Total Products: ${biz.inventory?.totalProducts || 0}
- Products Catalog (SKU, Name, Stock, Price, PurchasePrice, Status): ${JSON.stringify(biz.inventory?.products || [])}

## Finance Ledger:
- Total Logged Revenue: ${currencySymbol}${biz.finance?.totalRevenue?.toLocaleString()}
- Total Logged Expenses: ${currencySymbol}${biz.finance?.totalExpenses?.toLocaleString()}
- Gross Profit Margin: ${biz.finance?.profitMargin || '0%'}
- Transactions Count: ${biz.finance?.transactionsCount || 0}
- Recent Transaction Items: ${JSON.stringify(biz.finance?.recentTransactions || [])}

## Human Resources (HR):
- Total Employees: ${biz.hr?.totalEmployees || 0}
- Employees List (Name, Role, Department, Performance): ${JSON.stringify(biz.hr?.employees || [])}
- Leave Policy: ${biz.hr?.leavePolicy || '18 Paid Leaves'}
- Attendance Method: ${biz.hr?.attendanceMethod || 'Biometric'}

## Meetings:
- Scheduled Meetings (Title, Date, Time, Attendees, Action Tasks Count): ${JSON.stringify(biz.meetings || [])}

## Tasks/OKRs:
- Active Tasks (Title, Status, Priority): ${JSON.stringify(biz.tasks || [])}

## Goals/KPIs:
- Active Goal KPIs: ${JSON.stringify(biz.goals || [])}

## Branches:
- Branch Offices: ${JSON.stringify(biz.branches || [])}

### MANDATORY INTEGRITY RULES:
1. Do not invent, hallucinate, or assume any information that is not explicitly present in the data lists above.
2. If queried about a module's metrics or data that is empty or contains no records (e.g. no products exist in the inventory catalog, or no meetings are scheduled), you MUST clearly and explicitly state that the data is unavailable in the database. For example: "I see that you currently have no products registered in your inventory. To analyze your pricing strategy, please add products to your Inventory module."
`;
  } else {
    dataContext = `
# NO OPERATIONAL DATABASE DATA FOUND:
The user has not entered or imported any business records (employees, inventory, customers, transactions) to the platform yet. 

### MANDATORY INTEGRITY RULES:
1. Do not output mock data, fake metrics, or hypothetical analytics.
2. Instruct the user to complete the setup checklists, import their spreadsheets (CSV/Excel), or connect their accounting software (Shopify, QuickBooks, Zoho, Tally) using the Admin Setup Wizard on the dashboard to unlock dashboard charts and AI strategic recommendations.
`;
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
      moduleInstruction = `You are a world-class Executive AI Strategy Consultant. You operate with 8 specialized business reasoning layers:
- Finance Layer: Analyzes cashflow, ledger transactions, net profit, margins, and cost structures.
- Sales Layer: Analyzes pipeline velocity, deal wins, customer counts, and CRM metrics.
- HR Layer: Analyzes staff allocations, payroll, leave profiles, and department sizes.
- Operations Layer: Analyzes branch offices, timing configurations, and workflow tools.
- Marketing Layer: Analyzes campaign channels, brand reach, and lead acquisition options.
- Risk Layer: Analyzes database safety margins, cash cushions, and security guidelines.
- Inventory Layer: Analyzes product catalogs, SKU statuses, stock alerts, and pricing items.
- Strategy Layer: Analyzes SWOT quadrants, digital twins, and strategic simulations.

### REASONING PROTOCOL:
1. Identify the user's intent. Automatically select the single most appropriate reasoning layer from the 8 layers listed above based on the query.
2. Output the chosen layer at the very beginning of your response formatted exactly as: "[Reasoning Layer: <Layer Name>]" on its own line (e.g. "[Reasoning Layer: Finance]").
3. Restructure your entire response to output exactly these five markdown sections:
   
   ### Summary
   [Provide a high-level executive summary of findings based on the live database]

   ### Supporting Data
   [Provide a structured markdown table or bullet lists detailing actual database metrics, products, meetings, employees, or leads. If no data exists, output 'No records available in database' and direct the user on how to populate the module.]

   ### Strategic Reasoning
   [Provide logical reasoning and business framework breakdowns (SWOT, DuPont, MECE) for the findings]

   ### Recommendations
   [Provide concrete, actionable next steps, incorporating relevant Action links where applicable]

   ### Expected Business Impact
   [Provide estimated outcome percentages, margin improvements, or risks mitigated]

4. Rules: Do not make up fake data or placeholders. If the user's actual database details are empty, report it.`;
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
      message: "AI Error: GEMINI_API_KEY is not configured in the environment."
    });
  }

  try {
    const { message, prompt, history = [], attachments = [], context = {} } = req.body;
    const rawMessage = message || prompt;
    
    if (!rawMessage && attachments.length === 0) {
      return res.status(400).json({ success: false, message: 'message or prompt or attachment is required' });
    }

    const systemInstruction = getSystemInstruction(context);

    console.log(JSON.stringify({
      eventType: 'ai_request_routed',
      endpoint: '/api/chat',
      activeModule: context.activeModule || 'General',
      timestamp: new Date().toISOString()
    }));

    const stream = generateContentStream(apiKey, rawMessage, history, systemInstruction, attachments, context);

    let replyText = '';
    for await (const chunk of stream) {
      replyText += chunk;
    }

    const executionTime = Date.now() - startTime;
    console.log(`[${requestId}] Request processed in ${executionTime}ms.`);
    return res.json({ success: true, reply: replyText });
  } catch (error) {
    console.error(`[${requestId}] serverless request failed:`, error.stack || error);
    return res.status(200).json({
      success: false,
      message: `AI Error: ${error.message}. Please check your connection or key.`
    });
  }
}
