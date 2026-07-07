import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Cpu, Zap, Wrench } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function ManufacturingStatus() {
  const lines = [
    { name: "Assembly Line Alpha", status: "Running", efficiency: 98, icon: <Cpu size={16}/>, color: "#10B981" },
    { name: "Packaging Unit 1", status: "Maintenance", efficiency: 0, icon: <Wrench size={16}/>, color: "#F59E0B" },
    { line: "Circuit Printing", status: "Running", efficiency: 92, icon: <Zap size={16}/>, color: "#00D4FF" },
  ];

  return (
    <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-white mb-1">Live Production Status</h3>
          <p className="text-xs text-[#94A3B8]">Monitoring active manufacturing lines.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 flex items-center justify-center border border-[#00D4FF]/20 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
          <Settings size={20} className="text-[#00D4FF] animate-[spin_4s_linear_infinite]" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {lines.map((line, i) => (
          <div key={i} className="flex flex-col gap-2 relative">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${line.color}15`, color: line.color }}>
                  {line.icon}
                </div>
                <h4 className="font-bold text-sm text-white">{line.name || line.line}</h4>
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

          </div>
        ))}
      </div>
    </GlassCard>
  );
}
