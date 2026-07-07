import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EmptyState } from './EmptyState';
import { PromptCards } from './PromptCards';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { TypingAnimation } from './TypingAnimation';

export function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: 'user', content: text, type: 'text' }];
    setMessages(newMessages);
    setIsTyping(true);

    // Simulate AI Processing & Response
    setTimeout(() => {
      let aiResponse = { role: 'assistant', type: 'text', content: '' };

      const lowerText = text.toLowerCase();
      if (lowerText.includes('revenue') || lowerText.includes('sales')) {
        aiResponse.type = 'chart_revenue';
        aiResponse.content = "Here is the Q3 Revenue Analysis you requested. We are up 12% year-over-year. The Marketing campaign 'Alpha' was the primary driver.";
      } else if (lowerText.includes('inventory') || lowerText.includes('stock')) {
        aiResponse.type = 'markdown';
        aiResponse.content = "### Inventory Alert ⚠️\n\n* **Product A:** 500 units remaining (Depleting fast)\n* **Product B:** 12,000 units remaining (Overstocked)\n\n**Recommendation:** Generate a PO for Product A immediately.";
      } else {
        aiResponse.type = 'markdown';
        aiResponse.content = "I have analyzed the data across CRM, Finance, and HR. Everything seems stable. **Revenue is healthy** and **Marketing ROI** has improved by 4% this month.\n\nLet me know if you want me to generate a specific forecast or executive report.";
      }

      setMessages([...newMessages, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full relative z-10">
      
      {/* Background Glow inside chat */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D4FF]/5 blur-[120px] rounded-full" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col z-10 scroll-smooth pb-6">
        {messages.length === 0 ? (
          <>
            <EmptyState />
            <PromptCards onSelect={handleSend} />
          </>
        ) : (
          <div className="space-y-8 w-full max-w-4xl mx-auto px-6 pt-8">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <MessageBubble 
                  key={i} 
                  msg={msg} 
                  isLast={i === messages.length - 1} 
                  isTyping={isTyping} 
                />
              ))}
            </AnimatePresence>

            {isTyping && <TypingAnimation />}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} isTyping={isTyping} />

    </div>
  );
}
