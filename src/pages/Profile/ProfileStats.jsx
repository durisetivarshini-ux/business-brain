import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Briefcase, Zap } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function ProfileStats() {
  const stats = [
    { title: "Revenue Impact", value: 12.4, prefix: "$", suffix: "M", icon: <TrendingUp size={20}/>, color: "#10B981", desc: "Generated Q3" },
    { title: "Business Brain Score", value: 96, suffix: "/100", icon: <Zap size={20}/>, color: "#00D4FF", desc: "Top 5% of Company" },
    { title: "Projects Delivered", value: 48, icon: <Briefcase size={20}/>, color: "#7C3AED", desc: "100% On-Time" },
    { title: "Objectives Met", value: 92, suffix: "%", icon: <Target size={20}/>, color: "#EC4899", desc: "Above Target" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard hover glowColor={stat.color} className="p-6 flex flex-col items-start border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: stat.color }} />

            <div className="flex justify-between items-center w-full mb-6">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-[#94A3B8]">{stat.desc}</span>
            </div>

            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">{stat.title}</h3>
            
            <div className="text-3xl font-display font-bold text-white tracking-tight flex items-baseline gap-1">
              {stat.prefix}
              <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} duration={2} separator="," />
              <span className="text-lg text-white/50">{stat.suffix}</span>
            </div>

          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
