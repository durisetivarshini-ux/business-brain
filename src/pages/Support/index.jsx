import React, { useState } from 'react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { SupportKPIGrid } from './SupportKPIGrid';
import { AISupportAssistant } from './AISupportAssistant';
import { TicketBoard } from './TicketBoard';
import { SupportCharts } from './SupportCharts';
import { BookOpen, Plus, X, Search, FileText, Loader2, CheckCircle, Tag, MessageSquare, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { GlassCard } from '@/components/ui/GlassCard';

function KnowledgeBaseModal({ onClose }) {
  const [search, setSearch] = useState('');
  
  const articles = [
    { title: "Resetting User Passwords", category: "Account", views: "1.2k" },
    { title: "Configuring SSO Integration", category: "Security", views: "850" },
    { title: "Troubleshooting Payment Failures", category: "Billing", views: "2.4k" },
    { title: "Setting up Custom Workflows", category: "Features", views: "530" },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden">
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
  const [modal, setModal] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'kb', label: 'Knowledge Base' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const recentTickets = [
    { id: 'TKT-8842', subject: 'Outlook Sync failing for Sales team', customer: 'Nexus Corp', priority: 'High', date: '16 Jul 2026', status: 'In Progress' },
    { id: 'TKT-8835', subject: 'SSO login authentication error', customer: 'Alpha Labs', priority: 'Critical', date: '15 Jul 2026', status: 'In Progress' },
    { id: 'TKT-8821', subject: 'Invoice download format issue', customer: 'Zeta Inc', priority: 'Medium', date: '14 Jul 2026', status: 'Resolved' },
    { id: 'TKT-8810', subject: 'New team member onboarding access', customer: 'Global Ind', priority: 'Low', date: '12 Jul 2026', status: 'Resolved' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="Support Center"
        description="AI-driven help desk and customer experience command center."
        primaryAction={{
          label: "New Ticket",
          onClick: () => setModal('ticket'),
          icon: <Plus size={14} />
        }}
        secondaryAction={{
          label: "Knowledge Base",
          onClick: () => setModal('kb'),
          icon: <BookOpen size={14} />
        }}
        moduleName="Support"
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* 1. 4 KPIs */}
          <SupportKPIGrid />

          {/* 2. AI Assistant */}
          <AISupportAssistant />

          {/* 3. Main Business Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col bg-white/5 border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Helpdesk Tickets</h3>
                <span className="text-xs text-[#94A3B8]">Live Update</span>
              </div>
              <TicketBoard />
            </div>
            <SupportCharts />
          </div>

          {/* 4. Recent Activity Table */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Tickets Log</h3>
              <button onClick={() => setActiveTab('tickets')} className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer">
                View all tickets <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#94A3B8]">
                <thead className="text-xs text-white uppercase bg-white/5 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">ID</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentTickets.map((tkt, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-[#00D4FF]">{tkt.id}</td>
                      <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                        <MessageSquare size={14} className="text-[#5B5FFF]" />
                        <span>{tkt.subject}</span>
                      </td>
                      <td className="px-4 py-3 text-white">{tkt.customer}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tkt.priority === 'Critical' || tkt.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          tkt.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                        }`}>
                          {tkt.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">{tkt.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tkt.status === 'Resolved' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' :
                          'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {tkt.status}
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

      {activeTab === 'tickets' && (
        <div className="flex flex-col gap-6">
          <TicketBoard />
        </div>
      )}

      {activeTab === 'kb' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 max-w-xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-2">Internal SOPs & Knowledge Base</h2>
            <p className="text-sm text-[#94A3B8] mb-6">Search user guides and release docs assignment guides.</p>
            <button onClick={() => setModal('kb')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white font-bold hover:scale-[1.02] transition-all cursor-pointer">
              Launch KB Search Engine
            </button>
          </GlassCard>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-6">
          <SupportCharts />
        </div>
      )}

      {modal === 'kb' && <KnowledgeBaseModal onClose={() => setModal(null)} />}
      {modal === 'ticket' && <NewTicketModal onClose={() => setModal(null)} />}

    </div>
  );
}
