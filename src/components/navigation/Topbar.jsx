import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Home, LogOut, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [paletteSearch, setPaletteSearch] = useState('');
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'AI Copilot Insight', desc: 'Identified ₹12,500 monthly SaaS subscription savings.', time: '2m ago', category: 'AI', path: '/app/ai-copilot', read: false, icon: <CheckCircle2 size={16} className="text-[#10B981]" /> },
    { id: 2, title: 'Low Stock Alert', desc: 'Ingredient stock level under 15% threshold.', time: '1h ago', category: 'Inventory', path: '/app/inventory', read: false, icon: <Bell size={16} className="text-[#EF4444]" /> },
    { id: 3, title: 'Invoice Paid', desc: 'INV-2026-0412 paid fully by Acme Corp.', time: '3h ago', category: 'Finance', path: '/app/finance', read: false, icon: <CheckCircle2 size={16} className="text-[#10B981]" /> },
    { id: 4, title: 'New Customer Ticket', desc: 'SUP-8842: Database sync error reported.', time: '5h ago', category: 'Support', path: '/app/support', read: true, icon: <MessageCircle size={16} className="text-[#00D4FF]" /> },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowPalette(prev => !prev);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('Marked all alerts as read!');
  };

  const handleNotificationClick = (n) => {
    setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
    setShowNotifications(false);
    navigate(n.path);
  };

  return (
    <>
      <header className="h-20 bg-[#080d1a]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-6 sm:px-8 sticky top-0 z-30 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
        
        {/* Left: Global Search */}
        <div className="flex-1 flex items-center max-w-sm sm:max-w-md mr-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={16} className="text-[#64748b] group-focus-within:text-[#00D4FF] transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search commands, clients, or modules... (Ctrl+K)" 
              onClick={() => setShowPalette(true)}
              readOnly
              className="w-full bg-white/[0.03] border border-white/10 rounded-full py-2 pl-11 pr-4 text-xs sm:text-sm text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#5B5FFF]/40 focus:bg-white/[0.05] cursor-pointer transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 text-[#64748b] text-[9px] font-bold tracking-widest border border-white/5">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 ml-auto">
          
          {/* Home Button */}
          <button
            onClick={() => navigate('/')}
            title="Back to Landing Page"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs sm:text-sm font-bold hover:bg-[#10B981]/25 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all cursor-pointer"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors relative cursor-pointer"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-[#0B1120] animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-[#0B1120]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-2"
                >
                  <div className="p-3 border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Operational Alerts ({unreadCount})</span>
                    <button onClick={handleMarkAllRead} className="text-[10px] text-[#00D4FF] hover:underline cursor-pointer">Mark All Read</button>
                  </div>
                  <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#94A3B8] text-center p-4">No notifications.</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => handleNotificationClick(n)}
                          className={`p-3 hover:bg-white/5 transition-colors flex items-start gap-3 cursor-pointer ${!n.read ? 'bg-white/[0.02]' : ''}`}
                        >
                          <div className="p-2 rounded-lg bg-white/5 shrink-0 mt-0.5">{n.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-1.5 mb-0.5">
                              <h5 className="text-xs font-bold text-white leading-tight">{n.title}</h5>
                              {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />}
                            </div>
                            <p className="text-[10px] text-[#94A3B8] leading-relaxed">{n.desc}</p>
                            <span className="text-[9px] text-[#64748b] block mt-1">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center font-bold text-white text-sm shadow-inner">
                {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'US'}
              </div>
              <span className="hidden md:inline text-xs font-bold text-white tracking-wide">{user?.displayName || 'User Profile'}</span>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-[#0B1120]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-1.5"
                >
                  <div className="p-3 border-b border-white/5">
                    <span className="text-xs font-bold text-white block truncate">{user?.displayName || 'User Profile'}</span>
                    <span className="text-[10px] text-[#94A3B8] block truncate">{user?.email || 'admin@businessbrain.ai'}</span>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <button 
                      onClick={() => { navigate('/app/profile'); setShowDropdown(false); }}
                      className="flex items-center gap-3 px-3 py-2 text-xs text-white hover:bg-white/5 rounded-xl transition-colors w-full text-left cursor-pointer"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => { navigate('/app'); setShowDropdown(false); }}
                      className="flex items-center gap-3 px-3 py-2 text-xs text-white hover:bg-white/5 rounded-xl transition-colors w-full text-left cursor-pointer"
                    >
                      Back to Home
                    </button>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); navigate('/login'); setShowDropdown(false); }}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors w-full text-left cursor-pointer"
                      >
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

      {/* ── COMMAND PALETTE OVERLAY ── */}
      <AnimatePresence>
        {showPalette && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center pt-24 px-4 select-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowPalette(false); setPaletteSearch(''); }}
              className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="relative w-full max-w-lg bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 p-4 flex flex-col gap-3"
            >
              {/* Search Bar */}
              <div className="relative flex items-center shrink-0">
                <Search size={16} className="absolute left-4 text-[#94A3B8]" />
                <input 
                  type="text"
                  autoFocus
                  value={paletteSearch}
                  onChange={e => setPaletteSearch(e.target.value)}
                  placeholder="Type a command or page name..."
                  className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00D4FF] placeholder-white/20 font-medium"
                />
                <button 
                  onClick={() => { setShowPalette(false); setPaletteSearch(''); }} 
                  className="absolute right-4 text-[#94A3B8] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Suggestions */}
              <div className="max-h-[250px] overflow-y-auto custom-scrollbar flex flex-col gap-0.5">
                {[
                  { name: "Executive Dashboard", desc: "Go to executive command center", path: "/app" },
                  { name: "CEO Center", desc: "View strategic business metrics", path: "/app/executive" },
                  { name: "Goals & KPIs", desc: "Track organizational milestones", path: "/app/goals" },
                  { name: "AI Copilot Workspace", desc: "Interact with Gemini reasoning agent", path: "/app/ai-copilot" },
                  { name: "Sales Pipeline", desc: "View deals and pipeline metrics", path: "/app/sales" },
                  { name: "Finance Ledger", desc: "Check budgeting, cash flows, and transactions", path: "/app/finance" },
                  { name: "HRMS Staff Directory", desc: "Manage employees profiles and roster", path: "/app/hrms" },
                  // Customers (CRM)
                  { name: "Acme Corp (Customer)", desc: "CRM - Enterprise Segment Client", path: "/app/crm" },
                  { name: "Global Tech (Customer)", desc: "CRM - VIP Segment Client", path: "/app/crm" },
                  { name: "Nexus Industries (Customer)", desc: "CRM - Startup Segment Client", path: "/app/crm" },
                  // Employees (HRMS)
                  { name: "Varshini Duriseti (Staff)", desc: "HRMS - Software Architect", path: "/app/hrms" },
                  { name: "John Doe (Staff)", desc: "HRMS - Support Lead", path: "/app/hrms" },
                  { name: "Sarah Connor (Staff)", desc: "HRMS - Sales Director", path: "/app/hrms" },
                  // Invoices
                  { name: "Invoice INV-2026-0412 (Finance)", desc: "₹12,500 - Acme Corp - Completed", path: "/app/finance" },
                  { name: "Invoice INV-2026-0814 (Finance)", desc: "₹45,000 - Quantum AI - Pending", path: "/app/finance" },
                  // Support
                  { name: "Ticket #SUP-8842 (Support)", desc: "Database Cluster offline alert", path: "/app/support" },
                  { name: "Ticket #SUP-1025 (Support)", desc: "Payment checkout gateway error", path: "/app/support" },
                  // Documents
                  { name: "Board_Meeting_Minutes.pdf (Document)", desc: "Q3 executive strategy notes", path: "/app/documents" },
                  { name: "Supplier_Agreement_2026.docx (Document)", desc: "Procurement term sheets", path: "/app/documents" },
                  // AI Recommendations
                  { name: "Optimize AWS Roster (AI Recommendation)", desc: "Reduce staging database instance counts to save $240/mo", path: "/app/ai-copilot" }
                ]
                .filter(item => item.name.toLowerCase().includes(paletteSearch.toLowerCase()))
                .map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(item.path);
                      setShowPalette(false);
                      setPaletteSearch('');
                    }}
                    className="p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors flex flex-col gap-0.5"
                  >
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-[#94A3B8]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
