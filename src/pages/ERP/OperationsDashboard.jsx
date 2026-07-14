import React from 'react';
import { ERPKPIGrid } from './ERPKPIGrid';
import { AIOperationsAssistant } from './AIOperationsAssistant';
import { WarehouseMap } from './WarehouseMap';
import { ManufacturingStatus } from './ManufacturingStatus';
import { LogisticsTracker } from './LogisticsTracker';
import { ERPCharts } from './ERPCharts';

export function OperationsDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Operations Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Operations Overview
        </h2>
        <ERPKPIGrid />
      </section>

      {/* 2. AI Operations Assistant */}
      <section>
        <AIOperationsAssistant />
      </section>

      {/* 3. Visual Components Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column: Warehouse Map */}
        <section>
          <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
            Warehouse Map & Capacity
          </h2>
          <WarehouseMap />
        </section>

        {/* Right Column: Manufacturing */}
        <section>
          <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
            Manufacturing Status
          </h2>
          <ManufacturingStatus />
        </section>
      </div>

      {/* 4. Live Logistics Tracker */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Live Logistics Tracker & Fleet Telemetry
        </h2>
        <LogisticsTracker />
      </section>

      {/* 5. Analytics */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Supply Chain Analytics
        </h2>
        <ERPCharts />
      </section>

    </div>
  );
}
