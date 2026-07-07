import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Topbar } from '../../components/navigation/Topbar';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#050816] text-[#F8FAFC] font-sans overflow-hidden selection:bg-[#5B5FFF] selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#5B5FFF]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/10 blur-[150px] rounded-full" />
      </div>

      {/* Floating Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative z-10">
        <Topbar />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="p-8 pb-20">
            <Outlet />
          </div>
        </main>
      </div>
      
    </div>
  );
}
