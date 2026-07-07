import React from 'react';
import { OperationsDashboard } from './OperationsDashboard';

export function ERPPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span> Systems Online
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Enterprise Operations</h1>
          <p className="text-[#94A3B8] font-medium">Mission control for procurement, manufacturing, and supply chain logistics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            Approval Queue <span className="ml-2 bg-rose-500 text-white px-2 py-0.5 rounded-full text-xs">3</span>
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-transform hover:scale-[1.02]">
            Generate ERP Report
          </button>
        </div>
      </div>

      {/* Main ERP Dashboard Layout */}
      <OperationsDashboard />

    </div>
  );
}
