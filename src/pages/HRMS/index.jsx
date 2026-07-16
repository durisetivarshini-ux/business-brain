import React, { useState } from 'react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { HRKPIGrid } from './HRKPIGrid';
import { AIHRAssistant } from './AIHRAssistant';
import { EmployeeDirectory } from './EmployeeDirectory';
import { EmployeeSentiment } from './EmployeeSentiment';
import { RecruitmentBoard } from './RecruitmentBoard';
import { HRCharts } from './HRCharts';
import { X, Loader2, CheckCircle, UserPlus, DollarSign, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { GlassCard } from '@/components/ui/GlassCard';

function AddEmployeeModal({ onClose }) {
  const [form, setForm] = useState({ name: '', role: '', department: 'Engineering' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return toast.error('Name and role are required.');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
    toast.success('Employee added successfully!');
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-[#00D4FF]/30 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white z-10"><X size={20} /></button>
        {done ? (
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle size={28} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Employee Added!</h2>
            <p className="text-sm text-[#94A3B8] mb-6">{form.name} is now part of {form.department}.</p>
            <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold hover:scale-[1.02] transition-all">Done</button>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]"><UserPlus size={20} /></div>
              <div>
                <h2 className="text-xl font-bold text-white">Add Employee</h2>
                <p className="text-xs text-[#94A3B8]">Onboard a new team member</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Full Name</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors" placeholder="e.g. Aditi Rao" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Role</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors" placeholder="e.g. Frontend Developer" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Department</label>
                <select className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors" value={form.department} onChange={e => setForm({...form, department: e.target.value})}>
                  {['Engineering', 'Product', 'Design', 'HR', 'Sales', 'Marketing'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold disabled:opacity-60 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Adding...</> : '+ Add Employee'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function PayrollModal({ onClose }) {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      toast.success('Payroll processed for 2,580 employees.');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative flex flex-col items-center text-center">
        {loading ? (
          <>
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Loader2 size={24} className="text-[#94A3B8] animate-spin" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Processing Payroll...</h2>
            <p className="text-sm text-[#94A3B8]">Calculating taxes, bonuses, and deductions for 2,580 employees.</p>
          </>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white"><X size={20} /></button>
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle size={32} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Payroll Processed!</h2>
            <p className="text-sm text-[#94A3B8] mb-6">₹3.2 Cr has been disbursed to 2,580 employees successfully.</p>
            <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold hover:scale-[1.02] transition-all">Done</button>
          </>
        )}
      </div>
    </div>
  );
}

export function HRMSPage() {
  const [modal, setModal] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'employees', label: 'Employees' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const recentHires = [
    { name: 'Aditi Rao', role: 'Frontend Developer', department: 'Engineering', date: '16 Jul 2026', status: 'Onboarding' },
    { name: 'Rahul Sharma', role: 'Product Manager', department: 'Product', date: '12 Jul 2026', status: 'Active' },
    { name: 'Sneha Patel', role: 'UI/UX Designer', department: 'Design', date: '10 Jul 2026', status: 'Active' },
    { name: 'Vijay Kumar', role: 'HR Specialist', department: 'HR', date: '05 Jul 2026', status: 'Active' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="People & Organization"
        description="Workforce command center for talent, payroll, and recruitment."
        primaryAction={{
          label: "Add Employee",
          onClick: () => setModal('add'),
          icon: <UserPlus size={14} />
        }}
        secondaryAction={{
          label: "Process Payroll",
          onClick: () => setModal('payroll'),
          icon: <DollarSign size={14} />
        }}
        moduleName="HRMS"
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* 1. 4 KPIs */}
          <HRKPIGrid />

          {/* 2. AI Assistant */}
          <AIHRAssistant />

          {/* 3. Operational Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmployeeDirectory />
            <RecruitmentBoard />
          </div>

          {/* 4. Analytics Charts (exactly 2) */}
          <HRCharts />

          {/* 5. Recent Activity Table */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Onboarded Employees</h3>
              <button onClick={() => setActiveTab('employees')} className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer">
                View employee list <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#94A3B8]">
                <thead className="text-xs text-white uppercase bg-white/5 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Date Joined</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentHires.map((hire, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-bold text-white">{hire.name}</td>
                      <td className="px-4 py-3 text-white">{hire.role}</td>
                      <td className="px-4 py-3">{hire.department}</td>
                      <td className="px-4 py-3">{hire.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          hire.status === 'Active' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' :
                          'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {hire.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'employees' && (
        <div className="flex flex-col gap-6">
          <EmployeeDirectory />
        </div>
      )}

      {activeTab === 'recruitment' && (
        <div className="flex flex-col gap-6">
          <RecruitmentBoard />
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 max-w-xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-2">Payroll Information</h2>
            <p className="text-sm text-[#94A3B8] mb-6">Process disbursements and view monthly employee organization costs.</p>
            <button onClick={() => setModal('payroll')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] font-bold hover:scale-[1.02] transition-all cursor-pointer">
              Disburse Monthly Payroll
            </button>
          </GlassCard>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-6">
          <HRCharts />
          <EmployeeSentiment />
        </div>
      )}

      {modal === 'add' && <AddEmployeeModal onClose={() => setModal(null)} />}
      {modal === 'payroll' && <PayrollModal onClose={() => setModal(null)} />}

    </div>
  );
}
