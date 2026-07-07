import React from 'react';
import { SalesKPIGrid } from './SalesKPIGrid';
import { AISalesAssistant } from './AISalesAssistant';
import { PipelineBoard } from './PipelineBoard';
import { SalesCharts } from './SalesCharts';

export function SalesDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Sales Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Sales Overview
        </h2>
        <SalesKPIGrid />
      </section>

      {/* 2. AI Assistant */}
      <section>
        <AISalesAssistant />
      </section>

      {/* 3. Operational Widgets & Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
            Deal Pipeline
          </h2>
          <PipelineBoard />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
            Revenue Performance
          </h2>
          <SalesCharts />
        </div>
      </section>

    </div>
  );
}
