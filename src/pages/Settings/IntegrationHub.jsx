import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { toast } from 'react-hot-toast';

export function IntegrationHub() {
  const integrations = [
    { name: "Slack", desc: "Send notifications directly to channels.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "Stripe", desc: "Sync payments and generate invoices.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "AWS S3", desc: "Cloud storage for the Document Vault.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "OpenAI", desc: "Language model powering AI Copilot.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { name: "Salesforce", desc: "Bi-directional sync for CRM module.", connected: false, logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "GitHub", desc: "Developer API webhooks and logs.", connected: false, logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard className="p-6 border-white/5 bg-[#0B1120]/60 flex flex-col h-full hover:border-white/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center shadow-lg">
                {/* Fallback empty div if logo fails, but using standard svgs */}
                <img src={integration.logo} alt={integration.name} className="max-w-full max-h-full object-contain" onError={(e) => e.target.style.display='none'} />
              </div>
              <div className="flex items-center gap-1.5">
                {integration.connected ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded border border-[#10B981]/20 uppercase">
                    <CheckCircle2 size={12} /> Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#94A3B8] bg-white/5 px-2 py-1 rounded border border-white/10 uppercase">
                    Not Connected
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="text-white font-bold text-lg mb-2">{integration.name}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 flex-1">{integration.desc}</p>
            
            <button 
              onClick={() => toast.success(integration.connected ? `${integration.name} settings opened.` : `${integration.name} integration request sent!`)}
              className={`w-full py-2.5 rounded-lg text-sm font-bold border transition-colors ${integration.connected ? 'bg-white/5 border-white/10 text-white hover:bg-[#EF4444]/20 hover:border-[#EF4444]/50 hover:text-[#EF4444]' : 'bg-[#5B5FFF] border-[#5B5FFF] text-white hover:bg-[#4F54E6]'}`}
            >
              {integration.connected ? 'Configure' : 'Connect'}
            </button>

          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
