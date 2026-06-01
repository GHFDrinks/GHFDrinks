"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Target, Presentation, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ClientRecommendationsPage({ params }: { params: Promise<{ id: string }> }) {
  // Mock data for prototype
  const client = {
    id: "1",
    name: "The Ritz London",
    tier: "Platinum",
  };

  const recommendations = [
    {
      title: "Sustainable Spirits Refresh",
      matchScore: 98,
      reason: "Client engages heavily with sustainable messaging. Sapling Spirits aligns perfectly with their Q3 goals.",
      brands: ["Sapling Spirits"]
    },
    {
      title: "Premium Zero-Proof Selection",
      matchScore: 85,
      reason: "Searched for 'non-alcoholic' twice in the portal last week.",
      brands: ["Everleaf"]
    }
  ];

  return (
    <div className="space-y-8 pb-24 max-w-5xl">
      <header className="flex items-center space-x-6 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10 py-6 border-b border-white/5 -mx-8 px-8 lg:-mx-12 lg:px-12">
        <Link href={`/clients/${client.id}`}>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-light tracking-tight flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-accent" />
            <span>AI Curation for {client.name}</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium mt-1">Contextual intelligence based on recent engagement</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {recommendations.map((rec, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs font-medium uppercase tracking-widest text-accent flex items-center">
                  <Target className="w-3 h-3 mr-1.5" />
                  {rec.matchScore} Match Score
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3">{rec.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{rec.reason}</p>
              
              <div className="space-y-2 mb-8">
                <h4 className="text-xs font-medium uppercase tracking-widest text-white/40">Suggested Portfolio</h4>
                <div className="flex flex-wrap gap-2">
                  {rec.brands.map(brand => (
                    <span key={brand} className="px-2.5 py-1 bg-black/40 border border-white/5 rounded-lg text-xs font-medium text-white/80">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-white transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
              <Presentation className="w-4 h-4" />
              <span>Generate Presentation</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
