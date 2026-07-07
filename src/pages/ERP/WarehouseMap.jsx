import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';

export function WarehouseMap() {
  // A CSS Grid representing zones in a warehouse
  const zones = [
    { id: 'A1', type: 'electronics', status: 'full', capacity: 98 },
    { id: 'A2', type: 'electronics', status: 'optimal', capacity: 60 },
    { id: 'A3', type: 'electronics', status: 'optimal', capacity: 75 },
    { id: 'B1', type: 'raw', status: 'empty', capacity: 15 },
    { id: 'B2', type: 'raw', status: 'optimal', capacity: 45 },
    { id: 'C1', type: 'packaging', status: 'full', capacity: 92 },
    { id: 'C2', type: 'packaging', status: 'optimal', capacity: 55 },
    { id: 'D1', type: 'dispatch', status: 'warning', capacity: 85 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'full': return '#EC4899'; // Pink/Red
      case 'warning': return '#F59E0B'; // Orange
      case 'optimal': return '#10B981'; // Green
      case 'empty': return '#5B5FFF'; // Blue
      default: return '#94A3B8';
    }
  };

  return (
    <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-white mb-1">Central Facility Floorplan</h3>
          <p className="text-xs text-[#94A3B8]">Live telemetry from IoT sensors.</p>
        </div>
        <div className="flex gap-3 text-[10px] font-bold text-[#94A3B8]">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Optimal</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EC4899]"></span> Full</div>
        </div>
      </div>

      <div className="flex-1 bg-[#050816]/50 rounded-xl border border-white/5 p-4 grid grid-cols-4 gap-3 relative overflow-hidden">
        
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {zones.map((zone, i) => {
          const color = getStatusColor(zone.status);
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`relative z-10 flex flex-col items-center justify-center p-3 rounded-lg border group hover:z-20 transition-all cursor-crosshair ${zone.id.startsWith('C') || zone.id.startsWith('D') ? 'col-span-2' : 'col-span-1'}`}
              style={{ 
                backgroundColor: `${color}10`, 
                borderColor: `${color}30`,
                boxShadow: zone.status === 'full' ? `0 0 15px ${color}20` : 'none'
              }}
            >
              <span className="font-display font-bold text-lg mb-1" style={{ color }}>{zone.id}</span>
              <div className="w-full h-1.5 bg-[#050816] rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${zone.capacity}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-bold">{zone.type}</span>

              {/* Hover Tooltip */}
              <div className="absolute -top-10 bg-[#050816] border border-white/10 px-3 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                <span className="text-xs font-bold text-white">{zone.capacity}% Full</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
