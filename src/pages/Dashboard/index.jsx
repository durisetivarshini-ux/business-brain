import React from 'react';
import { DashboardHero } from '../../components/dashboard/DashboardHero';
import { HealthScores } from '../../components/dashboard/HealthScores';
import { KPIGrid } from '../../components/dashboard/KPIGrid';
import { RevenueChart, SalesChart, CustomerChart } from '../../components/dashboard/Charts';
import { AIInsights } from '../../components/dashboard/AIInsights';
import { ActivityTimeline } from '../../components/dashboard/ActivityTimeline';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { RecentTransactionsTable } from '../../components/dashboard/RecentTransactionsTable';

export function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Welcome Section */}
      <DashboardHero />

      {/* Health & Performance Scores */}
      <HealthScores />

      {/* KPI Grid */}
      <KPIGrid />

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column (Main Charts & Tables) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <RevenueChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SalesChart />
            <CustomerChart />
          </div>
          <RecentTransactionsTable />
        </div>

        {/* Right Column (Widgets) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AIInsights />
          <QuickActions />
          <ActivityTimeline />
        </div>

      </div>
    </div>
  );
}
