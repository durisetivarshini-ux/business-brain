import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { VoiceInput } from './VoiceInput';
import { FileUpload } from './FileUpload';
import { PromptSuggestions } from './PromptSuggestions';
import { AICharts } from './AICharts';
import { MarkdownViewer } from './MarkdownViewer';
import { generateAIResponse } from '../../services/ai';

export function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello Varshini! I am your AI Business Copilot. How can I help you optimize your operations today?', type: 'text' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;
    
    const userMessage = { role: 'user', content: text, type: 'text' };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const streamResult = await generateAIResponse(text, messages);
      let fullResponse = "";
      
      // Initialize an empty assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '', type: 'markdown' }]);
      
      for await (const chunk of streamResult.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: fullResponse, type: 'markdown' };
          return updated;
        });
      }
    } catch (error) {
      const errorMessage = error.message === 'API_KEY_MISSING'
        ? "⚠️ **API Key Missing**: Please set `VITE_GEMINI_API_KEY` in your `.env` file to enable real AI capabilities."
        : "⚠️ **Connection Error**: I couldn't reach the enterprise neural net right now.";
        
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage, type: 'markdown' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative">
      
      {/* Background Ambience inside chat */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-[#5B5FFF]/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center px-6 shrink-0 z-10 bg-[#050816]/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Business Copilot</h2>
            <p className="text-[#00D4FF] text-[10px] font-bold uppercase tracking-wider">GPT-4 Enterprise</p>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 z-10 scroll-smooth">
        {messages.length === 1 && (
          <div className="mt-10 mb-8">
            <PromptSuggestions onSelect={handleSend} />
          </div>
        )}

        <div className="space-y-6 max-w-4xl mx-auto">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 'bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] text-white'}`}>
                  {msg.role === 'user' ? 'Me' : <Bot size={16} />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-[#5B5FFF]/20 border border-[#5B5FFF]/30 text-white rounded-tr-sm' : 'bg-white/5 border border-white/10 text-[#F8FAFC] rounded-tl-sm shadow-lg'}`}>
                  
                  {/* Dynamic Rendering based on Type */}
                  {msg.role === 'assistant' && i === messages.length - 1 && !isTyping ? (
                     <TypeAnimation 
                       sequence={[msg.content]} 
                       wrapper="div" 
                       speed={70} 
                       cursor={false}
                       className="whitespace-pre-wrap leading-relaxed text-sm"
                     />
                  ) : msg.type === 'markdown' ? (
                     <MarkdownViewer content={msg.content} />
                  ) : msg.type === 'chart_revenue' ? (
                     <div>
                       <p className="whitespace-pre-wrap leading-relaxed text-sm mb-4">{msg.content}</p>
                       <AICharts type="revenue" />
                     </div>
                  ) : (
                     <div className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</div>
                  )}

                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center shrink-0 text-white"><Bot size={16} /></div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2 shadow-lg">
                   <span className="w-1.5 h-1.5 bg-[#5B5FFF] rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-[#5B5FFF] rounded-full animate-bounce delay-100"></span>
                   <span className="w-1.5 h-1.5 bg-[#5B5FFF] rounded-full animate-bounce delay-200"></span>
                </div>
             </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 pt-0 z-10 shrink-0">
        <div className="max-w-4xl mx-auto bg-[#0B1120] border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:border-[#5B5FFF]/50 focus-within:ring-1 focus-within:ring-[#5B5FFF]/50 transition-all flex flex-col">
          
          <textarea
            rows="2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Copilot to analyze data, generate reports, or automate tasks..."
            className="w-full bg-transparent text-white placeholder:text-[#94A3B8] text-sm resize-none p-3 focus:outline-none custom-scrollbar"
          />

          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-2">
              <FileUpload />
              <VoiceInput />
            </div>
            
            <button 
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${!inputValue.trim() || isTyping ? 'bg-white/5 text-white/20' : 'bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)] hover:scale-105'}`}
            >
              <Send size={18} />
            </button>
          </div>

        </div>
        <div className="text-center mt-3 text-[10px] text-[#94A3B8]">
          Business Copilot can make mistakes. Verify critical financial data.
        </div>
      </div>

    </div>
  );
}
