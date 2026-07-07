export const mockCustomers = [
  { name: "Acme Corp", contact: "john@acme.com", status: "Active", value: "$45,000" },
  { name: "Global Tech", contact: "sarah@global.tech", status: "Negotiating", value: "$120,000" },
  { name: "Stark Industries", contact: "tony@stark.com", status: "Active", value: "$950,000" },
  { name: "Wayne Enterprises", contact: "bruce@wayne.com", status: "Lead", value: "$500,000" },
  { name: "Cyberdyne", contact: "miles@cyberdyne.net", status: "Churned", value: "$0" },
];

export const mockTransactions = [
  { id: "TX-9021", date: "Today, 10:42 AM", desc: "AWS Cloud Services", amount: "-$12,450.00", status: "Completed" },
  { id: "TX-9022", date: "Today, 09:15 AM", desc: "Stripe Payout", amount: "+$45,200.00", status: "Completed" },
  { id: "TX-9023", date: "Yesterday", desc: "Q3 Marketing Budget", amount: "-$25,000.00", status: "Pending" },
  { id: "TX-9024", date: "Yesterday", desc: "Enterprise License (Acme Corp)", amount: "+$120,000.00", status: "Completed" },
];

export const mockEmployees = [
  { name: "Sarah Connor", role: "Head of AI Security", dept: "Engineering", status: "Active", performance: "Top 5%" },
  { name: "Miles Dyson", role: "Lead Developer", dept: "Engineering", status: "Active", performance: "Excellent" },
  { name: "Tony Stark", role: "Chief Technology Officer", dept: "Executive", status: "Away", performance: "Outstanding" },
  { name: "Pepper Potts", role: "Operations Manager", dept: "Operations", status: "Active", performance: "Excellent" },
];

export const mockInventory = [
  { sku: "SKU-9921", name: "Quantum Processor Node", stock: 124, status: "Healthy", trend: "Stable" },
  { sku: "SKU-9922", name: "Neural Engine Accelerator", stock: 12, status: "Low Stock", trend: "High Demand" },
  { sku: "SKU-9923", name: "Enterprise Server Rack", stock: 45, status: "Healthy", trend: "Stable" },
  { sku: "SKU-9924", name: "Titanium Chassis", stock: 890, status: "Overstocked", trend: "Low Demand" },
  { sku: "SKU-9925", name: "Cooling Manifold V2", stock: 0, status: "Out of Stock", trend: "Critical" },
];

export const mockCampaigns = [
  { name: "Q3 Enterprise Launch", status: "Active", spend: "$12,400", conversions: 432, roas: "2.4x" },
  { name: "Retargeting - SMB", status: "Active", spend: "$4,200", conversions: 124, roas: "1.8x" },
  { name: "AI Webinar Series", status: "Draft", spend: "$0", conversions: 0, roas: "N/A" },
  { name: "Cold Email Sequence V2", status: "Paused", spend: "$1,200", conversions: 45, roas: "1.1x" },
];

export const mockTickets = [
  { id: "T-1042", subject: "API Integration Failing", user: "Acme Corp", priority: "High", status: "Open", time: "10m ago" },
  { id: "T-1041", subject: "Billing issue with Q3 invoice", user: "Global Tech", priority: "Medium", status: "In Progress", time: "2h ago" },
  { id: "T-1040", subject: "Feature Request: Custom Dashboards", user: "Stark Industries", priority: "Low", status: "Closed", time: "1d ago" },
  { id: "T-1039", subject: "Unable to invite team members", user: "Wayne Ent", priority: "High", status: "Escalated", time: "1d ago" },
];
