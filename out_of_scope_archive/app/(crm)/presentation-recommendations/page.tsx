"use client";

import React from "react";
import { Sparkles, ArrowRight, Presentation, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PresentationRecommendationsPage() {
  const proactiveSuggestions = [
    {
      id: 1,
      title: "Summer Terrace Activation Pitch",
      reasoning: "High engagement from 4 luxury hotels requesting outdoor serve solutions.",
      brands: ["Maison Mirabeau", "Double Dutch", "Sapling Spirits"],
      targetClients: 12,
      confidence: 94
    },
    {
      id: 2,
      title: "Low-ABV Cocktail Menu Refresh",
      reasoning: "Trending category in premium restaurants. Everleaf engagement up 24%.",
      brands: ["Everleaf", "Double Dutch"],
      targetClients: 8,
      confidence: 88
    },
    {
      id: 3,
      title: "Sustainable Spirits Gifting",
      reasoning: "Approaching Q4 corporate gifting planning cycle.",
      brands: ["Sapling Spirits"],
      targetClients: 15,
      confidence: 91
    }
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2 flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-accent" />
            <span>Proactive Curation</span>
          </h1>
          <p className="text-muted-foreground font-light text-lg">AI-generated presentation strategies based on portfolio trends.</p>
        </div>
        <Link href="/ai-assistant">
          <button className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>Launch AI Builder</span>
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proactiveSuggestions.map((suggestion, index) => (
          <motion.div 
            key={suggestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs font-medium uppercase tracking-widest text-accent flex items-center">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  {suggestion.confidence} Score
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3">{suggestion.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{suggestion.reasoning}</p>
              
              <div className="space-y-2 mb-8">
                <h4 className="text-xs font-medium uppercase tracking-widest text-white/40">Suggested Portfolio</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestion.brands.map(brand => (
                    <span key={brand} className="px-2.5 py-1 bg-black/40 border border-white/5 rounded-lg text-xs font-medium text-white/80">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center space-x-2 text-sm text-white/50">
                <Users className="w-4 h-4" />
                <span>{suggestion.targetClients} Targets</span>
              </div>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-accent" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
