import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Activity, TrendingDown, ArrowUpRight, X, CheckCircle2, Clock, AlertOctagon, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const initialRisks = [
  {
    id: 'RSK-091', type: 'Financial', risk: 'Revenue Decline Predictor', severity: 'High',
    desc: 'AI forecasts a 15% revenue drop in Q4 due to enterprise contract expirations.',
    action: 'Launch retention offers immediately.',
    mitigateSteps: [
      { label: 'Identify all enterprise contracts expiring in Q4', owner: 'Account Management', due: 'Day 1' },
      { label: 'Design a personalized retention offer package', owner: 'Sales + Finance', due: 'Day 2' },
      { label: 'Schedule executive calls with top 5 at-risk accounts', owner: 'AE Team', due: 'Day 3' },
      { label: 'Track offer acceptance rate and adjust pricing', owner: 'Revenue Ops', due: 'Week 2' },
    ]
  },
  {
    id: 'RSK-092', type: 'Supply Chain', risk: 'Critical Inventory Shortage', severity: 'Critical',
    desc: 'Warehouse B will run out of Component X in 4 days. Supplier delayed.',
    action: 'Reroute from Warehouse A.',
    mitigateSteps: [
      { label: 'Authorize emergency stock transfer from Warehouse A', owner: 'Operations', due: 'TODAY' },
      { label: 'Contact backup suppliers for emergency PO', owner: 'Procurement', due: 'TODAY' },
      { label: 'Notify production team of potential delay risk', owner: 'Supply Chain', due: 'Day 1' },
      { label: 'Update ETA tracking dashboard for management', owner: 'Logistics', due: 'Day 2' },
    ]
  },
  {
    id: 'RSK-093', type: 'HR', risk: 'Elevated Employee Attrition', severity: 'Medium',
    desc: 'Engineering department showing 30% drop in sentiment score over 2 weeks.',
    action: 'Schedule townhall & review compensation.',
    mitigateSteps: [
      { label: 'Schedule all-hands townhall for Engineering team', owner: 'HR + CTO', due: 'Day 2' },
      { label: 'Conduct anonymous pulse survey for root cause analysis', owner: 'People Ops', due: 'Day 1' },
      { label: 'Review compensation benchmarks vs. market data', owner: 'HR Manager', due: 'Week 1' },
      { label: 'Implement retention bonuses for high performers', owner: 'CFO + HR', due: 'Week 2' },
    ]
  },
  {
    id: 'RSK-094', type: 'Security', risk: 'Suspicious Payment Delays', severity: 'High',
    desc: '3 large accounts have unusual payment patterns resembling potential fraud.',
    action: 'Freeze credit terms and audit.',
    mitigateSteps: [
      { label: 'Immediately freeze credit terms on 3 flagged accounts', owner: 'Finance / CFO', due: 'TODAY' },
      { label: 'Escalate to fraud detection team for investigation', owner: 'Security', due: 'Day 1' },
      { label: 'Request official payment confirmation from account contacts', owner: 'AR Team', due: 'Day 1' },
      { label: 'File SAR (Suspicious Activity Report) if confirmed', owner: 'Compliance', due: 'Day 3' },
    ]
  },
];

const AUDIT_RESULTS = [
  { area: 'Financial Risk', findings: 2, level: 'High', detail: 'Enterprise contract expirations and AR anomalies detected.' },
  { area: 'Supply Chain', findings: 1, level: 'Critical', detail: 'Component X shortage in Warehouse B — 4 days to stockout.' },
  { area: 'HR & People', findings: 1, level: 'Medium', detail: 'Engineering sentiment drop of 30% over 14 days.' },
  { area: 'Cybersecurity', findings: 3, level: 'High', detail: 'Suspicious payment patterns on 3 major accounts flagged.' },
  { area: 'Compliance', findings: 0, level: 'Clear', detail: 'All regulatory filings current. No violations detected.' },
  { area: 'Operations', findings: 1, level: 'Low', detail: 'Minor process inefficiencies in procurement workflow.' },
];

