import React from 'react';
import { AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function AlertsCenter() {
  const alerts = [
    { type: 'Critical', message: 'Warehouse A Cooling System Failure', icon: <ShieldAlert size={14}/>, color: '#EC4899' },
    { type: 'High', message: 'Supplier ABC delayed by 4 days', icon: <Clock size={14}/>, color: '#F59E0B' },
    { type: 'Medium', message: 'Product Y low stock threshold reached', icon: <AlertTriangle size={14}/>, color: '#00D4FF' },
  ];

  return (
    <GlassCard className="p-6 border-[#EC4899]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 flex items-center gap-2">
        Active Alerts
        <span className="bg-[#EC4899] text-white text-[10px] px-2 py-0.5 rounded-full">3</span>
      </h3>

      <div className="flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="mt-0.5 p-1.5 rounded-md" style={{ backgroundColor: `${alert.color}20`, color: alert.color }}>
              {alert.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider mb-1 block" style={{ color: alert.color }}>
                {alert.type}
              </span>
              <p className="text-sm font-medium text-white">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
