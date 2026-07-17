import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Bot, Users, TrendingUp, Box, Database, 
  Wallet, Activity, Share2, MessageSquare, PieChart, 
  Workflow, FileText, Settings, ChevronLeft, ChevronRight, DollarSign, Briefcase,
  AlertOctagon, Globe2, Target, Leaf, Video, Zap, Home
} from 'lucide-react';
import { Logo } from '../common/Logo';

import { useWorkspace } from '../../context/WorkspaceContext';

export function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const { workspaceConfig: config } = useWorkspace();

  // Base navigation categories
  const menuCategories = [];

  // 1. EXECUTIVE (Always Visible)
  menuCategories.push({
    title: "EXECUTIVE",
    items: [
      { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/app' },
      { name: 'Executive Center', icon: <Target size={18} />, path: '/app/executive' },
      { name: 'Digital Twin', icon: <Globe2 size={18} />, path: '/app/digital-twin' },
      { name: 'Goals & KPIs', icon: <Activity size={18} />, path: '/app/goals' },
      { name: 'Risk Center', icon: <AlertOctagon size={18} />, path: '/app/risks' }
    ]
  });

  // 2. AI & INTELLIGENCE (Always Visible)
  menuCategories.push({
    title: "AI & INTELLIGENCE",
    items: [
      { name: 'AI Copilot', icon: <Bot size={18} />, path: '/app/ai-copilot' },
      { name: 'Business Advisor', icon: <Zap size={18} />, path: '/app/advisor' },
      { name: 'Meeting AI', icon: <Video size={18} />, path: '/app/meetings' }
    ]
  });

  // 3. Dynamic Business Modules based on Industry
  const businessItems = [];
  const industry = config?.customIndustry || 'Software Company';

  if (industry === 'Restaurant') {
    businessItems.push({ name: 'Inventory', icon: <Box size={18} />, path: '/app/inventory' });
    businessItems.push({ name: 'Sales', icon: <TrendingUp size={18} />, path: '/app/sales' });
    businessItems.push({ name: 'Marketing', icon: <PieChart size={18} />, path: '/app/marketing' });
    businessItems.push({ name: 'Finance', icon: <Wallet size={18} />, path: '/app/finance' });
    businessItems.push({ name: 'CRM', icon: <Users size={18} />, path: '/app/crm' });
    businessItems.push({ name: 'Support', icon: <MessageSquare size={18} />, path: '/app/support' });
    businessItems.push({ name: 'Documents', icon: <FileText size={18} />, path: '/app/documents' });
  } else if (industry === 'Hospital') {
    businessItems.push({ name: 'Patients', icon: <Activity size={18} />, path: '/app/industry/patients' });
    businessItems.push({ name: 'Doctors', icon: <Users size={18} />, path: '/app/industry/doctors' });
    businessItems.push({ name: 'Appointments', icon: <Target size={18} />, path: '/app/industry/appointments' });
    businessItems.push({ name: 'Pharmacy', icon: <Database size={18} />, path: '/app/industry/billing' });
    businessItems.push({ name: 'Finance', icon: <Wallet size={18} />, path: '/app/finance' });
    businessItems.push({ name: 'HRMS', icon: <Users size={18} />, path: '/app/hrms' });
    businessItems.push({ name: 'Documents', icon: <FileText size={18} />, path: '/app/documents' });
  } else if (industry === 'Software Company') {
    businessItems.push({ name: 'Projects', icon: <Briefcase size={18} />, path: '/app/industry/development' });
    businessItems.push({ name: 'Clients', icon: <Users size={18} />, path: '/app/industry/qa' });
    businessItems.push({ name: 'CRM', icon: <Users size={18} />, path: '/app/crm' });
    businessItems.push({ name: 'Finance', icon: <Wallet size={18} />, path: '/app/finance' });
    businessItems.push({ name: 'HRMS', icon: <Users size={18} />, path: '/app/hrms' });
    businessItems.push({ name: 'Documents', icon: <FileText size={18} />, path: '/app/documents' });
  } else if (industry === 'Manufacturing') {
    businessItems.push({ name: 'Production', icon: <Workflow size={18} />, path: '/app/industry/production' });
    businessItems.push({ name: 'Inventory', icon: <Box size={18} />, path: '/app/inventory' });
    businessItems.push({ name: 'Procurement', icon: <Database size={18} />, path: '/app/erp' });
    businessItems.push({ name: 'Sales', icon: <TrendingUp size={18} />, path: '/app/sales' });
    businessItems.push({ name: 'Finance', icon: <Wallet size={18} />, path: '/app/finance' });
    businessItems.push({ name: 'HRMS', icon: <Users size={18} />, path: '/app/hrms' });
    businessItems.push({ name: 'CRM', icon: <Users size={18} />, path: '/app/crm' });
    businessItems.push({ name: 'Documents', icon: <FileText size={18} />, path: '/app/documents' });
  } else {
    // Fallback: dynamic based on checked departments checklist
    if (!config || config.departments?.includes('Inventory')) {
      businessItems.push({ name: 'Inventory', icon: <Box size={18} />, path: '/app/inventory' });
    }
    if (!config || config.departments?.includes('Sales')) {
      businessItems.push({ name: 'Sales', icon: <TrendingUp size={18} />, path: '/app/sales' });
    }
    if (!config || config.departments?.includes('Marketing')) {
      businessItems.push({ name: 'Marketing', icon: <PieChart size={18} />, path: '/app/marketing' });
    }
    if (!config || config.departments?.includes('Finance')) {
      businessItems.push({ name: 'Finance', icon: <Wallet size={18} />, path: '/app/finance' });
    }
    if (!config || config.departments?.includes('Sales') || config.departments?.includes('CRM')) {
      businessItems.push({ name: 'CRM', icon: <Users size={18} />, path: '/app/crm' });
    }
    if (!config || config.departments?.includes('HR') || config.departments?.includes('HRMS')) {
      businessItems.push({ name: 'HRMS', icon: <Users size={18} />, path: '/app/hrms' });
    }
    if (!config || config.departments?.includes('Customer Support') || config.departments?.includes('Support')) {
      businessItems.push({ name: 'Support', icon: <MessageSquare size={18} />, path: '/app/support' });
    }
    if (!config || config.departments?.includes('Documents')) {
      businessItems.push({ name: 'Documents', icon: <FileText size={18} />, path: '/app/documents' });
    }
  }

  if (businessItems.length > 0) {
    menuCategories.push({
      title: `${industry.toUpperCase()} MODULES`,
      items: businessItems
    });
  }

  // 5. SYSTEM
  menuCategories.push({
    title: "SYSTEM",
    items: [
      { name: 'Settings', icon: <Settings size={18} />, path: '/app/settings' }
    ]
  });



  // Add dummy UtensilsIcon inside components scope since Lucide icon is not imported
  function UtensilsIcon(props) {
    return <Box {...props} />;
  }

  return (
    <div className="relative h-[calc(100vh-2rem)] m-4 z-40 flex shrink-0">
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className="h-full w-full rounded-2xl bg-[#080d1a]/90 backdrop-blur-2xl border border-white/10 flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-visible"
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0 overflow-hidden">
          <Logo size={collapsed ? 28 : 28} className={collapsed ? "mx-auto" : ""} showText={!collapsed} />
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-6 flex flex-col gap-5">
          {menuCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col px-3">
              {!collapsed && (
                <span className="px-3 mb-2 text-[10px] font-bold text-[#64748b] uppercase tracking-[0.15em] select-none">
                  {category.title}
                </span>
              )}
              {collapsed && (
                <div className="w-8 mx-auto mb-2 border-b border-white/5" />
              )}
              <div className="flex flex-col gap-0.5">
                {category.items.map((item) => (
                  <NavItem key={item.name} item={item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 shrink-0 flex flex-col gap-1">
          
          <button
            onClick={() => navigate('/')}
            className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group w-full text-left text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer"
          >
            <div className="relative z-10 shrink-0 text-[#10B981] group-hover:scale-110 transition-transform">
              <Home size={18} />
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
            {collapsed && (
              <div className="absolute left-16 bg-[#0B1120] border border-[#10B981]/30 text-[#10B981] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-[0_0_20px_rgba(16,185,129,0.2)] z-[100] opacity-0 group-hover:opacity-100 transition-opacity">
                Back to Home
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#1e293b] hover:bg-[#334155] border border-white/10 flex items-center justify-center text-white cursor-pointer z-50 shadow-[0_4px_10px_rgba(0,0,0,0.4)] transition-all hover:scale-115"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
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
        relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group overflow-visible cursor-pointer
        ${isActive ? 'text-white font-semibold' : 'text-[#94A3B8] hover:text-white'}
      `}
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}
          {isActive && (
            <motion.div 
              layoutId="sidebar-active"
              className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-xl pointer-events-none"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          {/* Icon with beautiful alignment and color coding */}
          <div className={`relative z-10 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform ${isActive ? 'text-[#00D4FF]' : 'text-[#64748b] group-hover:text-white'}`}>
            {item.icon}
          </div>

          {/* Label */}
          <AnimatePresence>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium text-sm whitespace-nowrap overflow-hidden relative z-10 select-none"
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Active side indicator pill */}
          {isActive && (
            <div className="absolute left-0 w-1 h-5 bg-[#00D4FF] rounded-r-full" />
          )}

          {/* Tooltip for collapsed state */}
          {collapsed && isHovered && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-16 bg-[#090d1a] border border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-[100] pointer-events-none"
            >
              {item.name}
            </motion.div>
          )}
        </>
      )}
    </NavLink>
  );
}
