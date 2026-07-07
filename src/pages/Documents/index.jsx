import React from 'react';
import { DocumentDashboard } from './DocumentDashboard';
import { ContractAnalyzer } from './ContractAnalyzer';

export function DocumentsPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Document Center</h1>
          <p className="text-[#94A3B8] font-medium">Enterprise file management, e-signatures, and AI vault.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            Scan OCR
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#5B5FFF] text-white text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.02]">
            + Upload File
          </button>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <DocumentDashboard />

      {/* AI Premium Modules */}
      <ContractAnalyzer />

    </div>
  );
}
