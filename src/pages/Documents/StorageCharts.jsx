import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';
import { TrendingUp, HardDrive, AlertCircle } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050816]/95 border border-white/10 px-3 py-2 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-white font-bold text-xs mb-1">{payload[0].name}</p>
        <p className="text-[#94A3B8] text-xs">{payload[0].value} GB</p>
      </div>
    );
  }
  return null;
};

export function StorageCharts() {
  const storageData = [
    { name: 'Marketing Assets', value: 450, color: '#7C3AED' },
    { name: 'Financial Records', value: 320, color: '#10B981' },
    { name: 'Sales Contracts', value: 280, color: '#00D4FF' },
    { name: 'HR Documents', value: 150, color: '#EC4899' },
    { name: 'Other', value: 100, color: '#475569' },
  ];

  const stats = [
    { label: 'Growth Rate', value: '+12%', icon: <TrendingUp size={14} />, color: '#10B981' },
    { label: 'Total Capacity', value: '5.0 TB', icon: <HardDrive size={14} />, color: '#00D4FF' },
    { label: 'Nearing Limit', value: '2 Folders', icon: <AlertCircle size={14} />, color: '#F59E0B' },
  ];

  return (
    <GlassCard className="p-6 border-white/5 bg-gradient-to-b from-[#0B1120]/80 to-[#050816]/90 h-full flex flex-col relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#7C3AED]/5 blur-[60px] rounded-full pointer-events-none" />

      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 relative z-10">Storage Distribution</h3>

      {/* Donut Chart */}
      <div className="w-full h-[220px] relative flex items-center justify-center z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={storageData}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {storageData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ filter: `drop-shadow(0 0 6px ${entry.color}70)` }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-display font-bold text-white leading-none">1.8</span>
          <span className="text-xs font-bold text-[#94A3B8] mt-1">TB Used</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full grid grid-cols-2 gap-y-2 gap-x-3 mt-4 px-2 z-10 relative">
        {storageData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}80` }}></div>
            <span className="text-xs font-medium text-[#94A3B8] truncate">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Usage Bar */}
      <div className="mt-6 px-2 z-10 relative">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-[#94A3B8] font-medium">Used: 1.8 TB</span>
          <span className="text-[#94A3B8] font-medium">Total: 5.0 TB</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
          <div className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#00D4FF] to-[#10B981]" style={{ width: '36%' }} />
        </div>
        <p className="text-[10px] text-[#94A3B8] mt-1 text-right">36% capacity used</p>
      </div>

      {/* Quick Stats */}
      <div className="mt-5 grid grid-cols-3 gap-2 z-10 relative">
        {stats.map((s, i) => (
          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center hover:bg-white/10 transition-colors">
            <div className="flex justify-center mb-1" style={{ color: s.color }}>{s.icon}</div>
            <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
