import React from 'react';
import { SupportKPIGrid } from './SupportKPIGrid';
import { AISupportAssistant } from './AISupportAssistant';
import { TicketBoard } from './TicketBoard';
import { SupportCharts } from './SupportCharts';

export function SupportDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Support Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Helpdesk Overview
        </h2>
        <SupportKPIGrid />
      </section>

      {/* 2. AI Assistant */}
      <section>
        <AISupportAssistant />
      </section>

      {/* 3. Operational Widgets & Analytics */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <TicketBoard />
        </div>
        <div>
          <SupportCharts />
        </div>
      </section>

    </div>
  );
}
