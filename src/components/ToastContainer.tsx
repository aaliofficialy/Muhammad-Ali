import React from "react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Info, Sparkles } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="pointer-events-auto bg-slate-950 text-white border border-gold/30 p-4 shadow-xl flex items-start space-x-3 rounded-none relative overflow-hidden"
          >
            {/* Visual Gold side-line accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />

            {/* Icon */}
            <div className="shrink-0 mt-0.5 text-gold">
              {toast.type === "success" ? (
                <CheckCircle size={16} />
              ) : toast.type === "info" ? (
                <Info size={16} />
              ) : (
                <Sparkles size={16} />
              )}
            </div>

            {/* Message */}
            <div className="flex-1">
              <span className="block text-[8px] font-mono tracking-widest uppercase text-gold font-bold">
                System Signal Alert
              </span>
              <p className="text-xs text-slate-200 mt-1 font-sans leading-relaxed">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer shrink-0 mt-0.5"
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
