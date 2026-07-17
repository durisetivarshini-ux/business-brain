import React from 'react';
import { KPICard } from './KPICard';
import { useWorkspace } from '../../context/WorkspaceContext';

export function KPIGrid() {
  const { workspaceConfig: config, currencySymbol, businessData } = useWorkspace();
  const industry = config?.customIndustry || 'Enterprise';

  const employees = businessData.employees || [];
  const products = businessData.products || [];
  const customers = businessData.customers || [];
  const transactions = businessData.transactions || [];

  const totalRevenue = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  const getIndustryKPIs = () => {
    switch(industry) {
      case 'Restaurant':
        return [
          { title: "Tables Occupied", value: customers.length || 14, suffix: " / 20", trend: "70% Full", isPositive: true, color: "#5B5FFF", data: [10, 12, 11, 14, 15, 12, 14], path: "/app/branches" },
          { title: "Daily Orders", value: transactions.filter(t => t.amount > 0).length || 284, trend: "12.5%", isPositive: true, color: "#00D4FF", data: [20, 25, 30, 28, 35, 45, 50], path: "/app/erp" },
          { title: "Revenue Today", value: totalRevenue || 4820, prefix: currencySymbol, trend: "8.4%", isPositive: true, color: "#7C3AED", data: [40, 45, 50, 55, 65, 75, 80], path: "/app/finance" },
          { title: "Kitchen Staff", value: employees.length || 4, trend: "Active Roster", isPositive: true, color: "#EC4899", data: [3, 4, 4, 4], path: "/app/hrms" },
          { title: "Avg Wait Time", value: 12, suffix: " mins", trend: "2 mins less", isPositive: true, color: "#10B981", data: [15, 14, 13, 12, 13, 12, 12], path: "/app/erp" }
        ];
      case 'Hospital':
        return [
          { title: "Patient Registry", value: customers.length || 342, trend: "5.4%", isPositive: true, color: "#5B5FFF", data: [28, 30, 32, 34, 32, 33, 34], path: "/app/industry/patients" },
          { title: "Bed Occupancy", value: 92, suffix: "%", trend: "Stable", isPositive: true, color: "#00D4FF", data: [88, 89, 91, 92, 90, 92, 92], path: "/app/industry/patients" },
          { title: "Doctors Active", value: employees.length || 24, trend: "Full Roster", isPositive: true, color: "#7C3AED", data: [20, 24, 24, 24, 24, 24, 24], path: "/app/industry/doctors" },
          { title: "Op Success Rate", value: 99.1, suffix: "%", trend: "0.2% up", isPositive: true, color: "#EC4899", data: [98.8, 98.9, 99.0, 99.1, 99.1], path: "/app/executive" },
          { title: "Billing Pipeline", value: totalRevenue || 12400, prefix: currencySymbol, trend: "Clear", isPositive: true, color: "#10B981", data: [10, 11, 12, 12.4], path: "/app/finance" }
        ];
      case 'School':
        return [
          { title: "Student Count", value: customers.length || 1250, trend: "4.8% up", isPositive: true, color: "#5B5FFF", data: [110, 115, 120, 125], path: "/app/branches" },
          { title: "Teachers Active", value: employees.length || 48, trend: "Optimal", isPositive: true, color: "#00D4FF", data: [45, 46, 48, 48], path: "/app/hrms" },
          { title: "Fees Collected", value: totalRevenue || 82, suffix: " Lakhs", prefix: currencySymbol, trend: "92% complete", isPositive: true, color: "#7C3AED", data: [50, 60, 70, 82], path: "/app/finance" },
          { title: "Active Classes", value: 12, trend: "Room occupancy optimal", isPositive: true, color: "#EC4899", data: [10, 12, 12, 12], path: "/app/branches" },
          { title: "Exam GPA Avg", value: 84.5, suffix: "%", trend: "2.1% improvement", isPositive: true, color: "#10B981", data: [80, 81, 82, 84.5], path: "/app/executive" }
        ];
      case 'Software Company':
        return [
          { title: "Devs Engaged", value: employees.length || 18, trend: "All Active", isPositive: true, color: "#5B5FFF", data: [15, 16, 17, 18], path: "/app/hrms" },
          { title: "Products Listed", value: products.length || 4, trend: "Stable", isPositive: true, color: "#00D4FF", data: [3, 4, 4, 4], path: "/app/inventory" },
          { title: "Open Pull Requests", value: 8, trend: "Reviewing", isPositive: true, color: "#7C3AED", data: [12, 10, 9, 8], path: "/app/industry/development" },
          { title: "Gross Revenue", value: totalRevenue || 572000, prefix: currencySymbol, trend: "14.2% up", isPositive: true, color: "#EC4899", data: [50, 48, 45, 42], path: "/app/finance" },
          { title: "Active Clients", value: customers.length || 12, trend: "On schedule", isPositive: true, color: "#10B981", data: [10, 11, 12, 12], path: "/app/crm" }
        ];
      case 'Retail':
        return [
          { title: "Customer Transactions", value: transactions.filter(t => t.amount > 0).length || 182, trend: "8.4% up", isPositive: true, color: "#5B5FFF", data: [15, 16, 17, 18.2], path: "/app/crm" },
          { title: "Catalog Items", value: products.length || 4250, trend: "Sufficient", isPositive: true, color: "#00D4FF", data: [60, 70, 80, 84], path: "/app/inventory" },
          { title: "Active Customers", value: customers.length || 85, trend: "Engaged", isPositive: true, color: "#7C3AED", data: [40, 42, 41, 42.5], path: "/app/crm" },
          { title: "Revenue", value: totalRevenue || 8420, prefix: currencySymbol, trend: "12% up", isPositive: true, color: "#EC4899", data: [50, 60, 70, 84.2], path: "/app/finance" },
          { title: "Profit Margin", value: profitMargin || 18.4, suffix: "%", trend: "1.2% up", isPositive: true, color: "#10B981", data: [17, 17.5, 18, 18.4], path: "/app/finance" }
        ];
      case 'Manufacturing':
        return [
          { title: "Output Rate", value: 1840, suffix: " u/h", trend: "9.2%", isPositive: true, color: "#5B5FFF", data: [150, 160, 170, 184], path: "/app/industry/production" },
          { title: "Catalog Products", value: products.length || 84, trend: "In Production", isPositive: true, color: "#00D4FF", data: [80, 82, 83, 84], path: "/app/inventory" },
          { title: "Staff Roster", value: employees.length || 12, trend: "Fully Active", isPositive: true, color: "#7C3AED", data: [10, 11, 12, 12], path: "/app/hrms" },
          { title: "Total Billings", value: totalRevenue || 94200, prefix: currencySymbol, trend: "Stable", isPositive: true, color: "#EC4899", data: [92, 93, 94, 94.2], path: "/app/finance" },
          { title: "Customers Roster", value: customers.length || 3, trend: "Stable", isPositive: true, color: "#10B981", data: [5, 4, 3, 3], path: "/app/crm" }
        ];
      default:
        return [
          { title: "Revenue", value: totalRevenue || 2.8, prefix: currencySymbol, trend: "14.2%", isPositive: true, color: "#5B5FFF", data: [30, 40, 35, 50, 45, 60, 70, 80], path: "/app/finance" },
          { title: "Sales Transactions", value: transactions.filter(t => t.amount > 0).length || 18245, trend: "8.4%", isPositive: true, color: "#00D4FF", data: [20, 25, 30, 28, 35, 45, 50, 60], path: "/app/sales" },
          { title: "Active Customers", value: customers.length || 12500, trend: "5.1%", isPositive: true, color: "#7C3AED", data: [40, 45, 50, 55, 65, 75, 80, 85], path: "/app/crm" },
          { title: "Staff Count", value: employees.length || 48, trend: "Active", isPositive: true, color: "#EC4899", data: [45, 46, 48, 48], path: "/app/hrms" },
          { title: "Profit Margin", value: profitMargin || 15.2, suffix: "%", trend: "2.1%", isPositive: true, color: "#10B981", data: [10, 20, 15, 30, 40, 35, 50, 60], path: "/app/finance" }
        ];
    }
  };

  const kpis = getIndustryKPIs();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 relative z-10">
      {kpis.map((kpi, index) => (
        <KPICard key={kpi.title} {...kpi} delay={index * 0.1} />
      ))}
    </div>
  );
}
