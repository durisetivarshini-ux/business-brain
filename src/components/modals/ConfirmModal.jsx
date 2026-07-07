import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", isDanger = false }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-6 border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">{message}</p>
            
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
                {cancelText}
              </Button>
              <Button 
                variant="primary" 
                onClick={onConfirm} 
                className={isDanger ? "bg-red-600 hover:bg-red-500 text-white" : "bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black"}
              >
                {confirmText}
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
