import React from "react";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

export function ChatMessage({ message }) {
  const isAI = message.role === "assistant";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${!isAI ? "flex-row-reverse" : ""}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isAI ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"}`}>
        {isAI ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className={`px-5 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
        !isAI 
          ? "bg-blue-500/10 text-white border border-blue-500/20" 
          : "bg-white/5 text-white/90 border border-white/10"
      }`}>
        {message.content}
      </div>
    </motion.div>
  );
}
