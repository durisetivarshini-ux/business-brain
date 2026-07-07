import React from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const revenueData = [
  { month: 'Jan', revenue: 12.5, profit: 4.2 },
  { month: 'Feb', revenue: 14.2, profit: 5.1 },
  { month: 'Mar', revenue: 13.8, profit: 4.8 },
  { month: 'Apr', revenue: 16.5, profit: 6.5 },
  { month: 'May', revenue: 19.2, profit: 7.8 },
  { month: 'Jun', revenue: 22.4, profit: 9.2 },
];

export function RevenueAnalytics() {
  return (
    <div className="grid grid-cols-1 gap-8 h-full">
      <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Revenue vs Profit (Cr)</h3>
          <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-md">Q1-Q2 2026</span>
        </div>
        
        <div className="w-full h-[300px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#00D4FF" strokeWidth={2} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#10B981" strokeWidth={3} fill="url(#colorProf)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
