import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Hyper-Cinematic Animated Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#00f0ff] via-transparent to-[#b53cff] opacity-10 blur-[150px] mix-blend-screen rounded-full" 
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Floating Holographic Auth Panel */}
      <div className="relative z-10 w-full max-w-md p-6 perspective-[1000px]">
        <motion.div 
          initial={{ opacity: 0, rotateX: 20, y: 50 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="glass-ultra p-10 rounded-[2rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00f0ff]/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#b53cff]/20 blur-[60px] rounded-full pointer-events-none" />

          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="font-syncopate font-bold text-2xl tracking-tighter uppercase mb-2">
              B.BRAIN<span className="text-[#00f0ff]">_</span>
            </div>
            <p className="font-display text-white/50 text-sm tracking-widest uppercase">System Authentication</p>
          </div>
          
          <div className="relative z-10">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
