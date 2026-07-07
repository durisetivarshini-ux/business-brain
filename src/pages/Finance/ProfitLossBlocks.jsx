import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function ProfitLossBlocks() {
  const statement = [
    { label: "Total Revenue", value: "₹18.5 Cr", type: "positive" },
    { label: "Cost of Goods Sold", value: "₹3.2 Cr", type: "negative" },
    { label: "Gross Profit", value: "₹15.3 Cr", type: "neutral", bold: true },
    { label: "Operating Expenses", value: "₹8.1 Cr", type: "negative" },
    { label: "Operating Profit", value: "₹7.2 Cr", type: "positive", bold: true, highlight: true },
  ];

  return (
    <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Profit & Loss (Q3)</h3>
        <span className="text-xs font-bold text-[#5B5FFF] bg-[#5B5FFF]/10 px-2 py-1 rounded-md">YTD 2026</span>
      </div>

      <div className="flex-1 flex flex-col gap-3 justify-center">
        {statement.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${item.highlight ? 'bg-gradient-to-r from-[#5B5FFF]/20 to-[#00D4FF]/10 border border-[#5B5FFF]/30 shadow-[0_0_20px_rgba(91,95,255,0.15)]' : 'bg-white/5 border border-white/5 hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${item.type === 'positive' ? 'bg-[#10B981]/20 text-[#10B981]' : item.type === 'negative' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-white/10 text-white'}`}>
                {item.type === 'positive' ? <ArrowUpRight size={14}/> : item.type === 'negative' ? <ArrowDownRight size={14}/> : <Minus size={14}/>}
              </div>
              <span className={`text-sm ${item.bold ? 'font-bold text-white' : 'font-medium text-[#94A3B8]'}`}>{item.label}</span>
            </div>
            <span className={`text-base font-display tracking-tight ${item.bold ? 'font-bold text-white' : 'font-semibold text-[#F8FAFC]'}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
