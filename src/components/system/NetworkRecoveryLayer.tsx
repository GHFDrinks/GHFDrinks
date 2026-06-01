"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

export function NetworkRecoveryLayer() {
  const [isRecovering, setIsRecovering] = useState(false);

  useEffect(() => {
    // Listen for custom 'ghf:network-recovery' events dispatched by API wrappers
    const handleRecovery = (e: CustomEvent) => {
      setIsRecovering(e.detail.isRecovering);
    };

    window.addEventListener("ghf:network-recovery" as any, handleRecovery);
    return () => window.removeEventListener("ghf:network-recovery" as any, handleRecovery);
  }, []);

  return (
    <AnimatePresence>
      {isRecovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-4 py-2 rounded-full bg-accent text-accent-foreground shadow-2xl"
        >
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-xs font-medium tracking-widest uppercase">Reconnecting...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
