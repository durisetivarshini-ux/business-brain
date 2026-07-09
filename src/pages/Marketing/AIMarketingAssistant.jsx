import React, { useState } from 'react';
import { Bot, Sparkles, FileText, Share2, Search, X, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

const seoReportData = [
  { keyword: 'AI Business Tools', rank: 3, volume: '22K/mo', trend: '↑', change: '+2' },
  { keyword: 'CRM Software India', rank: 7, volume: '18K/mo', trend: '↑', change: '+5' },
  { keyword: 'Marketing Automation', rank: 12, volume: '45K/mo', trend: '→', change: '0' },
  { keyword: 'Sales Pipeline Tool', rank: 5, volume: '9K/mo', trend: '↑', change: '+3' },
  { keyword: 'ERP for SMB', rank: 18, volume: '6K/mo', trend: '↓', change: '-2' },
];

const scheduleSlots = ['Today 9:00 AM', 'Today 12:00 PM', 'Today 6:00 PM', 'Tomorrow 9:00 AM', 'Tomorrow 2:00 PM', 'This Friday 11:00 AM'];
const channels = ['Instagram', 'LinkedIn', 'Twitter/X', 'Facebook', 'Email', 'Blog'];

function ScheduleContentModal({ onClose }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSchedule = async () => {
    if (!selectedSlot || !selectedChannel) {
      toast.error('Please select a time slot and channel.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success(`Content scheduled on ${selectedChannel} for ${selectedSlot}!`);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-[#EC4899]/20 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 flex items-center justify-center text-[#EC4899]"><Share2 size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">Schedule Content</h2>
            <p className="text-xs text-[#94A3B8]">AI-recommended publishing slots</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Select Time Slot</p>
          <div className="grid grid-cols-2 gap-2">
            {scheduleSlots.map(slot => (
              <button key={slot} onClick={() => setSelectedSlot(slot)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${selectedSlot === slot ? 'bg-[#EC4899]/20 border-[#EC4899]/50 text-[#EC4899]' : 'bg-white/5 border-white/5 text-[#94A3B8] hover:bg-white/10'}`}>
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Select Channel</p>
          <div className="grid grid-cols-3 gap-2">
            {channels.map(ch => (
              <button key={ch} onClick={() => setSelectedChannel(ch)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${selectedChannel === ch ? 'bg-[#7C3AED]/20 border-[#7C3AED]/50 text-[#7C3AED]' : 'bg-white/5 border-white/5 text-[#94A3B8] hover:bg-white/10'}`}>
                {ch}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
          <button onClick={handleSchedule} disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold hover:scale-[1.02] transition-all disabled:opacity-60">
            {loading ? 'Scheduling...' : 'Schedule Content'}
          </button>
        </div>
      </div>
    </div>
  );
}

function SEOReportModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#EC4899]/20 bg-[#0B1120] shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 flex items-center justify-center text-[#EC4899]"><Search size={20} /></div>
          <div>
            <h2 className="text-xl font-bold text-white">SEO Report</h2>
            <p className="text-xs text-[#94A3B8]">Top keyword rankings · Updated today</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left px-4 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Keyword</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Rank</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Volume</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody>
              {seoReportData.map((row, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{row.keyword}</td>
                  <td className="px-4 py-3 text-center text-white font-bold">#{row.rank}</td>
                  <td className="px-4 py-3 text-center text-[#94A3B8]">{row.volume}</td>
                  <td className="px-4 py-3 text-center font-bold">
                    <span className={row.trend === '↑' ? 'text-[#10B981]' : row.trend === '↓' ? 'text-[#EF4444]' : 'text-[#94A3B8]'}>
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {[{ label: 'Avg. Rank', value: '#9' }, { label: 'Total Keywords', value: '147' }, { label: 'Organic Traffic', value: '8.4K' }].map(s => (
            <div key={s.label} className="p-3 rounded-xl bg-white/5 text-center">
              <p className="text-xs text-[#94A3B8] mb-1">{s.label}</p>
              <p className="text-lg font-bold text-white">{s.value}</p>
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

export function AIMarketingAssistant() {
  const [activeModal, setActiveModal] = useState(null);

  const insights = [
    { text: "Instagram campaign is performing 28% above average engagement.", highlight: "performing 28% above average" },
    { text: "Email CTR increased by 14% on the Q3 product launch sequence.", highlight: "increased by 14%" },
    { text: "AI recommends publishing content tomorrow at 9 AM for maximum reach.", highlight: "tomorrow at 9 AM" },
    { text: "The new blog article has high SEO potential for 'AI Business Tools'.", highlight: "high SEO potential" },
    { text: "Campaign ROI is expected to exceed target by 12% this month.", highlight: "exceed target by 12%" },
  ];

  const handleGenerateAnalytics = () => {
    const promise = new Promise(r => setTimeout(r, 1500));
    toast.promise(promise, {
      loading: 'Generating campaign analytics report...',
      success: 'Campaign Analytics Report ready! Download will start shortly.',
      error: 'Failed to generate analytics.',
    });
  };

  return (
    <GlassCard className="p-8 border-[#EC4899]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden shadow-[0_10px_40px_rgba(236,72,153,0.15)]">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#EC4899]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left: AI Intro */}
        <div className="md:w-1/3 flex flex-col justify-center border-r border-white/10 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/30 text-[#EC4899] text-xs font-bold uppercase tracking-wider mb-6 self-start">
            <Sparkles size={14} /> Campaign AI Active
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#EC4899] to-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              <Bot size={28} className="text-[#050816]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Audience AI</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">Marketing Insights</p>
            </div>
          </div>

          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            I've analyzed your multi-channel performance, SEO rankings, and audience sentiment. Here are the most critical actions to optimize ROI.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveModal('schedule')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-lg shadow-[#EC4899]/20 transition-transform hover:scale-[1.02]"
            >
              <Share2 size={16} /> Schedule Content
            </button>
            <button
              onClick={() => setActiveModal('seo')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <Search size={16} /> View SEO Report
            </button>
            <button
              onClick={handleGenerateAnalytics}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <FileText size={16} /> Generate Campaign Analytics
            </button>
          </div>
        </div>

        {/* Right: Insights List */}
        <div className="md:w-2/3 flex flex-col justify-center">
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                <span className="text-[#EC4899] mt-1 text-lg leading-none">•</span>
                <p className="text-[#F8FAFC] text-base leading-relaxed">
                  {insight.text.split(insight.highlight).map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] to-[#7C3AED]">
                          {insight.highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modals */}
      {activeModal === 'schedule' && <ScheduleContentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'seo' && <SEOReportModal onClose={() => setActiveModal(null)} />}
    </GlassCard>
  );
}
