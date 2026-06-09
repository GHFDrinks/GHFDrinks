"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Grid, Film, MessageSquare, Maximize2, Settings } from "lucide-react";

export function TabletPresentationDock() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div 
        layout
        className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex items-center shadow-2xl"
      >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-[var(--background)]/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center space-x-2 overflow-hidden pl-2"
            >
              <div className="w-px h-8 bg-[var(--background)]/10 mx-2" />
              
              <button className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[var(--background)]/10 transition-colors tooltip-trigger relative group">
                <Grid className="w-5 h-5" />
                <span className="absolute -top-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">Overview</span>
              </button>
              
              <button className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[var(--background)]/10 transition-colors relative group">
                <Film className="w-5 h-5" />
                <span className="absolute -top-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">Media</span>
              </button>
              
              <button className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[var(--background)]/10 transition-colors relative group">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">Notes</span>
              </button>
              
              <div className="w-px h-8 bg-[var(--background)]/10 mx-2" />
              
              <button className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[var(--background)]/10 transition-colors relative group">
                <Settings className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
