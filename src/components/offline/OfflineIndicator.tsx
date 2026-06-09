"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";

export function OfflineIndicator({ isOffline }: { isOffline: boolean }) {
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-6 py-3 rounded-full bg-[var(--background)]/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <WifiOff className="w-4 h-4 text-white" />
          <span className="text-sm font-medium tracking-widest uppercase text-white">Offline Mode Ready</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
