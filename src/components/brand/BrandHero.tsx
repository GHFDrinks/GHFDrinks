"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brand } from "@/types/brand";
import { ArrowDown } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";

export function BrandHero({ brand }: { brand: Brand }) {
  const { scrollY } = useScroll();
  
  // Create a cinematic parallax effect for the hero image
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative h-[90vh] lg:h-screen w-full flex flex-col justify-end overflow-hidden pb-16 lg:pb-32 px-6 lg:px-12 pt-32">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src={brand.heroImage.url}
          alt={brand.heroImage.alt}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-80" />
      </motion.div>

      <div className="relative z-10 max-w-5xl">
        <RevealAnimation direction="up" delay={0.2} duration={1}>
          <span className="text-sm tracking-widest uppercase text-accent font-medium mb-6 block">
            {brand.category}
          </span>
        </RevealAnimation>
        
        <RevealAnimation direction="up" delay={0.4} duration={1.2}>
          <h1 className="text-7xl lg:text-[9rem] font-light uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
            {brand.name}
          </h1>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.6} duration={1}>
          <p className="text-3xl lg:text-5xl font-serif italic text-white/90 drop-shadow-lg max-w-3xl">
            {brand.tagline}
          </p>
        </RevealAnimation>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-12 z-10 animate-bounce"
      >
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md">
          <ArrowDown className="w-5 h-5 text-white/70" />
        </div>
      </motion.div>
    </div>
  );
}
