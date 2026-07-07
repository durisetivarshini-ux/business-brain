import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, Edit2, Download, Share2, CheckCircle2, X, Copy, Check, QrCode, Building2, Globe } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAppStore } from '../../store/useAppStore';
import { ProfileEditModal } from './ProfileEditModal';
import { toast } from 'react-hot-toast';

function IDCardModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative flex flex-col items-center gap-6 z-10"
        >
          {/* ID Card */}
          <div className="w-[380px] h-[220px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(91,95,255,0.5)] relative"
            style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a2035 50%, #0d1428 100%)' }}>
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5B5FFF] via-[#00D4FF] to-[#EC4899]" />
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] bg-[size:80px]" />
            <div className="p-6 flex gap-5 h-full items-center">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] rounded-full blur-[8px] opacity-80" />
                <div className="w-20 h-20 rounded-full border-2 border-white/20 bg-gradient-to-tr from-[#0B1120] to-[#1A2235] relative z-10 flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]">
                      {user.name?.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-xl font-bold text-white truncate">{user.name}</h2>
                  <CheckCircle2 size={16} className="text-[#00D4FF] shrink-0" />
                </div>
                <p className="text-[#00D4FF] font-bold text-sm mb-3">{user.role}</p>
                <div className="space-y-1">
                  <p className="text-xs text-[#94A3B8] flex items-center gap-1.5"><Building2 size={12}/> Business Brain Enterprise</p>
                  <p className="text-xs text-[#94A3B8] flex items-center gap-1.5"><MapPin size={12}/> {user.location}</p>
                  <p className="text-xs text-[#94A3B8] flex items-center gap-1.5"><Mail size={12}/> {user.email}</p>
                </div>
              </div>
              {/* QR placeholder */}
              <div className="shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <QrCode size={28} className="text-[#94A3B8]" />
              </div>
            </div>
            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-[#5B5FFF]/20 via-[#00D4FF]/20 to-[#EC4899]/20 border-t border-white/5 flex items-center px-6">
              <p className="text-[10px] font-mono text-[#94A3B8]">BB-ENT-{user.name.toUpperCase().replace(' ','-')}-2026</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                const el = document.createElement('a');
                el.click();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <Download size={16}/> Save PNG
            </button>
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-colors">
              <X size={16}/> Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ShareModal({ isOpen, onClose, user }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `https://businessbrain.ai/profiles/${user.name.toLowerCase().replace(' ', '-')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Share Profile</h2>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors"><X size={20}/></button>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center font-bold text-white text-xl overflow-hidden shrink-0">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user.name?.charAt(0)
                )}
              </div>
              <div>
                <p className="font-bold text-white">{user.name}</p>
                <p className="text-sm text-[#00D4FF]">{user.role}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Profile Link</p>
              <div className="flex items-center gap-2 p-3 bg-[#050816] rounded-xl border border-white/10">
                <Globe size={16} className="text-[#94A3B8] shrink-0" />
                <p className="text-sm text-white font-mono flex-1 truncate">{profileUrl}</p>
                <button
                  onClick={handleCopy}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${copied ? 'bg-[#10B981] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {copied ? <><Check size={14}/> Copied!</> : <><Copy size={14}/> Copy</>}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Share Via</p>
              <div className="grid grid-cols-3 gap-3">
                {['Email', 'LinkedIn', 'Slack'].map(platform => (
                  <button
                    key={platform}
                    onClick={() => { handleCopy(); }}
                    className="py-2 rounded-xl bg-white/5 border border-white/5 text-white text-sm font-bold hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function ProfileHeader() {
  const { user } = useAppStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIDCardOpen, setIsIDCardOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleEditCoverClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success('Cover image updated successfully!');
    }
  };

  return (
    <div className="relative mb-16">
      
      {/* 1. Massive Aurora Banner */}
      <div className="h-[250px] md:h-[300px] w-full rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-[#5B5FFF]/30 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] bg-[#00D4FF]/30 blur-[100px] animate-[pulse_8s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPGVsbGlwc2UgY3g9IjQiIGN5PSI0IiByeD0iMyIgcnk9IjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=')] mix-blend-overlay" />
        
        {/* Cover Actions */}
        <div className="absolute top-4 right-4 flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <button 
            onClick={handleEditCoverClick}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Edit2 size={14} /> Edit Cover
          </button>
        </div>
      </div>

      {/* 2. Glass Profile Identity Card */}
      <GlassCard className="mx-6 md:mx-12 mt-[-100px] relative z-10 p-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050816]/80 backdrop-blur-xl">
        
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
          {/* Circular Avatar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] rounded-full blur-[10px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#050816] bg-gradient-to-tr from-[#0B1120] to-[#1A2235] relative z-10 flex items-center justify-center overflow-hidden">
               {user.avatarUrl ? (
                 <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]">
                   {user.name?.charAt(0)}
                 </span>
               )}
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#10B981] rounded-full border-4 border-[#050816] z-20 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </div>

          {/* Identity Info */}
          <div className="text-center md:text-left flex-1 mb-2">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">{user.name}</h1>
              <CheckCircle2 className="text-[#00D4FF]" size={20} />
            </div>
            <p className="text-[#00D4FF] font-bold text-lg mb-3">{user.role}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-[#94A3B8] font-medium">
              <span className="flex items-center gap-1.5"><MapPin size={16} className="text-[#5B5FFF]" /> {user.location}</span>
              <span className="flex items-center gap-1.5"><Mail size={16} className="text-[#EC4899]" /> {user.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={16} className="text-[#10B981]" /> {user.phone}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto shrink-0 mb-2">
          <button
            onClick={() => setIsIDCardOpen(true)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold transition-all flex items-center gap-2 hover:border-[#00D4FF]/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.1)]"
          >
            <Download size={16} /> ID Card
          </button>
          <button
            onClick={() => setIsShareOpen(true)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold transition-all flex items-center gap-2 hover:border-[#5B5FFF]/30 hover:shadow-[0_0_15px_rgba(91,95,255,0.1)]"
          >
            <Share2 size={16} /> Share
          </button>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white text-sm font-bold shadow-[0_0_20px_rgba(91,95,255,0.4)] transition-transform hover:scale-[1.05] flex items-center gap-2"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>

      </GlassCard>

      <ProfileEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <IDCardModal isOpen={isIDCardOpen} onClose={() => setIsIDCardOpen(false)} user={user} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} user={user} />
    </div>
  );
}


