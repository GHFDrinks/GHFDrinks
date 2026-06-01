"use client";

import React, { useState } from "react";
import { ChevronDown, Briefcase, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState("UK Sales Team");

  const workspaces = [
    { id: "1", name: "UK Sales Team", role: "admin" },
    { id: "2", name: "Global Key Accounts", role: "editor" },
    { id: "3", name: "Marketing & Brand", role: "viewer" },
  ];

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-accent" />
          </div>
          <div className="text-left">
            <p className="text-xs text-white/50 font-medium uppercase tracking-widest mb-0.5">Workspace</p>
            <p className="text-sm font-medium text-white">{activeWorkspace}</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws.name);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                  <div>
                    <span className="text-sm font-medium text-white block">{ws.name}</span>
                    <span className="text-xs text-white/40 capitalize">{ws.role}</span>
                  </div>
                  {activeWorkspace === ws.name && (
                    <Check className="w-4 h-4 text-accent" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-2 border-t border-white/10 bg-black/50">
              <button className="w-full flex items-center space-x-2 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group">
                <div className="w-6 h-6 rounded-md border border-dashed border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
                  <Plus className="w-3 h-3 text-white/50 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Create Workspace</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
