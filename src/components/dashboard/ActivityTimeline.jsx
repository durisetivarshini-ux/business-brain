import React from 'react';
import { motion } from 'framer-motion';
import { FileText, UserPlus, CreditCard, Rocket, UserCheck, Package } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

import { Link } from 'react-router-dom';

export function ActivityTimeline() {
  const activities = [
    { icon: <FileText size={14}/>, color: "#5B5FFF", title: "AI generated Q3 report", time: "10 mins ago" },
    { icon: <UserPlus size={14}/>, color: "#00D4FF", title: "Enterprise Customer added", time: "45 mins ago" },
    { icon: <CreditCard size={14}/>, color: "#10B981", title: "Invoice #4892 paid", time: "2 hours ago" },
    { icon: <Rocket size={14}/>, color: "#F59E0B", title: "Marketing Campaign launched", time: "4 hours ago" },
    { icon: <UserCheck size={14}/>, color: "#EC4899", title: "New employee onboarded", time: "5 hours ago" },
    { icon: <Package size={14}/>, color: "#7C3AED", title: "Inventory stock updated", time: "6 hours ago" },
  ];

  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Recent Activity</h3>
        <Link to="/app/notifications" className="text-sm text-[#00D4FF] hover:underline font-medium">View All</Link>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />
        
        <div className="space-y-6 relative">
          {activities.map((act, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative z-10 shadow-lg"
                style={{ backgroundColor: `${act.color}20`, color: act.color, border: `1px solid ${act.color}40` }}
              >
                {act.icon}
              </div>
              <div className="pt-1.5">
                <p className="text-sm font-semibold text-white leading-none mb-1.5">{act.title}</p>
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{act.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
