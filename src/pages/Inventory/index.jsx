import React from 'react';
import { InventoryDashboard } from './InventoryDashboard';
import { SupplyChainMap } from './SupplyChainMap';

export function InventoryPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Smart Inventory</h1>
          <p className="text-[#94A3B8] font-medium">Real-time command center for warehouse monitoring and stock logistics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            Scan Barcode
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-transform hover:scale-[1.02]">
            + Add Product
          </button>
        </div>
      </div>

      {/* Main Inventory Dashboard Layout */}
      <InventoryDashboard />

      {/* AI Premium Modules */}
      <SupplyChainMap />

    </div>
  );
}
