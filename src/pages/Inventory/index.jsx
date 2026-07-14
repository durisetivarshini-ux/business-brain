import React, { useState, useEffect } from 'react';
import { InventoryDashboard } from './InventoryDashboard';
import { SupplyChainMap } from './SupplyChainMap';
import { Portal } from '@/components/ui/Portal';
import { mockDb } from '@/utils/mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Barcode, HelpCircle, Save, Trash2, Camera, Upload, Flashlight, History, ArrowRight, Package, ShieldCheck, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function InventoryPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Dynamic refresh key for child widgets
  const [refreshKey, setRefreshKey] = useState(0);

  // Add Product Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: 'Electronics',
    brand: '',
    quantity: '',
    purchasePrice: '',
    sellingPrice: '',
    supplier: '',
    warehouse: 'Warehouse A',
    minStock: '',
  });

  // Scanner State
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [manualSku, setManualSku] = useState('');
  const [scanHistory, setScanHistory] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setScanHistory(mockDb.getScanHistory());
  }, [showScanModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku || !formData.quantity || !formData.sellingPrice) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      mockDb.saveProduct(formData);
      setIsSaving(false);
      setShowAddModal(false);
      toast.success('Product saved successfully!', { icon: '📦' });
      setRefreshKey(prev => prev + 1); // Refresh layout KPIs
      setFormData({
        name: '',
        sku: '',
        barcode: '',
        category: 'Electronics',
        brand: '',
        quantity: '',
        purchasePrice: '',
        sellingPrice: '',
        supplier: '',
        warehouse: 'Warehouse A',
        minStock: '',
      });
    }, 1200);
  };

  const handleManualScan = () => {
    const sku = manualSku.trim().toUpperCase();
    if (!sku) return;

    const products = mockDb.getProducts();
    const product = products.find(p => p.sku.toUpperCase() === sku || p.barcode === sku);
    
    if (product) {
      mockDb.addScanHistory(product.sku, product.name);
      setSelectedProduct(product);
      setShowScanModal(false);
      setManualSku('');
      toast.success('Product resolved!');
    } else {
      toast.error('SKU or Barcode not found');
    }
  };

  const handleCameraScanSimulation = () => {
    setIsScanning(true);
    toast.loading('Initializing camera & searching barcode...');
    
    setTimeout(() => {
      const products = mockDb.getProducts();
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      mockDb.addScanHistory(randomProduct.sku, randomProduct.name);
      setSelectedProduct(randomProduct);
      setIsScanning(false);
      setShowScanModal(false);
      toast.dismiss();
      toast.success(`Scanned: ${randomProduct.name}`, { icon: '🎯' });
    }, 2000);
  };

  const handleImageUploadSimulation = () => {
    toast.loading('Processing uploaded image...');
    setTimeout(() => {
      const products = mockDb.getProducts();
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      mockDb.addScanHistory(randomProduct.sku, randomProduct.name);
      setSelectedProduct(randomProduct);
      setShowScanModal(false);
      toast.dismiss();
      toast.success('Barcode decoded from image!');
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Smart Inventory</h1>
          <p className="text-[#94A3B8] font-medium">Real-time command center for warehouse monitoring and stock logistics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowScanModal(true)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Scan Barcode
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-transform hover:scale-[1.02]"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Main Inventory Dashboard Layout */}
      <InventoryDashboard key={refreshKey} />

      {/* AI Premium Modules */}
      <SupplyChainMap />

      {/* ── MODALS ── */}

      {/* 1. Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Box className="text-[#7C3AED]" size={20} /> Add New Product
                  </h2>
                  <button onClick={() => setShowAddModal(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Product Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Lithium-Ion Battery Pack"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">SKU *</label>
                      <input
                        type="text"
                        name="sku"
                        required
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="e.g. SKU-8840"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Barcode / EAN</label>
                      <div className="relative">
                        <Barcode className="absolute left-3 top-2.5 text-white/40" size={14} />
                        <input
                          type="text"
                          name="barcode"
                          value={formData.barcode}
                          onChange={handleInputChange}
                          placeholder="EAN-13 Code"
                          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Raw Materials">Raw Materials</option>
                        <option value="Hardware">Hardware</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Brand Name"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Qty *</label>
                      <input
                        type="number"
                        name="quantity"
                        required
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="Quantity"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Min Stock</label>
                      <input
                        type="number"
                        name="minStock"
                        value={formData.minStock}
                        onChange={handleInputChange}
                        placeholder="Min Limit"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Purchase Price ($)</label>
                      <input
                        type="number"
                        name="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Selling Price ($) *</label>
                      <input
                        type="number"
                        name="sellingPrice"
                        required
                        value={formData.sellingPrice}
                        onChange={handleInputChange}
                        placeholder="Retail"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Supplier</label>
                      <input
                        type="text"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleInputChange}
                        placeholder="Supplier Name"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Warehouse Location</label>
                      <select
                        name="warehouse"
                        value={formData.warehouse}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED]"
                      >
                        <option value="Warehouse A">Warehouse A</option>
                        <option value="Warehouse B">Warehouse B</option>
                        <option value="Warehouse C">Warehouse C</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload mockup */}
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Product Image</label>
                    <div className="border border-dashed border-white/10 hover:border-[#7C3AED]/50 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/[0.02]">
                      <Upload className="mx-auto text-white/40 mb-1.5" size={18} />
                      <span className="text-xs text-[#94A3B8]">Drag and drop image or click to select</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-sm font-bold hover:scale-[1.02] transition-transform flex items-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          Saving...
                        </>
                      ) : (
                        'Save Product'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>

      {/* 2. Scan Barcode Scanner Modal */}
      <AnimatePresence>
        {showScanModal && (
          <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Camera className="text-[#00D4FF]" size={20} /> Professional QR / Barcode Scanner
                  </h2>
                  <button onClick={() => setShowScanModal(false)} className="text-[#94A3B8] hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Left: Viewfinder Simulator */}
                  <div className="flex flex-col gap-3">
                    <div className="relative rounded-xl bg-[#050816] border border-[#00D4FF]/30 overflow-hidden flex items-center justify-center min-h-[220px]">
                      {/* Laser scanning animations */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                      
                      {/* Scanner target bounding box */}
                      <div className="relative w-36 h-36 border-2 border-dashed border-[#00D4FF]/50 rounded-lg flex items-center justify-center">
                        <Barcode size={32} className="text-[#00D4FF]/30" />
                        
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 bg-[#00D4FF] shadow-[0_0_12px_#00D4FF,0_0_24px_#00D4FF]"
                          initial={{ top: '5%' }}
                          animate={{ top: '95%' }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                        />
                      </div>
                      
                      {/* Flashlight Glow overlay */}
                      {flashlightOn && (
                        <div className="absolute inset-0 bg-[#00D4FF]/5 pointer-events-none mix-blend-color-dodge transition-all" />
                      )}

                      {/* Scanning State Overlay */}
                      {isScanning && (
                        <div className="absolute inset-0 bg-[#050816]/90 flex flex-col items-center justify-center gap-3">
                          <RefreshCw size={24} className="text-[#00D4FF] animate-spin" />
                          <span className="text-xs text-[#00D4FF] font-bold uppercase tracking-wider animate-pulse">Parsing Barcode...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setFlashlightOn(!flashlightOn)}
                        className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                          flashlightOn 
                            ? 'bg-[#00D4FF]/20 border-[#00D4FF]/50 text-[#00D4FF]' 
                            : 'bg-white/5 border-white/10 text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        <Flashlight size={14} /> Toggle Flash
                      </button>
                      <button
                        onClick={handleImageUploadSimulation}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white flex items-center gap-1.5 text-xs font-bold transition-all"
                      >
                        <Upload size={14} /> Upload Image
                      </button>
                    </div>

                    <button
                      onClick={handleCameraScanSimulation}
                      disabled={isScanning}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] text-white text-sm font-bold hover:scale-[1.02] transition-transform"
                    >
                      Scan Barcode Now
                    </button>
                  </div>

                  {/* Right: Manual Input & History */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Manual SKU / Barcode Lookup</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={manualSku}
                          onChange={e => setManualSku(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleManualScan()}
                          placeholder="e.g. SKU-1042"
                          className="flex-1 px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#00D4FF]"
                        />
                        <button
                          onClick={handleManualScan}
                          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors"
                        >
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-[160px]">
                      <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1">
                        <History size={12} /> Scan History
                      </h4>
                      <div className="flex-1 max-h-[160px] overflow-y-auto bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-2 custom-scrollbar">
                        {scanHistory.length > 0 ? (
                          scanHistory.map((h, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => {
                                const found = mockDb.getProducts().find(p => p.sku === h.sku);
                                if (found) setSelectedProduct(found);
                              }}
                              className="flex justify-between items-center text-[11px] p-2 rounded bg-white/5 border border-white/5 hover:border-[#00D4FF]/30 cursor-pointer transition-colors"
                            >
                              <div>
                                <p className="font-bold text-white leading-tight">{h.productName}</p>
                                <p className="text-[9px] text-[#94A3B8]">{h.sku}</p>
                              </div>
                              <span className="text-[9px] text-white/40">{h.time}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-white/30 text-[11px] gap-1 py-8">
                            <Barcode size={16} />
                            <span>No scan logs recorded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>

      {/* 3. Scanned Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none bg-[#7C3AED]/10" />
                
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4 relative z-10">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Package className="text-[#00D4FF]" size={20} /> Product Telemetry
                  </h2>
                  <button onClick={() => setSelectedProduct(null)} className="text-[#94A3B8] hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#EC4899] flex items-center justify-center font-bold text-white text-lg">
                      {selectedProduct.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{selectedProduct.name}</h3>
                      <p className="text-xs text-[#94A3B8]">{selectedProduct.brand} · {selectedProduct.category}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">SKU Code</span>
                      <span className="text-sm font-bold text-white font-mono">{selectedProduct.sku}</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Barcode</span>
                      <span className="text-sm font-bold text-white font-mono">{selectedProduct.barcode || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Current Stock</span>
                      <span className={`text-lg font-bold ${selectedProduct.stock <= selectedProduct.minStock ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
                        {selectedProduct.stock.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Safety Limit</span>
                      <span className="text-lg font-bold text-white">{selectedProduct.minStock}</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Reorder</span>
                      <span className={`text-xs font-bold block mt-1.5 ${selectedProduct.stock <= selectedProduct.minStock ? 'text-[#F59E0B] animate-pulse' : 'text-[#10B981]'}`}>
                        {selectedProduct.stock <= selectedProduct.minStock ? 'Required' : 'Satisfied'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Warehouse Location</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                        <MapPin size={12} className="text-[#00D4FF]" /> {selectedProduct.warehouse}
                      </span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Supplier Ref</span>
                      <span className="text-xs font-bold text-white block truncate mt-0.5">{selectedProduct.supplier || 'N/A'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
                  >
                    Close Product
                  </button>
                </div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>

    </div>
  );
}
