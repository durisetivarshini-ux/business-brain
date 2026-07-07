import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export function FinancialSummaryCard({ title, value, trend, isPositive }) {
  return (
    <GlassCard className="p-4 border border-white/5">
      <h3 className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <div className={`flex items-center text-xs mt-2 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {trend}
      </div>
    </GlassCard>
  );
}
