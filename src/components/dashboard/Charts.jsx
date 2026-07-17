import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from '../ui/GlassCard';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '../../context/WorkspaceContext';

export function RevenueChart() {
  const navigate = useNavigate();
  const { businessData, currencySymbol } = useWorkspace();

  const transactions = businessData.transactions || [];
  
  // Aggregate real/sandbox transactions or fallback to default trend
  const chartData = transactions.length > 0 ? 
    transactions.slice().reverse().map((t, idx) => ({
      name: t.date.split(',')[0] || `T-${idx + 1}`,
      revenue: t.amount > 0 ? t.amount : 0,
      expenses: t.amount < 0 ? Math.abs(t.amount) : 0
    })) : [
      { name: 'Jan', revenue: 40000, expenses: 24000 },
      { name: 'Feb', revenue: 30000, expenses: 13980 },
      { name: 'Mar', revenue: 50000, expenses: 38000 },
      { name: 'Apr', revenue: 47800, expenses: 39080 },
      { name: 'May', revenue: 58900, expenses: 48000 },
      { name: 'Jun', revenue: 63900, expenses: 38000 },
      { name: 'Jul', revenue: 74900, expenses: 43000 },
    ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B1120] border border-white/10 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[#94A3B8]">{entry.name}:</span>
              <span className="text-white font-semibold">{currencySymbol}{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard 
      onClick={() => navigate('/app/finance')} 
      className="p-6 border-white/5 bg-[#0B1120]/60 h-[400px] flex flex-col cursor-pointer hover:border-[#5B5FFF]/30 transition-all"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-white">Revenue Overview</h3>
          <p className="text-sm text-[#94A3B8]">Compared to last month</p>
        </div>
        <select 
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0B1120] border border-white/10 rounded-lg px-3 py-1.5 text-sm font-medium text-white outline-none"
        >
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="flex-1 w-full relative min-h-0">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B5FFF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5B5FFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${val}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#5B5FFF" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#00D4FF" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}

export function SalesChart() {
  const navigate = useNavigate();
  const { businessData, currencySymbol } = useWorkspace();

  const transactions = businessData.transactions || [];
  
  const salesData = transactions.length > 0 ? 
    transactions.filter(t => t.amount > 0).slice(0, 7).reverse().map((t, idx) => ({
      name: t.date.split(',')[0] || `Sale ${idx + 1}`,
      sales: t.amount
    })) : [
      { name: 'Mon', sales: 4000 },
      { name: 'Tue', sales: 3000 },
      { name: 'Wed', sales: 2000 },
      { name: 'Thu', sales: 2780 },
      { name: 'Fri', sales: 1890 },
      { name: 'Sat', sales: 2390 },
      { name: 'Sun', sales: 3490 },
    ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B1120] border border-white/10 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[#94A3B8]">{entry.name}:</span>
              <span className="text-white font-semibold">{currencySymbol}{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard 
      onClick={() => navigate('/app/sales')} 
      className="p-6 border-white/5 bg-[#0B1120]/60 h-[300px] flex flex-col cursor-pointer hover:border-[#00D4FF]/30 transition-all"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Recent Sales</h3>
      </div>
      <div className="flex-1 w-full relative min-h-0">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
              <Bar dataKey="sales" name="Sales" fill="#00D4FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}

export function CustomerChart() {
  const navigate = useNavigate();
  const { businessData } = useWorkspace();

  const customers = businessData.customers || [];

  const customerData = customers.length > 0 ? [
    { name: 'Active Segment', value: customers.filter(c => c.status === 'Active').length || customers.length, color: '#5B5FFF' },
    { name: 'New Segment', value: customers.filter(c => c.status === 'Admitted' || c.status === 'Negotiating').length || 0, color: '#7C3AED' },
    { name: 'Pending Segment', value: customers.filter(c => c.status === 'Lead').length || 0, color: '#00D4FF' },
  ] : [
    { name: 'Enterprise', value: 400, color: '#5B5FFF' },
    { name: 'SMB', value: 300, color: '#7C3AED' },
    { name: 'Startup', value: 300, color: '#00D4FF' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B1120] border border-white/10 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.payload.color }} />
              <span className="text-[#94A3B8]">{entry.name}:</span>
              <span className="text-white font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalCount = customers.length > 0 ? customers.length : 1000;

  return (
    <GlassCard 
      onClick={() => navigate('/app/crm')} 
      className="p-6 border-white/5 bg-[#0B1120]/60 h-[300px] flex flex-col cursor-pointer hover:border-[#7C3AED]/30 transition-all"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Customer Segments</h3>
      </div>
      <div className="flex-1 w-full relative flex items-center justify-center min-h-0">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={customerData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-white">{totalCount > 999 ? `${(totalCount/1000).toFixed(0)}k+` : totalCount}</span>
          <span className="text-[10px] text-[#94A3B8]">Total</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        {customerData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-white font-medium">{entry.name}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
