import React from 'react';
import { MessageSquare, Plus, Search } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function ConversationHistory() {
  const history = [
    { title: "Q3 Revenue Analysis", date: "Today" },
    { title: "Supply Chain Warning - Product A", date: "Today" },
    { title: "Draft Marketing Campaign", date: "Yesterday" },
    { title: "HR Attrition Report", date: "Previous 7 Days" },
    { title: "Server Maintenance Plan", date: "Previous 7 Days" },
    { title: "Investor Deck Summary", date: "Previous 30 Days" },
  ];

  const grouped = history.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr.title);
    return acc;
  }, {});

  return (
    <div className="w-64 h-[calc(100vh-10rem)] hidden md:flex flex-col gap-4">
      
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white font-bold shadow-[0_0_20px_rgba(91,95,255,0.3)] transition-transform hover:scale-[1.02]">
        <Plus size={18} /> New Chat
      </button>

      <div className="relative group">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input 
          type="text" 
          placeholder="Search history..." 
          className="w-full bg-[#0B1120]/60 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#5B5FFF]/50"
        />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mt-2">
        {Object.entries(grouped).map(([date, titles]) => (
          <div key={date} className="mb-6">
            <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3 pl-2">{date}</h4>
            <div className="space-y-1">
              {titles.map((title, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#F8FAFC] hover:bg-white/10 transition-colors text-left group"
                >
                  <MessageSquare size={14} className="text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors shrink-0" />
                  <span className="truncate flex-1">{title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
