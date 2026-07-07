import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';

export function HeroStats() {
  const stats = [
    { value: 50, suffix: "K+", label: "Businesses" },
    { value: 99.98, suffix: "%", label: "Accuracy", decimals: 2 },
    { value: 40, suffix: "%", label: "Cost Reduction" },
    { value: 5, suffix: "x", label: "Faster Decisions" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10"
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col">
          <div className="text-3xl font-display font-bold text-white mb-1">
            <CountUp 
              end={stat.value} 
              decimals={stat.decimals || 0}
              duration={2.5} 
              separator="," 
              enableScrollSpy 
              scrollSpyOnce
            />
            <span className="text-[#00D4FF]">{stat.suffix}</span>
          </div>
          <div className="text-sm text-[#94A3B8] font-medium uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}
