import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2, Loader2 } from 'lucide-react';

export function InitializationScreen() {
  const [step, setStep] = useState(0);

  const steps = [
    "Establishing secure quantum connection...",
    "Synchronizing enterprise neural net...",
    "Loading predictive analytics engines...",
    "Activating Copilot & Automation agents...",
    "Welcome to Business Brain."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600); // 600ms per step

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] overflow-hidden">
      
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B5FFF]/10 blur-[150px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00D4FF]/10 blur-[100px] rounded-full mix-blend-screen" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Central Core */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative flex items-center justify-center w-32 h-32 mb-12"
        >
          {/* Rotating Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-[#5B5FFF]/30 border-t-[#5B5FFF]"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-[#00D4FF]/30 border-b-[#00D4FF]"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-[#7C3AED]/30 border-r-[#7C3AED]"
          />
          
          {/* AI Brain Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.5)]">
            <Bot size={32} className="text-white" />
          </div>
        </motion.div>

        {/* Loading Steps */}
        <div className="w-80 flex flex-col gap-4">
          {steps.map((text, index) => {
            const isCompleted = index < step;
            const isCurrent = index === step;
            const isPending = index > step;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isPending ? 0 : 1,
                  x: isPending ? -20 : 0,
                  scale: isCurrent ? 1.05 : 1
                }}
                className={`flex items-center gap-3 ${isCurrent ? 'text-white' : 'text-[#94A3B8]'}`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-[#00D4FF]" />
                ) : isCurrent ? (
                  <Loader2 size={18} className="text-[#5B5FFF] animate-spin" />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border border-white/10" />
                )}
                <span className={`text-sm font-medium ${isCurrent ? 'font-bold' : ''}`}>
                  {text}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
