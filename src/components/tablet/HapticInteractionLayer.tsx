"use client";

import React from "react";

interface HapticInteractionLayerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  as?: any;
  onClick?: (e: React.MouseEvent) => void;
}

export function HapticInteractionLayer({ 
  children, 
  className = "", 
  intensity = "light",
  as: Component = "button",
  onClick,
  ...props 
}: HapticInteractionLayerProps) {
  
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      switch (intensity) {
        case "light":
          navigator.vibrate(10);
          break;
        case "medium":
          navigator.vibrate(30);
          break;
        case "heavy":
          navigator.vibrate([40, 20, 40]);
          break;
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    triggerHaptic();
    if (onClick) onClick(e);
  };

  return (
    <Component 
      onClick={handleClick} 
      className={`touch-manipulation ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
