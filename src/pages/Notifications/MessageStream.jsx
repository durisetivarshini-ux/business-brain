import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Paperclip, MoreVertical } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { toast } from 'react-hot-toast';

export function MessageStream() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah Jenkins", role: "COO", time: "10:42 AM", avatar: "SJ", content: "The new CRM deployment was a huge success. Sales velocity increased by 14% this week. I've attached the full breakdown.", unread: true, hasAttachment: true },
    { id: 2, sender: "David Chen", role: "Finance", time: "Yesterday", avatar: "DC", content: "Can you review the Q4 budget proposal? We need to allocate more resources to the new marketing campaigns.", unread: false, hasAttachment: true },
    { id: 3, sender: "System Bot", role: "Automation", time: "Yesterday", avatar: "SB", content: "Workflow 'Lead to Invoice' successfully processed 142 clients.", unread: false, hasAttachment: false },
    { id: 4, sender: "Elena Rodriguez", role: "HR", time: "Monday", avatar: "ER", content: "Welcome packets for the new engineering hires have been dispatched.", unread: false, hasAttachment: false },
  ]);

  const handleMarkAllRead = () => {
    setMessages(messages.map(m => ({ ...m, unread: false })));
    toast.success("All messages marked as read");
  };

  const handleCompose = () => {
    toast("Compose modal opened.", { icon: "✍️" });
  };

  const handleReadMessage = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, unread: false } : m));
    toast.success("Message opened");
  };

  const handleDownloadAttachment = (e) => {
    e.stopPropagation();
    toast.success("Downloading attachment...", { icon: "📥" });
  };

  const handleMoreOptions = (e) => {
    e.stopPropagation();
    toast("Message options opened.", { icon: "⚙️" });
  };

  return (
    <GlassCard className="border-white/5 bg-[#0B1120]/60 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Enterprise Inbox</h3>
        <div className="flex items-center gap-3">
          <button onClick={handleMarkAllRead} className="text-xs text-[#94A3B8] hover:text-white font-semibold">Mark all read</button>
          <button onClick={handleCompose} className="px-3 py-1.5 rounded-lg bg-[#5B5FFF] hover:bg-[#4F54E6] text-white text-xs font-bold transition-colors">Compose</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={msg.id} 
            onClick={() => handleReadMessage(msg.id)}
            className={`p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${msg.unread ? 'bg-[#5B5FFF]/5 relative' : ''}`}
          >
            {msg.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5B5FFF]" />}
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0B1120] to-[#1A2235] border border-white/10 flex items-center justify-center font-bold text-white shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm ${msg.unread ? 'font-bold text-white' : 'font-semibold text-[#94A3B8]'}`}>{msg.sender}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-[#94A3B8]">{msg.role}</span>
                  </div>
                  <span className="text-xs text-[#94A3B8]">{msg.time}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-3 ${msg.unread ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'}`}>
                  {msg.content}
                </p>
                {msg.hasAttachment && (
                  <div 
                    onClick={handleDownloadAttachment}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-[#050816] text-[#00D4FF] text-xs font-semibold hover:border-[#00D4FF]/50 transition-colors"
                  >
                    <Paperclip size={12} /> Attachment.pdf
                  </div>
                )}
              </div>
              <button 
                onClick={handleMoreOptions}
                className="text-[#94A3B8] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
