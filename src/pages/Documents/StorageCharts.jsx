import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

export function StorageCharts() {
  const storageData = [
    { name: 'Marketing Assets', value: 450, color: '#7C3AED' },
    { name: 'Financial Records', value: 320, color: '#10B981' },
    { name: 'Sales Contracts', value: 280, color: '#00D4FF' },
    { name: 'HR Documents', value: 150, color: '#EC4899' },
    { name: 'Other', value: 100, color: '#94A3B8' },
  ];

  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-full flex flex-col items-center justify-center relative">
      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider absolute top-6 left-6">Storage Distribution</h3>
      
      <div className="w-full h-[300px] mt-8 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={storageData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {storageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              formatter={(value) => [`${value} GB`, 'Storage']}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-display font-bold text-white">1.8</span>
          <span className="text-sm font-bold text-[#94A3B8]">TB Used</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2 mt-4 px-4">
        {storageData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs font-bold text-[#94A3B8] truncate">{item.name}</span>
          </div>
        ))}
      </div>

    </GlassCard>
  );
}
