"use client";

import React from "react";
import { motion } from "framer-motion";
import { SupportPackage } from "@/types/brand";
import { CheckCircle2 } from "lucide-react";

export function SupportPackageSection({ packages }: { packages: SupportPackage[] }) {
  if (!packages?.length) return null;

  return (
    <section className="py-24 border-t border-white/5">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-light tracking-tight mb-4">Partner Support</h2>
        <p className="text-xl text-muted-foreground font-light">Elevate your venue with our dedicated support and activation packages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {packages.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="p-8 rounded-[2rem] border border-white/10 bg-[var(--background)]/[0.02] hover:bg-[var(--background)]/[0.04] transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              {/* Optional background watermarks */}
            </div>
            <div className="mb-8 relative z-10">
              <span className="text-accent text-sm font-medium tracking-widest uppercase mb-2 block">{pkg.tier}</span>
              <h3 className="text-3xl font-light mb-4">{pkg.title}</h3>
              {pkg.investment && (
                <p className="text-2xl font-serif italic text-muted-foreground">{pkg.investment}</p>
              )}
            </div>

            <ul className="space-y-4 relative z-10">
              {pkg.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start text-white/80 font-light">
                  <CheckCircle2 className="w-5 h-5 text-accent mr-4 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-12 relative z-10">
              <button className="w-full py-4 rounded-full border border-white/20 hover:bg-[var(--background)] text-white hover:text-black transition-colors font-medium">
                Inquire Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
