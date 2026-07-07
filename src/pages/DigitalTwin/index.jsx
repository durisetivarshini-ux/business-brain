import React, { useEffect, useState, useRef } from 'react';
import { Globe2, Zap, Cpu, Database, TrendingUp, Users, BarChart3, Server, ShieldCheck, Wifi, ArrowUpRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NODES = [
  { name: 'AI Brain',     icon: Cpu,       color: '#00D4FF', glow: '#00D4FF', angle: -90,  load: 62, status: 'Processing' },
  { name: 'Finance Core', icon: Database,   color: '#10B981', glow: '#10B981', angle: -30,  load: 45, status: 'Optimal' },
  { name: 'Sales Hub',    icon: TrendingUp, color: '#F97316', glow: '#EF4444', angle:  30,  load: 88, status: 'High Load' },
  { name: 'Analytics',    icon: BarChart3,  color: '#EC4899', glow: '#EC4899', angle:  90,  load: 71, status: 'Processing' },
  { name: 'HR Systems',   icon: Users,      color: '#8B5CF6', glow: '#8B5CF6', angle: 150,  load: 34, status: 'Optimal' },
  { name: 'Inventory',    icon: Server,     color: '#F59E0B', glow: '#F59E0B', angle: 210,  load: 30, status: 'Optimal' },
];

const LOG_LINES = [
  { text: '> Neural sync [OK] — 12ms latency',          color: '#00D4FF' },
  { text: '> Finance ledger updated — Δ +$4,521',        color: '#10B981' },
  { text: '> New lead added — Acme Corp',                color: '#8B5CF6' },
  { text: '> Inventory alert: Component X low',          color: '#F59E0B' },
  { text: '> AI model retrained — accuracy 98.2%',       color: '#00D4FF' },
  { text: '> HR sentiment: Engineering ↓ flagged',       color: '#EC4899' },
  { text: '> 3 contracts expiring in 14 days',           color: '#F97316' },
  { text: '> Revenue delta: +$18,450 today',             color: '#10B981' },
  { text: '> CRM sync complete — 1,284 records',         color: '#8B5CF6' },
  { text: '> Security scan: No threats detected',        color: '#10B981' },
  { text: '> Pipeline velocity: +12% WoW',              color: '#00D4FF' },
  { text: '> Payroll processed — 854 employees',         color: '#10B981' },
  { text: '> Cloud costs: $8,400 savings found',         color: '#F59E0B' },
  { text: '> Marketing ROI: +34% campaign Alpha',        color: '#EC4899' },
];

const KPIS = [
  { label: 'Employees',   value: '854',     change: '+12',   color: '#5B5FFF',  icon: Users },
  { label: 'Operations',  value: '142',     change: '+4',    color: '#00D4FF',  icon: Activity },
  { label: 'Health',      value: '99.9%',   change: '↑',     color: '#10B981',  icon: ShieldCheck },
  { label: 'Revenue',     value: '$284K',   change: '+18%',  color: '#EC4899',  icon: TrendingUp },
  { label: 'AI Tasks',    value: '1,284',   change: '+202',  color: '#8B5CF6',  icon: Cpu },
  { label: 'Data Rate',   value: '12.4TB/s',change: '→',     color: '#F59E0B',  icon: Database },
];

export function DigitalTwinPage() {
  const [loads, setLoads]           = useState(NODES.map(n => n.load));
  const [logs, setLogs]             = useState(LOG_LINES.slice(0, 6));
  const [tick, setTick]             = useState(0);
  const [activeNode, setActiveNode] = useState(null);
  const svgRef                      = useRef(null);
  const [svgSize, setSvgSize]       = useState({ w: 700, h: 480 });

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSvgSize({ w: width, h: height });
    });
    if (svgRef.current) obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      setLoads(prev => prev.map(l => Math.max(10, Math.min(99, l + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5)))));
      const line = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)];
      setLogs(prev => [line, ...prev].slice(0, 6));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const cx = svgSize.w / 2;
  const cy = svgSize.h / 2;
  const R  = Math.min(svgSize.w, svgSize.h) * 0.33;

  const nodePos = NODES.map(n => {
    const rad = (n.angle * Math.PI) / 180;
    return { x: cx + Math.cos(rad) * R, y: cy + Math.sin(rad) * R };
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/15 border border-[#00D4FF]/30 text-[#00D4FF] text-[11px] font-bold uppercase tracking-widest mb-3"
          >
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-2 h-2 rounded-full bg-[#00D4FF]" />
            Neural Link Active
          </motion.span>
          <h1 className="font-display text-4xl font-black text-white tracking-tight mb-1">
            Live Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#5B5FFF] to-[#EC4899]">Digital Twin</span>
          </h1>
          <p className="text-[#94A3B8] text-sm">Real-time simulation and state visualization of all company operations.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981] text-sm font-bold">
            <ShieldCheck size={15} /> All Systems Nominal
          </div>
          <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5B5FFF]/10 border border-[#5B5FFF]/25 text-[#5B5FFF] text-sm font-bold">
            <Wifi size={15} /> Live
          </motion.div>
        </div>
      </div>

      {/* ── Main Layout ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5" style={{ minHeight: 520 }}>

        {/* ── Network Canvas ──────────────────────────────────────── */}
        <div className="xl:col-span-2 relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, #0d1340 0%, #050816 70%)' }}>

          {/* Aurora blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[20%] w-[40%] h-[40%] bg-[#5B5FFF]/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[10%] w-[35%] h-[35%] bg-[#00D4FF]/15 blur-[90px] rounded-full" />
            <div className="absolute top-[30%] left-[-5%] w-[25%] h-[25%] bg-[#EC4899]/15 blur-[80px] rounded-full" />
          </div>

          {/* Hex-dot grid */}
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          {/* SVG canvas */}
          <div ref={svgRef} className="absolute inset-0">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                {NODES.map((n, i) => (
                  <radialGradient key={i} id={`ngrad${i}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={n.glow} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={n.glow} stopOpacity="0" />
                  </radialGradient>
                ))}
                <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#5B5FFF" stopOpacity="0" />
                </radialGradient>
                <filter id="glow2" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Center glow */}
              <circle cx={cx} cy={cy} r={R * 0.6} fill="url(#centerGrad)" />

              {/* Orbit ring */}
              <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="6 10" />

              {/* Connection lines */}
              {NODES.map((n, i) => (
                <line
                  key={i}
                  x1={cx} y1={cy}
                  x2={nodePos[i].x} y2={nodePos[i].y}
                  stroke={n.color}
                  strokeWidth={activeNode === i ? 2 : 1}
                  strokeDasharray="5 7"
                  opacity={activeNode === null ? 0.3 : activeNode === i ? 0.8 : 0.1}
                  filter="url(#glow2)"
                  style={{ transition: 'opacity 0.3s' }}
                />
              ))}

              {/* Travelling data packets */}
              {NODES.map((n, i) => (
                <motion.circle
                  key={`pkt-${i}`}
                  r="3.5"
                  fill={n.color}
                  filter="url(#glow2)"
                  animate={{
                    cx: [cx, nodePos[i].x, cx],
                    cy: [cy, nodePos[i].y, cy],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
                />
              ))}

              {/* Node glow halos */}
              {nodePos.map((pos, i) => (
                <motion.circle
                  key={`halo-${i}`}
                  cx={pos.x} cy={pos.y} r="38"
                  fill={`url(#ngrad${i})`}
                  animate={{ r: [34, 44, 34], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </svg>

            {/* Central Globe */}
            <div className="absolute" style={{ left: cx, top: cy, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 60px 20px rgba(0,212,255,0.25)' }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[100px] h-[100px] rounded-full border border-[#00D4FF]/25 border-t-[#00D4FF]/80"
                style={{ left: -4, top: -4 }}
              />
              <div className="w-[92px] h-[92px] rounded-full bg-gradient-to-br from-[#0f1a3e] to-[#050816] border-2 border-[#00D4FF]/70 flex items-center justify-center"
                style={{ boxShadow: '0 0 40px rgba(0,212,255,0.4), inset 0 0 30px rgba(0,212,255,0.1)' }}>
                <Globe2 size={38} className="text-[#00D4FF]" />
              </div>
              <div className="mt-2 text-center">
                <p className="text-white font-black text-sm tracking-widest uppercase">Business Core</p>
                <motion.p key={tick} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-[#00D4FF] text-[10px] font-mono font-bold mt-0.5">
                  SYS.ONLINE // 99.9%
                </motion.p>
              </div>
            </div>

            {/* Orbital Node Cards */}
            {NODES.map((node, i) => {
              const pos   = nodePos[i];
              const load  = loads[i];
              const Icon  = node.icon;
              const isHot = load > 80;
              return (
                <motion.div
                  key={node.name}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.12 + 0.2 }}
                  style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', zIndex: 20 }}
                  onMouseEnter={() => setActiveNode(i)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="cursor-pointer group"
                >
                  {/* Icon */}
                  <motion.div
                    animate={{ boxShadow: [`0 0 12px ${node.color}50`, `0 0 28px ${node.color}90`, `0 0 12px ${node.color}50`] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.35 }}
                    className="w-[52px] h-[52px] mx-auto rounded-2xl flex items-center justify-center border mb-2 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${node.color}18`, borderColor: `${node.color}60` }}
                  >
                    <Icon size={22} style={{ color: node.color }} />
                  </motion.div>
                  {/* Label card */}
                  <div
                    className="rounded-xl px-3 py-2 text-center border backdrop-blur-md transition-all group-hover:scale-105"
                    style={{
                      background: 'rgba(11,17,32,0.88)',
                      borderColor: `${node.color}35`,
                      boxShadow: activeNode === i ? `0 0 20px ${node.color}40` : 'none',
                    }}
                  >
                    <p className="text-white text-[11px] font-bold leading-none mb-1.5">{node.name}</p>
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${load}%` }}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                        style={{ background: `linear-gradient(90deg, ${node.color}cc, ${node.color})` }}
                      />
                    </div>
                    <p className="text-[10px] font-mono font-bold" style={{ color: node.color }}>{load}%</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Status badge */}
          <div className="absolute bottom-4 left-5 z-20 flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[#10B981] text-[10px] font-mono font-bold tracking-wider">TWIN SYNC ACTIVE</span>
          </div>
        </div>

        {/* ── Right Column ────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Live Terminal */}
          <div className="flex-1 rounded-3xl overflow-hidden border border-white/8 flex flex-col"
            style={{ background: 'linear-gradient(160deg, #0a0f1e 0%, #050816 100%)' }}>
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
              </div>
              <span className="text-[10px] text-[#00D4FF] font-mono font-bold ml-2 flex items-center gap-1.5">
                <Zap size={10} /> LIVE SYSTEM FEED
              </span>
              <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                className="w-1.5 h-3.5 bg-[#00D4FF] ml-auto rounded-sm" />
            </div>
            {/* Log lines */}
            <div className="flex-1 p-5 space-y-2.5 overflow-hidden font-mono text-[11px]">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div
                    key={log.text + i + tick}
                    initial={{ opacity: 0, x: -12, y: -6 }}
                    animate={{ opacity: Math.max(0.2, 1 - i * 0.15), x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="leading-relaxed"
                    style={{ color: i === 0 ? log.color : '#64748B' }}
                  >
                    {log.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Node Load Summary */}
          <div className="rounded-3xl p-5 border border-white/8"
            style={{ background: 'linear-gradient(145deg, #0d1230 0%, #070c1b 100%)' }}>
            <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.15em] mb-4">System Nodes</p>
            <div className="space-y-3">
              {NODES.map((node, i) => {
                const load = loads[i];
                const Icon = node.icon;
                return (
                  <div key={node.name} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${node.color}18`, border: `1px solid ${node.color}40` }}>
                      <Icon size={13} style={{ color: node.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] text-white font-semibold truncate">{node.name}</span>
                        <span className="text-[10px] font-mono ml-2 shrink-0" style={{ color: node.color }}>{load}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          animate={{ width: `${load}%` }}
                          transition={{ duration: 0.8 }}
                          style={{ background: `linear-gradient(90deg, ${node.color}80, ${node.color})` }}
                        />
                      </div>
                    </div>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.28 }}
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: node.color }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI Cards Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPIS.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="relative rounded-2xl p-5 border border-white/8 overflow-hidden group cursor-default hover:border-white/15 transition-all"
              style={{ background: 'linear-gradient(145deg, #0c1225 0%, #070c1b 100%)' }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${kpi.color}18 0%, transparent 70%)` }} />

              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${kpi.color}15`, border: `1px solid ${kpi.color}30` }}>
                  <Icon size={15} style={{ color: kpi.color }} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-xl font-black text-white mb-0.5 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                style={{ backgroundImage: `linear-gradient(135deg, white 0%, ${kpi.color} 100%)` }}>
                {kpi.value}
              </p>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold">{kpi.label}</p>
              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
                style={{ background: `linear-gradient(90deg, ${kpi.color}, transparent)` }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
