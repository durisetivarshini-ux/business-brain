import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bot, LayoutDashboard, Target, Activity, Users, DollarSign, Wallet, TrendingUp, Zap, Sparkles } from "lucide-react";

export function TiltDashboardPreview() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="w-full max-w-6xl mx-auto perspective-[2000px] mt-16 px-4 pb-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full relative rounded-2xl border border-white/10 bg-[#050816]/90 backdrop-blur-3xl shadow-[0_30px_100px_-20px_rgba(0,212,255,0.2)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B5FFF]/5 to-[#00D4FF]/5 pointer-events-none" />
        
        {/* Mac Window Header */}
        <div className="h-10 border-b border-white/5 bg-[#0B1120] flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          <div className="ml-auto text-[10px] text-[#94A3B8] font-mono opacity-50 flex items-center gap-2">
            <Sparkles size={10} className="text-[#00D4FF]" /> AI Copilot Active
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex h-[500px]">
          
          {/* Sidebar */}
          <div className="w-56 hidden md:flex flex-col border-r border-white/5 bg-[#0B1120]/50 p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-sm">Business Brain</span>
            </div>
            
            <div className="space-y-1">
              {[
                { icon: <LayoutDashboard size={16}/>, label: 'Dashboard', active: true },
                { icon: <Target size={16}/>, label: 'Executive Center' },
                { icon: <Zap size={16}/>, label: 'AI Advisor' },
                { icon: <Wallet size={16}/>, label: 'Finance' },
                { icon: <Users size={16}/>, label: 'HRMS' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-gradient-to-r from-[#5B5FFF]/20 to-transparent border-l-2 border-[#00D4FF] text-white font-bold' : 'text-[#94A3B8]'}`}>
                  <span className={item.active ? 'text-[#00D4FF]' : ''}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 p-8 flex flex-col gap-6 bg-gradient-to-br from-[#0B1120]/30 to-[#050816]/30">
            
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-white font-display flex items-center gap-3">
                  Enterprise Overview
                </h1>
                <p className="text-[#94A3B8] text-sm mt-1">Real-time AI analysis of global operations.</p>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/5 border border-[#10B981]/30 rounded-xl flex items-center gap-2 text-[#10B981] text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Activity size={14} className="animate-pulse" /> System Optimal
              </div>
            </div>
            
            {/* KPI Grid */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: 'Global Revenue', val: '$12.4M', icon: <DollarSign size={18}/>, color: '#10B981', trend: '+14%' },
                { label: 'Active Users', val: '8,421', icon: <Users size={18}/>, color: '#00D4FF', trend: '+5%' },
                { label: 'AI Insights generated', val: '142', icon: <Zap size={18}/>, color: '#7C3AED', trend: '+28%' },
              ].map((kpi, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-20" style={{ backgroundColor: kpi.color }} />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10" style={{ color: kpi.color }}>
                      {kpi.icon}
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-white/5" style={{ color: kpi.color }}>{kpi.trend}</span>
                  </div>
                  <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1 relative z-10">{kpi.label}</p>
                  <p className="text-3xl font-display font-bold text-white relative z-10">{kpi.val}</p>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col">
              <h3 className="text-sm font-bold text-white mb-6">Revenue & Prediction Forecast</h3>
              <div className="flex-1 w-full flex items-end justify-between gap-2 px-4 relative z-10">
                {[40, 65, 45, 80, 55, 90, 75, 100, 85].map((h, i) => (
                  <div key={i} className="w-full max-w-[40px] bg-gradient-to-t from-[#5B5FFF] to-[#00D4FF] rounded-t-md relative group transition-all hover:opacity-80" style={{ height: `${h}%` }}>
                    {i > 5 && (
                      <div className="absolute -inset-x-1 -top-1 bottom-0 border-2 border-dashed border-[#EC4899]/50 rounded-t-lg pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-1/3 left-0 right-0 border-t border-dashed border-white/20" />
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
