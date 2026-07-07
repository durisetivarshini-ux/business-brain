import React from "react";
import { cn } from "@/lib/utils";

export function Avatar({ name, src, size = "md", className }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const initials = name?.split(" ").map(n => n[0]).join("").substring(0, 2) || "?";

  return (
    <div className={cn("relative rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold shadow-sm shrink-0", sizes[size], className)}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
