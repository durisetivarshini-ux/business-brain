import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Activity, Zap, Shield, Cpu, Layers, Globe } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { GlassCard } from '../../components/ui/GlassCard';

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Handle smooth scroll for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; }
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] font-sans overflow-x-hidden selection:bg-[#00D4FF] selection:text-black">
      
      {/* -------------------------------------------------------- */}
      {/* GLOBAL NAVIGATION */}
      {/* -------------------------------------------------------- */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-4 bg-[#050816]/70 backdrop-blur-2xl border-b border-white/5 transition-all">
        <Logo size={28} showText={false} />
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#94A3B8]">
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold text-white hover:text-[#00D4FF] transition-colors">Sign In</Link>
          <Link to="/login" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform">
            Get Started
          </Link>
        </div>
      </nav>

      {/* -------------------------------------------------------- */}
      {/* HERO SECTION - APPLE STYLE */}
      {/* -------------------------------------------------------- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center overflow-hidden">
        
        {/* Ambient Hero Glows */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[800px] h-[800px] bg-gradient-to-tr from-[#5B5FFF]/20 via-[#00D4FF]/20 to-transparent blur-[120px] rounded-full mix-blend-screen" 
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <Bot size={16} className="text-[#00D4FF]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">Introducing Business Brain 2.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight leading-[1.1] mb-6">
            The intelligent <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Operating System.</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#94A3B8] max-w-2xl font-medium leading-relaxed mb-10">
            Unify your enterprise. One singular AI command center for Finance, CRM, ERP, and HR.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/login" className="px-8 py-4 rounded-full bg-white text-black text-lg font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all">
              Launch Copilot
            </Link>
            <a href="#platform" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-lg font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
              Watch Keynote <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>

        {/* Floating 3D Visualization Placeholder */}
        <motion.div 
          style={{ y }}
          className="w-full max-w-6xl mt-20 relative z-20"
        >
          <div className="w-full aspect-video rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B1120] to-[#050816] shadow-2xl relative overflow-hidden flex items-center justify-center p-8">
            
            {/* Dashboard Abstract Preview */}
            <div className="w-full h-full border border-white/5 rounded-xl bg-[#050816]/80 flex flex-col relative overflow-hidden backdrop-blur-md">
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 flex p-6 gap-6">
                {/* Side */}
                <div className="w-48 hidden md:flex flex-col gap-3">
                  {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-white/5 rounded-lg w-full" />)}
                </div>
                {/* Main */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="h-32 bg-gradient-to-r from-[#5B5FFF]/20 to-[#00D4FF]/20 rounded-xl border border-white/10 p-6 flex flex-col justify-end">
                    <div className="h-4 w-1/3 bg-white/20 rounded mb-2" />
                    <div className="h-8 w-1/2 bg-white/40 rounded" />
                  </div>
                  <div className="flex-1 flex gap-6">
                    <div className="flex-[2] bg-white/5 rounded-xl border border-white/5" />
                    <div className="flex-[1] bg-white/5 rounded-xl border border-white/5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* -------------------------------------------------------- */}
      {/* PLATFORM FEATURES */}
      {/* -------------------------------------------------------- */}
      <section id="platform" className="py-32 px-8 relative z-20 bg-[#050816]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">Profoundly powerful.</h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl mx-auto">Everything you need to run a billion-dollar company, engineered into a single seamless interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <GlassCard className="p-8 border-white/5 bg-[#0B1120]/60">
              <div className="w-12 h-12 rounded-full bg-[#5B5FFF]/20 flex items-center justify-center text-[#5B5FFF] mb-6">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Neural Processing</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Business Brain continuously analyzes every metric across your company, identifying optimizations before they become bottlenecks.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0B1120]/60">
              <div className="w-12 h-12 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Automation</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Execute complex multi-department workflows instantly using natural language commands. From hiring to invoicing.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0B1120]/60">
              <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-6">
                <Layers size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unified Modules</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                CRM, ERP, HRMS, and Finance natively talk to each other without messy integrations or API limitations.
              </p>
            </GlassCard>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------- */}
      {/* ENTERPRISE SECURITY */}
      {/* -------------------------------------------------------- */}
      <section id="enterprise" className="py-32 px-8 relative bg-gradient-to-b from-[#050816] to-[#0B1120]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold uppercase tracking-widest mb-6">
              <Shield size={16} /> Enterprise Grade
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Security that never sleeps.</h2>
            <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
              Protected by military-grade quantum encryption. Business Brain processes all sensitive data in isolated secure enclaves. Your proprietary data never trains our foundational models.
            </p>
            <ul className="space-y-4">
              {['SOC 2 Type II Certified', 'End-to-End Encryption', 'Zero-Trust Architecture', 'Real-time Threat Detection'].map(item => (
                <li key={item} className="flex items-center gap-3 text-white font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-[#7C3AED]/20 blur-[100px] rounded-full pointer-events-none" />
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" alt="Security" className="relative z-10 rounded-2xl border border-white/10 shadow-2xl mix-blend-luminosity opacity-80" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- */}
      {/* PRICING */}
      {/* -------------------------------------------------------- */}
      <section id="pricing" className="py-32 px-8 relative bg-[#050816]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 tracking-tight">Simple, transparent pricing.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            
            {/* Pro Plan */}
            <GlassCard className="p-10 border-white/10 bg-[#0B1120]/60 flex flex-col">
              <h3 className="text-xl font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Professional</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-display font-bold text-white">$499</span>
                <span className="text-[#94A3B8]">/month</span>
              </div>
              <p className="text-[#94A3B8] mb-8 pb-8 border-b border-white/5">Perfect for scaling startups and mid-size companies.</p>
              <ul className="space-y-4 mb-10 flex-1">
                {['All Core Modules', 'Basic AI Copilot', '100gb Storage', 'Standard Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <span className="text-[#00D4FF]">•</span> {item}
                  </li>
                ))}
              </ul>
              <Link to="/login" className="w-full py-4 rounded-xl border border-white/10 text-center font-bold text-white hover:bg-white/5 transition-colors">
                Start Trial
              </Link>
            </GlassCard>

            {/* Enterprise Plan */}
            <GlassCard className="p-10 border-[#5B5FFF]/30 bg-gradient-to-b from-[#5B5FFF]/10 to-transparent flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]" />
              <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-display font-bold text-white">Custom</span>
              </div>
              <p className="text-[#94A3B8] mb-8 pb-8 border-b border-white/5">For large corporations requiring dedicated instances.</p>
              <ul className="space-y-4 mb-10 flex-1">
                {['Unlimited Modules', 'Advanced Predictive AI', 'Dedicated Secure Enclave', '24/7 Priority Support', 'Custom Integrations'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <span className="text-[#5B5FFF]">•</span> {item}
                  </li>
                ))}
              </ul>
              <Link to="/login" className="w-full py-4 rounded-xl bg-white text-black text-center font-bold hover:scale-[1.02] transition-transform">
                Contact Sales
              </Link>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------------------------------- */}
      <footer className="border-t border-white/5 bg-[#0B1120] py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Logo size={24} showText={false} />
            <span className="font-display font-bold text-white">Business Brain</span>
          </div>
          <div className="flex gap-8 text-sm text-[#94A3B8] font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">System Status</a>
          </div>
          <p className="text-sm text-[#94A3B8]">
            © {new Date().getFullYear()} Business Brain Inc. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
