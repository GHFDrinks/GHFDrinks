"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Activity } from "lucide-react";

export function AppHealthMonitor() {
  const [isOffline, setIsOffline] = useState(false);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    // Offline detection
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    setIsOffline(!navigator.onLine);

    // Basic slow network detection using Network Information API if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      const updateNetworkStatus = () => {
        setIsSlow(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      };
      connection.addEventListener('change', updateNetworkStatus);
      updateNetworkStatus();
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        connection.removeEventListener('change', updateNetworkStatus);
      };
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {(isOffline || isSlow) && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-6 py-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {isOffline ? (
            <>
              <WifiOff className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-widest uppercase text-white/90">Offline Mode Active</span>
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium tracking-widest uppercase text-white/90">Slow Connection</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
