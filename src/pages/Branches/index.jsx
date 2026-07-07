import React, { useState } from 'react';
import { Globe2, MapPin, Users, DollarSign, Box, Activity, ChevronRight, TrendingUp, Wifi } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const branches = [
  { id: 'NY', name: 'New York HQ', region: 'North America', revenue: 4.2, employees: 340, inventory: 89, status: 'Optimal', color: '#10B981', icon: '🗽', revTrend: '+18%', orders: 1240 },
  { id: 'LDN', name: 'London Hub', region: 'Europe', revenue: 2.8, employees: 185, inventory: 92, status: 'Optimal', color: '#10B981', icon: '🏛', revTrend: '+12%', orders: 820 },
  { id: 'SGP', name: 'Singapore', region: 'Asia Pacific', revenue: 3.1, employees: 210, inventory: 45, status: 'Warning', color: '#F59E0B', icon: '🌏', revTrend: '+8%', orders: 950 },
  { id: 'TKY', name: 'Tokyo Operations', region: 'Asia Pacific', revenue: 1.9, employees: 120, inventory: 98, status: 'Optimal', color: '#10B981', icon: '🗼', revTrend: '+24%', orders: 610 },
];

const comparisonData = [
  { branch: 'New York', revenue: 4.2, employees: 340 },
  { branch: 'London', revenue: 2.8, employees: 185 },
  { branch: 'Singapore', revenue: 3.1, employees: 210 },
  { branch: 'Tokyo', revenue: 1.9, employees: 120 },
];

// SVG World Map Approximate positions (% based for simple container)
const mapPositions = {
  NY:  { left: '22%', top: '38%' },
  LDN: { left: '44%', top: '28%' },
  SGP: { left: '74%', top: '58%' },
  TKY: { left: '82%', top: '35%' },
};

