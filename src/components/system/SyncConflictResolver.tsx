"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, X } from "lucide-react";

export function SyncConflictResolver() {
  const [conflict, setConflict] = useState<null | { id: string, message: string }>(null);

  useEffect(() => {
    // Custom event listener for sync conflicts triggered by the presentation store
    const handleConflict = (e: CustomEvent) => {
      setConflict(e.detail);
    };

    window.addEventListener("ghf:sync-conflict" as any, handleConflict);
    return () => window.removeEventListener("ghf:sync-conflict" as any, handleConflict);
  }, []);

  if (!conflict) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
      >
        <div className="max-w-md w-full bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Sync Conflict Detected</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {conflict.message || "A version of this presentation was modified on another device while you were offline. How would you like to resolve this?"}
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setConflict(null)}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-between text-sm transition-colors group"
                >
                  <span className="font-medium text-white/80 group-hover:text-white">Keep Local Version</span>
                  <Check className="w-4 h-4 text-white/40 group-hover:text-accent" />
                </button>
                <button 
                  onClick={() => setConflict(null)}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-between text-sm transition-colors group"
                >
                  <span className="font-medium text-white/80 group-hover:text-white">Use Cloud Version</span>
                  <Check className="w-4 h-4 text-white/40 group-hover:text-accent" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
