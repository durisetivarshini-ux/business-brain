import React from 'react';
import { Lightbulb, TrendingUp, Package, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export function PromptSuggestions({ onSelect }) {
  const suggestions = [
    { icon: <TrendingUp size={16} className="text-[#00D4FF]" />, text: "Analyze Q3 Revenue drivers" },
    { icon: <Package size={16} className="text-[#5B5FFF]" />, text: "Check inventory levels for Product A" },
    { icon: <Lightbulb size={16} className="text-[#F59E0B]" />, text: "Draft marketing strategy for Q4" },
    { icon: <ShieldAlert size={16} className="text-[#EC4899]" />, text: "Any pending compliance issues?" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {suggestions.map((s, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(s.text)}
          className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
            {s.icon}
          </div>
          <span className="text-sm font-medium text-[#94A3B8] group-hover:text-white transition-colors">
            "{s.text}"
          </span>
        </motion.button>
      ))}
    </div>
  );
}
