import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, AlertTriangle, ArrowUpRight, X, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const fraudAlerts = [
  {
    id: 'TXN-9842', account: 'Acme Corp', amount: 45000, risk: 92,
    reason: 'Unusual payment volume from new IP address', time: '10m ago',
    details: 'Transaction originated from IP 192.168.47.231 — flagged as a new geographic location. Account has 3x normal transaction volume in the last 2 hours. Recommendation: Freeze transaction and verify with account holder.',
  },
  {
    id: 'TXN-9821', account: 'NovaTech', amount: 12000, risk: 78,
    reason: 'Duplicate invoice submitted within 24h', time: '1h ago',
    details: 'Invoice #INV-4421 was already processed on July 8. A second identical submission was received today from the same vendor. This matches a known double-billing pattern. Recommendation: Flag for AP review before release.',
  },
  {
    id: 'TXN-9755', account: 'Global Ind', amount: 8500, risk: 65,
    reason: 'Payment routed through non-standard clearing house', time: '3h ago',
    details: 'Payment was routed via an unrecognized IFSC code (NONB0001234). Standard clearing house not used. This is atypical for this account. Recommendation: Confirm beneficiary details with relationship manager.',
  },
];

const actionConfig = {
  approve: {
    color: '#10B981',
    icon: <CheckCircle size={22} />,
    smallIcon: <CheckCircle size={14} />,
    label: 'Approved & Released',
    shortLabel: 'Approved',
    message: (id) => `Transaction ${id} has been approved and released to the beneficiary. Compliance log updated. No further action required.`,
  },
  block: {
    color: '#EF4444',
    icon: <XCircle size={22} />,
    smallIcon: <XCircle size={14} />,
    label: 'Blocked & Flagged',
    shortLabel: 'Blocked',
    message: (id) => `Transaction ${id} has been blocked and frozen. Flagged for internal audit. The account has been placed under temporary monitoring.`,
  },
  escalate: {
    color: '#F59E0B',
    icon: <Clock size={22} />,
    smallIcon: <Clock size={14} />,
    label: 'Escalated to Compliance',
    shortLabel: 'Escalated',
    message: (id) => `Transaction ${id} has been escalated to the Compliance team. A case file has been opened. Expected review within 24 hours.`,
  },
};

