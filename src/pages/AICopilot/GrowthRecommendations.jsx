import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Zap, TrendingUp, Users, DollarSign, Box, HeadphonesIcon, Target, ArrowUpRight, X, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const recommendations = [
  {
    department: 'Sales',
    icon: <TrendingUp size={20} />,
    color: '#10B981',
    items: [
      { text: 'Focus outreach on SaaS companies with 200-500 employees — 3x higher win rate than SMBs.', impact: 'High' },
      { text: 'Re-engage the 24 stale deals in Q3 pipeline with a time-limited incentive.', impact: 'Medium' },
    ],
    actionPlan: {
      summary: 'Accelerate pipeline velocity by targeting high-conversion segments.',
      steps: [
        { label: 'Segment ICP by company size (200-500 employees)', owner: 'Sales Ops', due: 'Day 1', done: false },
        { label: 'Create a time-limited incentive offer for 24 stale Q3 deals', owner: 'AE Team', due: 'Day 2', done: false },
        { label: 'Launch a 7-day re-engagement email sequence', owner: 'Marketing', due: 'Day 3', done: false },
        { label: 'Review results and adjust outreach messaging', owner: 'Sales Lead', due: 'Week 2', done: false },
      ],
      impact: '+$180K estimated pipeline recovery',
    }
  },
  {
    department: 'Finance',
    icon: <DollarSign size={20} />,
    color: '#00D4FF',
    items: [
      { text: 'Migrate 3 idle legacy cloud instances to serverless — estimated $8,400/yr savings.', impact: 'High' },
      { text: 'Accelerate AR collection: 14 invoices over 60 days old need escalation.', impact: 'High' },
    ],
    actionPlan: {
      summary: 'Reduce operational costs and accelerate cash flow through immediate financial actions.',
      steps: [
        { label: 'Identify and tag 3 idle cloud instances for migration', owner: 'DevOps', due: 'Day 1', done: false },
        { label: 'Migrate instances to serverless (AWS Lambda / GCP Functions)', owner: 'Engineering', due: 'Week 1', done: false },
        { label: 'Escalate 14 overdue invoices (>60 days) to collections team', owner: 'CFO', due: 'Day 1', done: false },
        { label: 'Implement automated AR reminder workflow', owner: 'Finance Ops', due: 'Week 2', done: false },
      ],
      impact: '$8,400/yr cloud savings + accelerated AR collection',
    }
  },
  {
    department: 'HR',
    icon: <Users size={20} />,
    color: '#EC4899',
    items: [
      { text: 'Implement bi-weekly 1:1 structure in Support team to address 55/100 sentiment score.', impact: 'High' },
      { text: 'Prioritize 3 open Engineering roles — projected revenue loss of $42k/month due to understaffing.', impact: 'Medium' },
    ],
    actionPlan: {
      summary: 'Improve team morale and accelerate critical hiring to prevent revenue loss.',
      steps: [
        { label: 'Schedule bi-weekly 1:1s for all Support managers', owner: 'HR Manager', due: 'Day 2', done: false },
        { label: 'Deploy pulse survey to measure Support team sentiment', owner: 'People Ops', due: 'Day 3', done: false },
        { label: 'Post 3 Engineering roles on LinkedIn & job boards', owner: 'Talent Acquisition', due: 'Day 1', done: false },
        { label: 'Set 30-day hiring target for Engineering roles', owner: 'CTO', due: 'Week 1', done: false },
      ],
      impact: 'Prevent $42k/month revenue loss from understaffing',
    }
  },
  {
    department: 'Inventory',
    icon: <Box size={20} />,
    color: '#F59E0B',
    items: [
      { text: 'Reorder Component X from backup supplier in 2 days to prevent Singapore branch stockout.', impact: 'Critical' },
      { text: 'Reduce SKU complexity by 15% — consolidate bottom-performing variants.', impact: 'Low' },
    ],
    actionPlan: {
      summary: 'Prevent critical stockout and streamline inventory for operational efficiency.',
      steps: [
        { label: 'Issue emergency PO to backup supplier for Component X (500 units)', owner: 'Supply Chain', due: 'TODAY', done: false },
        { label: 'Confirm delivery ETA with Singapore warehouse', owner: 'Logistics', due: 'Day 1', done: false },
        { label: 'Identify bottom 15% performing SKUs for consolidation', owner: 'Inventory Mgr', due: 'Week 1', done: false },
        { label: 'Initiate SKU rationalization review with Product team', owner: 'Product Ops', due: 'Week 2', done: false },
      ],
      impact: 'Avoid estimated $120K stockout loss + 15% inventory efficiency gain',
    }
  },
  {
    department: 'Marketing',
    icon: <Target size={20} />,
    color: '#8B5CF6',
    items: [
      { text: 'Reallocate 20% of social spend to email nurturing — email currently shows 4.2x better ROI.', impact: 'High' },
      { text: 'Launch an APAC localization campaign — demand signals in Singapore and Tokyo are strong.', impact: 'Medium' },
    ],
    actionPlan: {
      summary: 'Maximize marketing ROI by shifting budget to high-performing channels and expanding into APAC.',
      steps: [
        { label: 'Reallocate 20% of social ad budget to email campaigns', owner: 'Marketing Ops', due: 'Day 1', done: false },
        { label: 'Build segmented email nurture sequence for top 3 ICPs', owner: 'Content Team', due: 'Week 1', done: false },
        { label: 'Develop APAC landing pages in Japanese and Mandarin', owner: 'Localization', due: 'Week 2', done: false },
        { label: 'Launch Singapore/Tokyo geo-targeted paid campaigns', owner: 'Paid Media', due: 'Week 3', done: false },
      ],
      impact: '4.2x ROI improvement + APAC market entry',
    }
  },
  {
    department: 'Customer Success',
    icon: <HeadphonesIcon size={20} />,
    color: '#F472B6',
    items: [
      { text: 'Assign dedicated CSMs to accounts with NPS < 7 — churn probability is 3.4x higher.', impact: 'High' },
      { text: 'Build a self-service help center — 38% of support tickets are repeated questions.', impact: 'Medium' },
    ],
    actionPlan: {
      summary: 'Reduce churn and support load through proactive account management and self-service tooling.',
      steps: [
        { label: 'Pull list of all accounts with NPS score < 7', owner: 'CS Ops', due: 'Day 1', done: false },
        { label: 'Assign dedicated CSMs to each at-risk account', owner: 'CS Manager', due: 'Day 2', done: false },
        { label: 'Identify top 20 repeated support ticket categories', owner: 'Support Lead', due: 'Week 1', done: false },
        { label: 'Build and publish Help Center articles for top 20 FAQs', owner: 'Content + Support', due: 'Week 3', done: false },
      ],
      impact: 'Reduce churn by 3.4x + reduce ticket volume by 38%',
    }
  },
];

