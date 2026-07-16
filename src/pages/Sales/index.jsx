import React, { useState } from 'react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { SalesKPIGrid } from './SalesKPIGrid';
import { AISalesAssistant } from './AISalesAssistant';
import { PipelineBoard } from './PipelineBoard';
import { SalesCharts } from './SalesCharts';
import { RevenueForecast } from './RevenueForecast';
import { OpportunityFinder } from './OpportunityFinder';
import toast from 'react-hot-toast';
import { X, Target, TrendingUp, CheckCircle, Calendar, User, IndianRupee, Tag, Loader2, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

function NewDealModal({ onClose }) {
  const [form, setForm] = useState({ client: '', value: '', stage: 'Prospecting', owner: '' });
  const [loading, setLoading] = useState(false);
  const [createdDeal, setCreatedDeal] = useState(null);

  const stageColors = {
    Prospecting: '#5B5FFF', Proposal: '#F59E0B', Negotiation: '#EC4899',
    Closing: '#00D4FF', Won: '#10B981',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client || !form.value) {
      toast.error('Client name and deal value are required.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const deal = {
      id: `DEAL-${Math.floor(1000 + Math.random() * 9000)}`,
      client: form.client,
      value: Number(form.value).toLocaleString('en-IN'),
      stage: form.stage,
      owner: form.owner || 'Unassigned',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setCreatedDeal(deal);
    setLoading(false);
    toast.success(`Deal for ${form.client} added to pipeline!`);
  };

  if (createdDeal) {
    const stageColor = stageColors[createdDeal.stage] || '#10B981';
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="w-full max-w-md rounded-2xl border border-[#10B981]/30 bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981]/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle size={32} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Deal Created!</h2>
            <p className="text-sm text-[#94A3B8]">Successfully added to your sales pipeline.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-6 relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-bold text-white">{createdDeal.client}</p>
                <p className="text-xs text-[#94A3B8] font-mono mt-0.5">{createdDeal.id}</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${stageColor}20`, color: stageColor, border: `1px solid ${stageColor}40` }}>
                {createdDeal.stage}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
                  <IndianRupee size={13} className="text-[#10B981]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Deal Value</p>
                  <p className="text-sm font-bold text-white">₹{createdDeal.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#5B5FFF]/20 flex items-center justify-center">
                  <User size={13} className="text-[#5B5FFF]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Owner</p>
                  <p className="text-sm font-bold text-white">{createdDeal.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EC4899]/20 flex items-center justify-center">
                  <Calendar size={13} className="text-[#EC4899]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Created</p>
                  <p className="text-sm font-bold text-white">{createdDeal.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
                  <Tag size={13} className="text-[#F59E0B]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Stage</p>
                  <p className="text-sm font-bold text-white">{createdDeal.stage}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setCreatedDeal(null); setForm({ client: '', value: '', stage: 'Prospecting', owner: '' }); }}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
            >
              Add Another
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-white text-sm font-bold hover:scale-[1.02] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <h2 className="text-xl font-bold text-white mb-1">Create New Deal</h2>
        <p className="text-sm text-[#94A3B8] mb-6">Add a new deal to your sales pipeline.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Client / Company Name *</label>
            <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" placeholder="e.g. Nexus Industries" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Deal Value (₹) *</label>
            <input type="number" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" placeholder="e.g. 500000" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Pipeline Stage</label>
            <select className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}>
              {['Prospecting', 'Proposal', 'Negotiation', 'Closing', 'Won'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Deal Owner</label>
            <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]/50 transition-colors" placeholder="e.g. Raj Kumar" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} />
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-white text-sm font-bold shadow-lg disabled:opacity-60 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Creating...</> : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ViewTargetsModal({ onClose }) {
  const targets = [
    { label: 'Q4 Revenue Target', current: '₹28.6 Cr', goal: '₹35 Cr', pct: 82 },
    { label: 'New Leads Goal', current: '2,480', goal: '3,000', pct: 83 },
    { label: 'Deals Closed', current: '94', goal: '120', pct: 78 },
    { label: 'Monthly Target', current: '92%', goal: '100%', pct: 92 },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]"><Target size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">Sales Targets</h2>
            <p className="text-xs text-[#94A3B8]">Q4 2026 Performance vs Goals</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {targets.map((t, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-white">{t.label}</span>
                <span className="text-xs text-[#94A3B8]">{t.current} / {t.goal}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#00D4FF] transition-all duration-700" style={{ width: `${t.pct}%` }} />
              </div>
              <div className="text-right text-xs text-[#10B981] font-bold mt-1">{t.pct}%</div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-white text-sm font-bold shadow-lg hover:scale-[1.02] transition-all">Close</button>
      </div>
    </div>
  );
}

function downloadSalesReport() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN');
  const rows = [
    ['Business Brain – Sales Report', '', '', ''],
    [`Generated on: ${dateStr}`, '', '', ''],
    ['', '', '', ''],
    ['Metric', 'Current Value', 'Target', 'Status'],
    ['Total Revenue', '₹28.6 Cr', '₹35 Cr', '82%'],
    ['New Leads', '2,480', '3,000', '83%'],
    ['Orders Processed', '1,186', '1,400', '85%'],
    ['Conversion Rate', '41%', '50%', '82%'],
    ['Avg Deal Size', '₹2.8 L', '₹3.5 L', '80%'],
    ['Monthly Target', '92%', '100%', '92%'],
  ];

  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Sales_Report_${now.toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function SalesPage() {
  const [showNewDeal, setShowNewDeal] = useState(false);
  const [showTargets, setShowTargets] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'opportunities', label: 'Opportunities' }
  ];

  const handleExportPDF = async () => {
    const promise = new Promise(r => setTimeout(r, 1200));
    toast.promise(promise, {
      loading: 'Generating Sales Report...',
      success: 'Sales Report downloaded!',
      error: 'Failed to generate report.',
    });
    await promise;
    downloadSalesReport();
  };

  const recentDeals = [
    { client: 'Nexus Industries', value: '₹1.8 Cr', stage: 'Negotiation', owner: 'Raj Kumar', date: '16 Jul 2026' },
    { client: 'Healthcare Sector', value: '₹1.2 Cr', stage: 'Proposal', owner: 'Aarav Mehta', date: '15 Jul 2026' },
    { client: 'Global Logistics', value: '₹28 L', stage: 'Prospecting', owner: 'Pooja Sen', date: '14 Jul 2026' },
    { client: 'Apex Labs', value: '₹85 L', stage: 'Won', owner: 'Vikram Singh', date: '12 Jul 2026' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="Sales Revenue"
        description="Drive growth with AI-powered sales pipelines and revenue forecasting."
        primaryAction={{
          label: "+ New Deal",
          onClick: () => setShowNewDeal(true)
        }}
        secondaryAction={{
          label: "View Targets",
          onClick: () => setShowTargets(true)
        }}
        moduleName="Sales"
        onExportPDF={handleExportPDF}
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* 1. 4 Executive KPI Cards */}
          <SalesKPIGrid />

          {/* 2. AI Insight Panel */}
          <AISalesAssistant />

          {/* 3. Main Business Widget & Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <PipelineBoard />
            </div>
            <div>
              <SalesCharts />
            </div>
          </div>

          {/* 4. Recent Activity Table */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Enterprise Deals</h3>
              <button onClick={() => setActiveTab('pipeline')} className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer">
                View pipeline <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#94A3B8]">
                <thead className="text-xs text-white uppercase bg-white/5 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Client</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Stage</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3 rounded-r-lg">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentDeals.map((deal, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-bold text-white">{deal.client}</td>
                      <td className="px-4 py-3 text-[#10B981] font-semibold">{deal.value}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          deal.stage === 'Won' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' :
                          deal.stage === 'Negotiation' ? 'bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30' :
                          deal.stage === 'Proposal' ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30' :
                          'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {deal.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">{deal.owner}</td>
                      <td className="px-4 py-3">{deal.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'pipeline' && (
        <div className="flex flex-col gap-6">
          <PipelineBoard />
        </div>
      )}

      {activeTab === 'forecast' && (
        <div className="flex flex-col gap-6">
          <RevenueForecast />
        </div>
      )}

      {activeTab === 'opportunities' && (
        <div className="flex flex-col gap-6">
          <OpportunityFinder />
        </div>
      )}

      {showNewDeal && <NewDealModal onClose={() => setShowNewDeal(false)} />}
      {showTargets && <ViewTargetsModal onClose={() => setShowTargets(false)} />}
    </div>
  );
}
