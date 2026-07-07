import React from 'react';
import { InventoryKPIGrid } from './InventoryKPIGrid';
import { AIInventoryAssistant } from './AIInventoryAssistant';
import { BarcodeWidget } from './BarcodeWidget';
import { AlertsCenter } from './AlertsCenter';
import { InventoryCharts } from './InventoryCharts';

export function InventoryDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Inventory Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Inventory Overview
        </h2>
        <InventoryKPIGrid />
      </section>

      {/* 2. AI Advisor */}
      <section>
        <AIInventoryAssistant />
      </section>

      {/* 3. Operational Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <BarcodeWidget />
        </div>
        <div className="lg:col-span-2">
          <AlertsCenter />
        </div>
      </section>

      {/* 4. Analytics */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Demand Forecasting & Stock Value
        </h2>
        <InventoryCharts />
      </section>

    </div>
  );
}
