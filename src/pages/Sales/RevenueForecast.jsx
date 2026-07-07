import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { TrendingUp, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const forecastData = [
  { month: 'Jul', actual: 420, forecast: null },
  { month: 'Aug', actual: 480, forecast: null },
  { month: 'Sep', actual: 510, forecast: null },
  { month: 'Oct', actual: null, forecast: 550 },
  { month: 'Nov', actual: null, forecast: 620 },
  { month: 'Dec', actual: null, forecast: 710 },
];

export function RevenueForecast() {
  return (
    <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60 flex flex-col mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <TrendingUp className="text-[#10B981]" /> AI Revenue Forecast
          </h2>
          <p className="text-xs text-[#94A3B8]">Machine learning prediction based on pipeline velocity and historical close rates.</p>
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-white flex items-center gap-2">
          <Zap size={14} className="text-[#00D4FF]"/> Confidence: High (88%)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
            <Target size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Q4 Projected Revenue</p>
            <p className="text-2xl font-bold text-white">$<CountUp end={1.88} decimals={2} />M</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="w-12 h-12 rounded-full bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Projected Growth vs Q3</p>
            <p className="text-2xl font-bold text-[#10B981]">+<CountUp end={24.5} decimals={1} />%</p>
          </div>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }}/>
            
            <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Actual" />
            <Line type="monotone" dataKey="forecast" stroke="#5B5FFF" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} name="AI Forecast" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
