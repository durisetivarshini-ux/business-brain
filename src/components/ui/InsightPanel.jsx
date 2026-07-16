import React, { useState } from 'react';
import { Bot, Sparkles, Search, TrendingUp } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function InsightPanel({ 
  moduleName, 
  title = "AI Assistant", 
  subtitle = "Insights", 
  badgeText = "AI Active", 
  description, 
  insights = [], 
  recommendationsModal: RecommendationsModal, 
  forecastModal: ForecastModal,
  themeColor = "#10B981" 
}) {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <GlassCard 
      glowColor={themeColor} 
      className="p-8 border-white/5 bg-[#0B1120]/60 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
    >
      {/* Background Glows */}
      <div 
        className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] blur-[80px] rounded-full pointer-events-none opacity-10" 
        style={{ backgroundColor: themeColor }}
      />
      <div 
        className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[100%] blur-[80px] rounded-full pointer-events-none opacity-10" 
        style={{ backgroundColor: "#00D4FF" }}
      />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Left Side: Summary & Actions */}
        <div className="md:w-1/3 flex flex-col justify-center border-r border-white/10 pr-8">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 self-start"
            style={{ backgroundColor: `${themeColor}20`, border: `1px solid ${themeColor}30`, color: themeColor }}
          >
            <Sparkles size={14} /> {badgeText}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${themeColor}, #00D4FF)`,
                boxShadow: `0 0 20px ${themeColor}40`
              }}
            >
              <Bot size={28} className="text-[#050816]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">{title}</h2>
              <p className="text-sm font-semibold text-[#94A3B8]">{subtitle}</p>
            </div>
          </div>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            {description || `I've analyzed your current ${moduleName} operations, metrics, and activities to provide real-time strategic assistance.`}
          </p>
          <div className="flex flex-col gap-3">
            {RecommendationsModal && (
              <button 
                onClick={() => setActiveModal('recommendations')} 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-bold shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                style={{ 
                  background: `linear-gradient(135deg, ${themeColor}, #00D4FF)`,
                  boxShadow: `0 10px 20px ${themeColor}20` 
                }}
              >
                <Search size={16} /> AI Recommendations
              </button>
            )}
            {ForecastModal && (
              <button 
                onClick={() => setActiveModal('forecast')} 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors cursor-pointer"
              >
                <TrendingUp size={16} /> View Forecast
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Insights Bullet points */}
        <div className="md:w-2/3 flex flex-col justify-center">
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div 
                key={i} 
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <span className="mt-1 text-lg leading-none" style={{ color: themeColor }}>•</span>
                <p className="text-[#F8FAFC] text-base leading-relaxed">
                  {insight.highlight ? (
                    insight.text.split(insight.highlight).map((part, index, array) => (
                      <React.Fragment key={index}>
                        {part}
                        {index < array.length - 1 && (
                          <span 
                            className="font-bold text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #00D4FF)` }}
                          >
                            {insight.highlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    insight.text
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal === 'recommendations' && RecommendationsModal && (
        <RecommendationsModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'forecast' && ForecastModal && (
        <ForecastModal onClose={() => setActiveModal(null)} />
      )}
    </GlassCard>
  );
}
