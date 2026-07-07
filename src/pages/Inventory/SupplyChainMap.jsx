import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Box, MapPin, ArrowRight, Truck } from 'lucide-react';

const nodes = [
  { id: 1, type: 'Supplier', name: 'Global Tech Components', location: 'Shenzhen', status: 'Normal', lat: 30, lng: 10 },
  { id: 2, type: 'Distribution', name: 'West Coast Hub', location: 'Los Angeles', status: 'Delayed', lat: 40, lng: 30 },
  { id: 3, type: 'Warehouse', name: 'East Coast Reserve', location: 'New York', status: 'Normal', lat: 50, lng: 70 },
];

export function SupplyChainMap() {
  return (
    <GlassCard className="p-0 border-[#F59E0B]/20 bg-[#0B1120]/60 mt-6 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#F59E0B]/10 to-transparent">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <Truck className="text-[#F59E0B]" /> Interactive Supply Chain Map
          </h2>
          <p className="text-xs text-[#94A3B8]">Live tracking of logistics, suppliers, and distribution centers.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Optimal
          </div>
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Delayed
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[400px]">
        {/* Mock Map Area */}
        <div className="w-full lg:w-2/3 h-full bg-[#050816] relative flex items-center justify-center p-8 group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Physical_World_Map_blank.svg')] bg-cover bg-center bg-no-repeat filter invert sepia" />
          
          <div className="w-full max-w-[80%] h-[1px] bg-white/10 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#10B981]"></span>
              </span>
              <p className="mt-2 text-xs text-white font-bold bg-[#0B1120]/80 px-2 py-1 rounded">Supplier</p>
            </div>
            
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#F59E0B]"></span>
              </span>
              <p className="mt-2 text-xs text-white font-bold bg-[#0B1120]/80 px-2 py-1 rounded">Distribution</p>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#10B981]"></span>
              </span>
              <p className="mt-2 text-xs text-white font-bold bg-[#0B1120]/80 px-2 py-1 rounded">Warehouse</p>
            </div>

            {/* Connecting lines */}
            <div className="absolute left-0 top-0 h-[1px] bg-gradient-to-r from-[#10B981] to-[#F59E0B] w-1/2 animate-[pulse_2s_ease-in-out_infinite]" />
            <div className="absolute left-1/2 top-0 h-[1px] bg-gradient-to-r from-[#F59E0B] to-[#10B981] w-1/2" />
          </div>
        </div>

        {/* Node Details */}
        <div className="w-full lg:w-1/3 h-full border-l border-white/5 bg-[#0B1120]/40 overflow-y-auto p-4 custom-scrollbar">
          <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4">Active Logistics Nodes</h3>
          <div className="space-y-3">
            {nodes.map(node => (
              <div key={node.id} className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-white text-sm">{node.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${node.status === 'Normal' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#F59E0B]/20 text-[#F59E0B]'}`}>
                    {node.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1"><MapPin size={12}/> {node.location}</span>
                  <span className="flex items-center gap-1"><Box size={12}/> {node.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
