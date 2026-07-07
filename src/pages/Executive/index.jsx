import React from 'react';
import { Target, AlertTriangle, Lightbulb, Globe2, Wallet, CheckCircle, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const financialData = [
  { month: 'Jan', revenue: 4000, target: 3800 },
  { month: 'Feb', revenue: 4500, target: 4000 },
  { month: 'Mar', revenue: 5200, target: 4500 },
  { month: 'Apr', revenue: 4800, target: 4800 },
  { month: 'May', revenue: 6100, target: 5200 },
  { month: 'Jun', revenue: 6800, target: 5800 },
];

export function ExecutivePage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/30 text-[#EC4899] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse"></span> Live Sync
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            Executive Decision Center
          </h1>
          <p className="text-[#94A3B8] font-medium">CEO-level strategic overview and priority actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#5B5FFF] text-white text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-transform hover:scale-[1.02]">
            Generate Board Report
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Revenue" value={14.2} prefix="$" suffix="M" desc="+18% YTD" color="#10B981" icon={<Wallet />} />
        <KPICard title="Operating Margin" value={24} suffix="%" desc="Target: 22%" color="#00D4FF" icon={<TrendingUp />} />
        <KPICard title="Customer Growth" value={18.5} suffix="%" desc="vs Q2" color="#5B5FFF" icon={<Globe2 />} />
        <KPICard title="Pending Decisions" value={4} color="#EC4899" desc="Requires Attention" icon={<CheckCircle />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <GlassCard className="xl:col-span-2 p-6 border-white/5 bg-[#0B1120]/60 flex flex-col">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Financial Trajectory (Actual vs Target)</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }}/>
                <Area type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="5 5" fill="none" strokeWidth={2} name="Target" />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fill="url(#colorRevenue)" name="Actual Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Priority Actions */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-[#EC4899]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#EC4899]"/> Priority Decisions
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <p className="text-white text-sm font-bold mb-1">M&A Opportunity: TechNova</p>
                <p className="text-[#94A3B8] text-xs mb-3">Strategic acquisition alignment score: 88%. Board requires CEO approval to proceed to term sheet.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-[#10B981] text-white text-xs font-bold rounded-lg hover:bg-[#059669]">Approve</button>
                  <button className="flex-1 py-1.5 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20">Review</button>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <p className="text-white text-sm font-bold mb-1">Approve Q4 Marketing Budget</p>
                <p className="text-[#94A3B8] text-xs mb-3">CMO requesting 15% increase for APAC expansion.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-[#10B981] text-white text-xs font-bold rounded-lg hover:bg-[#059669]">Approve</button>
                  <button className="flex-1 py-1.5 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20">Review</button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb size={16} className="text-[#00D4FF]"/> Strategic Insights
            </h3>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li className="flex items-start gap-2">
                <span className="text-[#00D4FF]">•</span>
                <span>AI predicts a <strong className="text-white">12% growth</strong> in the EMEA market next quarter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00D4FF]">•</span>
                <span>Supply chain risk elevated in Singapore. Recommend secondary suppliers.</span>
              </li>
            </ul>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}

function KPICard({ title, value, prefix = "", suffix = "", desc, color, icon }) {
  return (
    <GlassCard hover glowColor={color} className="p-6 flex flex-col border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: color }} />
      <div className="flex justify-between items-center w-full mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
        </div>
      </div>
      <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-3xl font-display font-bold text-white tracking-tight flex items-baseline gap-1">
        {prefix}<CountUp end={value} decimals={value % 1 !== 0 ? 1 : 0} duration={2} separator="," />{suffix}
      </div>
      {desc && <p className="text-xs text-[#94A3B8] mt-2 font-medium">{desc}</p>}
    </GlassCard>
  );
}
