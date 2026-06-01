"use client";

import React from "react";
import { motion } from "framer-motion";

interface Collaborator {
  id: string;
  name: string;
  color: string;
}

interface PresenceIndicatorProps {
  collaborators: Collaborator[];
  maxDisplay?: number;
  className?: string;
}

export function PresenceIndicator({ collaborators, maxDisplay = 3, className = "" }: PresenceIndicatorProps) {
  if (collaborators.length === 0) return null;

  const displayUsers = collaborators.slice(0, maxDisplay);
  const remainingCount = collaborators.length - maxDisplay;

  return (
    <div className={`flex items-center -space-x-3 ${className}`}>
      {displayUsers.map((user, i) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="relative group"
          style={{ zIndex: 10 - i }}
        >
          {/* Avatar */}
          <div 
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-[#050505] shadow-sm`}
            style={{ backgroundColor: user.color }}
          >
            {user.name.charAt(0)}
          </div>
          
          {/* Online Indicator */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#050505]" />
          
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap pointer-events-none border border-white/10 z-50">
            {user.name} is active
          </div>
        </motion.div>
      ))}

      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white/70 border-2 border-[#050505] bg-white/10 backdrop-blur-md"
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
}
