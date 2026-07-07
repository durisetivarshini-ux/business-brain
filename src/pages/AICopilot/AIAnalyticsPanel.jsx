import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Box, Wallet, Share2 } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AIAnalyticsPanel() {
  const stats = [
    { name: "Revenue", status: "Healthy", color: "#5B5FFF", icon: <TrendingUp size={16}/> },
    { name: "Inventory", status: "Stable", color: "#10B981", icon: <Box size={16}/> },
    { name: "Finance", status: "Growing", color: "#00D4FF", icon: <Wallet size={16}/> },
    { name: "Marketing", status: "Excellent", color: "#F59E0B", icon: <Share2 size={16}/> },
  ];

  return (
    <div className="w-72 hidden 2xl:flex flex-col gap-4">
      <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/80 flex flex-col items-center justify-center text-center">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 w-full text-left">Business Score</h3>
        
        <div className="relative w-32 h-32 flex items-center justify-center mb-2">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <motion.circle 
              cx="64" cy="64" r="56" 
              fill="none" 
              stroke="#00D4FF" 
              strokeWidth="8" 
              strokeLinecap="round"
              initial={{ strokeDasharray: "351", strokeDashoffset: "351" }}
              animate={{ strokeDashoffset: 351 - (351 * 0.98) }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.6))' }}
            />
          </svg>
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white tracking-tight">98%</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex-1">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Live Status</h3>
        <div className="space-y-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <span className="font-bold text-sm text-white">{stat.name}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: stat.color }}>
                {stat.status}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
