import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const roiData = [
  { month: 'Jan', spend: 1.2, return: 4.5 },
  { month: 'Feb', spend: 1.5, return: 5.2 },
  { month: 'Mar', spend: 1.8, return: 6.8 },
  { month: 'Apr', spend: 1.4, return: 5.9 },
  { month: 'May', spend: 2.0, return: 8.4 },
  { month: 'Jun', spend: 2.2, return: 9.6 },
];

export function MarketingCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      
      {/* Campaign ROI Area Chart */}
      <GlassCard className="p-6 border-[#EC4899]/20 bg-[#0B1120]/60 lg:col-span-2">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Marketing ROI (Spend vs Return in Cr)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={roiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="return" name="Revenue Generated" stroke="#10B981" strokeWidth={3} fill="url(#colorReturn)" />
              <Area type="monotone" dataKey="spend" name="Ad Spend" stroke="#EC4899" strokeWidth={2} fill="url(#colorSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
