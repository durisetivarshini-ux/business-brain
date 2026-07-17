import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, FileText, TrendingUp, Share2, Box, Wallet, Users, LayoutDashboard,
  PieChart, Bookmark, Clock, Star, Sparkles, Send, X, Bot, Mic,
  ChevronRight, Trash2, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrowthRecommendations } from './GrowthRecommendations';
import { AIAnalyticsPanel } from './AIAnalyticsPanel';
import { MessageBubble } from './MessageBubble';
import { TypingAnimation } from './TypingAnimation';
import { PromptCards } from './PromptCards';
import { EmptyState } from './EmptyState';
import { FileUpload } from './FileUpload';
import { VoiceInput } from './VoiceInput';
import { toast } from 'react-hot-toast';

// ── Saved Prompt Library ──────────────────────────────────────────────
const SAVED_PROMPTS_LIBRARY = [
  { id: 'sp1', label: 'Revenue Analysis', category: 'Finance', text: 'Analyze our current revenue trends and provide key insights on Q3 performance, growth opportunities, and risk areas.' },
  { id: 'sp2', label: 'Marketing Report', category: 'Marketing', text: 'Review our current marketing performance. What campaigns are performing best? What should we optimize for Q4?' },
  { id: 'sp3', label: 'Inventory Status', category: 'Operations', text: 'Give me an inventory analysis. Which products are critically low, overstocked, and what should our reorder priorities be?' },
  { id: 'sp4', label: 'Financial Summary', category: 'Finance', text: 'Provide a financial health summary including cash flow status, outstanding receivables, and budget variance.' },
  { id: 'sp5', label: 'HR Workforce Metrics', category: 'HR', text: 'Analyze our workforce metrics: attrition risk, upcoming performance reviews, and hiring pipeline status.' },
  { id: 'sp6', label: 'CRM Pipeline', category: 'Sales', text: 'Summarize CRM pipeline: top opportunities, at-risk accounts, and recommended actions for the sales team.' },
  { id: 'sp7', label: 'Deep Business Analysis', category: 'Executive', text: 'Perform a deep analysis of all business units. Include revenue trends, operational risks, HR sentiment, and strategic recommendations for the next quarter.' },
  { id: 'sp8', label: 'Competitor Intelligence', category: 'Strategy', text: 'Summarize the competitive landscape for our industry. Who are our top competitors and what strategic advantages do we hold?' },
];

const CATEGORY_COLORS = {
  Finance: '#10B981',
  Marketing: '#EC4899',
  Operations: '#F59E0B',
  HR: '#8B5CF6',
  Sales: '#00D4FF',
  Executive: '#5B5FFF',
  Strategy: '#EF4444',
};

const SIDEBAR_PROMPTS = {
  'Revenue Analysis': 'Analyze our current revenue trends and provide key insights on Q3 performance, growth opportunities, and risk areas.',
  'Marketing': 'Review our current marketing performance. What campaigns are performing best? What should we optimize for Q4?',
  'Inventory': 'Give me an inventory analysis. Which products are critically low, overstocked, and what should our reorder priorities be?',
  'Finance': 'Provide a financial health summary including cash flow status, outstanding receivables, and budget variance.',
  'HR': 'Analyze our workforce metrics: attrition risk, upcoming performance reviews, and hiring pipeline status.',
  'CRM': 'Summarize CRM pipeline: top opportunities, at-risk accounts, and recommended actions for the sales team.',
  'Analytics': 'Generate a business intelligence report summarizing key KPIs across all departments.',
};

