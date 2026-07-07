import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export function LeadScoreCard({ score, trend }) {
  return (
    <GlassCard className="p-4 border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent">
      <h3 className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-2">Lead Score Avg</h3>
      <p className="text-2xl font-bold text-white mb-1">{score}</p>
      <p className="text-xs text-blue-400">{trend}</p>
    </GlassCard>
  );
}