function ReviewModal({ alert, onClose, onActionCompleted }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAction = async (type) => {
    setLoading(type);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setResult(type);
    onActionCompleted(alert.id, type); // Update the parent table state
    
    if (type === 'approve') toast.success(`Transaction ${alert.id} approved and released.`);
    else if (type === 'block') toast.error(`Transaction ${alert.id} blocked and flagged for audit.`);
    else toast(`Transaction ${alert.id} escalated to compliance team.`, { icon: '⚠️' });
  };

  const riskColor = alert.risk > 80 ? '#EF4444' : '#F59E0B';
  const cfg = result ? actionConfig[result] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#EF4444]/20 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none" style={{ backgroundColor: result ? `${cfg.color}20` : `${riskColor}15` }} />
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-10"><X size={20} /></button>

        {/* ── Result Screen ── */}
        {result ? (
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg" style={{ backgroundColor: `${cfg.color}20`, color: cfg.color, border: `2px solid ${cfg.color}40`, boxShadow: `0 0 24px ${cfg.color}30` }}>
              {cfg.icon}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{cfg.label}</h2>
            <p className="text-xs font-mono text-[#94A3B8] mb-5">{alert.id} · {alert.account} · ${alert.amount.toLocaleString()}</p>

            <div className="w-full p-4 rounded-xl border text-left mb-6" style={{ backgroundColor: `${cfg.color}10`, borderColor: `${cfg.color}30` }}>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{cfg.message(alert.id)}</p>
            </div>

            {/* Mini audit trail */}
            <div className="w-full space-y-2 mb-6">
              {[
                { label: 'Reviewed by', value: 'System (AI + Manual)' },
                { label: 'Action taken', value: cfg.label },
                { label: 'Timestamp', value: new Date().toLocaleString('en-IN') },
                { label: 'Risk score at review', value: `${alert.risk}/100` },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                  <span className="text-[#94A3B8] font-bold uppercase tracking-wider">{row.label}</span>
                  <span className="text-white font-semibold">{row.value}</span>
                </div>
              ))}
            </div>

            <button onClick={onClose} className="w-full py-3 rounded-xl text-white text-sm font-bold hover:scale-[1.02] transition-all" style={{ background: `linear-gradient(135deg, ${cfg.color}, #00D4FF)` }}>
              Close
            </button>
          </div>
        ) : (
          /* ── Review Form ── */
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${riskColor}20`, color: riskColor }}>
                <ShieldAlert size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Review Transaction</h2>
                <p className="text-xs font-mono text-[#94A3B8]">{alert.id} · {alert.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 mb-4">
              {[
                { label: 'Account', value: alert.account },
                { label: 'Amount', value: `$${alert.amount.toLocaleString()}` },
                { label: 'Risk Score', value: `${alert.risk}/100` },
                { label: 'Status', value: 'Flagged' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs text-[#94A3B8] mb-1 uppercase tracking-wider font-bold">{item.label}</p>
                  <p className="text-sm font-bold" style={{ color: item.label === 'Risk Score' ? riskColor : '#fff' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} style={{ color: riskColor }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: riskColor }}>AI Flag Reason</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{alert.details}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAction('approve')}
                disabled={!!loading}
                className="py-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-bold hover:bg-[#10B981]/20 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {loading === 'approve' ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={14} />}
                Approve
              </button>
              <button
                onClick={() => handleAction('block')}
                disabled={!!loading}
                className="py-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs font-bold hover:bg-[#EF4444]/20 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {loading === 'block' ? <Loader2 size={13} className="animate-spin" /> : <XCircle size={14} />}
                Block
              </button>
              <button
                onClick={() => handleAction('escalate')}
                disabled={!!loading}
                className="py-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold hover:bg-[#F59E0B]/20 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {loading === 'escalate' ? <Loader2 size={13} className="animate-spin" /> : <Clock size={14} />}
                Escalate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FraudDetection() {
  const [reviewAlert, setReviewAlert] = useState(null);
  const [actionedAlerts, setActionedAlerts] = useState({}); // { [id]: 'approve' | 'block' | 'escalate' }

  const handleActionCompleted = (id, type) => {
    setActionedAlerts(prev => ({ ...prev, [id]: type }));
  };

  return (
    <GlassCard className="p-0 border-[#EF4444]/20 bg-[#0B1120]/60 mt-6 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#EF4444]/10 to-transparent">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <ShieldAlert className="text-[#EF4444]" /> Fraud Detection Center
          </h2>
          <p className="text-xs text-[#94A3B8]">AI-powered real-time transaction monitoring.</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="text-white text-sm font-bold">Active Monitoring</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#94A3B8] bg-white/[0.02]">
              <th className="p-4 font-bold">Transaction / Account</th>
              <th className="p-4 font-bold">Amount</th>
              <th className="p-4 font-bold">Risk Score</th>
              <th className="p-4 font-bold">AI Flag Reason</th>
              <th className="p-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {fraudAlerts.map((alert, i) => {
              const actionTaken = actionedAlerts[alert.id];
              const cfg = actionTaken ? actionConfig[actionTaken] : null;

              return (
                <tr key={i} className={`border-b border-white/5 transition-colors ${actionTaken ? 'bg-white/[0.02]' : 'hover:bg-white/5'}`}>
                  <td className="p-4">
                    <p className={`font-bold ${actionTaken && actionTaken !== 'escalate' ? 'text-[#94A3B8]' : 'text-white'}`}>{alert.account}</p>
                    <p className="text-xs text-[#94A3B8] font-mono">{alert.id}</p>
                  </td>
                  <td className={`p-4 font-bold ${actionTaken && actionTaken !== 'escalate' ? 'text-[#94A3B8]' : 'text-white'}`}>${alert.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <div className={`flex items-center gap-2 ${actionTaken && actionTaken !== 'escalate' ? 'opacity-50 grayscale' : ''}`}>
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${alert.risk}%`, backgroundColor: alert.risk > 80 ? '#EF4444' : '#F59E0B' }} />
                      </div>
                      <span className={`text-xs font-bold ${alert.risk > 80 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>{alert.risk}/100</span>
                    </div>
                  </td>
                  <td className={`p-4 max-w-xs ${actionTaken && actionTaken !== 'escalate' ? 'opacity-50' : ''}`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={14} className={`${alert.risk > 80 ? 'text-[#EF4444]' : 'text-[#F59E0B]'} shrink-0 mt-0.5`} />
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{alert.reason}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {actionTaken ? (
                      <div 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold"
                        style={{ backgroundColor: `${cfg.color}10`, borderColor: `${cfg.color}30`, color: cfg.color }}
                      >
                        {cfg.smallIcon} {cfg.shortLabel}
                      </div>
                    ) : (
                      <button
                        onClick={() => setReviewAlert(alert)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs font-bold hover:bg-[#EF4444]/20 transition-colors"
                      >
                        Review <ArrowUpRight size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {reviewAlert && <ReviewModal alert={reviewAlert} onClose={() => setReviewAlert(null)} onActionCompleted={handleActionCompleted} />}
    </GlassCard>
  );
}
