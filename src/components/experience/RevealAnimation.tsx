"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  amount?: number | "some" | "all";
}

export function RevealAnimation({
  children,
  delay = 0,
  duration = 0.8,
  className,
  direction = "up",
  amount = "some",
}: RevealAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getInitialOffset = () => {
    switch (direction) {
      case "up": return { y: 40, opacity: 0 };
      case "down": return { y: -40, opacity: 0 };
      case "left": return { x: 40, opacity: 0 };
      case "right": return { x: -40, opacity: 0 };
      case "none": return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: getInitialOffset(),
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1], // Custom cinematic easing
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
