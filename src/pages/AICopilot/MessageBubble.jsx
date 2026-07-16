import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, User, Copy, Check, RefreshCw, FileText,
  DollarSign, CheckCircle, Calendar, Users, FileDown, PlusCircle, TrendingUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AICharts } from './AICharts';

export function MessageBubble({ msg, isLast, isTyping, onRegenerate }) {
  const isUser = msg.role === 'user';
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract action markers: [Action: Name]
  const actionRegex = /\[Action:\s*([^\]]+)\]/gi;
  const actions = [];
  let match;
  while ((match = actionRegex.exec(msg.content)) !== null) {
    actions.push(match[1].trim());
  }

  // Clean content to remove raw action tags from output display
  const cleanContent = msg.content.replace(/\[Action:\s*([^\]]+)\]/gi, '');

  const getActionIcon = (act) => {
    const a = act.toLowerCase();
    if (a.includes('invoice')) return <DollarSign size={14} className="text-[#10B981]" />;
    if (a.includes('purchase order') || a.includes('approve')) return <CheckCircle size={14} className="text-[#10B981]" />;
    if (a.includes('meeting') || a.includes('schedule')) return <Calendar size={14} className="text-[#5B5FFF]" />;
    if (a.includes('crm') || a.includes('customer')) return <Users size={14} className="text-[#00D4FF]" />;
    if (a.includes('pdf') || a.includes('export')) return <FileDown size={14} className="text-[#EC4899]" />;
    if (a.includes('finance') || a.includes('ledger')) return <DollarSign size={14} className="text-[#10B981]" />;
    if (a.includes('analytics') || a.includes('charts')) return <TrendingUp size={14} className="text-[#00D4FF]" />;
    return <PlusCircle size={14} className="text-[#94A3B8]" />;
  };

  const handleActionClick = (act) => {
    const a = act.toLowerCase();
    if (a.includes('invoice')) {
      toast.success("Draft invoice generated. Opening Finance view...", { icon: '📄' });
      navigate('/app/finance');
    } else if (a.includes('purchase order') || a.includes('approve')) {
      toast.success("Purchase order approved successfully!", { icon: '✅' });
    } else if (a.includes('meeting') || a.includes('schedule')) {
      toast.success("Opening Meeting scheduler...", { icon: '📅' });
      navigate('/app/meetings');
    } else if (a.includes('crm') || a.includes('customer')) {
      toast.success("Navigating to CRM Pipeline...", { icon: '👥' });
      navigate('/app/crm');
    } else if (a.includes('pdf') || a.includes('export')) {
      toast.success("PDF report generated successfully. Export complete!", { icon: '📥' });
    } else if (a.includes('finance')) {
      navigate('/app/finance');
    } else if (a.includes('analytics')) {
      navigate('/app/analytics');
    } else {
      toast.success(`Action Triggered: ${act}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} w-full group`}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${isUser ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20' : 'bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] text-white border border-white/10 mt-1'}`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-[85%] rounded-3xl p-5 relative ${isUser ? 'bg-gradient-to-br from-[#5B5FFF]/20 to-[#00D4FF]/10 border border-[#5B5FFF]/30 text-white rounded-tr-sm shadow-[0_5px_30px_rgba(0,212,255,0.1)]' : 'bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 text-[#F8FAFC] rounded-tl-sm shadow-[0_5px_30px_rgba(0,0,0,0.3)]'}`}>
        
        {/* User Attachments */}
        {isUser && msg.attachments && msg.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {msg.attachments.map((file, idx) => (
              <div key={idx} className="shrink-0">
                {file.type.startsWith('image/') ? (
                  <img 
                    src={`data:${file.type};base64,${file.inlineData.data}`} 
                    alt={file.name} 
                    className="max-w-[200px] max-h-[200px] object-cover rounded-lg border border-[#00D4FF]/30"
                  />
                ) : (
                  <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-[#00D4FF]/30">
                    <FileText size={16} className="text-[#00D4FF]" />
                    <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Content Rendering */}
        {msg.type === 'chart_revenue' ? (
          <div>
            <div className="prose prose-invert prose-sm max-w-none mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanContent}</ReactMarkdown>
            </div>
            <AICharts type="revenue" />
          </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanContent}</ReactMarkdown>
          </div>
        )}

        {/* Render Interactive Action Buttons */}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
            {actions.map((act, idx) => (
              <button
                key={idx}
                onClick={() => handleActionClick(act)}
                className="functional-btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:scale-[1.02]"
              >
                {getActionIcon(act)}
                <span>{act}</span>
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons (Hover) */}
        {!isUser && !isTyping && msg.content && (
          <div className="absolute -bottom-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-white/10 text-[#94A3B8] hover:text-white hover:bg-[#1e293b] text-xs font-bold transition-colors shadow-lg"
            >
              {copied ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            {isLast && onRegenerate && (
              <button 
                onClick={onRegenerate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-white/10 text-[#94A3B8] hover:text-white hover:bg-[#1e293b] text-xs font-bold transition-colors shadow-lg"
              >
                <RefreshCw size={12} /> Regenerate
              </button>
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
}
