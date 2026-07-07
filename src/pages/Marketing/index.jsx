import React from 'react';
import { MarketingDashboard } from './MarketingDashboard';

export function MarketingPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Marketing Studio</h1>
          <p className="text-[#94A3B8] font-medium">Orchestrate campaigns and content across all channels using AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            Content Calendar
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-transform hover:scale-[1.02]">
            + New Campaign
          </button>
        </div>
      </div>

      {/* Main Marketing Dashboard Layout */}
      <MarketingDashboard />

    </div>
  );
}
