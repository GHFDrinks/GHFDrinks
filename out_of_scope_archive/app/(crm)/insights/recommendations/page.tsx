"use client";

import React from "react";
import { Sparkles, TrendingUp, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RecommendationInsightsPage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2 flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-accent" />
            <span>AI Performance Insights</span>
          </h1>
          <p className="text-muted-foreground font-light text-lg">Analytics on recommendation success rates and engagement feedback loops.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-light mb-2">78%</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">AI Pitch Win Rate</p>
            <div className="mt-4 flex items-center text-sm text-green-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>+12% vs Manual Pitches</span>
            </div>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-light mb-2">1,240</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Curated Presentations</p>
            <div className="mt-4 flex items-center text-sm text-green-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>This Quarter</span>
            </div>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-accent/10 border border-accent/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-light mb-2 text-accent">94</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Avg Confidence Score</p>
            <div className="mt-4 flex items-center text-sm text-accent/70">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>Highly Accurate Predictions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
          <h2 className="text-xl font-medium mb-6">Top Performing AI Strategies</h2>
          <div className="space-y-4">
            {[
              { strat: "Summer Rosé Context", success: "92%" },
              { strat: "Low-ABV Cocktail Pairings", success: "88%" },
              { strat: "Sustainable Dark Spirits", success: "76%" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="font-medium text-white/90">{s.strat}</span>
                <span className="text-accent font-medium">{s.success} Win Rate</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Feedback Loop Engine</h2>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
            <div className="relative flex items-start">
              <div className="w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center shrink-0 z-10 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              <p className="ml-6 text-white/80 text-sm leading-relaxed">Adjusting weighting for "Cocktail Bars" based on recent Maison Mirabeau rejection.</p>
            </div>
            <div className="relative flex items-start">
              <div className="w-6 h-6 rounded-full bg-black border border-accent flex items-center justify-center shrink-0 z-10 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <p className="ml-6 text-white/80 text-sm leading-relaxed">Increased confidence score for "Sustainable Gifting" following 3 consecutive wins in London.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
