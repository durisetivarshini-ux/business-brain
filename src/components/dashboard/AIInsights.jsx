import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Link } from 'react-router-dom';
import { generateAIResponse } from '../../services/ai';
import ReactMarkdown from 'react-markdown';

export function AIInsights() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchInsights() {
      try {
        const stream = await generateAIResponse(
          "Generate a brief, realistic daily operational summary for an enterprise dashboard. Highlight 1 positive metric, 1 warning or alert, and ask a proactive question at the end. Keep it concise (under 80 words)."
        );
        
        setIsLoading(false);
        let accumulatedText = "";
        
        for await (const chunk of stream) {
          if (!isMounted) break;
          const chunkText = chunk.text();
          accumulatedText += chunkText;
          setContent(accumulatedText);
        }
      } catch (err) {
        if (!isMounted) return;
        setIsLoading(false);
        if (err.message === 'API_KEY_MISSING') {
          setError("⚠️ Gemini API Key missing! Please add VITE_GEMINI_API_KEY to your .env file or Vercel Environment Variables to enable live AI synthesis.");
        } else {
          setError("⚠️ Error connecting to AI services. Please try again later.");
          console.error(err);
        }
      }
    }

    fetchInsights();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <GlassCard className="p-6 border-[#7C3AED]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative h-[400px] flex flex-col shadow-[0_10px_40px_rgba(124,58,237,0.1)]">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#7C3AED]/30">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">AI Operations Analyst</h3>
          <p className="text-xs text-[#00D4FF] font-semibold uppercase tracking-wider">Live Synthesis</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pr-2">
        {isLoading ? (
          <div className="flex gap-2 items-center text-sm text-[#94A3B8]">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce delay-100">●</span>
            <span className="animate-bounce delay-200">●</span>
          </div>
        ) : error ? (
          <div className="text-sm text-red-400 font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20">
            {error}
          </div>
        ) : (
          <div className="text-sm text-white/90 leading-relaxed font-medium prose prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3 relative z-10 pt-4 border-t border-white/5">
        <Link to="/app/ai-copilot" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold shadow-lg shadow-[#5B5FFF]/20 transition-transform hover:scale-[1.02] text-center">
          Generate Strategy
        </Link>
        <Link to="/app/analytics" className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors text-center">
          View Report
        </Link>
      </div>
    </GlassCard>
  );
}
