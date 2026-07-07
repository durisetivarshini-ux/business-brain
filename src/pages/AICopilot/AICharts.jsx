import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4780 },
  { name: 'May', revenue: 5890 },
  { name: 'Jun', revenue: 6390 },
  { name: 'Jul', revenue: 7490 },
];

export function AICharts({ type }) {
  if (type === 'revenue') {
    return (
      <div className="w-full h-[250px] mt-4 bg-[#0B1120]/50 rounded-xl p-4 border border-[#5B5FFF]/20">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevAI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5B5FFF" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#5B5FFF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} dy={5} />
            <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#5B5FFF" strokeWidth={2} fill="url(#colorRevAI)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
}
