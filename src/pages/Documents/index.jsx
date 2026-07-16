import React, { useState } from 'react';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SubPageTabs } from '@/components/ui/SubPageTabs';
import { DocumentKPIGrid } from './DocumentKPIGrid';
import { AIDocAssistant } from './AIDocAssistant';
import { FileVault } from './FileVault';
import { StorageCharts } from './StorageCharts';
import { ContractAnalyzer } from './ContractAnalyzer';
import { Scan, UploadCloud, FileText, Eye, CheckCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { GlassCard } from '@/components/ui/GlassCard';

export function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleScan = () => toast.success('Initializing OCR Scanner...');
  const handleUpload = () => toast.success('Upload dialog opened.');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'vault', label: 'Vault' },
    { id: 'contracts', label: 'Contracts' },
    { id: 'ocr', label: 'OCR' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const recentDocs = [
    { name: 'MSA_TechNova_Final.pdf', type: 'Legal', size: '2.4 MB', owner: 'John Maxwell', date: '16 Jul 2026', status: 'Pending Signature' },
    { name: 'Q3_Financial_Audit_v2.xlsx', type: 'Finance', size: '15.8 MB', owner: 'Finance Team', date: '15 Jul 2026', status: 'Approved' },
    { name: 'Employee_Offer_Letter_Rao.pdf', type: 'HR', size: '1.1 MB', owner: 'HR Team', date: '14 Jul 2026', status: 'Pending Signature' },
    { name: 'Product_Reel_IG_Marketing.mp4', type: 'Marketing', size: '145.0 MB', owner: 'Marketing Ads', date: '12 Jul 2026', status: 'Approved' },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 relative z-10 pb-10">
      
      {/* Module Header */}
      <ModuleHeader 
        title="Document Center"
        description="Enterprise file management, e-signatures, and AI vault."
        primaryAction={{
          label: "Upload File",
          onClick: handleUpload,
          icon: <UploadCloud size={16} />
        }}
        secondaryAction={{
          label: "Scan OCR",
          onClick: handleScan,
          icon: <Scan size={16} />
        }}
        moduleName="Documents"
      />

      {/* Subpage Tabs */}
      <SubPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* 1. Storage KPIs */}
          <DocumentKPIGrid />

          {/* 2. AI Assistant & OCR/Summary triggers */}
          <AIDocAssistant />

          {/* 3. Visual Vault & Analytics Layer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col bg-white/5 border border-white/5 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Enterprise File Vault</h3>
              <FileVault />
            </div>
            <StorageCharts />
          </div>

          {/* 4. Recent Activity Table */}
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Enterprise Files</h3>
              <button onClick={() => setActiveTab('vault')} className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer">
                View Vault <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#94A3B8]">
                <thead className="text-xs text-white uppercase bg-white/5 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Document Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Uploaded By</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentDocs.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                        <FileText size={14} className="text-[#10B981]" />
                        <span>{doc.name}</span>
                      </td>
                      <td className="px-4 py-3 text-white">{doc.type}</td>
                      <td className="px-4 py-3 font-semibold">{doc.size}</td>
                      <td className="px-4 py-3 text-white">{doc.owner}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          doc.status === 'Approved' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' :
                          'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'vault' && (
        <div className="flex flex-col gap-6">
          <FileVault />
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="flex flex-col gap-6">
          <ContractAnalyzer />
        </div>
      )}

      {activeTab === 'ocr' && (
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 max-w-xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-2">OCR Document Processing</h2>
            <p className="text-sm text-[#94A3B8] mb-6">Import scanned files, receipts, or contracts to extract text automatically.</p>
            <button onClick={handleScan} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#5B5FFF] text-white font-bold hover:scale-[1.02] transition-all cursor-pointer">
              Launch OCR Text Extractor
            </button>
          </GlassCard>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-6">
          <StorageCharts />
        </div>
      )}

    </div>
  );
}
