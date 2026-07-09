import React, { useState } from 'react';
import { SupportDashboard } from './SupportDashboard';
import { BookOpen, Plus, X, Search, FileText, Loader2, CheckCircle, Tag, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

function KnowledgeBaseModal({ onClose }) {
  const [search, setSearch] = useState('');
  
  const articles = [
    { title: "Resetting User Passwords", category: "Account", views: "1.2k" },
    { title: "Configuring SSO Integration", category: "Security", views: "850" },
    { title: "Troubleshooting Payment Failures", category: "Billing", views: "2.4k" },
    { title: "Setting up Custom Workflows", category: "Features", views: "530" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl relative overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#5B5FFF]/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]"><BookOpen size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Knowledge Base</h2>
              <p className="text-xs text-[#94A3B8]">Search internal docs and SOPs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6">
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50" 
              placeholder="Search for articles, guides, or troubleshooting steps..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {articles.map((art, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 cursor-pointer transition-colors group">
                <div className="flex items-start gap-3">
                  <FileText size={18} className="text-[#5B5FFF] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{art.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                      <span className="flex items-center gap-1"><Tag size={12} /> {art.category}</span>
                      <span className="flex items-center gap-1">👁 {art.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewTicketModal({ onClose }) {
  const [form, setForm] = useState({ subject: '', priority: 'Medium', description: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject) return toast.error('Subject is required');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
    toast.success('Ticket created successfully!');
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
            <h2 className="text-xl font-bold text-white mb-1">Ticket Created!</h2>
            <p className="text-sm text-[#94A3B8] mb-6">Ticket #TKT-8842 has been assigned.</p>
            <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold hover:scale-[1.02] transition-all">Done</button>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]"><Plus size={20} /></div>
              <div>
                <h2 className="text-xl font-bold text-white">Create New Ticket</h2>
                <p className="text-xs text-[#94A3B8]">Log an internal issue or request</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Subject</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors" placeholder="e.g. Email sync issue" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Priority</label>
                <select className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                  {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Description</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors resize-none" placeholder="Details of the issue..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold disabled:opacity-60 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Creating...</> : 'Create Ticket'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function SupportPage() {
  const [modal, setModal] = useState(null); // 'kb' | 'ticket'

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Support Center</h1>
          <p className="text-[#94A3B8] font-medium">AI-driven help desk and customer experience command center.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setModal('kb')} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
            <BookOpen size={14} /> Knowledge Base
          </button>
          <button onClick={() => setModal('ticket')} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold shadow-[0_0_15px_rgba(91,95,255,0.4)] transition-transform hover:scale-[1.02] flex items-center gap-2">
            <Plus size={14} /> New Ticket
          </button>
        </div>
      </div>

      <SupportDashboard />

      {modal === 'kb' && <KnowledgeBaseModal onClose={() => setModal(null)} />}
      {modal === 'ticket' && <NewTicketModal onClose={() => setModal(null)} />}

    </div>
  );
}
