import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Bot, Activity } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { InitializationScreen } from '../../components/common/InitializationScreen';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showInit, setShowInit] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const enterDashboard = () => {
    setShowInit(true);
    setTimeout(() => navigate('/app'), 2000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      enterDashboard();
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Email is already registered');
      } else if (err.code === 'auth/weak-password') {
        toast.error('Password is too weak');
      } else {
        toast.error(err.message || 'Registration failed');
      }
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success('Welcome!');
      enterDashboard();
    } catch (err) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error(err.message || 'Google Sign-In failed');
      }
    }
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
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Logo size={32} />
          <span className="font-display font-bold text-xl text-white tracking-tight">Business Brain</span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md perspective-1000">
            <motion.div 
              initial={{ rotateY: -15, rotateX: 10, y: 50, opacity: 0 }}
              animate={{ rotateY: 0, rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full bg-[#050816]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_50px_rgba(91,95,255,0.2)] relative z-20"
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wider">New Identity</h3>
                    <p className="text-xs text-[#94A3B8]">Establishing Profile...</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                </div>
                <div className="h-2 w-2/3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.7 }} className="h-full bg-gradient-to-r from-[#5B5FFF] to-[#00D4FF]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 mt-8">
          <h2 className="font-display text-4xl font-bold tracking-tight text-white mb-4">
            Join the future.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">Unlock intelligence.</span>
          </h2>
          <p className="text-[#94A3B8] text-sm max-w-md leading-relaxed">
            Create your account to access the ultimate business command center powered by advanced AI.
          </p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* RIGHT SIDE: The Gateway (Register Form) */}
      {/* ======================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative z-20 overflow-y-auto">
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm relative z-10 my-auto"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <Logo size={32} />
            <span className="font-display font-bold text-xl text-gray-900 tracking-tight">Business Brain</span>
          </div>

          <div className="mb-6">
            <h1 className="text-[32px] font-bold text-gray-900 mb-2">Create an account</h1>
            <p className="text-gray-500 text-[15px]">Enter your details to get started.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Name Input */}
            <div className="space-y-1.5 relative">
              <label className="text-[14px] font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 text-[15px] focus:outline-none focus:border-[#6B46C1] focus:ring-1 focus:ring-[#6B46C1] transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5 relative">
              <label className="text-[14px] font-medium text-gray-700">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 text-[15px] focus:outline-none focus:border-[#6B46C1] focus:ring-1 focus:ring-[#6B46C1] transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 relative">
              <label className="text-[14px] font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 text-gray-900 text-[15px] focus:outline-none focus:border-[#6B46C1] focus:ring-1 focus:ring-[#6B46C1] transition-all"
                  placeholder="Create a password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#6B46C1]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1.5 relative">
              <label className="text-[14px] font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 text-gray-900 text-[15px] focus:outline-none focus:border-[#6B46C1] focus:ring-1 focus:ring-[#6B46C1] transition-all"
                  placeholder="Confirm your password"
                  minLength={6}
                />
              </div>
            </div>

            {/* Register Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-2 py-2.5 bg-[#6B46C1] hover:bg-[#553C9A] text-white rounded-lg font-medium text-[15px] transition-colors flex justify-center items-center shadow-md shadow-[#6B46C1]/20"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                'Create account'
              )}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or sign up with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-[15px] transition-colors flex justify-center items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </button>
            
          </form>

          <div className="mt-6 text-center">
            <p className="text-[14px] text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#6B46C1] hover:underline">Sign in</Link>
            </p>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
