import React, { useState } from 'react';
import { Target, Zap, X, Plus, TrendingUp, Users, DollarSign, Settings, HeadphonesIcon, Box, BarChart2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const DEPARTMENTS = ['Sales', 'Marketing', 'Operations', 'HR', 'Finance', 'Engineering', 'Customer Success'];
const DEPT_COLORS = {
  Sales: '#10B981', Marketing: '#00D4FF', Operations: '#F59E0B',
  HR: '#EC4899', Finance: '#5B5FFF', Engineering: '#8B5CF6', 'Customer Success': '#F472B6'
};
const AI_SUGGESTIONS = {
  Sales: 'Focus on high-value enterprise accounts to accelerate progress toward the target.',
  Marketing: 'Leverage A/B testing on top-performing campaigns to boost acquisition rates.',
  Operations: 'Automate recurring workflows to reduce operational overhead and hit targets faster.',
  HR: 'Implement regular pulse surveys to surface and address engagement blockers early.',
  Finance: 'Review SaaS subscriptions and renegotiate vendor contracts for quick savings.',
  Engineering: 'Adopt trunk-based development to reduce deployment cycle time.',
  'Customer Success': 'Proactively reach out to accounts with declining engagement scores.',
};

const initialGoals = [
  { id: 1, title: 'Q4 Revenue Target', department: 'Sales', current: 8.5, target: 10, unit: 'M', prefix: '$', progress: 85, color: '#10B981', status: 'On Track', aiSuggestion: 'Upsell to Tier 2 enterprise clients to close the gap.' },
  { id: 2, title: 'Customer Acquisition', department: 'Marketing', current: 4200, target: 5000, unit: '', prefix: '', progress: 84, color: '#00D4FF', status: 'On Track', aiSuggestion: 'Increase LinkedIn ad spend by 15% in EMEA region.' },
  { id: 3, title: 'Reduce Server Costs', department: 'Operations', current: 15, target: 20, unit: '%', prefix: '', progress: 75, color: '#F59E0B', status: 'At Risk', aiSuggestion: 'Migrate legacy databases to serverless architecture.' },
  { id: 4, title: 'Employee Retention', department: 'HR', current: 92, target: 95, unit: '%', prefix: '', progress: 96, color: '#10B981', status: 'Achieved', aiSuggestion: 'Maintain current remote work flexibility policies.' },
];

function CreateGoalModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '', department: 'Sales', current: '', target: '', unit: '', prefix: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Goal name is required';
    if (!form.target || isNaN(form.target) || Number(form.target) <= 0) e.target = 'Enter a valid target value';
    if (form.current !== '' && isNaN(form.current)) e.current = 'Enter a valid current value';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const current = Number(form.current) || 0;
    const target = Number(form.target);
    const progress = Math.min(Math.round((current / target) * 100), 100);
    const color = DEPT_COLORS[form.department] || '#5B5FFF';
    const status = progress >= 100 ? 'Achieved' : progress >= 80 ? 'On Track' : progress >= 50 ? 'At Risk' : 'Off Track';

    const newGoal = {
      id: Date.now(),
      title: form.title.trim(),
      department: form.department,
      current,
      target,
      unit: form.unit.trim(),
      prefix: form.prefix.trim(),
      progress,
      color,
      status,
      aiSuggestion: AI_SUGGESTIONS[form.department] || 'Stay consistent with your current strategy to meet this goal.',
    };

    onCreate(newGoal);
    toast.success(`Goal "${form.title}" created! 🎯`);
    onClose();
  };

  const field = (key, label, type = 'text', placeholder = '', small = false) => (
    <div className={small ? 'flex-1' : 'w-full'}>
      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
        placeholder={placeholder}
        className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC4899]/60 transition-all ${errors[key] ? 'border-[#EF4444]' : 'border-white/10'}`}
      />
      {errors[key] && <p className="text-[10px] text-[#EF4444] mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full max-w-lg bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#EC4899]/10 to-[#7C3AED]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EC4899] to-[#7C3AED] flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              <Target size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create New Goal</h2>
              <p className="text-xs text-[#94A3B8]">Set a company-wide objective to track</p>
            </div>
          </div>
          <button onClick={onClose} className="functional-btn p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {field('title', 'Goal Name', 'text', 'e.g. Q1 Revenue Target')}

          {/* Department */}
          <div>
            <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Department</label>
            <select
              value={form.department}
              onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC4899]/60 transition-all appearance-none cursor-pointer"
            >
              {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#0B1120]">{d}</option>)}
            </select>
          </div>

          {/* Current / Target */}
          <div className="flex gap-3">
            {field('current', 'Current Value', 'number', '0', true)}
            {field('target', 'Target Value *', 'number', '100', true)}
          </div>

          {/* Prefix / Unit */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Prefix (optional)</label>
              <input
                type="text"
                value={form.prefix}
                onChange={e => setForm(f => ({ ...f, prefix: e.target.value }))}
                placeholder="e.g. $"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC4899]/60 transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Unit (optional)</label>
              <input
                type="text"
                value={form.unit}
                onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                placeholder="e.g. %, K, M"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC4899]/60 transition-all"
              />
            </div>
          </div>

          {/* AI Note */}
          <div className="p-3 rounded-xl bg-[#5B5FFF]/10 border border-[#5B5FFF]/20 flex items-start gap-2">
            <Zap size={14} className="text-[#5B5FFF] shrink-0 mt-0.5" />
            <p className="text-xs text-[#94A3B8]">
              <span className="text-[#5B5FFF] font-bold">AI Copilot</span> will automatically generate strategic recommendations for your goal based on the selected department.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="functional-btn flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/10 text-sm font-bold transition-colors">
              Cancel
            </button>
            <button type="submit" className="functional-btn flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Plus size={16} /> Create Goal
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [showModal, setShowModal] = useState(false);

  const handleCreate = (newGoal) => {
    setGoals(g => [newGoal, ...g]);
  };

  const onTrack = goals.filter(g => g.status === 'On Track' || g.status === 'Achieved').length;
  const atRisk = goals.filter(g => g.status === 'At Risk').length;
  const offTrack = goals.filter(g => g.status === 'Off Track').length;

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EC4899] to-[#7C3AED] flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            Goals & KPI Tracker
          </h1>
          <p className="text-[#94A3B8] font-medium">Company-wide objective tracking with AI-driven gap analysis.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="functional-btn self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all"
        >
          <Plus size={16} /> Create Goal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Total Goals</h3>
          <p className="text-4xl font-bold text-white">{goals.length}</p>
        </GlassCard>
        <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wider mb-2">On Track</h3>
          <p className="text-4xl font-bold text-white">{onTrack}</p>
        </GlassCard>
        <GlassCard className="p-6 border-[#F59E0B]/20 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#F59E0B] uppercase tracking-wider mb-2">At Risk</h3>
          <p className="text-4xl font-bold text-white">{atRisk}</p>
        </GlassCard>
        <GlassCard className="p-6 border-[#EF4444]/20 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#EF4444] uppercase tracking-wider mb-2">Off Track</h3>
          <p className="text-4xl font-bold text-white">{offTrack}</p>
        </GlassCard>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence>
          {goals.map(goal => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-1 bg-white/5 text-[#94A3B8] rounded-md uppercase tracking-wider">
                          {goal.department}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                          goal.status === 'On Track' ? 'bg-[#10B981]/20 text-[#10B981]' :
                          goal.status === 'Achieved' ? 'bg-[#5B5FFF]/20 text-[#5B5FFF]' :
                          goal.status === 'Off Track' ? 'bg-[#EF4444]/20 text-[#EF4444]' :
                          'bg-[#F59E0B]/20 text-[#F59E0B]'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white tracking-tight">
                        {goal.prefix}<CountUp end={goal.current} decimals={goal.current % 1 !== 0 ? 1 : 0} />{goal.unit}
                      </p>
                      <p className="text-xs font-bold text-[#94A3B8]">Target: {goal.prefix}{goal.target}{goal.unit}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: goal.color }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-[#94A3B8]">
                    <span>0%</span>
                    <span>{goal.progress}% Completed</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#5B5FFF]/10 to-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-start gap-3">
                  <Zap size={18} className="text-[#00D4FF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#00D4FF] uppercase tracking-wider mb-1">AI Recommendation</p>
                    <p className="text-sm text-white/90 leading-relaxed">{goal.aiSuggestion}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create Goal Modal */}
      <AnimatePresence>
        {showModal && <CreateGoalModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
      </AnimatePresence>
    </div>
  );
}
