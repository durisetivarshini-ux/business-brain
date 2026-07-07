import React from 'react';
import { motion } from 'framer-motion';

export function CustomerTimeline() {
  const events = [
    { title: "Customer Created", time: "10 Jan, 09:00 AM", status: "past" },
    { title: "Meeting Scheduled", time: "12 Jan, 02:00 PM", status: "past" },
    { title: "Proposal Sent", time: "15 Jan, 11:30 AM", status: "past" },
    { title: "Negotiation", time: "18 Jan, 04:00 PM", status: "current" },
    { title: "Payment Received", time: "Pending", status: "future" },
    { title: "Support Ticket Closed", time: "Pending", status: "future" }
  ];

  return (
    <div className="relative border-l border-white/10 ml-4 py-2">
      {events.map((event, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="mb-8 ml-6 relative"
        >
          {/* Timeline Node */}
          <span className={`absolute -left-[33px] flex items-center justify-center w-4 h-4 rounded-full ring-4 ring-[#0B1120] ${event.status === 'past' ? 'bg-[#10B981]' : event.status === 'current' ? 'bg-[#5B5FFF] animate-pulse' : 'bg-white/20'}`}>
          </span>
          
          <h3 className={`text-sm font-bold ${event.status === 'future' ? 'text-[#94A3B8]' : 'text-white'}`}>{event.title}</h3>
          <time className="block mb-2 text-xs font-normal leading-none text-[#94A3B8] mt-1">{event.time}</time>
        </motion.div>
      ))}
    </div>
  );
}
