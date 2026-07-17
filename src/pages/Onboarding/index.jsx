import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { GlassCard } from '@/components/ui/GlassCard';
import { Logo } from '@/components/common/Logo';
import { 
  Building2, Briefcase, Users, DollarSign, Globe2, Map, Clock, 
  Search, ChevronDown, Loader2, ArrowRight, ArrowLeft,
  ShieldAlert, Cpu, CheckCircle2, Cloud, Sparkles, Play, Database, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useWorkspace } from '@/context/WorkspaceContext';

export function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { updateConfig } = useWorkspace();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const getRevenueOptions = (curr) => {
    switch (curr) {
      case 'USD':
        return [
          { value: 'Under $50,000', label: 'Under $50,000' },
          { value: '$50,000 - $250,000', label: '$50,000 - $250,000' },
          { value: '$250,000 - $1,000,000', label: '$250,000 - $1,000,000' },
          { value: 'Above $1,000,000', label: 'Above $1,000,000' }
        ];
      case 'EUR':
        return [
          { value: 'Under €50,000', label: 'Under €50,000' },
          { value: '€50,000 - €250,000', label: '€50,000 - €250,000' },
          { value: '€250,000 - €1,000,000', label: '€250,000 - €1,000,000' },
          { value: 'Above €1,000,000', label: 'Above €1,000,000' }
        ];
      default:
        return [
          { value: 'Under ₹10 Lakhs', label: 'Under ₹10 Lakhs' },
          { value: '₹10 Lakhs - ₹50 Lakhs', label: '₹10 Lakhs - ₹50 Lakhs' },
          { value: '₹50 Lakhs - ₹2 Crores', label: '₹50 Lakhs - ₹2 Crores' },
          { value: 'Above ₹2 Crores', label: 'Above ₹2 Crores' }
        ];
    }
  };

  // Consolidated Wizard State
  const [formData, setFormData] = useState({
    // Step 1: Profile Details
    companyName: '',
    businessType: 'Private Corporation',
    customIndustry: 'Software Company',
    country: 'India',
    state: 'Karnataka',
    timezone: '(+05:30) India Standard Time (Asia/Kolkata)',
    currency: 'INR',
    employeeCount: '26-50 Employees',
    annualRevenue: 'Under ₹10 Lakhs',
    businessStage: 'Growing', // Startup, Growing, SME, Enterprise

    // Step 2: Active Departments
    departments: ['Sales', 'Marketing', 'Finance', 'HR', 'Support', 'Inventory', 'Documents'],

    // Step 3: AI Assistants
    aiAssistants: ['AI Copilot', 'Business Advisor', 'Meeting AI'],

    // Step 4: Business Goals
    goals: ['Increase Revenue', 'Improve Productivity', 'Digital Transformation'],

    // Step 5: Integrations Stack
    softwareStack: ['Google Workspace', 'Slack', 'GitHub'],

    // Step 6: Workspace Config Auto Toggle
    aiAutoConfigure: 'YES'
  });

  // Step 6 Generation Animations
  const [animProgress, setAnimProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [setupFinished, setSetupFinished] = useState(false);

  const stepsList = [
    { title: "Company Profile", desc: "Basic details & staging" },
    { title: "Departments", desc: "Active business units" },
    { title: "AI Assistants", desc: "Select enabled intelligence" },
    { title: "Business Goals", desc: "Targets & core focus areas" },
    { title: "Software Stack", desc: "Integrate existing tools" },
    { title: "Generate Workspace", desc: "AI configuration engine" }
  ];

  // Dynamic lists options
  const departmentOptions = [
    'Sales', 'Marketing', 'Finance', 'HR', 'Customer Support', 'Inventory', 
    'Procurement', 'Operations', 'Manufacturing', 'Projects', 'IT', 
    'Legal', 'Compliance', 'Analytics', 'Documents'
  ];

  const aiOptions = [
    'AI Copilot', 'Business Advisor', 'Meeting AI', 'Marketing AI', 'Sales AI', 
    'Finance AI', 'HR AI', 'Support AI', 'Document AI', 
    'Forecast AI', 'Risk AI', 'Compliance AI'
  ];

  const goalOptions = [
    'Increase Revenue', 'Reduce Costs', 'Hire Employees', 'Expand Business', 
    'Improve Customer Support', 'Increase Sales', 'Marketing Growth', 
    'Inventory Optimization', 'Financial Planning', 
    'Digital Transformation', 'Compliance', 'Sustainability'
  ];

  const softwareOptions = [
    'Google Workspace', 'Microsoft 365', 'Slack', 'Zoom', 'Teams', 
    'QuickBooks', 'Xero', 'Shopify', 'WooCommerce', 'SAP', 'Oracle', 
    'Salesforce', 'HubSpot', 'Zoho', 'GitHub', 'Jira', 'Notion', 'Others'
  ];

  // Run generation simulator in step 6
  useEffect(() => {
    if (step !== 6) return;

    setAnimProgress(0);
    setCompletedTasks([]);
    setSetupFinished(false);

    const tasks = [
      "Analyzing company details...",
      "Mapping user permissions schemas...",
      "Configuring dynamic sidebar navigation...",
      "Synthesizing customized operational metrics...",
      "Creating dummy CSV/Excel import datasets...",
      "Optimizing Gemini AI personalization models...",
      "Spinning up adaptive business twin simulation..."
    ];

    let taskIdx = 0;
    const taskInterval = setInterval(() => {
      if (taskIdx < tasks.length) {
        setCompletedTasks(prev => [...prev, `✓ ${tasks[taskIdx]}`]);
        taskIdx++;
      }
    }, 900);

    const progressInterval = setInterval(() => {
      setAnimProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(taskInterval);
          setSetupFinished(true);
          return 100;
        }
        return prev + 5;
      });
    }, 350);

    return () => {
      clearInterval(taskInterval);
      clearInterval(progressInterval);
    };
  }, [step]);

  const handleLaunch = async () => {
    setLoading(true);
    const userId = user?.uid || 'guest';

    try {
      // Broadcast settings to Workspace Context
      updateConfig(formData);

      localStorage.setItem(`onboarding_completed_${userId}`, 'true');
      localStorage.setItem(`company_details_${userId}`, JSON.stringify(formData));

      if (db && user?.uid) {
        await setDoc(doc(db, 'users', user.uid), {
          ...formData,
          onboardingCompleted: true,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      toast.success('Your AI Business Operating System is ready!', { icon: '🚀' });
      setTimeout(() => navigate('/app'), 1000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to configure workspace.');
      navigate('/app');
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (field, item) => {
    const arr = [...formData[field]];
    const idx = arr.indexOf(item);
    if (idx > -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(item);
    }
    setFormData({ ...formData, [field]: arr });
  };

  const handleNext = () => {
    if (step === 1 && !formData.companyName.trim()) {
      toast.error('Company Name is required.');
      return;
    }
    if (step === 6) return;
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) return;
    setStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* Aurora Ambient Backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-[#5B5FFF]/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] bg-[#7C3AED]/15 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-3xl relative z-10 py-10 flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2">
          <Logo showText />
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-[#94A3B8] font-bold">
            <span className="text-white">Step {step}</span> of 6
          </div>
        </div>

        {/* Progress Tracker Bar */}
        <div className="flex gap-1.5 px-2">
          {stepsList.map((s, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                step > idx + 1 ? 'bg-[#10B981]' : step === idx + 1 ? 'bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]' : 'bg-white/5'
              }`} 
            />
          ))}
        </div>

        <GlassCard className="p-8 border-white/10 bg-[#080d1a]/85 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative min-h-[460px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="flex-grow flex flex-col"
            >
              
              {/* ── STEP 1: COMPANY PROFILE ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Company Profile</h2>
                    <p className="text-xs text-[#94A3B8]">Provide base company configurations to adapt your platform.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-1">Company Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Arsenix"
                        value={formData.companyName}
                        onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-1">Industry</label>
                      <select 
                        value={formData.customIndustry}
                        onChange={e => setFormData({ ...formData, customIndustry: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B1120] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                      >
                        <option value="Software Company">Software Company</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Hospital">Hospital</option>
                        <option value="School">School</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-1">Business Stage</label>
                      <select 
                        value={formData.businessStage}
                        onChange={e => setFormData({ ...formData, businessStage: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B1120] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                      >
                        <option value="Startup">Startup</option>
                        <option value="Growing">Growing</option>
                        <option value="SME">SME</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-1">Currency</label>
                      <select 
                        value={formData.currency}
                        onChange={e => {
                          const nextCurr = e.target.value;
                          const nextRev = getRevenueOptions(nextCurr)[0].value;
                          setFormData({ ...formData, currency: nextCurr, annualRevenue: nextRev });
                        }}
                        className="w-full px-3 py-2 bg-[#0B1120] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-1">Headcount Size</label>
                      <select 
                        value={formData.employeeCount}
                        onChange={e => setFormData({ ...formData, employeeCount: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B1120] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                      >
                        <option value="1-5 Employees">1-5 Employees</option>
                        <option value="6-25 Employees">6-25 Employees</option>
                        <option value="26-50 Employees">26-50 Employees</option>
                        <option value="50+ Employees">50+ Employees</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-1">Annual Revenue Range</label>
                      <select 
                        value={formData.annualRevenue}
                        onChange={e => setFormData({ ...formData, annualRevenue: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0B1120] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                      >
                        {getRevenueOptions(formData.currency).map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: ACTIVE DEPARTMENTS ── */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Active Departments</h2>
                    <p className="text-xs text-[#94A3B8]">Select all active units currently operating in your business.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                    {departmentOptions.map(dept => {
                      const isSelected = formData.departments.includes(dept);
                      return (
                        <button 
                          key={dept}
                          type="button"
                          onClick={() => toggleArrayItem('departments', dept)}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected ? 'bg-[#5B5FFF]/15 border-[#5B5FFF] text-white shadow-lg' : 'bg-white/5 border-white/5 text-[#94A3B8] hover:bg-white/10'
                          }`}
                        >
                          <span>{dept}</span>
                          {isSelected && <CheckCircle2 size={14} className="text-[#00D4FF]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 3: AI ASSISTANTS ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Enabled AI Assistants</h2>
                    <p className="text-xs text-[#94A3B8]">Enable context-aware intelligence models for your core operations.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                    {aiOptions.map(ai => {
                      const isSelected = formData.aiAssistants.includes(ai);
                      return (
                        <button 
                          key={ai}
                          type="button"
                          onClick={() => toggleArrayItem('aiAssistants', ai)}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-white shadow-lg' : 'bg-white/5 border-white/5 text-[#94A3B8] hover:bg-white/10'
                          }`}
                        >
                          <span>{ai}</span>
                          {isSelected && <Sparkles size={14} className="text-[#00D4FF]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 4: CURRENT GOALS ── */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Current Goals & Focus</h2>
                    <p className="text-xs text-[#94A3B8]">Select all targets to train business metrics tracking patterns.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                    {goalOptions.map(goal => {
                      const isSelected = formData.goals.includes(goal);
                      return (
                        <button 
                          key={goal}
                          type="button"
                          onClick={() => toggleArrayItem('goals', goal)}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected ? 'bg-[#10B981]/15 border-[#10B981] text-white shadow-lg' : 'bg-white/5 border-white/5 text-[#94A3B8] hover:bg-white/10'
                          }`}
                        >
                          <span>{goal}</span>
                          {isSelected && <CheckCircle2 size={14} className="text-[#10B981]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 5: SOFTWARE INTEGRATIONS ── */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Integrate Software Stack</h2>
                    <p className="text-xs text-[#94A3B8]">Connect the existing applications utilized by your teams.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                    {softwareOptions.map(soft => {
                      const isSelected = formData.softwareStack.includes(soft);
                      return (
                        <button 
                          key={soft}
                          type="button"
                          onClick={() => toggleArrayItem('softwareStack', soft)}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                            isSelected ? 'bg-white/10 border-white/30 text-white shadow-lg' : 'bg-white/5 border-white/5 text-[#94A3B8] hover:bg-white/10'
                          }`}
                        >
                          <span className="block truncate">{soft}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 6: GENERATE WORKSPACE ── */}
              {step === 6 && (
                <div className="flex flex-col items-center justify-center flex-grow py-6 select-none">
                  {!setupFinished ? (
                    <div className="w-full flex flex-col items-center gap-6">
                      
                      {/* Check Auto Configure option */}
                      {animProgress === 0 && (
                        <div className="text-center space-y-4">
                          <h3 className="text-white font-bold text-sm">Would you like AI to configure your workspace automatically?</h3>
                          <div className="flex gap-4 justify-center">
                            <button 
                              type="button" 
                              onClick={() => {
                                setFormData({ ...formData, aiAutoConfigure: 'YES' });
                                setAnimProgress(5); // start simulator
                              }}
                              className="px-6 py-2.5 bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white font-bold text-xs rounded-xl cursor-pointer"
                            >
                              YES, Configure
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                setFormData({ ...formData, aiAutoConfigure: 'NO' });
                                setSetupFinished(true); // skip configuration
                              }}
                              className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold text-xs rounded-xl hover:bg-white/10 transition-colors"
                            >
                              NO, Manual Setup
                            </button>
                          </div>
                        </div>
                      )}

                      {animProgress > 0 && (
                        <>
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            <Cpu className="text-[#00D4FF] animate-spin absolute" size={48} style={{ animationDuration: '6s' }} />
                            <Sparkles className="text-[#5B5FFF] animate-pulse" size={24} />
                          </div>
                          
                          <div className="text-center">
                            <h2 className="text-base font-bold text-white mb-0.5">Generating AI Workspace</h2>
                            <p className="text-xs text-[#94A3B8]">Building custom configurations for {formData.companyName || 'your business'}...</p>
                          </div>

                          <div className="w-full max-w-md bg-black/40 border border-white/5 rounded-2xl p-4 max-h-[140px] overflow-y-auto custom-scrollbar flex flex-col gap-1.5 text-left">
                            {completedTasks.map((t, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-[#10B981] font-semibold">
                                <CheckCircle2 size={12} className="text-[#10B981]" />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>

                          <div className="w-full max-w-md">
                            <div className="flex justify-between text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider mb-1">
                              <span>Status: Building AI models</span>
                              <span>{animProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]" style={{ width: `${animProgress}%` }} />
                            </div>
                          </div>
                        </>
                      )}

                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      className="text-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                        <CheckCircle2 size={32} className="text-[#10B981]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Setup Complete!</h2>
                        <p className="text-xs text-[#94A3B8] mt-1">🎉 Your personalized Adaptive Business Operating System is ready.</p>
                      </div>

                      <button
                        onClick={handleLaunch}
                        disabled={loading}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white font-bold text-xs shadow-[0_0_25px_rgba(91,95,255,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mx-auto cursor-pointer"
                      >
                        {loading ? <><Loader2 size={14} className="animate-spin" /> Launching...</> : <><Play size={12} /> Launch Dashboard</>}
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Wizard Footer Controls */}
          {step < 6 && (
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white hover:scale-[1.01] transition-transform flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-[0_0_15px_rgba(91,95,255,0.2)]"
              >
                Next <ArrowRight size={14} />
              </button>
            </div>
          )}
        </GlassCard>

      </div>
    </div>
  );
}
