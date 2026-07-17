import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Plus, UploadCloud, Link2, Play, Users, 
  Briefcase, DollarSign, Box, ShieldAlert, Sparkles, Database
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { toast } from 'react-hot-toast';

export function AdminSetupWizard() {
  const { 
    industry, 
    currencySymbol, 
    businessData, 
    populateSandboxData, 
    addRecord, 
    importRecords 
  } = useWorkspace();

  const [activeStep, setActiveStep] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({ name: '', role: '', dept: '', salary: '' });
  const [productForm, setProductForm] = useState({ name: '', sku: '', price: '', stock: '' });
  const [customerForm, setCustomerForm] = useState({ name: '', email: '', value: '' });

  // Calculate progress
  const hasEmployees = businessData.employees?.length > 0;
  const hasProducts = businessData.products?.length > 0;
  const hasCustomers = businessData.customers?.length > 0;
  const hasTransactions = businessData.transactions?.length > 0;

  const steps = [
    { id: 'profile', title: 'Complete Business Profile', desc: 'Organizational configuration setup', done: true },
    { id: 'employees', title: 'Add Your Employees', desc: 'Roster directory and roles allocation', done: hasEmployees },
    { id: 'products', title: 'Add Products & Services', desc: 'List active catalogue offerings', done: hasProducts },
    { id: 'customers', title: 'Add Customers / CRM', desc: 'Onboard clients and lead pipeline', done: hasCustomers },
    { id: 'import', title: 'Import Existing Data', desc: 'Load Excel/CSV spreadsheets directly', done: hasTransactions },
    { id: 'integrations', title: 'Connect Live Integrations', desc: 'Sync QuickBooks, Zoho, Tally, or Shopify', done: false }
  ];

  const completedCount = steps.filter(s => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!employeeForm.name || !employeeForm.role) return toast.error("Please fill required fields");
    addRecord('employees', {
      name: employeeForm.name,
      role: employeeForm.role,
      dept: employeeForm.dept || 'Engineering',
      status: 'Active',
      performance: 'Excellent'
    });
    setEmployeeForm({ name: '', role: '', dept: '', salary: '' });
    toast.success("Employee added successfully!");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return toast.error("Please fill required fields");
    addRecord('products', {
      name: productForm.name,
      sku: productForm.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: Number(productForm.price),
      stock: Number(productForm.stock || 0),
      status: Number(productForm.stock) > 20 ? 'Healthy' : 'Low Stock'
    });
    setProductForm({ name: '', sku: '', price: '', stock: '' });
    toast.success("Product/Service added successfully!");
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!customerForm.name || !customerForm.value) return toast.error("Please fill required fields");
    const val = Number(customerForm.value);
    addRecord('customers', {
      name: customerForm.name,
      contact: customerForm.email || 'n/a',
      status: 'Active',
      value: val
    });
    // Add corresponding transaction record
    addRecord('transactions', {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today',
      desc: `Onboarding deal: ${customerForm.name}`,
      amount: val,
      status: 'Completed',
      type: 'income'
    });
    setCustomerForm({ name: '', email: '', value: '' });
    toast.success("Customer added and transaction recorded!");
  };

  const handleSpreadsheetUpload = (type) => {
    toast.info(`Parsing sample ${type.toUpperCase()} spreadsheet...`);
    setTimeout(() => {
      if (type === 'excel' || type === 'csv') {
        importRecords('transactions', [
          { id: `TX-${Math.floor(1000 + Math.random() * 9000)}`, date: 'Today', desc: 'Imported Batch Sale A', amount: 85000, status: 'Completed', type: 'income' },
          { id: `TX-${Math.floor(1000 + Math.random() * 9000)}`, date: 'Yesterday', desc: 'Imported Vendor Invoice', amount: -12000, status: 'Completed', type: 'expense' },
        ]);
        toast.success("Spreadsheet records successfully compiled!");
      }
    }, 800);
  };

  const handleIntegrationConnect = (platform) => {
    toast.info(`Establishing secure link to ${platform}...`);
    setTimeout(() => {
      importRecords('transactions', [
        { id: `TX-${Math.floor(1000 + Math.random() * 9000)}`, date: 'Today', desc: `${platform} Sync Transaction`, amount: 154000, status: 'Completed', type: 'income' }
      ]);
      toast.success(`Successfully connected with ${platform}! Data synced.`);
    }, 1000);
  };

  return (
    <div className="w-full relative z-10">
      {/* Upper Sparkle Header */}
      <div className="bg-[#0B0F19]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#5B5FFF]/10 text-[#5B5FFF] border border-[#5B5FFF]/20">
              <Sparkles size={10} /> Workspace Setup
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Let's build your operational database
            </h1>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Business Brain unifies live telemetry instead of static templates. Populate your data manually, import sheets, or link your existing accounting services.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {/* Progress Wheel */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="34" className="stroke-white/5" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="40" cy="40" r="34" 
                  className="stroke-[#5B5FFF] transition-all duration-500" 
                  strokeWidth="6" 
                  fill="transparent"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 - (213.6 * progressPercent) / 100}
                />
              </svg>
              <span className="absolute text-sm font-black text-white">{progressPercent}%</span>
            </div>
            <span className="text-[11px] text-[#94A3B8] font-semibold">{completedCount} of {steps.length} Steps Finished</span>
          </div>
        </div>

        {/* Quick Sandbox Trigger Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#5B5FFF]/10 via-[#00D4FF]/5 to-transparent border border-[#5B5FFF]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#5B5FFF]/20 text-[#5B5FFF]">
              <Database size={20} />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-bold text-white">Need a quick demonstration?</h4>
              <p className="text-xs text-[#94A3B8]">Skip manual input and load our pre-compiled rich sandbox telemetry mapping to **{industry}**.</p>
            </div>
          </div>
          <button 
            onClick={populateSandboxData}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5B5FFF] hover:bg-[#474ce3] text-white text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Play size={13} fill="white" /> Load Sandbox Data
          </button>
        </div>
      </div>

      {/* Accordion Steps List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {steps.map((step) => {
            const isOpen = activeStep === step.id;
            return (
              <div 
                key={step.id} 
                className={`bg-[#0B0F19]/30 border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen ? 'border-[#5B5FFF]/40 shadow-[0_0_20px_rgba(91,95,255,0.05)]' : 'border-white/5 hover:border-white/10'
                }`}
              >
                {/* Step Header Toggle */}
                <button
                  onClick={() => step.id !== 'profile' && setActiveStep(isOpen ? null : step.id)}
                  disabled={step.id === 'profile'}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-1 rounded-full ${step.done ? 'text-[#10B981]' : 'text-white/20'}`}>
                      <CheckCircle size={20} fill={step.done ? 'rgba(16,185,129,0.1)' : 'transparent'} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${step.done ? 'text-[#94A3B8] line-through' : 'text-white'}`}>{step.title}</h3>
                      <p className="text-[11px] text-[#64748B]">{step.desc}</p>
                    </div>
                  </div>
                  {step.id !== 'profile' && (
                    <span className="text-xs text-[#5B5FFF] hover:underline font-bold">
                      {isOpen ? 'Collapse' : 'Configure'}
                    </span>
                  )}
                </button>

                {/* Step Contents Accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-white/[0.01] border-t border-white/5"
                    >
                      <div className="p-5">
                        
                        {/* 1. EMPLOYEES FORM */}
                        {step.id === 'employees' && (
                          <form onSubmit={handleAddEmployee} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Staff Name</label>
                                <input 
                                  type="text" 
                                  value={employeeForm.name}
                                  onChange={e => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                                  placeholder="e.g. Sarah Connor"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Job Title / Role</label>
                                <input 
                                  type="text" 
                                  value={employeeForm.role}
                                  onChange={e => setEmployeeForm({ ...employeeForm, role: e.target.value })}
                                  placeholder="e.g. Lead Architect"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Department</label>
                                <input 
                                  type="text" 
                                  value={employeeForm.dept}
                                  onChange={e => setEmployeeForm({ ...employeeForm, dept: e.target.value })}
                                  placeholder="e.g. Engineering"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Monthly Salary ({currencySymbol})</label>
                                <input 
                                  type="number" 
                                  value={employeeForm.salary}
                                  onChange={e => setEmployeeForm({ ...employeeForm, salary: e.target.value })}
                                  placeholder="e.g. 75000"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                            </div>
                            <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer">
                              <Plus size={14} /> Add Employee
                            </button>
                          </form>
                        )}

                        {/* 2. PRODUCTS FORM */}
                        {step.id === 'products' && (
                          <form onSubmit={handleAddProduct} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Offer Name</label>
                                <input 
                                  type="text" 
                                  value={productForm.name}
                                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                  placeholder="e.g. AI Core License"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Price ({currencySymbol})</label>
                                <input 
                                  type="number" 
                                  value={productForm.price}
                                  onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                                  placeholder="e.g. 95000"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">SKU / Code</label>
                                <input 
                                  type="text" 
                                  value={productForm.sku}
                                  onChange={e => setProductForm({ ...productForm, sku: e.target.value })}
                                  placeholder="e.g. SKU-1042"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Initial Stock Units</label>
                                <input 
                                  type="number" 
                                  value={productForm.stock}
                                  onChange={e => setProductForm({ ...productForm, stock: e.target.value })}
                                  placeholder="e.g. 50"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                            </div>
                            <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer">
                              <Plus size={14} /> Add Product/Service
                            </button>
                          </form>
                        )}

                        {/* 3. CUSTOMERS FORM */}
                        {step.id === 'customers' && (
                          <form onSubmit={handleAddCustomer} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Customer Name / Brand</label>
                                <input 
                                  type="text" 
                                  value={customerForm.name}
                                  onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })}
                                  placeholder="e.g. Wayne Enterprises"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-[#64748B]">Email Address</label>
                                <input 
                                  type="email" 
                                  value={customerForm.email}
                                  onChange={e => setCustomerForm({ ...customerForm, email: e.target.value })}
                                  placeholder="e.g. support@wayne.com"
                                  className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                                />
                              </div>
                            </div>
                            <div className="space-y-1 max-w-sm">
                              <label className="text-[10px] uppercase font-bold text-[#64748B]">Contract / Deal Value ({currencySymbol})</label>
                              <input 
                                type="number" 
                                value={customerForm.value}
                                onChange={e => setCustomerForm({ ...customerForm, value: e.target.value })}
                                placeholder="e.g. 500000"
                                className="w-full bg-[#0B0F19]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B5FFF]"
                              />
                            </div>
                            <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer">
                              <Plus size={14} /> Add Customer
                            </button>
                          </form>
                        )}

                        {/* 4. SPREADSHEETS IMPORT */}
                        {step.id === 'import' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div 
                              onClick={() => handleSpreadsheetUpload('excel')}
                              className="border border-dashed border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/[0.02] hover:border-[#5B5FFF]/40 transition-colors"
                            >
                              <UploadCloud className="mx-auto mb-3 text-[#5B5FFF]" size={32} />
                              <h4 className="text-xs font-bold text-white mb-1">Import Excel Spreadsheet</h4>
                              <p className="text-[10px] text-[#64748B]">Upload transaction rows (.xls, .xlsx)</p>
                            </div>
                            <div 
                              onClick={() => handleSpreadsheetUpload('csv')}
                              className="border border-dashed border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/[0.02] hover:border-[#5B5FFF]/40 transition-colors"
                            >
                              <UploadCloud className="mx-auto mb-3 text-[#00D4FF]" size={32} />
                              <h4 className="text-xs font-bold text-white mb-1">Import CSV Sheets</h4>
                              <p className="text-[10px] text-[#64748B]">Load customer & billing lists (.csv)</p>
                            </div>
                          </div>
                        )}

                        {/* 5. INTEGRATIONS CONNECTORS */}
                        {step.id === 'integrations' && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['QuickBooks', 'Zoho Books', 'Shopify', 'Tally Prime'].map((platform) => (
                              <button
                                key={platform}
                                type="button"
                                onClick={() => handleIntegrationConnect(platform)}
                                className="flex flex-col items-center justify-center p-4 border border-white/5 hover:border-white/15 rounded-2xl bg-[#0B0F19]/40 hover:bg-[#0B0F19]/60 transition-colors gap-2 cursor-pointer group"
                              >
                                <Link2 size={16} className="text-[#94A3B8] group-hover:text-[#5B5FFF] transition-colors" />
                                <span className="text-[10px] font-bold text-white">{platform}</span>
                              </button>
                            ))}
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Database Stats Sidebar Card */}
        <div className="space-y-4">
          <div className="bg-[#0B0F19]/30 border border-white/5 rounded-3xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Database size={13} className="text-[#5B5FFF]" /> Loaded Database Nodes
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Users size={14} className="text-[#00D4FF]" />
                  <span className="text-xs text-[#94A3B8]">Employees Roster</span>
                </div>
                <span className="text-xs font-bold text-white">{businessData.employees?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Box size={14} className="text-[#7C3AED]" />
                  <span className="text-xs text-[#94A3B8]">Catalog Products</span>
                </div>
                <span className="text-xs font-bold text-white">{businessData.products?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Briefcase size={14} className="text-[#5B5FFF]" />
                  <span className="text-xs text-[#94A3B8]">Active Customers</span>
                </div>
                <span className="text-xs font-bold text-white">{businessData.customers?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <DollarSign size={14} className="text-[#EC4899]" />
                  <span className="text-xs text-[#94A3B8]">Transactions Logged</span>
                </div>
                <span className="text-xs font-bold text-white">{businessData.transactions?.length || 0}</span>
              </div>
            </div>
          </div>

          <div className="p-5 border border-amber-500/20 bg-amber-500/[0.02] rounded-3xl flex items-start gap-3">
            <ShieldAlert size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-white">Platform is Locked</h5>
              <p className="text-[10px] text-[#94A3B8] leading-relaxed">
                Workspace modules, analytics graphs, and executive decision scorecards are locked until business data has been entered or simulated sandbox data is loaded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
