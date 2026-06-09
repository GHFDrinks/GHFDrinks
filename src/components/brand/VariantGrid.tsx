"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrandVariant } from "@/types/brand";
import { TastingNotes } from "./TastingNotes";

export function VariantGrid({ variants }: { variants: BrandVariant[] }) {
  return (
    <section className="py-24">
      <div className="mb-16">
        <h2 className="text-4xl font-light tracking-tight mb-4">The Collection</h2>
        <p className="text-xl text-muted-foreground font-light">Explore the variants and tasting profiles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {variants.map((variant, idx) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="glass rounded-3xl p-8 flex flex-col h-full"
          >
            <div className="relative h-80 w-full mb-8 rounded-2xl overflow-hidden bg-[var(--background)]/5 flex items-center justify-center p-8">
              <img
                src={variant.image.url}
                alt={variant.image.alt}
                className="max-h-full object-contain drop-shadow-2xl"
              />
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-light">{variant.name}</h3>
                <span className="text-sm tracking-widest text-muted-foreground uppercase">
                  {variant.abv} • {variant.volume}
                </span>
              </div>
              <p className="text-muted-foreground font-light">{variant.description}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <h4 className="text-sm tracking-widest uppercase text-white/50 mb-4">Tasting Profile</h4>
              <TastingNotes notes={variant.tastingNotes} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
