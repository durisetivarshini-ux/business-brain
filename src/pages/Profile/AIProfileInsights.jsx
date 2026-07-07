import React from 'react';
import { Bot, Sparkles, Brain, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AIProfileInsights() {
  const insights = [
    { text: "Your operational productivity increased by 18% this month, primarily due to faster invoice approvals.", highlight: "productivity increased by 18%" },
    { text: "You are currently ranked in the top 5 executives for Q3 revenue generation.", highlight: "top 5 executives" },
    { text: "AI Copilot noticed you spend 4 hours/week on scheduling. Recommend activating Calendar Automation.", highlight: "Calendar Automation" },
  ];

  return (
    <GlassCard className="p-8 border-[#5B5FFF]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(91,95,255,0.15)] h-full flex flex-col">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#5B5FFF]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-6 relative z-10 flex-1">
        
        {/* Top: AI Intro */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B5FFF]/20 border border-[#5B5FFF]/30 text-[#5B5FFF] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Personal Intelligence
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(91,95,255,0.4)]">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Executive Insights</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">AI-Generated Performance Review</p>
            </div>
          </div>
        </div>

        {/* Middle: Insights List */}
        <div className="flex-1 space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <span className="text-[#5B5FFF] mt-1 text-lg leading-none">•</span>
              <p className="text-[#F8FAFC] text-sm leading-relaxed">
                {insight.text.split(insight.highlight).map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]">
                        {insight.highlight}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
          
          <div className="mt-6 p-4 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex gap-4 items-center">
             <div className="w-10 h-10 rounded-full bg-[#00D4FF]/20 flex items-center justify-center shrink-0">
               <Brain size={20} className="text-[#00D4FF]" />
             </div>
             <div>
                <p className="text-white text-sm font-bold">Recommended Learning Path</p>
                <p className="text-[#94A3B8] text-xs">Advanced Enterprise Architecture Strategy</p>
             </div>
             <button className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#00D4FF] hover:text-[#050816] transition-colors">
               <ArrowRight size={16} />
             </button>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
