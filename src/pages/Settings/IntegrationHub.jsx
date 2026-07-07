import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { toast } from 'react-hot-toast';

export function IntegrationHub() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: "Slack", desc: "Send notifications directly to channels.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { id: 2, name: "Stripe", desc: "Sync payments and generate invoices.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { id: 3, name: "AWS S3", desc: "Cloud storage for the Document Vault.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { id: 4, name: "OpenAI", desc: "Language model powering AI Copilot.", connected: true, logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { id: 5, name: "Salesforce", desc: "Bi-directional sync for CRM module.", connected: false, logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { id: 6, name: "GitHub", desc: "Developer API webhooks and logs.", connected: false, logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
  ]);
  const [loadingId, setLoadingId] = useState(null);

  const handleToggle = (id, connected, name) => {
    if (connected) {
      toast.success(`${name} settings opened.`);
      return;
    }
    
    setLoadingId(id);
    setTimeout(() => {
      setIntegrations(integrations.map(inv => inv.id === id ? { ...inv, connected: true } : inv));
      setLoadingId(null);
      toast.success(`${name} successfully connected!`);
    }, 1200);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration, i) => (
        <motion.div 
          key={integration.id}

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
              onClick={() => handleToggle(integration.id, integration.connected, integration.name)}
              disabled={loadingId === integration.id}
              className={`w-full py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-bold border transition-colors disabled:opacity-50 ${integration.connected ? 'bg-white/5 border-white/10 text-white hover:bg-[#EF4444]/20 hover:border-[#EF4444]/50 hover:text-[#EF4444]' : 'bg-[#5B5FFF] border-[#5B5FFF] text-white hover:bg-[#4F54E6]'}`}
            >
              {loadingId === integration.id ? <Loader2 size={16} className="animate-spin" /> : null}
              {loadingId === integration.id ? 'Connecting...' : (integration.connected ? 'Configure' : 'Connect')}
            </button>


          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
