import React from 'react';
import { InboxDashboard } from './InboxDashboard';

export function NotificationsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-6 relative z-10 pb-10 h-full">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Communication Center</h1>
          <p className="text-[#94A3B8] font-medium">Enterprise inbox & AI-prioritized task streams.</p>
        </div>
      </div>

      {/* Main Assembly */}
      <InboxDashboard />

    </div>
  );
}
