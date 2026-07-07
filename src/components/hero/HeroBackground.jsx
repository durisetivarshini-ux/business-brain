import React from 'react';
import { motion } from 'framer-motion';

export function HeroBackground() {
  // Generate random particles
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#050816]">
      
      {/* Base Grid / Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />
      
      {/* Animated Auroras */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] aurora-primary blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] aurora-secondary blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] aurora-accent blur-[100px]" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Neural Lines SVG overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M0,200 Q250,50 500,300 T1000,100" 
          fill="none" 
          stroke="#5B5FFF" 
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path 
          d="M0,500 Q300,700 600,400 T1200,600" 
          fill="none" 
          stroke="#00D4FF" 
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </svg>
      
      {/* Bottom fade out to surface color */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0B1120] to-transparent" />
    </div>
  );
}
