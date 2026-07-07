import React, { useEffect, useState } from 'react';
import { Globe2, Activity, Zap, Cpu, Database, Network } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';

export function DigitalTwinPage() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { name: "Finance Core", status: "Optimal", load: 45, icon: <Database /> },
    { name: "Sales Hub", status: "High Load", load: 88, icon: <Activity /> },
    { name: "AI Brain", status: "Processing", load: 62, icon: <Cpu /> },
    { name: "Inventory Link", status: "Optimal", load: 30, icon: <Network /> }
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse"></span> Neural Link Active
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            Live Business Digital Twin
          </h1>
          <p className="text-[#94A3B8] font-medium">Real-time simulation and state visualization of all company operations.</p>
        </div>
      </div>

      {/* Interactive 3D/Simulation Area */}
      <GlassCard className="w-full h-[500px] border-[#00D4FF]/20 bg-[#050816] relative overflow-hidden p-0 flex items-center justify-center">
        {/* Deep tech background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_scale(2)] opacity-50" />
        
        {/* Central Core */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#5B5FFF] blur-xl absolute"
          />
          <div className="w-24 h-24 rounded-full bg-[#0B1120] border-2 border-[#00D4FF] z-20 flex items-center justify-center shadow-[0_0_50px_rgba(0,212,255,0.5)]">
            <Globe2 size={40} className="text-[#00D4FF]" />
          </div>
          <div className="mt-4 text-center z-20">
            <h2 className="text-white font-bold tracking-widest uppercase">Business Core</h2>
            <p className="text-[#00D4FF] text-xs font-bold font-mono mt-1">SYS.ONLINE // 99.9%</p>
          </div>
        </div>

        {/* Floating Nodes */}
        {nodes.map((node, i) => {
          const angle = (i * (Math.PI * 2)) / nodes.length;
          const radius = 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div 
              key={node.name}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x, y, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="absolute z-20 flex flex-col items-center"
            >
              {/* Connection Line (CSS approximated) */}
              <svg className="absolute w-[400px] h-[400px] pointer-events-none -left-[200px] -top-[200px] z-0 opacity-20">
                 <line x1="200" y1="200" x2={200 - x} y2={200 - y} stroke="#00D4FF" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              <div className={`w-14 h-14 rounded-2xl bg-[#0B1120]/80 backdrop-blur-md border flex items-center justify-center mb-2 z-10 ${node.load > 80 ? 'border-[#EF4444] text-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-[#00D4FF]/50 text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.2)]'}`}>
                {node.icon}
              </div>
              <div className="bg-[#0B1120]/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-center z-10">
                <p className="text-white text-xs font-bold">{node.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${node.load}%`, backgroundColor: node.load > 80 ? '#EF4444' : '#00D4FF' }} />
                  </div>
                  <span className="text-[10px] text-[#94A3B8] font-mono">{node.load}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Live Data Feed Overlay */}
        <div className="absolute top-4 right-4 w-64 bg-[#0B1120]/80 backdrop-blur-md border border-white/10 p-4 rounded-xl z-30 font-mono text-xs">
          <h3 className="text-[#00D4FF] font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
            <Zap size={14}/> Live Feed
          </h3>
          <div className="space-y-2 text-[#94A3B8]">
            <p key={pulse}>&gt; {Math.random().toString(36).substring(7).toUpperCase()} connected</p>
            <p key={pulse+1}>&gt; Syncing inventory DB...</p>
            <p key={pulse+2}>&gt; AI detecting patterns [OK]</p>
            <p key={pulse+3}>&gt; Revenue delta: +${Math.floor(Math.random() * 5000)}</p>
          </div>
        </div>
      </GlassCard>

      {/* State Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Global Employees</p>
          <p className="text-2xl font-bold text-white"><CountUp end={854} duration={2}/></p>
        </GlassCard>
        <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Active Operations</p>
          <p className="text-2xl font-bold text-white"><CountUp end={142} duration={2}/></p>
        </GlassCard>
        <GlassCard className="p-5 border-[#00D4FF]/20 bg-[#00D4FF]/5">
          <p className="text-xs font-bold text-[#00D4FF] uppercase tracking-wider mb-1">System Health</p>
          <p className="text-2xl font-bold text-white">99.9%</p>
        </GlassCard>
        <GlassCard className="p-5 border-white/5 bg-[#0B1120]/60">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Data Processed</p>
          <p className="text-2xl font-bold text-white"><CountUp end={12.4} decimals={1}/> TB/s</p>
        </GlassCard>
      </div>

    </div>
  );
}
