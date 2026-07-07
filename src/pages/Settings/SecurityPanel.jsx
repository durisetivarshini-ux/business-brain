import React from 'react';
import { Shield, Key, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function SecurityPanel() {
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
          <button className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
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
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Smartphone size={16} className="text-[#5B5FFF]" />
                <div>
                  <p className="text-white text-sm font-bold">MacBook Pro 16"</p>
                  <p className="text-xs text-[#94A3B8]">San Francisco, CA • Current Session</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Smartphone size={16} className="text-[#94A3B8]" />
                <div>
                  <p className="text-white text-sm font-bold">iPhone 14 Pro</p>
                  <p className="text-xs text-[#94A3B8]">San Francisco, CA • 2 hours ago</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#EF4444] hover:underline">Revoke</button>
            </div>
          </div>
        </GlassCard>

        {/* API Keys */}
        <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Developer API Keys</h3>
             <button className="text-xs font-bold text-[#00D4FF] hover:underline">+ Generate New</button>
           </div>
           <div className="space-y-4">
             <div className="p-3 rounded-lg bg-white/5 border border-white/5">
               <div className="flex justify-between items-center mb-2">
                 <p className="text-white text-sm font-bold flex items-center gap-2"><Key size={14} className="text-[#F59E0B]"/> Production API</p>
                 <span className="text-xs text-[#94A3B8]">Created 2mo ago</span>
               </div>
               <div className="flex items-center justify-between bg-[#050816] p-2 rounded border border-white/10">
                 <code className="text-[#94A3B8] text-xs font-mono">sk_live_*************************3f9a</code>
                 <button className="text-xs font-bold text-white hover:text-[#5B5FFF]">Copy</button>
               </div>
             </div>
           </div>
        </GlassCard>

      </div>
    </div>
  );
}
