import React from 'react';
import { Search, Bell, Moon, Sun, Layout, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Topbar() {
  return (
    <header className="h-20 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      {/* Left: Global Search */}
      <div className="flex-1 flex items-center max-w-md">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-[#94A3B8] group-focus-within:text-[#00D4FF] transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search commands, clients, or modules... (Ctrl+K)" 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#5B5FFF]/50 focus:ring-1 focus:ring-[#5B5FFF]/50 transition-all shadow-inner"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[#94A3B8] text-[10px] font-bold tracking-widest border border-white/5">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Center: Workspace Context */}
      <div className="hidden lg:flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-[#5B5FFF]/10 to-[#7C3AED]/10 border border-white/5">
        <Layout size={16} className="text-[#5B5FFF]" />
        <span className="text-sm font-bold text-white tracking-wide">Business Brain Enterprise</span>
        <ChevronDown size={16} className="text-[#94A3B8] cursor-pointer" />
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex-1 flex items-center justify-end gap-6">
        
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
            <Sun size={20} />
          </button>
          <button className="relative p-2.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors group">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF]" />
          </button>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <Link to="/app/profile" className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-4 rounded-full transition-colors border border-transparent hover:border-white/5 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0B1120] flex items-center justify-center overflow-hidden relative">
              <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-white leading-none mb-1">Varshini</p>
            <p className="text-[10px] font-semibold text-[#00D4FF] uppercase tracking-wider leading-none">Super Admin</p>
          </div>
        </Link>
        
      </div>
    </header>
  );
}
