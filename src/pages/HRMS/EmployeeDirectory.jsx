import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Mail, MessageSquare, X, Send, Search, CheckCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

function MessageModal({ employee, onClose }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg) return;
    setSent(true);
    toast.success(`Message sent to ${employee.name}`);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white"><X size={20} /></button>
        {sent ? (
          <div className="flex flex-col items-center py-6">
            <CheckCircle size={40} className="text-[#10B981] mb-3" />
            <p className="text-white font-bold">Message Sent!</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `linear-gradient(135deg, ${employee.color}, #050816)`, color: 'white' }}>{employee.initials}</div>
              <div>
                <p className="text-sm font-bold text-white">Message {employee.name}</p>
                <p className="text-xs text-[#94A3B8]">{employee.role}</p>
              </div>
            </div>
            <textarea autoFocus rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50 resize-none" placeholder="Type a message..." value={msg} onChange={e => setMsg(e.target.value)} />
            <button type="submit" className="py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              <Send size={14} /> Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function DirectoryModal({ employees, onClose }) {
  const [search, setSearch] = useState('');
  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-3xl h-[80vh] flex flex-col rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl relative overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h2 className="text-xl font-bold text-white">Full Employee Directory</h2>
            <p className="text-xs text-[#94A3B8] mt-1">2,580 Active Employees</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#5B5FFF]/50" 
              placeholder="Search by name or role..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((emp, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm" style={{ background: `linear-gradient(135deg, ${emp.color}, #050816)`, color: 'white' }}>{emp.initials}</div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0B1120] ${emp.status === 'Online' ? 'bg-[#10B981]' : emp.status === 'In Meeting' ? 'bg-[#F59E0B]' : 'bg-[#94A3B8]'}`}></div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{emp.name}</h4>
                  <p className="text-xs text-[#94A3B8]">{emp.role} · {emp.dept}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toast.success('Email interface opened.')} className="p-2 rounded-lg bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10"><Mail size={14} /></button>
                <button onClick={() => toast.success('Chat started.')} className="p-2 rounded-lg bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10"><MessageSquare size={14} /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-[#94A3B8] text-sm py-10">No employees found matching "{search}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function EmployeeDirectory() {
  const [activeMessage, setActiveMessage] = useState(null);
  const [showDirectory, setShowDirectory] = useState(false);

  const employees = [
    { name: "Rahul Sharma", role: "Senior Developer", dept: "Engineering", score: "98%", status: "Online", initials: "RS", color: "#5B5FFF" },
    { name: "Priya Patel", role: "Product Manager", dept: "Product", score: "95%", status: "In Meeting", initials: "PP", color: "#EC4899" },
    { name: "Amit Kumar", role: "UX Designer", dept: "Design", score: "92%", status: "Offline", initials: "AK", color: "#10B981" },
    { name: "Neha Gupta", role: "HR Specialist", dept: "HR", score: "96%", status: "Online", initials: "NG", color: "#F59E0B" },
    // Some extra mock data for the directory modal
    { name: "Suresh Menon", role: "Backend Lead", dept: "Engineering", score: "94%", status: "Online", initials: "SM", color: "#7C3AED" },
    { name: "Kavya Reddy", role: "Marketing VP", dept: "Marketing", score: "91%", status: "In Meeting", initials: "KR", color: "#F43F5E" },
    { name: "Vikram Singh", role: "Sales Director", dept: "Sales", score: "97%", status: "Offline", initials: "VS", color: "#0EA5E9" },
  ];

  const topEmployees = employees.slice(0, 4);

  return (
    <>
      <GlassCard className="p-6 border-[#5B5FFF]/20 bg-[#0B1120]/60 h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B5FFF]/5 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Employee Directory</h3>
          <button onClick={() => setShowDirectory(true)} className="text-xs font-bold text-[#5B5FFF] bg-[#5B5FFF]/10 hover:bg-[#5B5FFF]/20 transition-colors px-3 py-1.5 rounded-md">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 relative z-10">
          {topEmployees.map((emp, i) => (
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
                    <h4 className="font-bold text-white text-sm group-hover:text-[#5B5FFF] transition-colors">{emp.name}</h4>
                    <p className="text-xs text-[#94A3B8]">{emp.role}</p>
                  </div>
                </div>
                <button className="text-[#94A3B8] hover:text-white transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  <button onClick={() => toast.success(`Email composed to ${emp.name}`)} className="p-1.5 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-[#5B5FFF]/20 transition-colors"><Mail size={12} /></button>
                  <button onClick={() => setActiveMessage(emp)} className="p-1.5 rounded-md bg-white/5 text-[#94A3B8] hover:text-white hover:bg-[#5B5FFF]/20 transition-colors"><MessageSquare size={12} /></button>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">AI Score</span>
                  <span className="text-xs font-bold text-[#00D4FF] bg-[#00D4FF]/10 px-1.5 py-0.5 rounded border border-[#00D4FF]/20">{emp.score}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <AnimatePresence>
        {activeMessage && <MessageModal employee={activeMessage} onClose={() => setActiveMessage(null)} />}
        {showDirectory && <DirectoryModal employees={employees} onClose={() => setShowDirectory(false)} />}
      </AnimatePresence>
    </>
  );
}
