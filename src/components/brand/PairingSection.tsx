"use client";

import React from "react";
import { motion } from "framer-motion";
import { Serve } from "@/types/brand";

export function PairingSection({ serves }: { serves: Serve[] }) {
  if (!serves?.length) return null;

  return (
    <section className="py-24">
      <div className="mb-16">
        <h2 className="text-4xl font-light tracking-tight mb-4">Serve Inspiration</h2>
        <p className="text-xl text-muted-foreground font-light">Perfect pairings and signature serves.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serves.map((serve, idx) => (
          <motion.div
            key={serve.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="rounded-[2rem] overflow-hidden glass"
          >
            <div className="h-64 relative">
              <img
                src={serve.image.url}
                alt={serve.image.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-light mb-6">{serve.name}</h3>
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Ingredients</h4>
                <ul className="space-y-2">
                  {serve.ingredients.map((ing, i) => (
                    <li key={i} className="text-sm font-light flex items-center before:content-[''] before:w-1 before:h-1 before:bg-accent before:rounded-full before:mr-3">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Method</h4>
                <p className="text-sm font-light text-white/80 leading-relaxed">
                  {serve.instructions}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
