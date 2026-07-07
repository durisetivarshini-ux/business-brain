import React from 'react';
import { motion } from 'framer-motion';

export function Logo({ className = "", size = 40, showText = true }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.05, rotate: 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-white/20 blur-[12px] mix-blend-screen rounded-full" />
        
        {/* Luxury Minimalist Circuit Brain SVG */}
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        >
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="2" strokeDasharray="60 220" strokeLinecap="round" transform="rotate(-45 50 50)" />
          
          {/* Left Hemisphere (Geometric) */}
          <path d="M 50 20 C 30 20, 20 35, 20 50 C 20 65, 30 80, 50 80" stroke="white" strokeWidth="3" strokeLinecap="round" />
          {/* Right Hemisphere (Geometric) */}
          <path d="M 50 20 C 70 20, 80 35, 80 50 C 80 65, 70 80, 50 80" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
          
          {/* Core Synapses (Circuit lines) */}
          <path d="M 35 35 L 65 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M 65 35 L 35 65" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 50 20 L 50 80" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M 20 50 L 80 50" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          
          {/* Neural Nodes */}
          <circle cx="35" cy="35" r="4" fill="white" />
          <circle cx="65" cy="65" r="4" fill="white" />
          <circle cx="65" cy="35" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="35" cy="65" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="50" cy="50" r="6" fill="white" />
        </svg>
      </motion.div>
      {showText && (
        <span className="font-syncopate font-bold tracking-tighter text-white text-xl uppercase">
          B.BRAIN<span className="text-white/50">_</span>
        </span>
      )}
    </div>
  );
}
