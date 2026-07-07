import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, FileSpreadsheet, FileIcon, Image as ImageIcon, MoreVertical, Star } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export function FileVault() {
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
    <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Enterprise Vault</h3>
        <button className="text-[#00D4FF] text-sm font-bold hover:underline">View All</button>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {folders.map((folder, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <Folder size={28} style={{ color: folder.color }} className="group-hover:scale-110 transition-transform" fill={`${folder.color}20`} />
              <button className="text-[#94A3B8] hover:text-white"><MoreVertical size={16}/></button>
            </div>
            <h4 className="text-white text-sm font-bold mb-1 truncate">{folder.name}</h4>
            <p className="text-[#94A3B8] text-xs">{folder.files} files</p>
          </div>
        ))}
      </div>

      {/* Recent Files List */}
      <div className="flex-1 overflow-auto custom-scrollbar pr-2">
        <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4">Recent Files</h4>
        <div className="space-y-2">
          {recentFiles.map((file, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors">{file.name}</h5>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-[#94A3B8]">{file.size}</span>
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1 before:content-['•'] before:mr-1">{file.author}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#94A3B8] hidden md:block">{file.date}</span>
                <button className="text-[#94A3B8] hover:text-[#F59E0B] transition-colors"><Star size={16} /></button>
                <button className="text-[#94A3B8] hover:text-white transition-colors"><MoreVertical size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </GlassCard>
  );
}
