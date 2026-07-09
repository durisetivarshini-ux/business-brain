import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileText, ShieldAlert, Zap, Clock, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function ContractAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 1500));
    setAnalyzing(false);
    toast.success('Document analyzed successfully!');
  };

  return (
    <GlassCard className="p-0 border-[#5B5FFF]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 mt-6 overflow-hidden flex flex-col shadow-[0_15px_40px_rgba(91,95,255,0.15)] relative">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#5B5FFF]/5 blur-[100px] pointer-events-none" />
      
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#5B5FFF]/20 to-transparent relative z-10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1 drop-shadow-md">
            <FileText className="text-[#5B5FFF]" /> AI Contract Analyzer
          </h2>
          <p className="text-xs text-[#94A3B8] font-medium">Automatic extraction of terms, dates, and legal risks with 99.9% accuracy.</p>
        </div>
        <button 
          onClick={handleAnalyze} 
          disabled={analyzing}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold shadow-[0_0_20px_rgba(91,95,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(91,95,255,0.6)] flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
        >
          {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
          {analyzing ? 'Analyzing...' : 'Analyze New Document'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row p-6 gap-8 relative z-10">
        
        {/* Document Preview Mockup */}
        <div className="w-full lg:w-1/3 border border-white/10 rounded-2xl bg-[#050816]/80 p-5 relative overflow-hidden h-[420px] shadow-inner group">
          <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-[#0B1120] to-transparent z-10 flex justify-center">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-[#5B5FFF]/20 px-3 py-1.5 rounded-lg border border-[#5B5FFF]/30 shadow-lg flex items-center gap-2">
              <CheckCircle size={12} className="text-[#10B981]" /> MSA_TechNova_Final.pdf
            </span>
          </div>
          
          {/* Animated Scanning Line */}
          {analyzing && (
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00D4FF] z-20 shadow-[0_0_15px_#00D4FF] animate-scan" />
          )}

          <div className="w-full h-full overflow-hidden opacity-60 select-none pt-12 space-y-4">
            <div className="h-5 bg-white/20 w-3/4 rounded-md" />
            <div className="space-y-2">
              <div className="h-2 bg-white/10 w-full rounded-full" />
              <div className="h-2 bg-white/10 w-full rounded-full" />
              <div className="h-2 bg-white/10 w-4/5 rounded-full" />
            </div>
            
            <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg relative overflow-hidden group-hover:border-[#EF4444]/50 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#EF4444]" />
              <div className="h-2 bg-[#EF4444]/40 w-full rounded-full mb-2" />
              <div className="h-2 bg-[#EF4444]/40 w-5/6 rounded-full" />
            </div>

            <div className="space-y-2 mt-4">
              <div className="h-2 bg-white/10 w-full rounded-full" />
              <div className="h-2 bg-white/10 w-full rounded-full" />
            </div>
            
            <div className="h-4 bg-white/20 w-1/2 rounded-md mt-6" />
            <div className="p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg relative overflow-hidden group-hover:border-[#F59E0B]/50 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#F59E0B]" />
              <div className="h-2 bg-[#F59E0B]/40 w-full rounded-full mb-2" />
              <div className="h-2 bg-[#F59E0B]/40 w-3/4 rounded-full" />
            </div>
            
            <div className="p-3 bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg relative overflow-hidden group-hover:border-[#10B981]/50 transition-colors mt-4">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]" />
              <div className="h-2 bg-[#10B981]/40 w-2/3 rounded-full" />
            </div>
          </div>
        </div>

        {/* Extraction Results */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#5B5FFF]" />
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Parties</p>
              <p className="text-sm font-bold text-white">Business Brain, TechNova</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981]" />
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Total Value</p>
              <p className="text-sm font-bold text-[#10B981]">$450,000 / yr</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00D4FF]" />
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Effective Date</p>
              <p className="text-sm font-bold text-white">Nov 1, 2026</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#EF4444]" />
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Auto-Renewal</p>
              <p className="text-sm font-bold text-[#EF4444]">Yes (60 days notice)</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <ShieldAlert size={14} className="text-[#EF4444]" /> Identified Risks
            </h3>
            
            <div className="p-5 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-2xl flex items-start gap-4 hover:bg-[#EF4444]/15 transition-colors shadow-lg">
              <div className="mt-0.5 w-10 h-10 rounded-full bg-[#EF4444]/20 flex items-center justify-center text-[#EF4444] shrink-0 border border-[#EF4444]/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <ShieldAlert size={20}/>
              </div>
              <div>
                <p className="text-base font-bold text-white mb-1.5">Liability Cap Exceeds Standard Policy</p>
                <p className="text-sm text-[#94A3B8] leading-relaxed">Section 8.2 stipulates a liability cap of <strong className="text-white">WAITING</strong>, which is 2x higher than standard company policy. <span className="text-[#10B981] font-bold">Recommend negotiating down to $2.5M.</span></p>
              </div>
            </div>

            <div className="p-5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl flex items-start gap-4 hover:bg-[#F59E0B]/15 transition-colors shadow-lg">
              <div className="mt-0.5 w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] shrink-0 border border-[#F59E0B]/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Clock size={20}/>
              </div>
              <div>
                <p className="text-base font-bold text-white mb-1.5">Unfavorable Termination Clause</p>
                <p className="text-sm text-[#94A3B8] leading-relaxed">Section 12.1 requires <strong className="text-[#F59E0B]">90 days</strong> written notice for termination for convenience, compared to our standard <strong className="text-white">30 days</strong>.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 1.5s ease-in-out infinite;
        }
      `}} />
    </GlassCard>
  );
}
