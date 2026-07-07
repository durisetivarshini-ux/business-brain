import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { MarkdownViewer } from './MarkdownViewer';
import { AICharts } from './AICharts';

export function MessageBubble({ msg, isLast, isTyping }) {
  const isUser = msg.role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} w-full`}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${isUser ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20' : 'bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] text-white border border-white/10'}`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-[85%] rounded-3xl p-5 ${isUser ? 'bg-gradient-to-br from-[#5B5FFF]/20 to-[#00D4FF]/10 border border-[#5B5FFF]/30 text-white rounded-tr-sm shadow-[0_5px_30px_rgba(0,212,255,0.1)]' : 'bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 text-[#F8FAFC] rounded-tl-sm shadow-[0_5px_30px_rgba(0,0,0,0.3)]'}`}>
        
        {/* Dynamic Content Rendering */}
        {!isUser && isLast && !isTyping ? (
          <TypeAnimation 
            sequence={[msg.content]} 
            wrapper="div" 
            speed={80} 
            cursor={false}
            className="whitespace-pre-wrap leading-relaxed text-sm font-medium"
          />
        ) : msg.type === 'markdown' ? (
          <MarkdownViewer content={msg.content} />
        ) : msg.type === 'chart_revenue' ? (
          <div>
            <p className="whitespace-pre-wrap leading-relaxed text-sm mb-4 font-medium">{msg.content}</p>
            <AICharts type="revenue" />
          </div>
        ) : (
          <div className="whitespace-pre-wrap leading-relaxed text-sm font-medium">{msg.content}</div>
        )}

      </div>
    </motion.div>
  );
}
