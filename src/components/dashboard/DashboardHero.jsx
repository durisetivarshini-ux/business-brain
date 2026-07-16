import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowRight, X, Check, ShieldAlert, Cpu, Heart, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { FunctionalButton } from '../ui/FunctionalButton';
import { useAuth } from '../../hooks/useAuth';

import { useWorkspace } from '../../context/WorkspaceContext';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function DashboardHero() {
  const navigate = useNavigate();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const { user } = useAuth();
  const { workspaceConfig: config } = useWorkspace();

  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [dateStr] = useState(new Date().toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' }));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const displayName = user?.displayName || 'Partner';
  const companyName = config?.companyName || 'Business Brain Enterprise';
  const industry = config?.customIndustry || 'Enterprise';

  const goalsCount = config?.goals?.length || 2;
  const rawScore = 80 + (goalsCount * 4) + (config?.customIndustry === 'Software Company' ? 4 : 2);
  const healthScore = Math.min(100, Math.max(50, rawScore));
  
  const getHealthRating = () => {
    if (healthScore >= 90) return { label: 'Excellent', color: '#10B981' };
    if (healthScore >= 75) return { label: 'Healthy', color: '#00D4FF' };
    if (healthScore >= 60) return { label: 'Needs Attention', color: '#F59E0B' };
    return { label: 'Critical', color: '#EF4444' };
  };

  const rating = getHealthRating();

  const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  const getIndustrySubtext = () => {
    switch(industry) {
      case 'Restaurant':
        return `Welcome to the kitchen command center. Monitoring delivery status, pending dining orders, and restaurant inventory levels in real-time.`;
      case 'Hospital':
        return `Welcome to the clinical operations center. Tracking active patient telemetry, bed occupancy, doctor roster shifts, and healthcare logs.`;
      case 'School':
        return `Welcome to the school administration dashboard. Monitoring student registrations, class cohorts attendance metrics, and term exam schedules.`;
      case 'Software Company':
        return `Welcome to the developer hub dashboard. Monitoring CI/CD deployment runs, active container clusters, pull requests, and QA status.`;
      case 'Retail':
        return `Welcome to the retail POS dashboard. Monitoring cash registers checkout velocity, inventory stock count, and supplier schedules.`;
      case 'Manufacturing':
        return `Welcome to the production control desk. Monitoring machine line efficiencies, warehouse capacities, and maintenance schedules.`;
      default:
        return `Your company is performing exceptionally well today. Revenue is up 12% from last week, and all key business modules are operating stably.`;
    }
  };

  return (
    <div className={`flex flex-col md:flex-row gap-6 mb-8 relative ${isReportOpen || isStrategyOpen ? 'z-50' : 'z-10'}`}>
      
      {/* Welcome Message */}
      <GlassCard className="flex-1 border-[#5B5FFF]/20 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 p-8 shadow-[0_10px_40px_rgba(91,95,255,0.1)] relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-[#5B5FFF]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-50%] left-[-10%] w-[50%] h-[100%] bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B5FFF]/20 border border-[#5B5FFF]/30 text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} /> AI BOS Configured: {industry}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-2"
          >
            {greeting} 👋 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]">
              {companyName}
            </span>
          </motion.h1>
          <p className="text-xs text-[#00D4FF]/60 font-bold uppercase tracking-widest mb-4 flex flex-wrap gap-x-3">
            <span>👤 {displayName}</span>
            <span>•</span>
            <span>📅 {dateStr}</span>
            <span>•</span>
            <span>⏰ {time}</span>
            <span>•</span>
            <span>📊 Q3</span>
            <span>•</span>
            <span>🚀 {config?.businessStage || 'Growing'}</span>
          </p>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] text-sm max-w-xl leading-relaxed mb-6"
          >
            {getIndustrySubtext()}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white font-bold shadow-[0_0_20px_rgba(91,95,255,0.4)] transition-all hover:scale-105 cursor-pointer"
            >
              Generate Report <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/app/ai-copilot')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors cursor-pointer"
            >
              View AI Strategy
            </button>
          </motion.div>

        </div>
      </GlassCard>

      {/* Business Health Widget */}
      <GlassCard 
        onClick={() => navigate('/app/executive')}
        className="w-full md:w-80 p-8 flex flex-col items-center justify-center text-center border-[#00D4FF]/20 bg-[#0B1120]/80 cursor-pointer hover:border-[#00D4FF]/50 transition-all"
      >
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 w-full text-left">Business Health</h3>
        
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            {/* Background Circle */}
            <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            {/* Animated Progress Circle */}
            <motion.circle 
              cx="64" cy="64" r="56" 
              fill="none" 
              stroke="#00D4FF" 
              strokeWidth="12" 
              strokeLinecap="round"
              initial={{ strokeDasharray: "351", strokeDashoffset: "351" }}
              animate={{ strokeDashoffset: 351 - (351 * (healthScore / 100)) }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.5))' }}
            />
          </svg>
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white tracking-tight">{healthScore}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: rating.color }}>
          <TrendingUp size={16} /> {rating.label} Status
        </div>
      </GlassCard>

      {/* ── REPORT MODAL OVERLAY ── */}
      <AnimatePresence>
        {isReportOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReportOpen(false)}
              className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 p-6 shrink-0">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="text-[#10B981]" /> CEO Executive Operations Report
                </h2>
                <button onClick={() => setIsReportOpen(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 text-sm text-[#94A3B8]">
                <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 border border-white/5 rounded-xl text-white">
                  <div>
                    <span className="text-xs text-[#94A3B8] block">Company Name</span>
                    <span className="font-bold">{config?.companyName || 'Business Brain Enterprise'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#94A3B8] block">Industry Template</span>
                    <span className="font-bold text-[#00D4FF]">{industry}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#94A3B8] block">Total Target Revenue</span>
                    <span className="font-bold">
                      {config?.currency === 'INR' ? '₹' : '$'} {parseFloat(config?.targetRevenue || '5000000').toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-[#94A3B8] block">Staff size</span>
                    <span className="font-bold">{config?.employeeCount || '26-50 Employees'}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Platform Auto-Configurations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Finance ledger format set to <strong className="text-white">{config?.invoiceFormat || 'INV-YYYY-0000'}</strong></li>
                    <li>SLA compliance response set to <strong className="text-white">{config?.slaHours || '24'} hours</strong></li>
                    <li>Marketing pipeline channels: <strong className="text-white">{config?.marketingChannels?.join(', ') || 'LinkedIn'}</strong></li>
                    <li>Working days calendar: <strong className="text-white">{config?.workingDays || '5 Days'}</strong></li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 border-t border-white/5 p-6 shrink-0 bg-[#070b14]">
                <button 
                  onClick={() => {
                    toast.success("PDF generated and downloaded successfully!");
                    setIsReportOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white font-bold text-xs hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  Download PDF Report
                </button>
                <button 
                  onClick={() => setIsReportOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── STRATEGY PLAYBOOK MODAL ── */}
      <AnimatePresence>
        {isStrategyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStrategyOpen(false)}
              className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 p-6 shrink-0">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-[#00D4FF]" /> AI Strategy & Automations Playbook
                </h2>
                <button onClick={() => setIsStrategyOpen(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Generated specifically for a <strong className="text-white">{industry}</strong> to address your challenges: 
                  <strong className="text-[#00D4FF]"> {config?.businessChallenges?.join(', ') || 'Automation'}</strong>.
                </p>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Automations Checklist</h4>
                  
                  {industry === 'Restaurant' && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Send online tables bookings directly into staff schedules</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Trigger low stock warning alerts when ingredients reach threshold</span>
                      </div>
                    </div>
                  )}

                  {industry === 'Hospital' && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Sync doctor appointments changes into mobile geofencing shifts</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Alert lab reports dispatch to customer support agent channels</span>
                      </div>
                    </div>
                  )}

                  {industry === 'School' && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Flag students attendance deficit directly to parent emails</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Calculate pending term fees invoices on the 1st of every month</span>
                      </div>
                    </div>
                  )}

                  {industry === 'Software Company' && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Sync open PR code quality metrics with DevOps cluster capacity alerts</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Notify technical support agent channels on cluster CPU load spikes</span>
                      </div>
                    </div>
                  )}

                  {industry !== 'Restaurant' && industry !== 'Hospital' && industry !== 'School' && industry !== 'Software Company' && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Automate lead scoring pipeline assignments based on region</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <input type="checkbox" defaultChecked className="mt-0.5" />
                        <span>Auto-flag invoice fraud warnings for accounting ledgers</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 border-t border-white/5 p-6 shrink-0 bg-[#070b14]">
                <button 
                  onClick={() => {
                    toast.success("AI automations playbook activated successfully!");
                    setIsStrategyOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white font-bold text-xs hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  Activate Playbook Rules
                </button>
                <button 
                  onClick={() => setIsStrategyOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
