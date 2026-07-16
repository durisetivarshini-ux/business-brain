import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { Megaphone, Users, UserPlus, DollarSign } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function MarketingKPIGrid() {
  const stats = [
    { title: "Active Campaigns", value: 84, icon: <Megaphone size={20}/>, color: "#EC4899", status: "Running" },
    { title: "Marketing ROI", value: 386, icon: <DollarSign size={20}/>, color: "#F59E0B", suffix: "%", status: "Excellent" },
    { title: "Website Visitors", value: 2.1, icon: <Users size={20}/>, color: "#5B5FFF", suffix: " M", decimals: 1, status: "Active" },
    { title: "Leads Generated", value: 18500, icon: <UserPlus size={20}/>, color: "#10B981", status: "Processed" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard hover glowColor={stat.color} className="p-5 flex flex-col items-start border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: stat.color }} />

            <div className="flex justify-between items-start w-full mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 ${stat.status === 'Excellent' ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
                {stat.status}
              </span>
            </div>

            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">{stat.title}</h3>
            
            <div className="text-2xl font-display font-bold text-white tracking-tight">
              {stat.prefix}
              <CountUp end={stat.value} decimals={stat.decimals || 0} duration={2} separator="," />
              {stat.suffix}
            </div>

          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
