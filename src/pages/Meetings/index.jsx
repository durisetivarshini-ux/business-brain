import React, { useState } from 'react';
import { Video, Upload, FileText, CheckSquare, Calendar, Users, Zap, Clock, ChevronRight, Mic, MessageCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const meetings = [
  {
    id: 1,
    title: 'Q3 Board Meeting',
    date: 'Oct 12, 2026',
    duration: '45 min',
    attendees: 8,
    status: 'Analyzed',
    summary: 'The board reviewed Q3 financial performance, which exceeded targets by 12%. The primary discussion focused on the upcoming Series C funding round and the proposed acquisition of TechNova. The CEO expressed concerns about Q4 supply chain risks in APAC, while the CTO outlined the roadmap for the new AI Copilot integration.',
    decisions: [
      'Approved the $2M budget allocation for the Series C marketing roadshow.',
      'Delayed the EU expansion until Q2 2027 to focus on North American retention.',
    ],
    tasks: [
      { assignee: 'Sarah (CFO)', task: 'Draft initial Series C term sheet for review.', due: 'Next Week' },
      { assignee: 'David (CTO)', task: 'Finalize technical due diligence on TechNova.', due: 'This Friday' },
      { assignee: 'Marcus (COO)', task: 'Secure secondary suppliers for APAC region.', due: 'Next Week' },
    ],
    nextMeeting: 'Nov 15, 2026',
  },
  {
    id: 2,
    title: 'Product Sync: Mobile App',
    date: 'Oct 10, 2026',
    duration: '30 min',
    attendees: 5,
    status: 'Analyzed',
    summary: 'Product and engineering teams aligned on the Q4 mobile roadmap. Key discussion around push notification strategy and onboarding flow optimization.',
    decisions: [
      'Approved A/B testing for new onboarding flow.',
    ],
    tasks: [
      { assignee: 'Nina (PM)', task: 'Create A/B test spec and success metrics.', due: 'This Week' },
    ],
    nextMeeting: 'Oct 24, 2026',
  },
  {
    id: 3,
    title: 'Client Kickoff: NovaCorp',
    date: 'Oct 08, 2026',
    duration: '60 min',
    attendees: 6,
    status: 'Analyzed',
    summary: 'Successful kickoff with NovaCorp leadership. Contract signed for the Enterprise tier. Implementation to begin in 3 weeks.',
    decisions: [
      'Assigned dedicated CSM to NovaCorp account.',
      'Go-live target set for November 30, 2026.',
    ],
    tasks: [
      { assignee: 'James (CSM)', task: 'Send welcome package and integration docs.', due: 'Tomorrow' },
    ],
    nextMeeting: 'Oct 22, 2026',
  },
];

export function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState(meetings[0]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Video size={22} className="text-white" />
            </div>
            AI Meeting Intelligence
          </h1>
          <p className="text-[#94A3B8] font-medium">Upload transcripts to auto-generate summaries, action items & decisions.</p>
        </div>
        <label
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-transform flex items-center gap-2 cursor-pointer"
        >
          <Upload size={16} /> Upload Transcript
          <input type="file" className="hidden" accept=".txt,.vtt,.srt" onChange={(e) => {
            if(e.target.files.length) toast.success(`Processing ${e.target.files[0].name}...`, { icon: '🚀' })
          }} />
        </label>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Panel: Upload + Meeting List */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          
          {/* Drop Zone */}
          <label
            className={`block p-6 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[160px] rounded-2xl ${
              isDraggingOver
                ? 'border-[#3B82F6] bg-[#3B82F6]/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                : 'border-white/10 bg-[#0B1120]/60 hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/5'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={(e) => { 
              e.preventDefault(); 
              setIsDraggingOver(false); 
              if(e.dataTransfer.files.length) {
                toast.success(`Processing ${e.dataTransfer.files[0].name}...`, { icon: '🚀' });
              }
            }}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${isDraggingOver ? 'bg-[#3B82F6]/30 scale-110' : 'bg-[#3B82F6]/10'}`}>
              {isDraggingOver ? <Mic size={28} className="text-[#3B82F6]" /> : <Upload size={24} className="text-[#3B82F6]" />}
            </div>
            <p className="text-white font-bold text-sm mb-1">{isDraggingOver ? 'Drop to analyze!' : 'Drag & Drop Transcript'}</p>
            <p className="text-xs text-[#94A3B8]">Supports .txt, .vtt, .srt, or audio</p>
            <input type="file" className="hidden" accept=".txt,.vtt,.srt" onChange={(e) => {
              if(e.target.files.length) toast.success(`Processing ${e.target.files[0].name}...`, { icon: '🚀' })
            }} />
          </label>

          {/* Meeting List */}
          <div>
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-3 px-1">Recent Meetings</h3>
            <div className="space-y-2">
              {meetings.map(meeting => (
                <motion.div
                  key={meeting.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedMeeting(meeting)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selectedMeeting.id === meeting.id
                      ? 'border-[#3B82F6] bg-gradient-to-r from-[#3B82F6]/15 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="font-bold text-white text-sm leading-tight">{meeting.title}</p>
                    <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">{meeting.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[#94A3B8]">
                    <span className="flex items-center gap-1"><Calendar size={10}/> {meeting.date}</span>
                    <span className="flex items-center gap-1"><Users size={10}/> {meeting.attendees}</span>
                    <span className="flex items-center gap-1"><Clock size={10}/> {meeting.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Analysis View */}
        <div className="xl:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMeeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard className="p-0 border-[#3B82F6]/20 bg-[#0B1120]/60 overflow-hidden">
                
                {/* Meeting Header */}
                <div className="p-6 border-b border-white/5 bg-gradient-to-r from-[#3B82F6]/10 to-transparent">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedMeeting.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#94A3B8]">
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#3B82F6]"/> {selectedMeeting.date}</span>
                        <span className="flex items-center gap-1.5"><Users size={14} className="text-[#8B5CF6]"/> {selectedMeeting.attendees} Attendees</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#00D4FF]"/> {selectedMeeting.duration}</span>
                        <span className="flex items-center gap-1.5"><Video size={14} className="text-[#EC4899]"/> Next: {selectedMeeting.nextMeeting}</span>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-[#10B981]/20 text-[#10B981] text-xs font-bold rounded-full flex items-center gap-2 border border-[#10B981]/30 shrink-0">
                      <Zap size={14}/> AI Analyzed
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  
                  {/* Executive Summary */}
                  <section>
                    <h3 className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <MessageCircle size={14}/> Executive Summary
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                      {selectedMeeting.summary}
                    </p>
                  </section>

                  {/* Key Decisions */}
                  <section>
                    <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <CheckSquare size={14}/> Key Decisions
                    </h3>
                    <div className="space-y-2">
                      {selectedMeeting.decisions.map((d, i) => (
                        <div key={i} className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
                          <div className="mt-0.5 w-5 h-5 rounded-md bg-[#10B981]/20 flex items-center justify-center shrink-0">
                            <CheckSquare size={12} className="text-[#10B981]"/>
                          </div>
                          <span className="text-sm text-white leading-relaxed">{d}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Action Items */}
                  <section>
                    <h3 className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText size={14}/> Assigned Tasks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedMeeting.tasks.map((task, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[#94A3B8] bg-white/5 px-2 py-0.5 rounded">{task.assignee}</span>
                            <span className="text-[10px] font-bold text-[#F59E0B]">{task.due}</span>
                          </div>
                          <p className="text-sm text-white leading-relaxed">{task.task}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
