import React from 'react';
import { Bot, Sparkles, FileText, TrendingUp, Lightbulb } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AIFinancialAdvisor() {
  const insights = [
    { text: "Revenue increased by 22% compared to Q2.", highlight: "increased by 22%" },
    { text: "Operating expenses reduced by 4% via automation.", highlight: "reduced by 4%" },
    { text: "AI predicts 18% revenue growth next month.", highlight: "18% revenue growth" },
    { text: "Three invoices are overdue by > 15 days.", highlight: "overdue" },
    { text: "Suggested investment opportunity detected in Bonds.", highlight: "Suggested investment opportunity" },
  ];

  return (
    <GlassCard className="p-8 border-[#10B981]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(16,185,129,0.1)]">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#10B981]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left: AI Intro */}
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
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold shadow-lg shadow-[#10B981]/20 transition-transform hover:scale-[1.02]">
              <FileText size={16} /> Generate Financial Report
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <TrendingUp size={16} /> Forecast Revenue
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <Lightbulb size={16} /> View AI Recommendations
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
    </GlassCard>
  );
}
