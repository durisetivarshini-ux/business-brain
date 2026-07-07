import React from 'react';
import { CRMStatsGrid } from './CRMStatsGrid';
import { AICRMAssistant } from './AICRMAssistant';
import { LeadPipeline } from './LeadPipeline';
import { CRMCharts } from './CRMCharts';

export function CustomerDashboard() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* 1. Customer Overview (Stats) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Customer Overview
        </h2>
        <CRMStatsGrid />
      </section>

      {/* 2. AI CRM Assistant */}
      <section>
        <AICRMAssistant />
      </section>

      {/* 3. Lead Pipeline (Kanban) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
            Lead Pipeline
          </h2>
          <div className="text-xs text-[#94A3B8] bg-white/5 px-2 py-1 rounded-md">Live Update</div>
        </div>
        <LeadPipeline />
      </section>

      {/* 4. Revenue Analytics & Funnel */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Revenue Analytics
        </h2>
        <CRMCharts />
      </section>

    </div>
  );
}
