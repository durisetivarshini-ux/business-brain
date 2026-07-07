import React, { useState, useRef, useEffect } from 'react';
import { Plus, FileText, TrendingUp, Share2, Box, Wallet, Users, LayoutDashboard, PieChart, Bookmark, Clock, Star, Sparkles, Send, X, Bot } from 'lucide-react';
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

const SIDEBAR_PROMPTS = {
  'Revenue Analysis': 'Analyze our current revenue trends and provide key insights on Q3 performance, growth opportunities, and risk areas.',
  'Marketing': 'Review our current marketing performance. What campaigns are performing best? What should we optimize for Q4?',
  'Inventory': 'Give me an inventory analysis. Which products are critically low, overstocked, and what should our reorder priorities be?',
  'Finance': 'Provide a financial health summary including cash flow status, outstanding receivables, and budget variance.',
  'HR': 'Analyze our workforce metrics: attrition risk, upcoming performance reviews, and hiring pipeline status.',
  'CRM': 'Summarize CRM pipeline: top opportunities, at-risk accounts, and recommended actions for the sales team.',
  'Analytics': 'Generate a business intelligence report summarizing key KPIs across all departments.',
  'Saved Prompts': 'Show me a list of high-value prompts for enterprise analysis and business decision-making.',
  'History': 'What were the key topics and decisions from our recent AI Copilot conversations?',
  'Favorites': 'Show me the most useful recurring business analysis templates.',
};

export function CopilotPage() {
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatKey, setChatKey] = useState(0); // increment to reset chat
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    setChatKey(k => k + 1);
    toast.success('New chat started!', { icon: '✨' });
  };

  const handleSidebarItemClick = (itemName) => {
    const prompt = SIDEBAR_PROMPTS[itemName] || `Tell me about ${itemName}`;
    handleSend(prompt);
  };

  const handleSend = async (text) => {
    const msg = text || inputValue;
    if (!msg.trim() || isTyping) return;
    setInputValue('');

    const newMessages = [...messages, { role: 'user', content: msg, type: 'text' }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey || apiKey === 'your-api-key-here') {
        // Fallback Mock Logic
        setTimeout(() => {
          const lowerText = msg.toLowerCase();
          let aiResponse = { role: 'assistant', type: 'markdown', content: '' };
          if (lowerText.includes('revenue') || lowerText.includes('sales')) {
            aiResponse.type = 'chart_revenue';
            aiResponse.content = `### Revenue Analysis\n\nQ3 revenue came in at **$12.4M**, which is **+14% YoY**. The primary growth driver was the Enterprise segment (+22%). Marketing automation campaigns contributed $1.8M in pipeline.\n\n**Recommendations:**\n- Expand Enterprise outreach in APAC\n- Double down on top-performing channels\n- Schedule upsell campaigns for existing accounts`;
          } else if (lowerText.includes('inventory') || lowerText.includes('stock')) {
            aiResponse.content = `### Inventory Status\n\n⚠️ **Critical Alerts:**\n* **Product A:** 500 units remaining — *reorder immediately*\n* **Product B:** 12,000 units — *overstocked*\n\n**Recommendation:** Generate a PO for Product A and pause Product B procurement for 60 days.`;
          } else if (lowerText.includes('hr') || lowerText.includes('employee') || lowerText.includes('workforce')) {
            aiResponse.content = `### HR Insights\n\n**Attrition Risk:** 3 high performers in Engineering flagged (30% sentiment drop)\n\n**Action Items:**\n1. Schedule townhall for Engineering team\n2. Review compensation benchmarks vs. market\n3. Initiate retention offers for top 3 flagged employees`;
          } else if (lowerText.includes('marketing')) {
            aiResponse.content = `### Marketing Performance\n\n**Top Campaigns:**\n| Campaign | ROI | Leads |\n|---|---|---|\n| Alpha Series | 340% | 1,240 |\n| Webinar Q3 | 210% | 890 |\n\n**Q4 Recommendation:** Double budget on Alpha Series and launch a targeted ABM campaign for Enterprise prospects.`;
          } else if (lowerText.includes('finance') || lowerText.includes('cash')) {
            aiResponse.content = `### Financial Summary\n\n- **Cash Position:** $8.2M (healthy)\n- **AR Outstanding:** $1.4M (avg 34 days)\n- **Budget Variance:** -3% (within tolerance)\n\n**Alert:** 2 invoices overdue by 60+ days — initiate collections process.`;
          } else {
            aiResponse.content = `I've analyzed the data across all business units.\n\n**Summary:**\n- Revenue is healthy, tracking **+14% YoY**\n- Marketing ROI improved by **+4%** this month\n- No critical operational risks detected\n\n**Next Steps:** Would you like me to generate a specific forecast, executive report, or drill into a particular department?\n\n> *Tip: Add your Gemini API key (\`VITE_GEMINI_API_KEY\`) to enable real AI responses.*`;
          }
          setMessages([...newMessages, aiResponse]);
          setIsTyping(false);
        }, 1800);
        return;
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        systemInstruction: 'You are Business Brain Copilot, an advanced AI assistant for enterprise management. Analyze CRM, Finance, HR, Operations data. Format in Markdown with headers, bullet points, and tables. Be concise and data-driven.'
      });

      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(msg);
      const response = await result.response;
      setMessages([...newMessages, { role: 'assistant', type: 'markdown', content: response.text() }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages([...newMessages, {
        role: 'assistant',
        type: 'markdown',
        content: `**Error communicating with AI:** \`${error.message}\`\n\nPlease check your API key configuration.`
      }]);
      setIsTyping(false);
    }
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
        { name: 'Saved Prompts', icon: <Bookmark size={16}/> },
        { name: 'History', icon: <Clock size={16}/> },
        { name: 'Favorites', icon: <Star size={16}/> },
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
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.items.map((item, j) => (
                      <button
                        key={j}
                        onClick={() => handleSidebarItemClick(item.name)}
                        className="functional-btn w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#F8FAFC] hover:bg-white/10 transition-all text-left group border border-transparent hover:border-white/5"
                      >
                        <div className="text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <span className="truncate flex-1 font-medium">{item.name}</span>
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
                      <MessageBubble key={i} msg={msg} isLast={i === messages.length - 1} isTyping={isTyping} />
                    ))}
                  </AnimatePresence>
                  {isTyping && <TypingAnimation />}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 pt-0 z-10 shrink-0 w-full max-w-4xl mx-auto">
              <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:border-[#5B5FFF]/50 focus-within:ring-1 focus-within:ring-[#5B5FFF]/30 transition-all flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5B5FFF]/0 via-[#00D4FF]/10 to-[#7C3AED]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
                    <FileUpload />
                    <VoiceInput />
                    <button className="functional-btn hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5B5FFF]/10 text-[#5B5FFF] hover:bg-[#5B5FFF]/20 border border-[#5B5FFF]/20 transition-colors text-xs font-bold"
                      onClick={() => {
                        setInputValue('Perform a deep analysis of all business units. Include revenue trends, operational risks, HR sentiment, and strategic recommendations for the next quarter.');
                      }}
                    >
                      <Sparkles size={12} /> Deep Analysis
                    </button>
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isTyping}
                    className={`functional-btn p-2 rounded-xl flex items-center justify-center transition-all ${!inputValue.trim() || isTyping ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)] hover:scale-105'}`}
                  >
                    <Send size={18} />
                  </button>
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
    </div>
  );
}
