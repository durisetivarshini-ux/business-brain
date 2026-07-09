import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Search, Zap, ArrowUpRight, TrendingUp, Globe2, Target, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const opportunities = [
  { id: 1, type: 'Upsell', client: 'Nexus Industries', value: 45000, desc: 'Client approaching API limits. 95% probability of upgrading to Enterprise tier.', icon: <TrendingUp className="text-[#00D4FF]"/>, color: 'text-[#00D4FF]', bg: 'bg-[#00D4FF]/20', accent: '#00D4FF' },
  { id: 2, type: 'New Market', client: 'Healthcare Sector', value: 120000, desc: 'Competitor X raising prices. Healthcare leads showing 40% higher engagement.', icon: <Globe2 className="text-[#10B981]"/>, color: 'text-[#10B981]', bg: 'bg-[#10B981]/20', accent: '#10B981' },
  { id: 3, type: 'Cross-sell', client: 'Global Logistics', value: 28000, desc: 'Client uses our ERP. High probability to adopt the Supply Chain module.', icon: <Target className="text-[#8B5CF6]"/>, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/20', accent: '#8B5CF6' },
];

function ActionModal({ opp, onClose }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setDone(true);
    setLoading(false);
    toast.success(`Opportunity action queued for ${opp.client}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4`} style={{ backgroundColor: `${opp.accent}20`, color: opp.accent, border: `1px solid ${opp.accent}40` }}>
          {opp.type}
        </div>
        
        <h2 className="text-xl font-bold text-white mb-1">{opp.client}</h2>
        <p className={`text-2xl font-bold mb-3 ${opp.color}`}>+${opp.value.toLocaleString()}</p>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{opp.desc}</p>

        <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-6">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Recommended Actions</p>
          <ul className="space-y-2">
            {['Schedule discovery call with decision maker', 'Send personalized proposal deck', 'Add to high-priority CRM pipeline'].map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white">
                <span style={{ color: opp.accent }}>→</span> {a}
              </li>
            ))}
          </ul>
        </div>

        {done ? (
          <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] font-bold text-sm">
            <CheckCircle size={16} /> Action Queued Successfully!
          </div>
        ) : (
          <button
            onClick={handleAction}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white text-sm font-bold hover:scale-[1.02] transition-all disabled:opacity-60"
            style={{ background: `linear-gradient(135deg, ${opp.accent}, #00D4FF)` }}
          >
            {loading ? 'Processing...' : 'Execute Opportunity Action →'}
          </button>
        )}
      </div>
    </div>
  );
}

export function OpportunityFinder() {
  const [activeOpp, setActiveOpp] = useState(null);

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
            <button
              onClick={() => setActiveOpp(opp)}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Action Opportunity <ArrowUpRight size={14}/>
            </button>
          </div>
        ))}
      </div>

      {activeOpp && <ActionModal opp={activeOpp} onClose={() => setActiveOpp(null)} />}
    </GlassCard>
  );
}
