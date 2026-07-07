import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const supplyChainData = [
  { month: 'Jan', procurement: 120, logistics: 80 },
  { month: 'Feb', procurement: 135, logistics: 85 },
  { month: 'Mar', procurement: 110, logistics: 90 },
  { month: 'Apr', procurement: 150, logistics: 95 },
  { month: 'May', procurement: 140, logistics: 85 },
  { month: 'Jun', procurement: 170, logistics: 110 },
];

const vendorData = [
  { name: 'AlphaTech', rating: 98 },
  { name: 'Global Supply', rating: 92 },
  { name: 'FastLogistics', rating: 85 },
  { name: 'Nexus Parts', rating: 78 },
];

export function ERPCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Supply Chain Costs Area Chart */}
      <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Procurement vs Logistics Costs ($K)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={supplyChainData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProcure" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B5FFF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#5B5FFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLogistics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.5}/>
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
              <Area type="monotone" dataKey="procurement" stroke="#5B5FFF" strokeWidth={2} fill="url(#colorProcure)" />
              <Area type="monotone" dataKey="logistics" stroke="#10B981" strokeWidth={2} fill="url(#colorLogistics)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Vendor Performance Bar Chart */}
      <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Top Vendors by Reliability Score</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="rating" radius={[4, 4, 0, 0]}>
                {vendorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.rating > 90 ? '#00D4FF' : '#5B5FFF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
