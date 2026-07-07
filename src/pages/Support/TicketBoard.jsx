import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MoreHorizontal } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function TicketBoard() {
  const tickets = [
    { id: "T-8492", customer: "Acme Corp", issue: "API Integration Error", priority: "Critical", status: "Open", time: "10m ago", color: "#EC4899" },
    { id: "T-8491", customer: "TechFlow Inc", issue: "Billing Question", priority: "Medium", status: "In Progress", time: "1h ago", color: "#00D4FF" },
    { id: "T-8490", customer: "Global Retail", issue: "Dashboard Login Failure", priority: "High", status: "Open", time: "2h ago", color: "#F59E0B" },
    { id: "T-8489", customer: "Sarah Jenkins", issue: "Feature Request", priority: "Low", status: "Pending", time: "4h ago", color: "#94A3B8" },
  ];

  return (
    <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Active Tickets</h3>
        <span className="text-xs font-bold text-[#5B5FFF] bg-[#5B5FFF]/10 px-2 py-1 rounded-md">View Queue</span>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {tickets.map((ticket, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ticket.color, boxShadow: `0 0 10px ${ticket.color}` }}></div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-sm">{ticket.customer}</span>
                  <span className="text-[10px] text-[#94A3B8] border border-white/10 px-1.5 py-0.5 rounded">{ticket.id}</span>
                </div>
                <p className="text-xs text-[#94A3B8] truncate max-w-[200px] sm:max-w-[300px]">{ticket.issue}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold" style={{ color: ticket.color }}>{ticket.priority}</span>
                <span className="text-[10px] text-[#94A3B8]">{ticket.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
                  <MessageCircle size={14} />
                </button>
                <button className="p-2 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
