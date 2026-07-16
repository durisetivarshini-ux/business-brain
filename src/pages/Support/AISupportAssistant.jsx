import React from 'react';
import { InsightPanel } from '../../components/ui/InsightPanel';

export function AISupportAssistant() {
  const insights = [
    { text: "92% tickets resolved within SLA (Service Level Agreement).", highlight: "resolved within SLA" },
    { text: "AI resolved 128 tickets automatically using Knowledge Base.", highlight: "resolved 128 tickets automatically" },
    { text: "Customer satisfaction increased 8% in the last 24 hours.", highlight: "increased 8%" },
    { text: "14 customers require immediate attention due to high sentiment risk.", highlight: "require immediate attention" },
  ];

  return (
    <InsightPanel
      moduleName="Support"
      title="CX Assistant"
      subtitle="Helpdesk Insights"
      badgeText="Resolution AI Active"
      description="I've monitored incoming live chats, active email tickets, and social mentions. Here are the top priority support actions for your team."
      insights={insights}
      themeColor="#5B5FFF"
    />
  );
}
