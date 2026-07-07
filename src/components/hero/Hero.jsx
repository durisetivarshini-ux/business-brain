import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { HeroStats } from './HeroStats';
import { PlayCircle, ArrowRight, BrainCircuit, Activity, BarChart3, Database } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      <HeroBackground />
      
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B5FFF]/30 bg-[#5B5FFF]/10 text-[#00D4FF] text-sm font-semibold mb-8 w-max"
          >
            <BrainCircuit size={16} /> Business Brain v2.0 Live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white"
          >
            One AI. <br/>
            <span className="text-gradient-primary">Every Business Operation.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#94A3B8] mb-10 leading-relaxed max-w-xl"
          >
            Business Brain is an AI-powered Business Operating System that unifies CRM, ERP, Finance, HR, Inventory, Marketing, Customer Support, Analytics, Workflow Automation, and AI Decision Intelligence into one intelligent platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="relative px-8 py-4 rounded-full font-bold text-white overflow-hidden group shadow-[0_0_40px_rgba(91,95,255,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">Start Free <ArrowRight size={18}/></span>
            </button>
            <button className="px-8 py-4 rounded-full font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <PlayCircle size={20} className="text-[#00D4FF]"/> Watch Demo
            </button>
          </motion.div>

          <HeroStats />
        </div>

        {/* Right Side: Floating Composition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative h-[600px] hidden lg:block perspective-1000"
        >
          {/* Main Floating Dashboard Plate */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotateX: [2, -2, 2], rotateY: [-2, 2, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <GlassCard className="w-[500px] h-[350px] bg-[#0B1120]/80 p-6 flex flex-col relative" glowColor="#5B5FFF">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]"><BarChart3 size={16}/></div>
                  <span className="font-bold text-white">Global Revenue</span>
                </div>
                <span className="px-2 py-1 rounded bg-[#00D4FF]/20 text-[#00D4FF] text-xs font-bold">+24.5%</span>
              </div>
              <div className="flex-1 w-full flex items-end gap-2 pb-2">
                {[40, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                    className="flex-1 bg-gradient-to-t from-[#5B5FFF] to-[#00D4FF] rounded-t-sm" 
                  />
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Floating Element 1: Copilot Status */}
          <motion.div 
            animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-20 right-[-20px] z-20"
          >
            <GlassCard className="p-4 flex items-center gap-4 bg-[#050816]/90 border-[#7C3AED]/30">
              <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                <BrainCircuit className="text-[#7C3AED]" size={20}/>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider">AI Copilot</p>
                <p className="text-sm text-white font-medium">Optimizing Supply Chain...</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Floating Element 2: Health Status */}
          <motion.div 
            animate={{ y: [-15, 15, -15], x: [5, -5, 5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-32 left-[-40px] z-20"
          >
            <GlassCard className="p-4 flex items-center gap-4 bg-[#050816]/90 border-[#00D4FF]/30">
              <div className="w-10 h-10 rounded-full bg-[#00D4FF]/20 flex items-center justify-center">
                <Activity className="text-[#00D4FF]" size={20}/>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider">System Health</p>
                <p className="text-sm text-white font-medium">12 Modules Online</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Floating Element 3: CRM */}
          <motion.div 
            animate={{ y: [5, -5, 5], rotateZ: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[-20px] left-[40px] z-0"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#0B1120] border border-white/10 flex items-center justify-center shadow-2xl">
              <Database className="text-[#94A3B8]" size={32}/>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
