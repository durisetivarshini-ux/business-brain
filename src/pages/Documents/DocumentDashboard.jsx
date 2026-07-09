import React from 'react';
import { DocumentKPIGrid } from './DocumentKPIGrid';
import { AIDocAssistant } from './AIDocAssistant';
import { FileVault } from './FileVault';
import { StorageCharts } from './StorageCharts';

export function DocumentDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Storage KPIs */}
      <section>
        <DocumentKPIGrid />
      </section>

      {/* 2. AI Assistant */}
      <section>
        <AIDocAssistant />
      </section>

      {/* 3. Visual Vault & Analytics Layer */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex">
          <FileVault />
        </div>
        <div className="flex">
          <StorageCharts />
        </div>
      </section>

    </div>
  );
}
