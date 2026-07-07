import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { FunctionalButton } from '../../components/ui/FunctionalButton';
import { toast } from 'react-hot-toast';

export function ProfileEditModal({ isOpen, onClose }) {
  const { user, updateUser } = useAppStore();
  const [formData, setFormData] = useState({ 
    ...user,
    linkedin: user?.linkedin || '',
    phone: user?.phone || ''
  });
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(formData);
    toast.success('Profile updated successfully!');
    onClose();
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success('Profile image updated successfully!');
    }
  };

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
          className="relative w-full max-w-lg bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">Edit Profile</h2>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4 max-h-[60vh]">
            
            <div className="flex items-center gap-4 mb-4">
               <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center text-xl font-bold text-white">
                 {formData.name.charAt(0)}
               </div>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept="image/*" 
                 onChange={handleFileChange} 
               />
               <button 
                 onClick={handleImageUploadClick}
                 className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 flex items-center gap-2 transition-colors"
               >
                 <ImageIcon size={16} /> Upload New Image
               </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#050816] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#5B5FFF]/50" />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Role</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full bg-[#050816] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#5B5FFF]/50" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#050816] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#5B5FFF]/50" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Mobile Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full bg-[#050816] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#5B5FFF]/50" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">LinkedIn Account</label>
              <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" className="w-full bg-[#050816] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#5B5FFF]/50" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-[#050816] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#5B5FFF]/50" />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 flex items-center justify-end gap-3 bg-[#050816]/50">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-[#94A3B8] text-sm font-bold hover:text-white transition-colors">
              Cancel
            </button>
            <FunctionalButton 
              onClick={handleSave}
              successMessage="Profile updated successfully!"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white text-sm font-bold shadow-[0_0_15px_rgba(91,95,255,0.4)] hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Save size={16} /> Save Changes
            </FunctionalButton>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
