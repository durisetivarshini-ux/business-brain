import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const valueData = [
  { month: 'Jan', value: 18.2 },
  { month: 'Feb', value: 19.5 },
  { month: 'Mar', value: 21.0 },
  { month: 'Apr', value: 20.5 },
  { month: 'May', value: 23.2 },
  { month: 'Jun', value: 24.8 },
];

const demandData = [
  { week: 'W1', actual: 450, forecast: 460 },
  { week: 'W2', actual: 520, forecast: 510 },
  { week: 'W3', actual: 480, forecast: 500 },
  { week: 'W4', actual: 590, forecast: 580 },
  { week: 'W5', actual: null, forecast: 620 }, // Future prediction
  { week: 'W6', actual: null, forecast: 650 },
];

export function InventoryCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Inventory Value Area Chart */}
      <GlassCard className="p-6 border-[#EC4899]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Total Inventory Value (Cr)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={valueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
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
              <Area type="monotone" dataKey="value" stroke="#EC4899" strokeWidth={3} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* AI Demand Forecast Line Chart */}
      <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">AI Demand Forecast (Units)</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="actual" name="Actual Demand" stroke="#00D4FF" strokeWidth={3} dot={{ r: 4, fill: '#00D4FF' }} />
              <Line type="monotone" dataKey="forecast" name="AI Forecast" stroke="#7C3AED" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
