import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, CheckCircle2, ShieldAlert, MapPin, Eye, Phone, RotateCcw, X, 
  TrendingUp, Navigation, Activity, CloudSun, Wind, Droplets, Compass, 
  Bell, AlertTriangle, Settings, RefreshCw, BarChart2, ShieldCheck, Thermometer
} from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Portal } from '../../components/ui/Portal';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import toast from 'react-hot-toast';

function ShipmentDetailModal({ shipment, onClose }) {
  const events = shipment.progress === 100 ? [
    { time: '09:00 AM', event: 'Package picked up from warehouse', status: 'done' },
    { time: '11:30 AM', event: 'Cleared customs checkpoint', status: 'done' },
    { time: '02:15 PM', event: 'In transit — left distribution hub', status: 'done' },
    { time: '05:45 PM', event: 'Delivered to destination', status: 'done' },
  ] : shipment.progress >= 50 ? [
    { time: '09:00 AM', event: 'Package picked up from warehouse', status: 'done' },
    { time: '11:30 AM', event: 'Cleared customs checkpoint', status: 'done' },
    { time: '02:15 PM', event: 'In transit — en route to destination', status: 'active' },
    { time: 'Pending', event: 'Delivery scheduled', status: 'pending' },
  ] : [
    { time: '09:00 AM', event: 'Package picked up from warehouse', status: 'done' },
    { time: '11:30 AM', event: 'Customs hold — documentation review', status: 'active' },
    { time: 'Pending', event: 'Transit to destination', status: 'pending' },
    { time: 'Pending', event: 'Delivery', status: 'pending' },
  ];

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md rounded-[20px] border bg-[#0B1120] shadow-2xl p-8 relative overflow-hidden"
          style={{ borderColor: `${shipment.color}30` }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full pointer-events-none" style={{ backgroundColor: `${shipment.color}15` }} />
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors z-20"><X size={20} /></button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${shipment.color}20`, border: `1px solid ${shipment.color}40` }}>
              <span style={{ color: shipment.color }}>{shipment.icon}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{shipment.id}</h2>
              <p className="text-xs text-[#94A3B8] flex items-center gap-1"><MapPin size={10} /> {shipment.destination}</p>
            </div>
            <div className="ml-auto px-3 py-1 rounded-lg text-xs font-bold" style={{ color: shipment.color, backgroundColor: `${shipment.color}15` }}>
              {shipment.status}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6 relative z-10">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-[#94A3B8]">Progress</span>
              <span className="text-xs font-bold text-white">{shipment.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${shipment.progress}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: shipment.color }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6 relative z-10">
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Tracking Timeline</p>
            <div className="space-y-0">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${ev.status === 'done' ? 'bg-[#10B981] border-[#10B981]' : ev.status === 'active' ? `border-[${shipment.color}] bg-transparent animate-pulse` : 'bg-[#0B1120] border-white/20'}`}
                      style={ev.status === 'active' ? { borderColor: shipment.color } : {}}
                    />
                    {i < events.length - 1 && <div className={`w-0.5 h-8 ${ev.status === 'done' ? 'bg-[#10B981]/30' : 'bg-white/10'}`} />}
                  </div>
                  <div className="pb-4 -mt-0.5">
                    <p className={`text-sm font-semibold ${ev.status === 'pending' ? 'text-[#94A3B8]' : 'text-white'}`}>{ev.event}</p>
                    <p className="text-xs text-[#94A3B8]">{ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 relative z-10">
            <button
              onClick={() => { toast.success('Carrier contacted for update'); onClose(); }}
              className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone size={12} /> Contact Carrier
            </button>
            {shipment.status === 'Delayed' && (
              <button
                onClick={() => { toast.success('Reroute request submitted'); onClose(); }}
                className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                style={{ background: `linear-gradient(135deg, ${shipment.color}, #00D4FF)` }}
              >
                <RotateCcw size={12} /> Reroute
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

function CircularProgress({ percent, color, label }) {
  const radius = 22;
  const stroke = 4;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={stroke} />
          <motion.circle 
            cx="28" cy="28" r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
            initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <span className="text-xs font-bold text-white">{percent}%</span>
      </div>
      <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

export function LogisticsTracker() {
  const [activeShipment, setActiveShipment] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
  const [notifIndex, setNotifIndex] = useState(0);

  const shipments = [
    { id: "SHP-9042", destination: "New York, USA", status: "In Transit", progress: 65, icon: <Truck size={14}/>, color: "#00D4FF" },
    { id: "SHP-9043", destination: "London, UK", status: "Delivered", progress: 100, icon: <CheckCircle2 size={14}/>, color: "#10B981" },
    { id: "SHP-9045", destination: "Berlin, DE", status: "Delayed", progress: 30, icon: <ShieldAlert size={14}/>, color: "#F59E0B" },
  ];

  const milestones = ["Packed", "Dispatched", "In Transit", "Delivered"];

  const deliveryTrends = [
    { name: 'Mon', success: 12, delayed: 1 },
    { name: 'Tue', success: 15, delayed: 2 },
    { name: 'Wed', success: 18, delayed: 0 },
    { name: 'Thu', success: 14, delayed: 1 },
    { name: 'Fri', success: 22, delayed: 3 },
  ];

  const notifications = [
    "Shipment SHP-9042 reached Mumbai.",
    "Driver Alex completed delivery.",
    "Warehouse 3 inventory updated.",
    "AI optimized Route 14.",
    "Package SHP-9011 delayed due to weather.",
  ];

  const destinationWeather = [
    { city: "New York", temp: "24°C", condition: "Sunny", wind: "12 km/h", impact: "Low" },
    { city: "London", temp: "16°C", condition: "Light Rain", wind: "18 km/h", impact: "Medium" },
    { city: "Berlin", temp: "19°C", condition: "Cloudy", wind: "9 km/h", impact: "Low" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifIndex(prev => (prev + 1) % notifications.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [notifications.length]);

  const handleOptimizeRoute = () => {
    setOptimizing(true);
    toast.loading('Analyzing telemetry & weather paths...', { id: 'optimize-toast' });
    setTimeout(() => {
      setOptimizing(false);
      toast.success('Route optimized successfully! Avoided Berlin storm.', { id: 'optimize-toast', icon: '⚡' });
    }, 1800);
  };

  const handleGenerateReport = () => {
    toast.success('Logistics report compiled and saved to Documents!', { icon: '📊' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 w-full relative">
      
      {/* 1. Today's KPIs (Full width on all screens) */}
      <div className="col-span-full order-0 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[
          { label: 'Active Cargo', value: '3', sub: 'In-transit streams', color: '#00D4FF', icon: <Truck size={14} /> },
          { label: 'Delivered Today', value: '14', sub: '+18% vs yesterday', color: '#10B981', icon: <CheckCircle2 size={14} /> },
          { label: 'Fuel Savings', value: '$2,480', sub: 'AI routes optimized', color: '#EC4899', icon: <Navigation size={14} /> },
        ].map(k => (
          <GlassCard key={k.label} className="p-6 border-white/5 bg-[#0B1120]/40 relative overflow-hidden group rounded-[20px] h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-12 h-12 blur-[25px] opacity-10" style={{ backgroundColor: k.color }} />
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{k.label}</span>
              <span style={{ color: k.color }} className="opacity-60">{k.icon}</span>
            </div>
            <p className="text-xl font-display font-bold text-white">{k.value}</p>
            <p className="text-[9px] text-[#94A3B8] mt-0.5">{k.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Row 1: Cargo In-Transit Status (Left) */}
      <div className="order-1 lg:order-1 w-full flex">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 rounded-[20px] flex flex-col gap-5 h-full w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-[#00D4FF]" /> Cargo In-Transit Status
            </h3>
            <span className="text-[10px] text-[#94A3B8] font-semibold">Live GPS Telemetry</span>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {shipments.map((shipment, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.01 }}
                className="flex flex-col gap-3.5 p-5 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/15 transition-all relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[20px]" style={{ backgroundColor: shipment.color }} />

                <div className="flex justify-between items-start pl-2">
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide flex items-center gap-2">
                      {shipment.id}
                      <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: shipment.color }} />
                    </h4>
                    <p className="text-[11px] text-[#94A3B8] flex items-center gap-1 mt-0.5"><MapPin size={10} /> {shipment.destination}</p>
                  </div>
                  <div 
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold"
                    style={{ color: shipment.color, backgroundColor: `${shipment.color}10`, border: `1px solid ${shipment.color}25` }}
                  >
                    {shipment.icon}
                    <span>{shipment.status}</span>
                  </div>
                </div>

                <div className="mt-2 pl-2 relative">
                  <div className="absolute top-[4px] left-[12.5%] w-[75%] h-0.5 bg-white/5 z-0">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${shipment.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-[#5B5FFF]" 
                    />
                  </div>
                  <div className="flex justify-between mb-3 relative z-10">
                    {milestones.map((m, j) => {
                      const isActive = (j / (milestones.length - 1)) * 100 <= shipment.progress;
                      return (
                        <div key={j} className="flex flex-col items-center gap-1.5 w-1/4">
                          <div className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${isActive ? 'bg-[#5B5FFF] border-[#5B5FFF]' : 'bg-[#0B1120] border-white/20'}`} />
                          <span className={`text-[8px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-[#94A3B8]'}`}>{m}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 mt-2 pl-2 border-t border-white/5 pt-3">
                  <button
                    onClick={() => setActiveShipment(shipment)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-[#94A3B8] hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Eye size={12} /> Details
                  </button>
                  <button
                    onClick={() => toast.success(`Carrier notified for ${shipment.id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-[#94A3B8] hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Phone size={12} /> Contact
                  </button>
                  {shipment.status === 'Delayed' && (
                    <button
                      onClick={() => toast.success(`Reroute requested for ${shipment.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[10px] font-bold text-[#F59E0B] hover:bg-[#F59E0B]/20 transition-colors ml-auto"
                    >
                      <RotateCcw size={12} /> Reroute
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Row 1: Global Logistics Map (Right) */}
      <div className="order-7 lg:order-2 w-full flex">
        <GlassCard className="p-0 border-[#00D4FF]/20 bg-[#050816] rounded-[20px] relative overflow-hidden flex flex-col h-full w-full min-h-[300px]">
          {/* Tech Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          {/* Radar Sweep Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-[800px] h-[800px] rounded-full border border-[#00D4FF]/10 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-[600px] h-[600px] rounded-full border border-[#00D4FF]/20 flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full border border-[#00D4FF]/30 flex items-center justify-center relative">
                  {/* Radar beam */}
                  <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 212, 255, 0.2) 100%)' }}>
                    <div className="absolute top-0 bottom-1/2 left-1/2 w-0.5 bg-[#00D4FF] shadow-[0_0_15px_#00D4FF]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full relative flex items-center justify-center p-6 z-10">
            <svg viewBox="0 0 1000 500" className="w-full h-full relative" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="route1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="route2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Routes */}
              <path d="M 250,220 Q 400,100 550,180" fill="none" stroke="url(#route1)" strokeWidth="3" strokeDasharray="6 6" filter="url(#glow)" />
              <path d="M 550,180 Q 700,150 820,280" fill="none" stroke="url(#route2)" strokeWidth="3" strokeDasharray="6 6" filter="url(#glow)" />
              
              {/* Moving data packets */}
              <path d="M 250,220 Q 400,100 550,180" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="1 30" className="animated-route-dot" style={{ strokeDashoffset: 0, animation: 'dash 3s linear infinite' }} />
              <path d="M 550,180 Q 700,150 820,280" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="1 30" className="animated-route-dot" style={{ strokeDashoffset: 0, animation: 'dash 4s linear infinite' }} />

              {/* City Nodes */}
              <g transform="translate(250, 220)">
                <circle r="25" fill="#00D4FF" opacity="0.1" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle r="12" fill="#00D4FF" opacity="0.2" />
                <circle r="5" fill="#00D4FF" filter="url(#glow)" />
                <text x="0" y="25" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle" className="uppercase tracking-widest">New York</text>
                <rect x="-35" y="-35" width="70" height="16" rx="4" fill="#00D4FF" opacity="0.15" />
                <text x="0" y="-24" fill="#00D4FF" fontSize="10" fontWeight="bold" textAnchor="middle">SHP-9042</text>
              </g>

              <g transform="translate(550, 180)">
                <circle r="30" fill="#10B981" opacity="0.1" className="animate-ping" style={{ animationDuration: '2s' }} />
                <circle r="12" fill="#10B981" opacity="0.2" />
                <circle r="5" fill="#10B981" filter="url(#glow)" />
                <text x="0" y="25" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle" className="uppercase tracking-widest">London</text>
                <rect x="-35" y="-35" width="70" height="16" rx="4" fill="#10B981" opacity="0.15" />
                <text x="0" y="-24" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">SHP-9043</text>
              </g>

              <g transform="translate(820, 280)">
                <circle r="20" fill="#F59E0B" opacity="0.1" className="animate-ping" style={{ animationDuration: '4s' }} />
                <circle r="12" fill="#F59E0B" opacity="0.2" />
                <circle r="5" fill="#F59E0B" filter="url(#glow)" />
                <text x="0" y="25" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle" className="uppercase tracking-widest">Berlin</text>
                <rect x="-35" y="-35" width="70" height="16" rx="4" fill="#F59E0B" opacity="0.15" />
                <text x="0" y="-24" fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">SHP-9045</text>
              </g>
            </svg>
          </div>

          <style>{`
            @keyframes dash {
              to { stroke-dashoffset: -124; }
            }
          `}</style>
          
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <Compass size={14} className="text-[#00D4FF] animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]">Live Telemetry Radar</span>
          </div>
          
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-4">
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_5px_#00D4FF] animate-pulse"/> <span className="text-[9px] text-[#94A3B8] uppercase font-bold">In Transit</span></div>
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_5px_#10B981] animate-pulse"/> <span className="text-[9px] text-[#94A3B8] uppercase font-bold">Delivered</span></div>
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_5px_#F59E0B] animate-pulse"/> <span className="text-[9px] text-[#94A3B8] uppercase font-bold">Delayed</span></div>
          </div>
        </GlassCard>
      </div>

      {/* Row 2: Weekly Delivery Success Chart (Left) */}
      <div className="order-4 lg:order-3 w-full flex">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 rounded-[20px] flex flex-col gap-4 h-full w-full">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5"><BarChart2 size={13} className="text-[#5B5FFF]" /> Weekly Delivery Success</h4>
            <span className="text-[9px] font-semibold text-[#94A3B8]">Past 5 days</span>
          </div>
          <div className="flex-1 w-full min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: 'rgba(255,255,255,0.1)' }} />
                <Bar dataKey="success" fill="#5B5FFF" radius={[3, 3, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Row 2: AI Logistics Assistant (Right) */}
      <div className="order-5 lg:order-4 w-full flex">
        <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-[#0B1120] to-[#1e154a]/30 rounded-[20px] flex flex-col gap-4 h-full w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#5B5FFF]/20 flex items-center justify-center text-[#00D4FF]">
              <Compass size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">AI Logistics</h4>
              <p className="text-[9px] text-[#94A3B8]">Optimizations Active</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-[11px] text-[#94A3B8] leading-relaxed flex-1 flex items-center">
            <p>Weather storm system approaching Berlin segment. Rerouting <span className="font-bold text-[#F59E0B] mx-1">SHP-9045</span> will save 4.2h in delays.</p>
          </div>
          <div className="mt-auto flex gap-2 pt-2">
            <button 
              onClick={handleOptimizeRoute} 
              disabled={optimizing}
              className="flex-1 py-2.5 text-white text-[10px] font-bold rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] hover:scale-[1.02] transition-transform flex items-center justify-center gap-1"
            >
              {optimizing ? <RefreshCw size={10} className="animate-spin" /> : null}
              Optimize
            </button>
            <button 
              onClick={handleGenerateReport} 
              className="px-4 py-2.5 text-white text-[10px] font-bold rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              Report
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Row 3: Destination Weather Telemetry (Left) */}
      <div className="order-3 lg:order-5 w-full flex">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 rounded-[20px] flex flex-col gap-5 h-full w-full justify-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CloudSun size={14} className="text-[#00D4FF]" /> Destination Weather Telemetry
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {destinationWeather.map(w => (
              <div key={w.city} className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">{w.city}</span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md ${w.impact === 'High' ? 'bg-rose-500/10 text-rose-400' : w.impact === 'Medium' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-[#10B981]/15 text-[#10B981]'}`}>
                    {w.impact} Impact
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Thermometer size={14} className="text-white/40" />
                  <span className="text-sm font-semibold text-white">{w.temp} · {w.condition}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-[#94A3B8]">
                  <span className="flex items-center gap-1"><Wind size={10} /> {w.wind}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Row 3: Fleet Status (Right) */}
      <div className="order-2 lg:order-6 w-full flex">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 rounded-[20px] flex justify-around items-center h-full w-full min-h-[140px]">
          <CircularProgress percent={85} color="#10B981" label="Fleet Online" />
          <CircularProgress percent={92} color="#00D4FF" label="Drivers Active" />
          <CircularProgress percent={15} color="#F59E0B" label="Offline Repairs" />
        </GlassCard>
      </div>

      {/* Row 4: Storage Load Capacity (Left) */}
      <div className="order-6 lg:order-7 w-full flex">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 rounded-[20px] flex flex-col gap-4 h-full w-full justify-center min-h-[120px]">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5"><Settings size={13} className="text-[#10B981]" /> Storage Load Capacity</span>
            <span className="text-[#10B981] font-bold text-xs">82% Used</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden my-1">
            <div className="h-full bg-gradient-to-r from-[#10B981] to-[#00D4FF] rounded-full" style={{ width: '82%' }} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-[#94A3B8]">
            <span>Inbound cargo: 250 m³ today</span>
            <span className="text-right">Outbound cargo: 180 m³ today</span>
          </div>
        </GlassCard>
      </div>

      {/* Row 4: Live Ticker notifications (Right) */}
      <div className="order-8 lg:order-8 w-full flex">
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 rounded-[20px] relative overflow-hidden flex flex-col justify-center h-full w-full min-h-[120px]">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={13} className="text-[#EC4899]" />
            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Live Log Feed</span>
          </div>
          <div className="h-8 relative overflow-hidden flex items-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={notifIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-semibold text-white truncate w-full"
              >
                {notifications[notifIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>

      <AnimatePresence>
        {activeShipment && <ShipmentDetailModal shipment={activeShipment} onClose={() => setActiveShipment(null)} />}
      </AnimatePresence>
    </div>
  );
}
