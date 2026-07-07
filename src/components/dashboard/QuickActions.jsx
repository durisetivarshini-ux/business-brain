import React from 'react';
import { FileText, UserPlus, FileEdit, Rocket, Box, Bot } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Link } from 'react-router-dom';

export function QuickActions() {
  const actions = [
    { icon: <FileText size={20}/>, label: "Generate Report", color: "#5B5FFF", link: "/app/analytics" },
    { icon: <UserPlus size={20}/>, label: "Add Customer", color: "#00D4FF", link: "/app/crm" },
    { icon: <FileEdit size={20}/>, label: "Create Invoice", color: "#10B981", link: "/app/finance" },
    { icon: <Rocket size={20}/>, label: "Launch Campaign", color: "#F59E0B", link: "/app/marketing" },
    { icon: <Box size={20}/>, label: "Inventory Check", color: "#7C3AED", link: "/app/inventory" },
    { icon: <Bot size={20}/>, label: "AI Chat", color: "#EC4899", link: "/app/ai-copilot" },
  ];

  return (
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
      <h3 className="font-bold text-lg text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {actions.map((act, i) => (
          <Link 
            key={i}
            to={act.link}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${act.color}20`, color: act.color }}
            >
              {act.icon}
            </div>
            <span className="text-xs font-semibold text-white group-hover:text-[#00D4FF] transition-colors text-center">{act.label}</span>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}
