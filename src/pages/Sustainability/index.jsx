import React, { useState } from 'react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { InsightPanel } from '@/components/ui/InsightPanel';
import { Leaf, Wind, Sun, Droplets, Battery, Target, Award, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const emissionData = [
  { month: 'Jan', emissions: 120 },
  { month: 'Feb', emissions: 115 },
  { month: 'Mar', emissions: 110 },
  { month: 'Apr', emissions: 95 },
  { month: 'May', emissions: 85 },
  { month: 'Jun', emissions: 82 },
];

function downloadESGReport() {
  const now = new Date();
  const rows = [
    ['Business Brain – Sustainability & ESG Report', '', '', ''],
    [`Generated on: ${now.toLocaleDateString('en-IN')}`, '', '', ''],
    ['', '', '', ''],
    ['ESG METRICS', '', '', ''],
    ['Category', 'Value', 'YTD Change', 'Status'],
    ['Carbon Footprint', '82 Tons', '-15% YoY', 'Optimal'],
    ['Energy Usage', '450 MWh', '-8% YoY', 'On Target'],
    ['Waste Recycled', '94%', '+4% YoY', 'Excellent'],
    ['Sustainability Score', '9.2 / 10', 'Top 5%', 'Leader'],
    ['', '', '', ''],
    ['AI INITIATIVES & RECOMMENDATIONS', '', '', ''],
    ['Initiative', 'Expected Impact', 'Status', 'Priority'],
    ['Server Consolidation', '-120 kWh/mo', 'In Progress', 'High'],
    ['Paperless HR Onboarding', '-40 kg/mo', 'Planned', 'Medium'],
    ['Smart Office Lighting', '-15 MWh/yr', 'Completed', 'Low'],
  ];

  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ESG_Report_${now.toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function SustainabilityPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'reports', label: 'Reports' },
    { id: 'initiatives', label: 'Initiatives' }
  ];

  const handleExportPDF = async () => {
    const promise = new Promise(r => setTimeout(r, 1200));
    toast.promise(promise, {
      loading: 'Generating ESG Report...',
      success: 'ESG Report downloaded!',
      error: 'Export failed.',
    });
    await promise;
    downloadESGReport();
  };

  const insights = [
    { text: "Carbon footprint decreased by 15% YoY via server consolidation.", highlight: "decreased by 15% YoY" },
    { text: "Energy usage optimized; average savings of 8% on cloud systems.", highlight: "savings of 8%" },
    { text: "94% of non-hazardous company office waste was recycled.", highlight: "94%" },
    { text: "AI suggests consolidating development sandbox environments to save 120 kWh/mo.", highlight: "save 120 kWh/mo" },
  ];

  const recentImpactLogs = [
    { activity: 'Cloud Server Consolidation', category: 'Energy', impact: '-120 kWh/mo', date: '15 Jul 2026', status: 'Active' },
    { activity: 'Transitioned HR to e-Signatures', category: 'Waste', impact: '-40 kg paper/mo', date: '12 Jul 2026', status: 'Completed' },
    { activity: 'Smart HVAC Installation', category: 'Emissions', impact: '-2.4 tons CO2/yr', date: '08 Jul 2026', status: 'Active' },
    { activity: 'LED Retrofit (Mumbai Office)', category: 'Energy', impact: '-850 kWh/mo', date: '01 Jul 2026', status: 'Completed' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="Sustainability & ESG"
        description="Tracking carbon footprint, energy efficiency, and environmental impact."
        primaryAction={{
          label: "Log ESG Metric",
          onClick: () => toast.success('ESG Logging form opened.')
        }}
        moduleName="Sustainability"
        onExportPDF={handleExportPDF}
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* 1. 4 ESG KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Carbon Footprint" value={82} unit=" tons" trend="-15% YoY" color="#10B981" icon={<Wind />} />
            <MetricCard title="Energy Usage" value={450} unit=" MWh" trend="-8% YoY" color="#F59E0B" icon={<Sun />} />
            <MetricCard title="Waste Recycled" value={94} unit="%" trend="+4% YoY" color="#00D4FF" icon={<Droplets />} />
            <MetricCard title="Sustainability Score" value={9.2} unit="/10" trend="Top 5% Industry" color="#8B5CF6" icon={<Target />} />
          </div>

          {/* 2. AI Assistant Panel */}
          <InsightPanel 
            moduleName="Sustainability"
            title="Green AI Advisor"
            subtitle="ESG Strategy"
            badgeText="Sustainability AI Active"
            description="I've evaluated company greenhouse emissions, utility billing, and hardware lifecycles. Here are key sustainability recommendations."
            insights={insights}
            themeColor="#10B981"
          />

          {/* 3. CO2 Chart */}
          <div className="grid grid-cols-1 gap-6">
            <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col">
              <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 flex items-center gap-2">
                <Wind size={16} className="text-[#10B981]"/> CO2 Emissions Trend (YTD)
              </h3>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emissionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }}/>
                    <Line type="monotone" dataKey="emissions" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 6 }} name="CO2 (Tons)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          {/* 4. Recent Activity Table */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Sustainability Impacts</h3>
              <button onClick={() => setActiveTab('initiatives')} className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer">
                View Initiatives <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#94A3B8]">
                <thead className="text-xs text-white uppercase bg-white/5 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Activity</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Estimated Impact</th>
                    <th className="px-4 py-3">Date logged</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentImpactLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-bold text-white">{log.activity}</td>
                      <td className="px-4 py-3 text-white">{log.category}</td>
                      <td className="px-4 py-3 text-[#10B981] font-semibold">{log.impact}</td>
                      <td className="px-4 py-3">{log.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          log.status === 'Completed' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' :
                          'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 max-w-xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-2">Sustainability & ESG Reports</h2>
            <p className="text-sm text-[#94A3B8] mb-6">Download comprehensive auditing reports for your annual corporate filings.</p>
            <button onClick={handleExportPDF} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#047857] text-white font-bold hover:scale-[1.02] transition-all cursor-pointer">
              Download Annual ESG Report (CSV)
            </button>
          </GlassCard>
        </div>
      )}

      {activeTab === 'initiatives' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-lg font-bold text-white mb-4">AI Recommended Green Initiatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <p className="text-white text-base font-bold mb-1 flex justify-between">
                  <span>Server Optimization</span>
                  <span className="text-[#10B981] text-xs font-mono">-120 kWh/mo</span>
                </p>
                <p className="text-[#94A3B8] text-sm mt-1">AI recommends consolidating inactive staging environments to reduce cloud energy consumption.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <p className="text-white text-base font-bold mb-1 flex justify-between">
                  <span>Paperless Ops Transition</span>
                  <span className="text-[#10B981] text-xs font-mono">-40 kg/mo</span>
                </p>
                <p className="text-[#94A3B8] text-sm mt-1">Transition HR onboarding completely paperless with digital signatures.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

    </div>
  );
}

function MetricCard({ title, value, unit, trend, color, icon }) {
  return (
    <GlassCard className="p-6 flex flex-col border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ backgroundColor: `${color}20`, color: color }}>
          {trend}
        </span>
      </div>
      <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-3xl font-display font-bold text-white tracking-tight flex items-baseline gap-1">
        <CountUp end={value} decimals={value % 1 !== 0 ? 1 : 0} duration={2} separator="," />
        <span className="text-lg text-white/50">{unit}</span>
      </div>
    </GlassCard>
  );
}
