import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Modules", href: "#modules" },
    { name: "AI Copilot", href: "#copilot" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${
            scrolled ? 'bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50' : 'bg-transparent border border-transparent'
          }`}>
            
            {/* Logo */}
            <Link to="/">
              <Logo size={32} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D4FF] transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-white hover:text-[#00D4FF] transition-colors px-4 py-2">
                Login
              </Link>
              <Link to="/register">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2.5 rounded-full font-medium text-sm text-white overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#00D4FF] to-[#5B5FFF] transition-opacity duration-300" />
                  <span className="relative z-10">Start Free</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050816]/95 backdrop-blur-2xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <Logo size={32} />
              <button onClick={() => setMobileMenu(false)} className="text-white p-2">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-2xl font-display font-medium">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="text-white hover:text-[#00D4FF] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <div className="mt-auto flex flex-col gap-4 pb-12">
              <Link to="/login" onClick={() => setMobileMenu(false)} className="w-full py-4 text-center text-white border border-white/10 rounded-xl font-medium">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenu(false)} className="w-full py-4 text-center text-white bg-gradient-to-r from-[#5B5FFF] to-[#7C3AED] rounded-xl font-medium">
                Start Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
