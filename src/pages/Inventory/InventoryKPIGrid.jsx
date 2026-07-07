import React from 'react';
import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';
import { motion } from 'framer-motion';
import { Package, MapPin, CheckCircle, AlertTriangle, ShoppingCart, DollarSign } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function InventoryKPIGrid() {
  const stats = [
    { title: "Total Products", value: 18542, icon: <Package size={20}/>, color: "#5B5FFF", status: "Active" },
    { title: "Warehouses", value: 12, icon: <MapPin size={20}/>, color: "#7C3AED", status: "Online" },
    { title: "Available Stock", value: 94, icon: <CheckCircle size={20}/>, color: "#10B981", suffix: "%", status: "Healthy" },
    { title: "Low Stock Items", value: 82, icon: <AlertTriangle size={20}/>, color: "#F59E0B", status: "Warning" },
    { title: "Today's Orders", value: 326, icon: <ShoppingCart size={20}/>, color: "#00D4FF", status: "+12%" },
    { title: "Inventory Value", value: 24.8, icon: <DollarSign size={20}/>, color: "#EC4899", prefix: "₹", suffix: " Cr", decimals: 1, status: "High" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard hover glowColor={stat.color} className="p-5 flex flex-col items-start border-white/5 bg-[#0B1120]/60 relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: stat.color }} />

            <div className="flex justify-between items-start w-full mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 ${stat.title === 'Low Stock Items' ? 'text-[#F59E0B]' : 'text-[#94A3B8]'}`}>
                {stat.status}
              </span>
            </div>

            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">{stat.title}</h3>
            
            <div className="text-2xl font-display font-bold text-white tracking-tight">
              {stat.prefix}
              <CountUp end={stat.value} decimals={stat.decimals || 0} duration={2} separator="," />
              {stat.suffix}
            </div>

            {/* Sparkline simulation for value */}
            {stat.title === "Inventory Value" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                <div className="h-full" style={{ width: `80%`, backgroundColor: stat.color, opacity: 0.8 }} />
              </div>
            )}

          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
