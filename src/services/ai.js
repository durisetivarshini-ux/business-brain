// ── Secure Backend AI Service ──────────────────────────────────────────────

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
  const userId = 'guest'; 
  const configRaw = localStorage.getItem(`company_details_${userId}`);
  let context = {};
  if (configRaw) {
    try {
      context = JSON.parse(configRaw);
    } catch (e) {}
  }

  // Gather active business metrics context
  const dataRaw = localStorage.getItem(`company_business_data_${userId}`);
  let businessData = {};
  if (dataRaw) {
    try {
      businessData = JSON.parse(dataRaw);
    } catch (e) {}
  }

  const transactions = businessData.transactions || [];
  const totalRevenue = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  context.businessMetrics = {
    hasRealData: !!businessData.hasData,
    totalRevenue,
    totalExpenses,
    customerCount: businessData.customers?.length || 0,
    employeeCount: businessData.employees?.length || 0,
    productCount: businessData.products?.length || 0,
    recentTransactions: transactions.slice(0, 5),
    meetings: businessData.meetings || []
  };

  // Gather location-specific workspace module context automatically
  const currentPath = window.location.pathname;
  context.currentPath = currentPath;
  context.activeModule = getActiveModuleFromPath(currentPath);

  // System context parameters
  context.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  context.language = 'English';
  context.theme = 'Dark';

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
