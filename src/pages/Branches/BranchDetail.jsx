import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Globe2, MapPin, Users, DollarSign, Box, Activity, TrendingUp, ArrowLeft, Building, Phone, Mail, User, ShieldAlert, BarChart2, Calendar, Clipboard } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockDb } from '@/utils/mockDb';
import toast from 'react-hot-toast';

export function BranchDetail() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const branches = mockDb.getBranches();
    const found = branches.find(b => b.id.toUpperCase() === branchId?.toUpperCase());
    if (found) {
      setBranch(found);
    } else {
      toast.error('Branch not found');
      navigate('/app/branches');
    }
  }, [branchId, navigate]);

  if (!branch) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D4FF]" />
      </div>
    );
  }

  // Mock performance data specific to branch
  const performanceData = [
    { name: 'Jan', sales: Math.floor(branch.revenue * 15), profit: Math.floor(branch.revenue * 6) },
    { name: 'Feb', sales: Math.floor(branch.revenue * 17), profit: Math.floor(branch.revenue * 7) },
    { name: 'Mar', sales: Math.floor(branch.revenue * 16), profit: Math.floor(branch.revenue * 6.5) },
    { name: 'Apr', sales: Math.floor(branch.revenue * 20), profit: Math.floor(branch.revenue * 9) },
    { name: 'May', sales: Math.floor(branch.revenue * 22), profit: Math.floor(branch.revenue * 10) },
    { name: 'Jun', sales: Math.floor(branch.revenue * 24), profit: Math.floor(branch.revenue * 11) },
  ];

  const recentActivity = [
    { id: 1, type: 'shipment', title: 'New inventory shipment arrived', time: '10 minutes ago', desc: 'Received 250 units of Circuit Board Pro X' },
    { id: 2, type: 'order', title: 'Bulk purchase order logged', time: '1 hour ago', desc: 'Order #PO-8821 worth $14,200 finalized' },
    { id: 3, type: 'staff', title: 'Staff shift schedule compiled', time: '3 hours ago', desc: 'AI optimized shifts for 14 terminal employees' },
    { id: 4, type: 'incident', title: 'Temperature warning resolved', time: 'Yesterday', desc: 'Zone A3 cooling system telemetry restored to normal' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 h-full pb-10">
      
      {/* Header with back navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/app/branches')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-1 flex items-center gap-3">
              <span className="text-3xl">{branch.icon || '🏢'}</span>
              {branch.name}
            </h1>
            <p className="text-[#94A3B8] font-medium flex items-center gap-1.5">
              <MapPin size={14} className="text-[#00D4FF]" /> {branch.address || branch.city}
            </p>
          </div>
        </div>
        
        {/* Status badges */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-wider">
            {branch.status || 'Optimal'} Operational
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#94A3B8] text-xs font-bold">
            ID: {branch.id}
          </span>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Monthly Revenue', value: branch.revenue, prefix: '$', suffix: 'M', color: '#10B981', icon: <DollarSign size={16} /> },
          { label: 'Total Employees', value: branch.employees, prefix: '', suffix: '', color: '#00D4FF', icon: <Users size={16} /> },
          { label: 'Inventory Capacity', value: branch.inventory, prefix: '', suffix: '%', color: '#5B5FFF', icon: <Box size={16} /> },
          { label: 'Active Orders', value: branch.orders, prefix: '', suffix: '', color: '#EC4899', icon: <Activity size={16} /> },
        ].map(k => (
          <GlassCard key={k.label} className="p-5 border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 blur-[30px] opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: k.color }} />
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">{k.label}</p>
              <span style={{ color: k.color }} className="opacity-60">{k.icon}</span>
            </div>
            <p className="text-3xl font-display font-bold text-white">
              {k.prefix}<CountUp end={k.value} decimals={k.value % 1 !== 0 ? 1 : 0} duration={1.2}/>{k.suffix}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Graphs & Performance */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Recharts Area Chart */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-white text-base">Branch Performance</h3>
                <p className="text-xs text-[#94A3B8]">Monthly Sales vs Operating Profit margins</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#00D4FF]"><span className="w-2.5 h-2.5 rounded bg-[#00D4FF]" /> Sales</span>
                <span className="flex items-center gap-1.5 text-[#10B981]"><span className="w-2.5 h-2.5 rounded bg-[#10B981]" /> Profit</span>
              </div>
            </div>
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#00D4FF" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* AI Insights & Alerts specific to this branch */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <ShieldAlert className="text-[#5B5FFF]" size={18} /> AI Operations Advisor
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-sm font-bold text-white mb-1">Inventory Optimization Opportunity</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Based on recent order spikes, safety stock levels for categories at this location should be adjusted upwards by 15%. This will reduce stockout risk from 8% to below 1.5%.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 transition-colors">
                <p className="text-sm font-bold text-[#F59E0B] mb-1">Resource Capacity Constriction</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Headcount performance ratio is approaching peak limits. Recommend allocating 2 seasonal employees to handle forecasted increase in inbound supply chain shipments next month.
                </p>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Right Column: Manager & Activity logs */}
        <div className="flex flex-col gap-8">
          
          {/* Manager details */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <User className="text-[#00D4FF]" size={18} /> Branch Manager
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#5B5FFF] flex items-center justify-center text-white font-bold text-lg">
                {branch.manager.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{branch.manager}</p>
                <p className="text-xs text-[#94A3B8]">Operational Director</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-white/5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8] flex items-center gap-1.5"><Phone size={12}/> Contact</span>
                <span className="text-white font-medium">{branch.contact || '+1 (555) 010-3849'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8] flex items-center gap-1.5"><Mail size={12}/> Email</span>
                <span className="text-white font-medium truncate max-w-[150px]">{branch.email || 'manager@businessbrain.com'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8] flex items-center gap-1.5"><Calendar size={12}/> Onboard Date</span>
                <span className="text-white font-medium">May 14, 2024</span>
              </div>
            </div>
          </GlassCard>

          {/* Recent Activity */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex-1">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <Clipboard className="text-[#EC4899]" size={18} /> Recent Activity
            </h3>
            <div className="space-y-5">
              {recentActivity.map((activity, i) => (
                <div key={activity.id} className="relative pl-6">
                  {/* Timeline connector line */}
                  {i < recentActivity.length - 1 && (
                    <div className="absolute left-[5px] top-[14px] bottom-[-22px] w-[2px] bg-white/5" />
                  )}
                  {/* Bullet */}
                  <div className="absolute left-0 top-[6px] w-[12px] h-[12px] rounded-full border border-[#5B5FFF] bg-[#0B1120]" />
                  
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="text-xs font-bold text-white">{activity.title}</p>
                      <span className="text-[10px] text-[#94A3B8]">{activity.time}</span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
