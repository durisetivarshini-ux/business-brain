import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltDashboardPreview() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto perspective-[2000px] mt-16 px-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_30px_100px_-20px_rgba(0,240,255,0.15)] overflow-hidden"
      >
        {/* Glow effect that follows mouse inside the card could be added, but keeping it simple and premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        
        {/* Mock Mac Window Header */}
        <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-6 gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
        </div>

        {/* Dashboard Mock Content */}
        <div className="p-8 flex flex-col md:flex-row gap-8 h-[400px]">
          {/* Sidebar */}
          <div className="w-48 hidden md:flex flex-col gap-4 border-r border-white/5 pr-4">
            <div className="h-4 w-24 bg-white/10 rounded-full mb-4" />
            <div className="h-8 w-full bg-white/5 rounded-lg" />
            <div className="h-8 w-full bg-white/5 rounded-lg" />
            <div className="h-8 w-full bg-white/5 rounded-lg" />
            <div className="h-8 w-full bg-white/5 rounded-lg mt-auto" />
          </div>
          {/* Main Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="h-4 w-32 bg-white/10 rounded-full mb-2" />
                <div className="h-8 w-64 bg-white/20 rounded-full" />
              </div>
              <div className="h-10 w-32 bg-indigo-500/20 border border-indigo-500/30 rounded-full" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-white/[0.03] border border-white/5 rounded-xl" />
              <div className="h-24 bg-white/[0.03] border border-white/5 rounded-xl" />
              <div className="h-24 bg-white/[0.03] border border-white/5 rounded-xl" />
            </div>

            <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl w-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
