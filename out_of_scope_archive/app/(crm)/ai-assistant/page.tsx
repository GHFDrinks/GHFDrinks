"use client";

import React, { useState } from "react";
import { Sparkles, Building2, Calendar, Target, ArrowRight, Loader2, CheckCircle2, SlidersHorizontal, Presentation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RecommendationEngine, RecommendationResult } from "@/lib/ai/recommendation-engine";

const VENUES = ['Cocktail Bar', 'Luxury Hotel', 'Restaurant', 'Rooftop', 'Premium Retail', 'Members Club', 'Event Venue'];
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

export default function AIAssistantPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  
  // Form State
  const [venue, setVenue] = useState("");
  const [season, setSeason] = useState("Summer");
  const [tier, setTier] = useState("Platinum");

  const handleGenerate = async () => {
    setIsAnalyzing(true);
    setStep(2);
    
    const result = await RecommendationEngine.generateCuratedPitch({
      venueType: venue || 'Cocktail Bar',
      season: season as any,
      clientTier: tier as any
    });
    
    setRecommendations(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2 flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-accent" />
            <span>AI Curation Assistant</span>
          </h1>
          <p className="text-muted-foreground font-light text-lg">Generate highly relevant presentations using contextual sales intelligence.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
            <h3 className="text-xl font-medium mb-6">Contextual Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm text-white/60 mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>Venue Category</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {VENUES.slice(0, 5).map(v => (
                    <button 
                      key={v}
                      onClick={() => setVenue(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${venue === v ? 'bg-accent text-accent-foreground border-accent' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-white/60 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>Target Seasonality</span>
                </label>
                <div className="flex gap-2">
                  {SEASONS.map(s => (
                    <button 
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${season === s ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-white/60 mb-3">
                  <Target className="w-4 h-4" />
                  <span>Account Tier</span>
                </label>
                <select 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                >
                  <option value="Platinum">Platinum (High Volume / Flagship)</option>
                  <option value="Gold">Gold (Premium Regional)</option>
                  <option value="Silver">Silver (Standard)</option>
                </select>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!venue || isAnalyzing}
                className="w-full h-14 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-white transition-all active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50 mt-8"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Strategy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border border-white/5 rounded-[2rem] border-dashed"
              >
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                  <SlidersHorizontal className="w-10 h-10 text-accent/50" />
                </div>
                <h3 className="text-2xl font-light mb-2">Awaiting Context</h3>
                <p className="text-white/40 max-w-sm">Provide venue and seasonal context on the left to generate an AI-curated presentation strategy.</p>
              </motion.div>
            )}

            {step === 2 && isAnalyzing && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
                <h3 className="text-2xl font-light mb-2">Curating Intelligence</h3>
                <p className="text-white/40 max-w-sm">Cross-referencing historical engagement, {venue.toLowerCase()} trends, and {season.toLowerCase()} activations...</p>
              </motion.div>
            )}

            {step === 2 && !isAnalyzing && recommendations && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score Card */}
                <div className="flex items-center justify-between p-6 rounded-2xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-lg border border-white/10">
                      <span className="text-2xl font-light text-accent">{recommendations.confidenceScore}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">High Confidence Match</h3>
                      <p className="text-sm text-white/70">Based on 124 similar successful presentations.</p>
                    </div>
                  </div>
                  <button className="h-10 px-6 rounded-lg bg-black border border-white/10 hover:border-accent text-sm font-medium transition-colors flex items-center space-x-2">
                    <Presentation className="w-4 h-4" />
                    <span>Build Deck</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brands Panel */}
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                    <h4 className="text-sm uppercase tracking-widest font-medium text-white/50 mb-4">Recommended Brands</h4>
                    <div className="space-y-3">
                      {recommendations.brands.map((brand, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                          <span className="font-medium text-white/90">{brand}</span>
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activations Panel */}
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                    <h4 className="text-sm uppercase tracking-widest font-medium text-white/50 mb-4">Suggested Activations</h4>
                    <div className="space-y-3">
                      {recommendations.activations.map((activation, i) => (
                        <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5">
                          <span className="font-medium text-white/90 text-sm block leading-relaxed">{activation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reasoning Timeline */}
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                  <h4 className="text-sm uppercase tracking-widest font-medium text-white/50 mb-6">AI Strategic Reasoning</h4>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
                    {recommendations.reasoning.map((reason, i) => (
                      <div key={i} className="relative flex items-start group">
                        <div className="w-6 h-6 rounded-full bg-black border border-accent flex items-center justify-center shrink-0 z-10 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <p className="ml-6 text-white/80 text-sm leading-relaxed">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
