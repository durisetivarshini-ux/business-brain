import React from 'react';
import { AlertTriangle, ShieldAlert, Activity, AlertOctagon, ArrowUpRight, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { FunctionalButton } from '@/components/ui/FunctionalButton';
import { motion } from 'framer-motion';

export function RiskCenterPage() {
  const risks = [
    { id: "RSK-091", type: "Financial", risk: "Revenue Decline Predictor", severity: "High", desc: "AI forecasts a 15% revenue drop in Q4 due to enterprise contract expirations.", action: "Launch retention offers immediately." },
    { id: "RSK-092", type: "Supply Chain", risk: "Critical Inventory Shortage", severity: "Critical", desc: "Warehouse B will run out of Component X in 4 days. Supplier delayed.", action: "Reroute from Warehouse A." },
    { id: "RSK-093", type: "HR", risk: "Elevated Employee Attrition", severity: "Medium", desc: "Engineering department showing 30% drop in sentiment score over 2 weeks.", action: "Schedule townhall & review compensation." },
    { id: "RSK-094", type: "Security", risk: "Suspicious Payment Delays", severity: "High", desc: "3 large accounts have unusual payment patterns resembling potential fraud.", action: "Freeze credit terms and audit." },
  ];

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
        <div className="flex items-center gap-3">
          <FunctionalButton 
            actionName="Full Audit"
            successMessage="Enterprise risk audit initiated successfully!"
            className="px-4 py-2 rounded-xl bg-[#EF4444] text-white text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-transform hover:scale-[1.02]"
          >
            Run Full Audit
          </FunctionalButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 border-[#EF4444]/20 bg-[#0B1120]/60">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Total Active Risks</h3>
          <p className="text-4xl font-bold text-white mb-2">12</p>
          <div className="flex items-center gap-2 text-xs font-bold text-[#EF4444]">
            <TrendingDown size={14}/> +3 since yesterday
          </div>
        </GlassCard>
        <GlassCard className="p-6 border-[#F59E0B]/20 bg-[#0B1120]/60">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Critical Severity</h3>
          <p className="text-4xl font-bold text-white mb-2">1</p>
          <div className="flex items-center gap-2 text-xs font-bold text-[#94A3B8]">
            Requires immediate CEO approval
          </div>
        </GlassCard>
        <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Risks Mitigated</h3>
          <p className="text-4xl font-bold text-white mb-2">45</p>
          <div className="flex items-center gap-2 text-xs font-bold text-[#10B981]">
            In the last 30 days
          </div>
        </GlassCard>
      </div>

      {/* Risk Table */}
      <GlassCard className="p-0 border-white/5 bg-[#0B1120]/60 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={16} className="text-[#F59E0B]"/> Identified Threats
          </h3>
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
              {risks.map((risk, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
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
                  <td className="p-4 max-w-xs text-xs text-[#00D4FF] font-medium leading-relaxed">
                    {risk.action}
                  </td>
                  <td className="p-4">
                    <FunctionalButton 
                      actionName="Mitigate Risk"
                      successMessage={`Mitigation workflow initiated for ${risk.id}`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
                    >
                      Mitigate <ArrowUpRight size={14} />
                    </FunctionalButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
}
