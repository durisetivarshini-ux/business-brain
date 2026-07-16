import React, { useState } from 'react';
import { Bot, Sparkles, FileText, TrendingUp, Lightbulb, X, Loader2, ChevronRight, ChevronDown, CheckCircle, Download, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { InsightPanel } from '../../components/ui/InsightPanel';
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

function ForecastModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
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
  const [executing, setExecuting] = useState(null);
  const [executed, setExecuted] = useState({});

  const handleExecute = async (i, r) => {
    setExecuting(i);
    await new Promise(res => setTimeout(res, 1100));
    setExecuting(null);
    setExecuted(prev => ({ ...prev, [i]: true }));
    toast.success(`${r.title} – action executed!`);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
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
  const insights = [
    { text: "Revenue increased by 22% compared to Q2.", highlight: "increased by 22%" },
    { text: "Operating expenses reduced by 4% via automation.", highlight: "reduced by 4%" },
    { text: "AI predicts 18% revenue growth next month.", highlight: "18% revenue growth" },
    { text: "Three invoices are overdue by > 15 days.", highlight: "overdue" },
  ];

  return (
    <InsightPanel
      moduleName="Finance"
      title="Financial Copilot"
      subtitle="Executive Insights"
      badgeText="AI Advisor Active"
      description="I have analyzed the current ledger, cash flow statements, and pending receivables. Here are the most critical financial updates."
      insights={insights}
      recommendationsModal={RecommendationsModal}
      forecastModal={ForecastModal}
      themeColor="#10B981"
    />
  );
}