function AuditModal({ onClose }) {
  const [phase, setPhase] = useState('scanning'); // scanning | results
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLabel, setScanLabel] = useState('Initializing AI Risk Engine...');

  React.useEffect(() => {
    const steps = [
      [300, 'Scanning Financial data...'],
      [900, 'Analyzing Supply Chain signals...'],
      [1600, 'Reviewing HR sentiment data...'],
      [2300, 'Auditing Security logs...'],
      [2900, 'Checking Compliance records...'],
      [3400, 'Generating AI Risk Report...'],
    ];
    steps.forEach(([ms, label]) => {
      setTimeout(() => {
        setScanLabel(label);
        setScanProgress(Math.round((steps.indexOf(steps.find(s => s[0] === ms)) + 1) / steps.length * 100));
      }, ms);
    });
    setTimeout(() => setPhase('results'), 4000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={phase === 'results' ? onClose : undefined}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full max-w-2xl bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#EF4444]/10 to-[#F59E0B]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EF4444] to-[#F59E0B] flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <ShieldAlert size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Enterprise Risk Audit</h2>
              <p className="text-xs text-[#94A3B8]">{phase === 'scanning' ? 'AI is scanning all business systems...' : 'Audit complete — review findings below'}</p>
            </div>
          </div>
          {phase === 'results' && (
            <button onClick={onClose} className="functional-btn p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        <div className="p-6">
          {phase === 'scanning' ? (
            /* Scan Animation */
            <div className="flex flex-col items-center gap-6 py-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-[#EF4444]/20 flex items-center justify-center">
                  <Loader2 size={36} className="text-[#EF4444] animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#EF4444] animate-spin" />
              </div>
              <div className="w-full text-center space-y-3">
                <p className="text-white font-bold">{scanLabel}</p>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#EF4444] to-[#F59E0B] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xs text-[#94A3B8]">{scanProgress}% complete — please wait</p>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="space-y-4">
              <p className="text-sm text-[#94A3B8] mb-2">Scanned <span className="text-white font-bold">6 business areas</span>. Found <span className="text-[#EF4444] font-bold">8 issues</span> requiring attention.</p>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
                {AUDIT_RESULTS.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className={`shrink-0 px-2 py-1 rounded-md text-[10px] font-bold mt-0.5 ${
                      r.level === 'Critical' ? 'bg-[#EF4444]/20 text-[#EF4444]' :
                      r.level === 'High' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
                      r.level === 'Medium' ? 'bg-[#00D4FF]/20 text-[#00D4FF]' :
                      r.level === 'Low' ? 'bg-white/10 text-[#94A3B8]' :
                      'bg-[#10B981]/20 text-[#10B981]'
                    }`}>{r.level}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-white text-sm">{r.area}</p>
                        <p className="text-xs text-[#94A3B8] shrink-0">{r.findings} finding{r.findings !== 1 ? 's' : ''}</p>
                      </div>
                      <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{r.detail}</p>
                    </div>
                    {r.level === 'Clear' ? <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" /> : <AlertTriangle size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />}
                  </motion.div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="functional-btn w-full py-2.5 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white font-bold text-sm hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Close Report
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MitigateModal({ risk, onClose, onMitigated }) {
  const [steps, setSteps] = useState(risk.mitigateSteps.map(s => ({ ...s, done: false })));
  const [confirming, setConfirming] = useState(false);

  const toggleStep = i => {
    const updated = [...steps];
    updated[i].done = !updated[i].done;
    setSteps(updated);
  };

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      onMitigated(risk.id);
      toast.success(`${risk.id} mitigation workflow activated! 🛡️`);
      onClose();
    }, 1200);
  };

  const sevColor = risk.severity === 'Critical' ? '#EF4444' : risk.severity === 'High' ? '#F59E0B' : '#00D4FF';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full max-w-lg bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-start justify-between" style={{ borderBottomColor: `${sevColor}30` }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#94A3B8]">{risk.id}</span>
              <span className="text-xs font-bold text-[#94A3B8]">·</span>
              <span className="text-xs font-bold text-[#94A3B8]">{risk.type}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                risk.severity === 'Critical' ? 'bg-[#EF4444]/20 text-[#EF4444]' :
                risk.severity === 'High' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
                'bg-[#00D4FF]/20 text-[#00D4FF]'
              }`}>{risk.severity}</span>
            </div>
            <h2 className="text-base font-bold text-white">{risk.risk}</h2>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{risk.desc}</p>
          </div>
          <button onClick={onClose} className="functional-btn ml-4 shrink-0 p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* AI Action */}
        <div className="mx-6 mt-4 p-3 rounded-xl flex items-start gap-2" style={{ backgroundColor: `${sevColor}10`, border: `1px solid ${sevColor}30` }}>
          <ShieldCheck size={14} style={{ color: sevColor }} className="shrink-0 mt-0.5" />
          <p className="text-xs font-bold" style={{ color: sevColor }}>AI Recommended: {risk.action}</p>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-2">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Mitigation Steps — click to mark complete</p>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              onClick={() => toggleStep(i)}
              whileHover={{ scale: 1.01 }}
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                step.done ? 'bg-[#10B981]/10 border-[#10B981]/30' : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
              }`}
            >
              <CheckCircle2 size={16} className={`shrink-0 mt-0.5 transition-colors ${step.done ? 'text-[#10B981]' : 'text-white/20'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${step.done ? 'line-through text-[#94A3B8]' : 'text-white'}`}>{step.label}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-[#94A3B8] font-semibold">{step.owner}</span>
                  <span className={`text-[10px] font-bold flex items-center gap-1 ${step.due === 'TODAY' ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}>
                    <Clock size={9} /> {step.due}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose} className="functional-btn flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white text-sm font-bold transition-colors">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="functional-btn flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ background: `linear-gradient(to right, ${sevColor}, #7C3AED)`, boxShadow: `0 0 15px ${sevColor}40` }}
          >
            {confirming ? <><Loader2 size={14} className="animate-spin" /> Activating...</> : <><ShieldCheck size={14} /> Activate Mitigation</>}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function RiskCenterPage() {
  const [risks, setRisks] = useState(initialRisks);
  const [mitigated, setMitigated] = useState([]);
  const [showAudit, setShowAudit] = useState(false);
  const [mitigateRisk, setMitigateRisk] = useState(null);

  const handleMitigated = (id) => {
    setMitigated(m => [...m, id]);
    setRisks(r => r.filter(risk => risk.id !== id));
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EF4444] to-[#F59E0B] flex items-center justify-center">
              <ShieldAlert size={24} className="text-white" />
            </div>
            Risk Detection Center
          </h1>
          <p className="text-[#94A3B8] font-medium">AI-driven proactive identification of business threats.</p>
        </div>
        <button
          onClick={() => setShowAudit(true)}
          className="functional-btn self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EF4444] text-white text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all"
        >
          <RefreshCw size={16} /> Run Full Audit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 border-[#EF4444]/20 bg-[#0B1120]/60">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Total Active Risks</h3>
          <p className="text-4xl font-bold text-white mb-2">{risks.length}</p>
          <div className="flex items-center gap-2 text-xs font-bold text-[#EF4444]">
            <TrendingDown size={14}/> +3 since yesterday
          </div>
        </GlassCard>
        <GlassCard className="p-6 border-[#F59E0B]/20 bg-[#0B1120]/60">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Critical Severity</h3>
          <p className="text-4xl font-bold text-white mb-2">{risks.filter(r => r.severity === 'Critical').length}</p>
          <div className="text-xs font-bold text-[#94A3B8]">Requires immediate CEO approval</div>
        </GlassCard>
        <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Risks Mitigated</h3>
          <p className="text-4xl font-bold text-white mb-2">{45 + mitigated.length}</p>
          <div className="text-xs font-bold text-[#10B981]">In the last 30 days</div>
        </GlassCard>
      </div>

      {/* Risk Table */}
      <GlassCard className="p-0 border-white/5 bg-[#0B1120]/60 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={16} className="text-[#F59E0B]"/> Identified Threats
          </h3>
          <span className="text-xs text-[#94A3B8]">{risks.length} active</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#94A3B8]">
                <th className="p-4 font-bold">ID / Type</th>
                <th className="p-4 font-bold">Risk Description</th>
                <th className="p-4 font-bold">Severity</th>
                <th className="p-4 font-bold">AI Recommended Action</th>
                <th className="p-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <AnimatePresence>
                {risks.map((risk) => (
                  <motion.tr
                    key={risk.id}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-bold text-white">{risk.id}</p>
                      <p className="text-xs text-[#94A3B8]">{risk.type}</p>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="font-bold text-white mb-1">{risk.risk}</p>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{risk.desc}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        risk.severity === 'Critical' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30' :
                        risk.severity === 'High' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30' :
                        'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/30'
                      }`}>
                        {risk.severity}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs text-xs text-[#00D4FF] font-medium leading-relaxed">{risk.action}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setMitigateRisk(risk)}
                        className="functional-btn flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 hover:scale-[1.03] transition-all"
                      >
                        Mitigate <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {risks.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <ShieldCheck size={40} className="text-[#10B981]" />
                      <p className="text-white font-bold text-lg">All Clear!</p>
                      <p className="text-[#94A3B8] text-sm">All identified risks have been mitigated.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modals */}
      <AnimatePresence>
        {showAudit && <AuditModal onClose={() => setShowAudit(false)} />}
        {mitigateRisk && <MitigateModal risk={mitigateRisk} onClose={() => setMitigateRisk(null)} onMitigated={handleMitigated} />}
      </AnimatePresence>
    </div>
  );
}
