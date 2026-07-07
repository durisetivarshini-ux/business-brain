import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';

const volumeData = [
  { time: '08:00', volume: 12, resolved: 10 },
  { time: '10:00', volume: 45, resolved: 38 },
  { time: '12:00', volume: 68, resolved: 52 },
  { time: '14:00', volume: 85, resolved: 71 },
  { time: '16:00', volume: 55, resolved: 65 },
  { time: '18:00', volume: 24, resolved: 40 },
];

export function SupportCharts() {
  return (
    <div className="grid grid-cols-1 gap-8 h-full">
      
      {/* Ticket Volume Area Chart */}
      <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60">
        <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Ticket Volume vs Resolution</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="volume" name="Incoming Tickets" stroke="#EC4899" strokeWidth={2} fill="url(#colorVolume)" />
              <Area type="monotone" dataKey="resolved" name="Resolved Tickets" stroke="#00D4FF" strokeWidth={3} fill="url(#colorResolved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
}
