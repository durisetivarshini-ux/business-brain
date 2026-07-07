import React, { useState } from 'react';
import { Shield, Key, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { toast } from 'react-hot-toast';

export function SecurityPanel() {
  const [sessions, setSessions] = useState([
    { id: 1, device: 'MacBook Pro 16"', location: 'San Francisco, CA • Current Session', active: true, icon: <Smartphone size={16} className="text-[#5B5FFF]" /> },
    { id: 2, device: 'iPhone 14 Pro', location: 'San Francisco, CA • 2 hours ago', active: false, icon: <Smartphone size={16} className="text-[#94A3B8]" /> }
  ]);

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'sk_live_*************************3f9a', date: 'Created 2mo ago', fullKey: 'sk_live_9x8c7v6b5n4m3a2s1d0f' }
  ]);

  const handleRevoke = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
    toast.success('Session revoked successfully.');
  };

  const handleGenerateKey = () => {
    const randomChars = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const newKey = {
      id: Date.now(),
      name: 'New API Key',
      key: `sk_live_*************************${randomChars.substring(0, 4)}`,
      fullKey: `sk_live_${randomChars}`,
      date: 'Created just now'
    };
    setApiKeys([newKey, ...apiKeys]);
    toast.success('New API key generated!');
  };

  return (
    <div className="space-y-6">
      
      {/* 2FA Card */}
      <GlassCard className="p-6 border-[#10B981]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#10B981]/10 blur-[40px] rounded-full pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center border border-[#10B981]/30 text-[#10B981] shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Two-Factor Authentication</h3>
              <p className="text-[#94A3B8] text-sm mt-1 max-w-md">Add an extra layer of security to your account. We recommend using an authenticator app.</p>
            </div>
          </div>
          <button 
            onClick={() => toast.success('2FA settings opened.')}
            className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            Configured
          </button>

        </div>
      </GlassCard>

      {/* Grid: Sessions & API Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Sessions */}
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6">Active Sessions</h3>
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="shrink-0">{session.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold truncate">{session.device}</p>
                    <p className="text-xs text-[#94A3B8] truncate">{session.location}</p>
                  </div>
                </div>
                {session.active ? (
                  <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                ) : (
                  <button 
                    onClick={() => handleRevoke(session.id)}
                    className="text-xs font-bold text-[#EF4444] hover:underline shrink-0"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>

        </GlassCard>

        {/* API Keys */}
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col min-w-0">
           <div className="flex justify-between items-center mb-6 gap-2">
             <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider truncate">Developer API Keys</h3>
             <button 
               onClick={handleGenerateKey}
               className="text-xs font-bold text-[#00D4FF] hover:underline shrink-0 whitespace-nowrap"
             >
               + Generate New
             </button>
           </div>

           <div className="space-y-4">
             {apiKeys.map(api => (
               <div key={api.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col min-w-0">
                 <div className="flex justify-between items-center mb-2 gap-2">
                   <p className="text-white text-sm font-bold flex items-center gap-2 truncate">
                     <Key size={14} className="text-[#F59E0B] shrink-0"/> <span className="truncate">{api.name}</span>
                   </p>
                   <span className="text-xs text-[#94A3B8] shrink-0 whitespace-nowrap">{api.date}</span>
                 </div>
                 <div className="flex items-center justify-between bg-[#050816] p-2 rounded border border-white/10 gap-3 overflow-hidden">
                   <code className="text-[#94A3B8] text-xs font-mono truncate">{api.key}</code>
                   <button 
                     onClick={() => { 
                       navigator.clipboard.writeText(api.fullKey); 
                       toast.success('API key copied to clipboard!'); 
                     }}
                     className="text-xs font-bold text-white hover:text-[#5B5FFF] shrink-0"
                   >
                     Copy
                   </button>
                 </div>
               </div>
             ))}
           </div>

        </GlassCard>

      </div>
    </div>
  );
}
