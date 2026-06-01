"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  parallax?: boolean;
}

export function ImageReveal({ src, alt, className, imageClassName, delay = 0, parallax = true }: ImageRevealProps) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
        className="absolute inset-0 z-10 bg-background"
      />
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
        className={cn("w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105", imageClassName)}
      />
    </div>
  );
}
