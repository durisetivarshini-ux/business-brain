import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { TrendingUp, TrendingDown, Clock, HelpCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const predictionData = [
  { day: 'Now', actual: 450, expected: null, worst: null, best: null },
  { day: '+7d', actual: null, expected: 480, worst: 420, best: 510 },
  { day: '+14d', actual: null, expected: 510, worst: 430, best: 560 },
  { day: '+30d', actual: null, expected: 620, worst: 500, best: 710 },
  { day: '+60d', actual: null, expected: 750, worst: 550, best: 890 },
  { day: '+90d', actual: null, expected: 900, worst: 600, best: 1100 },
];

export function CashFlowPredictor() {
  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <TrendingUp className="text-[#00D4FF]" /> AI Cash Flow Predictor
          </h2>
          <p className="text-xs text-[#94A3B8]">Forecast based on historical cycles, active contracts, and market trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 rounded-md text-xs font-bold">
            94% Confidence
          </span>
          <select className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none">
            <option>Next 90 Days</option>
            <option>Next 30 Days</option>
            <option>Next 12 Months</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Expected 90D Cash</p>
          <p className="text-2xl font-bold text-[#00D4FF]">$<CountUp end={900} />K</p>
        </div>
        <div className="p-4 rounded-xl bg-[#10B981]/5 border border-[#10B981]/10">
          <p className="text-xs font-bold text-[#10B981] uppercase tracking-wider mb-1">Best Case Scenario</p>
          <p className="text-2xl font-bold text-[#10B981]">$<CountUp end={1.1} decimals={1}/>M</p>
        </div>
        <div className="p-4 rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/10">
          <p className="text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-1">Worst Case Scenario</p>
          <p className="text-2xl font-bold text-[#EF4444]">$<CountUp end={600} />K</p>
        </div>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={predictionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }}/>
            
            <Area type="monotone" dataKey="best" stroke="none" fill="#10B981" fillOpacity={0.1} />
            <Area type="monotone" dataKey="worst" stroke="none" fill="#0B1120" fillOpacity={1} />
            
            <Area type="monotone" dataKey="expected" stroke="#00D4FF" strokeWidth={3} fill="none" strokeDasharray="5 5" name="Expected" />
            <Area type="monotone" dataKey="actual" stroke="#5B5FFF" strokeWidth={4} fill="url(#colorRevenue)" name="Actual Cash" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
