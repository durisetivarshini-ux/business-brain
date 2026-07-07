import React from 'react';
import { Award, Star, Zap, Crown } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AchievementsTimeline() {
  const achievements = [
    { title: "Enterprise Scaling Award", date: "Q2 2026", desc: "Successfully integrated Business Brain across 4 global offices.", icon: <Crown size={16}/>, color: "#F59E0B" },
    { title: "Top Revenue Generator", date: "Q1 2026", desc: "Exceeded departmental revenue targets by 42%.", icon: <Star size={16}/>, color: "#00D4FF" },
    { title: "Process Innovation", date: "Q4 2025", desc: "Automated 80% of manual HR onboarding flows.", icon: <Zap size={16}/>, color: "#10B981" },
    { title: "Employee of the Year", date: "2025", desc: "Voted by the executive board for outstanding leadership.", icon: <Award size={16}/>, color: "#7C3AED" },
  ];

  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-full">
      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Career Milestones</h3>
      
      <div className="relative border-l-2 border-white/10 ml-3 space-y-8 pb-4">
        {achievements.map((item, i) => (
          <div key={i} className="relative pl-8">
            {/* Timeline Dot */}
            <div 
              className="absolute left-[-17px] top-0 w-8 h-8 rounded-full border-4 border-[#0B1120] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}
            >
              {item.icon}
            </div>
            
            <div className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-4 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-bold text-sm">{item.title}</h4>
                <span className="text-xs font-bold px-2 py-1 rounded bg-[#050816] text-[#94A3B8]">{item.date}</span>
              </div>
              <p className="text-[#94A3B8] text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
