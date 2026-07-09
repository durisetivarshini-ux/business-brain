import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MoreHorizontal, X, Search, Clock, Tag } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

function QueueModal({ tickets, onClose }) {
  const [search, setSearch] = useState('');
  const filtered = tickets.filter(t => t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.issue.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-3xl h-[80vh] flex flex-col rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl relative overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h2 className="text-xl font-bold text-white">Support Ticket Queue</h2>
            <p className="text-xs text-[#94A3B8] mt-1">248 Active Tickets</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50" 
              placeholder="Search by ID, customer, or issue..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((ticket, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ticket.color, boxShadow: `0 0 10px ${ticket.color}` }}></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm">{ticket.customer}</span>
                    <span className="text-[10px] text-[#94A3B8] border border-white/10 px-1.5 py-0.5 rounded">{ticket.id}</span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">{ticket.issue}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 text-[#94A3B8]"><Clock size={12} /> {ticket.time}</span>
                  <span className="flex items-center gap-1 font-bold" style={{ color: ticket.color }}><Tag size={12} /> {ticket.priority}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toast.success(`Chat opened with ${ticket.customer}`)} className="p-2 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"><MessageCircle size={14} /></button>
                  <button onClick={() => toast.success(`Options menu for ${ticket.id}`)} className="p-2 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"><MoreHorizontal size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-[#94A3B8] text-sm py-10">No tickets found matching "{search}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TicketBoard() {
  const [showQueue, setShowQueue] = useState(false);

  const tickets = [
    { id: "T-8492", customer: "Acme Corp", issue: "API Integration Error", priority: "Critical", status: "Open", time: "10m ago", color: "#EC4899" },
    { id: "T-8491", customer: "TechFlow Inc", issue: "Billing Question", priority: "Medium", status: "In Progress", time: "1h ago", color: "#00D4FF" },
    { id: "T-8490", customer: "Global Retail", issue: "Dashboard Login Failure", priority: "High", status: "Open", time: "2h ago", color: "#F59E0B" },
    { id: "T-8489", customer: "Sarah Jenkins", issue: "Feature Request", priority: "Low", status: "Pending", time: "4h ago", color: "#94A3B8" },
    // Some extra tickets for the modal queue
    { id: "T-8488", customer: "Nexus Industries", issue: "SSO Config Failing", priority: "High", status: "Open", time: "5h ago", color: "#F59E0B" },
    { id: "T-8487", customer: "Priya Sharma", issue: "Refund Request", priority: "Medium", status: "Pending", time: "6h ago", color: "#00D4FF" },
    { id: "T-8486", customer: "DataSys Inc", issue: "Database Sync Error", priority: "Critical", status: "Open", time: "7h ago", color: "#EC4899" },
  ];

  const topTickets = tickets.slice(0, 4);

  return (
    <>
      <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60 h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B5FFF]/5 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Active Tickets</h3>
          <button 
            onClick={() => setShowQueue(true)}
            className="text-xs font-bold text-[#5B5FFF] bg-[#5B5FFF]/10 hover:bg-[#5B5FFF]/20 transition-colors px-3 py-1.5 rounded-md cursor-pointer"
          >
            View Queue
          </button>
        </div>

        <div className="flex flex-col gap-3 flex-1 relative z-10">
          {topTickets.map((ticket, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ticket.color, boxShadow: `0 0 10px ${ticket.color}` }}></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm group-hover:text-[#5B5FFF] transition-colors">{ticket.customer}</span>
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
                  <button onClick={() => toast.success(`Chat opened with ${ticket.customer}`)} className="p-2 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-[#5B5FFF]/20 transition-colors">
                    <MessageCircle size={14} />
                  </button>
                  <button onClick={() => toast.success(`Options menu for ${ticket.id}`)} className="p-2 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-[#5B5FFF]/20 transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <AnimatePresence>
        {showQueue && <QueueModal tickets={tickets} onClose={() => setShowQueue(false)} />}
      </AnimatePresence>
    </>
  );
}
