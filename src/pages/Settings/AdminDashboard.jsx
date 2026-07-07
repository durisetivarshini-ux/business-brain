import React, { useState } from 'react';
import { SecurityPanel } from './SecurityPanel';
import { UserManagement } from './UserManagement';
import { IntegrationHub } from './IntegrationHub';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'User Management' },
    { id: 'security', label: 'Security & Auth' },
    { id: 'integrations', label: 'Integrations Hub' },
    { id: 'billing', label: 'Billing & Plans' }
  ];

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-[#5B5FFF]/20 text-[#5B5FFF] border border-[#5B5FFF]/30' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="flex-1">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'security' && <SecurityPanel />}
        {activeTab === 'integrations' && <IntegrationHub />}
        {activeTab === 'billing' && (
          <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
            <p className="text-[#94A3B8] text-sm text-center">Billing & Invoices Module<br/>(Coming in next update)</p>
          </div>
        )}
      </div>

    </div>
  );
}
