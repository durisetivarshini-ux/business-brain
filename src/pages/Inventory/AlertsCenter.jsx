import React, { useState } from 'react';
import { AlertTriangle, Clock, ShieldAlert, CheckCircle, X, ChevronRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export function AlertsCenter() {
  const [alerts, setAlerts] = useState([
    {
      id: 1, type: 'Critical', message: 'Warehouse A Cooling System Failure',
      detail: 'Temperature sensors in Zone A3 report +12°C above threshold. Immediate intervention required to protect perishable inventory.',
      icon: <ShieldAlert size={14}/>, color: '#EC4899',
      actions: ['Dispatch Technician', 'Evacuate Stock'],
    },
    {
      id: 2, type: 'High', message: 'Supplier ABC delayed by 4 days',
      detail: 'Shipment #SHP-9045 from Supplier ABC is delayed. ETA revised to July 18. Affects 6 production lines.',
      icon: <Clock size={14}/>, color: '#F59E0B',
      actions: ['Contact Supplier', 'Find Alternate'],
    },
    {
      id: 3, type: 'Medium', message: 'Product Y low stock threshold reached',
      detail: 'Product Y (SKU-2038) has fallen below the safety stock level of 100 units. Current stock: 85 units.',
      icon: <AlertTriangle size={14}/>, color: '#00D4FF',
      actions: ['Reorder Now', 'View Stock'],
    },
  ]);

  const [expanded, setExpanded] = useState(null);

  const dismiss = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    toast.success('Alert dismissed');
  };

  const handleAction = (alertMsg, action) => {
    toast.success(`${action}: action triggered for "${alertMsg}"`, { icon: '⚡' });
  };

  return (
    <GlassCard className="p-6 border-[#EC4899]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-5 flex items-center gap-2">
        Active Alerts
        <span className="bg-[#EC4899] text-white text-[10px] px-2 py-0.5 rounded-full">{alerts.length}</span>
      </h3>

      <div className="flex flex-col gap-3 flex-1">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: `${alert.color}20`, backgroundColor: `${alert.color}08` }}
            >
              {/* Main Row */}
              <div
                className="flex items-center gap-3 p-3 cursor-pointer hover:brightness-110 transition-all"
                onClick={() => setExpanded(expanded === alert.id ? null : alert.id)}
              >
                <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: `${alert.color}20`, color: alert.color }}>
                  {alert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5" style={{ color: alert.color }}>
                    {alert.type}
                  </span>
                  <p className="text-sm font-medium text-white truncate">{alert.message}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <ChevronRight
                    size={14}
                    className="text-[#94A3B8] transition-transform duration-200"
                    style={{ transform: expanded === alert.id ? 'rotate(90deg)' : 'none' }}
                  />
                  <button
                    onClick={e => { e.stopPropagation(); dismiss(alert.id); }}
                    className="p-1 rounded hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Expanded Detail */}
              <AnimatePresence>
                {expanded === alert.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-white/5">
                      <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{alert.detail}</p>
                      <div className="flex gap-2 flex-wrap">
                        {alert.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleAction(alert.message, action)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-[1.03] ${
                              i === 0
                                ? 'text-white hover:brightness-110'
                                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                            }`}
                            style={i === 0 ? { background: `linear-gradient(135deg, ${alert.color}, ${alert.color}99)` } : {}}
                          >
                            {action}
                          </button>
                        ))}
                        <button
                          onClick={() => dismiss(alert.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors ml-auto"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {alerts.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-6">
            <CheckCircle size={36} className="text-[#10B981]" />
            <p className="text-white font-bold">All Clear!</p>
            <p className="text-xs text-[#94A3B8]">No active alerts at this time.</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