function ActionPlanModal({ rec, onClose }) {
  const [steps, setSteps] = useState(rec.actionPlan.steps.map(s => ({ ...s })));

  const toggleStep = (i) => {
    const updated = [...steps];
    updated[i].done = !updated[i].done;
    setSteps(updated);
  };

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
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-xl bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-start justify-between" style={{ borderBottomColor: `${rec.color}30` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${rec.color}20`, color: rec.color }}>
              {rec.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{rec.department} Action Plan</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">{rec.actionPlan.summary}</p>
            </div>
          </div>
          <button onClick={onClose} className="functional-btn p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4">Action Steps — click to mark complete</p>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              onClick={() => toggleStep(i)}
              whileHover={{ scale: 1.01 }}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                step.done
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 opacity-70'
                  : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
              }`}
            >
              <CheckCircle2
                size={18}
                className={`shrink-0 mt-0.5 transition-colors ${step.done ? 'text-[#10B981]' : 'text-white/20'}`}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${step.done ? 'line-through text-[#94A3B8]' : 'text-white'}`}>{step.label}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] text-[#94A3B8] font-semibold flex items-center gap-1">
                    <Users size={10} /> {step.owner}
                  </span>
                  <span className={`text-[10px] font-bold flex items-center gap-1 ${step.due === 'TODAY' ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}>
                    {step.due === 'TODAY' ? <AlertTriangle size={10} /> : <Clock size={10} />} {step.due}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <div className="p-3 rounded-xl flex items-center gap-3" style={{ backgroundColor: `${rec.color}10`, border: `1px solid ${rec.color}30` }}>
            <Zap size={16} style={{ color: rec.color }} className="shrink-0" />
            <p className="text-sm font-bold" style={{ color: rec.color }}>{rec.actionPlan.impact}</p>
          </div>
          <p className="text-center text-[10px] text-[#94A3B8] mt-3">
            {steps.filter(s => s.done).length} of {steps.length} steps completed
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function GrowthRecommendations() {
  const [activeRec, setActiveRec] = useState(null);

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
          <GlassCard key={rec.department} className="border-white/5 bg-[#0B1120]/60">
            <div className="flex flex-col gap-5 h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${rec.color}20`, color: rec.color }}>
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
                onClick={() => setActiveRec(rec)}
                className="functional-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all text-sm font-bold hover:scale-[1.02] shrink-0 mt-auto"
                style={{ borderColor: `${rec.color}40`, color: rec.color, backgroundColor: `${rec.color}10` }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = `${rec.color}20`}
                onMouseOut={e => e.currentTarget.style.backgroundColor = `${rec.color}10`}
              >
                View Action Plan <ArrowUpRight size={16} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <AnimatePresence>
        {activeRec && <ActionPlanModal rec={activeRec} onClose={() => setActiveRec(null)} />}
      </AnimatePresence>
    </div>
  );
}
