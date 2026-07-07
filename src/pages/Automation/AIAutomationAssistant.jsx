import React from 'react';
import { Bot, Sparkles, Wand2, Settings, List } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AIAutomationAssistant() {
  const insights = [
    { text: "AI recommends automating invoice approvals based on manual repetition.", highlight: "automating invoice approvals" },
    { text: "Inventory reorder workflow can reduce delays by 4 days.", highlight: "reduce delays by 4 days" },
    { text: "HR onboarding workflow saved 420 hours this quarter.", highlight: "saved 420 hours" },
    { text: "Marketing campaign automation increased conversions by 14%.", highlight: "increased conversions by 14%" },
    { text: "Finance approval workflow completed successfully with zero errors.", highlight: "completed successfully with zero errors" },
  ];

  return (
    <GlassCard className="p-8 border-[#00D4FF]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(0,212,255,0.15)]">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#5B5FFF]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left: AI Intro */}
        <div className="md:w-1/3 flex flex-col justify-center border-r border-white/10 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-6 self-start">
            <Sparkles size={14} /> Optimization AI Active
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#5B5FFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Workflow AI</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">Automation Insights</p>
            </div>
          </div>

          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            I've monitored repetitive manual tasks across your CRM, ERP, and Finance modules. Here are the top opportunities to deploy new automations.
          </p>

          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold shadow-lg shadow-[#00D4FF]/20 transition-transform hover:scale-[1.02]">
              <Wand2 size={16} /> Generate Workflow
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <Settings size={16} /> Optimize Existing
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              <List size={16} /> View Suggestions
            </button>
          </div>
        </div>

        {/* Right: Insights List */}
        <div className="md:w-2/3 flex flex-col justify-center">
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                <span className="text-[#00D4FF] mt-1 text-lg leading-none">•</span>
                <p className="text-[#F8FAFC] text-base leading-relaxed">
                  {insight.text.split(insight.highlight).map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF]">
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
