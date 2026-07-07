import React from 'react';
import { MarketingKPIGrid } from './MarketingKPIGrid';
import { AIMarketingAssistant } from './AIMarketingAssistant';
import { AIContentStudio } from './AIContentStudio';
import { MarketingCharts } from './MarketingCharts';

export function MarketingDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Marketing Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Marketing Overview
        </h2>
        <MarketingKPIGrid />
      </section>

      {/* 2. AI Assistant */}
      <section>
        <AIMarketingAssistant />
      </section>

      {/* 3. Operational Widgets & Analytics */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <AIContentStudio />
        </div>
        <div className="xl:col-span-2">
          <MarketingCharts />
        </div>
      </section>

    </div>
  );
}
