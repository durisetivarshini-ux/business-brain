import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';

export function FinancialHealth() {
  const scores = [
    { label: "Liquidity", status: "Excellent", color: "#10B981" },
    { label: "Profitability", status: "Strong", color: "#00D4FF" },
    { label: "Cash Flow", status: "Healthy", color: "#5B5FFF" },
    { label: "Growth", status: "High", color: "#7C3AED" },
  ];

  return (
    <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/80 flex flex-col h-full">
      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-8 w-full text-left">Overall Financial Score</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <motion.circle 
              cx="80" cy="80" r="70" 
              fill="none" 
              stroke="url(#healthGradient)" 
              strokeWidth="10" 
              strokeLinecap="round"
              initial={{ strokeDasharray: "440", strokeDashoffset: "440" }}
              animate={{ strokeDashoffset: 440 - (440 * 0.96) }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 12px rgba(16,185,129,0.4))' }}
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-4xl font-display font-bold text-white tracking-tight">96<span className="text-2xl">%</span></span>
          </div>
        </div>

        <div className="w-full space-y-3">
          {scores.map((score, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
            >
              <span className="text-sm font-bold text-[#94A3B8]">{score.label}</span>
              <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ backgroundColor: `${score.color}15`, color: score.color }}>
                {score.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
