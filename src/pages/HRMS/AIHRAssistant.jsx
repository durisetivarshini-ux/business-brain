import React from 'react';
import { InsightPanel } from '../../components/ui/InsightPanel';

export function AIHRAssistant() {
  const insights = [
    { text: "Employee satisfaction increased by 12% following the new WFH policy.", highlight: "increased by 12%" },
    { text: "Payroll is ready for processing.", highlight: "ready for processing" },
    { text: "18 leave requests require managerial approval.", highlight: "require managerial approval" },
    { text: "Marketing department needs recruitment to meet Q3 goals.", highlight: "needs recruitment" },
  ];

  return (
    <InsightPanel
      moduleName="HRMS"
      title="Workforce AI"
      subtitle="Culture & Talent"
      badgeText="HR Insights Active"
      description="I have analyzed employee sentiment, attendance records, and recruitment pipelines. Here are the critical HR actions needed today."
      insights={insights}
      themeColor="#00D4FF"
    />
  );
}
