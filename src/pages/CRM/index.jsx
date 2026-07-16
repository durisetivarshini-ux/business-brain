import React, { useState } from 'react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { CRMStatsGrid } from './CRMStatsGrid';
import { AICRMAssistant, InsightsModal, EmailModal } from './AICRMAssistant';
import { LeadPipeline } from './LeadPipeline';
import { CRMCharts } from './CRMCharts';
import { CustomerTimeline } from './CustomerTimeline';
import { X, Upload, User, Phone, Mail, Building2, Tag, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { Portal } from '@/components/ui/Portal';
import { GlassCard } from '@/components/ui/GlassCard';

function AddLeadModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', stage: 'Prospecting', value: '' });
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);

  const stages = ['Prospecting', 'Proposal', 'Negotiation', 'Closing', 'Won'];
  const stageColors = { Prospecting: '#5B5FFF', Proposal: '#F59E0B', Negotiation: '#EC4899', Closing: '#00D4FF', Won: '#10B981' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email are required.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const lead = {
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...form,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setCreated(lead);
    setLoading(false);
    toast.success(`Lead "${form.name}" added to pipeline!`);
  };

  if (created) {
    const color = stageColors[created.stage] || '#5B5FFF';
    return (
      <Portal>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md rounded-2xl border border-[#5B5FFF]/30 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#5B5FFF]/10 blur-[60px] rounded-full pointer-events-none" />
            <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white z-10"><X size={20} /></button>

            <div className="flex flex-col items-center text-center mb-6 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle size={28} className="text-[#10B981]" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Lead Added!</h2>
              <p className="text-sm text-[#94A3B8]">Successfully added to your CRM pipeline.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-5 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-bold text-white">{created.name}</p>
                  <p className="text-xs font-mono text-[#94A3B8] mt-0.5">{created.id}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color, backgroundColor: `${color}20`, border: `1px solid ${color}40` }}>
                  {created.stage}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Email', value: created.email },
                  { label: 'Company', value: created.company || '—' },
                  { label: 'Phone', value: created.phone || '—' },
                  { label: 'Deal Value', value: created.value ? `₹${Number(created.value).toLocaleString('en-IN')}` : '—' },
                ].map((row, i) => (
                  <div key={i}>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-bold mb-0.5">{row.label}</p>
                    <p className="font-semibold text-white truncate">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 relative z-10">
              <button onClick={() => { setCreated(null); setForm({ name: '', email: '', phone: '', company: '', stage: 'Prospecting', value: '' }); }} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
                Add Another
              </button>
              <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold hover:scale-[1.02] transition-all">
                Done
              </button>
            </div>
          </div>
        </div>
      </Portal>
    );
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]"><User size={18} /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New Lead</h2>
              <p className="text-xs text-[#94A3B8]">Add a contact to your CRM pipeline</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Full Name *</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" placeholder="e.g. Priya Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Email *</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" placeholder="e.g. priya@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Phone</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" placeholder="+91-98765-43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Company</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" placeholder="e.g. Nexus Corp" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Pipeline Stage</label>
                <select className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}>
                  {stages.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Deal Value (₹)</label>
                <input type="number" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" placeholder="e.g. 250000" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold disabled:opacity-60 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={14} className="animate-spin" /> Adding...</> : '+ Add Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}

function ImportDataModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
    toast.success('Customer data imported successfully!');
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]"><Upload size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Import Customer Data</h2>
              <p className="text-xs text-[#94A3B8]">Upload CSV / Excel file to bulk-import leads</p>
            </div>
          </div>

          {done ? (
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#10B981]/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle size={28} className="text-[#10B981]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Import Complete!</h3>
                <p className="text-sm text-[#94A3B8] mt-1">320 new contacts added · 12 duplicates skipped</p>
              </div>
              <div className="w-full grid grid-cols-3 gap-3 mt-2">
                {[{ label: 'Imported', value: '320', color: '#10B981' }, { label: 'Skipped', value: '12', color: '#F59E0B' }, { label: 'Errors', value: '0', color: '#EF4444' }].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold hover:scale-[1.02] transition-all">Done</button>
            </div>
          ) : (
            <>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 mb-5 hover:border-[#5B5FFF]/40 transition-colors cursor-pointer">
                <Upload size={32} className="text-[#5B5FFF]" />
                <div className="text-center">
                  <p className="text-sm font-bold text-white">Drop your CSV file here</p>
                  <p className="text-xs text-[#94A3B8] mt-1">or click to browse · Max 10 MB</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-[#94A3B8]">CSV · XLSX · XLS supported</span>
              </div>
              <p className="text-xs text-[#94A3B8] mb-4 text-center">Columns: Name, Email, Phone, Company, Stage, Value</p>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
                <button onClick={handleImport} disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold disabled:opacity-60 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Importing...</> : <><Upload size={14} /> Import Data</>}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Portal>
  );
}

export function CRMPage() {
  const [modal, setModal] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'customers', label: 'Customers' },
    { id: 'leads', label: 'Leads' },
    { id: 'insights', label: 'Insights' }
  ];

  const recentLeadsList = [
    { company: 'Nexus Industries', contact: 'Priya Sharma', value: '₹45,00,000', deadline: '25 Jul 2026', priority: 'High' },
    { company: 'Healthcare Sector', contact: 'Anil Gupta', value: '₹1,20,00,000', deadline: '30 Jul 2026', priority: 'High' },
    { company: 'Global Logistics', contact: 'Ritu Sen', value: '₹28,00,000', deadline: '05 Aug 2026', priority: 'Medium' },
    { company: 'Acme Products', contact: 'Rohan Mehra', value: '₹15,00,000', deadline: '10 Aug 2026', priority: 'Low' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="Customer Relations (CRM)"
        description="Manage leads, track deals, and analyze customer health in real-time."
        primaryAction={{
          label: "Add Lead",
          onClick: () => setModal('addLead'),
          icon: <User size={14} />
        }}
        secondaryAction={{
          label: "Import Data",
          onClick: () => setModal('import'),
          icon: <Upload size={14} />
        }}
        moduleName="CRM"
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* 1. 4 KPIs */}
          <CRMStatsGrid />

          {/* 2. AI Assistant */}
          <AICRMAssistant onOpenModal={(m) => setModal(m)} />

          {/* 3. Main Business Widget (Kanban pipeline) */}
          <div className="flex flex-col bg-white/5 border border-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Lead Pipeline</h3>
              <span className="text-xs text-[#94A3B8] bg-white/5 px-2 py-1 rounded">Live updates</span>
            </div>
            <LeadPipeline />
          </div>

          {/* 4. CRM Analytics Charts (exactly 2) */}
          <CRMCharts />

          {/* 5. Recent Activity Table */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Active Leads</h3>
              <button onClick={() => setActiveTab('leads')} className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer">
                View all leads <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#94A3B8]">
                <thead className="text-xs text-white uppercase bg-white/5 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Company</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Deadline</th>
                    <th className="px-4 py-3 rounded-r-lg">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentLeadsList.map((lead, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-bold text-white">{lead.company}</td>
                      <td className="px-4 py-3 text-white">{lead.contact}</td>
                      <td className="px-4 py-3 text-[#10B981] font-semibold">{lead.value}</td>
                      <td className="px-4 py-3">{lead.deadline}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          lead.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          lead.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-[#94A3B8]/20 text-[#94A3B8] border border-white/10'
                        }`}>
                          {lead.priority}
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

      {activeTab === 'customers' && (
        <div className="flex flex-col gap-6">
          <CustomerTimeline />
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="flex flex-col gap-6">
          <LeadPipeline />
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="flex flex-col gap-6">
          <CRMCharts />
        </div>
      )}

      {modal === 'addLead' && <AddLeadModal onClose={() => setModal(null)} />}
      {modal === 'import' && <ImportDataModal onClose={() => setModal(null)} />}
      {modal === 'insights' && <InsightsModal onClose={() => setModal(null)} />}
      {modal === 'email' && <EmailModal onClose={() => setModal(null)} />}

    </div>
  );
}
