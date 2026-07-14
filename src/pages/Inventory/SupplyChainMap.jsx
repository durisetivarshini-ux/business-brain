import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Box, MapPin, Truck, Zap, Package, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const nodes = [
  {
    id: 1, type: 'Supplier', name: 'Global Tech Components', location: 'Shenzhen, CN',
    status: 'Normal', color: '#10B981', icon: <Box size={16}/>,
    metrics: { shipments: 24, onTime: '96%', leadDays: 3 },
    x: 12, y: 45,
  },
  {
    id: 2, type: 'Distribution', name: 'West Coast Hub', location: 'Los Angeles, USA',
    status: 'Delayed', color: '#F59E0B', icon: <Truck size={16}/>,
    metrics: { shipments: 18, onTime: '72%', leadDays: 6 },
    x: 38, y: 38,
  },
  {
    id: 3, type: 'Warehouse', name: 'Central Reserve', location: 'Dallas, USA',
    status: 'Normal', color: '#10B981', icon: <Package size={16}/>,
    metrics: { shipments: 31, onTime: '98%', leadDays: 1 },
    x: 62, y: 52,
  },
  {
    id: 4, type: 'Warehouse', name: 'East Coast Reserve', location: 'New York, USA',
    status: 'Normal', color: '#10B981', icon: <Package size={16}/>,
    metrics: { shipments: 15, onTime: '94%', leadDays: 2 },
    x: 84, y: 33,
  },
];

const connections = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
];

export function SupplyChainMap() {
  const [selected, setSelected] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); toast.success('Supply chain data refreshed'); }, 1500);
  };

  const sel = selected !== null ? nodes[selected] : null;

  return (
    <GlassCard className="p-0 border-[#F59E0B]/20 bg-[#0B1120]/60 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#F59E0B]/10 via-transparent to-transparent">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-0.5">
            <Truck className="text-[#F59E0B]" size={20}/> Interactive Supply Chain Map
          </h2>
          <p className="text-xs text-[#94A3B8]">Live tracking of logistics, suppliers, and distribution centers.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]"/>Optimal</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"/>Delayed</span>
          </div>
          <button onClick={handleRefresh} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-[#94A3B8] hover:text-white">
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ── MAP AREA ── */}
        <div className="flex-1 relative bg-[#050816] overflow-hidden" style={{ minHeight: 320 }}>
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          {/* Gradient vignette */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, #050816 100%)' }} />

          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="conn-grad-01" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6"/>
              </linearGradient>
              <linearGradient id="conn-grad-12" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.6"/>
              </linearGradient>
              <linearGradient id="conn-grad-23" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.6"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {connections.map((c, i) => {
              const from = nodes[c.from];
              const to   = nodes[c.to];
              const x1 = `${from.x}%`, y1 = `${from.y}%`;
              const x2 = `${to.x}%`,   y2 = `${to.y}%`;
              const mx = `${(from.x + to.x)/2}%`;
              const my = `${(from.y + to.y)/2 - 12}%`;
              return (
                <g key={i}>
                  <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                    fill="none" stroke={`url(#conn-grad-${c.from}${c.to})`} strokeWidth="2"
                    strokeDasharray="6 4" filter="url(#glow)" opacity="0.7"
                  />
                  {/* Moving dot */}
                  <circle r="3" fill={nodes[c.from].color} filter="url(#glow)" opacity="0.9">
                    <animateMotion dur={`${3 + i}s`} repeatCount="indefinite">
                      <mpath href={`#path-${i}`}/>
                    </animateMotion>
                  </circle>
                  <path id={`path-${i}`} d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none"/>
                </g>
              );
            })}
          </svg>

          {/* Node dots */}
          {nodes.map((node, i) => (
            <div
              key={node.id}
              className="absolute cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%,-50%)', zIndex: 10 }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              {/* Outer ping */}
              <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: node.color, scale: '1.8' }} />
              {/* Icon circle */}
              <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 shadow-lg ${selected === i ? 'scale-125' : 'hover:scale-110'}`}
                style={{ backgroundColor: `${node.color}25`, borderColor: node.color, boxShadow: `0 0 18px ${node.color}50` }}
              >
                <span style={{ color: node.color }}>{node.icon}</span>
              </div>
              {/* Label */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none">
                <p className="text-[11px] font-bold text-white bg-[#050816]/80 px-2 py-0.5 rounded border border-white/10">{node.name.split(' ')[0]} {node.name.split(' ')[1]}</p>
                <p className="text-[9px] text-[#94A3B8] mt-0.5">{node.type}</p>
              </div>
            </div>
          ))}

          {/* Selected node tooltip */}
          <AnimatePresence>
            {sel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-auto lg:bottom-6 lg:max-w-xs z-20"
              >
                <div className="rounded-xl border p-4 bg-[#0B1120]/95 backdrop-blur-xl shadow-2xl"
                  style={{ borderColor: `${sel.color}40` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: sel.color }}>{sel.icon}</span>
                    <p className="font-bold text-white text-sm">{sel.name}</p>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md"
                      style={{ color: sel.color, backgroundColor: `${sel.color}20` }}>{sel.status}</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] flex items-center gap-1 mb-3"><MapPin size={10}/>{sel.location}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[['Shipments', sel.metrics.shipments], ['On-Time', sel.metrics.onTime], ['Lead Days', sel.metrics.leadDays]].map(([lbl, val]) => (
                      <div key={lbl} className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-white font-bold text-sm">{val}</p>
                        <p className="text-[9px] text-[#94A3B8] uppercase tracking-wider">{lbl}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => toast.success(`Viewing ${sel.name} details`)}
                    className="mt-3 w-full py-2 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 hover:brightness-110 transition-all"
                    style={{ background: `linear-gradient(135deg, ${sel.color}90, ${sel.color}60)` }}
                  >
                    View Full Details <ArrowRight size={12}/>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint */}
          {!sel && (
            <div className="absolute bottom-4 left-4 text-[11px] text-[#94A3B8] bg-[#050816]/60 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5">
              <Zap size={11} className="text-[#F59E0B]"/> Click a node to view details
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-white/5 bg-[#0B1120]/40 p-5 flex flex-col gap-4">
          <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Active Logistics Nodes</h3>
          <div className="space-y-3">
            {nodes.map((node, i) => (
              <div
                key={node.id}
                onClick={() => setSelected(selected === i ? null : i)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${selected === i ? 'border-white/20 bg-white/10' : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-white text-sm leading-tight">{node.name}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ml-2"
                    style={{ color: node.color, backgroundColor: `${node.color}20` }}>
                    {node.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1"><MapPin size={10}/>{node.location.split(',')[0]}</span>
                  <span className="flex items-center gap-1"><Box size={10}/>{node.type}</span>
                </div>
                {selected === i && (
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    {[['Ships', node.metrics.shipments], ['OnTime', node.metrics.onTime], ['Days', node.metrics.leadDays]].map(([l, v]) => (
                      <div key={l} className="bg-white/5 rounded-md p-1.5 text-center">
                        <p className="text-white font-bold text-xs">{v}</p>
                        <p className="text-[8px] text-[#94A3B8] uppercase">{l}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
