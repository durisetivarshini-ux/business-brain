import React, { useState } from 'react';
import { Bot, Sparkles, FileText, TrendingUp, Download, Send, Search, PieChart } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export function AdvisorPage() {
  const [input, setInput] = useState('');
  
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            AI Business Advisor
          </h1>
          <p className="text-[#94A3B8] font-medium">Strategic intelligence and on-demand business analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[calc(100vh-220px)] min-h-[600px]">
        
        {/* Left: Interactive Chat/Advisor */}
        <GlassCard className="xl:col-span-2 p-0 flex flex-col border-[#5B5FFF]/20 bg-[#0B1120]/60 relative overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} className="text-[#5B5FFF]"/> Strategy Session
            </h2>
            <span className="text-xs bg-[#10B981]/20 text-[#10B981] px-2 py-1 rounded-md font-bold">Online</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Mock Chat History */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] shrink-0 flex items-center justify-center mt-1">
                <Bot size={16} className="text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#94A3B8] font-bold">Business Brain AI</p>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-white text-sm leading-relaxed">
                  Good morning. I've analyzed our Q3 metrics. I noticed a 12% drop in Enterprise renewals. Would you like me to generate a churn risk report or suggest retention strategies?
                </div>
              </div>
            </div>

            <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 flex items-center justify-center mt-1 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=ceo" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 flex flex-col items-end">
                <p className="text-sm text-[#94A3B8] font-bold">You</p>
                <div className="p-4 rounded-2xl rounded-tr-none bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm leading-relaxed shadow-[0_0_15px_rgba(91,95,255,0.3)]">
                  Generate the churn risk report and summarize the top 3 reasons for the drop.
                </div>
              </div>
            </div>

            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] shrink-0 flex items-center justify-center mt-1">
                <Bot size={16} className="text-white" />
              </div>
              <div className="space-y-2 w-full">
                <p className="text-sm text-[#94A3B8] font-bold">Business Brain AI</p>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-white text-sm leading-relaxed space-y-4">
                  <p>Here is the analysis based on recent CRM data and support tickets:</p>
                  
                  <div className="p-4 bg-[#050816]/50 rounded-xl border border-white/5">
                    <h4 className="font-bold text-[#00D4FF] mb-2 flex items-center gap-2"><PieChart size={16}/> Top Churn Factors (Q3)</h4>
                    <ul className="space-y-2 text-sm text-[#94A3B8]">
                      <li className="flex justify-between items-center"><span className="text-white">1. Missing API Features</span> <span>42%</span></li>
                      <li className="flex justify-between items-center"><span className="text-white">2. Budget Constraints</span> <span>28%</span></li>
                      <li className="flex justify-between items-center"><span className="text-white">3. Slow Support Response</span> <span>15%</span></li>
                    </ul>
                  </div>

                  <p>I recommend assigning 2 additional support agents to the Enterprise tier and prioritizing the API v2 rollout.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/5 bg-white/[0.02]">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for reports, strategies, or insights..."
                className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#5B5FFF] transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 w-10 bg-white/10 hover:bg-[#5B5FFF] rounded-lg flex items-center justify-center transition-colors text-white">
                <Send size={18} />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Right: Quick Tools & Market Analysis */}
        <div className="space-y-8">
          
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Search size={16} className="text-[#00D4FF]"/> Suggested Analysis
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left text-sm text-white font-medium flex items-center justify-between group">
                Review Pricing Strategy <ChevronRight size={16} className="text-[#94A3B8] group-hover:text-white transition-colors"/>
              </button>
              <button className="w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left text-sm text-white font-medium flex items-center justify-between group">
                Competitor Threat Assessment <ChevronRight size={16} className="text-[#94A3B8] group-hover:text-white transition-colors"/>
              </button>
              <button className="w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left text-sm text-white font-medium flex items-center justify-between group">
                Optimize Operational Costs <ChevronRight size={16} className="text-[#94A3B8] group-hover:text-white transition-colors"/>
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex-1">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#10B981]"/> Live Market Signals
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
                <p className="text-xs text-[#10B981] font-bold uppercase tracking-wider mb-1">Positive Trend</p>
                <p className="text-sm text-white">Demand for SaaS automation tools is up 18% globally this month.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                <p className="text-xs text-[#F59E0B] font-bold uppercase tracking-wider mb-1">Warning</p>
                <p className="text-sm text-white">Cloud hosting costs are projected to increase by 5% next quarter.</p>
              </div>
            </div>
          </GlassCard>

        </div>

      </div>
    </div>
  );
}

function ChevronRight({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
