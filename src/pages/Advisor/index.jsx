import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, FileText, TrendingUp, Download, Send, Search, PieChart, X, Loader2, ChevronRightIcon } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const SUGGESTED_ANALYSIS = [
  {
    id: 'pricing',
    label: 'Review Pricing Strategy',
    prompt: 'Analyze our current pricing tiers. Are we leaving revenue on the table? What competitive pricing adjustments should we consider for Q4?',
    icon: '💰',
  },
  {
    id: 'competitor',
    label: 'Competitor Threat Assessment',
    prompt: 'Assess the top 3 competitor threats we face right now. What are their strengths, our vulnerabilities, and recommended counter-strategies?',
    icon: '🏁',
  },
  {
    id: 'ops',
    label: 'Optimize Operational Costs',
    prompt: 'Review our operational cost structure. Where are we overspending and what are 3 actionable ways to reduce costs without impacting growth?',
    icon: '⚙️',
  },
];

const INITIAL_MESSAGES = [
  {
    role: 'ai',
    content: `Good morning. I've analyzed our Q3 metrics. I noticed a 12% drop in Enterprise renewals. Would you like me to generate a churn risk report or suggest retention strategies?`,
  },
  {
    role: 'user',
    content: 'Generate the churn risk report and summarize the top 3 reasons for the drop.',
  },
  {
    role: 'ai',
    content: 'churn_analysis',
  },
];

