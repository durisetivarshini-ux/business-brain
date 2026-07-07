import React from 'react';
import { AutomationKPIGrid } from './AutomationKPIGrid';
import { AIAutomationAssistant } from './AIAutomationAssistant';
import { WorkflowCanvas } from './WorkflowCanvas';

export function AutomationDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Automation Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          System Overview
        </h2>
        <AutomationKPIGrid />
      </section>

      {/* 2. AI Assistant */}
      <section>
        <AIAutomationAssistant />
      </section>

      {/* 3. Workflow Builder Hero */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Automation Studio Canvas
        </h2>
        <WorkflowCanvas />
      </section>

    </div>
  );
}
