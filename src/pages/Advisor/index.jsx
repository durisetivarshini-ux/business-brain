import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, TrendingUp, Download, Send, Search, PieChart, X, Loader2, ChevronRightIcon, ShieldAlert, Lightbulb, Sliders } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useAuth } from '@/hooks/useAuth';
import { generateAIResponse } from '@/services/ai';

const PRESET_QUESTIONS = [
  { label: 'Business Health', prompt: 'How is my business performing based on the latest metrics?' },
  { label: 'Risk Analysis', prompt: 'Identify the top 3 biggest operational or financial risks we face right now.' },
  { label: 'Revenue Growth', prompt: 'What are the best opportunities to increase revenue based on our sales records?' },
  { label: 'Expense Reduction', prompt: 'Suggest 3 actionable ways to optimize our costs and increase margins.' }
];

const SWOT_DATA = {
  'Software Company': {
    strengths: ['Highly scalable SaaS subscription business model', 'Strong technical developer skill base', 'Flexible hybrid remote work model'],
    weaknesses: ['Dependency on cloud infrastructure provider pricing', 'Developer recruitment competition', 'Project backlog congestion'],
    opportunities: ['Integration of advanced Generative AI services', 'Targeting mid-market enterprise contracts', 'Launching API marketplace extensions'],
    threats: ['Global outsourced price undercutters', 'API security and data privacy regulations', 'SaaS client churn during recessions']
  },
  'Restaurant': {
    strengths: ['Curated signature dishes', 'High foot-traffic downtown street location', 'Direct local farmer sourcing networks'],
    weaknesses: ['High kitchen and waitstaff turnover rates', 'Perishable ingredient storage waste', 'High weekend peak occupancy stress'],
    opportunities: ['Expanding third-party food delivery partnerships', 'Launching catering packages for local corporations', 'Hosting weekend culinary masterclasses'],
    threats: ['Local food supply inflation', 'Changing neighborhood commercial zones', 'New competitor venues opening nearby']
  },
  'Hospital': {
    strengths: ['Advanced diagnostic imaging technology', 'Highly specialized medical board doctors', 'Integrated electronic health database'],
    weaknesses: ['Long emergency department triage times', 'High nursing shift burnout rates', 'Unpredictable outpatient clinic patient loads'],
    opportunities: ['Integrating remote telehealth outpatient clinics', 'Establishing wellness prevention packages', 'Partnering with university research programs'],
    threats: ['Changing healthcare insurance billing regulations', 'Medical supply chain delays', 'Malpractice claim insurance rate increases']
  },
  'School': {
    strengths: ['Experienced primary teaching staff', 'Modern science labs and smart classrooms', 'Strong parent association engagement'],
    weaknesses: ['Underutilized classrooms during summer months', 'Slow tuition collection feedback loops', 'Teacher administrative task overloads'],
    opportunities: ['Launching weekend coding and science bootcamps', 'Integrating individualized hybrid tutoring tools', 'Expanding student exchange programs'],
    threats: ['Alternative local private tutoring options', 'Demographic school-age population shifts', 'Rising facilities maintenance costs']
  },
  'Retail': {
    strengths: ['Strong customer loyalty club engagement', 'Aesthetic physical storefront layouts', 'Exclusive brand vendor partnerships'],
    weaknesses: ['High warehousing storage cost overheads', 'Slow inventory turns on seasonal items', 'Fragmented checkout desk queues'],
    opportunities: ['Launching omnichannel e-commerce store portals', 'Implementing AI-powered personalized promotions', 'Introducing click-and-collect curbside delivery'],
    threats: ['E-commerce giant logistics price matching', 'Commercial real estate rent inflation', 'Unpredictable seasonal fashion trends']
  },
  'Manufacturing': {
    strengths: ['High-throughput automated assembly machinery', 'Established bulk shipping vendor accounts', 'Meticulous ISO-certified QA testing'],
    weaknesses: ['High energy consumption operating costs', 'Long machine maintenance changeover times', 'Manual warehouse logistics bottlenecks'],
    opportunities: ['Upgrading to IoT predictive machine sensors', 'Sourcing alternative steel/metal vendor routes', 'Implementing modular product assembly'],
    threats: ['Foreign import tariff rate adjustments', 'Raw materials supplier price spikes', 'Skilled machine operator shortages']
  }
};

