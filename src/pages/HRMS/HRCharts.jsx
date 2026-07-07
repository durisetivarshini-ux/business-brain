import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const growthData = [
  { month: 'Jan', headcount: 2150 },
  { month: 'Feb', headcount: 2200 },
  { month: 'Mar', headcount: 2280 },
  { month: 'Apr', headcount: 2350 },
  { month: 'May', headcount: 2420 },
  { month: 'Jun', headcount: 2580 },
];

const retentionData = [
  { dept: 'Eng', retention: 96, attrition: 4 },
  { dept: 'Sales', retention: 82, attrition: 18 },
  { dept: 'Mktg', retention: 88, attrition: 12 },
  { dept: 'HR', retention: 98, attrition: 2 },
];

export function HRCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Employee Growth Area Chart */}
      <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Workforce Growth (H1)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B5FFF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#5B5FFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="headcount" name="Total Employees" stroke="#5B5FFF" strokeWidth={3} fill="url(#colorGrowth)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Retention vs Attrition Bar Chart */}
      <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Retention vs Attrition (%)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={retentionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} stackOffset="expand">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="dept" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(tick) => `${tick * 100}%`} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="retention" name="Retention" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
              <Bar dataKey="attrition" name="Attrition" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
