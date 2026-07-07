import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatWindow } from './ChatWindow';
import { AIAnalyticsPanel } from './AIAnalyticsPanel';
import { GrowthRecommendations } from './GrowthRecommendations';

export function CopilotPage() {
  const [tab, setTab] = useState('chat');

  return (
    <div className="flex flex-col gap-6 relative z-10 max-w-[1600px] mx-auto">

      {/* Tab Toggle */}
      <div className="flex items-center gap-2 self-start bg-white/5 border border-white/10 rounded-xl p-1">
        <button
          onClick={() => setTab('chat')}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'chat' ? 'bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)]' : 'text-[#94A3B8] hover:text-white'}`}
        >
          AI Chat
        </button>
        <button
          onClick={() => setTab('recommendations')}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'recommendations' ? 'bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white shadow-[0_0_15px_rgba(91,95,255,0.4)]' : 'text-[#94A3B8] hover:text-white'}`}
        >
          AI Growth Recommendations
        </button>
      </div>

      {tab === 'chat' ? (
        <div className="flex gap-6 h-[calc(100vh-14rem)]">
          {/* Left Sidebar: Navigation & History */}
          <Sidebar />
          
          {/* Center: Main Chat Interface */}
          <div className="flex-1 flex flex-col relative bg-[#0B1120]/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <ChatWindow />
          </div>

          {/* Right Sidebar: AI Analytics Panel */}
          <AIAnalyticsPanel />
        </div>
      ) : (
        <GrowthRecommendations />
      )}
    </div>
  );
}
