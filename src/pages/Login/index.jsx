import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Bot, Activity, Command, X, ShieldAlert, Sparkles, UserPlus } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { InitializationScreen } from '../../components/common/InitializationScreen';
import { useAppStore } from '../../store/useAppStore';
import { toast } from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showInit, setShowInit] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ssoType, setSsoType] = useState(null); // 'google' | 'microsoft' | null
  
  // Custom SSO Form States
  const [ssoEmail, setSsoEmail] = useState('');
  const [ssoName, setSsoName] = useState('');

  const deriveNameFromEmail = (emailStr) => {
    if (!emailStr) return '';
    const part = emailStr.split('@')[0].toLowerCase();
    
    // Special check for Varshini Duriseti combinations
    if (part.includes('varshini') && part.includes('duriseti')) {
      return 'Varshini Duriseti';
    }
    
    // Split by dot, dash, underscore
    if (/[._-]/.test(part)) {
      return part
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim();
    }
    
    // Single run of letters with known prefixes/suffixes
    if (part.startsWith('varshini')) {
      const rest = part.slice(8);
      return 'Varshini' + (rest ? ' ' + rest.charAt(0).toUpperCase() + rest.slice(1) : '');
    }
    if (part.endsWith('duriseti')) {
      const rest = part.slice(0, part.length - 8);
      return (rest ? rest.charAt(0).toUpperCase() + rest.slice(1) + ' ' : '') + 'Duriseti';
    }
    if (part.startsWith('alex')) {
      const rest = part.slice(4);
      return 'Alex' + (rest ? ' ' + rest.charAt(0).toUpperCase() + rest.slice(1) : '');
    }

    // Default capitalize
    return part.charAt(0).toUpperCase() + part.slice(1);
  };

  const enterDashboard = (userData) => {
    setUser(userData);
    setShowInit(true);
    setTimeout(() => navigate('/app'), 3500);
  };

  // Standard email/password submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);

    const derived = deriveNameFromEmail(email);

    setTimeout(() => {
      enterDashboard({
        name: name || derived || 'User',
        email: email,
        role: 'Business User',
        avatarUrl: null,
      });
    }, 1000);
  };

  // Simulated Google/Microsoft login submit
  const handleSsoSubmit = (e) => {
    e.preventDefault();
    if (!ssoEmail.trim()) return;

    const derived = deriveNameFromEmail(ssoEmail);
    const finalName = ssoName.trim() || derived || 'User';
    
    // Choose appropriate avatar url based on login type
    const avatarUrl = ssoType === 'google' 
      ? `https://api.dicebear.com/7.x/initials/svg?seed=${finalName}&backgroundColor=4285f4` 
      : `https://api.dicebear.com/7.x/initials/svg?seed=${finalName}&backgroundColor=00a4ef`;

    enterDashboard({
      name: finalName,
      email: ssoEmail,
      role: ssoType === 'google' ? 'Google Account' : 'Microsoft Account',
      avatarUrl,
    });

    toast.success(`Welcome, ${finalName}! Signed in via ${ssoType === 'google' ? 'Google' : 'Microsoft'} SSO.`);
    setSsoType(null);
  };


  if (showInit) {
    return <InitializationScreen />;
  }

  return (
    <div className="min-h-screen bg-[#050816] flex overflow-hidden selection:bg-[#5B5FFF] selection:text-white">
      
      {/* ======================================================== */}
      {/* LEFT SIDE: Visual AI Narrative (Hidden on Mobile) */}
      {/* ======================================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-white/10 bg-[#0B1120] overflow-hidden">
        
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#5B5FFF]/20 blur-[120px] rounded-full animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-[#00D4FF]/20 blur-[120px] rounded-full animate-[pulse_10s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] bg-[#7C3AED]/20 blur-[100px] rounded-full animate-[pulse_6s_ease-in-out_infinite]" />
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Logo size={32} />
          <span className="font-display font-bold text-xl text-white tracking-tight">Business Brain</span>
        </div>

        {/* Center: Floating Holographic UI */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          
          <div className="relative w-full max-w-md perspective-1000">
            {/* Main Holographic Card */}
            <motion.div 
              initial={{ rotateY: 15, rotateX: 10, y: 50, opacity: 0 }}
              animate={{ rotateY: 0, rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full bg-[#050816]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_50px_rgba(91,95,255,0.2)] relative z-20"
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#00D4FF] flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wider">AI Copilot</h3>
                    <p className="text-xs text-[#94A3B8]">System Operational</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#10B981]/20 border border-[#10B981]/30 rounded text-[#10B981] text-[10px] font-bold uppercase">
                  98% Health
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-2 w-3/4 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]" />
                </div>
                <div className="h-2 w-1/2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.7 }} className="h-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                </div>
              </div>
            </motion.div>

            {/* Floating Accent Cards */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -10, 0], opacity: 1 }}
              transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1, delay: 1 } }}
              className="absolute -right-12 -bottom-12 bg-[#050816]/80 backdrop-blur-md border border-[#00D4FF]/30 p-4 rounded-xl shadow-xl z-30 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]">
                <Activity size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase">Revenue YoY</p>
                <p className="text-sm font-bold text-white">+32.4%</p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 mt-8">
          <h2 className="font-display text-4xl font-bold tracking-tight text-white mb-4">
            One AI.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]">Every Business Operation.</span>
          </h2>
          <p className="text-[#94A3B8] text-sm max-w-md leading-relaxed">
            Welcome to the definitive AI-powered business operating system. Connect your CRM, ERP, Finance, and HR into one intelligent command center.
          </p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* RIGHT SIDE: The Gateway (Login Form) */}
      {/* ======================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-20">
        
        {/* Mobile background glows */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[#050816] z-0" />
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#5B5FFF]/20 blur-[120px] rounded-full z-0" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
            <Logo size={32} />
            <span className="font-display font-bold text-xl text-white tracking-tight">Business Brain</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-[#94A3B8] text-sm">Continue to your AI Business Operating System</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              
              {/* Optional Name Input for first-time profile creation */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Full Name (optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <UserPlus size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#050816]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#5B5FFF] focus:ring-1 focus:ring-[#5B5FFF] transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050816]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#5B5FFF] focus:ring-1 focus:ring-[#5B5FFF] transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-bold text-[#5B5FFF] hover:text-[#00D4FF] transition-colors">Forgot Password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    defaultValue="••••••••"
                    className="w-full bg-[#050816]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#5B5FFF] focus:ring-1 focus:ring-[#5B5FFF] transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input 
                  id="remember" 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-white/10 bg-[#050816] text-[#5B5FFF] focus:ring-[#5B5FFF] focus:ring-offset-[#050816]"
                  defaultChecked
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-[#94A3B8]">
                  Remember this device
                </label>
              </div>

              {/* Sign In Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] hover:from-[#4F54E6] hover:to-[#6D28D9] text-white rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(91,95,255,0.3)] transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="mt-8 relative z-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-transparent text-[#94A3B8] backdrop-blur-xl">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 relative z-10">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => setSsoType('google')}
                className="functional-btn flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-semibold transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              {/* Microsoft Button */}
              <button
                type="button"
                onClick={() => setSsoType('microsoft')}
                className="functional-btn flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-semibold transition-colors"
              >
                <Command size={16} className="text-[#00a4ef]" /> Microsoft
              </button>
            </div>

          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#94A3B8]">
              Don't have an enterprise account?{' '}
              <a href="#" className="font-bold text-white hover:text-[#00D4FF] transition-colors">Contact Sales</a>
            </p>
          </div>

        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* SSO POPUP SIMULATION MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {ssoType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSsoType(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-[#0B1120] border border-white/10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Window Controls Decorator */}
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-xs font-semibold text-[#94A3B8]">
                  {ssoType === 'google' ? 'Sign in with Google' : 'Sign in with Microsoft'}
                </span>
                <button onClick={() => setSsoType(null)} className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Account Picker Form */}
              <form onSubmit={handleSsoSubmit} className="p-8 space-y-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 mb-4">
                    {ssoType === 'google' ? (
                      <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    ) : (
                      <Command size={32} className="text-[#00a4ef]" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">SSO Account Verification</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">Connect your workspace account automatically</p>
                </div>

                {/* Pre-populated profiles to pick instantly */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Select a Saved Account</p>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const name = 'Varshini';
                      const email = 'varshini@businessbrain.ai';
                      const avatarUrl = ssoType === 'google' 
                        ? `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=4285f4` 
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=00a4ef`;

                      enterDashboard({
                        name,
                        email,
                        role: ssoType === 'google' ? 'Google Account' : 'Microsoft Account',
                        avatarUrl,
                      });
                      toast.success(`Welcome, ${name}! Signed in via ${ssoType === 'google' ? 'Google' : 'Microsoft'} SSO.`);
                      setSsoType(null);
                    }}
                    className="w-full p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 text-left transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5FFF] to-[#7C3AED] flex items-center justify-center text-white font-bold text-xs">
                      V
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Varshini</p>
                      <p className="text-xs text-[#94A3B8]">varshini@businessbrain.ai</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const name = 'Alex Mercer';
                      const email = 'ceo@businessbrain.ai';
                      const avatarUrl = ssoType === 'google' 
                        ? `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=4285f4` 
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=00a4ef`;

                      enterDashboard({
                        name,
                        email,
                        role: ssoType === 'google' ? 'Google Account' : 'Microsoft Account',
                        avatarUrl,
                      });
                      toast.success(`Welcome, ${name}! Signed in via ${ssoType === 'google' ? 'Google' : 'Microsoft'} SSO.`);
                      setSsoType(null);
                    }}
                    className="w-full p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 text-left transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] flex items-center justify-center font-bold text-xs">
                      AM
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Alex Mercer</p>
                      <p className="text-xs text-[#94A3B8]">ceo@businessbrain.ai</p>
                    </div>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase"><span className="px-2 bg-[#0B1120] text-[#94A3B8]">Or Enter Manually</span></div>
                </div>

                {/* Manual inputs */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={ssoEmail}
                      onChange={(e) => setSsoEmail(e.target.value)}
                      placeholder="e.g. user@company.com"
                      className="w-full bg-[#050816]/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#5B5FFF] transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={ssoName}
                      onChange={(e) => setSsoName(e.target.value)}
                      placeholder="e.g. Varshini"
                      className="w-full bg-[#050816]/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#5B5FFF] transition-all"
                    />
                  </div>
                </div>

                {/* Continue button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] hover:from-[#4F54E6] hover:to-[#6D28D9] text-white rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(91,95,255,0.3)] transition-all transform hover:scale-[1.02]"
                >
                  Confirm & Continue
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
