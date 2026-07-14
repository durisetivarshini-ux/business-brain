import React, { useState } from 'react';
import { OperationsDashboard } from './OperationsDashboard';
import { X, FileText, Loader2, CheckCircle, Download, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Portal } from '../../components/ui/Portal';

// ── Approval Queue Modal ──
function ApprovalQueueModal({ onClose }) {
  const [items, setItems] = useState([
    { id: 'PO-2847', desc: 'Raw Steel — 5 tons', dept: 'Manufacturing', amount: 24500, status: 'pending' },
    { id: 'PO-2848', desc: 'Circuit Boards — 2000 units', dept: 'Assembly', amount: 18200, status: 'pending' },
    { id: 'PO-2850', desc: 'Packaging Materials — Bulk', dept: 'Logistics', amount: 6800, status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' } : i));
    toast.success(`${id} approved successfully`);
  };

  const handleReject = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'rejected' } : i));
    toast.error(`${id} rejected`);
  };

  const pending = items.filter(i => i.status === 'pending').length;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-20"><X size={20} /></button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle size={22} className="text-rose-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Approval Queue</h2>
              <p className="text-xs text-[#94A3B8]">{pending} item{pending !== 1 ? 's' : ''} pending</p>
            </div>
          </div>
          <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className={`p-4 rounded-xl border transition-all ${item.status === 'approved' ? 'bg-[#10B981]/10 border-[#10B981]/30' : item.status === 'rejected' ? 'bg-rose-500/10 border-rose-500/30 opacity-50' : 'bg-white/5 border-white/5'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-white">{item.id}</h4>
                  <span className="text-sm font-bold text-[#00D4FF]">${item.amount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-[#94A3B8] mb-1">{item.desc}</p>
                <p className="text-xs text-[#94A3B8] mb-3">Department: {item.dept}</p>
                {item.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(item.id)} className="flex-1 py-2 rounded-lg bg-[#10B981] text-white text-xs font-bold hover:bg-[#10B981]/80 transition-colors">✓ Approve</button>
                    <button onClick={() => handleReject(item.id)} className="flex-1 py-2 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-bold hover:bg-rose-500/30 transition-colors border border-rose-500/20">✕ Reject</button>
                  </div>
                ) : (
                  <p className={`text-xs font-bold uppercase tracking-wider ${item.status === 'approved' ? 'text-[#10B981]' : 'text-rose-400'}`}>
                    {item.status === 'approved' ? '✓ Approved' : '✕ Rejected'}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Close</button>
        </motion.div>
      </div>
    </Portal>
  );
}

// ── ERP Report Generator ──
function ERPReportModal({ onClose }) {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 2500);
  };

  const handleDownload = () => {
    const reportHTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>ERP Operations Report</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
body{font-family:'Inter',sans-serif;background:#050816;color:#f8fafc;margin:0;padding:40px}
.c{max-width:800px;margin:0 auto;background:#0b1120;padding:50px;border-radius:24px;border:1px solid rgba(255,255,255,0.05);box-shadow:0 20px 50px rgba(0,0,0,0.5)}
h1{color:#fff;font-size:28px;margin:0 0 5px}
.sub{color:#94a3b8;font-size:13px;margin-bottom:30px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:20px}
.section{margin-bottom:30px}
.section h2{color:#00D4FF;font-size:16px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px}
.kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px}
.kpi-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:16px;text-align:center}
.kpi-card .val{font-size:24px;font-weight:700;color:#fff}
.kpi-card .lbl{font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px}
.item{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:14px;margin-bottom:8px;display:flex;justify-content:space-between}
.item span{color:#cbd5e1;font-size:14px}
.item .tag{font-size:12px;font-weight:700;padding:3px 10px;border-radius:8px}
.footer{text-align:center;color:#475569;font-size:12px;margin-top:40px;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px}
@media print{body{background:#fff;color:#000}.c{background:#fff;border:none;box-shadow:none}h1,.kpi-card .val{color:#000}.section h2{color:#2563eb}.item span{color:#000}.sub,.footer{border-color:#e2e8f0;color:#64748b}}
</style></head><body><div class="c">
<h1>ERP Operations Report</h1>
<div class="sub">Generated by Business Brain AI • ${new Date().toLocaleString()}</div>
<div class="section"><h2>Operations Overview</h2>
<div class="kpi">
<div class="kpi-card"><div class="val">42</div><div class="lbl">Active Projects</div></div>
<div class="kpi-card"><div class="val">186</div><div class="lbl">Purchase Orders</div></div>
<div class="kpi-card"><div class="val">94</div><div class="lbl">Vendors</div></div>
<div class="kpi-card"><div class="val">2,350</div><div class="lbl">Assets</div></div>
<div class="kpi-card"><div class="val">82%</div><div class="lbl">Warehouse Cap.</div></div>
<div class="kpi-card"><div class="val">97%</div><div class="lbl">Production Eff.</div></div>
</div></div>
<div class="section"><h2>Critical Alerts</h2>
<div class="item"><span>Warehouse A reaching storage capacity (98%)</span><span class="tag" style="background:rgba(239,68,68,0.1);color:#ef4444">Critical</span></div>
<div class="item"><span>Supplier ABC delayed 2 shipments</span><span class="tag" style="background:rgba(245,158,11,0.1);color:#f59e0b">Warning</span></div>
<div class="item"><span>3 purchase orders pending approval</span><span class="tag" style="background:rgba(245,158,11,0.1);color:#f59e0b">Pending</span></div>
</div>
<div class="section"><h2>Manufacturing Status</h2>
<div class="item"><span>Assembly Line Alpha — Running</span><span class="tag" style="background:rgba(16,185,129,0.1);color:#10b981">98%</span></div>
<div class="item"><span>Packaging Unit 1 — Maintenance</span><span class="tag" style="background:rgba(245,158,11,0.1);color:#f59e0b">0%</span></div>
<div class="item"><span>Circuit Printing — Running</span><span class="tag" style="background:rgba(0,212,255,0.1);color:#00d4ff">92%</span></div>
</div>
<div class="section"><h2>AI Recommendations</h2>
<div class="item"><span>Increase safety stock for Zone B1 (raw materials at 15%)</span><span class="tag" style="background:rgba(239,68,68,0.1);color:#ef4444">High</span></div>
<div class="item"><span>Renegotiate Supplier ABC contract</span><span class="tag" style="background:rgba(245,158,11,0.1);color:#f59e0b">Medium</span></div>
<div class="item"><span>Expand Warehouse A capacity</span><span class="tag" style="background:rgba(239,68,68,0.1);color:#ef4444">High</span></div>
</div>
<div class="footer">© ${new Date().getFullYear()} Business Brain Inc. Confidential and Proprietary.</div>
</div></body></html>`;

    const blob = new Blob([reportHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ERP_Operations_Report_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('ERP Report downloaded!');
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl border border-[#00D4FF]/20 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full pointer-events-none bg-[#00D4FF]/10" />
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-20"><X size={20} /></button>

        {done ? (
          <div className="relative z-10 py-4">
            <CheckCircle className="mx-auto mb-4 text-[#10B981]" size={48} />
            <h2 className="text-xl font-bold text-white mb-2">Report Ready!</h2>
            <p className="text-sm text-[#94A3B8] mb-6">Your comprehensive ERP operations report has been generated with all current data.</p>
            <button onClick={handleDownload} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Download size={16} /> Download Report
            </button>
          </div>
        ) : (
          <div className="relative z-10 py-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#5B5FFF] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              <FileText size={28} className="text-[#050816]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Generate ERP Report</h2>
            <p className="text-sm text-[#94A3B8] mb-6">This will compile KPIs, warehouse data, manufacturing status, logistics, and AI insights into a downloadable report.</p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold hover:scale-[1.02] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
            {generating ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Generating Report...
              </span>
            ) : (
              'Generate Now'
            )}
            </button>
          </div>
        )}
      </motion.div>
      </div>
    </Portal>
  );
}

export function ERPPage() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span> Systems Online
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Enterprise Operations</h1>
          <p className="text-[#94A3B8] font-medium">Mission control for procurement, manufacturing, and supply chain logistics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModal('approvals')}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Approval Queue <span className="ml-2 bg-rose-500 text-white px-2 py-0.5 rounded-full text-xs">3</span>
          </button>
          <button
            onClick={() => setActiveModal('report')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-transform hover:scale-[1.02]"
          >
            Generate ERP Report
          </button>
        </div>
      </div>

      {/* Main ERP Dashboard Layout */}
      <OperationsDashboard />

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'approvals' && <ApprovalQueueModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'report' && <ERPReportModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

    </div>
  );
}
