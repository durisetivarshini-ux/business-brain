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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050816]/90 border border-white/10 p-3 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <p className="text-white font-bold text-sm mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
            <span className="text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">{p.name || p.dataKey}</span>
            <span className="text-white font-bold text-sm ml-auto">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CRMCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Revenue Area Chart */}
      <GlassCard className="p-6 border-[#00D4FF]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 shadow-[0_0_30px_rgba(0,212,255,0.05)] relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-xs font-bold text-[#00D4FF] uppercase tracking-wider">Revenue vs Target (Cr)</h3>
          <span className="text-xs font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/10">+22% YoY</span>
        </div>
        <div className="w-full h-[300px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B5FFF" stopOpacity={0.2}/>
                  <stop offset="100%" stopColor="#5B5FFF" stopOpacity={0}/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} dy={10} fontFamily="Inter, sans-serif" fontWeight={600} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} fontFamily="Inter, sans-serif" fontWeight={600} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="target" stroke="#5B5FFF" strokeWidth={2} fill="url(#colorTarget)" strokeDasharray="5 5" name="Target" />
              <Area type="monotone" dataKey="revenue" stroke="#00D4FF" strokeWidth={4} fill="url(#colorRevenue)" filter="url(#glow)" name="Actual Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Sales Funnel Bar Chart */}
      <GlassCard className="p-6 border-[#7C3AED]/30 bg-gradient-to-bl from-[#0B1120]/90 to-[#050816]/90 shadow-[0_0_30px_rgba(124,58,237,0.05)] relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">Sales Funnel</h3>
          <span className="text-xs font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/10">Avg Value: ₹1.2L</span>
        </div>
        <div className="w-full h-[300px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="wonGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#34D399" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
              <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} fontFamily="Inter, sans-serif" fontWeight={600} />
              <YAxis dataKey="stage" type="category" stroke="#E2E8F0" fontSize={12} tickLine={false} axisLine={false} dx={-10} fontFamily="Inter, sans-serif" fontWeight={600} width={90} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={28} name="Deals">
                {funnelData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === funnelData.length - 1 ? 'url(#wonGradient)' : 'url(#barGradient)'}
                    style={{ filter: `drop-shadow(0 0 8px ${index === funnelData.length - 1 ? 'rgba(16,185,129,0.5)' : 'rgba(124,58,237,0.3)'})` }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
