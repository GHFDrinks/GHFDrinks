"use client";

import React, { useState } from "react";
import { ImmersiveBrandStage } from "@/components/media/ImmersiveBrandStage";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Leaf, GlassWater } from "lucide-react";
import Link from "next/link";

export default function BrandStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const [activeTab, setActiveTab] = useState("heritage");

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Background layer */}
      <ImmersiveBrandStage 
        brandName="Maison Mirabeau"
        tagline="The essence of the Riviera, crafted sustainably."
        backgroundMediaUrl="https://videos.pexels.com/video-files/3191578/3191578-uhd_2560_1440_25fps.mp4"
        mediaType="video"
      >
        <div className="flex justify-center space-x-6">
          <button 
            onClick={() => setActiveTab("heritage")}
            className={`px-6 py-2.5 rounded-full backdrop-blur-md border transition-all text-sm font-medium uppercase tracking-widest ${activeTab === "heritage" ? 'bg-white text-black border-white' : 'bg-black/40 text-white border-white/20 hover:bg-white/10'}`}
          >
            Heritage
          </button>
          <button 
            onClick={() => setActiveTab("botanicals")}
            className={`px-6 py-2.5 rounded-full backdrop-blur-md border transition-all text-sm font-medium uppercase tracking-widest ${activeTab === "botanicals" ? 'bg-white text-black border-white' : 'bg-black/40 text-white border-white/20 hover:bg-white/10'}`}
          >
            Botanicals
          </button>
          <button 
            onClick={() => setActiveTab("sustainability")}
            className={`px-6 py-2.5 rounded-full backdrop-blur-md border transition-all text-sm font-medium uppercase tracking-widest ${activeTab === "sustainability" ? 'bg-white text-black border-white' : 'bg-black/40 text-white border-white/20 hover:bg-white/10'}`}
          >
            Sustainability
          </button>
        </div>
      </ImmersiveBrandStage>

      {/* Floating Info Panel */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute right-12 top-1/2 -translate-y-1/2 w-96 p-8 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem]"
        >
          {activeTab === "heritage" && (
            <div>
              <MapPin className="w-8 h-8 text-accent mb-6" />
              <h3 className="text-3xl font-light mb-4">Côtes de Provence</h3>
              <p className="text-white/70 leading-relaxed font-light">Founded by Stephen and Jeany Cronk, our vineyard is nestled in the heart of the Riviera. A deeply personal journey to create the world's most elegant pale rosés and gins.</p>
            </div>
          )}
          {activeTab === "botanicals" && (
            <div>
              <GlassWater className="w-8 h-8 text-accent mb-6" />
              <h3 className="text-3xl font-light mb-4">Riviera Botanicals</h3>
              <p className="text-white/70 leading-relaxed font-light">Infused with lemons from Menton, coriander seed, rose petals, and a touch of our signature rosé wine, creating an unmistakably Mediterranean flavor profile.</p>
            </div>
          )}
          {activeTab === "sustainability" && (
            <div>
              <Leaf className="w-8 h-8 text-accent mb-6" />
              <h3 className="text-3xl font-light mb-4">Regenerative</h3>
              <p className="text-white/70 leading-relaxed font-light">Pioneers in regenerative viticulture. We are dedicated to restoring soil health, increasing biodiversity, and reducing our carbon footprint across the entire supply chain.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <Link href="/presentations">
        <button className="absolute top-8 left-8 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-50 text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </Link>
    </div>
  );
}
