import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const WorkspaceContext = createContext();

const defaultWorkspaceConfig = {
  companyName: "Business Brain Enterprise",
  industryType: "Software Company",
  employeeCount: "26-50 Employees",
  currency: "INR",
  country: "India",
  state: "Karnataka",
  timezone: "(+05:30) India Standard Time (Asia/Kolkata)",
  foundedYear: "2026",
  website: "businessbrain.ai",
  linkedin: "linkedin.com/company/business-brain",
  logoUrl: "",
  address: "Bengaluru, India",
  branchType: "Hybrid",
  
  // Model
  offerings: "Both",
  targetCustomers: ["B2B", "B2C"],
  revenueModel: "SaaS",
  companyDesc: "AI-powered business operating system orchestrator.",

  // Departments
  departments: ["Sales", "Marketing", "Finance", "HR", "Support", "Inventory"],
  customIndustry: "Software Company",

  // Operations
  sellOnline: "Yes",
  manageInventory: "Yes",
  manageSuppliers: "Yes",
  needsCRM: "Yes",
  needsHR: "Yes",
  needsPayroll: "Yes",
  needsAttendance: "Yes",
  needsProjectManagement: "Yes",
  needsAssetTracking: "Yes",
  needsDocManagement: "Yes",
  needsSupportPortal: "Yes",
  needsMarketingAuto: "Yes",
  needsAIChatbot: "Yes",

  // Finance Setup
  financialYear: "April-March",
  accountingMethod: "Accrual",
  taxMethod: "GST",
  taxPercentage: "18",
  invoiceFormat: "INV-{YYYY}-{0000}",
  paymentMethods: ["UPI", "Cash", "Card", "Net Banking"],
  
  // Sales Setup
  pipelineStages: ["Lead", "Contacted", "Proposal Sent", "Negotiation", "Closed Won"],
  salesTargets: "5000000",
  
  // HR Setup
  officeTiming: "09:00 - 18:00",
  workingDays: "5 Days",
  leavePolicy: "18 Paid Leaves",
  attendanceMethod: "Biometric",
  payrollFrequency: "Monthly",
  
  // AI Config
  businessChallenges: ["Growing Sales", "Automation", "Decision Making"],
  aiTasks: ["Predict Revenue", "Forecast Cash Flow", "Automate Tasks", "Track KPIs"],
  
  // Goals
  goals: ["Increase Revenue", "Improve Productivity", "Digital Transformation"],
  growthPercentage: "25",
  targetRevenue: "5000000",
  
  // Integrations
  integrations: ["Google Workspace", "Slack", "Stripe", "GitHub", "AWS"]
};

export function WorkspaceProvider({ children }) {
  const { user } = useAuth();
  const [workspaceConfig, setWorkspaceConfig] = useState(defaultWorkspaceConfig);

  useEffect(() => {
    const userId = user?.uid || 'guest';
    const configRaw = localStorage.getItem(`company_details_${userId}`);
    if (configRaw) {
      try {
        setWorkspaceConfig(JSON.parse(configRaw));
      } catch (err) {
        console.error("Error parsing workspace config", err);
        setWorkspaceConfig(defaultWorkspaceConfig);
      }
    } else {
      setWorkspaceConfig(defaultWorkspaceConfig);
    }
  }, [user]);

  const updateConfig = (newConfig) => {
    const userId = user?.uid || 'guest';
    const updated = { ...workspaceConfig, ...newConfig };
    setWorkspaceConfig(updated);
    localStorage.setItem(`company_details_${userId}`, JSON.stringify(updated));
  };

  const getCurrencySymbol = () => {
    switch (workspaceConfig.currency) {
      case 'INR': return '₹';
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      case 'AUD': return 'A$';
      default: return '$';
    }
  };

  const isModuleActive = (moduleName) => {
    // Check departments checkmark
    const hasDept = workspaceConfig.departments?.includes(moduleName);
    
    // Check operation requirements mapping
    if (moduleName === 'HR' && workspaceConfig.needsHR === 'No') return false;
    if (moduleName === 'Inventory' && workspaceConfig.manageInventory === 'No') return false;
    if (moduleName === 'CRM' && workspaceConfig.needsCRM === 'No') return false;
    
    return hasDept || true; // defaults to active if not mapped to a toggle
  };

  const value = {
    workspaceConfig,
    updateConfig,
    isModuleActive,
    currencySymbol: getCurrencySymbol(),
    industry: workspaceConfig.customIndustry || 'Software Company'
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
