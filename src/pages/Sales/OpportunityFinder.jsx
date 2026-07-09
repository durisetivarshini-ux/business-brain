import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Search, Zap, ArrowUpRight, TrendingUp, Globe2, Target, X, CheckCircle, Calendar, Phone, Send, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const opportunities = [
  {
    id: 1, type: 'Upsell', client: 'Nexus Industries', value: 45000,
    desc: 'Client approaching API limits. 95% probability of upgrading to Enterprise tier.',
    icon: <TrendingUp className="text-[#00D4FF]"/>, color: 'text-[#00D4FF]', bg: 'bg-[#00D4FF]/20', accent: '#00D4FF',
    nextSteps: [
      { icon: <Phone size={14}/>, text: 'Call account manager – John Doe', time: 'Today, 3 PM' },
      { icon: <Send size={14}/>, text: 'Send Enterprise tier proposal deck', time: 'Today, 5 PM' },
      { icon: <Calendar size={14}/>, text: 'Schedule upgrade demo', time: 'Tomorrow, 11 AM' },
    ],
  },
  {
    id: 2, type: 'New Market', client: 'Healthcare Sector', value: 120000,
    desc: 'Competitor X raising prices. Healthcare leads showing 40% higher engagement.',
    icon: <Globe2 className="text-[#10B981]"/>, color: 'text-[#10B981]', bg: 'bg-[#10B981]/20', accent: '#10B981',
    nextSteps: [
      { icon: <Search size={14}/>, text: 'Research top 10 healthcare prospects', time: 'Today, 2 PM' },
      { icon: <Send size={14}/>, text: 'Launch targeted outreach campaign', time: 'Tomorrow, 9 AM' },
      { icon: <Calendar size={14}/>, text: 'Book sector introduction call', time: 'This week' },
    ],
  },
  {
    id: 3, type: 'Cross-sell', client: 'Global Logistics', value: 28000,
    desc: 'Client uses our ERP. High probability to adopt the Supply Chain module.',
    icon: <Target className="text-[#8B5CF6]"/>, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/20', accent: '#8B5CF6',
    nextSteps: [
      { icon: <Phone size={14}/>, text: 'Call current account owner', time: 'Today, 4 PM' },
      { icon: <Send size={14}/>, text: 'Share Supply Chain module brochure', time: 'Today, EOD' },
      { icon: <Calendar size={14}/>, text: 'Schedule product walkthrough', time: 'Next Monday' },
    ],
  },
];

function ActionModal({ opp, onClose }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleAction = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setDone(true);
    setLoading(false);
    toast.success(`Opportunity actions queued for ${opp.client}!`);
  };

  const toggleStep = (i) => {
    setCompletedSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  // ── Success / Next Steps Screen ──
  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="w-full max-w-md rounded-2xl border bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden" style={{ borderColor: `${opp.accent}30` }}>
          <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full pointer-events-none" style={{ backgroundColor: `${opp.accent}15` }} />
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${opp.accent}20`, border: `1px solid ${opp.accent}40`, boxShadow: `0 0 20px ${opp.accent}30` }}>
              <CheckCircle size={24} style={{ color: opp.accent }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Action Queued!</h2>
              <p className="text-xs text-[#94A3B8]">{opp.client} · {opp.type}</p>
            </div>
            <span className="ml-auto text-xl font-bold" style={{ color: opp.accent }}>+${opp.value.toLocaleString()}</span>
          </div>

          {/* Next Steps */}
          <div className="relative z-10 mb-6">
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">📋 Your Next Steps</p>
            <div className="flex flex-col gap-2">
              {opp.nextSteps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${completedSteps.includes(i) ? 'bg-[#10B981]/10 border-[#10B981]/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${completedSteps.includes(i) ? 'bg-[#10B981] border-[#10B981]' : 'border-white/20'}`}>
                    {completedSteps.includes(i) && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span style={{ color: opp.accent }}>{step.icon}</span>
                      <p className={`text-sm font-semibold truncate ${completedSteps.includes(i) ? 'text-[#94A3B8] line-through' : 'text-white'}`}>{step.text}</p>
                    </div>
                    <p className="text-xs text-[#94A3B8]">{step.time}</p>
                  </div>
                </button>
              ))}
            </div>
            {completedSteps.length > 0 && (
              <p className="text-xs text-[#10B981] font-semibold mt-2 text-right">{completedSteps.length}/{opp.nextSteps.length} steps completed</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-white text-sm font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 relative z-10"
            style={{ background: `linear-gradient(135deg, ${opp.accent}, #00D4FF)` }}
          >
            Done <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // ── Action Confirm Screen ──
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${opp.accent}20`, color: opp.accent, border: `1px solid ${opp.accent}40` }}>
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

        <button
          onClick={handleAction}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white text-sm font-bold hover:scale-[1.02] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: `linear-gradient(135deg, ${opp.accent}, #00D4FF)` }}
        >
          {loading ? 'Processing...' : 'Execute Opportunity Action →'}
        </button>
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
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${opp.bg}`}>{opp.icon}</div>
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
