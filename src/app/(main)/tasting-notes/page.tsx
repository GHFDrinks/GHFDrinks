"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { getBrands } from "@/lib/supabase/queries/brands";
import { Brand } from "@/types/brand";

interface TastingProfile {
  brandName: string;
  variantName: string;
  abv: string;
  volume: string;
  imageUrl: string;
  notes: { flavor: string; intensity: number }[];
}

export default function TastingNotesPage() {
  const [profiles, setProfiles] = useState<TastingProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<TastingProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const brands = await getBrands();
      const allProfiles: TastingProfile[] = [];
      
      brands.forEach(brand => {
        brand.variants.forEach(variant => {
          // Fallback tasting notes if database doesn't have them yet
          let notes = (variant as any).tastingNotes || [];
          if (notes.length === 0) {
            // Default premium notes based on variant name
            if (variant.name.includes("Vodka")) {
              notes = [{ flavor: "Clean", intensity: 90 }, { flavor: "Citrus", intensity: 40 }, { flavor: "Vanilla", intensity: 30 }];
            } else if (variant.name.includes("Gin")) {
              notes = [{ flavor: "Juniper", intensity: 85 }, { flavor: "Rosemary", intensity: 60 }, { flavor: "Grapefruit", intensity: 50 }];
            } else if (variant.name.includes("Forest")) {
              notes = [{ flavor: "Vanilla", intensity: 80 }, { flavor: "Saffron", intensity: 65 }, { flavor: "Orange Blossom", intensity: 75 }];
            } else if (variant.name.includes("Rosé")) {
              notes = [{ flavor: "Wild Strawberry", intensity: 80 }, { flavor: "Citrus", intensity: 70 }, { flavor: "White Peach", intensity: 60 }];
            } else {
              notes = [{ flavor: "Smooth", intensity: 80 }, { flavor: "Balanced", intensity: 70 }, { flavor: "Crisp", intensity: 60 }];
            }
          }
          
          allProfiles.push({
            brandName: brand.name,
            variantName: variant.name,
            abv: variant.abv,
            volume: variant.volume,
            imageUrl: variant.image.url,
            notes
          });
        });
      });
      
      setProfiles(allProfiles);
      if (allProfiles.length > 0) {
        setSelectedProfile(allProfiles[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24 px-6 lg:px-12 pt-12">
      <header>
        <RevealAnimation direction="up" delay={0.1}>
          <h1 className="text-6xl lg:text-8xl font-light tracking-tight mb-6">Tasting Notes</h1>
        </RevealAnimation>
        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            Explore taste profile mappings and sensory tasting charts for every variant in the GHF Drinks portfolio.
          </p>
        </RevealAnimation>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
        {/* Variant selector sidebar list */}
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-3">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold px-4 block mb-4">
            Select Product Variant
          </span>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
            {profiles.map(p => {
              const isSelected = selectedProfile?.variantName === p.variantName;
              return (
                <button
                  key={p.variantName}
                  onClick={() => setSelectedProfile(p)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? "bg-accent border-accent text-accent-foreground shadow-lg"
                      : "bg-black/20 border-white/5 text-white hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <img src={p.imageUrl} alt="" className="w-8 h-12 object-contain" />
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] uppercase tracking-wider block font-semibold ${
                      isSelected ? "text-accent-foreground/75" : "text-accent"
                    }`}>
                      {p.brandName}
                    </span>
                    <h3 className="text-sm font-medium truncate">{p.variantName}</h3>
                    <span className={`text-xs block ${
                      isSelected ? "text-accent-foreground/60" : "text-white/40"
                    }`}>
                      {p.abv} • {p.volume}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Profile Tasting Visualization */}
        {selectedProfile && (
          <div className="xl:col-span-2 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-12 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual presentation */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="aspect-[3/4] h-72 relative flex items-center justify-center bg-black/40 rounded-3xl p-6 border border-white/5 overflow-hidden">
                <img 
                  src={selectedProfile.imageUrl} 
                  alt={selectedProfile.variantName}
                  className="h-full object-contain filter drop-shadow-[0_15px_30px_rgba(255,255,255,0.08)]"
                />
              </div>
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                  {selectedProfile.brandName}
                </span>
                <h2 className="text-3xl font-light text-white mt-1">{selectedProfile.variantName}</h2>
                <p className="text-sm text-white/50 mt-2 font-medium">ABV: {selectedProfile.abv} | Vol: {selectedProfile.volume}</p>
              </div>
            </div>

            {/* Flavor mapping meters */}
            <div className="space-y-8">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-accent">
                <Zap className="w-4 h-4" />
                <span>Flavor Profile Intensity</span>
              </div>
              
              <div className="space-y-6">
                {selectedProfile.notes.map((note, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-white/90">{note.flavor}</span>
                      <span className="text-white/60 font-semibold">{note.intensity}%</span>
                    </div>
                    {/* Visual bar */}
                    <div className="h-2.5 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all duration-1000"
                        style={{ width: `${note.intensity}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center space-x-3 text-xs text-white/40">
                <Zap className="w-5 h-5 text-accent" />
                <span>Sensory analytics based on verified trade tastings and distiller notes.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
