import React, { useState } from 'react';
import { Bot, Sparkles, FileText, TrendingUp, Search, X, ChevronDown, ChevronRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

const recommendationDetails = [
  { title: "Enterprise Deal – Priority Action", text: "Schedule a closing call with Nexus Industries this week. Deal worth ₹1.8 Cr is in final negotiation. AI confidence: 94%.", color: "#10B981" },
  { title: "North America Region Focus", text: "Conversion rate is up 11%. Allocate 20% more budget to North America outreach. Predicted additional revenue: ₹60L.", color: "#00D4FF" },
  { title: "18 High-Value Leads Ready", text: "Leads from Q3 campaign have high buying intent. Recommended: personalized outreach emails within 24 hours.", color: "#F59E0B" },
];

function RecommendationsModal({ onClose }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#10B981]/20 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]"><Search size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
            <p className="text-xs text-[#94A3B8]">Revenue AI – Priority Actions for Today</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          {recommendationDetails.map((r, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/5 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="text-sm font-bold text-white">{r.title}</span>
                {expanded === i ? <ChevronDown size={16} className="text-[#94A3B8]" /> : <ChevronRight size={16} className="text-[#94A3B8]" />}
              </button>
              {expanded === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{r.text}</p>
                  <button
                    onClick={() => { toast.success(`Action queued: ${r.title}`); onClose(); }}
                    className="mt-3 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${r.color}, #00D4FF)` }}
                  >
                    Take Action →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
          Close
        </button>
      </div>
    </div>
  );
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
            <p className="text-xs text-[#94A3B8]">AI Prediction – Q4 2026</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: 'October', value: '₹9.2 Cr', trend: '+8%', color: '#10B981' },
            { label: 'November', value: '₹10.4 Cr', trend: '+13%', color: '#10B981' },
            { label: 'December', value: '₹11.8 Cr', trend: '+13.5%', color: '#10B981' },
            { label: 'Q4 Total', value: '₹31.4 Cr', trend: '+22%', color: '#00D4FF' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm font-semibold text-[#94A3B8]">{item.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-white">{item.value}</span>
                <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ color: item.color, backgroundColor: `${item.color}20` }}>{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#94A3B8] mt-4 text-center">Confidence: High (88%) · Updated 2 hours ago</p>
        <button onClick={onClose} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-white text-sm font-bold hover:scale-[1.02] transition-all">
          Close
        </button>
      </div>
    </div>
  );
}

export function AISalesAssistant() {
  const [activeModal, setActiveModal] = useState(null);

  const insights = [
    { text: "Enterprise deal worth ₹1.8 Cr is likely to close this week.", highlight: "worth ₹1.8 Cr is likely to close" },
    { text: "Conversion rate increased by 11% in the North American region.", highlight: "increased by 11%" },
    { text: "AI recommends following up with 18 high-value leads today.", highlight: "18 high-value leads today" },
    { text: "Revenue forecast indicates 22% growth this quarter.", highlight: "22% growth this quarter" },
    { text: "Sales target can be achieved three days early based on pipeline.", highlight: "achieved three days early" },
  ];

  const handleGenerateReport = () => {
    const promise = new Promise(r => setTimeout(r, 1500));
    toast.promise(promise, {
      loading: 'Generating sales report...',
      success: 'Sales Report ready! Download will start shortly.',
      error: 'Failed to generate report.',
    });
  };

  return (
    <GlassCard className="p-8 border-[#10B981]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(16,185,129,0.15)]">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#10B981]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left: AI Intro */}
        <div className="md:w-1/3 flex flex-col justify-center border-r border-white/10 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-6 self-start">
            <Sparkles size={14} /> Pipeline AI Active
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#10B981] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Bot size={28} className="text-[#050816]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Revenue AI</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">Sales Insights</p>
            </div>
          </div>

          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            I've analyzed your current CRM pipeline, historical deal closures, and executive activity. Here are the most critical actions to secure revenue.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveModal('recommendations')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-white text-sm font-bold shadow-lg shadow-[#10B981]/20 transition-transform hover:scale-[1.02]"
            >
              <Search size={16} /> AI Recommendations
            </button>
            <button
              onClick={() => setActiveModal('forecast')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <TrendingUp size={16} /> View Forecast
            </button>
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <FileText size={16} /> Generate Sales Report
            </button>
          </div>
        </div>

        {/* Right: Insights List */}
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

      {/* Modals */}
      {activeModal === 'recommendations' && <RecommendationsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'forecast' && <ForecastModal onClose={() => setActiveModal(null)} />}
    </GlassCard>
  );
}
