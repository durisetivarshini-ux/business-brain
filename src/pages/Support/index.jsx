import React from 'react';
import { SupportDashboard } from './SupportDashboard';

export function SupportPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Support Center</h1>
          <p className="text-[#94A3B8] font-medium">AI-driven help desk and customer experience command center.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            Knowledge Base
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold shadow-[0_0_15px_rgba(91,95,255,0.4)] transition-transform hover:scale-[1.02]">
            + New Ticket
          </button>
        </div>
      </div>

      {/* Main Support Dashboard Layout */}
      <SupportDashboard />

    </div>
  );
}
