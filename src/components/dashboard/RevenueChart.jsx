import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "../ui/GlassCard";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 7000 },
];

export function RevenueChart() {
  return (
    <GlassCard className="p-6 h-[350px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-white font-semibold tracking-wide">Revenue Forecast</h3>
          <p className="text-white/50 text-sm">AI predicted trajectory for Q3</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="text-xs text-[#00f0ff] font-mono font-medium">LIVE PREDICTION</span>
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#ffffff20" tick={{ fill: "#ffffff60", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff20" tick={{ fill: "#ffffff60", fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#000", borderColor: "#333", borderRadius: "8px", color: "#fff" }}
              itemStyle={{ color: "#00f0ff" }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
