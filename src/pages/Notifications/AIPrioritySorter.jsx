import React from 'react';
import { Bot, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { toast } from 'react-hot-toast';

export function AIPrioritySorter() {
  const summaries = [
    { title: "Legal & Compliance", time: "10 mins ago", summary: "Vendor contracts for Q4 are pending your final signature.", action: "Sign Documents", priority: "high" },
    { title: "Operations Alert", time: "1 hr ago", summary: "Server Rack X inventory will deplete by tomorrow. PO drafted.", action: "Approve PO", priority: "high" },
    { title: "Team Update", time: "3 hrs ago", summary: "Sarah Jenkins completed the Q3 Financial Audit early.", action: "View Audit", priority: "low" }
  ];

  const handleAction = (action) => {
    toast.success(`Action triggered: ${action}`, { icon: '⚡' });
  };

  return (
    <GlassCard className="p-6 border-[#5B5FFF]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#5B5FFF]/10 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_15px_rgba(91,95,255,0.4)]">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">AI Priority Sorter</h3>
          <p className="text-[#94A3B8] text-xs">Summarized 42 unread messages</p>
        </div>
      </div>

      <div className="flex-1 space-y-4 relative z-10">
        {summaries.map((item, i) => (
          <div key={i} className={`p-4 rounded-xl border ${item.priority === 'high' ? 'bg-[#EF4444]/5 border-[#EF4444]/20' : 'bg-white/5 border-white/5'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {item.priority === 'high' && <AlertCircle size={14} className="text-[#EF4444]" />}
                <h4 className="text-white text-sm font-bold">{item.title}</h4>
              </div>
              <span className="text-[#94A3B8] text-xs">{item.time}</span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-3">{item.summary}</p>
            <button 
              onClick={() => handleAction(item.action)}
              className={`text-xs font-bold flex items-center gap-1 hover:underline ${item.priority === 'high' ? 'text-[#EF4444]' : 'text-[#00D4FF]'}`}
            >
              {item.action} <ArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
