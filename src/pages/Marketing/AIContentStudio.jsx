import React from 'react';
import { Sparkles, Edit3, Image as ImageIcon, MessageSquare, Send } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AIContentStudio() {
  const contentTypes = [
    { title: "Blog Articles", icon: <Edit3 size={16}/>, color: "#00D4FF" },
    { title: "Social Copy", icon: <MessageSquare size={16}/>, color: "#EC4899" },
    { title: "Ad Creatives", icon: <ImageIcon size={16}/>, color: "#7C3AED" },
    { title: "Email Campaigns", icon: <Send size={16}/>, color: "#10B981" },
  ];

  return (
    <GlassCard className="p-6 border-[#7C3AED]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-[#7C3AED]" /> Content Studio
        </h3>
        <span className="text-xs font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-1 rounded-md">AI Active</span>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="relative">
          <textarea 
            className="w-full h-32 bg-[#050816] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#7C3AED]/50 resize-none transition-colors"
            placeholder="Describe the campaign, product, or audience you want to target..."
          ></textarea>
          <button className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow-lg shadow-[#7C3AED]/20 hover:scale-[1.05] transition-transform">
            Generate
          </button>
        </div>

        <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mt-2">Quick Generators</h4>
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type, i) => (
            <button key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="p-1.5 rounded-md" style={{ backgroundColor: `${type.color}20`, color: type.color }}>
                {type.icon}
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#7C3AED] transition-colors">{type.title}</span>
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
