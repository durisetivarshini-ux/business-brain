import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { Activity, ShieldCheck, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '@/context/WorkspaceContext';

export function HealthScores() {
  const navigate = useNavigate();
  const { workspaceConfig: config } = useWorkspace();
  
  // Calculate dynamic health score
  const goalsCount = config?.goals?.length || 2;
  const rawScore = 80 + (goalsCount * 4) + (config?.customIndustry === 'Software Company' ? 4 : 2);
  const healthScore = Math.min(100, Math.max(50, rawScore));
  
  const getHealthRating = () => {
    if (healthScore >= 90) return { label: 'Excellent', grade: 'A+', color: '#10B981' };
    if (healthScore >= 75) return { label: 'Healthy', grade: 'A', color: '#00D4FF' };
    if (healthScore >= 60) return { label: 'Needs Attention', grade: 'B', color: '#F59E0B' };
    return { label: 'Critical', grade: 'F', color: '#EF4444' };
  };

  const rating = getHealthRating();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full mb-6">
      
      {/* Business Health Score */}
      <GlassCard 
        onClick={() => navigate('/app/executive')}
        className="p-6 border-[#00D4FF]/30 bg-gradient-to-r from-[#0B1120]/90 to-[#050816]/90 flex items-center gap-6 relative overflow-hidden group cursor-pointer hover:border-[#00D4FF]/50 transition-all"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4FF]/10 blur-[40px] rounded-full group-hover:bg-[#00D4FF]/20 transition-colors" />
        
        {/* Score Circle */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="50" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <motion.circle 
              cx="56" cy="56" r="50" fill="transparent" stroke="#00D4FF" strokeWidth="8" 
              strokeDasharray="314" strokeDashoffset={314 - (314 * healthScore) / 100}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 314 }}
              animate={{ strokeDashoffset: 314 - (314 * healthScore) / 100 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-display font-bold text-white"><CountUp end={healthScore} duration={2}/></span>
            <span className="text-[10px] font-bold text-[#00D4FF] uppercase tracking-widest">Score</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
            <Activity size={18} className="text-[#00D4FF]" /> Business Health Score
          </h2>
          <p className="text-xs text-[#94A3B8] mb-4">Overall operational vitality based on 45+ metrics.</p>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded-lg border border-white/5">
              <span className="text-[#94A3B8]">Revenue</span> <span className="text-[#10B981] font-bold">Optimal</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded-lg border border-white/5">
              <span className="text-[#94A3B8]">Inventory</span> <span className="text-[#F59E0B] font-bold">Warning</span>
            </div>
            <div className="col-span-2 flex items-start gap-2 mt-1 p-2 bg-[#00D4FF]/10 rounded-lg border border-[#00D4FF]/20">
              <Zap size={14} className="text-[#00D4FF] shrink-0 mt-0.5" />
              <span className="text-white/90 text-xs">AI Suggestion: Improve inventory turnover to raise score to 92.</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Company Performance Score */}
      <GlassCard className="p-6 border-[#5B5FFF]/30 bg-gradient-to-r from-[#0B1120]/90 to-[#050816]/90 flex items-center gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B5FFF]/10 blur-[40px] rounded-full group-hover:bg-[#5B5FFF]/20 transition-colors" />
        
        {/* Detail List First */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-[#5B5FFF]" /> Company Performance
          </h2>
          <p className="text-xs text-[#94A3B8] mb-4">Market position, growth rate, and competitive edge.</p>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded-lg border border-white/5">
              <span className="text-[#94A3B8]">Growth</span> <span className="text-[#10B981] font-bold">+24%</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded-lg border border-white/5">
              <span className="text-[#94A3B8]">Market Share</span> <span className="text-[#10B981] font-bold">14.2%</span>
            </div>
            <div className="col-span-2 flex items-center justify-between mt-1 p-2 bg-[#5B5FFF]/10 rounded-lg border border-[#5B5FFF]/20">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-[#5B5FFF]" />
                <span className="text-white/90 font-bold">Industry Rank</span>
              </div>
              <span className="text-white font-bold text-sm">#4 <span className="text-xs font-normal text-[#94A3B8]">out of 150</span></span>
            </div>
          </div>
        </div>

        {/* Hexagon Score */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#5B5FFF]/20 animate-pulse [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]" />
          <div className="absolute inset-1 bg-[#050816] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] border border-[#5B5FFF]" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-3xl font-display font-bold text-white">{rating.grade}</span>
            <span className="text-[10px] font-bold text-[#5B5FFF] uppercase tracking-widest mt-1">{rating.label}</span>
          </div>
        </div>
      </GlassCard>

    </div>
  );
}
