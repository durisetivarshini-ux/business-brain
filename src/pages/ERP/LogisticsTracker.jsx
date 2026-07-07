import React from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, Package, Clock, ShieldAlert } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function LogisticsTracker() {
  const shipments = [
    { id: "SHP-9042", destination: "New York, USA", status: "In Transit", progress: 65, icon: <Truck size={14}/>, color: "#00D4FF" },
    { id: "SHP-9043", destination: "London, UK", status: "Delivered", progress: 100, icon: <CheckCircle2 size={14}/>, color: "#10B981" },
    { id: "SHP-9045", destination: "Berlin, DE", status: "Delayed", progress: 30, icon: <ShieldAlert size={14}/>, color: "#F59E0B" },
  ];

  const milestones = ["Packed", "Dispatched", "In Transit", "Delivered"];

  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
      <div className="flex flex-col gap-6">
        {shipments.map((shipment, i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-sm tracking-wide">{shipment.id}</h4>
                <p className="text-xs text-[#94A3B8]">{shipment.destination}</p>
              </div>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5"
                style={{ color: shipment.color }}
              >
                {shipment.icon}
                <span className="text-xs font-bold">{shipment.status}</span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="mt-2">
              <div className="flex justify-between mb-2">
                {milestones.map((m, j) => {
                  const isActive = (j / (milestones.length - 1)) * 100 <= shipment.progress;
                  return (
                    <div key={j} className="flex flex-col items-center gap-1 w-1/4">
                      <div className={`w-3 h-3 rounded-full border-2 ${isActive ? 'bg-[#5B5FFF] border-[#5B5FFF] shadow-[0_0_10px_rgba(91,95,255,0.5)]' : 'bg-[#0B1120] border-white/20'}`} />
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-[#94A3B8]'}`}>{m}</span>
                    </div>
                  );
                })}
              </div>
              {/* Progress Line */}
              <div className="relative w-[calc(100%-1.5rem)] mx-auto h-0.5 bg-white/10 -mt-[1.35rem] -z-10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${shipment.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-[#5B5FFF]" 
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </GlassCard>
  );
}
