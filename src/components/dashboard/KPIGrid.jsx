import React from 'react';
import { KPICard } from './KPICard';

export function KPIGrid() {
  const kpis = [
    {
      title: "Revenue",
      value: 2.8,
      prefix: "₹",
      suffix: " Cr",
      trend: "14.2%",
      isPositive: true,
      color: "#5B5FFF",
      data: [30, 40, 35, 50, 45, 60, 70, 80]
    },
    {
      title: "Sales",
      value: 18245,
      trend: "8.4%",
      isPositive: true,
      color: "#00D4FF",
      data: [20, 25, 30, 28, 35, 45, 50, 60]
    },
    {
      title: "Customers",
      value: 12500,
      trend: "5.1%",
      isPositive: true,
      color: "#7C3AED",
      data: [40, 45, 50, 55, 65, 75, 80, 85]
    },
    {
      title: "Profit",
      value: 1.1,
      prefix: "₹",
      suffix: " Cr",
      trend: "2.1%",
      isPositive: false,
      color: "#EC4899",
      data: [50, 48, 45, 40, 35, 40, 38, 35]
    },
    {
      title: "Orders",
      value: 2840,
      trend: "12.5%",
      isPositive: true,
      color: "#10B981",
      data: [10, 20, 15, 30, 40, 35, 50, 60]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 relative z-10">
      {kpis.map((kpi, index) => (
        <KPICard key={kpi.title} {...kpi} delay={index * 0.1} />
      ))}
    </div>
  );
}
