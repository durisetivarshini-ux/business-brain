import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Bot, Users, TrendingUp, Box, Database, 
  Wallet, Activity, Share2, MessageSquare, PieChart, 
  Workflow, FileText, Settings, ChevronLeft, ChevronRight, DollarSign, Briefcase,
  AlertOctagon, Globe2, Target, Leaf, Video, Zap, ShieldAlert, Home, LogOut
} from 'lucide-react';
import { Logo } from '../common/Logo';

export function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const menuCategories = [
    {
      title: "Executive",
      items: [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app' },
        { name: 'CEO Center', icon: <Target size={20} />, path: '/app/executive' },
        { name: 'Goals & KPIs', icon: <Activity size={20} />, path: '/app/goals' },
        { name: 'Risk Center', icon: <AlertOctagon size={20} />, path: '/app/risks' },
        { name: 'Digital Twin', icon: <Globe2 size={20} />, path: '/app/digital-twin' },
      ]
    },
    {
      title: "AI & Intelligence",
      items: [
        { name: 'AI Copilot', icon: <Bot size={20} />, path: '/app/ai-copilot' },
        { name: 'Business Advisor', icon: <Zap size={20} />, path: '/app/advisor' },
        { name: 'Automation', icon: <Workflow size={20} />, path: '/app/automation' },
        { name: 'Meeting AI', icon: <Video size={20} />, path: '/app/meetings' },
      ]
    },
    {
      title: "Operations & Supply",
      items: [
        { name: 'ERP', icon: <Briefcase size={20} />, path: '/app/erp' },
        { name: 'Global Branches', icon: <Share2 size={20} />, path: '/app/branches' },
        { name: 'Inventory', icon: <Box size={20} />, path: '/app/inventory' },
      ]
    },
    {
      title: "Core Business",
      items: [
        { name: 'Sales', icon: <TrendingUp size={20} />, path: '/app/sales' },
        { name: 'Marketing', icon: <PieChart size={20} />, path: '/app/marketing' },
        { name: 'Finance', icon: <Wallet size={20} />, path: '/app/finance' },
        { name: 'CRM', icon: <Users size={20} />, path: '/app/crm' },
        { name: 'HRMS', icon: <Users size={20} />, path: '/app/hrms' },
        { name: 'Support', icon: <MessageSquare size={20} />, path: '/app/support' },
        { name: 'Documents', icon: <FileText size={20} />, path: '/app/documents' },
        { name: 'Sustainability', icon: <Leaf size={20} />, path: '/app/sustainability' },
      ]
    }
  ];

  return (
    <div className="relative h-[calc(100vh-2rem)] m-4 z-40 flex shrink-0">
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className="h-full w-full rounded-2xl bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 flex flex-col relative shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-visible"
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0 overflow-hidden">
          <Logo size={collapsed ? 32 : 32} className={collapsed ? "mx-auto" : ""} showText={!collapsed} />
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-6 flex flex-col gap-6">
          {menuCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col px-3">
              {!collapsed && (
                <span className="px-3 mb-2 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
                  {category.title}
                </span>
              )}
              {collapsed && (
                <div className="w-8 mx-auto mb-2 border-b border-white/10" />
              )}
              <div className="flex flex-col gap-1">
                {category.items.map((item) => (
                  <NavItem key={item.name} item={item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 shrink-0 flex flex-col gap-1">
          <NavItem item={{ name: "Settings", path: "/app/settings", icon: <Settings size={20} /> }} collapsed={collapsed} />
          
          {/* Back to Landing Page Button */}
          <button
            onClick={() => navigate('/')}
            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group w-full text-left text-[#94A3B8] hover:text-white hover:bg-gradient-to-r hover:from-[#10B981]/15 hover:to-transparent border border-transparent hover:border-[#10B981]/20`}
          >
            <div className="relative z-10 shrink-0 text-[#10B981] group-hover:text-[#10B981]">
              <Home size={20} />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium text-sm whitespace-nowrap overflow-hidden relative z-10 text-[#10B981]"
                >
                  Back to Home
                </motion.span>
              )}
            </AnimatePresence>
            {/* Tooltip in collapsed mode */}
            {collapsed && (
              <div className="absolute left-16 bg-[#0B1120] border border-[#10B981]/30 text-[#10B981] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-[0_0_20px_rgba(16,185,129,0.3)] z-[100] opacity-0 group-hover:opacity-100 transition-opacity">
                Back to Home
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#5B5FFF] flex items-center justify-center text-white cursor-pointer z-50 border border-white/20 shadow-[0_0_15px_rgba(91,95,255,0.5)] transition-transform hover:scale-110"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
}

function NavItem({ item, collapsed }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={item.path}
      end={item.path === '/app'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={({ isActive }) => `
        relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group overflow-visible
        ${isActive ? 'text-white' : 'text-[#94A3B8] hover:text-white'}
      `}
    >
      {({ isActive }) => (
        <>
          {/* Active / Hover Background */}
          {(isActive || isHovered) && (
            <motion.div 
              layoutId="sidebar-active"
              className="absolute inset-0 bg-gradient-to-r from-[#5B5FFF]/20 to-transparent border-l-2 border-[#00D4FF] rounded-xl pointer-events-none"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {/* Icon */}
          <div className={`relative z-10 shrink-0 ${isActive ? 'text-[#00D4FF]' : 'group-hover:text-[#5B5FFF] transition-colors'}`}>
            {item.icon}
          </div>

          {/* Label */}
          <AnimatePresence>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium text-sm whitespace-nowrap overflow-hidden relative z-10"
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip for collapsed state */}
          {collapsed && isHovered && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-16 bg-[#0B1120] border border-[#5B5FFF]/30 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-[0_0_20px_rgba(91,95,255,0.3)] z-[100]"
            >
              {item.name}
            </motion.div>
          )}
        </>
      )}
    </NavLink>
  );
}
