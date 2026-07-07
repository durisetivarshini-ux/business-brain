import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, AlertTriangle, ArrowUpRight } from 'lucide-react';

const fraudAlerts = [
  { id: 'TXN-9842', account: 'Acme Corp', amount: 45000, risk: 92, reason: 'Unusual payment volume from new IP address', time: '10m ago' },
  { id: 'TXN-9821', account: 'NovaTech', amount: 12000, risk: 78, reason: 'Duplicate invoice submitted within 24h', time: '1h ago' },
  { id: 'TXN-9755', account: 'Global Ind', amount: 8500, risk: 65, reason: 'Payment routed through non-standard clearing house', time: '3h ago' },
];

export function FraudDetection() {
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
            {fraudAlerts.map((alert, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-white">{alert.account}</p>
                  <p className="text-xs text-[#94A3B8] font-mono">{alert.id}</p>
                </td>
                <td className="p-4 font-bold text-white">
                  ${alert.amount.toLocaleString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${alert.risk}%`, backgroundColor: alert.risk > 80 ? '#EF4444' : '#F59E0B' }} />
                    </div>
                    <span className={`text-xs font-bold ${alert.risk > 80 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>{alert.risk}/100</span>
                  </div>
                </td>
                <td className="p-4 max-w-xs">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className={alert.risk > 80 ? 'text-[#EF4444] shrink-0 mt-0.5' : 'text-[#F59E0B] shrink-0 mt-0.5'} />
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{alert.reason}</p>
                  </div>
                </td>
                <td className="p-4">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs font-bold hover:bg-[#EF4444]/20 transition-colors">
                    Review <ArrowUpRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
