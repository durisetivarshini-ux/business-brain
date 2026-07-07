import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const cashFlowData = [
  { month: 'Jan', in: 4.2, out: 2.8 },
  { month: 'Feb', in: 4.8, out: 3.1 },
  { month: 'Mar', in: 5.1, out: 3.5 },
  { month: 'Apr', in: 4.5, out: 3.2 },
  { month: 'May', in: 6.2, out: 4.1 },
  { month: 'Jun', in: 7.4, out: 4.5 },
];

const budgetData = [
  { dept: 'R&D', allocated: 2.5, used: 2.1 },
  { dept: 'Sales', allocated: 3.0, used: 2.8 },
  { dept: 'Marketing', allocated: 1.8, used: 1.9 },
  { dept: 'Ops', allocated: 4.0, used: 3.5 },
];

export function FinanceCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Cash Flow Area Chart */}
      <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Cash Flow Trend (Cr)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="in" name="Cash In" stroke="#10B981" strokeWidth={2} fill="url(#colorIn)" />
              <Area type="monotone" dataKey="out" name="Cash Out" stroke="#F59E0B" strokeWidth={2} fill="url(#colorOut)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Budget Utilization Bar Chart */}
      <GlassCard className="p-6 border-[#7C3AED]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Budget Utilization</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="dept" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="allocated" name="Allocated" fill="#5B5FFF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="used" name="Used" radius={[4, 4, 0, 0]}>
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.used > entry.allocated ? '#EC4899' : '#00D4FF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
