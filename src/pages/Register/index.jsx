import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Bot } from 'lucide-react';
import { FunctionalButton } from '../../components/ui/FunctionalButton';
import { Logo } from '../../components/common/Logo';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;
    
    // Using a simple timeout to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#5B5FFF]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00D4FF]/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="flex justify-center mb-8">
            <Logo size={40} />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white mb-2">Create an Account</h1>
            <p className="text-[#94A3B8] text-sm">Join Business Brain and power up your enterprise with AI.</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <input 
                type="text" 
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#050816] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#5B5FFF]/50 focus:ring-1 focus:ring-[#5B5FFF]/50 transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <input 
                type="email" 
                placeholder="Enterprise Email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#050816] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#5B5FFF]/50 focus:ring-1 focus:ring-[#5B5FFF]/50 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <input 
                type="password" 
                placeholder="Password"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#050816] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#5B5FFF]/50 focus:ring-1 focus:ring-[#5B5FFF]/50 transition-all"
              />
            </div>

            <FunctionalButton 
              type="submit"
              className="w-full bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF] text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(91,95,255,0.4)] transition-transform hover:scale-[1.02] mt-4 flex items-center justify-center gap-2"
              loadingMessage="Creating your account..."
              successMessage="Welcome to Business Brain!"
              onClick={handleRegister}
            >
              Sign Up <ArrowRight size={18} />
            </FunctionalButton>

          </form>

          <p className="text-center mt-6 text-sm text-[#94A3B8]">
            Already have an account? <Link to="/login" className="text-[#00D4FF] hover:underline font-bold">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
