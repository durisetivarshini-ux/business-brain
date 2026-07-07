import React, { useEffect, useState, useRef } from 'react';
import { Globe2, Activity, Zap, Cpu, Database, Network, Wifi, Server, TrendingUp, Users, BarChart3, ShieldCheck, ArrowUp, ArrowDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const NODES = [
  { name: 'AI Brain', status: 'Processing', load: 62, color: '#00D4FF', icon: Cpu, angle: -90, desc: 'Neural pattern analysis' },
  { name: 'Finance Core', status: 'Optimal', load: 45, color: '#10B981', icon: Database, angle: 0, desc: 'Ledger sync active' },
  { name: 'Sales Hub', status: 'High Load', load: 88, color: '#EF4444', icon: TrendingUp, angle: 90, desc: 'Pipeline processing' },
  { name: 'HR Systems', status: 'Optimal', load: 34, color: '#8B5CF6', icon: Users, angle: 150, desc: 'Workforce analytics' },
  { name: 'Inventory', status: 'Optimal', load: 30, color: '#F59E0B', icon: Server, angle: 210, desc: 'Stock sync 30s ago' },
  { name: 'Analytics', status: 'Processing', load: 71, color: '#EC4899', icon: BarChart3, angle: 270, desc: 'KPI computation' },
];

const LOG_POOL = [
  '> Neural sync [OK] — 12ms latency',
  '> Finance ledger updated — Δ +$4,521',
  '> New lead added — Acme Corp',
  '> Inventory alert: Component X low',
  '> AI model retrained — accuracy 98.2%',
  '> HR sentiment: Engineering ↓ flagged',
  '> 3 contracts expiring in 14 days',
  '> Revenue delta: +$18,450 today',
  '> CRM sync complete — 1,284 records',
  '> Security scan: No threats detected',
  '> Pipeline velocity: +12% WoW',
  '> Payroll processed — 854 employees',
  '> Anomaly detected: RSK-094 reviewed',
  '> Cloud costs: $8,400 savings found',
  '> Marketing ROI: +34% campaign Alpha',
];

const METRICS = [
  { label: 'Global Employees', value: '854', sub: '+12 this month', color: '#5B5FFF', up: true },
  { label: 'Active Operations', value: '142', sub: 'Across 8 regions', color: '#00D4FF', up: true },
  { label: 'System Health', value: '99.9%', sub: 'All systems nominal', color: '#10B981', up: true },
  { label: 'Data Processed', value: '12.4 TB/s', sub: 'Real-time throughput', color: '#F59E0B', up: false },
  { label: 'Revenue Today', value: '$284K', sub: '+18% vs. yesterday', color: '#EC4899', up: true },
  { label: 'AI Predictions', value: '1,284', sub: 'Generated today', color: '#8B5CF6', up: true },
];

function SVGConnections({ cx, cy, radius }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * radius;
        const ny = cy + Math.sin(rad) * radius;
        return (
          <g key={i}>
            <line
              x1={cx} y1={cy} x2={nx} y2={ny}
              stroke={node.color}
              strokeWidth="1.5"
              strokeDasharray="6 6"
              opacity="0.35"
              filter="url(#glow)"
            />
            <motion.circle
              cx={cx} cy={cy} r="4"
              fill={node.color}
              opacity="0.9"
              animate={{ cx: [cx, nx, cx], cy: [cy, ny, cy] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function DigitalTwinPage() {
  const [logs, setLogs] = useState(LOG_POOL.slice(0, 5));
  const [tick, setTick] = useState(0);
  const [nodeLoads, setNodeLoads] = useState(NODES.map(n => n.load));
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ cx: 340, cy: 240, radius: 200 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDims({ cx: offsetWidth / 2, cy: offsetHeight / 2, radius: Math.min(offsetWidth, offsetHeight) * 0.32 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      const newLog = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      setLogs(prev => [newLog, ...prev].slice(0, 8));
      setNodeLoads(prev => prev.map(l => Math.max(10, Math.min(99, l + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 6)))));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" /> Neural Link Active
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">
            Live Business Digital Twin
          </h1>
          <p className="text-[#94A3B8] font-medium">Real-time simulation and state visualization of all company operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-sm font-bold">
            <ShieldCheck size={16} />
            All Systems Nominal
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5B5FFF]/10 border border-[#5B5FFF]/20 text-[#5B5FFF] text-sm font-bold">
            <Wifi size={16} className="animate-pulse" />
            Live
          </div>
        </div>
      </div>

      {/* Main Twin Visualization */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Center Network Canvas */}
        <GlassCard className="xl:col-span-3 p-0 border-[#00D4FF]/20 bg-[#050816] relative overflow-hidden" style={{ minHeight: 480 }}>
          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />

          {/* Radial glow center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-[#00D4FF]/5 blur-3xl" />
          </div>

          {/* SVG connections */}
          <div ref={containerRef} className="absolute inset-0">
            <SVGConnections cx={dims.cx} cy={dims.cy} radius={dims.radius} />
          </div>

          {/* Central Core */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="absolute w-28 h-28 rounded-full bg-[#00D4FF]/20 blur-2xl"
              />
              <div className="w-24 h-24 rounded-full bg-[#050816] border-2 border-[#00D4FF] flex items-center justify-center shadow-[0_0_60px_rgba(0,212,255,0.5)] z-10 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-full h-full rounded-full border border-[#00D4FF]/20 border-t-[#00D4FF]"
                />
                <Globe2 size={36} className="text-[#00D4FF]" />
              </div>
              <div className="mt-3 text-center z-10">
                <p className="text-white font-bold text-sm tracking-widest uppercase">Business Core</p>
                <motion.p
                  key={tick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#00D4FF] text-[10px] font-bold font-mono mt-1"
                >
                  SYS.ONLINE // 99.9%
                </motion.p>
              </div>
            </div>
          </div>

          {/* Orbital Nodes */}
          {NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const r = dims.radius;
            const nx = dims.cx + Math.cos(rad) * r;
            const ny = dims.cy + Math.sin(rad) * r;
            const load = nodeLoads[i];
            const Icon = node.icon;
            return (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{ position: 'absolute', left: nx, top: ny, transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={{ boxShadow: [`0 0 10px ${node.color}40`, `0 0 25px ${node.color}60`, `0 0 10px ${node.color}40`] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.3 }}
                    className="w-14 h-14 rounded-2xl bg-[#0B1120]/95 backdrop-blur-md border flex items-center justify-center"
                    style={{ borderColor: `${node.color}60` }}
                  >
                    <Icon size={22} style={{ color: node.color }} />
                  </motion.div>
                  <div className="bg-[#0B1120]/95 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-xl text-center min-w-[90px]">
                    <p className="text-white text-[11px] font-bold leading-none mb-1.5">{node.name}</p>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${load}%` }}
                        transition={{ duration: 0.8 }}
                        style={{ backgroundColor: node.color }}
                      />
                    </div>
                    <p className="text-[10px] font-mono" style={{ color: node.color }}>{load}%</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Corner watermark */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-[#00D4FF] text-[10px] font-mono font-bold">LIVE DIGITAL TWIN v2.0</span>
          </div>
        </GlassCard>

        {/* Right Panel: Live Feed */}
        <div className="xl:col-span-1 flex flex-col gap-4">

          {/* Live Terminal */}
          <GlassCard className="flex-1 p-5 border-[#00D4FF]/15 bg-[#050816] overflow-hidden">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-[10px] text-[#00D4FF] font-mono font-bold ml-1 flex items-center gap-1">
                <Zap size={10} /> LIVE FEED
              </span>
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-1.5 h-3 bg-[#00D4FF] ml-auto"
              />
            </div>
            <div className="space-y-2 font-mono text-xs overflow-hidden">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div
                    key={log + i}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1 - i * 0.1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="leading-relaxed"
                    style={{ color: i === 0 ? '#00D4FF' : `rgba(148,163,184,${1 - i * 0.1})` }}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>

          {/* Node Status List */}
          <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60">
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Node Status</p>
            <div className="space-y-2">
              {NODES.map((node, i) => (
                <div key={node.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
                    <span className="text-xs text-white font-medium">{node.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono" style={{ color: node.color }}>{nodeLoads[i]}%</span>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.25 }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: node.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Bottom Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60 hover:bg-white/5 transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider leading-tight">{m.label}</p>
                <div className={`shrink-0 w-5 h-5 rounded flex items-center justify-center ${m.up ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {m.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(135deg, ${m.color}, white)` }}>
                {m.value}
              </p>
              <p className="text-[10px] text-[#94A3B8]">{m.sub}</p>
              {/* Accent bar */}
              <div className="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  style={{ backgroundColor: m.color }}
                />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
