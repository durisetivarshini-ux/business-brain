import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, Upload, FileText, CheckSquare, Calendar, Users, Zap, Clock, 
  ChevronRight, Mic, MessageCircle, Download, Loader2, Plus, X, 
  Play, Square, Activity, Check, AlertCircle, ExternalLink, RefreshCw,
  Globe
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useAuth } from '@/hooks/useAuth';

export function MeetingsPage() {
  const { workspaceConfig: config, businessData, addRecord, currencySymbol } = useWorkspace();
  const { user } = useAuth();
  const ownerEmail = user?.email || 'owner@businessbrain.ai';

  const industry = config?.customIndustry || 'Software Company';

  const employees = businessData?.employees || [];
  const rawMeetings = businessData?.meetings || [];

  // Local state
  const [tick, setTick] = useState(0);
  const [meetings, setMeetings] = useState(rawMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [activeTab, setActiveTab] = useState('briefing');
  const [showScheduler, setShowScheduler] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState(null);

  useEffect(() => {
    setActiveTab('briefing');
  }, [selectedMeeting?.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getMeetingCountdown = (meeting) => {
    if (!meeting) return '';
    if (meeting.status === 'Completed') return 'Meeting Ended';
    if (meeting.status === 'Missed') return 'Meeting Missed';
    if (meeting.status === 'In Progress') return 'Meeting Started';

    if (!meeting.date || !meeting.time) return 'Pending Schedule';

    const dateParts = meeting.date.split('-');
    const timeParts = meeting.time.split(':');
    if (dateParts.length < 3 || timeParts.length < 2) return 'Pending Schedule';

    const [year, month, day] = dateParts.map(Number);
    const [hours, minutes] = timeParts.map(Number);
    
    const scheduledTime = new Date(year, month - 1, day, hours, minutes, 0);
    const now = new Date();
    
    const diffMs = scheduledTime.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      const durationMins = parseInt(meeting.duration) || 30;
      if (diffMs > -durationMins * 60 * 1000) {
        return 'Meeting Started';
      } else {
        return 'Meeting Ended';
      }
    }
    
    const diffSecs = Math.floor(diffMs / 1000);
    const secs = diffSecs % 60;
    const diffMins = Math.floor(diffSecs / 60);
    const mins = diffMins % 60;
    const diffHours = Math.floor(diffMins / 60);
    const hrs = diffHours % 24;
    const days = Math.floor(diffHours / 24);
    
    if (days > 0) {
      return `Starts in ${days} Day${days > 1 ? 's' : ''} ${hrs > 0 ? `${hrs} Hour${hrs > 1 ? 's' : ''}` : ''}`.trim();
    }
    if (hrs > 0) {
      return `Starts in ${hrs} Hour${hrs > 1 ? 's' : ''} ${mins > 0 ? `${mins} Minute${mins > 1 ? 's' : ''}` : ''}`.trim();
    }
    if (mins > 0) {
      return `Starts in ${mins} Minute${mins > 1 ? 's' : ''} ${secs > 0 ? `${secs} Second${secs !== 1 ? 's' : ''}` : ''}`.trim();
    }
    return `Starts in ${secs} Second${secs !== 1 ? 's' : ''}`;
  };

  const [n8nLogs, setN8nLogs] = useState([
    { id: 1, time: '15:24:00', type: 'system', message: 'n8n Workflow Engine: Ready to receive webhook triggers.' }
  ]);
  
  // Meeting Simulator State
  const [activeMeetingSim, setActiveMeetingSim] = useState(null);
  const [simTimer, setSimTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [waveformData, setWaveformData] = useState(Array(15).fill(20));
  const simTimerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30 mins',
    priority: 'Medium',
    type: 'Video Sync',
    participants: [],
    agenda: '',
    link: 'https://meet.google.com/',
    syncGoogle: true,
    syncOutlook: false,
    reminders: ['15m before']
  });

  // Keep state in sync with context
  useEffect(() => {
    setMeetings(rawMeetings);
    if (rawMeetings && rawMeetings.length > 0) {
      if (!selectedMeeting || !rawMeetings.some(m => m.id === selectedMeeting.id)) {
        setSelectedMeeting(rawMeetings[0]);
      }
    } else {
      setSelectedMeeting(null);
    }
  }, [rawMeetings]);

  // Waveform animation loop
  useEffect(() => {
    let animId;
    if (isRecording) {
      const updateWave = () => {
        setWaveformData(prev => prev.map(() => Math.floor(Math.random() * 60) + 10));
        animId = setTimeout(updateWave, 100);
      };
      updateWave();
    } else {
      setWaveformData(Array(15).fill(15));
    }
    return () => clearTimeout(animId);
  }, [isRecording]);

  const addN8nLog = (message, type = 'info') => {
    const time = new Date().toTimeString().split(' ')[0];
    setN8nLogs(prev => [
      ...prev,
      { id: Date.now() + Math.random(), time, type, message }
    ]);
  };

  const handleRescheduleClick = (meeting) => {
    setEditingMeetingId(meeting.id);
    setFormData({
      title: meeting.title,
      date: meeting.date,
      time: meeting.time,
      duration: meeting.duration,
      priority: meeting.priority || 'Medium',
      type: meeting.type || 'Video Sync',
      participants: meeting.participants || [],
      agenda: meeting.agenda || '',
      link: meeting.link || 'https://meet.google.com/',
      syncGoogle: meeting.syncedWith?.includes('Google Calendar') || false,
      syncOutlook: meeting.syncedWith?.includes('Microsoft Outlook') || false,
      reminders: meeting.reminders || ['15m before']
    });
    setShowScheduler(true);
  };

  const handleCancelMeeting = (meeting) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel the meeting "${meeting.title}"? This will purge all scheduled reminders.`);
    if (!confirmCancel) return;

    const userId = 'guest';
    const companyDataRaw = localStorage.getItem(`company_business_data_${userId}`);
    if (companyDataRaw) {
      try {
        const parsed = JSON.parse(companyDataRaw);
        const updatedMeetings = (parsed.meetings || []).map(m => {
          if (m.id === meeting.id) {
            return { ...m, status: 'Missed' };
          }
          return m;
        });
        
        localStorage.setItem(`company_business_data_${userId}`, JSON.stringify({
          ...parsed,
          meetings: updatedMeetings
        }));
        
        setMeetings(updatedMeetings);
        setSelectedMeeting(prev => prev?.id === meeting.id ? { ...prev, status: 'Missed' } : prev);
      } catch (e) {}
    }

    // Call backend to clear scheduled timeouts
    fetch('/api/meetings/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingId: meeting.id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          addN8nLog(`[n8n Event] Canceled scheduled SMTP notifications for ID ${meeting.id} in backend.`, 'success');
        }
      })
      .catch(err => console.error('[SMTP CANCEL FETCH ERROR]', err));

    toast.success('Meeting cancelled and scheduled reminders purged!');
    
    // Trigger Cancel logs
    setShowLogs(true);
    addN8nLog(`n8n Cancel Trigger: Cancelled event "${meeting.title}"`, 'trigger');
    addN8nLog(`n8n Node [Cancel Jobs]: Canceled and purged all scheduled cron notifications for ID ${meeting.id}.`, 'notification');
    addN8nLog(`n8n Node [SMTP Mailer]: Dispatched cancellation notice email to all invited participants.`, 'notification');
    addN8nLog(`n8n Database sync: Meeting ID ${meeting.id} marked as Missed. 0 duplicate jobs left.`, 'db');
    addN8nLog(`n8n Workflow execution completed.`, 'success');
  };

  // Schedule Meeting handler
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      toast.error('Please enter Title, Date, and Time.');
      return;
    }

    if (editingMeetingId) {
      // Rescheduling flow
      const userId = 'guest';
      let updatedM = null;
      const companyDataRaw = localStorage.getItem(`company_business_data_${userId}`);
      if (companyDataRaw) {
        try {
          const parsed = JSON.parse(companyDataRaw);
          const updatedMeetings = (parsed.meetings || []).map(m => {
            if (m.id === editingMeetingId) {
              return {
                ...m,
                title: formData.title,
                date: formData.date,
                time: formData.time,
                duration: formData.duration,
                priority: formData.priority,
                type: formData.type,
                participants: formData.participants,
                agenda: formData.agenda,
                link: formData.link,
                syncedWith: [
                  ...(formData.syncGoogle ? ['Google Calendar'] : []),
                  ...(formData.syncOutlook ? ['Microsoft Outlook'] : [])
                ],
                reminders: formData.reminders,
                status: 'Upcoming'
              };
            }
            return m;
          });
          
          localStorage.setItem(`company_business_data_${userId}`, JSON.stringify({
            ...parsed,
            meetings: updatedMeetings
          }));
          
          setMeetings(updatedMeetings);
          updatedM = updatedMeetings.find(m => m.id === editingMeetingId);
          setSelectedMeeting(updatedM);
        } catch (err) {}
      }
      
      setShowScheduler(false);
      setEditingMeetingId(null);
      toast.success('Meeting rescheduled and n8n reminder jobs updated!');
      
      if (updatedM) {
        // Call backend to reschedule
        fetch('/api/meetings/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ meeting: updatedM, ownerEmail })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.previewUrl) {
              addN8nLog(`n8n Node [SMTP Mailer]: Canceled old jobs and rescheduled. Sent test email: ${data.previewUrl}`, 'success');
            }
          })
          .catch(err => console.error('[SMTP RESCHEDULING FETCH ERROR]', err));
      }

      // Rescheduled n8n Log workflow
      setShowLogs(true);
      addN8nLog(`n8n Reschedule Trigger: Event rescheduled for "${formData.title}"`, 'trigger');
      addN8nLog(`n8n Node [Cancel Jobs]: Canceled and purged previous cron schedule to prevent duplicates.`, 'notification');
      addN8nLog(`n8n Node [Save to DB]: Meeting ID ${editingMeetingId} updated in general ledger.`, 'db');
      addN8nLog(`n8n Node [Calendar Sync]: Calendar event rescheduled. Sync OK.`, 'calendar');
      addN8nLog(`n8n Node [Notifications Manager]: Re-scheduled timezone-aware reminder emails to: ${ownerEmail}`, 'notification');
      addN8nLog(`n8n Workflow execution successfully completed.`, 'success');
      return;
    }

    const meetingId = Date.now();
    const newMeeting = {
      id: meetingId,
      title: formData.title,
      date: formData.date === 'Today' || formData.date === new Date().toISOString().split('T')[0] ? 'Today' : formData.date,
      time: formData.time,
      duration: formData.duration,
      priority: formData.priority,
      type: formData.type,
      participants: formData.participants,
      agenda: formData.agenda,
      link: formData.link || 'https://meet.google.com/abc-defg-hij',
      syncedWith: [
        ...(formData.syncGoogle ? ['Google Calendar'] : []),
        ...(formData.syncOutlook ? ['Microsoft Outlook'] : [])
      ],
      reminders: formData.reminders,
      status: 'Upcoming',
      brief: `AI Briefing: Analyzing agenda "${formData.agenda}". Target context spans ${formData.participants.length} team members. Revenue figures (${currencySymbol}${(businessData.transactions || []).filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0).toLocaleString()}) are loaded.`,
      notes: null,
      tasksCreated: false
    };

    // Add to Local Storage Context
    addRecord('meetings', newMeeting);
    setShowScheduler(false);
    toast.success('Meeting scheduled successfully!');

    // Call backend to schedule SMTP notifications
    fetch('/api/meetings/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meeting: newMeeting, ownerEmail })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.previewUrl) {
          addN8nLog(`n8n Node [SMTP Mailer]: Instant test email dispatched! Review inbox preview: ${data.previewUrl}`, 'success');
          toast.success('Test email preview link loaded in n8n console!', { icon: '📧' });
        }
      })
      .catch(err => console.error('[SMTP SCHEDULING FETCH ERROR]', err));

    // Trigger n8n Workflow Simulator Log sequence
    triggerN8nMockWorkflow(newMeeting);
  };

  const triggerN8nMockWorkflow = (meeting) => {
    setShowLogs(true);
    addN8nLog(`Webhook Trigger: Meeting Scheduled "${meeting.title}"`, 'trigger');
    
    setTimeout(() => {
      addN8nLog(`n8n Node [Save to DB]: Executed successfully. Meeting ID assigned.`, 'db');
    }, 800);

    if (meeting.syncedWith.length > 0) {
      setTimeout(() => {
        addN8nLog(`n8n Node [Calendar Sync]: Dispatched API calls to: ${meeting.syncedWith.join(', ')}`, 'calendar');
      }, 1600);
    }

    setTimeout(() => {
      addN8nLog(`n8n Node [AI Summarizer]: Generating pre-meeting brief...`, 'ai');
    }, 2400);

    setTimeout(() => {
      addN8nLog(`n8n Node [Notifications Manager]: Email reminders queued for delivery to owner/user email: ${ownerEmail}`, 'notification');
    }, 3200);

    setTimeout(() => {
      addN8nLog(`n8n Workflow execution completed for "${meeting.title}". Status: 200 OK. Notification dispatch armed to ${ownerEmail}`, 'success');
    }, 4000);
  };

  // Live Meeting Simulator control
  const startMeetingSim = (meeting) => {
    setActiveMeetingSim(meeting);
    setSimTimer(0);
    setIsRecording(true);
    toast.success(`Meeting "${meeting.title}" started! Recording audio...`, { icon: '🎙️' });
    
    // Timer increment
    simTimerRef.current = setInterval(() => {
      setSimTimer(prev => prev + 1);
    }, 1000);

    // Update status in local list
    setMeetings(prev => prev.map(m => m.id === meeting.id ? { ...m, status: 'In Progress' } : m));
    addN8nLog(`n8n Event: Meeting started. Updating status of ID ${meeting.id} to "In Progress".`, 'system');
  };

  const endMeetingSim = () => {
    clearInterval(simTimerRef.current);
    setIsRecording(false);
    toast.success('Meeting ended. Audio transcript saved.', { icon: '⏹️' });

    // Ask to generate notes
    const acceptNotes = window.confirm(`Meeting "${activeMeetingSim.title}" ended. Would you like the Enterprise AI assistant to compile decisions, summaries, and action items?`);
    
    if (acceptNotes) {
      generateAIReview(activeMeetingSim);
    } else {
      // Revert status to completed without notes
      setMeetings(prev => prev.map(m => m.id === activeMeetingSim.id ? { ...m, status: 'Completed' } : m));
      setActiveMeetingSim(null);
    }
  };

  const generateAIReview = (meeting) => {
    toast.loading('AI is summarizing the transcript & parsing action items...', { id: 'ai-summary' });
    
    // n8n Trigger log
    addN8nLog(`n8n Trigger: Meeting Completed. Initiating AI post-meeting summarizer nodes...`, 'trigger');

    setTimeout(() => {
      const summary = `Review of "${meeting.title}" concluded. Key growth bottlenecks resolved. Aligned on next milestones and task allocation.`;
      
      const decisions = [
        `Approved the agenda action points regarding "${meeting.title}".`,
        `Assigned primary responsibility to attendees.`
      ];

      // Auto-assign task based on participants
      const assigneeName = meeting.participants.length > 0 ? meeting.participants[0] : 'Admin';
      const tasks = [
        { assignee: assigneeName, task: `Action Item from ${meeting.title}: Finalize outstanding audit documents.`, due: 'This Friday' }
      ];

      const notes = { summary, decisions, tasks };

      setMeetings(prev => prev.map(m => {
        if (m.id === meeting.id) {
          return {
            ...m,
            status: 'Completed',
            notes,
            tasksCreated: true
          };
        }
        return m;
      }));

      // Trigger automatic task creations inside workspace transactions/tasks
      tasks.forEach(t => {
        addRecord('transactions', {
          date: 'Today',
          desc: `TASK ASSIGNED: ${t.assignee} - ${t.task}`,
          amount: 0,
          status: 'Pending',
          type: 'task'
        });
      });

      // Save meeting update to Local Storage
      const userId = 'guest';
      const companyDataRaw = localStorage.getItem(`company_business_data_${userId}`);
      if (companyDataRaw) {
        try {
          const parsed = JSON.parse(companyDataRaw);
          const updatedMeetings = (parsed.meetings || []).map(m => {
            if (m.title === meeting.title) {
              return { ...m, status: 'Completed', notes, tasksCreated: true };
            }
            return m;
          });
          localStorage.setItem(`company_business_data_${userId}`, JSON.stringify({
            ...parsed,
            meetings: updatedMeetings
          }));
        } catch (e) {}
      }

      toast.dismiss('ai-summary');
      toast.success('AI Meeting Briefing & Tasks Synchronized!', { icon: '✅' });
      addN8nLog(`n8n Node [Task Creator]: Generated 1 task, assigned to "${assigneeName}". Dashboard updated.`, 'db');
      addN8nLog(`n8n Node [Notifications Manager]: Dispatched completed meeting notes and action tasks to owner: ${ownerEmail}`, 'notification');
      addN8nLog(`n8n Workflow execution successfully completed.`, 'success');
      
      // Auto-select the updated meeting to show notes
      setSelectedMeeting(prev => ({ ...meeting, status: 'Completed', notes, tasksCreated: true }));
      setActiveMeetingSim(null);
    }, 2000);
  };

  const handleExportReport = (m) => {
    if (!m || !m.notes) {
      toast.error('Only completed meetings with AI notes can be exported.');
      return;
    }
    const text = [
      `MEETING INTELLIGENCE REPORT`,
      `Generated: ${new Date().toLocaleString()}`,
      `STATUS: ${m.status}`,
      `${'─'.repeat(60)}`,
      ``,
      `MEETING: ${m.title}`,
      `DATE: ${m.date}   TIME: ${m.time}   DURATION: ${m.duration}`,
      `PARTICIPANTS: ${m.participants.join(', ')}`,
      ``,
      `EXECUTIVE SUMMARY`,
      `─────────────────`,
      m.notes.summary,
      ``,
      `KEY DECISIONS`,
      `─────────────`,
      ...m.notes.decisions.map((d, i) => `${i + 1}. ${d}`),
      ``,
      `ASSIGNED TASKS`,
      `──────────────`,
      ...m.notes.tasks.map(t => `• ${t.assignee} — ${t.task} [Due: ${t.due}]`),
      ``,
      `${'─'.repeat(60)}`,
      `© ${new Date().getFullYear()} Business Brain Inc. All rights reserved.`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Meeting_Report_${m.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Report for "${m.title}" exported! 📄`);
  };

  // Helpers for stats
  const upcomingCount = meetings.filter(m => m.status === 'Upcoming').length;
  const completedCount = meetings.filter(m => m.status === 'Completed').length;
  const missedCount = meetings.filter(m => m.status === 'Missed').length;
  const nextMeeting = meetings.find(m => m.status === 'Upcoming');

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getLogBadgeStyle = (type) => {
    switch (type) {
      case 'trigger': return 'bg-[#5B5FFF]/20 text-[#5B5FFF] border-[#5B5FFF]/30';
      case 'db': return 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30';
      case 'calendar': return 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/30';
      case 'ai': return 'bg-[#EC4899]/20 text-[#EC4899] border-[#EC4899]/30';
      case 'notification': return 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30';
      case 'success': return 'bg-[#10B981] text-[#0B1120] border-[#10B981]';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10 font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(91,95,255,0.4)]">
              <Video size={22} className="text-white" />
            </div>
            AI Meeting Assistant
          </h1>
          <p className="text-[#94A3B8] font-medium">Orchestrated with n8n Automation. Sync calendar schedules &amp; generate summaries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className={`functional-btn px-4 py-2.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-colors ${
              showLogs ? 'bg-[#5B5FFF]/20 border-[#5B5FFF] text-white' : 'bg-white/5 border-white/10 text-[#94A3B8] hover:bg-white/10 hover:text-white'
            }`}
          >
            <RefreshCw size={16} className={showLogs ? 'animate-spin' : ''} />
            n8n Workflows Log
          </button>
          <button
            onClick={() => setShowScheduler(true)}
            className="functional-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold shadow-[0_0_15px_rgba(91,95,255,0.4)] hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Plus size={16} /> Schedule Meeting
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-5 border-white/5 bg-[#0B1120]/40 flex flex-col justify-between">
          <p className="text-xs font-bold text-[#94A3B8] uppercase">Next Meeting Countdown</p>
          {nextMeeting ? (
            <div className="mt-3">
              <p className="text-sm font-semibold text-white tracking-tight truncate">{nextMeeting.title}</p>
              <p className="text-xs text-[#00D4FF] font-bold mt-1.5 flex items-center gap-1">
                <Clock size={12} className="animate-pulse" /> {getMeetingCountdown(nextMeeting)}
              </p>
            </div>
          ) : (
            <p className="text-sm font-medium text-white/50 mt-4">No upcoming events scheduled</p>
          )}
        </GlassCard>

        <GlassCard className="p-5 border-white/5 bg-[#0B1120]/40 flex flex-col justify-between">
          <p className="text-xs font-bold text-[#94A3B8] uppercase text-ellipsis overflow-hidden">Scheduled/Upcoming</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{upcomingCount}</span>
            <span className="text-xs text-[#94A3B8] font-bold">active syncs</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-white/5 bg-[#0B1120]/40 flex flex-col justify-between">
          <p className="text-xs font-bold text-[#94A3B8] uppercase">Completed (Notes Generated)</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#10B981]">{completedCount}</span>
            <span className="text-xs text-[#94A3B8] font-bold">briefs archived</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-white/5 bg-[#0B1120]/40 flex flex-col justify-between">
          <p className="text-xs font-bold text-[#94A3B8] uppercase">Missed / Postponed</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#EF4444]">{missedCount}</span>
            <span className="text-xs text-[#94A3B8] font-bold">logs</span>
          </div>
        </GlassCard>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Left Side: Meeting Timeline & Navigation */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <div className="bg-[#0B1120]/60 border border-white/10 p-5 rounded-2xl">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4 px-1">Upcoming &amp; Past Events</h3>
            {meetings.length === 0 ? (
              <div className="text-center py-6 text-white/40 text-sm font-medium">
                No meetings in timeline. Click "Schedule Meeting" to begin.
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                {meetings.map(m => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMeeting(m)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedMeeting?.id === m.id
                        ? 'border-[#5B5FFF] bg-[#5B5FFF]/10 shadow-[0_0_15px_rgba(91,95,255,0.15)]'
                        : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/15'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <p className="font-bold text-white text-xs leading-snug">{m.title}</p>
                      <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        m.status === 'Completed' ? 'bg-[#10B981]/20 text-[#10B981]' :
                        m.status === 'In Progress' ? 'bg-[#EC4899]/20 text-[#EC4899] animate-pulse' :
                        'bg-[#5B5FFF]/20 text-[#5B5FFF]'
                      }`}>{m.status}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2 border-t border-white/5 pt-2">
                      <div className="flex justify-between items-center text-[9px] text-[#94A3B8]">
                        <span className="flex items-center gap-1"><Calendar size={9}/> {m.date} ({m.time})</span>
                        <span className="flex items-center gap-1"><Users size={9}/> {Array.isArray(m?.participants) ? m.participants.length : 0}</span>
                      </div>
                      <div className="text-[9px] font-bold text-[#00D4FF] flex items-center gap-1">
                        <Clock size={9}/> {getMeetingCountdown(m)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* n8n Workflow Visualizer Node Graphic */}
          <div className="bg-[#0B1120]/40 border border-white/5 p-5 rounded-2xl font-sans">
            <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
              <Activity size={14} className="text-[#00D4FF]" /> n8n Orchestrator Node Map
            </h4>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5 text-[10px]">
                <span className="text-white font-bold">1. Trigger</span>
                <span className="text-[#94A3B8]">Webhook Created</span>
              </div>
              <div className="w-0.5 h-3 bg-white/10 mx-auto"></div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5 text-[10px]">
                <span className="text-white font-bold">2. Calendar sync</span>
                <span className="text-[#7C3AED] font-semibold">Google/Outlook API</span>
              </div>
              <div className="w-0.5 h-3 bg-white/10 mx-auto"></div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5 text-[10px]">
                <span className="text-white font-bold">3. Briefing</span>
                <span className="text-[#EC4899] font-semibold">Gemini 2.5 Engine</span>
              </div>
              <div className="w-0.5 h-3 bg-white/10 mx-auto"></div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5 text-[10px]">
                <span className="text-white font-bold">4. Notifications</span>
                <span className="text-[#F59E0B] font-semibold">WhatsApp &amp; Mailer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Meeting Details & AI Summaries */}
        <div className="xl:col-span-3 flex flex-col gap-6">

          {/* Meeting Simulator (If meeting is running or selected to start) */}
          {selectedMeeting && selectedMeeting.status !== 'Completed' && selectedMeeting.status !== 'Missed' && (
            <GlassCard className="p-6 border-[#EC4899]/30 bg-[#0B1120]/80">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-[#EC4899] uppercase tracking-wider flex items-center gap-2">
                    <Mic size={16} className="animate-pulse" /> Live Meeting &amp; Note Taker Simulator
                  </h4>
                  <p className="text-xs text-[#94A3B8] mt-1">Start meeting audio capture to automatically compile summaries and dashboard tasks.</p>
                </div>
                {activeMeetingSim && activeMeetingSim.id === selectedMeeting.id ? (
                  <div className="flex items-center gap-3">
                    {/* Live Timer & Wave */}
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-white font-mono text-sm">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping mr-1"></span>
                      {formatTimer(simTimer)}
                    </div>
                    {/* Audio Wave Visualizer mockup */}
                    <div className="flex items-end gap-0.5 h-6">
                      {waveformData.map((h, i) => (
                        <div key={i} className="w-1 bg-[#EC4899] rounded-full transition-all duration-100" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={endMeetingSim}
                      className="functional-btn px-4 py-2 bg-[#EF4444] hover:bg-[#EF4444]/80 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Square size={12} /> End Meeting
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => startMeetingSim(selectedMeeting)}
                    disabled={activeMeetingSim !== null}
                    className="functional-btn px-5 py-2.5 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Play size={14} /> Start Meeting Audio Capture
                  </button>
                )}
              </div>
            </GlassCard>
          )}

          {/* Active Meeting Panel */}
          {selectedMeeting ? (
            <GlassCard className="p-0 border-white/5 bg-[#0B1120]/60 overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-gradient-to-r from-[#5B5FFF]/10 to-transparent flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{selectedMeeting.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8] font-bold">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#5B5FFF]"/> {selectedMeeting.date} ({selectedMeeting.time})</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#00D4FF]"/> {selectedMeeting.duration}</span>
                    <span className="flex items-center gap-1.5"><Users size={14} className="text-[#8B5CF6]"/> {Array.isArray(selectedMeeting?.participants) ? selectedMeeting.participants.join(', ') : ''}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMeeting.status === 'Completed' && (
                    <button
                      type="button"
                      onClick={() => handleExportReport(selectedMeeting)}
                      className="functional-btn px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold rounded-lg text-white flex items-center gap-1"
                    >
                      <Download size={12} /> Export Brief
                    </button>
                  )}
                  {selectedMeeting.status === 'Upcoming' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleRescheduleClick(selectedMeeting)}
                        className="functional-btn px-3.5 py-1.5 bg-[#5B5FFF]/15 border border-[#5B5FFF]/35 hover:bg-[#5B5FFF]/25 text-xs font-bold rounded-lg text-white flex items-center gap-1.5 transition-all"
                      >
                        <RefreshCw size={12} /> Reschedule
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancelMeeting(selectedMeeting)}
                        className="functional-btn px-3.5 py-1.5 bg-[#EF4444]/15 border border-[#EF4444]/35 hover:bg-[#EF4444]/25 text-xs font-bold rounded-lg text-white flex items-center gap-1.5 transition-all"
                      >
                        <X size={12} /> Cancel Event
                      </button>
                    </>
                  )}
                  <span className={`px-3 py-1 bg-[#5B5FFF]/20 text-[#5B5FFF] text-xs font-bold rounded-full border border-[#5B5FFF]/30 flex items-center gap-1.5`}>
                    <Video size={12} /> {selectedMeeting.type}
                  </span>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex border-b border-white/5 bg-[#0B1120]/20 px-6 font-sans">
                <button
                  type="button"
                  onClick={() => setActiveTab('briefing')}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'briefing' 
                      ? 'border-[#5B5FFF] text-[#5B5FFF]' 
                      : 'border-transparent text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Zap size={12} /> Briefing &amp; Summary
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('email')}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'email' 
                      ? 'border-[#5B5FFF] text-[#5B5FFF]' 
                      : 'border-transparent text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <MessageCircle size={12} /> n8n Email Alert Preview
                </button>
              </div>

              {activeTab === 'briefing' ? (
                <div className="p-6 space-y-6">
                  {/* Meeting Agenda */}
                  <div>
                    <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Agenda</h4>
                    <p className="text-sm text-white/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 font-medium">
                      {selectedMeeting.agenda || 'No agenda outlined.'}
                    </p>
                  </div>

                  {/* Pre-meeting AI Briefing */}
                  <div>
                    <h4 className="text-[10px] font-bold text-[#00D4FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Zap size={12} /> Pre-Meeting AI Briefing (n8n Scheduled)
                    </h4>
                    <div className="bg-[#00D4FF]/5 border border-[#00D4FF]/20 p-4 rounded-xl text-sm text-white/90 leading-relaxed">
                      {selectedMeeting.brief}
                    </div>
                  </div>

                  {/* Post-Meeting Notes (If Completed) */}
                  {selectedMeeting.status === 'Completed' && selectedMeeting.notes ? (
                    <div className="space-y-6 border-t border-white/5 pt-6 font-sans">
                      {/* Summary */}
                      <div>
                        <h4 className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <MessageCircle size={12} /> Executive Summary
                        </h4>
                        <p className="text-sm text-white/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                          {selectedMeeting.notes.summary}
                        </p>
                      </div>

                      {/* Decisions */}
                      <div>
                        <h4 className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Check size={12} /> Key Decisions Resolved
                        </h4>
                        <ul className="space-y-2">
                          {Array.isArray(selectedMeeting?.notes?.decisions) && selectedMeeting.notes.decisions.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/90 bg-white/5 p-3 rounded-lg border border-white/5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0"></span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Items */}
                      <div>
                        <h4 className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckSquare size={12} /> Sync Action Items (Pushed to Workspace Tasks)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Array.isArray(selectedMeeting?.notes?.tasks) && selectedMeeting.notes.tasks.map((t, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                              <div className="flex justify-between items-center text-[10px] text-[#94A3B8] font-bold">
                                <span>Assignee: {t.assignee}</span>
                                <span className="text-[#F59E0B]">{t.due}</span>
                              </div>
                              <p className="text-xs text-white leading-snug">{t.task}</p>
                              <span className="text-[9px] bg-[#10B981]/20 text-[#10B981] font-bold px-1.5 py-0.5 rounded self-start mt-1 flex items-center gap-1">
                                <Check size={10} /> Sync Complete
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : selectedMeeting.status === 'Upcoming' ? (
                    <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white font-bold">Integrated Calendar Sync</p>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">Event is synchronized with external enterprise calendar pipelines.</p>
                      </div>
                      <div className="flex gap-2">
                        {Array.isArray(selectedMeeting?.syncedWith) && selectedMeeting.syncedWith.map(cal => (
                          <span key={cal} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-white flex items-center gap-1">
                            <Globe size={10} className="text-[#5B5FFF]" /> {cal}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="p-6 bg-slate-950/40">
                  <div className="bg-white text-slate-900 rounded-2xl p-8 max-w-xl mx-auto shadow-2xl border border-slate-200 font-sans">
                    {/* Email Client Header */}
                    <div className="border-b border-slate-100 pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-slate-500 font-mono">
                      <div>
                        <p><span className="font-bold text-slate-800">From:</span> B.BRAIN SMTP Mailer &lt;smtp-out@bbrain.ai&gt;</p>
                        <p className="mt-1"><span className="font-bold text-slate-800">To:</span> {ownerEmail}</p>
                        <p className="mt-1"><span className="font-bold text-slate-800">Subject:</span> Upcoming Meeting Reminder: {selectedMeeting.title}</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded font-bold uppercase tracking-wide text-[9px]">Dispatched</span>
                    </div>

                    {/* Brand Logo Header */}
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center text-white font-bold text-base shadow">B</div>
                      <span className="font-bold text-slate-800 text-sm tracking-wider">BUSINESS BRAIN</span>
                    </div>

                    {/* Email Title */}
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Upcoming Meeting Reminder</h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      This is an automated notification from your B.BRAIN Operating System. Your upcoming sync is starting soon:
                    </p>

                    {/* Meeting Information Block */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-6 space-y-4 text-xs text-slate-700">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Meeting Topic</p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedMeeting.title}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Scheduled Date</p>
                          <p className="font-bold text-slate-800 mt-0.5">{selectedMeeting.date}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Time &amp; Timezone</p>
                          <p className="font-bold text-slate-800 mt-0.5">{selectedMeeting.time} ({Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local'})</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                          <p className="font-bold text-slate-800 mt-0.5">{selectedMeeting.duration}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Countdown Status</p>
                          <p className="font-bold text-cyan-600 mt-0.5">{getMeetingCountdown(selectedMeeting)}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Invited Participants</p>
                        <ul className="mt-1 space-y-1 list-disc pl-4 text-slate-600">
                          {(selectedMeeting.participants || []).map((p, idx) => (
                            <li key={idx} className="font-medium">{p}</li>
                          ))}
                        </ul>
                      </div>

                      {selectedMeeting.agenda && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Discussion Agenda</p>
                          <p className="mt-1 leading-relaxed text-slate-600 font-medium">{selectedMeeting.agenda}</p>
                        </div>
                      )}
                    </div>

                    {/* Interactive Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                      <a 
                        href={selectedMeeting.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-6 py-2.5 bg-[#5B5FFF] hover:bg-[#4a4deb] text-white text-xs font-bold rounded-lg text-center shadow-lg transition-all"
                      >
                        Join Meeting Link
                      </a>
                      <button 
                        type="button" 
                        onClick={() => toast.success('Navigating to B.BRAIN Dashboard...')}
                        className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg text-center transition-all"
                      >
                        Open Business Brain
                      </button>
                    </div>

                    {/* Footer disclaimer */}
                    <p className="text-[10px] text-slate-400 text-center border-t border-slate-100 pt-4 leading-relaxed">
                      This security-encrypted alert was dispatched only to B.BRAIN account stakeholders: <span className="font-semibold">{ownerEmail}</span>. Role-based access control applies. To manage your SMTP and webhook alert settings, navigate to n8n node integrations.
                    </p>
                  </div>
                </div>
              )}
            </GlassCard>
          ) : (
            <GlassCard className="p-8 text-center text-[#94A3B8]">
              No meeting selected. Select a timeline card to view briefing details.
            </GlassCard>
          )}

        </div>

      </div>

      {/* n8n Live Workflows Log Console Drawer */}
      <AnimatePresence>
        {showLogs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-[#0B1120]/90 border border-[#5B5FFF]/30 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(91,95,255,0.2)] mt-4 font-mono"
          >
            <div className="p-4 bg-gradient-to-r from-[#5B5FFF]/20 to-transparent border-b border-white/15 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-[#5B5FFF] animate-spin" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">n8n Workflow Execution Logger</span>
              </div>
              <button type="button" onClick={() => setShowLogs(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 bg-black/40 text-xs text-white/90 space-y-2.5 max-h-[300px] overflow-y-auto custom-scrollbar">
              {n8nLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 leading-relaxed border-b border-white/5 pb-2">
                  <span className="text-[#94A3B8] shrink-0">[{log.time}]</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 ${getLogBadgeStyle(log.type)}`}>
                    {log.type}
                  </span>
                  <span className="break-all">{log.message}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scheduler Modal */}
      <AnimatePresence>
        {showScheduler && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-sans">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar size={20} className="text-[#5B5FFF]" /> {editingMeetingId ? 'Reschedule Event Sync' : 'Schedule New Event Sync'}
                </h3>
                <button type="button" onClick={() => { setShowScheduler(false); setEditingMeetingId(null); }} className="text-[#94A3B8] hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleScheduleSubmit} className="p-6 overflow-y-auto custom-scrollbar space-y-4 flex-1">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Meeting Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Q4 Executive Budget Sync"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none"
                    />
                  </div>
                  {/* Time */}
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Time</label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-[#00D4FF] font-semibold flex items-center gap-1">
                  🕒 Timezone Detected: {Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'} (All reminders are calculated in this local time)
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Duration</label>
                    <select
                      value={formData.duration}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none"
                    >
                      <option>15 mins</option>
                      <option>30 mins</option>
                      <option>45 mins</option>
                      <option>1 hour</option>
                    </select>
                  </div>
                  {/* Priority */}
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  {/* Type */}
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none"
                    >
                      <option>Video Sync</option>
                      <option>In-Person</option>
                      <option>Board Sync</option>
                    </select>
                  </div>
                </div>

                {/* Participants */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Participants</label>
                  {employees.length === 0 ? (
                    <p className="text-xs text-white/50 bg-white/5 p-3 rounded-lg">No onboarded employees. Add team members in Dashboard first.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto custom-scrollbar bg-white/5 p-3 rounded-xl border border-white/10">
                      {employees.map(emp => {
                        const isSelected = formData.participants.includes(emp.name);
                        return (
                          <button
                            key={emp.id}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setFormData({ ...formData, participants: formData.participants.filter(p => p !== emp.name) });
                              } else {
                                setFormData({ ...formData, participants: [...formData.participants, emp.name] });
                              }
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                              isSelected ? 'bg-[#5B5FFF] border-[#5B5FFF] text-white shadow-[0_0_10px_rgba(91,95,255,0.3)]' : 'bg-transparent border-white/10 text-[#94A3B8] hover:text-white'
                            }`}
                          >
                            {emp.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Agenda */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Agenda / Discussion Points</label>
                  <textarea
                    rows={3}
                    placeholder="Provide details on target discussion points..."
                    value={formData.agenda}
                    onChange={e => setFormData({ ...formData, agenda: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none resize-none font-sans"
                  />
                </div>

                {/* Video Link */}
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1.5">Video/Meeting Link</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#5B5FFF] focus:outline-none font-sans"
                  />
                </div>

                {/* Calendar Syncs & Reminders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">n8n Calendar Sync Connectors</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs text-white/90 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.syncGoogle}
                          onChange={e => setFormData({ ...formData, syncGoogle: e.target.checked })}
                          className="rounded border-white/10 bg-white/5 text-[#5B5FFF] focus:ring-0 focus:ring-offset-0"
                        />
                        Sync Google Calendar
                      </label>
                      <label className="flex items-center gap-2 text-xs text-white/90 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.syncOutlook}
                          onChange={e => setFormData({ ...formData, syncOutlook: e.target.checked })}
                          className="rounded border-white/10 bg-white/5 text-[#5B5FFF] focus:ring-0 focus:ring-offset-0"
                        />
                        Sync Outlook Calendar
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">Reminders Trigger (n8n Crons)</label>
                    <div className="flex flex-wrap gap-2">
                      {['15m before', '1h before', '1d before'].map(rem => {
                        const hasRem = formData.reminders.includes(rem);
                        return (
                          <button
                            key={rem}
                            type="button"
                            onClick={() => {
                              if (hasRem) {
                                setFormData({ ...formData, reminders: formData.reminders.filter(r => r !== rem) });
                              } else {
                                setFormData({ ...formData, reminders: [...formData.reminders, rem] });
                              }
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                              hasRem ? 'bg-[#5B5FFF]/20 border-[#5B5FFF] text-white' : 'bg-white/5 border-white/10 text-[#94A3B8]'
                            }`}
                          >
                            {rem}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-[#94A3B8] mt-2 font-medium">
                      📧 Scheduled email notifications will automatically be sent to the owner's registered address: <span className="text-[#00D4FF] font-bold">{ownerEmail}</span>.
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowScheduler(false); setEditingMeetingId(null); }}
                    className="px-4 py-2.5 rounded-xl border border-[#5B5FFF]/30 text-white text-xs font-bold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-xs font-bold transition-transform hover:scale-[1.02]"
                  >
                    {editingMeetingId ? 'Update & Re-schedule' : 'Trigger n8n Workflow'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
