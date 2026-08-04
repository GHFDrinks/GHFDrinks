"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw, Check } from "lucide-react";
import type { NetStatus } from "./OfflineProvider";

export function OfflineIndicator({ status }: { status: NetStatus }) {
  const visible = status !== "online";

  const config = {
    offline: {
      icon: <WifiOff className="w-4 h-4 text-white" />,
      label: "Offline — using saved copy",
    },
    syncing: {
      icon: <RefreshCw className="w-4 h-4 text-white animate-spin" />,
      label: "Reconnected — updating…",
    },
    synced: {
      icon: <Check className="w-4 h-4 text-emerald-300" />,
      label: "Up to date",
    },
    online: { icon: null, label: "" },
  }[status];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-6 py-3 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          {config.icon}
          <span className="text-sm font-medium tracking-widest uppercase text-white">
            {config.label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
