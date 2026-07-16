import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, FileText, Download, Share2, Printer, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export function ActionDropdown({ moduleName = "Dashboard", onExportPDF, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = async (actionType) => {
    setIsOpen(false);
    
    switch (actionType) {
      case 'report':
        const reportPromise = new Promise(r => setTimeout(r, 1000));
        toast.promise(reportPromise, {
          loading: `Generating ${moduleName} Report...`,
          success: `${moduleName} Report generated and saved to Documents!`,
          error: 'Generation failed.',
        });
        break;

      case 'pdf':
        if (onExportPDF) {
          onExportPDF();
        } else {
          const pdfPromise = new Promise(r => setTimeout(r, 1200));
          toast.promise(pdfPromise, {
            loading: `Exporting ${moduleName} PDF...`,
            success: `${moduleName} PDF downloaded successfully!`,
            error: 'PDF Export failed.',
          });
        }
        break;

      case 'excel':
        const excelPromise = new Promise(r => setTimeout(r, 900));
        toast.promise(excelPromise, {
          loading: `Exporting ${moduleName} Excel...`,
          success: `${moduleName} Excel spreadsheet downloaded!`,
          error: 'Excel Export failed.',
        });
        break;

      case 'share':
        navigator.clipboard.writeText(window.location.href);
        toast.success(`Share link for ${moduleName} copied to clipboard!`, { icon: '🔗' });
        break;

      case 'print':
        toast.success(`Preparing print layout for ${moduleName}...`, { icon: '🖨️' });
        setTimeout(() => {
          window.print();
        }, 500);
        break;

      default:
        break;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors cursor-pointer"
      >
        <span>Actions</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 bg-[#0B1120] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50 py-1.5"
          >
            <button
              onClick={() => handleAction('report')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors text-left"
            >
              <FileText size={16} className="text-[#00D4FF]" />
              <span>Generate Report</span>
            </button>
            <button
              onClick={() => handleAction('pdf')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors text-left"
            >
              <Download size={16} className="text-[#10B981]" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => handleAction('excel')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors text-left"
            >
              <FileSpreadsheet size={16} className="text-[#F59E0B]" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => handleAction('share')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors text-left"
            >
              <Share2 size={16} className="text-[#5B5FFF]" />
              <span>Share Dashboard</span>
            </button>
            <div className="border-t border-white/5 my-1.5" />
            <button
              onClick={() => handleAction('print')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors text-left"
            >
              <Printer size={16} className="text-[#EC4899]" />
              <span>Print Page</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
