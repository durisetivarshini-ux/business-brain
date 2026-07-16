import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useNavigate } from 'react-router-dom';

export function KPICard({ title, value, prefix = "", suffix = "", trend, isPositive, data, color, delay = 0, path }) {
  const navigate = useNavigate();
  console.log("KPICard IMPORTS:", { CountUp, motion, ArrowUpRight, ArrowDownRight, GlassCard });
  // Simple SVG sparkline generation
  const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - (val / Math.max(...data)) * 100}`).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={() => path && navigate(path)}
      className={path ? "cursor-pointer" : ""}
    >
      <GlassCard hover glowColor={color} className="p-6 relative overflow-hidden group border-white/5 bg-[#0B1120]/60">
        
        {/* Glow Background */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
          style={{ backgroundColor: color }}
        />

        <div className="flex justify-between items-start mb-4 relative z-10">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">{title}</h3>
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border ${isPositive ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border-rose-400/20'}`}>
            {isPositive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
            {trend}
          </div>
        </div>

        <div className="flex items-end justify-between relative z-10">
          <div className="text-3xl font-display font-bold text-white tracking-tight">
            {prefix}
            {value}
            {suffix}
          </div>
          
          {/* Mini Sparkline Chart */}
          <div className="w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
                  <stop offset="100%" stopColor={color} stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polygon points={`0,100 ${points} 100,100`} fill={`url(#grad-${title})`} />
              <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

      </GlassCard>
    </motion.div>
  );
}
