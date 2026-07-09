import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, FileSpreadsheet, FileIcon, Image as ImageIcon, MoreVertical, Star, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

export function FileVault() {
  const [starred, setStarred] = useState({});

  const toggleStar = (index) => {
    setStarred(prev => {
      const newState = !prev[index];
      if (newState) toast.success('File added to starred items.');
      return { ...prev, [index]: newState };
    });
  };

  const handleOptions = (name) => toast.success(`Options menu for ${name}`);
  const handleOpenFolder = (name) => toast.success(`Opened folder: ${name}`);
  const handleOpenFile = (name) => toast.success(`Opened file: ${name}`);

  const folders = [
    { name: "Finance & Legal", files: 1240, color: "#10B981" },
    { name: "HR & Onboarding", files: 856, color: "#EC4899" },
    { name: "Sales Contracts", files: 2150, color: "#00D4FF" },
    { name: "Marketing Assets", files: 4320, color: "#7C3AED" },
  ];

  const recentFiles = [
    { name: "Q3_Financial_Audit.pdf", type: "pdf", size: "2.4 MB", date: "2 hrs ago", author: "Sarah Jenkins" },
    { name: "Vendor_Agreement_Microsoft.docx", type: "word", size: "1.1 MB", date: "5 hrs ago", author: "Legal Team" },
    { name: "Employee_Handbook_2026.pdf", type: "pdf", size: "4.8 MB", date: "Yesterday", author: "HR Dept" },
    { name: "Q4_Revenue_Forecast.xlsx", type: "excel", size: "845 KB", date: "Yesterday", author: "Finance AI" },
    { name: "Campaign_Hero_Banner.png", type: "image", size: "3.2 MB", date: "2 days ago", author: "Design" },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText size={20} className="text-[#EC4899]" />;
      case 'word': return <FileIcon size={20} className="text-[#5B5FFF]" />;
      case 'excel': return <FileSpreadsheet size={20} className="text-[#10B981]" />;
      case 'image': return <ImageIcon size={20} className="text-[#00D4FF]" />;
      default: return <FileIcon size={20} className="text-[#94A3B8]" />;
    }
  };

  return (
    <GlassCard className="p-6 border-white/5 bg-gradient-to-b from-[#0B1120]/80 to-[#050816]/90 h-full flex flex-col relative overflow-hidden shadow-2xl">
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#00D4FF]/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
          Enterprise Vault
        </h3>
        <button onClick={() => toast.success('View all files opened.')} className="text-[#00D4FF] text-xs font-bold bg-[#00D4FF]/10 px-3 py-1.5 rounded-lg hover:bg-[#00D4FF]/20 transition-colors flex items-center gap-1">
          View All <ArrowRight size={14} />
        </button>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
        {folders.map((folder, i) => (
          <div onClick={() => handleOpenFolder(folder.name)} key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 blur-2xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: folder.color }} />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 rounded-xl" style={{ backgroundColor: `${folder.color}15` }}>
                <Folder size={24} style={{ color: folder.color }} className="group-hover:scale-110 transition-transform" fill={`${folder.color}30`} />
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleOptions(folder.name); }} className="text-[#94A3B8] hover:text-white p-1 bg-white/0 hover:bg-white/10 rounded-md transition-colors"><MoreVertical size={16}/></button>
            </div>
            <h4 className="text-white text-sm font-bold mb-1 truncate relative z-10 group-hover:text-white transition-colors">{folder.name}</h4>
            <p className="text-[#94A3B8] text-xs relative z-10 font-medium">{folder.files} files</p>
          </div>
        ))}
      </div>

      {/* Recent Files List */}
      <div className="flex-1 overflow-auto custom-scrollbar pr-2 relative z-10">
        <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Recent Files</h4>
        <div className="space-y-2">
          {recentFiles.map((file, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              onClick={() => handleOpenFile(file.name)}
              className="flex items-center justify-between p-3 rounded-xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 shadow-inner border border-white/5 group-hover:bg-white/10 transition-colors">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors">{file.name}</h5>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-[#94A3B8] bg-white/5 px-1.5 py-0.5 rounded">{file.size}</span>
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1 before:content-['•'] before:mr-1">{file.author}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-[#94A3B8] hidden md:block">{file.date}</span>
                <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); toggleStar(i); }} className={`p-2 rounded-md hover:bg-white/10 transition-colors ${starred[i] ? 'text-[#F59E0B]' : 'text-[#94A3B8] hover:text-[#F59E0B]'}`}>
                    <Star size={16} fill={starred[i] ? '#F59E0B' : 'transparent'} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleOptions(file.name); }} className="p-2 rounded-md bg-transparent hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
