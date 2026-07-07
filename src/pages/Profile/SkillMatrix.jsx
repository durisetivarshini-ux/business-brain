import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';

export function SkillMatrix() {
  const skills = [
    { name: "Executive Leadership", level: 98, color: "#10B981" },
    { name: "Strategic Operations", level: 95, color: "#5B5FFF" },
    { name: "Enterprise Architecture", level: 88, color: "#00D4FF" },
    { name: "AI Integration", level: 92, color: "#7C3AED" },
    { name: "Financial Forecasting", level: 85, color: "#EC4899" },
    { name: "Cross-functional Comms", level: 96, color: "#F59E0B" },
  ];

  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-full flex flex-col">
      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Competency Matrix</h3>
      
      <div className="flex-1 flex flex-col justify-center gap-5">
        {skills.map((skill, i) => (
          <div key={i} className="w-full">
            <div className="flex justify-between items-center text-xs font-bold text-[#94A3B8] mb-2">
              <span className="text-white">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="h-2 w-full bg-[#050816] rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full relative"
                style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}80` }}
              >
                 <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
