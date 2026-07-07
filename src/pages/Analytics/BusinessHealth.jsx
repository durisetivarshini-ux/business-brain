import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function BusinessHealth() {
  const departments = [
    { name: "Finance", score: 98, color: "#10B981" },
    { name: "Marketing", score: 99, color: "#EC4899" },
    { name: "Sales", score: 97, color: "#00D4FF" },
    { name: "Inventory", score: 96, color: "#F59E0B" },
    { name: "CRM", score: 95, color: "#7C3AED" },
    { name: "Support", score: 96, color: "#5B5FFF" },
    { name: "HR", score: 94, color: "#94A3B8" },
  ];

  return (
    <GlassCard className="p-8 border-white/5 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden flex flex-col h-full shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
      
      {/* Background Glow */}
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] h-[80%] bg-[#5B5FFF]/10 blur-[100px] rounded-full pointer-events-none" />

      <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-8 flex items-center gap-2 relative z-10">
        <Activity size={18} className="text-[#5B5FFF]" /> Overall Business Health
      </h2>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10">
        
        {/* Main Score Ring */}
        <div className="relative flex items-center justify-center">
          <svg className="w-64 h-64 transform -rotate-90">
            <circle cx="128" cy="128" r="110" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
            <motion.circle 
              cx="128" cy="128" r="110" 
              stroke="url(#healthGradient)" 
              strokeWidth="12" 
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={2 * Math.PI * 110 * (1 - 0.98)}
              strokeLinecap="round"
              fill="transparent"
              initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 110 * (1 - 0.98) }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5B5FFF" />
                <stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-display font-bold text-white tracking-tighter">
              <CountUp end={98} duration={2.5} />%
            </span>
            <span className="text-sm font-bold text-[#10B981] tracking-widest uppercase mt-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">Excellent</span>
          </div>
        </div>

        {/* Department Scores */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
          {departments.map((dept, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                <span>{dept.name}</span>
                <span className="text-white">{dept.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.score}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: dept.color, boxShadow: `0 0 10px ${dept.color}` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </GlassCard>
  );
}
