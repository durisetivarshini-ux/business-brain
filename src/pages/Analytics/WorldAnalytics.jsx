import React from 'react';
import { MapPin } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function WorldAnalytics() {
  const regions = [
    { name: "North America", rev: "₹65 Cr", growth: "+18%", x: "20%", y: "30%", color: "#00D4FF" },
    { name: "Europe", rev: "₹42 Cr", growth: "+12%", x: "48%", y: "25%", color: "#7C3AED" },
    { name: "APAC", rev: "₹58 Cr", growth: "+28%", x: "75%", y: "45%", color: "#10B981" },
    { name: "South America", rev: "₹17 Cr", growth: "+8%", x: "30%", y: "65%", color: "#F59E0B" },
  ];

  return (
    <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60 h-full flex flex-col relative overflow-hidden">
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Global Revenue Distribution</h3>
      </div>

      <div className="flex-1 relative w-full rounded-xl bg-[#050816]/50 border border-white/5 overflow-hidden flex items-center justify-center">
        
        {/* Placeholder stylized map background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-[#050816] to-[#050816]">
          {/* We use a simple dotted grid to simulate a highly stylized digital map for the prototype */}
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #94A3B8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        {/* Region Pins */}
        {regions.map((region, i) => (
          <div 
            key={i} 
            className="absolute flex flex-col items-center group cursor-pointer"
            style={{ left: region.x, top: region.y }}
          >
            {/* Animated Ping */}
            <div className="absolute w-4 h-4 rounded-full animate-ping opacity-75" style={{ backgroundColor: region.color }}></div>
            {/* Pin Center */}
            <div className="w-3 h-3 rounded-full relative z-10" style={{ backgroundColor: region.color, boxShadow: `0 0 15px ${region.color}` }}></div>
            
            {/* Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-4 left-1/2 -translate-x-1/2 bg-[#050816] border border-white/10 p-3 rounded-xl shadow-xl z-20 w-36 pointer-events-none">
              <h4 className="text-white text-xs font-bold mb-1">{region.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-[#94A3B8] text-xs">{region.rev}</span>
                <span className="text-[10px] font-bold" style={{ color: region.color }}>{region.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </GlassCard>
  );
}