const DEFAULT_SWOT = {
  strengths: ['Operational focus and brand identity', 'Experienced leadership team', 'Agile customer response feedback'],
  weaknesses: ['Manual data tracking overheads', 'Limited budget for broad scaling', 'Siloed department operations'],
  opportunities: ['Automating workflows using AI systems', 'Optimizing pricing strategies', 'Expanding to adjacent target sectors'],
  threats: ['Stiff competitor pricing wars', 'Rising cloud/logistics costs', 'Macroeconomic market shifts']
};

function formatReportHTML(messages, userProfile, config) {
  const company = config?.companyName || 'Business Brain Enterprise';
  const industry = config?.customIndustry || 'Software Company';

  const htmlRows = messages.map(m => {
    if (m.role === 'user') {
      return `
        <div class="msg flex-right">
          <div>
            <div class="role-user">${userProfile.name || 'You'}</div>
            <div class="content-user">${m.content}</div>
          </div>
        </div>
      `;
    } else {
      const htmlContent = m.content
        .replace(/### (.*)/g, '<h3 style="color:#00D4FF; margin:15px 0 10px 0; font-size:16px;">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>')
        .replace(/\|(.*)\|/g, '<div style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 5px; margin: 2px 0; font-size: 13px;">$1</div>')
        .replace(/\n/g, '<br>');
      
      return `
        <div class="msg">
          <div>
            <div class="role-ai">Business Brain AI Strategist</div>
            <div class="content-ai">${htmlContent}</div>
          </div>
        </div>
      `;
    }
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>AI Strategy Report — ${company}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  body { font-family: 'Inter', sans-serif; background-color: #050816; color: #f8fafc; margin: 0; padding: 40px; }
  .container { max-width: 800px; margin: 0 auto; background: #0b1120; padding: 50px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  h1 { color: #fff; font-size: 28px; margin: 0 0 10px 0; letter-spacing: -0.5px; }
  .meta { color: #94a3b8; font-size: 13px; margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 25px; line-height: 1.5; }
  .msg { margin-bottom: 24px; width: 100%; display: flex; flex-direction: column; }
  .flex-right { align-items: flex-end; }
  .role-user { font-weight: 700; color: #94a3b8; margin-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; text-align: right; }
  .role-ai { font-weight: 700; color: #00D4FF; margin-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  .content-user { background: linear-gradient(to right, #5B5FFF, #7C3AED); padding: 18px 24px; border-radius: 20px 20px 0 20px; color: #fff; display: inline-block; max-width: 85%; box-shadow: 0 10px 25px rgba(91,95,255,0.25); line-height: 1.6; font-size: 14px; }
  .content-ai { background: rgba(255,255,255,0.03); padding: 20px 24px; border-radius: 20px 20px 20px 0; border: 1px solid rgba(255,255,255,0.05); display: inline-block; max-width: 85%; line-height: 1.7; color: #cbd5e1; font-size: 14px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
  .footer { margin-top: 50px; text-align: center; color: #475569; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 25px; }
  @media print {
    body { background-color: #fff; color: #000; padding: 0; }
    .container { background: #fff; border: none; box-shadow: none; max-width: 100%; padding: 20px; }
    h1 { color: #000; }
    .content-user { background: #f1f5f9; color: #000; box-shadow: none; border: 1px solid #e2e8f0; }
    .content-ai { background: #fff; border: 1px solid #e2e8f0; color: #000; box-shadow: none; }
    .role-ai { color: #2563eb; }
    .meta, .footer { border-color: #e2e8f0; color: #64748b; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Executive Strategy Memo</h1>
    <div class="meta">
      <strong>Company:</strong> ${company} <br/>
      <strong>Industry:</strong> ${industry} <br/>
      <strong>Generated By:</strong> ${userProfile.name || 'Account Stakeholder'} (${userProfile.email}) <br/>
      <strong>Timestamp:</strong> ${new Date().toLocaleString()}
    </div>
    ${htmlRows}
    <div class="footer">
      © ${new Date().getFullYear()} ${company}. Confidential &amp; Proprietary Strategic Document.
    </div>
  </div>
</body>
</html>`;
}

export function AdvisorPage() {
  const { workspaceConfig: config, businessData } = useWorkspace();
  const { user } = useAuth();
  
  const industry = config?.customIndustry || 'Software Company';
  const companyName = config?.companyName || 'Business Brain Enterprise';
  const ownerEmail = user?.email || 'owner@businessbrain.ai';

  const userProfile = {
    id: user?.uid || 'guest',
    name: user?.displayName || user?.name || 'Administrator',
    email: ownerEmail,
    role: user?.role || 'Company Owner',
    timezone: config?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  // SWOT calculation
  const swot = SWOT_DATA[industry] || DEFAULT_SWOT;
  const [activeSwotTab, setActiveSwotTab] = useState('strengths');

  // Business Health Score Calculation
  const transactions = businessData?.transactions || [];
  const rev = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const exp = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const profitMargin = rev > 0 ? ((rev - exp) / rev) * 100 : 0;
  
  // Health Score Formula: baseline 75 + profit margin factor
  const calculatedHealthScore = rev > 0 ? Math.max(55, Math.min(100, Math.round(75 + profitMargin / 4))) : 78;

  // Decision Simulator state
  const [simPrice, setSimPrice] = useState(10);
  const [simCost, setSimCost] = useState(5);
  const [simHiring, setSimHiring] = useState(2);

  const getIndustrySuggestedAnalysis = () => {
    switch (industry) {
      case 'Restaurant':
        return [
          { id: 'pricing', label: 'Optimize Menu Pricing', prompt: 'Analyze menu profitability based on our transaction counts and raw food costs. Recommend menu adjustments.', icon: '🍔' },
          { id: 'competitor', label: 'Supplier Cost Assessment', prompt: 'Review our kitchen expense ledger entries and recommend 3 ways to renegotiate supplier contracts.', icon: '📦' },
          { id: 'ops', label: 'Kitchen Wait-time Deflection', prompt: 'Assess order prep bottlenecks and propose a staff scheduling blueprint to lower peak hour delay risks.', icon: '⏱️' }
        ];
      case 'Hospital':
        return [
          { id: 'pricing', label: 'Patient Appointment Scheduling', prompt: 'Evaluate daily patient appointment load distribution and propose physician shift optimizations to lower waiting times.', icon: '🏥' },
          { id: 'competitor', label: 'Pharmacy Stock Management', prompt: 'Analyze raw pharmaceutical stock reorder logs and identify potential shortage warnings.', icon: '💊' },
          { id: 'ops', label: 'Shift Loading Peak Forecast', prompt: 'Assess historical admission rosters to schedule dynamic nurse coverage during weekend spikes.', icon: '📊' }
        ];
      case 'School':
        return [
          { id: 'pricing', label: 'Fee Collection Optimizer', prompt: 'Analyze tuition fee invoices ledger data. Provide optimization paths to accelerate payment collection cycles.', icon: '🎓' },
          { id: 'competitor', label: 'Student Retention Strategies', prompt: 'Assess student dropout indicators and outline academic intervention structures.', icon: '📝' },
          { id: 'ops', label: 'Teacher Roster Allocation', prompt: 'Examine administrative support task hours to maximize direct student coaching time.', icon: '🏫' }
        ];
      case 'Software Company':
        return [
          { id: 'pricing', label: 'SaaS Pricing Tier Auditing', prompt: 'Analyze current customer subscription counts. Suggest Growth and Enterprise pricing tiers adjustments to maximize expansion revenue.', icon: '💰' },
          { id: 'competitor', label: 'Competitor Threat Matrix', prompt: 'Assess competitor SaaS feature offerings. Provide strategic defense maneuvers for API access control integrations.', icon: '🏁' },
          { id: 'ops', label: 'SaaS Tool Cost Optimization', prompt: 'Review marketing stack and hosting expenses to identify cloud rightsizing savings.', icon: '⚙️' }
        ];
      case 'Manufacturing':
        return [
          { id: 'pricing', label: 'Line Utilization Audit', prompt: 'Review machine operating efficiency logs. Suggest maintenance plans to reduce downtime.', icon: '🏭' },
          { id: 'competitor', label: 'Steel Procurement Sourcing', prompt: 'Evaluate metal supplier costs and recommend alternative shipping routes to mitigate tariff inflation.', icon: '⛓️' },
          { id: 'ops', label: 'Logistics Shipping Fleet Optimizer', prompt: 'Optimize bulk product warehouse logistics routes to cut transit fuel cost overheads.', icon: '🚛' }
        ];
      default:
        return [
          { id: 'pricing', label: 'Pricing Strategy Audit', prompt: 'Analyze our ledger transaction entries and suggest price optimizations to maximize gross margin.', icon: '💰' },
          { id: 'competitor', label: 'Operations Cost Optimization', prompt: 'Assess overall balance sheet expenses and identify top 3 cost containment areas.', icon: '⚙️' },
          { id: 'ops', label: 'Core SWOT Strategy Plan', prompt: 'Compile a comprehensive corporate growth strategy recommendation leveraging our operational advantages.', icon: '🏁' }
        ];
    }
  };

  const dynamicAnalysisList = getIndustrySuggestedAnalysis();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Good morning, **${userProfile.name}**. I am your executive AI Advisor for **${companyName}** (${industry} sector). I have compiled the active ledger and customer records. 

Here is our current baseline:
* **Business Health Score**: ${calculatedHealthScore}/100
* **Customer Base**: ${businessData.customers?.length || 0} registered clients
* **Staff Size**: ${businessData.employees?.length || 0} active team members
* **Active Margin**: ${profitMargin.toFixed(1)}% gross profit

Would you like me to run a SWOT analysis, audit cost structures, or run a decision simulation?`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [exporting, setExporting] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const msg = text || input;
    if (!msg.trim() || isTyping) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setIsTyping(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content,
        type: 'text'
      }));
      
      const stream = await generateAIResponse(msg, historyPayload);
      
      setMessages(prev => [...prev, { role: 'ai', content: '' }]);
      
      for await (const chunk of stream) {
        const textChunk = typeof chunk.text === 'function' ? chunk.text() : chunk;
        setMessages(prev => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === 'ai') {
            last.content += textChunk;
          }
          return next;
        });
      }
    } catch (error) {
      toast.error("Failed to connect to the B.BRAIN Advisor server.");
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "I encountered an error querying the strategy engine. Please verify that your backend server is online and your Gemini API keys are configured correctly." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedAnalysis = (item) => {
    handleSend(item.prompt);
    toast.success(`Running ${item.label} Analysis`, { icon: item.icon });
  };

  const handleDecisionSimulate = () => {
    const simPrompt = `Simulate strategic decision query for ${companyName} (${industry}). What is the predicted financial impact on our metrics if we:
1. Increase price tiers by +${simPrice}%
2. Reduce operational cost sectors by -${simCost}%
3. Scale staffing payroll capacity by adding +${simHiring} employee(s).
Please calculate gross margin shifts using our current database counts (Customers: ${businessData.customers?.length || 0}, Employees: ${businessData.employees?.length || 0}, Profit Margin: ${profitMargin.toFixed(1)}%).`;
    handleSend(simPrompt);
    toast.success("Initializing Decision Simulation...", { icon: '🔮' });
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      const text = formatReportHTML(messages, userProfile, config);
      const blob = new Blob([text], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BBrain_Executive_Report_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExporting(false);
      toast.success('Strategy report exported successfully! 📄 (Open and select Print -> Save as PDF)');
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            AI Executive Advisor
          </h1>
          <p className="text-[#94A3B8] font-medium">
            Strategic business consultant synced with <span className="text-white font-bold">{companyName}</span> ({industry})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={exporting || messages.length === 0}
            className="functional-btn px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {exporting ? 'Exporting...' : 'Export PDF Memo'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[calc(100vh-220px)] min-h-[650px]">

        {/* Left: Streaming Chat Strategist */}
        <GlassCard className="xl:col-span-2 p-0 flex flex-col border-[#5B5FFF]/20 bg-[#0B1120]/60 relative overflow-hidden h-full">
          <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-[#5B5FFF] animate-pulse"/>
              <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Executive Strategy Room</h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#94A3B8] font-semibold bg-white/5 px-2.5 py-1 rounded-lg">
              <span>👤 {userProfile.name} ({userProfile.role})</span>
              <span className="w-1 h-2 bg-white/20"></span>
              <span>🌍 {userProfile.timezone}</span>
            </div>
          </div>

          {/* Messages content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/10">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === 'ai' ? (
                  <div className="flex gap-4 max-w-[90%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] shrink-0 flex items-center justify-center mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="space-y-1 w-full">
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">AI Strategist</p>
                      <div className="p-4.5 rounded-2xl rounded-tl-none bg-white/[0.04] border border-white/5 text-white text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 max-w-[85%] ml-auto flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-[#5B5FFF]/30 shrink-0 flex items-center justify-center mt-1">
                      <span className="text-[10px] font-bold text-white uppercase">{userProfile.name[0]}</span>
                    </div>
                    <div className="space-y-1 flex flex-col items-end">
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">You</p>
                      <div className="p-4.5 rounded-2xl rounded-tr-none bg-gradient-to-r from-[#5B5FFF]/20 to-[#7C3AED]/20 border border-[#5B5FFF]/30 text-white text-sm leading-relaxed shadow-[0_0_15px_rgba(91,95,255,0.1)]">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] shrink-0 flex items-center justify-center mt-1">
                  <Bot size={16} className="text-white animate-spin" />
                </div>
                <div className="p-4.5 rounded-2xl rounded-tl-none bg-white/[0.03] border border-white/5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B5FFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B5FFF] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B5FFF] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick preset bubble suggestion selectors */}
          <div className="px-6 py-3 bg-white/[0.01] border-t border-white/5 flex flex-wrap gap-2 shrink-0">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.prompt)}
                disabled={isTyping}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-[#94A3B8] hover:text-white transition-all font-semibold"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input container */}
          <div className="p-5 border-t border-white/5 bg-white/[0.02] shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for reports, strategic forecast simulations, or KPI summaries..."
                className="w-full bg-[#050816] border border-white/10 rounded-xl py-4.5 pl-4 pr-12 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#5B5FFF] transition-colors text-sm font-medium"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="functional-btn absolute right-2.5 top-2.5 bottom-2.5 w-10 bg-white/15 hover:bg-[#5B5FFF] disabled:opacity-40 rounded-lg flex items-center justify-center transition-colors text-white"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Right side: Health Score Card, Decision Simulator, SWOT tab lists */}
        <div className="space-y-6 flex flex-col overflow-y-auto custom-scrollbar h-full pr-1">

          {/* Business Health Meter */}
          <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <PieChart size={14} className="text-[#00D4FF]"/> Business Health Score
            </h3>
            <div className="flex items-center gap-4">
              <div className="relative w-18 h-18 rounded-full border-4 border-white/5 flex items-center justify-center bg-black/20">
                <span className="text-xl font-bold text-white font-mono">{calculatedHealthScore}</span>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00D4FF] border-r-[#5B5FFF] animate-spin-slow"></div>
              </div>
              <div>
                <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Strong</span>
                <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-medium">
                  Profit margins: <span className="text-white font-bold">{profitMargin.toFixed(1)}%</span>. Operational stability looks robust.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* SWOT Analysis Tabs panel */}
          <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4.5 flex items-center gap-2">
              <ShieldAlert size={14} className="text-[#F59E0B]"/> Industry SWOT Analysis
            </h3>
            <div className="grid grid-cols-4 gap-1 border-b border-white/5 pb-2 mb-3.5 text-center text-xs font-bold text-[#94A3B8] select-none">
              {['strengths', 'weaknesses', 'opportunities', 'threats'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSwotTab(tab)}
                  className={`pb-1.5 capitalize transition-all border-b-2 ${
                    activeSwotTab === tab ? 'text-white border-[#5B5FFF]' : 'border-transparent hover:text-white'
                  }`}
                >
                  {tab.slice(0, 4)}
                </button>
              ))}
            </div>
            <ul className="space-y-2.5 min-h-[120px]">
              {(swot[activeSwotTab] || []).map((point, idx) => (
                <li key={idx} className="text-xs text-[#E2E8F0] flex items-start gap-2 leading-relaxed font-medium">
                  <span className="text-[#5B5FFF] mt-1 shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSend(`How can we strategize to address our ${activeSwotTab} in ${companyName}?`)}
              className="w-full mt-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Lightbulb size={12} className="text-[#00D4FF]"/> Ask AI Strategy Blueprint
            </button>
          </GlassCard>

          {/* Decision Simulator sliders */}
          <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Sliders size={14} className="text-[#5B5FFF]"/> Decision Simulator
            </h3>
            
            {/* Price Adjuster */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#94A3B8]">Price adjustment</span>
                <span className="text-white font-mono">+{simPrice}%</span>
              </div>
              <input 
                type="range" 
                min="-20" 
                max="50" 
                value={simPrice}
                onChange={e => setSimPrice(Number(e.target.value))}
                className="w-full accent-[#5B5FFF]"
              />
            </div>

            {/* Cost Cut Adjuster */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#94A3B8]">Cost Reduction</span>
                <span className="text-white font-mono">-${simCost}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="40" 
                value={simCost}
                onChange={e => setSimCost(Number(e.target.value))}
                className="w-full accent-[#00D4FF]"
              />
            </div>

            {/* Hiring Scale Adjuster */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#94A3B8]">New Hires (FTEs)</span>
                <span className="text-white font-mono">+{simHiring} FTEs</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={simHiring}
                onChange={e => setSimHiring(Number(e.target.value))}
                className="w-full accent-[#10B981]"
              />
            </div>

            <button
              onClick={handleDecisionSimulate}
              disabled={isTyping}
              className="w-full py-2.5 bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] hover:scale-[1.02] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_15px_rgba(91,95,255,0.2)]"
            >
              🔮 Simulate Decision Forecast
            </button>
          </GlassCard>

          {/* Suggested Analysis Dynamic Presets */}
          <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Search size={14} className="text-[#00D4FF]"/> Suggested Analysis
            </h3>
            <div className="space-y-2">
              {dynamicAnalysisList.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 3 }}
                  onClick={() => handleSuggestedAnalysis(item)}
                  className="functional-btn w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#5B5FFF]/30 hover:shadow-[0_0_10px_rgba(91,95,255,0.15)] transition-all text-left text-xs text-white font-semibold flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </span>
                  <ChevronRightIcon size={14} className="text-[#94A3B8] group-hover:text-[#5B5FFF] transition-colors" />
                </motion.button>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>
    </div>
  );
}
