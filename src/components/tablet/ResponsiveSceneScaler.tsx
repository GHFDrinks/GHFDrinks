"use client";

import React, { useEffect, useState } from "react";

interface ResponsiveSceneScalerProps {
  children: React.ReactNode;
  idealWidth?: number;
  idealHeight?: number;
}

export function ResponsiveSceneScaler({ 
  children, 
  idealWidth = 1920, 
  idealHeight = 1080 
}: ResponsiveSceneScalerProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const scaleX = windowWidth / idealWidth;
      const scaleY = windowHeight / idealHeight;
      
      // Use the smaller scale to ensure the entire scene fits without cropping
      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up past 1x
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    window.addEventListener("orientationchange", calculateScale);
    
    return () => {
      window.removeEventListener("resize", calculateScale);
      window.removeEventListener("orientationchange", calculateScale);
    };
  }, [idealWidth, idealHeight]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        style={{ 
          width: idealWidth, 
          height: idealHeight, 
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-out'
        }}
        className="relative flex-shrink-0"
      >
        {children}
      </div>
    </div>
  );
}