export function BranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [hoveredBranch, setHoveredBranch] = useState(null);

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-3">
            <Wifi size={12} className="animate-pulse" /> 4 Locations Live
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D4FF] to-[#5B5FFF] flex items-center justify-center">
              <Globe2 size={22} className="text-white" />
            </div>
            Global Command Center
          </h1>
          <p className="text-[#94A3B8] font-medium">Real-time operations, logistics, and performance across all branches.</p>
        </div>
        <button className="self-start md:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:scale-[1.02] transition-transform">
          + Add Branch
        </button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Global Revenue', value: 12.0, prefix: '$', suffix: 'M', color: '#10B981' },
          { label: 'Total Employees', value: 855, prefix: '', suffix: '', color: '#00D4FF' },
          { label: 'Active Orders', value: 3620, prefix: '', suffix: '', color: '#5B5FFF' },
          { label: 'Avg Performance', value: 92, prefix: '', suffix: '%', color: '#EC4899' },
        ].map(kpi => (
          <GlassCard key={kpi.label} className="p-5 border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 blur-[30px] opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: kpi.color }} />
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">{kpi.label}</p>
            <p className="text-3xl font-display font-bold text-white" style={{ color: kpi.color }}>
              {kpi.prefix}<CountUp end={kpi.value} decimals={kpi.value % 1 !== 0 ? 1 : 0} duration={2}/>{kpi.suffix}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: Branch selector cards */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest px-1">Active Locations</h3>
          {branches.map(branch => (
            <motion.div
              key={branch.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedBranch(branch)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                selectedBranch.id === branch.id
                  ? 'border-[#5B5FFF] bg-gradient-to-r from-[#5B5FFF]/15 to-transparent shadow-[0_0_20px_rgba(91,95,255,0.2)]'
                  : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/15'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{branch.icon}</span>
                  <div>
                    <h4 className="font-bold text-white text-sm leading-tight">{branch.name}</h4>
                    <p className="text-xs text-[#94A3B8]">{branch.region}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: branch.color }} />
                    <span className="text-xs font-bold" style={{ color: branch.color }}>{branch.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-white font-bold text-lg">
                  <DollarSign size={16} className="text-[#10B981]"/>{branch.revenue}M
                </div>
                <div className="flex items-center gap-1 text-xs text-[#10B981] font-bold bg-[#10B981]/10 px-2 py-1 rounded-md">
                  <TrendingUp size={12}/> {branch.revTrend}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Detail + Map */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Interactive SVG World Map */}
          <GlassCard className="w-full h-[320px] border-[#5B5FFF]/20 bg-[#050816] relative overflow-hidden p-0">
            {/* Dark grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
            {/* Globe graphic hint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[600px] h-[600px] rounded-full border border-white/[0.03] absolute" />
              <div className="w-[400px] h-[400px] rounded-full border border-white/[0.03] absolute" />
            </div>
            
            {/* Continent Silhouettes (Simplified SVG) */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="xMidYMid slice">
              {/* North America */}
              <path d="M80,80 L200,60 L250,120 L230,200 L180,240 L120,220 L80,160 Z" fill="#94A3B8"/>
              {/* South America */}
              <path d="M160,260 L220,250 L240,360 L200,440 L150,420 L130,340 Z" fill="#94A3B8"/>
              {/* Europe */}
              <path d="M400,70 L500,60 L520,120 L480,150 L420,140 L390,110 Z" fill="#94A3B8"/>
              {/* Africa */}
              <path d="M420,160 L500,150 L530,280 L490,380 L440,360 L400,260 Z" fill="#94A3B8"/>
              {/* Asia */}
              <path d="M520,50 L800,40 L840,160 L780,220 L680,240 L580,200 L520,140 Z" fill="#94A3B8"/>
              {/* Australia */}
              <path d="M740,310 L840,300 L860,380 L800,400 L720,380 Z" fill="#94A3B8"/>
            </svg>

            {/* Connection Lines between nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              {branches.map((b1, i) =>
                branches.slice(i + 1).map(b2 => {
                  const pos1 = mapPositions[b1.id];
                  const pos2 = mapPositions[b2.id];
                  const x1 = parseFloat(pos1.left);
                  const y1 = parseFloat(pos1.top);
                  const x2 = parseFloat(pos2.left);
                  const y2 = parseFloat(pos2.top);
                  return (
                    <line
                      key={`${b1.id}-${b2.id}`}
                      x1={`${x1}%`} y1={`${y1}%`}
                      x2={`${x2}%`} y2={`${y2}%`}
                      stroke="#5B5FFF" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4"
                    />
                  );
                })
              )}
            </svg>

            {/* Branch Nodes */}
            {branches.map(branch => (
              <div
                key={branch.id}
                className="absolute cursor-pointer group z-10"
                style={{ left: mapPositions[branch.id].left, top: mapPositions[branch.id].top, transform: 'translate(-50%, -50%)' }}
                onClick={() => setSelectedBranch(branch)}
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
              >
                {/* Ping animation */}
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: branch.color }} />
                  <span className={`relative inline-flex rounded-full h-5 w-5 border-2 transition-transform ${selectedBranch.id === branch.id ? 'scale-125' : ''}`}
                    style={{ backgroundColor: branch.color, borderColor: 'rgba(255,255,255,0.3)' }} />
                </span>
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredBranch === branch.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0B1120] border border-white/20 rounded-xl px-3 py-2 shadow-xl pointer-events-none"
                    >
                      <p className="text-white font-bold text-xs">{branch.name}</p>
                      <p className="text-[#10B981] text-xs font-bold">${branch.revenue}M · {branch.employees} staff</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Map Label */}
            <div className="absolute top-4 left-4">
              <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                <Globe2 size={14} className="text-[#00D4FF]" /> Real-Time Operations Map
              </p>
            </div>
          </GlassCard>

          {/* Branch Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBranch.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl">{selectedBranch.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedBranch.name}</h2>
                        <p className="text-sm text-[#94A3B8]">
                          {selectedBranch.region} · Status: <span style={{ color: selectedBranch.color }} className="font-bold">{selectedBranch.status}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5 mt-5">
                      <div>
                        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1">
                          <DollarSign size={12}/> Monthly Revenue
                        </p>
                        <p className="text-3xl font-display font-bold text-white">
                          ${selectedBranch.revenue}<span className="text-xl text-white/40">M</span>
                        </p>
                        <p className="text-xs font-bold text-[#10B981] mt-1">{selectedBranch.revTrend} vs last month</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Users size={12}/> Active Employees
                        </p>
                        <p className="text-3xl font-display font-bold text-white"><CountUp end={selectedBranch.employees} duration={1}/></p>
                        <p className="text-xs text-[#94A3B8] mt-1">Full-time headcount</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-64 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                          <Box size={12}/> Inventory Capacity
                        </p>
                        <p className="text-sm font-bold text-white">{selectedBranch.inventory}%</p>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          key={selectedBranch.id}
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedBranch.inventory}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedBranch.inventory < 50 ? '#F59E0B' : '#10B981' }}
                        />
                      </div>
                      {selectedBranch.inventory < 50 && (
                        <p className="text-[10px] text-[#F59E0B] mt-1 font-bold">⚠ Resupply recommended within 48h</p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Activity size={12}/> Active Orders
                      </p>
                      <p className="text-2xl font-bold text-white"><CountUp end={selectedBranch.orders} duration={1}/></p>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF]/20 to-[#00D4FF]/20 border border-[#5B5FFF]/30 text-white text-sm font-bold hover:from-[#5B5FFF]/30 hover:to-[#00D4FF]/30 transition-all flex items-center justify-center gap-2 mt-auto">
                      Full Branch Dashboard <ChevronRight size={16}/>
                    </button>
                  </div>

                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Performance Comparison Chart */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-5">Revenue by Branch (Monthly)</h3>
            <div className="w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} barSize={32} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="branch" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    formatter={(v) => [`$${v}M`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="url(#branchGrad)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="branchGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#5B5FFF" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
