import React, { useState } from 'react';
import { MarketingDashboard } from './MarketingDashboard';
import toast from 'react-hot-toast';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
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

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Marketing Studio</h1>
          <p className="text-[#94A3B8] font-medium">Orchestrate campaigns and content across all channels using AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCalendar(true)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Content Calendar
          </button>
          <button
            onClick={() => setShowNewCampaign(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-transform hover:scale-[1.02]"
          >
            + New Campaign
          </button>
        </div>
      </div>

      {/* Main Marketing Dashboard Layout */}
      <MarketingDashboard />

      {/* Modals */}
      {showCalendar && <ContentCalendarModal onClose={() => setShowCalendar(false)} />}
      {showNewCampaign && <NewCampaignModal onClose={() => setShowNewCampaign(false)} />}
    </div>
  );
}
