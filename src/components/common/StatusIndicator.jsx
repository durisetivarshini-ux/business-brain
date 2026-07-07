import React from "react";

export function StatusIndicator({ status }) {
  const getColors = () => {
    switch(status.toLowerCase()) {
      case "active":
      case "completed":
      case "healthy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "pending":
      case "low stock":
      case "negotiating":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "out of stock":
      case "churned":
      case "critical":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-white/5 text-white/60 border-white/10";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getColors()}`}>
      {status}
    </span>
  );
}
