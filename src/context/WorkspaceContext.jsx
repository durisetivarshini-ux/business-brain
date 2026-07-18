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
  transactions: [],
  meetings: []
};

// Sandbox generator based on industry
function getSandboxData(industry, currencySymbol) {
  const isINR = currencySymbol === '₹';
  const mult = isINR ? 100 : 1; // scale values for INR vs USD/EUR

  const now = new Date();
  
  // Meeting 1: Today, 3 hours 15 mins later
  const time1 = new Date(now.getTime() + 3 * 60 * 60 * 1000 + 15 * 60 * 1000);
  const dateStr1 = time1.toISOString().split('T')[0];
  const timeStr1 = time1.toTimeString().split(' ')[0].slice(0, 5);

  // Meeting 2: Yesterday
  const time2 = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr2 = time2.toISOString().split('T')[0];
  const timeStr2 = "11:00";

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
        ],
        meetings: [
          {
            id: 1,
            title: 'Weekly Kitchen Ops & Menu Sync',
            date: dateStr1,
            time: timeStr1,
            duration: '45 mins',
            priority: 'High',
            type: 'In-Person',
            participants: ['Vikram Singh', 'Neha Patel', 'Rohan Das'],
            agenda: 'Review ingredients waste logs, chef shift hours, and menu margins.',
            link: 'Manager Office',
            syncedWith: ['Google Calendar'],
            reminders: ['15m before'],
            status: 'Upcoming',
            brief: 'AI Briefing: Popular items sales rose 14% while delivery delays peaked at dinner hours. Proposed adding 2 backup delivery riders.',
            notes: null,
            tasksCreated: false
          }
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
        ],
        meetings: [
          {
            id: 1,
            title: 'ICU Telemetry Patient Load Sync',
            date: dateStr1,
            time: timeStr1,
            duration: '45 mins',
            priority: 'High',
            type: 'In-Person',
            participants: ['Dr. Amit Shah', 'Nurse Sunita Pillai'],
            agenda: 'Audit ICU bed load registry, examine telemetry logs, and coordinate shift rotations.',
            link: 'Conference Room B',
            syncedWith: ['Microsoft Outlook'],
            reminders: ['15m before', '1h before'],
            status: 'Upcoming',
            brief: 'AI Briefing: Dynamic hospital analytics report prepared. Total billing pipeline active. Patient registry stands at 3 active patients.',
            notes: null,
            tasksCreated: false
          }
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
        ],
        meetings: [
          {
            id: 1,
            title: 'Q3 Product Roadmap & Feature Review',
            date: dateStr1,
            time: timeStr1,
            duration: '45 mins',
            priority: 'High',
            type: 'Video Sync',
            participants: ['Tony Stark', 'Pepper Potts', 'Sarah Connor'],
            agenda: 'Review current AI Copilot features, alignment with enterprise goals, and plan the release schedule.',
            link: 'https://meet.google.com/xyz-qwe-asd',
            syncedWith: ['Google Calendar'],
            reminders: ['15m before', '1h before'],
            status: 'Upcoming',
            brief: 'AI Briefing: Company revenue is stable at ₹5,72,000. Key discussion points: AI feature stability, dev resource allocation, and Q3 goals.',
            notes: null,
            tasksCreated: false
          },
          {
            id: 2,
            title: 'Sprint Retrospective & Demo',
            date: dateStr2,
            time: timeStr2,
            duration: '30 mins',
            priority: 'Medium',
            type: 'Video Sync',
            participants: ['Sarah Connor', 'Miles Dyson'],
            agenda: 'Review completed issues in Sprint 12, demo AI Priority Sorter, and log obstacles.',
            link: 'https://meet.google.com/abc-mno-xyz',
            syncedWith: ['Google Calendar', 'Microsoft Outlook'],
            reminders: ['15m before'],
            status: 'Completed',
            brief: 'AI Briefing: Sprint velocity improved by 14%. Focus on payment sandbox tests and API schemas.',
            notes: {
              summary: 'Sprint 12 deliverables were demonstrated. The new AI Priority Sorter is stable. Miles raised concern over API timeout during load testing.',
              decisions: [
                'Approved rolling out Sprint 12 features to staging.',
                'Assigned API performance tuning to Miles.'
              ],
              tasks: [
                { assignee: 'Miles Dyson', task: 'Tune API gateway timeout limit to 10s.', due: 'Tomorrow' },
                { assignee: 'Sarah Connor', task: 'Deploy Sprint 12 QA patch.', due: 'Next Monday' }
              ]
            },
            tasksCreated: true
          }
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
    
    // 1. Initial Load from LocalStorage
    const configRaw = localStorage.getItem(`company_details_${userId}`);
    let localConfig = defaultWorkspaceConfig;
    if (configRaw) {
      try {
        localConfig = JSON.parse(configRaw);
      } catch (err) {
        console.error("Error parsing local workspace config", err);
      }
    }
    setWorkspaceConfig(localConfig);

    const dataRaw = localStorage.getItem(`company_business_data_${userId}`);
    let localData = defaultBusinessData;
    if (dataRaw) {
      try {
        localData = JSON.parse(dataRaw);
      } catch (err) {
        console.error("Error parsing local business data", err);
      }
    }
    setBusinessData(localData);

    // 2. Fetch/Restore from Backend on Authentication
    if (user && user.uid) {
      fetch(`/api/user/load-workspace?userId=${user.uid}&email=${user.email || ''}`)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 404) {
            // First time login: Migrate local guest configurations to account holder profile on server
            const guestConfigRaw = localStorage.getItem('company_details_guest');
            const guestDataRaw = localStorage.getItem('company_business_data_guest');
            
            let guestConfig = localConfig;
            let guestData = localData;

            try {
              if (guestConfigRaw) guestConfig = JSON.parse(guestConfigRaw);
              if (guestDataRaw) guestData = JSON.parse(guestDataRaw);
            } catch (e) {}

            // Save to current user's local storage
            localStorage.setItem(`company_details_${user.uid}`, JSON.stringify(guestConfig));
            localStorage.setItem(`company_business_data_${user.uid}`, JSON.stringify(guestData));
            
            // Backup guest data to account holder database
            fetch('/api/user/save-workspace', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.uid,
                email: user.email,
                workspaceConfig: guestConfig,
                businessData: guestData
              })
            }).catch(e => console.error("Error backing up guest workspace:", e));

            // Clean up guest local keys
            localStorage.removeItem('company_details_guest');
            localStorage.removeItem('company_business_data_guest');

            setWorkspaceConfig(guestConfig);
            setBusinessData(guestData);
            return null;
          }
          return null;
        })
        .then(data => {
          if (data && data.success) {
            console.log("[Workspace Sync] Workspace restored from backend database.");
            setWorkspaceConfig(data.workspaceConfig);
            setBusinessData(data.businessData);
            localStorage.setItem(`company_details_${user.uid}`, JSON.stringify(data.workspaceConfig));
            localStorage.setItem(`company_business_data_${user.uid}`, JSON.stringify(data.businessData));
          }
        })
        .catch(err => console.error("[Workspace Sync Error] Failed to load server workspace:", err));
    }
  }, [user]);

  const updateConfig = (newConfig) => {
    const userId = user?.uid || 'guest';
    const updated = { ...workspaceConfig, ...newConfig };
    setWorkspaceConfig(updated);
    localStorage.setItem(`company_details_${userId}`, JSON.stringify(updated));

    if (user && user.uid) {
      // Sync update with backend
      fetch('/api/user/save-workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          workspaceConfig: updated,
          businessData
        })
      }).catch(e => console.error("[Workspace Sync Error] Failed to save config to server:", e));
    }
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

    if (user && user.uid) {
      // Sync update with backend
      fetch('/api/user/save-workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          workspaceConfig,
          businessData: updatedData
        })
      }).catch(e => console.error("[Workspace Sync Error] Failed to save data to server:", e));
    }
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

  const updateRecord = (type, id, updatedFields) => {
    const list = businessData[type] || [];
    const updatedList = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    updateBusinessData({
      ...businessData,
      [type]: updatedList
    });
  };

  const deleteRecord = (type, id) => {
    const list = businessData[type] || [];
    const updatedList = list.filter(item => item.id !== id);
    updateBusinessData({
      ...businessData,
      [type]: updatedList
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
    updateRecord,
    deleteRecord,
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
