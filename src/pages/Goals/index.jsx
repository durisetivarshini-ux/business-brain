import React from 'react';
import { Target, TrendingUp, Users, DollarSign, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';

const goals = [
  { id: 1, title: 'Q4 Revenue Target', department: 'Sales', current: 8.5, target: 10, unit: 'M', prefix: '$', progress: 85, color: '#10B981', status: 'On Track', aiSuggestion: 'Upsell to Tier 2 enterprise clients to close the gap.' },
  { id: 2, title: 'Customer Acquisition', department: 'Marketing', current: 4200, target: 5000, unit: '', prefix: '', progress: 84, color: '#00D4FF', status: 'On Track', aiSuggestion: 'Increase LinkedIn ad spend by 15% in EMEA region.' },
  { id: 3, title: 'Reduce Server Costs', department: 'Operations', current: 15, target: 20, unit: '%', prefix: '', progress: 75, color: '#F59E0B', status: 'At Risk', aiSuggestion: 'Migrate legacy databases to serverless architecture.' },
  { id: 4, title: 'Employee Retention', department: 'HR', current: 92, target: 95, unit: '%', prefix: '', progress: 96, color: '#10B981', status: 'Achieved', aiSuggestion: 'Maintain current remote work flexibility policies.' },
];

export function GoalsPage() {
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
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-transform hover:scale-[1.02]">
            + Create Goal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Total Goals</h3>
          <p className="text-4xl font-bold text-white">24</p>
        </GlassCard>
        <GlassCard className="p-6 border-[#10B981]/20 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wider mb-2">On Track</h3>
          <p className="text-4xl font-bold text-white">18</p>
        </GlassCard>
        <GlassCard className="p-6 border-[#F59E0B]/20 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#F59E0B] uppercase tracking-wider mb-2">At Risk</h3>
          <p className="text-4xl font-bold text-white">4</p>
        </GlassCard>
        <GlassCard className="p-6 border-[#EF4444]/20 bg-[#0B1120]/60 text-center">
          <h3 className="text-sm font-bold text-[#EF4444] uppercase tracking-wider mb-2">Off Track</h3>
          <p className="text-4xl font-bold text-white">2</p>
        </GlassCard>
      </div>

      {/* Goal List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {goals.map(goal => (
          <GlassCard key={goal.id} className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col justify-between">
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
                <div 
                  className="h-full rounded-full transition-all duration-1000 relative" 
                  style={{ width: `${goal.progress}%`, backgroundColor: goal.color }} 
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                </div>
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
        ))}
      </div>

    </div>
  );
}
