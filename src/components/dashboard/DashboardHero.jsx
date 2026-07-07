import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { FunctionalButton } from '../ui/FunctionalButton';
import { useAppStore } from '../../store/useAppStore';

export function DashboardHero() {
  const { user } = useAppStore();
  const displayName = user?.name || 'there';
  const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 relative z-10">
      
      {/* Welcome Message */}
      <GlassCard className="flex-1 border-[#5B5FFF]/20 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 p-8 shadow-[0_10px_40px_rgba(91,95,255,0.1)] relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-[#5B5FFF]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-50%] left-[-10%] w-[50%] h-[100%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B5FFF]/20 border border-[#5B5FFF]/30 text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} /> AI Analysis Complete
          </motion.div>
          
            <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-2"
          >
            {greeting} 👋 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]">Welcome back, {displayName}.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-xl leading-relaxed mb-6"
          >
            Your company is performing exceptionally well today. Revenue is up 12% from last week, and all 12 modules are stable.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4">
            <FunctionalButton 
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white font-bold shadow-[0_0_20px_rgba(91,95,255,0.4)] transition-transform hover:scale-105"
              loadingMessage="Generating comprehensive report..."
              successMessage="Report generated and saved to Documents!"
            >
              Generate Report <ArrowRight size={18} />
            </FunctionalButton>
            <FunctionalButton 
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
              loadingMessage="Loading AI strategy..."
              successMessage="Strategy module activated."
            >
              View AI Strategy
            </FunctionalButton>
          </motion.div>

        </div>
      </GlassCard>

      {/* Business Health Widget */}
      <GlassCard className="w-full md:w-80 p-8 flex flex-col items-center justify-center text-center border-[#00D4FF]/20 bg-[#0B1120]/80">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 w-full text-left">Business Health</h3>
        
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            {/* Background Circle */}
            <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            {/* Animated Progress Circle */}
            <motion.circle 
              cx="64" cy="64" r="56" 
              fill="none" 
              stroke="#00D4FF" 
              strokeWidth="12" 
              strokeLinecap="round"
              initial={{ strokeDasharray: "351", strokeDashoffset: "351" }}
              animate={{ strokeDashoffset: 351 - (351 * 0.98) }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.5))' }}
            />
          </svg>
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white tracking-tight">98%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[#00D4FF] font-semibold text-sm">
          <TrendingUp size={16} /> Optimal Status
        </div>
      </GlassCard>

    </div>
  );
}
