import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export function FinanceKPIs() {
  const stats = [
    { title: "Total Revenue",    value: 18.5, icon: <TrendingUp size={20}/>,  color: "#10B981", prefix: "₹", suffix: " Cr", decimals: 1, trend: "+22%",        trendType: "up" },
    { title: "Net Profit",       value: 7.2,  icon: <DollarSign size={20}/>,  color: "#00D4FF", prefix: "₹", suffix: " Cr", decimals: 1, trend: "+15%",        trendType: "up" },
    { title: "Total Expenses",   value: 11.3, icon: <TrendingDown size={20}/>,color: "#F59E0B", prefix: "₹", suffix: " Cr", decimals: 1, trend: "-4%",         trendType: "down" },
    { title: "Cash Balance",     value: 3.8,  icon: <Activity size={20}/>,    color: "#5B5FFF", prefix: "₹", suffix: " Cr", decimals: 1, trend: "Stable",      trendType: "neutral" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5 }}
          className="relative group rounded-2xl overflow-hidden cursor-default"
          style={{ background: 'rgba(11,17,32,0.6)' }}
        >
          {/* Glass border layer */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />

          {/* Hover glow border */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${stat.color}60` }}
          />

          {/* Corner glow */}
          <div
            className="absolute top-0 right-0 w-20 h-20 blur-[35px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 rounded-full"
            style={{ backgroundColor: stat.color }}
          />

          {/* Content */}
          <div className="relative z-10 p-5 flex flex-col h-full">
            <div className="flex justify-between items-start w-full mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 ${
                  stat.trendType === 'up'   ? 'text-[#10B981]' :
                  stat.trendType === 'down' ? 'text-[#F59E0B]' : 'text-[#94A3B8]'
                }`}
              >
                {stat.trendType === 'up'   && '↑ '}
                {stat.trendType === 'down' && '↓ '}
                {stat.trend}
              </span>
            </div>

            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2 leading-tight">
              {stat.title}
            </h3>

            <div className="text-2xl font-display font-bold text-white tracking-tight mt-auto">
              {stat.prefix}
              <CountUp end={stat.value} decimals={stat.decimals} duration={2} separator="," />
              {stat.suffix}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
