import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, MoreVertical, Loader2, Edit, Key, Ban, Trash2 } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function UserManagement() {
  const [users, setUsers] = useState([

    { id: 1, name: "Alex Jenkins", role: "Super Admin", dept: "Executive", email: "alex.j@businessbrain.ai", status: "Active" },
    { id: 2, name: "Sarah Connor", role: "Admin", dept: "Operations", email: "sarah.c@businessbrain.ai", status: "Active" },
    { id: 3, name: "David Chen", role: "Manager", dept: "Finance", email: "david.c@businessbrain.ai", status: "Active" },
    { id: 4, name: "Elena Rodriguez", role: "User", dept: "Marketing", email: "elena.r@businessbrain.ai", status: "Inactive" },
    { id: 5, name: "Michael Scott", role: "Manager", dept: "Sales", email: "michael.s@businessbrain.ai", status: "Active" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [openActionId, setOpenActionId] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.action-dropdown-container')) {
        setOpenActionId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = useMemo(() => {

    if (!searchQuery) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) || 
      u.dept.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const handleInvite = () => {
    setIsInviting(true);
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: "New Invited User",
        role: "User",
        dept: "Onboarding",
        email: `invited_${Math.floor(Math.random() * 1000)}@businessbrain.ai`,
        status: "Pending"
      };
      setUsers([newUser, ...users]);
      setIsInviting(false);
      toast.success('Invitation sent! User added to list.');
    }, 1000);
  };


  return (
    <GlassCard className="border-white/5 bg-[#0B1120]/60 overflow-hidden flex flex-col h-[500px]">
      
      {/* Table Header Controls */}
      <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.02]">
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050816] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#5B5FFF]"
          />

        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => toast('Advanced filtering coming soon.', { icon: '🔍' })}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Filter size={14} /> Filter
          </button>
          <button 
            onClick={handleInvite}
            disabled={isInviting}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold transition-transform hover:scale-[1.02] shadow-[0_0_15px_rgba(91,95,255,0.3)] flex items-center gap-2 disabled:opacity-50"
          >
            {isInviting ? <Loader2 size={16} className="animate-spin" /> : <span>+</span>}
            Invite User
          </button>

        </div>

      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs font-bold text-[#94A3B8] uppercase tracking-wider bg-white/[0.01]">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Department</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-[#94A3B8]">
                  No users found matching "{searchQuery}"
                </td>
              </tr>
            ) : filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center font-bold text-white text-xs">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-[#94A3B8]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${user.role === 'Super Admin' ? 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/30' : 'bg-white/5 text-white/80 border-white/10'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-sm text-[#94A3B8]">{user.dept}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#10B981]' : user.status === 'Pending' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`} />
                    <span className="text-xs text-white/80">{user.status}</span>
                  </div>
                </td>

                <td className="p-4 text-right">
                  <div className="relative inline-block text-left action-dropdown-container">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === user.id ? null : user.id); }}
                      className={`p-2 rounded-lg transition-colors ${openActionId === user.id ? 'bg-white/10 text-white' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'}`}
                    >
                      <MoreVertical size={16} />
                    </button>

                    <AnimatePresence>
                      {openActionId === user.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.1 }}
                          className="absolute right-0 mt-2 w-48 bg-[#0B1120] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50 origin-top-right"
                        >
                          <div className="py-1">
                            <button onClick={() => { toast('Edit role opened'); setOpenActionId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                              <Edit size={14} /> Edit Role
                            </button>
                            <button onClick={() => { toast('Password reset link sent'); setOpenActionId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
                              <Key size={14} /> Reset Password
                            </button>
                            <button onClick={() => { toast.success(`User ${user.status === 'Active' ? 'Deactivated' : 'Activated'}`); setOpenActionId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-colors">
                              <Ban size={14} /> {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button onClick={() => { setUsers(users.filter(u => u.id !== user.id)); toast.success('User deleted'); setOpenActionId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                              <Trash2 size={14} /> Delete User
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
