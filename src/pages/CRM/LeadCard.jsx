import React from 'react';
import { motion } from 'framer-motion';
import { Building2, User, Clock, ShieldAlert } from 'lucide-react';

export function LeadCard({ lead }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg hover:border-[#5B5FFF]/40 transition-all cursor-grab active:cursor-grabbing group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center border border-white/5 group-hover:border-[#00D4FF]/30 transition-colors">
            {lead.logo ? <span className="font-bold text-[#00D4FF]">{lead.logo}</span> : <Building2 size={14} className="text-[#94A3B8]" />}
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{lead.company}</h4>
            <p className="text-xs text-[#94A3B8] flex items-center gap-1">
              <User size={10} /> {lead.contact}
            </p>
          </div>
        </div>
        
        {/* Priority Badge */}
        {lead.priority === 'High' && (
          <div className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-[10px] font-bold">
            High
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="font-display font-bold text-white text-sm">{lead.value}</span>
        
        {/* AI Health Score */}
        <div className="flex items-center gap-1 bg-[#5B5FFF]/10 px-2 py-1 rounded-md border border-[#5B5FFF]/20">
          <ShieldAlert size={12} className="text-[#5B5FFF]" />
          <span className="text-[#5B5FFF] font-bold text-[10px]">{lead.aiScore}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/5 text-[#94A3B8] text-[10px]">
        <Clock size={10} />
        <span>Deadline: {lead.deadline}</span>
      </div>

    </motion.div>
  );
}
