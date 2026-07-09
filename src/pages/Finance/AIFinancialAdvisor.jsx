import React, { useState } from 'react';
import { Bot, Sparkles, FileText, TrendingUp, Lightbulb, X, Loader2, ChevronRight, ChevronDown, CheckCircle, Download, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

const aiRecommendations = [
  {
    title: 'Invest in Bonds',
    text: 'AI detected a high-yield opportunity in Government Bonds with ~8.5% annual return. Suggested allocation: ₹1.5 Cr from liquid reserves.',
    color: '#10B981',
    actionLabel: 'Allocate ₹1.5 Cr to Bonds',
    result: 'Allocation task sent to treasury team. A bond purchase order of ₹1.5 Cr has been queued for review. Expected yield: ₹12.75 L/yr.',
  },
  {
    title: 'Reduce Vendor Payments Delay',
    text: '3 vendor invoices overdue by >15 days. Automating payment reminders could reduce penalties by ₹12L per quarter.',
    color: '#F59E0B',
    actionLabel: 'Enable Auto-Reminders',
    result: 'Automated payment reminder system activated for 3 overdue vendors. Next reminder scheduled for tomorrow 9:00 AM. Penalty risk reduced.',
  },
  {
    title: 'Optimize Tax Deductions',
    text: 'Q4 depreciation filing can save an estimated ₹48L. AI recommends filing before November 30 to maximize benefit.',
    color: '#00D4FF',
    actionLabel: 'Schedule Tax Filing',
    result: 'Tax filing task created and assigned to your CA. Deadline set: November 28, 2026. Estimated savings: ₹48L confirmed.',
  },
];

const forecastMonths = [
  { month: 'Aug 2026', revenue: '₹19.8 Cr', growth: '+7%', color: '#10B981' },
  { month: 'Sep 2026', revenue: '₹21.4 Cr', growth: '+8%', color: '#10B981' },
  { month: 'Oct 2026', revenue: '₹23.1 Cr', growth: '+8%', color: '#10B981' },
  { month: 'Q4 Total', revenue: '₹64.3 Cr', growth: '+18%', color: '#00D4FF' },
];

// Download a real financial report CSV
function downloadFinancialReport() {
  const now = new Date();
  const rows = [
    ['Business Brain – Financial Report', '', '', ''],
    [`Generated: ${now.toLocaleDateString('en-IN')}`, '', '', ''],
    ['', '', '', ''],
    ['FINANCIAL KPIs', '', '', ''],
    ['Metric', 'Value', 'Target', 'Status'],
    ['Total Revenue', '₹18.5 Cr', '₹20 Cr', '92.5%'],
    ['Net Profit', '₹7.2 Cr', '₹8 Cr', '90%'],
    ['Total Expenses', '₹11.3 Cr', '₹12 Cr', 'Under Budget'],
    ['Cash Balance', '₹3.8 Cr', '₹4 Cr', 'Healthy'],
    ['Pending Payments', '₹82 L', '₹0', 'Action Required'],
    ['Profit Margin', '39%', '40%', 'Near Target'],
    ['', '', '', ''],
    ['Q4 2026 FORECAST', '', '', ''],
    ['Month', 'Revenue', 'Growth', 'Confidence'],
    ['August 2026', '₹19.8 Cr', '+7%', 'High'],
    ['September 2026', '₹21.4 Cr', '+8%', 'High'],
    ['October 2026', '₹23.1 Cr', '+8%', 'High'],
    ['Q4 Total', '₹64.3 Cr', '+18%', '91%'],
    ['', '', '', ''],
    ['AI PRIORITY ACTIONS', '', '', ''],
    ['Action', 'Benefit', 'Priority', 'Deadline'],
    ['Invest in Government Bonds', '₹12.75 L/yr return', 'High', 'This Week'],
    ['Enable Vendor Auto-Reminders', 'Save ₹12L/quarter', 'Medium', 'This Week'],
    ['File Q4 Tax Depreciation', 'Save ₹48L', 'High', 'Nov 30 2026'],
    ['', '', '', ''],
    ['FINANCIAL HEALTH SCORE', '', '', ''],
    ['Category', 'Score', 'Status', ''],
    ['Liquidity', '96%', 'Excellent', ''],
    ['Profitability', '90%', 'Strong', ''],
    ['Cash Flow', '88%', 'Healthy', ''],
    ['Growth', '85%', 'High', ''],
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Financial_Report_${now.toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function ForecastModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-[#10B981]/20 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]"><TrendingUp size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">Revenue Forecast</h2>
            <p className="text-xs text-[#94A3B8]">AI Prediction – Q4 2026 · Confidence: 91%</p>
          </div>
        </div>
        <div className="space-y-3">
          {forecastMonths.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm font-semibold text-[#94A3B8]">{item.month}</span>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-white">{item.revenue}</span>
                <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ color: item.color, backgroundColor: `${item.color}20` }}>{item.growth}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
          <p className="text-xs text-[#10B981] font-semibold">📈 AI Insight: Revenue is projected to grow 18% in Q4, driven by enterprise renewals and new market expansion in North India.</p>
        </div>
        <button onClick={onClose} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold hover:scale-[1.02] transition-all">Close</button>
      </div>
    </div>
  );
}

function RecommendationsModal({ onClose }) {
  const [expanded, setExpanded] = useState(null);
  const [executing, setExecuting] = useState(null);   // index currently loading
  const [executed, setExecuted] = useState({});        // { index: true }

  const handleExecute = async (i, r) => {
    setExecuting(i);
    await new Promise(res => setTimeout(res, 1100));
    setExecuting(null);
    setExecuted(prev => ({ ...prev, [i]: true }));
    toast.success(`${r.title} – action executed!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#10B981]/20 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]"><Lightbulb size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
            <p className="text-xs text-[#94A3B8]">Financial Copilot – Priority Actions</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {aiRecommendations.map((r, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/5 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center gap-2">
                  {executed[i] && <CheckCircle size={14} className="text-[#10B981] shrink-0" />}
                  <span className="text-sm font-bold text-white">{r.title}</span>
                </div>
                {expanded === i ? <ChevronDown size={16} className="text-[#94A3B8]" /> : <ChevronRight size={16} className="text-[#94A3B8]" />}
              </button>

              {expanded === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">{r.text}</p>

                  {/* Success result screen after execution */}
                  {executed[i] ? (
                    <div className="rounded-xl p-4 border" style={{ backgroundColor: `${r.color}10`, borderColor: `${r.color}30` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={16} style={{ color: r.color }} />
                        <span className="text-sm font-bold" style={{ color: r.color }}>Action Executed Successfully!</span>
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{r.result}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleExecute(i, r)}
                      disabled={executing === i}
                      className="px-4 py-2.5 rounded-lg text-xs font-bold text-white hover:scale-[1.02] transition-all disabled:opacity-60 flex items-center gap-2"
                      style={{ background: `linear-gradient(135deg, ${r.color}, #00D4FF)` }}
                    >
                      {executing === i ? (
                        <><Loader2 size={13} className="animate-spin" /> Executing...</>
                      ) : (
                        <>Execute Action <ArrowRight size={13} /></>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Close</button>
      </div>
    </div>
  );
}

export function AIFinancialAdvisor() {
  const [activeModal, setActiveModal] = useState(null);

  const insights = [
    { text: "Revenue increased by 22% compared to Q2.", highlight: "increased by 22%" },
    { text: "Operating expenses reduced by 4% via automation.", highlight: "reduced by 4%" },
    { text: "AI predicts 18% revenue growth next month.", highlight: "18% revenue growth" },
    { text: "Three invoices are overdue by > 15 days.", highlight: "overdue" },
    { text: "Suggested investment opportunity detected in Bonds.", highlight: "Suggested investment opportunity" },
  ];

  const handleGenerateReport = async () => {
    const promise = new Promise(r => setTimeout(r, 1200));
    toast.promise(promise, {
      loading: 'Generating Financial Report...',
      success: 'Financial Report downloaded!',
      error: 'Failed to generate report.',
    });
    await promise;
    downloadFinancialReport();
  };

  return (
    <GlassCard className="p-8 border-[#10B981]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(16,185,129,0.1)]">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#10B981]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        <div className="md:w-1/3 flex flex-col justify-center border-r border-white/10 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-6 self-start">
            <Sparkles size={14} /> AI Advisor Active
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#10B981] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Bot size={28} className="text-[#050816]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Financial Copilot</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">Executive Insights</p>
            </div>
          </div>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            I have analyzed the current ledger, cash flow statements, and pending receivables. Here are the most critical financial updates.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold shadow-lg shadow-[#10B981]/20 transition-transform hover:scale-[1.02]"
            >
              <Download size={16} /> Generate Financial Report
            </button>
            <button
              onClick={() => setActiveModal('forecast')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <TrendingUp size={16} /> Forecast Revenue
            </button>
            <button
              onClick={() => setActiveModal('recommendations')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <Lightbulb size={16} /> View AI Recommendations
            </button>
          </div>
        </div>

        <div className="md:w-2/3 flex flex-col justify-center">
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                <span className="text-[#10B981] mt-1 text-lg leading-none">•</span>
                <p className="text-[#F8FAFC] text-base leading-relaxed">
                  {insight.text.split(insight.highlight).map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#00D4FF]">
                          {insight.highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal === 'forecast' && <ForecastModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'recommendations' && <RecommendationsModal onClose={() => setActiveModal(null)} />}
    </GlassCard>
  );
}
