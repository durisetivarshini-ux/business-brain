import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingAnimation() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 w-full">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center shrink-0 text-white shadow-lg border border-white/10">
        <Bot size={18} />
      </div>
      <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-3xl rounded-tl-sm px-6 py-5 flex items-center gap-2 shadow-[0_5px_30px_rgba(0,0,0,0.3)]">
        <span className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce shadow-[0_0_8px_#00D4FF]"></span>
        <span className="w-2 h-2 bg-[#5B5FFF] rounded-full animate-bounce shadow-[0_0_8px_#5B5FFF] delay-100"></span>
        <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce shadow-[0_0_8px_#7C3AED] delay-200"></span>
      </div>
    </motion.div>
  );
}
