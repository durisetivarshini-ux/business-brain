import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AICharts } from './AICharts';

export function MessageBubble({ msg, isLast, isTyping }) {
  const isUser = msg.role === 'user';
  
  // Custom typing effect for AI messages
  const [displayedText, setDisplayedText] = useState(isUser || !isLast || isTyping ? msg.content : '');

  useEffect(() => {
    if (isUser || !isLast || isTyping) {
      setDisplayedText(msg.content);
      return;
    }
    
    let i = 0;
    const fullText = msg.content || '';
    setDisplayedText('');
    
    const timer = setInterval(() => {
      setDisplayedText(prev => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 10); // typing speed
    
    return () => clearInterval(timer);
  }, [msg.content, isUser, isLast, isTyping]);

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
        {msg.type === 'chart_revenue' ? (
          <div>
            <div className="prose prose-invert prose-sm max-w-none mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>
            </div>
            <AICharts type="revenue" />
          </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>
          </div>
        )}

      </div>
    </motion.div>
  );
}
