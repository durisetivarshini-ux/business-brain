import React from 'react';
import { Bot, Sparkles, FileText, Globe, Target } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function ExecutiveAI() {
  const insights = [
    { text: "Revenue increased by 22% quarter-over-quarter, driven by enterprise deals.", highlight: "increased by 22%" },
    { text: "Customer satisfaction reached 97%, the highest in company history.", highlight: "reached 97%" },
    { text: "Sales exceeded Q3 targets by ₹18 Cr across APAC and EMEA.", highlight: "exceeded Q3 targets" },
    { text: "Inventory remains healthy with zero critical stockouts projected.", highlight: "remains healthy" },
    { text: "Marketing ROI increased by 14% due to the new social algorithm.", highlight: "increased by 14%" },
  ];

  return (
    <GlassCard className="p-8 border-[#7C3AED]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(124,58,237,0.15)] h-full flex flex-col">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-6 relative z-10 flex-1">
        
        {/* Top: AI Intro */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Intelligence Active
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Executive Summary</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">CEO AI Briefing</p>
            </div>
          </div>
        </div>

        {/* Middle: Insights List */}
        <div className="flex-1 space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <span className="text-[#7C3AED] mt-1 text-lg leading-none">•</span>
              <p className="text-[#F8FAFC] text-sm leading-relaxed">
                {insight.text.split(insight.highlight).map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]">
                        {insight.highlight}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
          
          <div className="mt-6 p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30">
            <p className="text-white text-sm font-bold">
              <span className="text-[#7C3AED] uppercase tracking-wider mr-2">Recommendation:</span>
              Expand into two additional regions (Japan & Germany) next quarter.
            </p>
          </div>
        </div>

        {/* Bottom: Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#00D4FF] text-white text-sm font-bold shadow-lg shadow-[#7C3AED]/20 transition-transform hover:scale-[1.02]">
            <Globe size={16} /> Generate Strategy
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            <Target size={16} /> Forecast Q4
          </button>
        </div>

      </div>
    </GlassCard>
  );
}
