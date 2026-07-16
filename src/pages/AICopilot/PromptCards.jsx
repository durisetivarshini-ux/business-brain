import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FileText, PieChart, Send } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

import { useWorkspace } from '../../context/WorkspaceContext';

export function PromptCards({ onSelect }) {
  const { workspaceConfig: config } = useWorkspace();
  const industry = config?.customIndustry || 'Software Company';

  const getIndustryPrompts = () => {
    switch (industry) {
      case 'Restaurant':
        return [
          { icon: <TrendingUp size={20}/>, color: "#10B981", title: "Forecast Weekly Food Waste", desc: "Analyze ingredients utilization margins." },
          { icon: <FileText size={20}/>, color: "#5B5FFF", title: "Optimize Dining Menu Pricing", desc: "Compare popular item margins to cost." },
          { icon: <PieChart size={20}/>, color: "#00D4FF", title: "Predict Weekend Delivery Spike", desc: "Forecast orders count to schedule riders." },
        ];
      case 'Hospital':
        return [
          { icon: <TrendingUp size={20}/>, color: "#EC4899", title: "Analyze ICU Bed Occupancy", desc: "Check patient telemetry admissions." },
          { icon: <FileText size={20}/>, color: "#5B5FFF", title: "Schedule Doctor Shift Rotations", desc: "Map doctor duty roster allocations." },
          { icon: <PieChart size={20}/>, color: "#00D4FF", title: "Track Critical Medicine Stock", desc: "Warn regarding low pharmacy ingredients." },
        ];
      case 'School':
        return [
          { icon: <TrendingUp size={20}/>, color: "#EC4899", title: "Track Student Admissions Trends", desc: "Review academic register growth rates." },
          { icon: <FileText size={20}/>, color: "#5B5FFF", title: "Generate Outstanding Fees Alert", desc: "Check tuition invoices database collection status." },
          { icon: <PieChart size={20}/>, color: "#00D4FF", title: "Audit Attendance Logs Deficit", desc: "Identify student absences records." },
        ];
      case 'Software Company':
        return [
          { icon: <TrendingUp size={20}/>, color: "#00D4FF", title: "Analyze DevOps CPU Workloads", desc: "Audit server cluster pods allocation loads." },
          { icon: <FileText size={20}/>, color: "#5B5FFF", title: "Verify QA Test Suite Cases", desc: "Check failed test gateway API outputs." },
          { icon: <PieChart size={20}/>, color: "#7C3AED", title: "Review CI/CD Pipeline Build Logs", desc: "Identify build durations and progress bottlenecks." },
        ];
      case 'Manufacturing':
        return [
          { icon: <TrendingUp size={20}/>, color: "#10B981", title: "Predict Machine Failures Status", desc: "Audit sensor telemetry warnings." },
          { icon: <FileText size={20}/>, color: "#5B5FFF", title: "Optimize Production Assembly Lines", desc: "Schedule raw materials to finished goods logs." },
          { icon: <PieChart size={20}/>, color: "#00D4FF", title: "Audit Warehouse Manifests", desc: "Monitor raw material suppliers lead times." },
        ];
      default:
        return [
          { icon: <TrendingUp size={20}/>, color: "#00D4FF", title: "Generate Monthly Sales Report", desc: "Analyze performance across regions." },
          { icon: <FileText size={20}/>, color: "#5B5FFF", title: "Create Marketing Strategy", desc: "Draft Q4 campaign ideas." },
          { icon: <PieChart size={20}/>, color: "#F59E0B", title: "Predict Inventory Demand", desc: "Forecast stock levels based on Q3." },
        ];
    }
  };

  const prompts = getIndustryPrompts();

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mb-8 mt-auto">
      {prompts.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.4 }}
          onClick={() => onSelect(p.title)}
          className="cursor-pointer group h-full"
        >
          <GlassCard className="p-5 h-full flex flex-col border-white/5 bg-[#0B1120]/60 hover:bg-[#0B1120] hover:border-[#5B5FFF]/30 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: p.color }} />
            
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${p.color}20`, color: p.color }}
            >
              {p.icon}
            </div>
            
            <h4 className="font-bold text-white text-sm mb-2">{p.title}</h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed flex-1">{p.desc}</p>
            
            <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1.5 rounded-md bg-white/5 text-white"><Send size={12}/></div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
