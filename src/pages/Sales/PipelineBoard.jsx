import React from 'react';
import { motion } from 'framer-motion';

export function PipelineBoard() {
  const columns = [
    { name: "New Lead", count: 24, value: "₹4.2 Cr", color: "#94A3B8" },
    { name: "Qualified", count: 18, value: "₹3.8 Cr", color: "#F59E0B" },
    { name: "Proposal", count: 12, value: "₹5.1 Cr", color: "#00D4FF" },
    { name: "Negotiation", count: 8, value: "₹8.2 Cr", color: "#7C3AED" },
    { name: "Won", count: 4, value: "₹2.8 Cr", color: "#10B981" },
  ];

  return (
    <div className="flex flex-col h-full bg-white/5 border border-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Deal Pipeline</h3>
        <span className="text-xs text-[#94A3B8]">Total Pipeline: ₹24.1 Cr</span>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 pb-2">
        {columns.map((col, i) => {
          const maxCount = 24; 
          const heightPercent = Math.max((col.count / maxCount) * 100, 15);

          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 h-[200px] justify-end group">
              <span className="text-[10px] font-bold text-[#94A3B8]">{col.value}</span>
              <span className="text-xs font-bold text-white mb-1">{col.count} Deals</span>
              
              <div className="w-full relative flex justify-center items-end h-full">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="w-full max-w-[50px] rounded-t-md relative overflow-hidden"
                  style={{ backgroundColor: `${col.color}20`, borderTop: `2px solid ${col.color}` }}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-full opacity-30" style={{ background: `linear-gradient(to top, ${col.color}, transparent)` }}></div>
                </motion.div>
              </div>

              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider group-hover:text-white transition-colors">{col.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
