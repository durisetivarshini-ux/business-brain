import React, { useState } from 'react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { MarketingKPIGrid } from './MarketingKPIGrid';
import { AIMarketingAssistant } from './AIMarketingAssistant';
import { MarketingCharts } from './MarketingCharts';
import { AIContentStudio } from './AIContentStudio';
import toast from 'react-hot-toast';
import { X, Calendar, ChevronLeft, ChevronRight, Megaphone, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const scheduledContent = {
  3: [{ label: 'Email Campaign – Q3 Launch', color: '#EC4899' }],
  7: [{ label: 'Instagram Post – Product Reel', color: '#7C3AED' }],
  12: [{ label: 'Blog Article – AI Tools', color: '#00D4FF' }],
  15: [{ label: 'LinkedIn Article', color: '#10B981' }],
  20: [{ label: 'Email Newsletter', color: '#EC4899' }],
  25: [{ label: 'Webinar Promo Post', color: '#7C3AED' }],
};

function ContentCalendarModal({ onClose }) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 flex items-center justify-center text-[#EC4899]"><Calendar size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">Content Calendar</h2>
            <p className="text-xs text-[#94A3B8]">Scheduled campaigns and content</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"><ChevronLeft size={16} /></button>
          <span className="text-white font-bold">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"><ChevronRight size={16} /></button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => <div key={d} className="text-center text-xs font-bold text-[#94A3B8] py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => (
            <div key={i} className={`min-h-[60px] rounded-lg p-1 text-xs ${day ? 'bg-white/5 hover:bg-white/10 cursor-pointer transition-colors' : ''} ${day === now.getDate() && month === now.getMonth() && year === now.getFullYear() ? 'ring-1 ring-[#EC4899]/50' : ''}`}>
              {day && (
                <>
                  <span className={`font-bold block mb-1 ${day === now.getDate() && month === now.getMonth() ? 'text-[#EC4899]' : 'text-[#94A3B8]'}`}>{day}</span>
                  {scheduledContent[day] && scheduledContent[day].map((item, j) => (
                    <div key={j} className="text-[9px] font-bold px-1 py-0.5 rounded truncate" style={{ backgroundColor: `${item.color}30`, color: item.color }}>{item.label}</div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          {[{ label: 'Email', color: '#EC4899' }, { label: 'Social', color: '#7C3AED' }, { label: 'Blog', color: '#00D4FF' }, { label: 'Event', color: '#10B981' }].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-xs text-[#94A3B8]">{l.label}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold hover:scale-[1.02] transition-all">
          Close
        </button>
      </div>
    </div>
  );
}

function NewCampaignModal({ onClose }) {
  const [form, setForm] = useState({ name: '', type: 'Email', budget: '', audience: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.budget) {
      toast.error('Campaign name and budget are required.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success(`Campaign "${form.name}" launched successfully!`);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <h2 className="text-xl font-bold text-white mb-1">Launch New Campaign</h2>
        <p className="text-sm text-[#94A3B8] mb-6">Configure and activate a new marketing campaign.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Campaign Name *</label>
            <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#EC4899]/50 transition-colors" placeholder="e.g. Q4 Product Launch" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Campaign Type</label>
            <select className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#EC4899]/50 transition-colors" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              {['Email', 'Social Media', 'Paid Ads', 'SEO Content', 'Webinar', 'Influencer'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Budget (₹) *</label>
            <input type="number" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#EC4899]/50 transition-colors" placeholder="e.g. 150000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Target Audience</label>
            <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#EC4899]/50 transition-colors" placeholder="e.g. SMB owners in India" value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })} />
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-lg disabled:opacity-60 transition-all hover:scale-[1.02]">
              {loading ? 'Launching...' : '🚀 Launch Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function MarketingPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'content', label: 'Content Studio' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const recentCampaigns = [
    { name: 'Q3 Launch Email Sequence', channel: 'Email', budget: '₹1,50,000', leads: '1,240', status: 'Running' },
    { name: 'Instagram Video Reels Promo', channel: 'Instagram', budget: '₹80,000', leads: '850', status: 'Running' },
    { name: 'LinkedIn Enterprise Outreach', channel: 'LinkedIn', budget: '₹2,50,000', leads: '420', status: 'Planned' },
    { name: 'AI Product Guide Blog SEO', channel: 'Blog', budget: '₹30,000', leads: '380', status: 'Completed' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="Marketing Studio"
        description="Orchestrate campaigns and content across all channels using AI."
        primaryAction={{
          label: "New Campaign",
          onClick: () => setShowNewCampaign(true)
        }}
        secondaryAction={{
          label: "Content Calendar",
          onClick: () => setShowCalendar(true)
        }}
        moduleName="Marketing"
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* 1. 4 KPIs */}
          <MarketingKPIGrid />

          {/* 2. AI Assistant */}
          <AIMarketingAssistant />

          {/* 3. Main Business Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIContentStudio />
            <MarketingCharts />
          </div>

          {/* 4. Recent Activity Table */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Campaigns</h3>
              <button onClick={() => setShowCalendar(true)} className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer">
                Open Calendar <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#94A3B8]">
                <thead className="text-xs text-white uppercase bg-white/5 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Campaign Name</th>
                    <th className="px-4 py-3">Channel</th>
                    <th className="px-4 py-3">Budget</th>
                    <th className="px-4 py-3">Leads Generated</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentCampaigns.map((camp, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                        <Megaphone size={14} className="text-[#EC4899]" />
                        <span>{camp.name}</span>
                      </td>
                      <td className="px-4 py-3 text-white">{camp.channel}</td>
                      <td className="px-4 py-3 text-white font-semibold">{camp.budget}</td>
                      <td className="px-4 py-3 text-[#10B981] font-semibold">{camp.leads}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          camp.status === 'Running' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' :
                          camp.status === 'Planned' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30' :
                          'bg-[#94A3B8]/20 text-[#94A3B8] border border-white/10'
                        }`}>
                          {camp.status}
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

      {activeTab === 'campaigns' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 max-w-xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-2">Campaign Content Calendar</h2>
            <p className="text-sm text-[#94A3B8] mb-6">View scheduled social posts, email sequences, and articles.</p>
            <button onClick={() => setShowCalendar(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white font-bold hover:scale-[1.02] transition-all cursor-pointer">
              Open Interactive Calendar
            </button>
          </GlassCard>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="flex flex-col gap-6">
          <AIContentStudio />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-6">
          <MarketingCharts />
        </div>
      )}

      {showCalendar && <ContentCalendarModal onClose={() => setShowCalendar(false)} />}
      {showNewCampaign && <NewCampaignModal onClose={() => setShowNewCampaign(false)} />}
    </div>
  );
}
