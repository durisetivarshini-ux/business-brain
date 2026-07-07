import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const revenueData = [
  { month: 'Jan', revenue: 2.1, target: 2.0 },
  { month: 'Feb', revenue: 2.8, target: 2.5 },
  { month: 'Mar', revenue: 3.4, target: 3.0 },
  { month: 'Apr', revenue: 3.2, target: 3.5 },
  { month: 'May', revenue: 4.5, target: 4.0 },
  { month: 'Jun', revenue: 5.4, target: 4.5 },
];

const funnelData = [
  { stage: 'New Leads', count: 1240 },
  { stage: 'Qualified', count: 850 },
  { stage: 'Proposal', count: 420 },
  { stage: 'Negotiation', count: 180 },
  { stage: 'Won', count: 85 },
];

export function CRMCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Revenue Area Chart */}
      <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Revenue vs Target (Cr)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
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
              <Area type="monotone" dataKey="target" stroke="#5B5FFF" strokeWidth={2} fill="url(#colorTarget)" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="revenue" stroke="#00D4FF" strokeWidth={3} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Sales Funnel Bar Chart */}
      <GlassCard className="p-6 border-[#7C3AED]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Sales Funnel</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="stage" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === funnelData.length - 1 ? '#10B981' : '#7C3AED'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
