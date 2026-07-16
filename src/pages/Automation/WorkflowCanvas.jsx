import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Fingerprint, Laptop, Users, CreditCard, Calendar, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

import { useWorkspace } from '../../context/WorkspaceContext';

export function WorkflowCanvas() {
  const [activeNode, setActiveNode] = useState(0);
  const { workspaceConfig: config } = useWorkspace();
  const industry = config?.customIndustry || 'Software Company';

  // Dynamic workflows based on selected industry
  const getIndustryWorkflowNodes = () => {
    switch (industry) {
      case 'Restaurant':
        return [
          { id: 1, type: "Trigger", title: "Order Placed", icon: <UserPlus size={18} />, color: "#F59E0B", app: "Mobile App/POS" },
          { id: 2, type: "Action", title: "Generate Kitchen Ticket", icon: <Mail size={18} />, color: "#00D4FF", app: "Kitchen Display" },
          { id: 3, type: "Action", title: "Deduct Ingredients", icon: <Fingerprint size={18} />, color: "#EC4899", app: "Inventory DB" },
          { id: 4, type: "Action", title: "Schedule Rider", icon: <Laptop size={18} />, color: "#7C3AED", app: "Delivery Portal" },
          { id: 5, type: "Action", title: "Notify Customer", icon: <Users size={18} />, color: "#10B981", app: "SMS Gateway" },
        ];
      case 'Hospital':
        return [
          { id: 1, type: "Trigger", title: "Patient Admission", icon: <UserPlus size={18} />, color: "#EC4899", app: "Clinic Registry" },
          { id: 2, type: "Action", title: "Assign Ward & Room", icon: <Laptop size={18} />, color: "#00D4FF", app: "Bed Allocator" },
          { id: 3, type: "Action", title: "Assign On-Duty Doctor", icon: <Users size={18} />, color: "#7C3AED", app: "Staff Roster" },
          { id: 4, type: "Action", title: "Dispatch Prescription", icon: <Fingerprint size={18} />, color: "#10B981", app: "Pharmacy DB" },
        ];
      case 'School':
        return [
          { id: 1, type: "Trigger", title: "Student Register", icon: <UserPlus size={18} />, color: "#F59E0B", app: "Admissions Portal" },
          { id: 2, type: "Action", title: "Create Fee Ledger", icon: <CreditCard size={18} />, color: "#00D4FF", app: "Billing Accounts" },
          { id: 3, type: "Action", title: "Assign Teacher", icon: <Users size={18} />, color: "#EC4899", app: "Class grid" },
          { id: 4, type: "Action", title: "Notify Parents", icon: <Mail size={18} />, color: "#7C3AED", app: "Slack/Email" },
        ];
      case 'Manufacturing':
        return [
          { id: 1, type: "Trigger", title: "Raw Material Deficit", icon: <UserPlus size={18} />, color: "#EC4899", app: "IoT Scales Sensor" },
          { id: 2, type: "Action", title: "Auto-Generate PO", icon: <CreditCard size={18} />, color: "#00D4FF", app: "Procurement Hub" },
          { id: 3, type: "Action", title: "Verify Machine Safety", icon: <Fingerprint size={18} />, color: "#7C3AED", app: "OEE Telemetry" },
          { id: 4, type: "Action", title: "Dispatch Assembly Run", icon: <Laptop size={18} />, color: "#10B981", app: "Shopfloor Queue" },
        ];
      default: // Software Company / Default
        return [
          { id: 1, type: "Trigger", title: "Code Commit / PR", icon: <UserPlus size={18} />, color: "#F59E0B", app: "GitHub" },
          { id: 2, type: "Action", title: "Run CI Test Cases", icon: <Mail size={18} />, color: "#00D4FF", app: "QA Pipelines" },
          { id: 3, type: "Action", title: "Deploy Pod Cluster", icon: <Fingerprint size={18} />, color: "#EC4899", app: "Kubernetes DevOps" },
          { id: 4, type: "Action", title: "Auto-assign Code Reviewer", icon: <Users size={18} />, color: "#7C3AED", app: "Jira / Slack" },
          { id: 5, type: "Action", title: "Synchronize Release logs", icon: <Laptop size={18} />, color: "#10B981", app: "Vault System" },
        ];
    }
  };

  const nodes = getIndustryWorkflowNodes();

  // Animate the flow sequence to simulate execution
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev < nodes.length ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <GlassCard className="p-0 border-[#5B5FFF]/20 bg-[#0B1120]/80 h-[500px] relative overflow-hidden flex flex-col">
      
      {/* Canvas Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#00D4FF] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <SparklesIcon />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider">AI Generated Workflow</h3>
            <p className="text-xs text-[#94A3B8]">"Automate employee onboarding"</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-md animate-pulse">Running Simulation</span>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-colors">
            Publish
          </button>
        </div>
      </div>

      {/* Canvas Area (Simulated Infinite Scroll/Pan) */}
      <div className="flex-1 relative w-full h-full overflow-x-auto overflow-y-hidden custom-scrollbar bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-[#050816] to-[#050816]">
        
        {/* Dot Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #94A3B8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="min-w-max h-full flex items-center px-12 py-8 relative z-10">
          {nodes.map((node, i) => (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
                className={`relative w-[200px] rounded-xl border p-4 transition-all duration-500 ${
                  activeNode === i ? 'bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-[#0B1120]/90 border-white/10'
                }`}
                style={{ 
                  borderColor: activeNode === i ? node.color : 'rgba(255,255,255,0.1)',
                  boxShadow: activeNode === i ? `0 0 20px ${node.color}40` : 'none'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${node.color}20`, color: node.color }}>
                    {node.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{node.type}</span>
                    <h4 className="text-sm font-bold text-white leading-tight">{node.title}</h4>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <span className="text-xs text-[#94A3B8]">{node.app}</span>
                  {activeNode > i && <CheckCircle2Icon color="#10B981" />}
                  {activeNode === i && <LoaderIcon color={node.color} />}
                </div>
              </motion.div>

              {/* Connector Line */}
              {i < nodes.length - 1 && (
                <div className="w-16 h-0.5 mx-2 relative bg-white/10 shrink-0">
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-full origin-left"
                    style={{ backgroundColor: activeNode > i ? '#10B981' : node.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeNode > i ? 1 : activeNode === i ? [0, 1] : 0 }}
                    transition={{ duration: activeNode === i ? 2 : 0.5, repeat: activeNode === i ? Infinity : 0 }}
                  />
                  <ArrowRight size={12} className="absolute -right-2 -top-[5px]" color={activeNode > i ? '#10B981' : 'rgba(255,255,255,0.2)'} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// Inline Icons for the canvas
function SparklesIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
}

function CheckCircle2Icon({ color }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;
}

function LoaderIcon({ color }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
}
