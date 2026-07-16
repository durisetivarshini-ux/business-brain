import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle2, AlertCircle, Zap, Shield, Users } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { toast } from 'react-hot-toast';

export function BillingPanel() {
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      toast.success("Successfully upgraded to Enterprise Plan!");
    }, 1500);
  };

  const downloadInvoice = (id) => {
    toast.success(`Downloading invoice ${id}...`, { icon: '📥' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Current Plan & Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6 border-white/5 bg-gradient-to-br from-[#0B1120] to-[#111827]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Business Pro Plan</h3>
              <p className="text-[#94A3B8] text-sm">Active until Dec 31, 2026</p>
            </div>
            <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 size={14} /> Active
            </span>
          </div>

          <div className="flex items-end gap-2 mb-8">
            <span className="text-4xl font-bold text-white">$499</span>
            <span className="text-[#94A3B8] text-sm mb-1">/ month</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#94A3B8] text-sm flex items-center gap-2"><Users size={14} /> Team Seats</span>
                <span className="text-white font-bold text-sm">18 / 25</span>
              </div>
              <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] w-[72%] h-full rounded-full" />
              </div>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#94A3B8] text-sm flex items-center gap-2"><Zap size={14} /> AI Processing</span>
                <span className="text-white font-bold text-sm">84%</span>
              </div>
              <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] w-[84%] h-full rounded-full" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Upgrade Card */}
        <GlassCard className="p-6 border-[#5B5FFF]/30 bg-gradient-to-br from-[#0B1120]/90 to-[#050816]/90 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#5B5FFF]/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center mb-4">
              <Shield size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Enterprise Plan</h3>
            <p className="text-[#94A3B8] text-sm mb-4">Unlock unlimited AI processing, custom LLM fine-tuning, and dedicated account management.</p>
          </div>
          <button 
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="w-full relative z-10 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            {isUpgrading ? (
              <span className="animate-pulse">Upgrading...</span>
            ) : (
              <>Upgrade to Enterprise <Zap size={16} className="text-[#F59E0B]" /></>
            )}
          </button>
        </GlassCard>
      </div>

      {/* Payment Method & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-1 p-6 border-white/5">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Payment Method</h3>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 mb-4">
            <div className="w-12 h-8 bg-black/40 rounded flex items-center justify-center border border-white/5 shrink-0">
              <CreditCard size={20} className="text-[#94A3B8]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">•••• •••• •••• 4242</p>
              <p className="text-[#94A3B8] text-xs">Expires 12/28</p>
            </div>
          </div>
          <button 
            onClick={() => toast("Update payment method portal opening...", { icon: '💳' })}
            className="w-full py-2.5 rounded-lg border border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors text-sm font-semibold"
          >
            Update Payment Method
          </button>
        </GlassCard>

        <GlassCard className="lg:col-span-2 p-0 border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Billing History</h3>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[#94A3B8] text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Invoice</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Download</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { date: 'Nov 01, 2026', id: 'INV-2026-011', amount: '$499.00', status: 'Paid' },
                  { date: 'Oct 01, 2026', id: 'INV-2026-010', amount: '$499.00', status: 'Paid' },
                  { date: 'Sep 01, 2026', id: 'INV-2026-009', amount: '$499.00', status: 'Paid' },
                ].map((inv, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-white">{inv.date}</td>
                    <td className="px-6 py-4 text-[#94A3B8]">{inv.id}</td>
                    <td className="px-6 py-4 text-white font-bold">{inv.amount}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#10B981]/10 text-[#10B981] text-[10px] uppercase tracking-wider font-bold rounded">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => downloadInvoice(inv.id)}
                        className="text-[#94A3B8] hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors inline-flex"
                      >
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
