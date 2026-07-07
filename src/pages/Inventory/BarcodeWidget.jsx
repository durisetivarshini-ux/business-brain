import React from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Box } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function BarcodeWidget() {
  return (
    <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-white mb-1 flex items-center gap-2">
            <ScanLine size={16} className="text-[#00D4FF]" /> Smart Scanner
          </h3>
          <p className="text-xs text-[#94A3B8]">Awaiting QR or Barcode</p>
        </div>
      </div>

      <div className="flex-1 relative rounded-xl bg-[#050816] border border-white/5 overflow-hidden flex items-center justify-center min-h-[200px]">
        {/* Placeholder camera feed grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        {/* Scanning Box Outline */}
        <div className="relative w-32 h-32 border-2 border-dashed border-[#00D4FF]/50 rounded-lg flex items-center justify-center">
          <Box size={24} className="text-[#00D4FF]/30" />
          
          {/* Animated Laser Line */}
          <motion.div 
            className="absolute left-0 right-0 h-0.5 bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
          />
        </div>

        {/* Scan Status */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#00D4FF] animate-pulse">Scanning...</span>
        </div>
      </div>
    </GlassCard>
  );
}
