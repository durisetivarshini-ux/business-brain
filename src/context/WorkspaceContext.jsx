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
  departments: ["Sales", "Marketing", "Finance", "HR", "Support", "Documents"],
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

const defaultBusinessData = {
  hasData: false,
  customers: [],
  employees: [],
  products: [],
  transactions: []
};

// Sandbox generator based on industry
function getSandboxData(industry, currencySymbol) {
  const isINR = currencySymbol === '₹';
  const mult = isINR ? 100 : 1; // scale values for INR vs USD/EUR

  switch (industry) {
    case 'Restaurant':
      return {
        hasData: true,
        customers: [
          { id: 1, name: "Arjun Mehta", contact: "arjun@mehta.com", status: "Active", value: 4500 * mult },
          { id: 2, name: "Priya Sharma", contact: "priya@sharma.com", status: "Active", value: 1200 * mult },
          { id: 3, name: "Rajesh Kumar", contact: "rajesh@kumar.com", status: "Active", value: 9500 * mult },
          { id: 4, name: "Ananya Sen", contact: "ananya@sen.com", status: "Active", value: 500 * mult },
        ],
        employees: [
          { id: 1, name: "Vikram Singh", role: "Head Chef", dept: "Kitchen", status: "Active", performance: "Excellent" },
          { id: 2, name: "Neha Patel", role: "Sous Chef", dept: "Kitchen", status: "Active", performance: "Top 10%" },
          { id: 3, name: "Rohan Das", role: "F&B Manager", dept: "Management", status: "Active", performance: "Outstanding" },
          { id: 4, name: "Kiran Rao", role: "Captain Waiter", dept: "Service", status: "Active", performance: "Excellent" },
        ],
        products: [
          { id: 1, sku: "ITEM-001", name: "Butter Chicken Special", stock: 120, price: 450 * mult, status: "Healthy" },
          { id: 2, sku: "ITEM-002", name: "Tandoori Roti", stock: 850, price: 40 * mult, status: "Healthy" },
          { id: 3, sku: "ITEM-003", name: "Paneer Tikka Platter", stock: 15, price: 320 * mult, status: "Low Stock" },
          { id: 4, sku: "ITEM-004", name: "Premium Basmati Rice", stock: 8, price: 180 * mult, status: "Critical" },
        ],
        transactions: [
          { id: "TX-1001", date: "Today, 10:42 AM", desc: "Zomato Sales Revenue", amount: 45000 * mult, status: "Completed", type: "income" },
          { id: "TX-1002", date: "Today, 09:15 AM", desc: "Swiggy Settlement Payout", amount: 32000 * mult, status: "Completed", type: "income" },
          { id: "TX-1003", date: "Yesterday", desc: "Meat & Poultry Vendor Supply", amount: -15000 * mult, status: "Completed", type: "expense" },
          { id: "TX-1004", date: "Yesterday", desc: "Fresh Organic Vegetables Supply", amount: -4200 * mult, status: "Completed", type: "expense" },
          { id: "TX-1005", date: "2 days ago", desc: "Table 4 Bill Receipt", amount: 2800 * mult, status: "Completed", type: "income" },
        ]
      };
    case 'Hospital':
      return {
        hasData: true,
        customers: [
          { id: 1, name: "Patient Ramesh Prasad", contact: "ramesh@prasad.com", status: "Admitted", value: 75000 * mult },
          { id: 2, name: "Patient Seema Varma", contact: "seema@varma.com", status: "Discharged", value: 12000 * mult },
          { id: 3, name: "Patient Vikram Malhotra", contact: "vikram@malhotra.com", status: "Admitted", value: 185000 * mult },
        ],
        employees: [
          { id: 1, name: "Dr. Amit Shah", role: "Chief Cardiologist", dept: "Cardiology", status: "Active", performance: "Outstanding" },
          { id: 2, name: "Dr. Shalini Roy", role: "Senior Pediatrician", dept: "Pediatrics", status: "Active", performance: "Excellent" },
          { id: 3, name: "Nurse Sunita Pillai", role: "ICU Head Nurse", dept: "Nursing", status: "Active", performance: "Top 5%" },
        ],
        products: [
          { id: 1, sku: "MED-001", name: "Cardiac Stent - Cobalt Chrome", stock: 45, price: 25000 * mult, status: "Healthy" },
          { id: 2, sku: "MED-002", name: "Amoxicillin 500mg (Box)", stock: 8, price: 450 * mult, status: "Low Stock" },
          { id: 3, sku: "MED-003", name: "Oxygen Cylinders 10L", stock: 12, price: 1800 * mult, status: "Healthy" },
        ],
        transactions: [
          { id: "TX-2001", date: "Today, 10:42 AM", desc: "IPD Billing - Patient V. Malhotra", amount: 185000 * mult, status: "Completed", type: "income" },
          { id: "TX-2002", date: "Yesterday", desc: "Pharmacy Stock Refill Delivery", amount: -45000 * mult, status: "Completed", type: "expense" },
          { id: "TX-2003", date: "Yesterday", desc: "OPD Consultation Fees Collected", amount: 24000 * mult, status: "Completed", type: "income" },
          { id: "TX-2004", date: "3 days ago", desc: "Medical Waste Disposal Service", amount: -8500 * mult, status: "Completed", type: "expense" },
        ]
      };
    case 'Software Company':
    default:
      return {
        hasData: true,
        customers: [
          { id: 1, name: "Acme Corp", contact: "billing@acme.com", status: "Active", value: 120000 * mult },
          { id: 2, name: "Global Tech Solutions", contact: "finance@globaltech.com", status: "Active", value: 350000 * mult },
          { id: 3, name: "Stark Industries", contact: "contracts@stark.com", status: "Active", value: 950000 * mult },
          { id: 4, name: "Wayne Enterprises", contact: "supplies@wayne.com", status: "Active", value: 500000 * mult },
        ],
        employees: [
          { id: 1, name: "Sarah Connor", role: "Head of AI Security", dept: "Engineering", status: "Active", performance: "Top 5%" },
          { id: 2, name: "Miles Dyson", role: "Lead Architect", dept: "Engineering", status: "Active", performance: "Excellent" },
          { id: 3, name: "Tony Stark", role: "Chief Technology Officer", dept: "Executive", status: "Active", performance: "Outstanding" },
          { id: 4, name: "Pepper Potts", role: "Chief Operating Officer", dept: "Executive", status: "Active", performance: "Excellent" },
        ],
        products: [
          { id: 1, sku: "SVR-001", name: "AI Core Analytics Node", stock: 45, price: 150000 * mult, status: "Healthy" },
          { id: 2, sku: "SVR-002", name: "BOS Enterprise License", stock: 1000, price: 95000 * mult, status: "Healthy" },
          { id: 3, sku: "SVR-003", name: "Edge Inference Micro-server", stock: 5, price: 45000 * mult, status: "Low Stock" },
          { id: 4, sku: "SVR-004", name: "SSL Security Cert (Annual)", stock: 12, price: 2500 * mult, status: "Healthy" },
        ],
        transactions: [
          { id: "TX-3001", date: "Today, 10:42 AM", desc: "Enterprise License (Acme Corp)", amount: 120000 * mult, status: "Completed", type: "income" },
          { id: "TX-3002", date: "Today, 09:15 AM", desc: "Stripe Payment Payout", amount: 452000 * mult, status: "Completed", type: "income" },
          { id: "TX-3003", date: "Yesterday", desc: "AWS Server Infrastructure Billing", amount: -124500 * mult, status: "Completed", type: "expense" },
          { id: "TX-3004", date: "Yesterday", desc: "Marketing Campaign Google Ads", amount: -25000 * mult, status: "Completed", type: "expense" },
          { id: "TX-3005", date: "3 days ago", desc: "Global Tech Initial Settlement", amount: 150000 * mult, status: "Completed", type: "income" },
        ]
      };
  }
}

