import React from 'react';
import { motion } from 'framer-motion';
import { LeadCard } from './LeadCard';

const pipelineData = {
  "New Leads": [
    { id: 1, company: "TechFlow Inc", contact: "Sarah Connor", value: "₹12.5L", priority: "High", aiScore: "92%", deadline: "14 Jul", logo: "TF" },
    { id: 2, company: "Nexus Dynamics", contact: "John Smith", value: "₹4.2L", priority: "Medium", aiScore: "68%", deadline: "18 Jul", logo: "ND" },
  ],
  "Qualified": [
    { id: 3, company: "Quantum AI", contact: "Alice Wang", value: "₹28.0L", priority: "High", aiScore: "95%", deadline: "10 Jul", logo: "QA" },
  ],
  "Proposal": [
    { id: 4, company: "Stellar Cloud", contact: "Mike Johnson", value: "₹8.5L", priority: "Medium", aiScore: "81%", deadline: "22 Jul", logo: "SC" },
    { id: 5, company: "DataSync", contact: "Emma Davis", value: "₹15.0L", priority: "Low", aiScore: "45%", deadline: "30 Jul", logo: "DS" },
  ],
  "Negotiation": [
    { id: 6, company: "Global Systems", contact: "Robert Chen", value: "₹42.0L", priority: "High", aiScore: "89%", deadline: "12 Jul", logo: "GS" },
  ],
  "Won": [
    { id: 7, company: "Alpha Networks", contact: "David Lee", value: "₹18.2L", priority: "High", aiScore: "99%", deadline: "Closed", logo: "AN" },
  ]
};

export function LeadPipeline() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar min-h-[500px]">
      {Object.entries(pipelineData).map(([stage, leads], i) => (
        <div key={stage} className="min-w-[300px] flex-1 flex flex-col bg-white/5 rounded-2xl border border-white/5 p-3">
          
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-white text-sm tracking-wide">{stage}</h3>
            <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs font-bold text-[#94A3B8]">
              {leads.length}
            </span>
          </div>

          {/* Cards Container */}
          <div className="flex flex-col gap-3 flex-1">
            {leads.map((lead, j) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i * 0.1) + (j * 0.05) }}
              >
                <LeadCard lead={lead} />
              </motion.div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
