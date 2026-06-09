"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";

export function SessionRecovery() {
  const [hasUnsavedWork, setHasUnsavedWork] = useState(false);

  useEffect(() => {
    // Check for unsaved form drafts in localStorage (simulated here)
    const draft = localStorage.getItem("ghf_admin_draft");
    if (draft) {
      setHasUnsavedWork(true);
    }
  }, []);

  const handleRecover = () => {
    // Navigate to the draft recovery page or reload state
    setHasUnsavedWork(false);
  };

  const handleDiscard = () => {
    localStorage.removeItem("ghf_admin_draft");
    setHasUnsavedWork(false);
  };

  return (
    <AnimatePresence>
      {hasUnsavedWork && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 flex items-center p-4 bg-[var(--background)] text-black rounded-2xl shadow-2xl space-x-4 max-w-sm"
        >
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <Save className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">Unsaved Draft Found</h4>
            <p className="text-xs text-black/60">Would you like to recover your last session?</p>
          </div>
          <div className="flex items-center space-x-2 border-l border-black/10 pl-4">
            <button 
              onClick={handleRecover}
              className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-black/80 transition-colors"
            >
              Recover
            </button>
            <button 
              onClick={handleDiscard}
              className="p-1.5 hover:bg-black/5 rounded-lg text-black/40 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
