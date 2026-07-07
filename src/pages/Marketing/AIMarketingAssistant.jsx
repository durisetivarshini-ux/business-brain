import React from 'react';
import { Bot, Sparkles, FileText, Share2, Search } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AIMarketingAssistant() {
  const insights = [
    { text: "Instagram campaign is performing 28% above average engagement.", highlight: "performing 28% above average" },
    { text: "Email CTR increased by 14% on the Q3 product launch sequence.", highlight: "increased by 14%" },
    { text: "AI recommends publishing content tomorrow at 9 AM for maximum reach.", highlight: "tomorrow at 9 AM" },
    { text: "The new blog article has high SEO potential for 'AI Business Tools'.", highlight: "high SEO potential" },
    { text: "Campaign ROI is expected to exceed target by 12% this month.", highlight: "exceed target by 12%" },
  ];

  return (
    <GlassCard className="p-8 border-[#EC4899]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(236,72,153,0.15)]">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#EC4899]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left: AI Intro */}
        <div className="md:w-1/3 flex flex-col justify-center border-r border-white/10 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/30 text-[#EC4899] text-xs font-bold uppercase tracking-wider mb-6 self-start">
            <Sparkles size={14} /> Campaign AI Active
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#EC4899] to-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              <Bot size={28} className="text-[#050816]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Audience AI</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">Marketing Insights</p>
            </div>
          </div>

          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            I've analyzed your multi-channel performance, SEO rankings, and audience sentiment. Here are the most critical actions to optimize ROI.
          </p>

          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-lg shadow-[#EC4899]/20 transition-transform hover:scale-[1.02]">
              <Share2 size={16} /> Schedule Content
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <Search size={16} /> View SEO Report
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <FileText size={16} /> Generate Campaign Analytics
            </button>
          </div>
        </div>

        {/* Right: Insights List */}
        <div className="md:w-2/3 flex flex-col justify-center">
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                <span className="text-[#EC4899] mt-1 text-lg leading-none">•</span>
                <p className="text-[#F8FAFC] text-base leading-relaxed">
                  {insight.text.split(insight.highlight).map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] to-[#7C3AED]">
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
