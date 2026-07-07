import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = React.forwardRef(({ 
  className = "", 
  children, 
  hover = false,
  glowColor = "rgba(91, 95, 255, 0.5)",
  ...props 
}, ref) => {
  
  const Component = hover ? motion.div : "div";
  
  const hoverProps = hover ? {
    whileHover: { y: -5 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } : {};

  return (
    <Component
      ref={ref}
      className={`relative group rounded-2xl overflow-hidden ${className}`}
      {...hoverProps}
      {...props}
    >
      {/* Background with blur */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl" />
      
      {/* Hover Gradient Glow Border */}
      {hover && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${glowColor}` }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {children}
      </div>
    </Component>
  );
});

GlassCard.displayName = "GlassCard";
