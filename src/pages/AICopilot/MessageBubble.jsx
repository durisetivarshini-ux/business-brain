import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AICharts } from './AICharts';

export function MessageBubble({ msg, isLast, isTyping }) {
  const isUser = msg.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} w-full group`}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${isUser ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20' : 'bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] text-white border border-white/10 mt-1'}`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-[85%] rounded-3xl p-5 relative ${isUser ? 'bg-gradient-to-br from-[#5B5FFF]/20 to-[#00D4FF]/10 border border-[#5B5FFF]/30 text-white rounded-tr-sm shadow-[0_5px_30px_rgba(0,212,255,0.1)]' : 'bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 text-[#F8FAFC] rounded-tl-sm shadow-[0_5px_30px_rgba(0,0,0,0.3)]'}`}>
        
        {/* Dynamic Content Rendering */}
        {msg.type === 'chart_revenue' ? (
          <div>
            <div className="prose prose-invert prose-sm max-w-none mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
            </div>
            <AICharts type="revenue" />
          </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
          </div>
        )}

        {/* Action Buttons (Hover) */}
        {!isUser && !isTyping && msg.content && (
          <div className="absolute -bottom-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-white/10 text-[#94A3B8] hover:text-white hover:bg-[#1e293b] text-xs font-bold transition-colors shadow-lg"
            >
              {copied ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

      </div>
    </motion.div>
  );
}
