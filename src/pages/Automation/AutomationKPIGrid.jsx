import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { Workflow, Zap, Clock, CheckCircle2, AlertTriangle, Timer } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AutomationKPIGrid() {
  const stats = [
    { title: "Active Workflows", value: 248, icon: <Workflow size={20}/>, color: "#5B5FFF", status: "Running" },
    { title: "Automations Today", value: 12580, icon: <Zap size={20}/>, color: "#00D4FF", status: "High Volume" },
    { title: "Tasks Saved", value: 18400, icon: <Clock size={20}/>, color: "#10B981", status: "+12%" },
    { title: "Success Rate", value: 99.8, icon: <CheckCircle2 size={20}/>, color: "#EC4899", suffix: "%", decimals: 1, status: "Excellent" },
    { title: "Failed Runs", value: 18, icon: <AlertTriangle size={20}/>, color: "#F59E0B", status: "Needs Review" },
    { title: "Time Saved (Hrs)", value: 4250, icon: <Timer size={20}/>, color: "#7C3AED", status: "↑ 400hrs" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 ${stat.title === 'Failed Runs' ? 'text-[#F59E0B]' : 'text-[#94A3B8]'}`}>
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
