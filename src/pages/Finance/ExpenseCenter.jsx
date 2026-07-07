import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const expenseData = [
  { name: 'Salary', value: 45, color: '#5B5FFF' },
  { name: 'Marketing', value: 25, color: '#00D4FF' },
  { name: 'Software', value: 15, color: '#10B981' },
  { name: 'Office', value: 10, color: '#F59E0B' },
  { name: 'Travel', value: 5, color: '#EC4899' },
];

export function ExpenseCenter() {
  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col h-full">
      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Expense Distribution</h3>
      
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Animated Pie Chart */}
        <div className="w-48 h-48 relative">
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span className="text-xs text-[#94A3B8] font-bold">Total</span>
            <span className="text-xl font-display font-bold text-white">₹11.3Cr</span>
          </div>
          
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(value) => [`${value}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Categories List */}
        <div className="flex-1 w-full grid grid-cols-1 gap-3">
          {expenseData.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}80` }}></span>
                <span className="text-sm font-bold text-white">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-[#94A3B8]">{item.value}%</span>
            </div>
          ))}
        </div>

      </div>
    </GlassCard>
  );
}
