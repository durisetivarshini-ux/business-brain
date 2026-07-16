import React from 'react';
import { motion } from 'framer-motion';

export function SubPageTabs({ tabs = [], activeTab, setActiveTab }) {
  if (tabs.length === 0) return null;

  return (
    <div className="flex border-b border-white/5 mb-6 relative z-10 w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const id = typeof tab === 'string' ? tab : tab.id;
          const label = typeof tab === 'string' ? tab : tab.label;
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-t-lg shrink-0 cursor-pointer ${
                isActive ? 'text-[#00D4FF]' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {label}
              {isActive && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
