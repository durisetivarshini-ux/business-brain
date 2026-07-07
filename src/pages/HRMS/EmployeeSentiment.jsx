import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { Smile, Frown, Meh, AlertTriangle, TrendingUp } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const sentimentData = [
  { department: 'Engineering', score: 68 },
  { department: 'Marketing', score: 82 },
  { department: 'Sales', score: 76 },
  { department: 'HR', score: 90 },
  { department: 'Finance', score: 72 },
  { department: 'Support', score: 55 },
];

const radarData = [
  { subject: 'Work-Life', A: 80 },
  { subject: 'Leadership', A: 72 },
  { subject: 'Compensation', A: 68 },
  { subject: 'Growth', A: 85 },
  { subject: 'Culture', A: 91 },
  { subject: 'Clarity', A: 74 },
];

export function EmployeeSentiment() {
  return (
    <GlassCard className="p-0 border-[#EC4899]/20 bg-[#0B1120]/60 mt-6 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#EC4899]/10 to-transparent">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <Smile className="text-[#EC4899]" /> Employee Sentiment Dashboard
          </h2>
          <p className="text-xs text-[#94A3B8]">Real-time mood analysis, engagement levels, and retention risk.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-md bg-[#EC4899]/20 border border-[#EC4899]/30 text-[#EC4899]">
          AI Analyzed
        </div>
      </div>

      <div className="flex flex-col lg:flex-row p-6 gap-8">
        {/* Radar Chart */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4">Sentiment by Category</h3>
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Radar dataKey="A" stroke="#EC4899" fill="#EC4899" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Scores */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Department Scores</h3>
          <div className="space-y-4">
            {sentimentData.map(dept => (
              <div key={dept.department} className="flex items-center gap-4">
                <span className="text-sm font-medium text-white w-24 shrink-0">{dept.department}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${dept.score}%`,
                      backgroundColor: dept.score < 65 ? '#EF4444' : dept.score < 75 ? '#F59E0B' : '#10B981'
                    }}
                  />
                </div>
                <span className={`text-xs font-bold w-8 text-right ${
                  dept.score < 65 ? 'text-[#EF4444]' : dept.score < 75 ? 'text-[#F59E0B]' : 'text-[#10B981]'
                }`}>{dept.score}</span>
                {dept.score < 65 && <AlertTriangle size={14} className="text-[#EF4444] shrink-0" />}
              </div>
            ))}
          </div>

          <div className="mt-2 p-4 bg-[#EC4899]/10 border border-[#EC4899]/20 rounded-xl flex items-start gap-3">
            <AlertTriangle size={16} className="text-[#EC4899] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white mb-1">Retention Risk Detected</p>
              <p className="text-xs text-[#94A3B8] leading-relaxed">Support team satisfaction is 55/100. AI recommends scheduling a feedback session and reviewing compensation within 14 days.</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
