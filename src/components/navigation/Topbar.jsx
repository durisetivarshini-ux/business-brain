import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, Layout, ChevronDown, Home, LogOut, CheckCircle2, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';


export function Topbar() {
  const { user } = useAppStore();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast(`Switched to ${newTheme} mode`, { icon: newTheme === 'dark' ? '🌙' : '☀️' });
  };

  const notifications = [
    { id: 1, title: 'New Strategic Insight', desc: 'AI found $12k in potential savings.', time: '2m ago', icon: <CheckCircle2 size={16} className="text-[#10B981]" /> },
    { id: 2, title: 'Q3 Report Generated', desc: 'The board meeting report is ready.', time: '1h ago', icon: <MessageCircle size={16} className="text-[#00D4FF]" /> },
  ];


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
            onClick={() => toast.success('Command Palette launched 🚀', { icon: '⌨️' })}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#5B5FFF]/50 focus:ring-1 focus:ring-[#5B5FFF]/50 transition-all shadow-inner"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[#94A3B8] text-[10px] font-bold tracking-widest border border-white/5">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Center: Workspace Context */}
      <button onClick={() => toast.success('Switched to Business Brain Enterprise workspace.')} className="hidden lg:flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-[#5B5FFF]/10 to-[#7C3AED]/10 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer functional-btn">
        <Layout size={16} className="text-[#5B5FFF]" />
        <span className="text-sm font-bold text-white tracking-wide">Business Brain Enterprise</span>
        <ChevronDown size={16} className="text-[#94A3B8]" />
      </button>

      {/* Right: Actions & Profile */}
      <div className="flex-1 flex items-center justify-end gap-4">
        
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          title="Back to Landing Page"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-sm font-bold hover:bg-[#10B981]/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
        >
          <Home size={16} />
          <span className="hidden md:inline">Home</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors group"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF]" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-14 w-80 bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    <span className="text-xs text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-0.5 rounded font-bold">2 New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {notifications.map(n => (
                      <div key={n.id} className="px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                        <div className="mt-0.5">{n.icon}</div>
                        <div>
                          <p className="text-sm font-bold text-white">{n.title}</p>
                          <p className="text-xs text-[#94A3B8] mt-0.5">{n.desc}</p>
                          <p className="text-[10px] text-[#94A3B8]/60 mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2">
                    <button onClick={() => { setShowNotifications(false); toast.success('All notifications marked as read.'); }} className="w-full py-2 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


        <div className="h-8 w-px bg-white/10" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button

            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-4 rounded-full transition-colors border border-transparent hover:border-white/5 cursor-pointer"
          >
            {/* Avatar — shows Google photo if available, otherwise initials */}
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover shrink-0 border-2 border-white/10" alt={user.name} />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-white leading-none mb-1">{user?.name || 'Varshini'}</p>
              <p className="text-[10px] font-semibold text-[#00D4FF] uppercase tracking-wider leading-none">Super Admin</p>
            </div>
            <ChevronDown size={14} className={`text-[#94A3B8] transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-14 w-56 bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50"
              >
                {/* User Info */}
                <div className="px-4 py-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center text-white font-bold shrink-0">
                    {user?.name?.charAt(0) || 'V'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{user?.name || 'Varshini'}</p>
                    <p className="text-xs text-[#94A3B8] truncate">{user?.email || 'varshini@businessbrain.ai'}</p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    to="/app/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                      <span className="text-xs font-bold">{user?.name?.charAt(0) || 'V'}</span>
                    </div>
                    View Profile
                  </Link>
                  <button
                    onClick={() => { navigate('/'); setShowDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#10B981] hover:bg-[#10B981]/10 transition-colors w-full text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                      <Home size={14} className="text-[#10B981]" />
                    </div>
                    Back to Home
                  </button>
                  <div className="border-t border-white/5 mt-2 pt-2">
                    <button
                      onClick={() => { navigate('/login'); setShowDropdown(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors w-full text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                        <LogOut size={14} className="text-[#EF4444]" />
                      </div>
                      Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </header>
  );
}
