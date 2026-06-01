"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronRight, Mic, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SalesCopilotPanelProps {
  currentContext?: string; // Information about the current slide/brand
  onClose?: () => void;
  isVoiceActive?: boolean;
  onToggleVoice?: () => void;
}

export function SalesCopilotPanel({ 
  currentContext = "Maison Mirabeau - Tasting Notes", 
  onClose,
  isVoiceActive,
  onToggleVoice 
}: SalesCopilotPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const recommendations = [
    { type: "insight", icon: Lightbulb, text: "Client mentioned sustainability interest last meeting. Highlight B-Corp status.", color: "text-amber-400" },
    { type: "upsell", icon: TrendingUp, text: "Perfect time to pitch the Summer Riviera Activation package.", color: "text-green-400" },
    { type: "objection", icon: AlertTriangle, text: "If price is mentioned, emphasize the superior liquid-to-glass cost ratio.", color: "text-red-400" },
  ];

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-32 right-12 z-[60] w-14 h-14 rounded-full bg-accent text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
      )}

      {/* Copilot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-32 right-12 w-96 max-w-[calc(100vw-3rem)] z-[60] bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="font-medium tracking-wide text-white">Sales Copilot</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onToggleVoice}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    isVoiceActive ? "bg-accent/20 text-accent" : "text-white/40 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Context Awareness */}
            <div className="px-5 py-3 bg-accent/5 border-b border-white/5">
              <div className="text-[10px] uppercase tracking-widest text-accent/70 font-medium mb-1">Current Context</div>
              <div className="text-sm text-white/90 truncate">{currentContext}</div>
            </div>

            {/* Recommendations */}
            <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Live Intelligence</div>
              
              <div className="space-y-3">
                {recommendations.map((rec, i) => {
                  const Icon = rec.icon;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-4 group hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="mt-0.5">
                        <Icon className={`w-4 h-4 ${rec.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white/80 leading-relaxed font-light">{rec.text}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Voice Status Indicator */}
              <AnimatePresence>
                {isVoiceActive && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center space-x-3 p-4 rounded-2xl bg-accent/10 border border-accent/20"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                    <span className="text-sm text-accent font-medium">Listening for commands...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
