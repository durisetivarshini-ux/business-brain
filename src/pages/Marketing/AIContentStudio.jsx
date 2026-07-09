import React, { useState } from 'react';
import { Sparkles, Edit3, Image as ImageIcon, MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import toast from 'react-hot-toast';

const sampleOutputs = {
  'Blog Articles': "**5 Ways AI is Transforming Business Operations in 2026**\n\nArtificial intelligence is no longer a future concept—it's the engine driving today's most successful enterprises. From intelligent CRM pipelines to automated financial forecasting, AI has become the backbone of competitive businesses...",
  'Social Copy': "🚀 The future of business is here.\n\nOur AI-powered platform helped 500+ businesses grow revenue by 40% this quarter. Ready to join them?\n\n✅ Automated pipelines\n✅ Real-time insights\n✅ Zero manual effort\n\n👇 Try Business Brain free for 14 days.\n\n#AI #BusinessGrowth #SaaS #Innovation",
  'Ad Creatives': "**Headline:** Stop Losing Deals. Start Closing Them.\n**Subheadline:** AI-powered CRM that predicts your next win.\n**CTA:** Start Free Trial →\n**Visual Note:** Dark background, teal gradient highlight on key metric (+28% revenue growth). Minimal, premium aesthetic.",
  'Email Campaigns': "**Subject:** Your Q4 revenue target can be hit 3 days early 🎯\n\nHi [First Name],\n\nOur AI just analyzed your pipeline and found 18 high-intent leads ready to close this week. Here's what Revenue AI recommends:\n\n1. Follow up with Nexus Industries (₹1.8 Cr deal)\n2. Schedule demo for Healthcare Sector lead\n3. Send proposal to Global Logistics\n\n[View Full AI Report →]\n\nBest,\nBusiness Brain AI",
};

function OutputModal({ type, content, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-[#7C3AED]/30 bg-[#0B1120] shadow-2xl p-8 relative max-h-[80vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]"><Sparkles size={18} /></div>
          <div>
            <h2 className="text-lg font-bold text-white">AI Generated – {type}</h2>
            <p className="text-xs text-[#94A3B8]">Review and use your content</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-white/5 border border-white/5 rounded-xl p-4 mb-4">
          <pre className="text-sm text-[#F8FAFC] leading-relaxed whitespace-pre-wrap font-sans">{content}</pre>
        </div>
        <div className="flex gap-3">
          <button onClick={handleCopy} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-sm font-bold hover:scale-[1.02] transition-all">
            Use This Content
          </button>
        </div>
      </div>
    </div>
  );
}

export function AIContentStudio() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState(null);
  const [outputType, setOutputType] = useState('');

  const contentTypes = [
    { title: "Blog Articles", icon: <Edit3 size={16}/>, color: "#00D4FF" },
    { title: "Social Copy", icon: <MessageSquare size={16}/>, color: "#EC4899" },
    { title: "Ad Creatives", icon: <ImageIcon size={16}/>, color: "#7C3AED" },
    { title: "Email Campaigns", icon: <Send size={16}/>, color: "#10B981" },
  ];

  const handleGenerate = async (type = null) => {
    const contentType = type || (prompt ? 'Blog Articles' : null);
    if (!type && !prompt.trim()) {
      toast.error('Please describe what you want to generate.');
      return;
    }
    setGenerating(true);
    setOutputType(contentType || 'Custom Content');
    await new Promise(r => setTimeout(r, 1800));
    setOutput(sampleOutputs[contentType] || `**AI Generated Content**\n\nBased on your prompt: "${prompt}"\n\nThis is AI-generated content tailored to your campaign goals. The content has been optimized for engagement, SEO, and your target audience. Ready to publish across your marketing channels.`);
    setGenerating(false);
  };

  return (
    <GlassCard className="p-6 border-[#7C3AED]/20 bg-[#0B1120]/60 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-[#7C3AED]" /> Content Studio
        </h3>
        <span className="text-xs font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-1 rounded-md">AI Active</span>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="relative">
          <textarea 
            className="w-full h-32 bg-[#050816] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#7C3AED]/50 resize-none transition-colors"
            placeholder="Describe the campaign, product, or audience you want to target..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button
            onClick={() => handleGenerate(null)}
            disabled={generating}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow-lg shadow-[#7C3AED]/20 hover:scale-[1.05] transition-transform disabled:opacity-60 flex items-center gap-1.5"
          >
            {generating ? <><Loader2 size={12} className="animate-spin" /> Generating...</> : 'Generate'}
          </button>
        </div>

        <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mt-2">Quick Generators</h4>
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type, i) => (
            <button
              key={i}
              onClick={() => handleGenerate(type.title)}
              disabled={generating}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group disabled:opacity-50"
            >
              <div className="p-1.5 rounded-md" style={{ backgroundColor: `${type.color}20`, color: type.color }}>
                {type.icon}
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#7C3AED] transition-colors">{type.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Output Modal */}
      {output && <OutputModal type={outputType} content={output} onClose={() => setOutput(null)} />}
    </GlassCard>
  );
}
