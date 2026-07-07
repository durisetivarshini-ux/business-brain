import React from 'react';
import { Leaf, Wind, Sun, Droplets, Battery, Target, Award } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const emissionData = [
  { month: 'Jan', emissions: 120 },
  { month: 'Feb', emissions: 115 },
  { month: 'Mar', emissions: 110 },
  { month: 'Apr', emissions: 95 },
  { month: 'May', emissions: 85 },
  { month: 'Jun', emissions: 82 },
];

export function SustainabilityPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#10B981] to-[#047857] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Leaf size={24} className="text-white" />
            </div>
            Sustainability & ESG
          </h1>
          <p className="text-[#94A3B8] font-medium">Tracking carbon footprint, energy efficiency, and environmental impact.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Award size={16} className="text-[#10B981]"/> ESG Report
          </button>
        </div>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Carbon Footprint" value={82} unit=" tons" trend="-15% YoY" color="#10B981" icon={<Wind />} />
        <MetricCard title="Energy Usage" value={450} unit=" MWh" trend="-8% YoY" color="#F59E0B" icon={<Sun />} />
        <MetricCard title="Waste Recycled" value={94} unit="%" trend="+4% YoY" color="#00D4FF" icon={<Droplets />} />
        <MetricCard title="Sustainability Score" value={9.2} unit="/10" trend="Top 5% Industry" color="#8B5CF6" icon={<Target />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <GlassCard className="xl:col-span-2 p-6 border-white/5 bg-[#0B1120]/60 flex flex-col">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Wind size={16} className="text-[#10B981]"/> CO2 Emissions Trend (YTD)
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emissionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }}/>
                <Line type="monotone" dataKey="emissions" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 6 }} name="CO2 (Tons)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Initiatives & AI Suggestions */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-[#10B981]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Leaf size={16} className="text-[#10B981]"/> AI Green Initiatives
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <p className="text-white text-sm font-bold mb-1 flex justify-between">
                  <span>Server Optimization</span>
                  <span className="text-[#10B981] text-xs font-mono">-120 kWh/mo</span>
                </p>
                <p className="text-[#94A3B8] text-xs">AI recommends consolidating inactive staging environments to reduce cloud energy consumption.</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <p className="text-white text-sm font-bold mb-1 flex justify-between">
                  <span>Paperless Ops</span>
                  <span className="text-[#10B981] text-xs font-mono">-40 kg/mo</span>
                </p>
                <p className="text-[#94A3B8] text-xs">Fully transition HR onboarding to digital signatures.</p>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, trend, color, icon }) {
  return (
    <GlassCard className="p-6 flex flex-col border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ backgroundColor: `${color}20`, color: color }}>
          {trend}
        </span>
      </div>
      <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-3xl font-display font-bold text-white tracking-tight flex items-baseline gap-1">
        <CountUp end={value} decimals={value % 1 !== 0 ? 1 : 0} duration={2} separator="," />
        <span className="text-lg text-white/50">{unit}</span>
      </div>
    </GlassCard>
  );
}
