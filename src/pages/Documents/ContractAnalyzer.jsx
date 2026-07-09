import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileText, ShieldAlert, Zap, Clock, Loader2, CheckCircle, TrendingDown, UploadCloud, X } from 'lucide-react';
import toast from 'react-hot-toast';

function UploadDocModal({ onClose, onAnalyze }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) setFile(f);
  };

  const handleStart = () => {
    if (!file) return toast.error('Please select a document first.');
    onAnalyze(file.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-[#5B5FFF]/30 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#5B5FFF]/10 blur-[60px] rounded-full pointer-events-none" />
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white z-10"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]"><FileText size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">Analyze New Document</h2>
            <p className="text-xs text-[#94A3B8]">Upload a PDF or DOCX to extract terms and risks</p>
          </div>
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative z-10 border-2 border-dashed rounded-2xl p-8 text-center mb-6 transition-all ${dragging ? 'border-[#5B5FFF]/80 bg-[#5B5FFF]/10' : 'border-white/10 hover:border-[#5B5FFF]/40'}`}
        >
          <UploadCloud size={40} className="mx-auto mb-3 text-[#94A3B8]" />
          {file ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle size={16} className="text-[#10B981]" />
              <p className="text-sm font-bold text-white">{file.name}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#94A3B8] mb-2">Drop your contract here or</p>
              <label className="cursor-pointer text-[#5B5FFF] font-bold text-sm hover:underline">
                browse files
                <input type="file" accept=".pdf,.docx" className="hidden" onChange={e => setFile(e.target.files[0])} />
              </label>
              <p className="text-xs text-[#94A3B8]/60 mt-2">Supports PDF, DOCX</p>
            </>
          )}
        </div>

        <div className="flex gap-3 relative z-10">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
          <button onClick={handleStart} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            <Zap size={14} /> Analyze
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContractAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [analyzedFile, setAnalyzedFile] = useState(null);

  const handleAnalyze = async (fileName) => {
    setAnalyzedFile(fileName);
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setAnalyzing(false);
    toast.success(`${fileName || 'Document'} analyzed successfully!`);
  };

  return (
    <>
      <GlassCard className="p-0 border-[#5B5FFF]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 mt-6 overflow-hidden flex flex-col shadow-[0_15px_40px_rgba(91,95,255,0.15)] relative">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#5B5FFF]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-[#10B981]/5 blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#5B5FFF]/20 to-transparent relative z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1 drop-shadow-md">
              <FileText className="text-[#5B5FFF]" /> AI Contract Analyzer
            </h2>
            <p className="text-xs text-[#94A3B8] font-medium">Automatic extraction of terms, dates, and legal risks with 99.9% accuracy.</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            disabled={analyzing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold shadow-[0_0_20px_rgba(91,95,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(91,95,255,0.6)] flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
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
                <CheckCircle size={12} className="text-[#10B981]" />
                {analyzedFile || 'MSA_TechNova_Final.pdf'}
              </span>
            </div>

            {/* Animated Scanning Line */}
            {analyzing && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] z-20 shadow-[0_0_20px_#00D4FF] animate-scan" />
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
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Parties', value: 'Business Brain, TechNova', color: '#5B5FFF' },
                { label: 'Total Value', value: '$450,000 / yr', color: '#10B981', highlight: true },
                { label: 'Effective Date', value: 'Nov 1, 2026', color: '#00D4FF' },
                { label: 'Auto-Renewal', value: 'Yes (60 days notice)', color: '#EF4444', warning: true },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-lg relative overflow-hidden hover:bg-white/10 transition-colors group">
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ backgroundColor: item.color }} />
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">{item.label}</p>
                  <p className="text-sm font-bold" style={{ color: item.highlight || item.warning ? item.color : 'white' }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Risk Score Summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Risk Score', value: 'High', pct: 72, color: '#EF4444' },
                { label: 'Clauses Found', value: '48', pct: 48, color: '#00D4FF' },
                { label: 'Compliance', value: '86%', pct: 86, color: '#10B981' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.pct}%`, backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}80` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Identified Risks */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert size={14} className="text-[#EF4444]" /> Identified Risks
              </h3>

              <div className="p-5 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-2xl flex items-start gap-4 hover:bg-[#EF4444]/15 transition-colors shadow-lg group cursor-pointer">
                <div className="mt-0.5 w-10 h-10 rounded-full bg-[#EF4444]/20 flex items-center justify-center text-[#EF4444] shrink-0 border border-[#EF4444]/30 shadow-[0_0_15px_rgba(239,68,68,0.2)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-shadow">
                  <ShieldAlert size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-base font-bold text-white">Liability Cap Exceeds Standard Policy</p>
                    <span className="text-[10px] font-bold text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/20">Critical</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Section 8.2 stipulates a liability cap of <strong className="text-white">$5M</strong>, which is 2x higher than standard company policy.{' '}
                    <span className="text-[#10B981] font-bold">Recommend negotiating down to $2.5M.</span>
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[#EF4444]">
                    <TrendingDown size={12} />
                    <span className="text-xs font-bold">High risk — action required</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl flex items-start gap-4 hover:bg-[#F59E0B]/15 transition-colors shadow-lg group cursor-pointer">
                <div className="mt-0.5 w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] shrink-0 border border-[#F59E0B]/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-shadow">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-base font-bold text-white">Unfavorable Termination Clause</p>
                    <span className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">Medium</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Section 12.1 requires <strong className="text-[#F59E0B]">90 days</strong> written notice for termination for convenience,
                    compared to our standard <strong className="text-white">30 days</strong>.
                  </p>
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
            position: absolute;
          }
        `}} />
      </GlassCard>

      {showUpload && (
        <UploadDocModal
          onClose={() => setShowUpload(false)}
          onAnalyze={(name) => { setShowUpload(false); handleAnalyze(name); }}
        />
      )}
    </>
  );
}
