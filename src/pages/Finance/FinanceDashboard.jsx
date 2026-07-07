import React from 'react';
import { FinanceKPIs } from './FinanceKPIs';
import { AIFinancialAdvisor } from './AIFinancialAdvisor';
import { FinancialHealth } from './FinancialHealth';
import { ExpenseCenter } from './ExpenseCenter';
import { ProfitLossBlocks } from './ProfitLossBlocks';
import { FinanceCharts } from './FinanceCharts';

export function FinanceDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Finance Overview (KPIs) */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Finance Overview
        </h2>
        <FinanceKPIs />
      </section>

      {/* 2. AI Advisor & Health */}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <AIFinancialAdvisor />
        </div>
        <div className="xl:col-span-1">
          <FinancialHealth />
        </div>
      </section>

      {/* 3. Deep Financial Data (Expenses & P&L) */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ExpenseCenter />
        <ProfitLossBlocks />
      </section>

      {/* 4. Finance Analytics */}
      <section>
        <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
          Revenue & Cash Flow Analytics
        </h2>
        <FinanceCharts />
      </section>

    </div>
  );
}
