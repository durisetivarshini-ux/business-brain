import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { FileUpload } from './FileUpload';

export function ChatInput({ onSend, isTyping }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    onSend(inputValue);
    setInputValue('');
  };

  return (
    <div className="p-6 pt-0 z-10 shrink-0 w-full max-w-4xl mx-auto relative">
      <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:border-[#5B5FFF]/50 focus-within:ring-1 focus-within:ring-[#5B5FFF]/50 transition-all flex flex-col relative overflow-hidden group">
        
        {/* Glow border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5B5FFF]/0 via-[#00D4FF]/10 to-[#7C3AED]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <textarea
          rows="2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Copilot to analyze data, generate reports, or automate tasks..."
          className="w-full bg-transparent text-white placeholder:text-[#94A3B8] text-sm resize-none p-3 focus:outline-none custom-scrollbar relative z-10"
        />

        <div className="flex items-center justify-between px-2 pb-1 relative z-10">
          <div className="flex items-center gap-2">
            <FileUpload />
            <VoiceInput />
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5B5FFF]/10 text-[#5B5FFF] hover:bg-[#5B5FFF]/20 border border-[#5B5FFF]/20 transition-colors text-xs font-bold">
              <Sparkles size={12} /> Deep Analysis
            </button>
          </div>
          
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`p-2 rounded-xl flex items-center justify-center transition-all ${!inputValue.trim() || isTyping ? 'bg-white/5 text-white/20' : 'bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)] hover:scale-105'}`}
          >
            <Send size={18} />
          </button>
        </div>

      </div>
      <div className="text-center mt-3 text-[10px] text-[#94A3B8] font-medium tracking-wide">
        Business Copilot uses advanced AI models. Verify critical financial data before finalizing reports.
      </div>
    </div>
  );
}
