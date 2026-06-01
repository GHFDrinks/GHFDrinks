"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Loader2, ArrowRight, Target, Calendar, User, GlassWater, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingPrepData {
  clientType: string;
  meetingGoal: string;
  season: string;
}

export function MeetingPrepAssistant() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<MeetingPrepData>({
    clientType: "",
    meetingGoal: "",
    season: "Summer/Q3",
  });
  const [results, setResults] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setResults({
        recommendedBrands: ["Maison Mirabeau", "Everleaf"],
        talkingPoints: [
          "Highlight Mirabeau's B-Corp status for their sustainability mandate.",
          "Pitch Everleaf as the premium non-alc alternative for summer Spritz menus.",
        ],
        activations: ["Riviera Summer Terrace", "Botanical Masterclass"],
        sequence: ["Market Insights", "Maison Mirabeau Intro", "Everleaf Tasting", "Support Packages"]
      });
      setStep(3);
    }, 2500);
  };

  return (
    <div className="bg-black border border-white/10 rounded-[2rem] overflow-hidden max-w-4xl mx-auto shadow-2xl">
      <div className="p-8 border-b border-white/5 bg-accent/5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-wide">AI Meeting Prep</h2>
            <p className="text-sm text-white/50">Generate tailored portfolio strategies instantly.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-white/40">
          <span className={step >= 1 ? "text-accent" : ""}>Input Context</span>
          <span>→</span>
          <span className={step >= 2 ? "text-accent" : ""}>AI Analysis</span>
          <span>→</span>
          <span className={step >= 3 ? "text-accent" : ""}>Strategy</span>
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm text-white/50 font-medium uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4" /> Client Type
                  </label>
                  <select 
                    value={data.clientType}
                    onChange={(e) => setData({ ...data, clientType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-accent outline-none appearance-none"
                  >
                    <option value="" disabled>Select Venue Category...</option>
                    <option value="luxury_hotel">Luxury Hotel / Resort</option>
                    <option value="premium_bar">Premium Cocktail Bar</option>
                    <option value="michelin_restaurant">Fine Dining Restaurant</option>
                    <option value="private_club">Private Members Club</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm text-white/50 font-medium uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-4 h-4" /> Primary Goal
                  </label>
                  <select 
                    value={data.meetingGoal}
                    onChange={(e) => setData({ ...data, meetingGoal: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-accent outline-none appearance-none"
                  >
                    <option value="" disabled>Select Meeting Objective...</option>
                    <option value="new_listing">Secure New Brand Listing</option>
                    <option value="menu_takeover">Summer Menu Takeover</option>
                    <option value="staff_training">Staff Training & Education</option>
                    <option value="activation_pitch">Pitch Seasonal Activation</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => { setStep(2); handleGenerate(); }}
                  disabled={!data.clientType || !data.meetingGoal}
                  className="px-8 py-4 bg-white text-black rounded-full font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Strategy</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-24 flex flex-col items-center justify-center text-center space-y-6"
            >
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
              <div>
                <h3 className="text-2xl font-light mb-2">Analyzing Client Profile...</h3>
                <p className="text-white/50">Cross-referencing historical data and brand suitability.</p>
              </div>
            </motion.div>
          )}

          {step === 3 && results && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recommended Brands */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-medium uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                    <GlassWater className="w-4 h-4" /> Recommended Portfolio
                  </h4>
                  <div className="space-y-3">
                    {results.recommendedBrands.map((brand: string, i: number) => (
                      <div key={i} className="px-4 py-3 bg-black/40 rounded-xl border border-white/5 font-medium">
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activations */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-medium uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Proposed Activations
                  </h4>
                  <div className="space-y-3">
                    {results.activations.map((act: string, i: number) => (
                      <div key={i} className="px-4 py-3 bg-black/40 rounded-xl border border-white/5 font-medium">
                        {act}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strategic Talking Points */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="text-sm font-medium uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4" /> Key Strategic Angles
                </h4>
                <ul className="space-y-4">
                  {results.talkingPoints.map((point: string, i: number) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="text-white/80 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button 
                  onClick={() => setStep(1)}
                  className="text-white/50 hover:text-white transition-colors text-sm font-medium"
                >
                  Start Over
                </button>
                <button className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-medium flex items-center space-x-2 hover:bg-white transition-colors">
                  <span>Build Presentation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
