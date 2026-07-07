import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Zap, TrendingUp, Users, DollarSign, Box, HeadphonesIcon, Target, ArrowUpRight } from 'lucide-react';

const recommendations = [
  {
    department: 'Sales',
    icon: <TrendingUp size={20} />,
    color: '#10B981',
    items: [
      { text: 'Focus outreach on SaaS companies with 200-500 employees — 3x higher win rate than SMBs.', impact: 'High' },
      { text: 'Re-engage the 24 stale deals in Q3 pipeline with a time-limited incentive.', impact: 'Medium' },
    ]
  },
  {
    department: 'Finance',
    icon: <DollarSign size={20} />,
    color: '#00D4FF',
    items: [
      { text: 'Migrate 3 idle legacy cloud instances to serverless — estimated $8,400/yr savings.', impact: 'High' },
      { text: 'Accelerate AR collection: 14 invoices over 60 days old need escalation.', impact: 'High' },
    ]
  },
  {
    department: 'HR',
    icon: <Users size={20} />,
    color: '#EC4899',
    items: [
      { text: 'Implement bi-weekly 1:1 structure in Support team to address 55/100 sentiment score.', impact: 'High' },
      { text: 'Prioritize 3 open Engineering roles — projected revenue loss of $42k/month due to understaffing.', impact: 'Medium' },
    ]
  },
  {
    department: 'Inventory',
    icon: <Box size={20} />,
    color: '#F59E0B',
    items: [
      { text: 'Reorder Component X from backup supplier in 2 days to prevent Singapore branch stockout.', impact: 'Critical' },
      { text: 'Reduce SKU complexity by 15% — consolidate bottom-performing variants.', impact: 'Low' },
    ]
  },
  {
    department: 'Marketing',
    icon: <Target size={20} />,
    color: '#8B5CF6',
    items: [
      { text: 'Reallocate 20% of social spend to email nurturing — email currently shows 4.2x better ROI.', impact: 'High' },
      { text: 'Launch an APAC localization campaign — demand signals in Singapore and Tokyo are strong.', impact: 'Medium' },
    ]
  },
  {
    department: 'Customer Success',
    icon: <HeadphonesIcon size={20} />,
    color: '#F472B6',
    items: [
      { text: 'Assign dedicated CSMs to accounts with NPS < 7 — churn probability is 3.4x higher.', impact: 'High' },
      { text: 'Build a self-service help center — 38% of support tickets are repeated questions.', impact: 'Medium' },
    ]
  },
];

export function GrowthRecommendations() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            AI Growth Recommendations
          </h2>
          <p className="text-sm text-[#94A3B8] ml-11">Cross-functional strategic suggestions generated from real-time business data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendations.map(rec => (
          <GlassCard key={rec.department} className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${rec.color}20`, color: rec.color }}>
                {rec.icon}
              </div>
              <h3 className="font-bold text-white text-lg">{rec.department}</h3>
            </div>

            <div className="space-y-3 flex-1">
              {rec.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.impact === 'Critical' ? 'bg-[#EF4444]/20 text-[#EF4444]' :
                    item.impact === 'High' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
                    item.impact === 'Medium' ? 'bg-[#00D4FF]/20 text-[#00D4FF]' :
                    'bg-white/10 text-[#94A3B8]'
                  }`}>
                    {item.impact}
                  </span>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors text-sm font-bold"
              style={{ borderColor: `${rec.color}40`, color: rec.color, backgroundColor: `${rec.color}10` }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = `${rec.color}20`}
              onMouseOut={e => e.currentTarget.style.backgroundColor = `${rec.color}10`}
            >
              View Action Plan <ArrowUpRight size={16} />
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
