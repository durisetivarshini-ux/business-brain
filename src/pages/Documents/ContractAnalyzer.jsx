import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileText, ShieldAlert, Zap, CheckCircle2, Clock } from 'lucide-react';

export function ContractAnalyzer() {
  return (
    <GlassCard className="p-0 border-[#5B5FFF]/20 bg-[#0B1120]/60 mt-6 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#5B5FFF]/10 to-transparent">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <FileText className="text-[#5B5FFF]" /> AI Contract Analyzer
          </h2>
          <p className="text-xs text-[#94A3B8]">Automatic extraction of terms, dates, and legal risks.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#5B5FFF]/20 border border-[#5B5FFF]/30 text-[#00D4FF] text-xs font-bold hover:bg-[#5B5FFF]/30 transition-colors flex items-center gap-2">
          <Zap size={14} /> Analyze New Document
        </button>
      </div>

      <div className="flex flex-col lg:flex-row p-6 gap-8">
        
        {/* Document Preview Mockup */}
        <div className="w-full lg:w-1/3 border border-white/10 rounded-xl bg-white/5 p-4 relative overflow-hidden h-[400px]">
          <div className="absolute top-0 left-0 w-full p-2 bg-gradient-to-b from-[#0B1120] to-transparent z-10 flex justify-center">
            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider bg-[#0B1120] px-2 py-1 rounded border border-white/10">MSA_TechNova_Final.pdf</span>
          </div>
          
          <div className="w-full h-full overflow-hidden opacity-50 select-none pt-8">
            <div className="h-4 bg-white/20 w-3/4 mb-6" />
            <div className="h-2 bg-white/10 w-full mb-3" />
            <div className="h-2 bg-white/10 w-full mb-3" />
            <div className="h-2 bg-[#EF4444]/40 w-5/6 mb-3 border border-[#EF4444]/50 relative">
              <div className="absolute -left-2 -top-2 w-4 h-4 bg-[#EF4444] rounded-full flex items-center justify-center text-[8px] font-bold text-white">!</div>
            </div>
            <div className="h-2 bg-white/10 w-full mb-6" />
            
            <div className="h-4 bg-white/20 w-1/2 mb-6" />
            <div className="h-2 bg-[#F59E0B]/40 w-full mb-3 border border-[#F59E0B]/50" />
            <div className="h-2 bg-white/10 w-full mb-3" />
            <div className="h-2 bg-[#10B981]/40 w-2/3 mb-3 border border-[#10B981]/50" />
          </div>
        </div>

        {/* Extraction Results */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Parties</p>
              <p className="text-sm font-bold text-white">Business Brain, TechNova</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Total Value</p>
              <p className="text-sm font-bold text-[#10B981]">$450,000 / yr</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Effective Date</p>
              <p className="text-sm font-bold text-white">Nov 1, 2026</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Auto-Renewal</p>
              <p className="text-sm font-bold text-[#EF4444]">Yes (60 days notice)</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <ShieldAlert size={14} className="text-[#EF4444]" /> Identified Risks
            </h3>
            
            <div className="p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl flex items-start gap-3">
              <div className="mt-0.5 text-[#EF4444]"><ShieldAlert size={16}/></div>
              <div>
                <p className="text-sm font-bold text-white mb-1">Liability Cap Exceeds Standard Policy</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Section 8.2 stipulates a liability cap of $5M, which is 2x higher than standard company policy. Recommend negotiating down to $2.5M.</p>
              </div>
            </div>

            <div className="p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl flex items-start gap-3">
              <div className="mt-0.5 text-[#F59E0B]"><Clock size={16}/></div>
              <div>
                <p className="text-sm font-bold text-white mb-1">Unfavorable Termination Clause</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Section 12.1 requires 90 days written notice for termination for convenience, compared to our standard 30 days.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </GlassCard>
  );
}
