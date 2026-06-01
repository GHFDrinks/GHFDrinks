"use client";

import React from "react";
import Link from "next/link";
import { Plus, Play, FileText, Trash2, ArrowRight, Zap } from "lucide-react";
import { usePresentationStore } from "@/lib/presentation-store";
import { PRESENTATION_TEMPLATES } from "@/types/presentation";
import { RevealAnimation } from "@/components/experience/RevealAnimation";

export default function PresentationsPage() {
  const { savedPresentations, deletePresentation, isSyncing } = usePresentationStore();

  return (
    <div className="space-y-16 pb-24 px-6 lg:px-12 pt-12">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
          <RevealAnimation direction="up" delay={0.1}>
            <div className="flex items-center space-x-4 mb-8">
              <h1 className="text-6xl lg:text-8xl font-light tracking-tight">Presentations</h1>
              {isSyncing && (
                <span className="flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-widest text-accent">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Syncing Cloud</span>
                </span>
              )}
            </div>
          </RevealAnimation>
          <RevealAnimation direction="up" delay={0.2}>
            <p className="text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl leading-relaxed">
              Build, manage, and present your bespoke brand portfolios to clients in an immersive, offline-first environment.
            </p>
          </RevealAnimation>
        </div>
        <RevealAnimation direction="left" delay={0.3}>
          <Link href="/presentations/new">
            <button className="h-16 px-10 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-3 text-lg">
              <Plus className="w-6 h-6" />
              <span>New Presentation</span>
            </button>
          </Link>
        </RevealAnimation>
      </header>

      {/* Saved Presentations */}
      {savedPresentations.length > 0 && (
        <section>
          <RevealAnimation direction="up" delay={0.3}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-8">Your Saved Decks</h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedPresentations.map((pres, idx) => (
              <RevealAnimation key={pres.id} direction="up" delay={0.4 + (idx * 0.1)}>
                <div className="glass p-10 rounded-[2.5rem] relative group overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="flex justify-between items-start mb-16 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                      <FileText className="w-6 h-6 text-white/80" />
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        deletePresentation(pres.id);
                      }}
                      className="p-3 hover:bg-red-500/20 text-white/40 hover:text-red-400 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-light mb-3">{pres.name}</h3>
                    <p className="text-lg text-muted-foreground mb-8 font-serif italic">
                      {pres.brands.length} Brands • {pres.slides.length} Slides
                    </p>
                    
                    <div className="flex space-x-4">
                      <Link href={`/present-mode/${pres.id}`} className="flex-1">
                        <button className="w-full py-4 rounded-full bg-accent text-accent-foreground font-medium flex items-center justify-center space-x-2 hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 text-lg">
                          <Play className="w-5 h-5 fill-current" />
                          <span>Present</span>
                        </button>
                      </Link>
                      <Link href={`/immersive/${pres.id}`} className="flex-1">
                        <button className="w-full py-4 rounded-full bg-white/10 text-white font-medium flex items-center justify-center space-x-2 hover:bg-white/20 transition-transform hover:scale-105 active:scale-95 text-lg border border-white/20">
                          <Zap className="w-5 h-5" />
                          <span>Immersive</span>
                        </button>
                      </Link>
                      <Link href={`/presentations/new?edit=${pres.id}`}>
                        <button className="h-full px-8 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-lg">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </section>
      )}

      {/* Templates */}
      <section>
        <RevealAnimation direction="up" delay={0.5}>
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-8">Curated Templates</h2>
        </RevealAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRESENTATION_TEMPLATES.map((template, idx) => (
            <RevealAnimation key={template.id} direction="up" delay={0.6 + (idx * 0.1)}>
              <Link href={`/presentations/new?template=${template.id}`}>
                <div className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors h-full flex flex-col group">
                  <div className="mb-12">
                    <h3 className="text-3xl font-light mb-4">{template.name}</h3>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed">{template.description}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm tracking-widest uppercase text-white/50 font-medium">
                      {template.brandSlugs.length} Brands
                    </span>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </RevealAnimation>
          ))}
        </div>
      </section>
    </div>
  );
}
