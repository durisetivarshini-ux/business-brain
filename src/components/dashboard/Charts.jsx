import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from '../ui/GlassCard';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 5000, expenses: 3800 },
  { name: 'Apr', revenue: 4780, expenses: 3908 },
  { name: 'May', revenue: 5890, expenses: 4800 },
  { name: 'Jun', revenue: 6390, expenses: 3800 },
  { name: 'Jul', revenue: 7490, expenses: 4300 },
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
            <span className="text-white font-semibold">₹{(entry.value / 100).toFixed(2)} Cr</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-white">Revenue Overview</h3>
          <p className="text-sm text-[#94A3B8]">Compared to last year</p>
        </div>
        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-medium text-white outline-none">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/100}Cr`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#5B5FFF" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#00D4FF" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export function SalesChart() {
  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Weekly Sales</h3>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
            <Bar dataKey="sales" name="Sales" fill="#00D4FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

const customerData = [
  { name: 'Enterprise', value: 400, color: '#5B5FFF' },
  { name: 'SMB', value: 300, color: '#7C3AED' },
  { name: 'Startup', value: 300, color: '#00D4FF' },
];

export function CustomerChart() {
  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Customer Segments</h3>
      </div>
      <div className="flex-1 w-full relative flex items-center justify-center">
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
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-white">1k+</span>
          <span className="text-xs text-[#94A3B8]">Total</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        {customerData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-white font-medium">{entry.name}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