// ── Saved Prompts Panel ───────────────────────────────────────────────
function SavedPromptsPanel({ onUsePrompt, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full max-w-lg bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#5B5FFF]/10 to-[#7C3AED]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center">
              <Bookmark size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Saved Prompts</h2>
              <p className="text-xs text-[#94A3B8]">Click any prompt to use it instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Prompts List */}
        <div className="overflow-y-auto custom-scrollbar p-4 space-y-2 flex-1">
          {SAVED_PROMPTS_LIBRARY.map((prompt) => {
            const color = CATEGORY_COLORS[prompt.category] || '#94A3B8';
            return (
              <motion.button
                key={prompt.id}
                whileHover={{ x: 4 }}
                onClick={() => { onUsePrompt(prompt.text); onClose(); }}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-white">{prompt.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
                      {prompt.category}
                    </span>
                    <ChevronRight size={14} className="text-[#94A3B8] group-hover:text-white transition-colors" />
                  </div>
                </div>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">{prompt.text}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── History Panel ─────────────────────────────────────────────────────
function HistoryPanel({ history, onLoadSession, onDeleteSession, onPinSession, onRenameSession, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredHistory = history.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0; // maintain chronological order for the rest
  });

  const handleRenameSubmit = (e, id) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full max-w-lg bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex flex-col gap-4 bg-gradient-to-r from-[#00D4FF]/10 to-[#5B5FFF]/10 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00D4FF] to-[#5B5FFF] flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Chat History</h2>
                <p className="text-xs text-[#94A3B8]">{history.length} saved conversation{history.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-3 pr-4 text-sm text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#5B5FFF]"
            />
          </div>
        </div>

        {/* History List */}
        <div className="overflow-y-auto custom-scrollbar p-4 space-y-2 flex-1">
          {sortedHistory.length === 0 ? (
            <div className="text-center py-16">
              <Clock size={32} className="text-[#94A3B8]/50 mx-auto mb-3" />
              <p className="text-sm font-bold text-[#94A3B8]">No chats found</p>
            </div>
          ) : (
            sortedHistory.map((session) => (
              <div key={session.id} className={`p-4 rounded-xl bg-white/5 border ${session.pinned ? 'border-[#F59E0B]/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-white/5'} hover:border-white/15 transition-all group`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {editingId === session.id ? (
                      <form onSubmit={(e) => handleRenameSubmit(e, session.id)} className="flex items-center gap-2 mb-1">
                        <input 
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          autoFocus
                          className="bg-black/40 text-white text-sm font-bold px-2 py-1 rounded border border-[#5B5FFF] focus:outline-none w-full"
                        />
                        <button type="submit" className="text-[#10B981]"><Check size={14} /></button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-2">
                        {session.pinned && <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />}
                        <p className="text-sm font-bold text-white truncate">{session.title}</p>
                      </div>
                    )}
                    <p className="text-xs text-[#94A3B8] mt-0.5">{session.date} · {session.messageCount} messages</p>
                    <p className="text-xs text-[#94A3B8]/70 mt-1 line-clamp-1 italic">"{session.preview}"</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { onLoadSession(session); onClose(); }}
                      className="p-1.5 rounded-lg bg-[#5B5FFF]/20 text-[#5B5FFF] hover:bg-[#5B5FFF]/30 transition-colors"
                      title="Restore session"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      onClick={() => onPinSession(session.id)}
                      className={`p-1.5 rounded-lg ${session.pinned ? 'bg-[#F59E0B]/20 text-[#F59E0B] hover:bg-[#F59E0B]/30' : 'bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white'} transition-colors`}
                      title={session.pinned ? "Unpin" : "Pin"}
                    >
                      <Star size={13} className={session.pinned ? 'fill-[#F59E0B]' : ''} />
                    </button>
                    <button
                      onClick={() => { setEditingId(session.id); setEditTitle(session.title); }}
                      className="p-1.5 rounded-lg bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white transition-colors"
                      title="Rename"
                    >
                      <FileText size={13} />
                    </button>
                    <button
                      onClick={() => onDeleteSession(session.id)}
                      className="p-1.5 rounded-lg bg-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function cleanAIReply(text = "") {
  let cleaned = text.trim();

  // Strip possible markdown json formatting wrapper
  if (cleaned.startsWith("```json") && cleaned.endsWith("```")) {
    cleaned = cleaned.substring(7, cleaned.length - 3).trim();
  } else if (cleaned.startsWith("```") && cleaned.endsWith("```")) {
    cleaned = cleaned.substring(3, cleaned.length - 3).trim();
  }

  // If it's a complete JSON block
  if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
    try {
      const parsed = JSON.parse(cleaned);
      if (parsed && typeof parsed === 'object') {
        if (parsed.reply) return parsed.reply;
        if (parsed.message) return parsed.message;
      }
    } catch (e) {
      // Not valid JSON yet (e.g. still streaming)
    }
  }

  // Handle streaming JSON patterns dynamically (e.g. starts with {"success":true,"reply":" or {"reply":" )
  const jsonPrefixRegex = /^\{\s*"(success|reply|message)"\s*:\s*(true|"[^"]*")\s*,\s*"(reply|message)"\s*:\s*"/i;
  const match = cleaned.match(jsonPrefixRegex);
  if (match) {
    // Strip the JSON structure prefix
    cleaned = cleaned.substring(match[0].length);
    // If it ends with the JSON suffix like "}, strip it
    if (cleaned.endsWith('"}')) {
      cleaned = cleaned.slice(0, -2);
    } else if (cleaned.endsWith('"} }')) {
      cleaned = cleaned.slice(0, -4);
    } else if (cleaned.endsWith('"')) {
      cleaned = cleaned.slice(0, -1);
    }
    // Unescape common JSON characters
    cleaned = cleaned
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\t/g, '\t');
  }

  return cleaned;
}

// ── Main Copilot Page ─────────────────────────────────────────────────
export function CopilotPage() {
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatKey, setChatKey] = useState(0);
  const [showSavedPrompts, setShowSavedPrompts] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState("");
  
  // Advanced Chat State
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('ai_chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentChatId, setCurrentChatId] = useState(null);
  const abortControllerRef = useRef(null);
  const scrollRef = useRef(null);

  // Initialize a new chat on mount if needed
  useEffect(() => {
    if (!currentChatId && messages.length === 0) {
      setCurrentChatId(Date.now().toString());
    }
  }, []);

  // ... (rest of the effect hooks)
  useEffect(() => {
    localStorage.setItem('ai_chat_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      setChatHistory(prev => {
        const existingIdx = prev.findIndex(s => s.id === currentChatId);
        const firstUserMsg = messages.find(m => m.role === 'user')?.content || 'Untitled';
        const title = prev[existingIdx]?.title && prev[existingIdx].title !== 'Untitled' 
          ? prev[existingIdx].title 
          : (firstUserMsg.length > 45 ? firstUserMsg.slice(0, 45) + '…' : firstUserMsg);
          
        const session = {
          id: currentChatId,
          title,
          date: prev[existingIdx]?.date || new Date().toLocaleString(),
          messageCount: messages.length,
          preview: messages[messages.length - 1]?.content?.slice(0, 80) || '',
          messages: messages,
          pinned: prev[existingIdx]?.pinned || false
        };
        
        if (existingIdx >= 0) {
          const newHistory = [...prev];
          newHistory[existingIdx] = session;
          return newHistory;
        } else {
          return [session, ...prev];
        }
      });
    }
  }, [messages, currentChatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // ... [Skipping the rest of the functions for brevity, no changes needed to them]
  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    handleStopGenerating();
    setMessages([]);
    setInputValue('');
    setCurrentChatId(Date.now().toString());
    setChatKey(k => k + 1);
    toast.success('New chat started!', { icon: '✨' });
  };

  const handleLoadSession = (session) => {
    handleStopGenerating();
    setCurrentChatId(session.id);
    setMessages(session.messages);
    setChatKey(k => k + 1);
    toast.success(`Restored: "${session.title.slice(0, 30)}"`, { icon: '🔁' });
  };

  const handleDeleteSession = (id) => {
    setChatHistory(prev => prev.filter(s => s.id !== id));
    toast.success('Session deleted');
  };

  const handlePinSession = (id) => {
    setChatHistory(prev => prev.map(s => s.id === id ? { ...s, pinned: !s.pinned } : s));
  };

  const handleRenameSession = (id, newTitle) => {
    setChatHistory(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
    toast.success('Chat renamed');
  };

  const handleSidebarItemClick = (itemName) => {
    const prompt = SIDEBAR_PROMPTS[itemName] || `Tell me about ${itemName}`;
    handleSend(prompt);
  };

  const [attachments, setAttachments] = useState([]);

  const handleSend = async (text, providedAttachments = null) => {
    const msg = text || inputValue;
    const currentAttachments = providedAttachments || attachments;
    if (!msg.trim() && currentAttachments.length === 0) return;
    if (isTyping) return;
    
    setInputValue('');
    setAttachments([]);

    // Determine thinking label based on query keywords
    const p = msg.toLowerCase();
    if (p.includes('revenue') || p.includes('sales') || p.includes('finance') || p.includes('invoice') || p.includes('billing')) {
      setThinkingLabel("Checking Finance ledger & forecasting Q3...");
    } else if (p.includes('crm') || p.includes('customer') || p.includes('client') || p.includes('lead')) {
      setThinkingLabel("Reading CRM customer pipeline telemetry...");
    } else if (p.includes('inventory') || p.includes('stock')) {
      setThinkingLabel("Reviewing Inventory stock buffers...");
    } else if (p.includes('marketing') || p.includes('campaign') || p.includes('ads')) {
      setThinkingLabel("Auditing Marketing campaigns conversions...");
    } else if (p.includes('employee') || p.includes('hrms') || p.includes('hr') || p.includes('staff')) {
      setThinkingLabel("Synthesizing HR workforce sentiment...");
    } else if (p.includes('document') || p.includes('ocr') || p.includes('pdf')) {
      setThinkingLabel("Analyzing document layout & compliance...");
    } else if (p.includes('meeting') || p.includes('schedule') || p.includes('calendar')) {
      setThinkingLabel("Querying team availability calendar...");
    } else {
      setThinkingLabel("Synthesizing enterprise operating context...");
    }

    const newMessages = [...messages, { 
      role: 'user', 
      content: msg, 
      type: 'text',
      attachments: currentAttachments 
    }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const aiMessageId = Date.now();
      setMessages(prev => [...prev, { id: aiMessageId, role: 'assistant', type: 'markdown', content: '' }]);
      
      abortControllerRef.current = new AbortController();
      const { generateAIResponse } = await import('../../services/ai');
      const stream = await generateAIResponse(msg, messages, currentAttachments, abortControllerRef.current.signal);

      let fullContent = '';
      for await (const chunk of stream) {
        setThinkingLabel(""); // Clear thinking indicator on first chunk
        fullContent += chunk.text();
        const cleanedContent = cleanAIReply(fullContent);
        setMessages(prev => prev.map(m => 
          m.id === aiMessageId ? { ...m, content: cleanedContent } : m
        ));
      }
      setIsTyping(false);
      abortControllerRef.current = null;
    } catch (error) {
      if (error.name === 'AbortError') return; // User stopped it
      
      console.error('Gemini API Error:', error);
      let errorMsg = `**Error communicating with AI:**\n\nWe encountered an issue processing your request:\n\n\`\`\`text\n${error.message}\n\`\`\`\n\n*Please ensure that your Gemini API key is configured correctly in the backend environment.*`;
      
      setMessages(prev => {
        const withoutLast = prev.slice(0, -1);
        return [...withoutLast, {
          role: 'assistant',
          type: 'markdown',
          content: error.message || "I couldn't reach the AI service. Please try again."
        }];
      });
      setThinkingLabel("");
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const handleRegenerate = async (msgId) => {
    const msgIndex = messages.findIndex(m => m.id === msgId);
    if (msgIndex <= 0) return;
    const prevUserMsg = messages[msgIndex - 1];
    
    // Remove the current AI message and re-send the previous user message
    setMessages(prev => prev.slice(0, msgIndex - 1));
    handleSend(prevUserMsg.content, prevUserMsg.attachments);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const sections = [
    {
      title: 'Business Reports',
      items: [
        { name: 'Revenue Analysis', icon: <TrendingUp size={16}/> },
        { name: 'Marketing', icon: <Share2 size={16}/> },
        { name: 'Inventory', icon: <Box size={16}/> },
        { name: 'Finance', icon: <Wallet size={16}/> },
        { name: 'HR', icon: <Users size={16}/> },
        { name: 'CRM', icon: <LayoutDashboard size={16}/> },
        { name: 'Analytics', icon: <PieChart size={16}/> },
      ]
    },
    {
      title: 'AI Memory',
      items: [
        { name: 'Saved Prompts', icon: <Bookmark size={16}/>, action: () => setShowSavedPrompts(true) },
        { name: 'History', icon: <Clock size={16}/>, action: () => setShowHistory(true) },
        { name: 'Favorites', icon: <Star size={16}/>, action: () => setShowSavedPrompts(true) },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 relative z-10 max-w-[1600px] mx-auto">

      {/* Tab Toggle */}
      <div className="flex items-center gap-2 self-start bg-white/5 border border-white/10 rounded-xl p-1">
        <button
          onClick={() => setTab('chat')}
          className={`functional-btn px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'chat' ? 'bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)]' : 'text-[#94A3B8] hover:text-white'}`}
        >
          AI Chat
        </button>
        <button
          onClick={() => setTab('recommendations')}
          className={`functional-btn px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'recommendations' ? 'bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)]' : 'text-[#94A3B8] hover:text-white'}`}
        >
          AI Growth Recommendations
        </button>
      </div>

      {tab === 'chat' ? (
        <div className="flex gap-6 h-[calc(100vh-14rem)]">
          
          {/* Left Sidebar */}
          <div className="w-64 hidden xl:flex flex-col gap-4 shrink-0">
            
            <button
              onClick={handleNewChat}
              className="functional-btn w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white font-bold shadow-[0_0_20px_rgba(91,95,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(91,95,255,0.5)]"
            >
              <Plus size={18} /> New Chat
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
              {sections.map((section, i) => (
                <div key={i}>
                  <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3 pl-2 flex items-center gap-2">
                    {section.title === 'Business Reports' ? <FileText size={14}/> : null}
                    {section.title === 'AI Memory' ? <Bookmark size={14}/> : null}
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.items.map((item, j) => (
                      <button
                        key={j}
                        onClick={() => item.action ? item.action() : handleSidebarItemClick(item.name)}
                        className="functional-btn w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#F8FAFC] hover:bg-white/10 transition-all text-left group border border-transparent hover:border-white/5"
                      >
                        <div className="text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <span className="truncate flex-1 font-medium">{item.name}</span>
                        {item.name === 'History' && chatHistory.length > 0 && (
                          <span className="text-[10px] font-bold bg-[#5B5FFF]/30 text-[#5B5FFF] px-1.5 py-0.5 rounded-full shrink-0">
                            {chatHistory.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat */}
          <div className="flex-1 flex flex-col relative bg-[#0B1120]/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Business Brain Copilot</p>
                  <p className="text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse inline-block" /> Powered by Gemini
                  </p>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={handleNewChat}
                  className="functional-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 text-xs font-bold transition-colors"
                >
                  <X size={12} /> Clear
                </button>
              )}
            </div>

            {/* Messages */}
            <div key={chatKey} ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col scroll-smooth pb-4">
              {messages.length === 0 ? (
                <>
                  <EmptyState />
                  <PromptCards onSelect={handleSend} />
                </>
              ) : (
                <div className="space-y-8 w-full max-w-4xl mx-auto px-6 pt-6">
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <MessageBubble 
                        key={msg.id || i} 
                        msg={msg} 
                        isLast={i === messages.length - 1} 
                        isTyping={isTyping}
                        onRegenerate={() => handleRegenerate(msg.id)} 
                      />
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <div className="flex flex-col gap-2 items-start">
                      {thinkingLabel && (
                        <div className="flex items-center gap-3 text-xs font-bold text-[#94A3B8] px-4 py-2.5 bg-white/5 rounded-xl border border-white/5 self-start max-w-xs animate-pulse">
                          <Sparkles size={14} className="text-[#5B5FFF] animate-spin" />
                          <span>{thinkingLabel}</span>
                        </div>
                      )}
                      <TypingAnimation />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 pt-0 z-10 shrink-0 w-full max-w-4xl mx-auto">
              <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:border-[#5B5FFF]/50 focus-within:ring-1 focus-within:ring-[#5B5FFF]/30 transition-all flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5B5FFF]/0 via-[#00D4FF]/10 to-[#7C3AED]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Attachment Previews */}
                {attachments.length > 0 && (
                  <div className="flex gap-2 px-3 pt-2 pb-1 overflow-x-auto custom-scrollbar relative z-10">
                    {attachments.map((file, idx) => (
                      <div key={idx} className="relative group shrink-0">
                        {file.type.startsWith('image/') ? (
                          <img 
                            src={`data:${file.type};base64,${file.inlineData.data}`} 
                            alt={file.name} 
                            className="w-12 h-12 object-cover rounded-lg border border-white/20"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg border border-white/20 bg-[#1e293b] flex items-center justify-center flex-col">
                            <FileText size={16} className="text-[#00D4FF]" />
                            <span className="text-[8px] mt-1 text-[#94A3B8] truncate w-10 text-center">{file.name.split('.').pop().toUpperCase()}</span>
                          </div>
                        )}
                        <button 
                          onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <textarea
                  rows="2"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Copilot to analyze data, generate reports, or automate tasks..."
                  className="w-full bg-transparent text-white placeholder:text-[#94A3B8] text-sm resize-none p-3 focus:outline-none custom-scrollbar relative z-10"
                />
                <div className="flex items-center justify-between px-2 pb-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <FileUpload onFileSelected={(file) => setAttachments(prev => [...prev, file])} />
                    <VoiceInput onTranscript={(t) => setInputValue(prev => prev ? prev + ' ' + t : t)} />
                    <button
                      className="functional-btn hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5B5FFF]/10 text-[#5B5FFF] hover:bg-[#5B5FFF]/20 border border-[#5B5FFF]/20 transition-colors text-xs font-bold"
                      onClick={() => {
                        setInputValue('Perform a deep analysis of all business units. Include revenue trends, operational risks, HR sentiment, and strategic recommendations for the next quarter.');
                      }}
                    >
                      <Sparkles size={12} /> Deep Analysis
                    </button>
                  </div>
                  
                  {isTyping ? (
                    <button
                      onClick={handleStopGenerating}
                      className="functional-btn p-2 rounded-xl flex items-center justify-center transition-all bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 border border-rose-500/30"
                      title="Stop generating"
                    >
                      <div className="w-3 h-3 bg-rose-400 rounded-sm" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSend()}
                      disabled={(!inputValue.trim() && attachments.length === 0)}
                      className={`functional-btn p-2 rounded-xl flex items-center justify-center transition-all ${(!inputValue.trim() && attachments.length === 0) ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)] hover:scale-105'}`}
                    >
                      <Send size={18} />
                    </button>
                  )}
                </div>
              </div>
              <div className="text-center mt-2 text-[10px] text-[#94A3B8] font-medium tracking-wide">
                Business Copilot uses advanced AI models. Verify critical financial data before finalizing reports.
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <AIAnalyticsPanel />
        </div>
      ) : (
        <GrowthRecommendations />
      )}

      {/* Modals */}
      <AnimatePresence>
        {showSavedPrompts && (
          <SavedPromptsPanel
            onUsePrompt={(text) => { setInputValue(text); toast.success('Prompt loaded!', { icon: '📌' }); }}
            onClose={() => setShowSavedPrompts(false)}
          />
        )}
        {showHistory && (
          <HistoryPanel
            history={chatHistory}
            onLoadSession={handleLoadSession}
            onDeleteSession={handleDeleteSession}
            onPinSession={handlePinSession}
            onRenameSession={handleRenameSession}
            onClose={() => setShowHistory(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
