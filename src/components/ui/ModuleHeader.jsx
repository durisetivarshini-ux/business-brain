import React from 'react';
import { ActionDropdown } from './ActionDropdown';

export function ModuleHeader({ 
  title, 
  description, 
  primaryAction, 
  secondaryAction, 
  moduleName, 
  onExportPDF 
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2 relative z-20">
      <div>
        <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-[#94A3B8] font-medium">
          {description}
        </p>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        {/* Secondary Action (if provided) */}
        {secondaryAction && (
          <button 
            onClick={secondaryAction.onClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors cursor-pointer"
          >
            {secondaryAction.icon}
            <span>{secondaryAction.label}</span>
          </button>
        )}

        {/* Primary Action (if provided) */}
        {primaryAction && (
          <button 
            onClick={primaryAction.onClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#00D4FF] text-[#050816] text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.02] cursor-pointer"
          >
            {primaryAction.icon}
            <span>{primaryAction.label}</span>
          </button>
        )}

        {/* Consolidated Action Dropdown */}
        <ActionDropdown moduleName={moduleName || title} onExportPDF={onExportPDF} />
      </div>
    </div>
  );
}
