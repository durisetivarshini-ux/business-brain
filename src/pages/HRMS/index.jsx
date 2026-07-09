import React, { useState } from 'react';
import { HRDashboard } from './HRDashboard';
import { EmployeeSentiment } from './EmployeeSentiment';
import { X, Loader2, CheckCircle, UserPlus, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
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

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">People & Organization</h1>
          <p className="text-[#94A3B8] font-medium">Workforce command center for talent, payroll, and recruitment.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setModal('payroll')} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
            <DollarSign size={14} /> Process Payroll
          </button>
          <button onClick={() => setModal('add')} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-transform hover:scale-[1.02] flex items-center gap-2">
            <UserPlus size={14} /> Add Employee
          </button>
        </div>
      </div>

      <HRDashboard />
      <EmployeeSentiment />

      {modal === 'add' && <AddEmployeeModal onClose={() => setModal(null)} />}
      {modal === 'payroll' && <PayrollModal onClose={() => setModal(null)} />}

    </div>
  );
}
