import React from 'react';
import { Bot, Sparkles, FileText, ShoppingCart, Activity } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AIInventoryAssistant() {
  const insights = [
    { text: "18 products are likely to go out of stock in 5 days.", highlight: "out of stock in 5 days" },
    { text: "Product X demand will increase next week.", highlight: "demand will increase" },
    { text: "Warehouse B is nearing capacity.", highlight: "nearing capacity" },
    { text: "Supplier ABC has delayed shipments.", highlight: "delayed shipments" },
    { text: "AI recommends ordering 850 units today.", highlight: "ordering 850 units today" },
  ];

  return (
    <GlassCard className="p-8 border-[#7C3AED]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(124,58,237,0.15)]">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#EC4899]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left: AI Intro */}
        <div className="md:w-1/3 flex flex-col justify-center border-r border-white/10 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-6 self-start">
            <Sparkles size={14} /> AI Predictor Active
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Inventory AI</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">Stock Insights</p>
            </div>
          </div>

          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            I have analyzed your warehouse capacities, historical sales trends, and supplier lead times. Here are the critical inventory actions for today.
          </p>

          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-sm font-bold shadow-lg shadow-[#7C3AED]/20 transition-transform hover:scale-[1.02]">
              <ShoppingCart size={16} /> Reorder Stock
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <Activity size={16} /> View AI Forecast
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <FileText size={16} /> Generate Report
            </button>
          </div>
        </div>

        {/* Right: Insights List */}
        <div className="md:w-2/3 flex flex-col justify-center">
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                <span className="text-[#EC4899] mt-1 text-lg leading-none">•</span>
                <p className="text-[#F8FAFC] text-base leading-relaxed">
                  {insight.text.split(insight.highlight).map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
                          {insight.highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
