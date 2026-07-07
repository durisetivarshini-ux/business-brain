import React from 'react';
import { AdminDashboard } from './AdminDashboard';

export function SettingsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-6 relative z-10 pb-10 h-full">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Platform Administration</h1>
          <p className="text-[#94A3B8] font-medium">Enterprise settings, user roles, and security policies.</p>
        </div>
      </div>

      {/* Main Assembly */}
      <AdminDashboard />

    </div>
  );
}
