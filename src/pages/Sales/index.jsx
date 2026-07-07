import React from 'react';
import { SalesDashboard } from './SalesDashboard';
import { RevenueForecast } from './RevenueForecast';
import { OpportunityFinder } from './OpportunityFinder';

export function SalesPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Sales Revenue</h1>
          <p className="text-[#94A3B8] font-medium">Drive growth with AI-powered sales pipelines and revenue forecasting.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            View Targets
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-white text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.02]">
            + New Deal
          </button>
        </div>
      </div>

      {/* Main Sales Dashboard Layout */}
      <SalesDashboard />

      {/* AI Premium Modules */}
      <RevenueForecast />
      <OpportunityFinder />

    </div>
  );
}
