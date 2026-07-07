import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full max-w-2xl mx-auto text-center px-6">
      
      {/* Premium AI Illustration Placeholder */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#5B5FFF]/20 to-[#00D4FF]/20 border border-[#00D4FF]/30 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(0,212,255,0.2)] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] blur-2xl opacity-20 rounded-full animate-pulse" />
        <Bot size={48} className="text-[#00D4FF] relative z-10" />
      </motion.div>

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-display font-bold text-white mb-4"
      >
        Business Brain AI
      </motion.h2>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[#94A3B8] text-lg mb-12"
      >
        I am your intelligent Executive Assistant. Ask me to generate reports, forecast revenue, or analyze inventory.
      </motion.p>
      
    </div>
  );
}
