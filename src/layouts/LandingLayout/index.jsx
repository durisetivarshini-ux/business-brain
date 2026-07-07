import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function LandingLayout() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00f0ff] selection:text-black overflow-hidden font-sans">
      {/* Deep Space Background / Aurora */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] pointer-events-none" />
      
      {/* Glass Navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-5xl rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#b53cff] flex items-center justify-center text-black font-black text-lg shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            B
          </div>
          <span className="font-bold text-lg tracking-widest uppercase">Business Brain</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-white/60">
          <a href="#core" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">AI Core</a>
          <a href="#modules" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Modules</a>
          <a href="#pricing" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <a href="/login" className="text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors hidden sm:block">Sign In</a>
          <MagneticButton variant="glass" className="py-2 px-6 text-xs uppercase tracking-widest">
            Deploy Now
          </MagneticButton>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
