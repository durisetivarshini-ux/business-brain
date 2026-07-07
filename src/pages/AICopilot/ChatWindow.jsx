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

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: 'user', content: text, type: 'text' }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === 'your-api-key-here') {
        // Fallback Mock Logic if no API key is provided
        setTimeout(() => {
          let aiResponse = { role: 'assistant', type: 'text', content: '' };
          const lowerText = text.toLowerCase();
          if (lowerText.includes('revenue') || lowerText.includes('sales')) {
            aiResponse.type = 'chart_revenue';
            aiResponse.content = "Here is the Q3 Revenue Analysis you requested. We are up 12% year-over-year.";
          } else {
            aiResponse.type = 'markdown';
            aiResponse.content = `**API Key Missing!**\n\nTo use the real Gemini AI, please add \`VITE_GEMINI_API_KEY\` to your \`.env.local\` file and Vercel environment variables.\n\nHere is a simulated response for your prompt: *"${text}"*`;
          }
          setMessages([...newMessages, aiResponse]);
          setIsTyping(false);
        }, 1500);
        return;
      }

      // Initialize Gemini
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        systemInstruction: "You are Business Brain Copilot, an advanced AI assistant for enterprise management. You have access to simulated data for CRM, Finance, HR, and Operations. Format your responses in Markdown. Keep them professional, concise, and highly analytical."
      });

      // Build chat history for context
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(text);
      const response = await result.response;
      
      setMessages([...newMessages, { role: 'assistant', type: 'markdown', content: response.text() }]);
      setIsTyping(false);

    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        type: 'markdown', 
        content: `**Error:** Failed to communicate with Gemini AI.\n\n\`${error.message}\`` 
      }]);
      setIsTyping(false);
    }
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
