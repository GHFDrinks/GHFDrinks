"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwipeSlideNavigatorProps {
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  children: React.ReactNode;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function SwipeSlideNavigator({ currentIndex, totalSlides, onNext, onPrev, children }: SwipeSlideNavigatorProps) {
  const [[page, direction], setPage] = useState([currentIndex, 0]);

  if (currentIndex !== page) {
    setPage([currentIndex, currentIndex > page ? 1 : -1]);
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const paginate = (newDirection: number) => {
    if (newDirection === 1 && currentIndex < totalSlides - 1) {
      onNext();
    } else if (newDirection === -1 && currentIndex > 0) {
      onPrev();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black touch-pan-y">
      <div 
        className="absolute top-0 left-0 w-24 h-full z-40 hidden md:block" 
        onClick={() => paginate(-1)} 
      />
      <div 
        className="absolute top-0 right-0 w-24 h-full z-40 hidden md:block" 
        onClick={() => paginate(1)} 
      />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 right-12 z-50 flex items-center space-x-4 pointer-events-none md:pointer-events-auto">
        <button 
          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
          disabled={currentIndex === 0}
          className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none pointer-events-auto active:scale-95"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); paginate(1); }}
          disabled={currentIndex === totalSlides - 1}
          className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none pointer-events-auto active:scale-95"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
