import React from 'react';
import { HRKPIGrid } from './HRKPIGrid';
import { AIHRAssistant } from './AIHRAssistant';
import { EmployeeDirectory } from './EmployeeDirectory';
import { RecruitmentBoard } from './RecruitmentBoard';
import { HRCharts } from './HRCharts';

export function HRDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. HR Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Workforce Overview
        </h2>
        <HRKPIGrid />
      </section>

      {/* 2. AI Assistant */}
      <section>
        <AIHRAssistant />
      </section>

      {/* 3. Operational Widgets */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <EmployeeDirectory />
        </div>
        <div>
          <RecruitmentBoard />
        </div>
      </section>

      {/* 4. Analytics */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Workforce Analytics
        </h2>
        <HRCharts />
      </section>

    </div>
  );
}
