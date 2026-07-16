import React, { useState } from 'react';
import { Bot, Sparkles, Navigation, Search, CheckCircle, X, Loader2, ArrowRight, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Portal } from '../../components/ui/Portal';
import { InsightPanel } from '../../components/ui/InsightPanel';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

function SupplyChainModal({ onClose }) {
  const [optimizing, setOptimizing] = useState(false);
  const [done, setDone] = useState(false);

  const optimizations = [
    { label: 'Reroute Supplier ABC shipments via Frankfurt hub', saving: '$12,400/mo', icon: <Navigation size={14} /> },
    { label: 'Consolidate warehouse A3 + B2 inventory', saving: '$8,200/mo', icon: <Package size={14} /> },
    { label: 'Switch to bulk procurement for raw materials', saving: '$15,800/mo', icon: <TrendingUp size={14} /> },
  ];

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setDone(true);
      toast.success('Supply chain optimizations applied!');
    }, 2000);
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-2xl border border-[#00D4FF]/20 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full pointer-events-none bg-[#00D4FF]/10" />
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-20"><X size={20} /></button>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#5B5FFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              <Navigation size={22} className="text-[#050816]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Supply Chain Optimizer</h2>
              <p className="text-xs text-[#94A3B8]">AI-identified cost reduction opportunities</p>
            </div>
          </div>

          <div className="space-y-3 mb-6 relative z-10">
            {optimizations.map((opt, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${done ? 'bg-[#10B981]/10 border-[#10B981]/30' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-[#00D4FF]">{opt.icon}</span>
                  <p className="text-sm text-white truncate">{opt.label}</p>
                </div>
                <span className="text-sm font-bold text-[#10B981] whitespace-nowrap ml-3">{opt.saving}</span>
              </div>
            ))}
          </div>

          {done ? (
            <div className="text-center relative z-10">
              <CheckCircle className="mx-auto mb-2 text-[#10B981]" size={32} />
              <p className="text-white font-bold mb-1">Optimizations Applied!</p>
              <p className="text-xs text-[#94A3B8] mb-4">Estimated total savings: $36,400/mo</p>
              <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold hover:scale-[1.02] transition-all">
                Done <ArrowRight size={14} className="inline ml-1" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleOptimize}
              disabled={optimizing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold hover:scale-[1.02] transition-all disabled:opacity-60 flex items-center justify-center gap-2 relative z-10"
            >
              {optimizing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Optimizing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Apply All Optimizations <ArrowRight size={14} />
                </span>
              )}
            </button>
          )}
        </motion.div>
      </div>
    </Portal>
  );
}

function RecommendationsModal({ onClose }) {
  const recommendations = [
    { title: 'Increase safety stock for Zone B1', desc: 'Raw materials zone is at 15% — risk of production halt.', urgency: 'High', color: '#EF4444' },
    { title: 'Renegotiate Supplier ABC contract', desc: 'Two delayed shipments this quarter. Consider backup supplier.', urgency: 'Medium', color: '#F59E0B' },
    { title: 'Expand Warehouse A capacity', desc: 'Zone A1 at 98%. Forecast shows 12% growth next quarter.', urgency: 'High', color: '#EF4444' },
    { title: 'Automate packaging line QA', desc: 'Manual QA adds 2.5hrs/day delay. ROI in 4 months.', urgency: 'Low', color: '#10B981' },
  ];

  return (
    <Portal>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full pointer-events-none bg-[#5B5FFF]/10" />
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-20"><X size={20} /></button>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Search size={22} className="text-[#00D4FF]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Recommendations</h2>
              <p className="text-xs text-[#94A3B8]">{recommendations.length} actionable insights identified</p>
            </div>
          </div>

          <div className="space-y-3 mb-6 relative z-10 max-h-[400px] overflow-y-auto custom-scrollbar">
            {recommendations.map((rec, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md" style={{ color: rec.color, backgroundColor: `${rec.color}15` }}>{rec.urgency}</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{rec.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={onClose} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors relative z-10">
            Close
          </button>
        </motion.div>
      </div>
    </Portal>
  );
}

function ApprovalsModal({ onClose }) {
  const [approvals, setApprovals] = useState([
    { id: 'PO-2847', item: 'Raw Steel — 5 tons', vendor: 'MetalCorp Inc.', amount: 24500, status: 'pending' },
    { id: 'PO-2848', item: 'Circuit Boards — 2000 units', vendor: 'TechParts Ltd.', amount: 18200, status: 'pending' },
    { id: 'PO-2850', item: 'Packaging Materials — Bulk', vendor: 'BoxCo Supply', amount: 6800, status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));
    toast.success(`${id} approved!`);
  };

  const handleReject = (id) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    toast.error(`${id} rejected`);
  };

  const pending = approvals.filter(a => a.status === 'pending').length;

  return (
    <Portal>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-2xl border border-rose-500/20 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full pointer-events-none bg-rose-500/10" />
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-20"><X size={20} /></button>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle size={22} className="text-rose-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Purchase Order Approvals</h2>
              <p className="text-xs text-[#94A3B8]">{pending} pending approval{pending !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6 relative z-10">
            {approvals.map((a) => (
              <div key={a.id} className={`p-4 rounded-xl border transition-all ${a.status === 'approved' ? 'bg-[#10B981]/10 border-[#10B981]/30' : a.status === 'rejected' ? 'bg-rose-500/10 border-rose-500/30 opacity-50' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{a.id}</h4>
                    <p className="text-xs text-[#94A3B8]">{a.item}</p>
                  </div>
                  <span className="text-sm font-bold text-[#00D4FF]">${a.amount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-[#94A3B8] mb-3">Vendor: {a.vendor}</p>
                {a.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(a.id)} className="flex-1 py-2 rounded-lg bg-[#10B981] text-white text-xs font-bold hover:bg-[#10B981]/80 transition-colors">
                      ✓ Approve
                    </button>
                    <button onClick={() => handleReject(a.id)} className="flex-1 py-2 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-bold hover:bg-rose-500/30 transition-colors border border-rose-500/20">
                      ✕ Reject
                    </button>
                  </div>
                ) : (
                  <p className={`text-xs font-bold uppercase tracking-wider ${a.status === 'approved' ? 'text-[#10B981]' : 'text-rose-400'}`}>
                    {a.status === 'approved' ? '✓ Approved' : '✕ Rejected'}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button onClick={onClose} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors relative z-10">
            Close
          </button>
        </motion.div>
      </div>
    </Portal>
  );
}

export function AIOperationsAssistant() {
  const [activeModal, setActiveModal] = useState(null);

  const insights = [
    { text: "Warehouse A is reaching storage capacity.", highlight: "reaching storage capacity" },
    { text: "Supplier ABC has delayed two shipments.", highlight: "delayed two shipments" },
    { text: "Production efficiency improved by 9%.", highlight: "improved by 9%" },
    { text: "AI recommends increasing raw material stock.", highlight: "increasing raw material stock" },
  ];

  return (
    <>
      <InsightPanel
        moduleName="Operations"
        title="Operations AI"
        subtitle="Today's Action Items"
        badgeText="Systems Analyzed"
        description="I have analyzed supply chain logistics, warehouse capacity, and live production lines. Here are the most critical operational bottlenecks to address."
        insights={insights}
        recommendationsModal={RecommendationsModal}
        forecastModal={SupplyChainModal}
        themeColor="#00D4FF"
      />

      <div className="flex justify-center gap-4 mt-[-24px] mb-6 z-10 relative">
        <button onClick={() => setActiveModal('approvals')} className="px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all flex items-center gap-2 cursor-pointer">
          <AlertTriangle size={14} className="text-rose-400" /> Review Approvals (3)
        </button>
      </div>

      <AnimatePresence>
        {activeModal === 'approvals' && <ApprovalsModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </>
  );
}
