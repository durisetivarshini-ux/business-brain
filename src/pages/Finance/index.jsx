import React, { useState } from 'react';
import { FinanceDashboard } from './FinanceDashboard';
import { CashFlowPredictor } from './CashFlowPredictor';
import { FraudDetection } from './FraudDetection';
import toast from 'react-hot-toast';
import { X, FileText, Loader2 } from 'lucide-react';

function NewInvoiceModal({ onClose }) {
  const [form, setForm] = useState({ client: '', amount: '', due: '', description: '', category: 'Services' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client || !form.amount) {
      toast.error('Client name and amount are required.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    toast.success(`Invoice for ${form.client} created successfully!`);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
            <FileText size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Create New Invoice</h2>
            <p className="text-xs text-[#94A3B8]">Generate and send a professional invoice</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Client / Company *</label>
              <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" placeholder="e.g. Nexus Corp" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Amount (₹) *</label>
              <input type="number" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" placeholder="e.g. 250000" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Category</label>
              <select className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['Services', 'Product Sale', 'Consulting', 'License', 'Subscription', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Due Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Description</label>
            <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors resize-none" placeholder="Describe the services or products..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold shadow-lg disabled:opacity-60 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Creating...</> : '+ Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FinancePage() {
  const [showInvoice, setShowInvoice] = useState(false);

  const handleExportPDF = () => {
    const promise = new Promise(r => setTimeout(r, 1500));
    toast.promise(promise, {
      loading: 'Generating Finance PDF report...',
      success: 'Finance Report exported successfully!',
      error: 'Failed to export PDF.',
    });
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Finance &amp; Accounting</h1>
          <p className="text-[#94A3B8] font-medium">Executive Command Center for revenue, expenses, and cash flow analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Export PDF
          </button>
          <button
            onClick={() => setShowInvoice(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.02]"
          >
            + New Invoice
          </button>
        </div>
      </div>

      {/* Main Finance Dashboard Layout */}
      <FinanceDashboard />

      {/* AI Premium Modules */}
      <CashFlowPredictor />
      <FraudDetection />

      {/* Modals */}
      {showInvoice && <NewInvoiceModal onClose={() => setShowInvoice(false)} />}
    </div>
  );
}
