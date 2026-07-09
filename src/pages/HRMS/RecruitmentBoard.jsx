import React from 'react';
import { motion } from 'framer-motion';

export function RecruitmentBoard() {
  const columns = [
    { name: "Applied", count: 142, color: "#94A3B8" },
    { name: "Screening", count: 45, color: "#F59E0B" },
    { name: "Interview", count: 18, color: "#00D4FF" },
    { name: "HR Round", count: 6, color: "#7C3AED" },
    { name: "Selected", count: 2, color: "#10B981" },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 border border-white/5 rounded-xl p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recruitment Pipeline</h3>
        <span className="text-xs font-bold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/20 px-3 py-1 rounded-full">Active Roles: 26</span>
      </div>

      <div className="flex-1 flex items-end justify-between gap-4 pb-2 relative z-10">
        {columns.map((col, i) => {
          const maxCount = 142; // highest count for relative height
          const heightPercent = Math.max((col.count / maxCount) * 100, 15); // min 15%

          return (
            <div key={i} className="flex flex-col items-center gap-4 flex-1 h-[220px] justify-end group">
              
              <div className="w-full relative flex justify-center items-end h-full">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 1.2, delay: i * 0.1, type: "spring", bounce: 0.3 }}
                  className="w-full max-w-[50px] rounded-t-xl relative flex justify-center"
                  style={{ 
                    background: `linear-gradient(to top, ${col.color}10, ${col.color}90)`, 
                    borderTop: `2px solid ${col.color}`,
                    borderLeft: `1px solid ${col.color}40`,
                    borderRight: `1px solid ${col.color}40`,
                    boxShadow: `0 0 20px ${col.color}40, inset 0 2px 10px ${col.color}80` 
                  }}
                >
                  <div className="absolute -top-8 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                    {col.count}
                  </div>
                  {/* Inner shine */}
                  <div className="absolute top-0 bottom-0 left-[10%] w-[20%] bg-gradient-to-b from-white/40 to-transparent mix-blend-overlay"></div>
                </motion.div>
              </div>

              <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider group-hover:text-white transition-colors text-center">{col.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
