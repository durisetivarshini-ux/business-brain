import React, { useState, useEffect } from 'react';
import { Globe2, MapPin, Users, DollarSign, Box, Activity, ChevronRight, TrendingUp, Wifi, X, Building, Phone, Mail, User } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { GlassCard } from '@/components/ui/GlassCard';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Portal } from '@/components/ui/Portal';
import { mockDb } from '@/utils/mockDb';
import toast from 'react-hot-toast';

export function BranchesPage() {
  const navigate = useNavigate();
  const [branchesList, setBranchesList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [hoveredBranch, setHoveredBranch] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'map', label: 'Command Map' },
    { id: 'comparison', label: 'Comparison' }
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    state: '',
    city: '',
    address: '',
    manager: '',
    contact: '',
    email: '',
    employees: '',
    region: 'North America',
  });

  useEffect(() => {
    const data = mockDb.getBranches();
    setBranchesList(data);
    if (data.length > 0) {
      setSelectedBranch(data[0]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveBranch = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.manager || !formData.employees) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const newBranch = mockDb.saveBranch({
        ...formData,
        employees: parseInt(formData.employees) || 0,
      });

      const updated = mockDb.getBranches();
      setBranchesList(updated);
      setSelectedBranch(newBranch);
      setIsSaving(false);
      setShowAddModal(false);
      toast.success('Branch added successfully!', { icon: '🏢' });
      
      setFormData({
        name: '',
        country: '',
        state: '',
        city: '',
        address: '',
        manager: '',
        contact: '',
        email: '',
        employees: '',
        region: 'North America',
      });
    }, 1200);
  };

  // Stats calculation
  const totalRevenue = branchesList.reduce((sum, b) => sum + (b.revenue || 0), 0);
  const totalEmployees = branchesList.reduce((sum, b) => sum + (b.employees || 0), 0);
  const totalOrders = branchesList.reduce((sum, b) => sum + (b.orders || 0), 0);
  const avgPerformance = 92;

  const comparisonData = branchesList.map(b => ({
    branch: b.name.replace(' HQ', '').replace(' Hub', '').replace(' Operations', ''),
    revenue: b.revenue,
    employees: b.employees
  }));

  if (!selectedBranch) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D4FF]" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 h-full pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="Global Command Center"
        description="Real-time operations, logistics, and performance across all branches."
        primaryAction={{
          label: "Add Branch",
          onClick: () => setShowAddModal(true)
        }}
        moduleName="Branches"
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          
          {/* Top KPIs (Exactly 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Global Revenue', value: totalRevenue, prefix: '$', suffix: 'M', color: '#10B981' },
              { label: 'Total Employees', value: totalEmployees, prefix: '', suffix: '', color: '#00D4FF' },
              { label: 'Active Orders', value: totalOrders, prefix: '', suffix: '', color: '#5B5FFF' },
              { label: 'Avg Performance', value: avgPerformance, prefix: '', suffix: '%', color: '#EC4899' },
            ].map(kpi => (
              <GlassCard key={kpi.label} className="p-5 border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 blur-[30px] opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: kpi.color }} />
                <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">{kpi.label}</p>
                <p className="text-3xl font-display font-bold text-white" style={{ color: kpi.color }}>
                  {kpi.prefix}<CountUp end={kpi.value} decimals={kpi.value % 1 !== 0 ? 1 : 0} duration={1.5}/>{kpi.suffix}
                </p>
              </GlassCard>
            ))}
          </div>

          {/* Location details split */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest px-1">Active Locations</h3>
              {branchesList.map(branch => (
                <motion.div
                  key={branch.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    selectedBranch.id === branch.id
                      ? 'border-[#5B5FFF] bg-gradient-to-r from-[#5B5FFF]/15 to-transparent shadow-[0_0_20px_rgba(91,95,255,0.2)]'
                      : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/15'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{branch.icon || '🏢'}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm leading-tight">{branch.name}</h4>
                        <p className="text-xs text-[#94A3B8]">{branch.region}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: branch.color || '#10B981' }} />
                        <span className="text-xs font-bold" style={{ color: branch.color || '#10B981' }}>{branch.status || 'Optimal'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-white font-bold text-lg">
                      <DollarSign size={16} className="text-[#10B981]"/>{branch.revenue}M
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#10B981] font-bold bg-[#10B981]/10 px-2 py-1 rounded-md">
                      <TrendingUp size={12}/> {branch.revTrend}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="xl:col-span-2 flex flex-col gap-6">
              {/* Detailed branch visual */}
              <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl">{selectedBranch.icon || '🏢'}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedBranch.name}</h2>
                        <p className="text-sm text-[#94A3B8]">
                          {selectedBranch.region} · Status: <span style={{ color: selectedBranch.color || '#10B981' }} className="font-bold">{selectedBranch.status || 'Optimal'}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5 mt-5">
                      <div>
                        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1">
                          <DollarSign size={12}/> Monthly Revenue
                        </p>
                        <p className="text-3xl font-display font-bold text-white">
                          ${selectedBranch.revenue}<span className="text-xl text-white/40">M</span>
                        </p>
                        <p className="text-xs font-bold text-[#10B981] mt-1">{selectedBranch.revTrend} vs last month</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Users size={12}/> Active Employees
                        </p>
                        <p className="text-3xl font-display font-bold text-white"><CountUp end={selectedBranch.employees} duration={1}/></p>
                        <p className="text-xs text-[#94A3B8] mt-1">Full-time headcount</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-64 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                          <Box size={12}/> Inventory Capacity
                        </p>
                        <p className="text-sm font-bold text-white">{selectedBranch.inventory}%</p>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          key={selectedBranch.id}
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedBranch.inventory}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedBranch.inventory < 50 ? '#F59E0B' : '#10B981' }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Activity size={12}/> Active Orders
                      </p>
                      <p className="text-2xl font-bold text-white"><CountUp end={selectedBranch.orders} duration={1}/></p>
                    </div>

                    <button
                      onClick={() => navigate(`/app/branches/${selectedBranch.id}`)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF]/20 to-[#00D4FF]/20 border border-[#5B5FFF]/30 text-white text-sm font-bold hover:from-[#5B5FFF]/30 hover:to-[#00D4FF]/30 transition-all flex items-center justify-center gap-2 mt-auto"
                    >
                      Full Branch Dashboard <ChevronRight size={16}/>
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Chart */}
              <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
                <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-5">Revenue by Branch (Monthly)</h3>
                <div className="w-full h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} barSize={32} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="branch" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v}M`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        formatter={(v) => [`$${v}M`, 'Revenue']}
                      />
                      <Bar dataKey="revenue" fill="url(#branchGrad)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="branchGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D4FF" stopOpacity={1} />
                          <stop offset="100%" stopColor="#5B5FFF" stopOpacity={0.7} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="w-full h-[500px] border-[#5B5FFF]/20 bg-[#050816] relative overflow-hidden p-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              {branchesList.map((b1, i) =>
                branchesList.slice(i + 1).map(b2 => {
                  const left1 = parseFloat(b1.mapLeft || '50%');
                  const top1 = parseFloat(b1.mapTop || '50%');
                  const left2 = parseFloat(b2.mapLeft || '50%');
                  const top2 = parseFloat(b2.mapTop || '50%');
                  return (
                    <line
                      key={`${b1.id}-${b2.id}`}
                      x1={`${left1}%`} y1={`${top1}%`}
                      x2={`${left2}%`} y2={`${top2}%`}
                      stroke="#5B5FFF" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4"
                    />
                  );
                })
              )}
            </svg>

            {branchesList.map(branch => {
              const left = branch.mapLeft || '50%';
              const top = branch.mapTop || '50%';
              return (
                <div
                  key={branch.id}
                  className="absolute cursor-pointer group z-10"
                  style={{ left, top, transform: 'translate(-50%, -50%)' }}
                  onClick={() => setSelectedBranch(branch)}
                  onMouseEnter={() => setHoveredBranch(branch.id)}
                  onMouseLeave={() => setHoveredBranch(null)}
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: branch.color || '#10B981' }} />
                    <span className={`relative inline-flex rounded-full h-6 w-6 border-2 transition-transform ${selectedBranch.id === branch.id ? 'scale-125' : ''}`}
                      style={{ backgroundColor: branch.color || '#10B981', borderColor: 'rgba(255,255,255,0.3)' }} />
                  </span>
                  <AnimatePresence>
                    {hoveredBranch === branch.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0B1120] border border-white/20 rounded-xl px-3 py-2 shadow-xl pointer-events-none"
                      >
                        <p className="text-white font-bold text-xs">{branch.name}</p>
                        <p className="text-[#10B981] text-xs font-bold">${branch.revenue}M · {branch.employees} staff</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </GlassCard>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-5">Operational Benchmarks</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} barSize={32} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="branch" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="revenue" fill="url(#branchGrad)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Add Branch Modal */}
      <AnimatePresence>
        {showAddModal && (
          <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building className="text-[#00D4FF]" size={20} /> Add New Branch
                  </h2>
                  <button onClick={() => setShowAddModal(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveBranch} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Branch Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. London Hub"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#5B5FFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Region</label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#5B5FFF]"
                      >
                        <option value="North America">North America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia Pacific">Asia Pacific</option>
                        <option value="South America">South America</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Country *</label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="e.g. UK"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#5B5FFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="e.g. London"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#5B5FFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. London"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#5B5FFF]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold hover:scale-[1.02] transition-transform flex items-center gap-2"
                    >
                      {isSaving ? 'Saving...' : 'Save Branch'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
}
