import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { Users, UserPlus, Wallet, Percent } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function CRMStatsGrid() {
  const stats = [
    { title: "Total Customers", value: 18250, icon: <Users size={20}/>, color: "#5B5FFF", prefix: "" },
    { title: "New Leads", value: 1240, icon: <UserPlus size={20}/>, color: "#00D4FF", prefix: "" },
    { title: "Revenue", value: 5.4, icon: <Wallet size={20}/>, color: "#F59E0B", prefix: "₹", suffix: " Cr", decimals: 1 },
    { title: "Conversion Rate", value: 42, icon: <Percent size={20}/>, color: "#7C3AED", prefix: "", suffix: "%" },
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

            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
            >
              {stat.icon}
            </div>

            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">{stat.title}</h3>
            
            <div className="text-2xl font-display font-bold text-white tracking-tight">
              {stat.prefix}
              <CountUp end={stat.value} decimals={stat.decimals || 0} duration={2} separator="," />
              {stat.suffix}
            </div>

            {/* Simulated mini sparkline */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
              <div className="h-full" style={{ width: `${Math.random() * 50 + 50}%`, backgroundColor: stat.color, opacity: 0.8 }} />
            </div>

          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
