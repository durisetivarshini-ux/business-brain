import React, { useState } from 'react';
import { FinanceDashboard } from './FinanceDashboard';
import { CashFlowPredictor } from './CashFlowPredictor';
import { FraudDetection } from './FraudDetection';
import toast from 'react-hot-toast';
import { X, FileText, Loader2, CheckCircle, Download, IndianRupee, Calendar, Tag, Hash, Building2 } from 'lucide-react';

// Download invoice as a simple text file
function downloadInvoice(inv) {
  const lines = [
    '================================================================',
    '                    BUSINESS BRAIN INVOICE                      ',
    '================================================================',
    `Invoice No   : ${inv.id}`,
    `Date         : ${inv.date}`,
    `Due Date     : ${inv.due || 'Net 30'}`,
    '----------------------------------------------------------------',
    `Bill To      : ${inv.client}`,
    `Category     : ${inv.category}`,
    '----------------------------------------------------------------',
    `Description  : ${inv.description || 'Professional services as agreed.'}`,
    '----------------------------------------------------------------',
    `AMOUNT DUE   : ₹${inv.amount}`,
    '================================================================',
    'Thank you for your business!',
    'Business Brain · finance@businessbrain.ai · +91-98765-43210',
  ];
  const text = lines.join('\n');
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Invoice_${inv.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function NewInvoiceModal({ onClose }) {
  const [form, setForm] = useState({ client: '', amount: '', due: '', description: '', category: 'Services' });
  const [loading, setLoading] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client || !form.amount) {
      toast.error('Client name and amount are required.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const invoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      client: form.client,
      amount: Number(form.amount).toLocaleString('en-IN'),
      category: form.category,
      due: form.due ? new Date(form.due).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Net 30',
      description: form.description,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending',
    };
    setCreatedInvoice(invoice);
    setLoading(false);
    toast.success(`Invoice ${invoice.id} created for ${invoice.client}!`);
  };

  // ── Invoice Preview Screen ──
  if (createdInvoice) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="w-full max-w-md rounded-2xl border border-[#10B981]/30 bg-[#0B1120] shadow-2xl relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981]/10 blur-[60px] rounded-full pointer-events-none" />
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-10"><X size={20} /></button>

          {/* Invoice Header */}
          <div className="bg-gradient-to-r from-[#10B981]/20 to-transparent px-6 pt-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
                <CheckCircle size={18} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Invoice Created!</p>
                <p className="text-xs text-[#94A3B8]">Ready to send</p>
              </div>
              <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                {createdInvoice.status}
              </span>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="px-6 py-5">
            {/* Invoice Number + Date */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-bold mb-0.5">Invoice No.</p>
                <p className="text-lg font-bold text-white font-mono">{createdInvoice.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-bold mb-0.5">Date</p>
                <p className="text-sm font-semibold text-white">{createdInvoice.date}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: <Building2 size={13} className="text-[#10B981]" />, label: 'Bill To', value: createdInvoice.client, bg: '#10B981' },
                { icon: <Tag size={13} className="text-[#5B5FFF]" />, label: 'Category', value: createdInvoice.category, bg: '#5B5FFF' },
                { icon: <Calendar size={13} className="text-[#EC4899]" />, label: 'Due Date', value: createdInvoice.due, bg: '#EC4899' },
                { icon: <Hash size={13} className="text-[#F59E0B]" />, label: 'Status', value: createdInvoice.status, bg: '#F59E0B' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${item.bg}20` }}>{item.icon}</div>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-bold">{item.label}</p>
                  </div>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Amount Due */}
            <div className="rounded-xl bg-gradient-to-r from-[#10B981]/20 to-[#00D4FF]/10 border border-[#10B981]/20 p-4 mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IndianRupee size={16} className="text-[#10B981]" />
                <span className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Amount Due</span>
              </div>
              <span className="text-2xl font-bold text-white">₹{createdInvoice.amount}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => downloadInvoice(createdInvoice)}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} /> Download
              </button>
              <button
                onClick={() => { setCreatedInvoice(null); setForm({ client: '', amount: '', due: '', description: '', category: 'Services' }); }}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
              >
                New Invoice
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold hover:scale-[1.02] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form Screen ──
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]"><FileText size={18} /></div>
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Finance &amp; Accounting</h1>
          <p className="text-[#94A3B8] font-medium">Executive Command Center for revenue, expenses, and cash flow analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportPDF} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Export PDF</button>
          <button onClick={() => setShowInvoice(true)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.02]">+ New Invoice</button>
        </div>
      </div>

      <FinanceDashboard />
      <CashFlowPredictor />
      <FraudDetection />

      {showInvoice && <NewInvoiceModal onClose={() => setShowInvoice(false)} />}
    </div>
  );
}
