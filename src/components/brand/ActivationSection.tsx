"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activation } from "@/types/brand";
import { Calendar, MapPin } from "lucide-react";

export function ActivationSection({ activations }: { activations: Activation[] }) {
  if (!activations?.length) return null;

  return (
    <section className="py-24">
      <div className="mb-16">
        <h2 className="text-4xl font-light tracking-tight mb-4">Activations & Events</h2>
        <p className="text-xl text-muted-foreground font-light">Experience the brand in person.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activations.map((activation, idx) => (
          <motion.div
            key={activation.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="group relative rounded-3xl overflow-hidden h-[400px] cursor-pointer"
          >
            <img
              src={activation.image.url}
              alt={activation.image.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium uppercase tracking-widest text-white">
                  {activation.type}
                </span>
              </div>
              <h3 className="text-3xl font-light text-white mb-3">{activation.title}</h3>
              <p className="text-white/70 font-light line-clamp-2 mb-6">{activation.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-white/60">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{activation.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{activation.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
