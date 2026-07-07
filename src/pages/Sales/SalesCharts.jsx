import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const revenueData = [
  { month: 'Jan', actual: 4.2, target: 4.0 },
  { month: 'Feb', actual: 4.8, target: 4.5 },
  { month: 'Mar', actual: 5.1, target: 5.0 },
  { month: 'Apr', actual: 4.5, target: 5.2 },
  { month: 'May', actual: 6.2, target: 5.8 },
  { month: 'Jun', actual: 7.4, target: 6.5 },
];

export function SalesCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      
      {/* Revenue Performance Area Chart */}
      <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60 lg:col-span-2">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Revenue vs Target (Cr)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B5FFF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5B5FFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="target" name="Target Revenue" stroke="#5B5FFF" strokeDasharray="5 5" strokeWidth={2} fill="url(#colorTarget)" />
              <Area type="monotone" dataKey="actual" name="Actual Revenue" stroke="#10B981" strokeWidth={3} fill="url(#colorActual)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
