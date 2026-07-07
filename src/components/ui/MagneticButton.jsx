import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({ children, className, variant = "primary", ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]",
    outline: "border border-white/30 text-white hover:bg-white/5",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-3 font-semibold transition-colors duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 block">{children}</span>
      {/* Glow effect on hover */}
      {variant === "primary" && (
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.button>
  );
}
