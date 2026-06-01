"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Users, Clock, ArrowRight } from "lucide-react";

export function PresentationEngagementMap() {
  const presentations = [
    { id: 1, name: "Summer Riviera Collection", plays: 842, avgTime: "12:45", completion: 88, dropoffSlide: "Logistics", trend: "+15%" },
    { id: 2, name: "Michelin Star Pairing Guide", plays: 521, avgTime: "18:20", completion: 94, dropoffSlide: "Pricing Tier", trend: "+8%" },
    { id: 3, name: "No & Low Alc Masterclass", plays: 410, avgTime: "09:15", completion: 72, dropoffSlide: "Brand History", trend: "-3%" },
    { id: 4, name: "Sustainable Spirits Initiative", plays: 305, avgTime: "14:30", completion: 81, dropoffSlide: "Support Packages", trend: "+2%" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Map Overview */}
        <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8">
          <h2 className="text-xl font-medium mb-2">Overall Engagement Flow</h2>
          <p className="text-sm text-white/40 mb-8">Average audience retention across all presentations</p>
          
          <div className="space-y-6 relative">
            <div className="absolute top-2 bottom-2 left-[15px] w-px bg-white/10 z-0" />
            
            {[
              { phase: "Introduction & Hero", retention: 100 },
              { phase: "Brand Story & Credentials", retention: 92 },
              { phase: "Signature Serves / Tasting", retention: 85 },
              { phase: "Activations & Support", retention: 78 },
              { phase: "Commercial / Pricing", retention: 65 },
            ].map((step, i) => (
              <div key={i} className="flex items-center relative z-10 space-x-6">
                <div className={`w-8 h-8 rounded-full border-4 border-black flex items-center justify-center ${i === 0 ? 'bg-white' : i === 4 ? 'bg-red-400' : 'bg-accent'}`} />
                <div className="flex-1 flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-sm font-medium text-white/80">{step.phase}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-1.5 bg-black/50 rounded-full overflow-hidden hidden sm:block">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${step.retention}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${step.retention > 80 ? 'bg-green-400' : step.retention > 70 ? 'bg-accent' : 'bg-red-400'}`}
                      />
                    </div>
                    <span className="text-sm font-mono text-white/60">{step.retention}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Presentation List */}
        <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-medium">Top Presentations</h2>
            <button className="text-xs font-medium text-accent hover:text-white uppercase tracking-widest transition-colors flex items-center">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {presentations.map((pres, i) => (
              <motion.div 
                key={pres.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-white group-hover:text-accent transition-colors">{pres.name}</h3>
                  <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">{pres.trend}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center"><Play className="w-3 h-3 mr-1.5" /> {pres.plays}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {pres.avgTime}</span>
                    <span className="flex items-center"><Users className="w-3 h-3 mr-1.5" /> {pres.completion}% Comp.</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-white/40 uppercase tracking-widest">Major Drop-off</span>
                  <span className="text-red-400">{pres.dropoffSlide}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
