import React from 'react';
import { BusinessHealth } from './BusinessHealth';
import { ExecutiveKPIGrid } from './ExecutiveKPIGrid';
import { ExecutiveAI } from './ExecutiveAI';
import { RevenueAnalytics } from './RevenueAnalytics';
import { WorldAnalytics } from './WorldAnalytics';

export function ExecutiveDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Master KPI Layer */}
      <section>
        <ExecutiveKPIGrid />
      </section>

      {/* 2. Top Executive Layer (Health + AI Briefing) */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <BusinessHealth />
        <ExecutiveAI />
      </section>

      {/* 3. Global & Financial Analytics Layer */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="h-[400px]">
          <RevenueAnalytics />
        </div>
        <div className="h-[400px]">
          <WorldAnalytics />
        </div>
      </section>

    </div>
  );
}
