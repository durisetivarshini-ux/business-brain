import React from 'react';
import { Plus, FileText, TrendingUp, Share2, Box, Wallet, Users, LayoutDashboard, PieChart, Bookmark, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function Sidebar() {
  const sections = [
    {
      title: "Business Reports",
      items: [
        { name: "Revenue Analysis", icon: <TrendingUp size={16}/> },
        { name: "Marketing", icon: <Share2 size={16}/> },
        { name: "Inventory", icon: <Box size={16}/> },
        { name: "Finance", icon: <Wallet size={16}/> },
        { name: "HR", icon: <Users size={16}/> },
        { name: "CRM", icon: <LayoutDashboard size={16}/> },
        { name: "Analytics", icon: <PieChart size={16}/> },
      ]
    },
    {
      title: "AI Memory",
      items: [
        { name: "Saved Prompts", icon: <Bookmark size={16}/> },
        { name: "History", icon: <Clock size={16}/> },
        { name: "Favorites", icon: <Star size={16}/> },
      ]
    }
  ];

  return (
    <div className="w-64 hidden xl:flex flex-col gap-6">
      
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white font-bold shadow-[0_0_20px_rgba(91,95,255,0.3)] transition-transform hover:scale-[1.02]">
        <Plus size={18} /> New Chat
      </button>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
        {sections.map((section, i) => (
          <div key={i}>
            <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4 pl-2 flex items-center gap-2">
              {section.title === 'Business Reports' ? <FileText size={14}/> : null}
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item, j) => (
                <button 
                  key={j}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#F8FAFC] hover:bg-white/10 hover:shadow-inner transition-all text-left group border border-transparent hover:border-white/5"
                >
                  <div className="text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <span className="truncate flex-1 font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
