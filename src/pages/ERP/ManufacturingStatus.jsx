import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Cpu, Zap, Wrench, Play, Pause, RotateCcw } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

export function ManufacturingStatus() {
  const lines = [
    { name: "Assembly Line Alpha", status: "Running", efficiency: 98, icon: <Cpu size={16}/>, color: "#10B981" },
    { name: "Packaging Unit 1", status: "Maintenance", efficiency: 0, icon: <Wrench size={16}/>, color: "#F59E0B" },
    { name: "Circuit Printing", status: "Running", efficiency: 92, icon: <Zap size={16}/>, color: "#00D4FF" },
  ];

  const handleAction = (lineName, action) => {
    if (action === 'pause') toast(`${lineName} paused`, { icon: '⏸️' });
    else if (action === 'resume') toast.success(`${lineName} resumed`);
    else if (action === 'restart') toast.success(`${lineName} restarting...`);
  };

  return (
    <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-white mb-1">Live Production Status</h3>
          <p className="text-xs text-[#94A3B8]">Monitoring active manufacturing lines.</p>
        </div>
        <button 
          onClick={() => toast('Opening Manufacturing Settings...', { icon: '⚙️' })}
          className="w-10 h-10 rounded-full bg-[#00D4FF]/10 flex items-center justify-center border border-[#00D4FF]/20 shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:scale-110 hover:bg-[#00D4FF]/20 transition-all cursor-pointer"
        >
          <Settings size={20} className="text-[#00D4FF] animate-[spin_4s_linear_infinite]" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {lines.map((line, i) => (
          <div key={i} className="flex flex-col gap-2 relative">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${line.color}15`, color: line.color }}>
                  {line.icon}
                </div>
                <h4 className="font-bold text-sm text-white">{line.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: line.color }}>{line.status}</span>
                <span className="text-xs font-bold text-[#94A3B8]">{line.efficiency}%</span>
              </div>
            </div>

            {/* Animated Production Conveyor Belt */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
              {line.efficiency > 0 && (
                <motion.div 
                  className="absolute top-0 bottom-0 left-0"
                  initial={{ x: '-100%' }}
                  animate={{ x: '1000%' }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{ width: '20%', background: `linear-gradient(90deg, transparent, ${line.color}, transparent)` }}
                />
              )}
              {/* Static progress fill */}
              <div className="absolute top-0 bottom-0 left-0 opacity-20" style={{ width: `${line.efficiency}%`, backgroundColor: line.color }} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-1">
              {line.status === 'Running' ? (
                <button
                  onClick={() => handleAction(line.name, 'pause')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-[#94A3B8] hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Pause size={12} /> Pause
                </button>
              ) : (
                <button
                  onClick={() => handleAction(line.name, 'resume')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 text-xs font-bold text-[#10B981] hover:bg-[#10B981]/20 transition-colors"
                >
                  <Play size={12} /> Resume
                </button>
              )}
              <button
                onClick={() => handleAction(line.name, 'restart')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-[#94A3B8] hover:bg-white/10 hover:text-white transition-colors"
              >
                <RotateCcw size={12} /> Restart
              </button>
            </div>

          </div>
        ))}
      </div>
    </GlassCard>
  );
}
