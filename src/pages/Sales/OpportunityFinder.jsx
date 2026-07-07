import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Search, Zap, ArrowUpRight, TrendingUp, Globe2, Target } from 'lucide-react';

const opportunities = [
  { id: 1, type: 'Upsell', client: 'Nexus Industries', value: 45000, desc: 'Client approaching API limits. 95% probability of upgrading to Enterprise tier.', icon: <TrendingUp className="text-[#00D4FF]"/>, color: 'text-[#00D4FF]', bg: 'bg-[#00D4FF]/20' },
  { id: 2, type: 'New Market', client: 'Healthcare Sector', value: 120000, desc: 'Competitor X raising prices. Healthcare leads showing 40% higher engagement.', icon: <Globe2 className="text-[#10B981]"/>, color: 'text-[#10B981]', bg: 'bg-[#10B981]/20' },
  { id: 3, type: 'Cross-sell', client: 'Global Logistics', value: 28000, desc: 'Client uses our ERP. High probability to adopt the Supply Chain module.', icon: <Target className="text-[#8B5CF6]"/>, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/20' },
];

export function OpportunityFinder() {
  return (
    <GlassCard className="p-0 border-[#00D4FF]/20 bg-[#0B1120]/60 mt-6 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#00D4FF]/10 to-transparent">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <Search className="text-[#00D4FF]" /> AI Opportunity Finder
          </h2>
          <p className="text-xs text-[#94A3B8]">Automated identification of untapped revenue potential.</p>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-[#F59E0B]" />
          <span className="text-white text-xs font-bold">3 Opportunities Found</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {opportunities.map((opp, i) => (
          <div key={opp.id} className={`p-6 ${i !== 2 ? 'border-r border-white/5' : ''} hover:bg-white/5 transition-colors group cursor-pointer flex flex-col h-full`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${opp.bg}`}>
                {opp.icon}
              </div>
              <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded-md">{opp.type}</span>
            </div>
            <h3 className="font-bold text-white text-lg mb-1">{opp.client}</h3>
            <p className={`font-bold ${opp.color} text-xl mb-3`}>+${opp.value.toLocaleString()}</p>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 flex-1">{opp.desc}</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              Action Opportunity <ArrowUpRight size={14}/>
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
