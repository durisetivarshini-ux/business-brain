import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, CheckCircle, Package, Hash, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { mockDb } from '@/utils/mockDb';
import toast from 'react-hot-toast';

export function BarcodeWidget() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [input, setInput] = useState('');
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    setProductsList(mockDb.getProducts());
    
    // Listen to local storage updates to sync list
    const syncInventory = () => {
      setProductsList(mockDb.getProducts());
    };
    window.addEventListener('storage', syncInventory);
    return () => window.removeEventListener('storage', syncInventory);
  }, []);

  const triggerScan = () => {
    setScanning(true);
    setResult(null);
    toast.loading('Activating scan module...', { id: 'scan-toast' });
    
    setTimeout(() => {
      const products = mockDb.getProducts();
      if (products.length === 0) {
        toast.error('No products in inventory to scan', { id: 'scan-toast' });
        setScanning(false);
        return;
      }
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      mockDb.addScanHistory(randomProduct.sku, randomProduct.name);
      setResult(randomProduct);
      setScanning(false);
      
      toast.success(`Scanned SKU: ${randomProduct.sku}`, { id: 'scan-toast', icon: '🎯' });
    }, 1800);
  };

  const handleManualLookup = () => {
    const key = input.trim().toUpperCase();
    if (!key) return;

    const products = mockDb.getProducts();
    const found = products.find(p => p.sku.toUpperCase() === key || p.barcode === key);
    
    if (found) {
      mockDb.addScanHistory(found.sku, found.name);
      setResult(found);
      toast.success('Product found in stock registry!');
    } else {
      toast.error('SKU or Barcode not found');
    }
    setInput('');
  };

  return (
    <GlassCard className="p-6 border-[#00D4FF]/20 bg-[#0B1120]/60 h-full flex flex-col justify-between gap-5 relative overflow-hidden rounded-2xl shadow-xl">
      
      {/* Glow highlight */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#00D4FF]/5 blur-[40px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <div>
          <h3 className="font-bold text-white text-sm mb-0.5 flex items-center gap-2">
            <ScanLine size={16} className="text-[#00D4FF]" /> Smart Scanner
          </h3>
          <p className="text-[11px] text-[#94A3B8]">Awaiting telemetry link</p>
        </div>
        {result && (
          <button 
            onClick={() => setResult(null)} 
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white transition-colors"
          >
            <RefreshCw size={13} />
          </button>
        )}
      </div>

      {/* Scanner Viewport */}
      <div className="relative rounded-xl bg-[#050816]/80 border border-[#00D4FF]/25 overflow-hidden flex items-center justify-center min-h-[170px] z-10 w-full">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2.5 p-4 text-center w-full"
            >
              <CheckCircle size={28} className="text-[#10B981]" />
              <div>
                <p className="text-white font-bold text-xs truncate max-w-[190px]">{result.name}</p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#94A3B8] mt-0.5">
                  <Hash size={10} /> {result.sku} · <Package size={10} /> {result.warehouse}
                </div>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${result.stock <= result.minStock ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20' : 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'}`}>
                Stock: {result.stock.toLocaleString()} units · {result.stock <= result.minStock ? 'Low Stock' : 'Optimal'}
              </span>
            </motion.div>
          ) : scanning ? (
            <motion.div key="scanning" className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 border-2 border-dashed border-[#00D4FF]/40 rounded-lg overflow-hidden flex items-center justify-center bg-[#00D4FF]/5">
                <ScanLine size={24} className="text-[#00D4FF]/30" />
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"
                  initial={{ top: '5%' }}
                  animate={{ top: '95%' }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#00D4FF] animate-pulse">Scanning...</span>
            </motion.div>
          ) : (
            <motion.div key="idle" className="flex flex-col items-center gap-2.5">
              <div className="w-16 h-16 border border-dashed border-white/10 rounded-xl flex items-center justify-center bg-white/[0.01]">
                <ScanLine size={20} className="text-white/20" />
              </div>
              <span className="text-[10px] text-[#94A3B8] font-medium">Ready to scan barcode</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Row */}
      <div className="flex flex-col gap-2.5 z-10 w-full">
        <button
          onClick={triggerScan}
          disabled={scanning}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-xs font-bold hover:scale-[1.01] transition-transform disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,212,255,0.2)]"
        >
          {scanning ? <RefreshCw size={13} className="animate-spin" /> : <ScanLine size={13} />}
          Scan Now
        </button>

        <div className="flex gap-2 w-full">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleManualLookup()}
            placeholder="Enter SKU..."
            className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#00D4FF]/40"
          />
          <button
            onClick={handleManualLookup}
            className="px-3 rounded-lg bg-white/5 border border-white/10 text-[#00D4FF] hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
      
    </GlassCard>
  );
}
