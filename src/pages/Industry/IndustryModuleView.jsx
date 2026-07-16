import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { 
  Utensils, Calendar, Users, ShoppingCart, Activity, ShieldAlert, 
  Cpu, FileText, Database, Layers, CheckCircle2, AlertTriangle, Clock,
  Play, Plus, Search, DollarSign, Heart, Award, ArrowUpRight, Zap, X, Terminal, GitBranch, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useWorkspace } from '@/context/WorkspaceContext';

export function IndustryModuleView() {
  const { moduleId } = useParams();
  const { workspaceConfig: config } = useWorkspace();
  
  // ── STATES & DATA FOR RESTAURANT ──
  const [restaurantOrders, setRestaurantOrders] = useState([
    { id: '101', table: 'Table 4', items: '1x Veg Supreme Pizza, 2x Garlic Bread', time: '12 mins ago', status: 'Preparing' },
    { id: '102', table: 'Table 12', items: '2x Double Cheese Burger, 1x Coke Large', time: '8 mins ago', status: 'Preparing' },
    { id: '103', table: 'Delivery #492', items: '1x Spaghetti Carbonara, 1x Tiramisu', time: '4 mins ago', status: 'Queued' }
  ]);

  const completeOrder = (id) => {
    setRestaurantOrders(restaurantOrders.filter(o => o.id !== id));
    toast.success(`Order #${id} marked as prepared & sent!`);
  };

  // ── STATES & DATA FOR HOSPITAL ──
  const [patients, setPatients] = useState([
    { id: 'P-301', name: 'Rohan Sharma', age: 34, gender: 'Male', room: 'ICU-102', vitals: { pulse: 78, bp: '120/80', temp: '98.6°F' }, status: 'Stable' },
    { id: 'P-302', name: 'Sarah Connor', age: 48, gender: 'Female', room: 'Ward B-4', vitals: { pulse: 92, bp: '135/88', temp: '100.2°F' }, status: 'Under Observation' },
    { id: 'P-303', name: 'David Miller', age: 62, gender: 'Male', room: 'ICU-108', vitals: { pulse: 64, bp: '110/70', temp: '97.9°F' }, status: 'Critical' }
  ]);

  const requestMedicalCheck = (id, name) => {
    setPatients(patients.map(p => p.id === id ? { ...p, vitals: { ...p.vitals, pulse: Math.floor(Math.random() * (90 - 70) + 70) } } : p));
    toast.success(`Telemetry check sent to nurse station for patient ${name}.`);
  };

  // ── STATES & DATA FOR RETAIL ──
  const [posCart, setPosCart] = useState([]);
  const posInventory = [
    { id: 1, name: 'Wireless Mouse Pro', price: 49.99, stock: 12 },
    { id: 2, name: 'Mechanical Keyboard RGB', price: 129.99, stock: 8 },
    { id: 3, name: 'UltraWide Monitor 34"', price: 399.99, stock: 3 },
    { id: 4, name: 'USB-C Docking Station', price: 79.99, stock: 15 }
  ];

  const addToCart = (item) => {
    const existing = posCart.find(c => c.id === item.id);
    if (existing) {
      setPosCart(posCart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setPosCart([...posCart, { ...item, qty: 1 }]);
    }
  };

  const clearCart = () => {
    setPosCart([]);
    toast.success("Checkout successful! Invoice generated & saved.");
  };

  const cartTotal = posCart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  // ── STATES & DATA FOR SOFTWARE DEV PIPELINES ──
  const [pipelines, setPipelines] = useState([
    { id: 'run-892', branch: 'main', trigger: 'Git Commit', duration: '45s', progress: 100, status: 'Success' },
    { id: 'run-893', branch: 'hotfix/auth-leak', trigger: 'Manual', duration: '1m 12s', progress: 100, status: 'Success' },
    { id: 'run-894', branch: 'feat/billing-upi', trigger: 'Webhook', duration: 'Running...', progress: 65, status: 'Building' }
  ]);

  // Simulated auto-increment building progress
  useEffect(() => {
    const timer = setInterval(() => {
      setPipelines(prev => prev.map(p => {
        if (p.status === 'Building') {
          const nextProg = p.progress + 15;
          if (nextProg >= 100) {
            toast.success(`Pipeline run ${p.id} finished successfully! 🚀`);
            return { ...p, progress: 100, status: 'Success', duration: '1m 30s' };
          }
          return { ...p, progress: nextProg };
        }
        return p;
      }));
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const triggerNewPipeline = () => {
    const newId = `run-${Math.floor(Math.random() * (999 - 800) + 800)}`;
    const newRun = {
      id: newId,
      branch: 'main',
      trigger: 'Manual',
      duration: 'Running...',
      progress: 10,
      status: 'Building'
    };
    setPipelines([newRun, ...pipelines]);
    toast.success(`Triggered new pipeline run ${newId}!`);
  };

  const rollbackLatest = () => {
    toast.success("Initiating deployment rollback to version v2.3.9...");
    setTimeout(() => {
      setPipelines(prev => prev.map((p, idx) => idx === 0 ? { ...p, status: 'Success', progress: 100, branch: 'v2.3.9-rollback' } : p));
      toast.success("Rollback successful. Version v2.3.9 active.");
    }, 2000);
  };

  // ── STATES & DATA FOR QA TEST CASES ──
  const [testCases, setTestCases] = useState([
    { id: 'TC-101', title: 'Verify User Login with MFA Multi-Factor', suite: 'Auth Suite', priority: 'High', status: 'Passed' },
    { id: 'TC-102', title: 'UPI Payment Checkout Flow Gateway Response', suite: 'Billing Suite', priority: 'Critical', status: 'Failed' },
    { id: 'TC-103', title: 'Auto-save draft on doc edit session loss', suite: 'Editor Suite', priority: 'Medium', status: 'Passed' }
  ]);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [newTcTitle, setNewTcTitle] = useState('');
  const [newTcSuite, setNewTcSuite] = useState('Auth Suite');
  const [newTcPriority, setNewTcPriority] = useState('Medium');

  const addTestCase = (e) => {
    e.preventDefault();
    if (!newTcTitle.trim()) return;
    const newId = `TC-${Math.floor(Math.random() * (200 - 104) + 104)}`;
    const newCase = {
      id: newId,
      title: newTcTitle,
      suite: newTcSuite,
      priority: newTcPriority,
      status: 'Passed' // default pass
    };
    setTestCases([...testCases, newCase]);
    setNewTcTitle('');
    setIsTestModalOpen(false);
    toast.success(`Test case ${newId} created successfully.`);
  };

  const runAllTests = () => {
    toast.loading("Executing test suite run...");
    setTimeout(() => {
      toast.dismiss();
      setTestCases(prev => prev.map(tc => ({ ...tc, status: 'Passed' })));
      toast.success("All test cases completed successfully with 0 failures!");
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none pb-12">
      
      {/* ── 1. RESTAURANT KITCHEN VIEW ── */}
      {moduleId === 'kitchen' && (
        <>
          <ModuleHeader title="Kitchen Display System" category="Restaurant Operations" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantOrders.map(order => (
              <GlassCard key={order.id} className="p-6 border-white/10 bg-[#0B1120]/80">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-0.5 rounded-full">{order.table}</span>
                  <span className="text-xs text-[#94A3B8] flex items-center gap-1"><Clock size={12}/> {order.time}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">Order ID: #{order.id}</h3>
                <p className="text-xs text-[#94A3B8] mb-6 min-h-[40px] leading-relaxed">{order.items}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => completeOrder(order.id)}
                    className="w-full py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 size={14} /> Mark Prepared
                  </button>
                </div>
              </GlassCard>
            ))}
            {restaurantOrders.length === 0 && (
              <div className="col-span-3 text-center py-12 text-[#94A3B8] text-sm">✓ No pending orders in preparation.</div>
            )}
          </div>
        </>
      )}

      {/* ── 2. HOSPITAL PATIENTS VIEW ── */}
      {moduleId === 'patients' && (
        <>
          <ModuleHeader title="Patient Telemetry Registry" category="Hospital Clinic Core" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patients.map(p => (
              <GlassCard key={p.id} className="p-6 border-white/10 bg-[#0B1120]/80">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-[#94A3B8]">{p.gender}, {p.age} yrs • Room {p.room}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    p.status === 'Stable' ? 'bg-[#10B981]/10 text-[#10B981]' : 
                    p.status === 'Critical' ? 'bg-rose-500/10 text-rose-500 animate-pulse' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {p.status}
                  </span>
                </div>
                
                {/* Vitals telemetry panel */}
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8] flex items-center gap-1"><Heart size={12} className="text-rose-500"/> Heart Rate:</span>
                    <span className="font-bold text-white">{p.vitals.pulse} BPM</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8] flex items-center gap-1"><Activity size={12} className="text-[#00D4FF]"/> Blood Pressure:</span>
                    <span className="font-bold text-white">{p.vitals.bp} mmHg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8] flex items-center gap-1"><Award size={12} className="text-amber-500"/> Temperature:</span>
                    <span className="font-bold text-white">{p.vitals.temp}</span>
                  </div>
                </div>

                <button 
                  onClick={() => requestMedicalCheck(p.id, p.name)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Request Medical Check
                </button>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {/* ── 3. RETAIL POINT-OF-SALE VIEW ── */}
      {moduleId === 'pos' && (
        <>
          <ModuleHeader title="Cashier POS Checkout Station" category="Retail POS Terminals" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Catalog Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {posInventory.map(item => (
                <GlassCard key={item.id} className="p-5 border-white/5 hover:border-white/15 transition-all bg-[#0B1120]/50 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-[#94A3B8] mt-1">${item.price}</p>
                    <span className="text-[10px] text-white/30 block mt-2">In stock: {item.stock}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="p-2.5 rounded-xl bg-[#5B5FFF] hover:bg-[#4c4edf] text-white transition-colors cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </GlassCard>
              ))}
            </div>

            {/* Cart checkout card */}
            <div className="lg:col-span-4">
              <GlassCard className="p-6 border-white/10 bg-[#0B1120] flex flex-col h-[340px]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <ShoppingCart size={16} className="text-[#00D4FF]" /> Active Billing Cart
                </h3>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
                  {posCart.map(c => (
                    <div key={c.id} className="flex justify-between items-center text-xs text-white">
                      <span className="truncate max-w-[150px]">{c.name} (x{c.qty})</span>
                      <span className="font-bold">${(c.price * c.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  {posCart.length === 0 && (
                    <div className="text-center py-10 text-white/20 text-xs">Cart is empty</div>
                  )}
                </div>

                <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                  <div className="flex justify-between text-xs text-[#94A3B8]">
                    <span>Subtotal:</span>
                    <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#00D4FF] font-bold">
                    <span>Grand Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={clearCart}
                    disabled={posCart.length === 0}
                    className="w-full py-2.5 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold rounded-xl text-xs disabled:opacity-40 cursor-pointer"
                  >
                    Generate Invoice & Cashout
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </>
      )}

      {/* ── 4. SOFTWARE DEVOPS VIEW ── */}
      {moduleId === 'devops' && (
        <>
          <ModuleHeader title="Cloud Operations & Telemetry" category="DevOps / Infrastructure" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Cpu size={16} className="text-[#00D4FF] animate-pulse" /> Kubernetes Clusters
              </h3>
              <div className="space-y-3 text-xs text-[#94A3B8]">
                <div className="flex justify-between"><span>Pods active:</span><span className="text-white font-bold">14 / 14</span></div>
                <div className="flex justify-between"><span>Node CPU:</span><span className="text-[#10B981] font-bold">42%</span></div>
                <div className="flex justify-between"><span>RAM allocation:</span><span className="text-white font-bold">8.2 GB / 16 GB</span></div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Layers size={16} className="text-[#7C3AED]" /> Active Deployments
              </h3>
              <div className="space-y-2">
                {['main-api-service', 'auth-gatekeeper', 'analytics-db-worker'].map((service, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white/[0.02] rounded-lg">
                    <span className="text-xs text-white font-mono">{service}</span>
                    <span className="text-[10px] bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded font-bold">Active</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" /> Automated Telemetry Alerts
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">AI engine reports all database replications completed successfully in region us-east-1.</p>
              </div>
              <button 
                onClick={() => toast.success("Deployment logs synchronized")}
                className="w-full py-2 bg-[#5B5FFF] hover:bg-[#4c4edf] text-white rounded-xl text-xs font-semibold mt-4 transition-all cursor-pointer"
              >
                Sync Docker Registry
              </button>
            </GlassCard>
          </div>
        </>
      )}

      {/* ── 5. SOFTWARE DEVELOPMENT (Dev Pipelines) VIEW ── */}
      {moduleId === 'development' && (
        <>
          <ModuleHeader 
            title="CI/CD Build Pipelines" 
            category="Development Hub" 
            primaryAction={{
              label: "Run New Pipeline",
              onClick: triggerNewPipeline,
              icon: <Play size={14} />
            }}
            secondaryAction={{
              label: "Rollback Build",
              onClick: rollbackLatest,
              icon: <RefreshCw size={14} />
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="lg:col-span-2 p-6 border-white/5 bg-[#0B1120]/60">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Terminal size={16} className="text-[#00D4FF]" /> Active Pipeline Executions
              </h3>
              <div className="space-y-4">
                {pipelines.map(run => (
                  <div key={run.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <GitBranch size={16} className="text-[#94A3B8]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{run.id}</span>
                          <span className="text-[10px] text-[#94A3B8] font-mono bg-white/5 px-1.5 py-0.5 rounded">{run.branch}</span>
                        </div>
                        <span className="text-[10px] text-[#64748b] mt-0.5 block">Triggered by {run.trigger}</span>
                      </div>
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between text-[10px] text-[#94A3B8] mb-1">
                        <span>Progress</span>
                        <span>{run.progress}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#00D4FF] h-full transition-all duration-500" style={{ width: `${run.progress}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between md:justify-end">
                      <span className="text-[10px] font-mono text-[#94A3B8]">{run.duration}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        run.status === 'Success' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#00D4FF]/10 text-[#00D4FF] animate-pulse'
                      }`}>{run.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu size={16} className="text-[#7C3AED]" /> Branch Settings
              </h3>
              <div className="space-y-3 text-xs text-[#94A3B8]">
                <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                  <span className="text-[10px] text-white/30 block mb-1">Default Branch</span>
                  <span className="font-bold text-white font-mono text-xs">main</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                  <span className="text-[10px] text-white/30 block mb-1">Total Branches</span>
                  <span className="font-bold text-white text-xs">18 Branches</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </>
      )}

      {/* ── 6. SOFTWARE QA (Test Cases) VIEW ── */}
      {moduleId === 'qa' && (
        <>
          <ModuleHeader 
            title="QA Test Execution Board" 
            category="Quality Assurance Hub" 
            primaryAction={{
              label: "Add Test Case",
              onClick: () => setIsTestModalOpen(true),
              icon: <Plus size={14} />
            }}
            secondaryAction={{
              label: "Execute Suite",
              onClick: runAllTests,
              icon: <Play size={14} />
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="md:col-span-2 p-6 border-white/5 bg-[#0B1120]/60">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#10B981]" /> Test Cases Registry
              </h3>
              <div className="space-y-3">
                {testCases.map(tc => (
                  <div key={tc.id} className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#00D4FF]">{tc.id}</span>
                        <span className="text-[9px] bg-white/5 text-[#94A3B8] px-1.5 py-0.5 rounded font-bold">{tc.suite}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          tc.priority === 'Critical' || tc.priority === 'High' ? 'bg-[#EF4444]/15 text-[#EF4444]' : 'bg-[#94A3B8]/15 text-[#94A3B8]'
                        }`}>{tc.priority}</span>
                      </div>
                      <p className="text-xs text-white font-medium">{tc.title}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      tc.status === 'Passed' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-rose-500/10 text-rose-500 animate-pulse'
                    }`}>{tc.status}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
              <h3 className="text-sm font-bold text-white mb-4">QA Metrics Summary</h3>
              <div className="space-y-4 text-xs text-[#94A3B8]">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
                  <span className="text-3xl font-bold text-white">
                    {testCases.filter(t => t.status === 'Passed').length} / {testCases.length}
                  </span>
                  <span className="block text-[10px] text-[#94A3B8] mt-1 uppercase tracking-wider">Test Cases Passed</span>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
                  <span className="text-3xl font-bold text-[#EF4444]">
                    {testCases.filter(t => t.status === 'Failed').length}
                  </span>
                  <span className="block text-[10px] text-[#94A3B8] mt-1 uppercase tracking-wider">Test Cases Failed</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Create Test Case Dialog Modal */}
          <AnimatePresence>
            {isTestModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div onClick={() => setIsTestModalOpen(false)} className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm" />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-md bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 p-6"
                >
                  <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Add QA Test Case</h3>
                    <button onClick={() => setIsTestModalOpen(false)} className="text-[#94A3B8] hover:text-white"><X size={18}/></button>
                  </div>

                  <form onSubmit={addTestCase} className="space-y-4">
                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-1">Test Case Title</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Verify payment gateway returns correct response code"
                        value={newTcTitle}
                        onChange={e => setNewTcTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#94A3B8] block mb-1">Test Suite</label>
                        <select 
                          value={newTcSuite}
                          onChange={e => setNewTcSuite(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0B1120] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                        >
                          <option value="Auth Suite">Auth Suite</option>
                          <option value="Billing Suite">Billing Suite</option>
                          <option value="Editor Suite">Editor Suite</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-[#94A3B8] block mb-1">Priority</label>
                        <select 
                          value={newTcPriority}
                          onChange={e => setNewTcPriority(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0B1120] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/5 mt-6">
                      <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-xs font-bold rounded-xl cursor-pointer">Create Test Case</button>
                      <button type="button" onClick={() => setIsTestModalOpen(false)} className="px-4 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-colors">Cancel</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── 7. OTHER / FALLBACK GENERIC MODULE ── */}
      {!['kitchen', 'patients', 'pos', 'devops', 'development', 'qa'].includes(moduleId) && (
        <>
          <ModuleHeader title={`${moduleId?.charAt(0)?.toUpperCase() + moduleId?.slice(1)} Dashboard`} category="Business Operations Module" />
          <GlassCard className="p-8 text-center border-white/5 bg-[#0B1120]/80">
            <Zap size={36} className="text-[#00D4FF] mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-white mb-1">Dynamic Module: {moduleId}</h3>
            <p className="text-xs text-[#94A3B8] max-w-md mx-auto">This dashboard has been dynamically generated from your AI onboarding settings. Setup configurations (KPIs, schedules, metrics) have been custom-tailored for your industry.</p>
            <div className="flex gap-4 justify-center mt-6">
              <button onClick={() => toast.success("Mock report downloaded")} className="px-4 py-2 bg-[#5B5FFF] text-white text-xs font-bold rounded-xl hover:scale-105 transition-transform cursor-pointer">Export Ledger</button>
              <button onClick={() => toast.success("AI Workflow generated")} className="px-4 py-2 bg-white/5 text-[#94A3B8] text-xs font-bold rounded-xl hover:bg-white/10 transition-colors cursor-pointer">Configure Rule</button>
            </div>
          </GlassCard>
        </>
      )}

    </div>
  );
}