function ChurnReport() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-white leading-relaxed">Here is the analysis based on recent CRM data and support tickets:</p>
      <div className="p-4 bg-[#050816]/60 rounded-xl border border-white/5">
        <h4 className="font-bold text-[#00D4FF] mb-3 flex items-center gap-2 text-sm">
          <PieChart size={16}/> Top Churn Factors (Q3)
        </h4>
        <ul className="space-y-2">
          {[['Missing API Features', '42%', '#EF4444'], ['Budget Constraints', '28%', '#F59E0B'], ['Slow Support Response', '15%', '#8B5CF6']].map(([label, pct, color]) => (
            <li key={label} className="flex justify-between items-center text-sm">
              <span className="text-white">{label}</span>
              <span className="font-bold px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: `${color}20`, color }}>{pct}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        I recommend assigning 2 additional support agents to the Enterprise tier and prioritizing the API v2 rollout.
      </p>
    </div>
  );
}

const MOCK_RESPONSES = {
  pricing: `### Pricing Strategy Review\n\n**Current Tiers:** Starter ($49/mo), Pro ($149/mo), Enterprise (custom)\n\n**Key Finding:** 34% of Enterprise customers downgraded to Pro due to perceived feature overlap.\n\n**Recommendations:**\n1. Introduce a **Growth tier ($299/mo)** between Pro and Enterprise\n2. Differentiate Enterprise with dedicated SLA + white-glove onboarding\n3. Run a value-add campaign to existing Pro customers targeting upgrade`,
  competitor: `### Competitor Threat Assessment\n\n| Competitor | Threat Level | Key Risk |\n|---|---|---|\n| AcmeCRM | High | Lower price point |\n| TechFlow | Medium | API ecosystem |\n| DataBridge | Low | Regional only |\n\n**Counter-strategies:**\n1. Launch API marketplace to counter TechFlow\n2. Offer a price-lock guarantee for 24-month Enterprise plans\n3. Expand content marketing to capture AcmeCRM comparison searches`,
  ops: `### Operational Cost Optimization\n\n**Identified Savings: $142,000/year**\n\n1. **Cloud waste:** Rightsize 14 idle EC2 instances → saves ~$48K/yr\n2. **SaaS sprawl:** 3 overlapping tools in marketing stack → saves ~$36K/yr\n3. **Support efficiency:** Implement AI deflection for L1 tickets → saves ~$58K/yr\n\n**Priority:** Cloud rightsizing has the fastest ROI (starts saving in 30 days).`,
};

function formatReportHTML(messages) {
  const htmlRows = messages.map(m => {
    if (m.role === 'user') {
      return `
        <div class="msg flex-right">
          <div>
            <div class="role-user">You</div>
            <div class="content-user">${m.content}</div>
          </div>
        </div>
      `;
    } else {
      let htmlContent = '';
      if (m.content === 'churn_analysis') {
        htmlContent = `
          <h4 style="color: #38bdf8; margin: 0 0 10px 0; font-size: 16px;">Top Churn Factors (Q3)</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Missing API Features</span> <strong style="color: #ef4444; background: rgba(239,68,68,0.1); padding: 2px 8px; border-radius: 10px; font-size: 12px;">42%</strong></li>
            <li style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Budget Constraints</span> <strong style="color: #f59e0b; background: rgba(245,158,11,0.1); padding: 2px 8px; border-radius: 10px; font-size: 12px;">28%</strong></li>
            <li style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Slow Support Response</span> <strong style="color: #8b5cf6; background: rgba(139,92,246,0.1); padding: 2px 8px; border-radius: 10px; font-size: 12px;">15%</strong></li>
          </ul>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 15px; line-height: 1.5;">Recommendation: 2 additional Enterprise support agents and API v2 prioritization.</p>
        `;
      } else {
        htmlContent = m.content
          .replace(/### (.*)/g, '<h3 style="color:#00D4FF; margin:10px 0 15px 0;">$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>')
          .replace(/\|(.*)\|/g, '<div style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 5px; margin: 2px 0;">$1</div>') // hack for quick table render
          .replace(/\n/g, '<br>');
      }
      
      return `
        <div class="msg">
          <div>
            <div class="role-ai">Business Brain AI</div>
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
<title>Strategy Session Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  body { font-family: 'Inter', sans-serif; background-color: #050816; color: #f8fafc; margin: 0; padding: 40px; }
  .container { max-width: 800px; margin: 0 auto; background: #0b1120; padding: 50px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  h1 { color: #fff; font-size: 32px; margin: 0 0 10px 0; letter-spacing: -0.5px; }
  .date { color: #94a3b8; font-size: 14px; margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 25px; }
  .msg { margin-bottom: 24px; width: 100%; display: flex; flex-direction: column; }
  .flex-right { align-items: flex-end; }
  .role-user { font-weight: 700; color: #94a3b8; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; text-align: right; }
  .role-ai { font-weight: 700; color: #00D4FF; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
  .content-user { background: linear-gradient(to right, #5B5FFF, #7C3AED); padding: 18px 24px; border-radius: 20px 20px 0 20px; color: #fff; display: inline-block; max-width: 85%; box-shadow: 0 10px 25px rgba(91,95,255,0.25); line-height: 1.6; font-size: 15px; }
  .content-ai { background: rgba(255,255,255,0.03); padding: 20px 24px; border-radius: 20px 20px 20px 0; border: 1px solid rgba(255,255,255,0.05); display: inline-block; max-width: 85%; line-height: 1.7; color: #cbd5e1; font-size: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
  .footer { margin-top: 50px; text-align: center; color: #475569; font-size: 13px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 25px; }
  @media print {
    body { background-color: #fff; color: #000; padding: 0; }
    .container { background: #fff; border: none; box-shadow: none; max-width: 100%; padding: 20px; }
    h1 { color: #000; }
    .content-user { background: #f1f5f9; color: #000; box-shadow: none; border: 1px solid #e2e8f0; }
    .content-ai { background: #fff; border: 1px solid #e2e8f0; color: #000; box-shadow: none; }
    .role-ai { color: #2563eb; }
    .date, .footer { border-color: #e2e8f0; color: #64748b; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Strategy Session Report</h1>
    <div class="date">Generated by <strong>Business Brain AI</strong> • ${new Date().toLocaleString()}</div>
    ${htmlRows}
    <div class="footer">
      © ${new Date().getFullYear()} Business Brain Inc. Confidential and Proprietary.
    </div>
  </div>
</body>
</html>`;
}

export function AdvisorPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [exporting, setExporting] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim() || isTyping) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setIsTyping(true);

    setTimeout(() => {
      const lower = msg.toLowerCase();
      let reply = '';
      if (lower.includes('pricing')) reply = MOCK_RESPONSES.pricing;
      else if (lower.includes('competitor')) reply = MOCK_RESPONSES.competitor;
      else if (lower.includes('cost') || lower.includes('operational')) reply = MOCK_RESPONSES.ops;
      else if (lower.includes('churn') || lower.includes('renewal')) reply = 'churn_analysis';
      else reply = `I've analyzed your query across all data sources.\n\n**Key Finding:** Your Q3 data shows strong fundamentals with targeted risk in Enterprise renewal rates. Would you like me to drill deeper into revenue, HR, marketing, or operational metrics?`;

      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      const text = formatReportHTML(messages);
      const blob = new Blob([text], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AI_Strategy_Report_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExporting(false);
      toast.success('Strategy report exported successfully! 📄');
    }, 1200);
  };

  const handleSuggestedAnalysis = (item) => {
    handleSend(item.prompt);
    toast.success(`Running: ${item.label}`, { icon: item.icon });
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
            AI Business Advisor
          </h1>
          <p className="text-[#94A3B8] font-medium">Strategic intelligence and on-demand business analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={exporting || messages.length === 0}
            className="functional-btn px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {exporting ? 'Exporting…' : 'Export Report'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[calc(100vh-220px)] min-h-[600px]">

        {/* Left: Interactive Chat/Advisor */}
        <GlassCard className="xl:col-span-2 p-0 flex flex-col border-[#5B5FFF]/20 bg-[#0B1120]/60 relative overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} className="text-[#5B5FFF]"/> Strategy Session
            </h2>
            <span className="text-xs bg-[#10B981]/20 text-[#10B981] px-2 py-1 rounded-md font-bold">Online</span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === 'ai' ? (
                  <div className="flex gap-4 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] shrink-0 flex items-center justify-center mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="space-y-2 w-full">
                      <p className="text-sm text-[#94A3B8] font-bold">Business Brain AI</p>
                      <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-white text-sm leading-relaxed">
                        {msg.content === 'churn_analysis' ? (
                          <ChurnReport />
                        ) : (
                          <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-[#5B5FFF]/30 shrink-0 flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-white">You</span>
                    </div>
                    <div className="space-y-2 flex flex-col items-end">
                      <p className="text-sm text-[#94A3B8] font-bold">You</p>
                      <div className="p-4 rounded-2xl rounded-tr-none bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm leading-relaxed shadow-[0_0_15px_rgba(91,95,255,0.3)]">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] shrink-0 flex items-center justify-center mt-1">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5B5FFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#5B5FFF] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#5B5FFF] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-white/[0.02] shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for reports, strategies, or insights..."
                className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#5B5FFF] transition-colors text-sm"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="functional-btn absolute right-2 top-2 bottom-2 w-10 bg-white/10 hover:bg-[#5B5FFF] disabled:opacity-40 rounded-lg flex items-center justify-center transition-colors text-white"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Right: Suggested Analysis + Market Signals */}
        <div className="space-y-6 flex flex-col">

          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Search size={16} className="text-[#00D4FF]"/> Suggested Analysis
            </h3>
            <div className="space-y-2">
              {SUGGESTED_ANALYSIS.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 3 }}
                  onClick={() => handleSuggestedAnalysis(item)}
                  className="functional-btn w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#5B5FFF]/30 hover:shadow-[0_0_10px_rgba(91,95,255,0.15)] transition-all text-left text-sm text-white font-medium flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                  <ChevronRightIcon size={16} className="text-[#94A3B8] group-hover:text-[#5B5FFF] transition-colors" />
                </motion.button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex-1">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#10B981]"/> Live Market Signals
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
                <p className="text-xs text-[#10B981] font-bold uppercase tracking-wider mb-1">Positive Trend</p>
                <p className="text-sm text-white">Demand for SaaS automation tools is up 18% globally this month.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                <p className="text-xs text-[#F59E0B] font-bold uppercase tracking-wider mb-1">Warning</p>
                <p className="text-sm text-white">Cloud hosting costs are projected to increase by 5% next quarter.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#5B5FFF]/10 border border-[#5B5FFF]/20">
                <p className="text-xs text-[#5B5FFF] font-bold uppercase tracking-wider mb-1">Opportunity</p>
                <p className="text-sm text-white">AI adoption in mid-market companies surged 34% — expansion window open.</p>
              </div>
            </div>
          </GlassCard>

        </div>

      </div>
    </div>
  );
}
