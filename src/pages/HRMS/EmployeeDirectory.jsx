import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Mail, MessageSquare } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function EmployeeDirectory() {
  const employees = [
    { name: "Rahul Sharma", role: "Senior Developer", dept: "Engineering", score: "98%", status: "Online", initials: "RS", color: "#5B5FFF" },
    { name: "Priya Patel", role: "Product Manager", dept: "Product", score: "95%", status: "In Meeting", initials: "PP", color: "#EC4899" },
    { name: "Amit Kumar", role: "UX Designer", dept: "Design", score: "92%", status: "Offline", initials: "AK", color: "#10B981" },
    { name: "Neha Gupta", role: "HR Specialist", dept: "HR", score: "96%", status: "Online", initials: "NG", color: "#F59E0B" },
  ];

  return (
    <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Employee Directory</h3>
        <span className="text-xs font-bold text-[#5B5FFF] bg-[#5B5FFF]/10 px-2 py-1 rounded-md">View All</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {employees.map((emp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg" style={{ background: `linear-gradient(135deg, ${emp.color}, #050816)`, color: 'white' }}>
                    {emp.initials}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0B1120] ${emp.status === 'Online' ? 'bg-[#10B981]' : emp.status === 'In Meeting' ? 'bg-[#F59E0B]' : 'bg-[#94A3B8]'}`}></div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{emp.name}</h4>
                  <p className="text-xs text-[#94A3B8]">{emp.role}</p>
                </div>
              </div>
              <button className="text-[#94A3B8] hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <button className="p-1.5 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"><Mail size={12} /></button>
                <button className="p-1.5 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"><MessageSquare size={12} /></button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">AI Score</span>
                <span className="text-xs font-bold text-[#00D4FF] bg-[#00D4FF]/10 px-1.5 py-0.5 rounded">{emp.score}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