export function WorkspaceProvider({ children }) {
  const { user } = useAuth();
  const [workspaceConfig, setWorkspaceConfig] = useState(defaultWorkspaceConfig);
  const [businessData, setBusinessData] = useState(defaultBusinessData);

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

    const dataRaw = localStorage.getItem(`company_business_data_${userId}`);
    if (dataRaw) {
      try {
        setBusinessData(JSON.parse(dataRaw));
      } catch (err) {
        console.error("Error parsing business data", err);
        setBusinessData(defaultBusinessData);
      }
    } else {
      setBusinessData(defaultBusinessData);
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

  const currencySymbol = getCurrencySymbol();
  const industry = workspaceConfig.customIndustry || 'Software Company';

  const updateBusinessData = (updatedData) => {
    const userId = user?.uid || 'guest';
    setBusinessData(updatedData);
    localStorage.setItem(`company_business_data_${userId}`, JSON.stringify(updatedData));
  };

  const populateSandboxData = () => {
    const sandbox = getSandboxData(industry, currencySymbol);
    updateBusinessData(sandbox);
  };

  const clearBusinessData = () => {
    updateBusinessData(defaultBusinessData);
  };

  const addRecord = (type, record) => {
    const list = businessData[type] || [];
    const updatedList = [...list, { id: Date.now(), ...record }];
    updateBusinessData({
      ...businessData,
      [type]: updatedList,
      hasData: true
    });
  };

  const importRecords = (type, list) => {
    const existing = businessData[type] || [];
    const updatedList = [...existing, ...list.map((item, idx) => ({ id: Date.now() + idx, ...item }))];
    updateBusinessData({
      ...businessData,
      [type]: updatedList,
      hasData: true
    });
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
    currencySymbol,
    industry,
    businessData,
    populateSandboxData,
    clearBusinessData,
    addRecord,
    importRecords
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
