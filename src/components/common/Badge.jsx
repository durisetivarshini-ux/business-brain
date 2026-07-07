import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default", className, ...props }) {
  const variants = {
    default: "bg-white/10 text-white border-white/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    primary: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20",
    secondary: "bg-[#b53cff]/10 text-[#b53cff] border-[#b53cff]/20",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
