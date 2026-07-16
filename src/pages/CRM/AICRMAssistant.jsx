import React, { useState } from 'react';
import { Bot, Sparkles, FileText, Mail, BarChart2, X, Loader2, CheckCircle, TrendingUp, Users, Activity, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { InsightPanel } from '../../components/ui/InsightPanel';
import toast from 'react-hot-toast';

const insightData = [
  { icon: <TrendingUp size={16} className="text-[#10B981]" />, title: 'Top Performing Region', value: 'North India – 38% of total revenue', color: '#10B981' },
  { icon: <Users size={16} className="text-[#00D4FF]" />, title: 'Highest Value Segment', value: 'Enterprise Tier – avg deal ₹42L', color: '#00D4FF' },
  { icon: <Activity size={16} className="text-[#F59E0B]" />, title: 'Churn Risk', value: '7 customers inactive >30 days', color: '#F59E0B' },
  { icon: <CheckCircle size={16} className="text-[#7C3AED]" />, title: 'AI Forecast', value: '22% revenue growth expected this month', color: '#7C3AED' },
];

function InsightsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#7C3AED]/20 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]"><BarChart2 size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">CRM Insights</h2>
            <p className="text-xs text-[#94A3B8]">AI-powered customer analytics · Updated now</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Total Customers', value: '18,250', color: '#5B5FFF' },
            { label: 'New Leads', value: '1,240', color: '#10B981' },
            { label: 'Deals Closed', value: '580', color: '#00D4FF' },
            { label: 'Customer Sat.', value: '96%', color: '#EC4899' },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-[#94A3B8] mt-1 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {insightData.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}20` }}>{item.icon}</div>
              <div>
                <p className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider">{item.title}</p>
                <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold hover:scale-[1.02] transition-all">Close</button>
      </div>
    </div>
  );
}

function EmailModal({ onClose }) {
  const [form, setForm] = useState({ subject: '', message: '', segment: 'All Customers' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const segments = ['All Customers', 'High-Value Leads', 'At-Risk Customers', 'New Leads (30 days)', 'Enterprise Tier'];

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.message) { toast.error('Subject and message are required.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success(`Email sent to ${form.segment}!`);
  };

  if (sent) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="w-full max-w-md rounded-2xl border border-[#10B981]/30 bg-[#0B1120] shadow-2xl p-8 relative flex flex-col items-center text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white"><X size={20} /></button>
          <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle size={32} className="text-[#10B981]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Emails Sent!</h2>
          <p className="text-sm text-[#94A3B8] mb-6">Your message was sent to <span className="text-white font-bold">{form.segment}</span>.</p>
          <div className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-left mb-5">
            <p className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-1">Subject</p>
            <p className="text-sm text-white font-semibold">{form.subject}</p>
          </div>
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold hover:scale-[1.02] transition-all">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF]"><Mail size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">Email Customers</h2>
            <p className="text-xs text-[#94A3B8]">Send a bulk email to a customer segment</p>
          </div>
        </div>
        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Segment</label>
            <select className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" value={form.segment} onChange={e => setForm({ ...form, segment: e.target.value })}>
              {segments.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Subject *</label>
            <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors" placeholder="e.g. Q4 Exclusive Offer for You" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 block">Message *</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 transition-colors resize-none" placeholder="Write your message here..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold disabled:opacity-60 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Mail size={14} /> Send Email</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AICRMAssistant({ onOpenModal }) {
  const insights = [
    { text: "18 high-value leads require follow-up.", highlight: "high-value" },
    { text: "7 customers are at risk of leaving.", highlight: "risk" },
    { text: "Enterprise deal worth ₹42L is ready to close.", highlight: "ready to close" },
    { text: "Customer satisfaction increased by 8%.", highlight: "increased by 8%" },
  ];

  return (
    <InsightPanel
      moduleName="CRM"
      title="Business Brain AI"
      subtitle="Today's CRM Insights"
      badgeText="AI Copilot Active"
      description="I have analyzed your sales pipeline, customer communication logs, and recent conversions. Here are the most critical actions for your team today."
      insights={insights}
      recommendationsModal={() => (
        <button 
          onClick={() => onOpenModal('insights')} 
          className="hidden"
        />
      )}
      forecastModal={() => (
        <button 
          onClick={() => onOpenModal('email')} 
          className="hidden"
        />
      )}
      themeColor="#7C3AED"
    />
  );
}

// Export modals for use in index.jsx
export { InsightsModal, EmailModal };
