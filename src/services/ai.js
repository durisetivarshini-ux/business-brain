// ── Secure Backend AI Service ──────────────────────────────────────────────
import { auth } from '../firebase/firebase';

function getActiveModuleFromPath(path) {
  if (path.includes('/finance')) return 'Finance';
  if (path.includes('/crm')) return 'CRM';
  if (path.includes('/hrms') || path.includes('/hr')) return 'HR';
  if (path.includes('/inventory')) return 'Inventory';
  if (path.includes('/marketing')) return 'Marketing';
  if (path.includes('/meetings')) return 'Meetings';
  if (path.includes('/support')) return 'Support';
  if (path.includes('/documents')) return 'Documents';
  if (path.includes('/analytics')) return 'Analytics';
  if (path.includes('/sales')) return 'Sales';
  if (path.includes('/goals')) return 'Goals';
  if (path.includes('/risks')) return 'Risks';
  if (path.includes('/advisor')) return 'Advisor';
  return 'General';
}

export async function generateAIResponse(prompt, history = [], attachments = [], abortSignal) {
  const userId = auth?.currentUser?.uid || 'guest'; 
  
  // 1. Gather Workspace Configurations
  const configRaw = localStorage.getItem(`company_details_${userId}`);
  let config = {};
  if (configRaw) {
    try {
      config = JSON.parse(configRaw);
    } catch (e) {}
  }

  // 2. Gather Workspace Business Database Tables
  const dataRaw = localStorage.getItem(`company_business_data_${userId}`);
  let businessData = {};
  if (dataRaw) {
    try {
      businessData = JSON.parse(dataRaw);
    } catch (e) {}
  }

  // 3. Fallback/Integrations for custom pages (e.g., branches or products from mockDb if not in businessData)
  let products = businessData.products || [];
  if (products.length === 0) {
    try {
      const dbProductsRaw = localStorage.getItem('bb_products');
      if (dbProductsRaw) products = JSON.parse(dbProductsRaw);
    } catch (e) {}
  }

  let branches = [];
  try {
    const dbBranchesRaw = localStorage.getItem('bb_branches');
    if (dbBranchesRaw) branches = JSON.parse(dbBranchesRaw);
  } catch (e) {}

  const transactions = businessData.transactions || [];
  const totalRevenue = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const profitMargin = totalRevenue > 0 ? (((totalRevenue - totalExpenses) / totalRevenue) * 100).toFixed(1) + '%' : '0%';

  // 4. Extract Goals and KPIs
  let goals = config.goals || [];
  if (goals.length === 0) {
    goals = [
      { title: 'Q4 Revenue Target', department: 'Sales', current: '8.5M', target: '10M', progress: '85%', status: 'On Track' },
      { title: 'Customer Acquisition', department: 'Marketing', current: '4200', target: '5000', progress: '84%', status: 'On Track' },
      { title: 'Reduce Server Costs', department: 'Operations', current: '15%', target: '20%', progress: '75%', status: 'At Risk' },
      { title: 'Employee Retention', department: 'HR', current: '92%', target: '95%', progress: '96%', status: 'Achieved' }
    ];
  }

  // 5. Build Structured Business Context Layer (Passed to LLM system instructions)
  const businessContext = {
    hasRealData: !!businessData.hasData,
    company: {
      name: config.companyName || 'Guest Company',
      industry: config.industrySegment || 'Technology',
      type: config.businessType || 'Software Company',
      stage: config.businessStage || 'Early Stage',
      teamSize: config.teamSize || '1-10 employees',
      annualRevenueRange: config.annualRevenue || 'Less than $1M',
      currency: config.currencySymbol || '$',
      officeTiming: config.officeTiming || '09:00 - 18:00',
      workingDays: config.workingDays || '5 Days'
    },
    enabledModules: config.modules || ['CRM', 'Sales', 'Finance', 'HR', 'Inventory', 'Support'],
    crm: {
      totalCustomers: businessData.customers?.length || 0,
      customers: (businessData.customers || []).map(c => ({ name: c.name, status: c.status, value: c.value })),
      pipelineStages: config.pipelineStages || ["Lead", "Contacted", "Proposal Sent", "Negotiation", "Closed Won"]
    },
    inventory: {
      totalProducts: products.length,
      products: products.map(p => ({ sku: p.sku, name: p.name, stock: p.stock, price: p.sellingPrice, purchasePrice: p.purchasePrice, status: p.status }))
    },
    finance: {
      totalRevenue,
      totalExpenses,
      profitMargin,
      transactionsCount: transactions.length,
      recentTransactions: transactions.slice(0, 10).map(t => ({ description: t.description, amount: t.amount, date: t.date, category: t.category }))
    },
    hr: {
      totalEmployees: businessData.employees?.length || 0,
      employees: (businessData.employees || []).map(e => ({ name: e.name, role: e.role, department: e.dept, performance: e.performance })),
      leavePolicy: config.leavePolicy || '18 Paid Leaves',
      attendanceMethod: config.attendanceMethod || 'Biometric'
    },
    meetings: (businessData.meetings || []).map(m => ({ title: m.title, date: m.date, time: m.time, attendees: m.attendees, tasksCount: m.notes?.tasks?.length || 0 })),
    tasks: businessData.tasks || [
      { title: 'Send welcome email to new employees', status: 'Pending', priority: 'High' },
      { title: 'Verify tax configuration parameters', status: 'Completed', priority: 'Medium' }
    ],
    goals: goals,
    branches: branches.map(b => ({ name: b.name, region: b.region, status: b.status, revenue: b.revenue }))
  };

  const currentPath = window.location.pathname;
  const context = {
    userId,
    currentPath,
    activeModule: getActiveModuleFromPath(currentPath),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
    language: 'English',
    theme: 'Dark',
    businessContext
  };

  console.log('[FRONTEND TRACE] Generating AI Response for module:', context.activeModule);

  const generator = async function* () {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt, 
          history: history.map(h => ({ role: h.role, content: h.content, type: h.type })), 
          attachments,
          context
        }),
        signal: abortSignal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} Error`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: !done });
        if (chunkValue) {
          yield { text: () => chunkValue };
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error;
      }
      console.error('[FRONTEND TRACE] AI Service Stream Error caught:', error);
      throw new Error("I couldn't reach the AI service. Please try again.");
    }
  };

  const gen = generator();
  gen.stream = gen;
  return gen;
}
