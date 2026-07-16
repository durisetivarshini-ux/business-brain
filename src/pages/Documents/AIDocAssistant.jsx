import React, { useState } from 'react';
import { Bot, Sparkles, FileText, ScanLine, PenTool, X, CheckCircle, Loader2, Eye, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { InsightPanel } from '../../components/ui/InsightPanel';
import toast from 'react-hot-toast';

function OCRScannerModal({ onClose }) {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 2000));
    setScanning(false);
    setDone(true);
    toast.success('OCR scan complete! 142 documents indexed.');
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-[#10B981]/30 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981]/10 blur-[60px] rounded-full pointer-events-none" />
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white z-10"><X size={20} /></button>

        {done ? (
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <CheckCircle size={32} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">OCR Scan Complete!</h2>
            <p className="text-sm text-[#94A3B8] mb-2">142 expense receipts processed with <span className="text-[#10B981] font-bold">99.8% accuracy</span>.</p>
            <div className="w-full grid grid-cols-3 gap-3 my-5">
              {[{ label: 'Documents', value: '142' }, { label: 'Accuracy', value: '99.8%' }, { label: 'Errors', value: '0' }].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-lg font-bold text-[#10B981]">{s.value}</p>
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#5B5FFF] text-white font-bold text-sm hover:scale-[1.02] transition-all">Done</button>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]"><ScanLine size={24} /></div>
              <div>
                <h2 className="text-xl font-bold text-white">OCR Scanner</h2>
                <p className="text-xs text-[#94A3B8]">Extract text from images and PDFs</p>
              </div>
            </div>

            {scanning ? (
              <div className="flex flex-col items-center py-8 gap-4">
                <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#5B5FFF] animate-pulse rounded-full" />
                </div>
                <p className="text-sm text-[#94A3B8]">Scanning and indexing documents...</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center mb-6 hover:border-[#10B981]/40 transition-colors">
                <ScanLine size={40} className="text-[#94A3B8] mx-auto mb-3" />
                <p className="text-sm text-[#94A3B8] mb-1">Drop files here or click to select</p>
                <p className="text-xs text-[#94A3B8]/60">Supports PDF, PNG, JPG, TIFF</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={handleScan} disabled={scanning} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#5B5FFF] text-white text-sm font-bold disabled:opacity-60 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                {scanning ? <><Loader2 size={14} className="animate-spin" /> Scanning...</> : <><ScanLine size={14} /> Start Scan</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SignaturesModal({ onClose }) {
  const sigs = [
    { doc: 'MSA_TechNova_Final.pdf', from: 'John Maxwell', due: 'Overdue 2 days', color: '#EF4444' },
    { doc: 'Employee_Offer_Letter.pdf', from: 'HR Team', due: 'Due today', color: '#F59E0B' },
    { doc: 'NDA_GlobalRetail.pdf', from: 'Legal Dept', due: 'Due in 3 days', color: '#10B981' },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#5B5FFF]/30 bg-[#0B1120] shadow-2xl relative overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#5B5FFF]/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]"><PenTool size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Pending Signatures</h2>
              <p className="text-xs text-[#94A3B8]">3 documents awaiting your signature</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-3">
          {sigs.map((sig, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-[#5B5FFF] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">{sig.doc}</p>
                  <p className="text-xs text-[#94A3B8]">From: {sig.from}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2 py-1 rounded" style={{ color: sig.color, backgroundColor: `${sig.color}15` }}>{sig.due}</span>
                <button onClick={() => { toast.success(`Signed ${sig.doc}`); }} className="px-3 py-1.5 rounded-lg bg-[#5B5FFF]/20 text-[#5B5FFF] text-xs font-bold hover:bg-[#5B5FFF]/30 transition-colors">Sign</button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/5 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}

function SummariesModal({ onClose }) {
  const summaries = [
    { title: 'Q3 Financial Audit', category: 'Finance', summary: 'Total revenue ₹24.5Cr. Operating expenses up 8%. EBITDA margin at 23%. Recommendation: optimize procurement costs.', tag: 'Auto-Summary' },
    { title: 'MSA TechNova Agreement', category: 'Legal', summary: 'Master Service Agreement with TechNova for ₹3.8Cr annually. Auto-renewal in 60 days. 2 risk clauses flagged.', tag: 'AI Extracted' },
    { title: 'Employee Handbook 2026', category: 'HR', summary: 'Updated leave policies, remote work guidelines, and performance review cadence. 42 pages summarized into 8 key points.', tag: 'Auto-Summary' },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-2xl rounded-2xl border border-[#00D4FF]/30 bg-[#0B1120] shadow-2xl relative overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#00D4FF]/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]"><Eye size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Document Summaries</h2>
              <p className="text-xs text-[#94A3B8]">12,840 documents summarized by AI</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          {summaries.map((s, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors">{s.title}</p>
                  <p className="text-xs text-[#94A3B8]">{s.category}</p>
                </div>
                <span className="text-[10px] font-bold text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-1 rounded border border-[#00D4FF]/20">{s.tag}</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{s.summary}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/5 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}

export function AIDocAssistant() {
  const [activeModal, setActiveModal] = useState(null);

  const insights = [
    { text: "Vendor contracts for Q3 have been automatically summarized and tagged.", highlight: "automatically summarized and tagged" },
    { text: "OCR scanned 142 expense receipts with 99.8% accuracy today.", highlight: "scanned 142 expense receipts" },
    { text: "AI detected missing signatures on 3 employee onboarding packets.", highlight: "missing signatures" },
    { text: "Storage usage in the 'Marketing Video' folder increased by 400GB.", highlight: "increased by 400GB" },
  ];

  return (
    <>
      <InsightPanel
        moduleName="Documents"
        title="Document AI"
        subtitle="EDMS Insights"
        badgeText="Knowledge AI Active"
        description="I'm continuously indexing your enterprise files. I've extracted text from images, summarized complex legal PDFs, and prepared outstanding signature requests."
        insights={insights}
        recommendationsModal={() => (
          <button 
            onClick={() => setActiveModal('ocr')} 
            className="hidden"
          />
        )}
        forecastModal={() => (
          <button 
            onClick={() => setActiveModal('signatures')} 
            className="hidden"
          />
        )}
        themeColor="#10B981"
      />
      
      {/* Triggering modals manually for Document AI */}
      <div className="flex justify-center gap-4 mt-[-24px] mb-6 z-10 relative">
        <button onClick={() => setActiveModal('ocr')} className="px-4 py-2.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-bold hover:bg-[#10B981]/25 transition-all flex items-center gap-2 cursor-pointer">
          <ScanLine size={14} /> OCR Receipts
        </button>
        <button onClick={() => setActiveModal('signatures')} className="px-4 py-2.5 rounded-xl bg-[#5B5FFF]/15 border border-[#5B5FFF]/30 text-[#5B5FFF] text-xs font-bold hover:bg-[#5B5FFF]/25 transition-all flex items-center gap-2 cursor-pointer">
          <PenTool size={14} /> Review Signatures
        </button>
        <button onClick={() => setActiveModal('summaries')} className="px-4 py-2.5 rounded-xl bg-[#EC4899]/15 border border-[#EC4899]/30 text-[#EC4899] text-xs font-bold hover:bg-[#EC4899]/25 transition-all flex items-center gap-2 cursor-pointer">
          <FileText size={14} /> AI Summaries
        </button>
      </div>

      {activeModal === 'ocr' && <OCRScannerModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'signatures' && <SignaturesModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'summaries' && <SummariesModal onClose={() => setActiveModal(null)} />}
    </>
  );
}
