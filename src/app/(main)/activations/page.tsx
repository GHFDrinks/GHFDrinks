"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Calendar as CalendarIcon, MapPin, ArrowRight } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { getBrands } from "@/lib/supabase/queries/brands";
import { Brand } from "@/types/brand";

interface ActivationItem {
  brandName: string;
  brandSlug: string;
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'upcoming' | 'past';
  image: { url: string; alt: string };
}

export default function ActivationsPage() {
  const [activations, setActivations] = useState<ActivationItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const brands = await getBrands();
      const allActivations: ActivationItem[] = [];
      
      brands.forEach(brand => {
        if (brand.activations) {
          brand.activations.forEach(act => {
            allActivations.push({
              brandName: brand.name,
              brandSlug: brand.slug,
              id: act.id || Math.random().toString(),
              title: act.title,
              date: act.date,
              location: act.location,
              description: act.description,
              type: act.type,
              image: act.image
            });
          });
        }
      });
      
      setActivations(allActivations);
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = activations.filter(act => {
    if (filter === 'all') return true;
    return act.type === filter;
  });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24 px-6 lg:px-12 pt-12">
      <header className="flex flex-col space-y-6 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
        <div>
          <RevealAnimation direction="up" delay={0.1}>
            <h1 className="text-6xl lg:text-8xl font-light tracking-tight mb-6">GHF Activations</h1>
          </RevealAnimation>
          <RevealAnimation direction="up" delay={0.2}>
            <p className="text-2xl lg:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
              Explore custom GHF activation projects, from urban forestry to summer beach terrace takeovers.
            </p>
          </RevealAnimation>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md self-start lg:self-auto">
          {['all', 'upcoming', 'past'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === type
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="py-24 text-center border border-white/10 rounded-3xl bg-white/5">
          <p className="text-xl text-white/50 font-light">No activations found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filtered.map((act, i) => (
            <RevealAnimation key={act.id} direction="up" delay={0.3 + (i * 0.1)}>
              <div className="group rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden flex flex-col h-full hover:border-accent/30 transition-colors">
                <div className="aspect-[16/9] w-full relative overflow-hidden">
                  <img 
                    src={act.image.url} 
                    alt={act.image.alt}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                  <span className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border backdrop-blur-md ${
                    act.type === 'upcoming'
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-white/10 text-white/80 border-white/15"
                  }`}>
                    {act.type === 'upcoming' ? 'Upcoming' : 'Past Case Study'}
                  </span>
                </div>
                
                <div className="p-10 flex-1 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-medium uppercase tracking-widest text-accent">
                      <span>{act.brandName}</span>
                    </div>
                    <h3 className="text-3xl font-light text-white">{act.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{act.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2 text-white/50 text-sm">
                        <CalendarIcon className="w-4 h-4 text-accent" />
                        <span>{act.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/50 text-sm">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{act.location}</span>
                      </div>
                    </div>
                    
                    <Link href={`/brands/${act.brandSlug}`}>
                      <button className="flex items-center space-x-2 text-xs uppercase tracking-wider text-accent font-semibold hover:text-white transition-colors">
                        <span>Brand Story</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      )}
    </div>
  );
}
