"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { getBrands } from "@/lib/supabase/queries/brands";
import { Brand } from "@/types/brand";

export default function WinesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBrands() {
      const data = await getBrands();
      const filtered = data.filter(b => b.category.toLowerCase().includes("wine"));
      setBrands(filtered);
      setLoading(false);
    }
    loadBrands();
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
      <header className="flex flex-col space-y-4">
        <Link href="/brands" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-accent transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
        <RevealAnimation direction="up" delay={0.1}>
          <h1 className="text-6xl lg:text-8xl font-light tracking-tight">Wines</h1>
        </RevealAnimation>
        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl font-light leading-relaxed">
            Discover our collection of premium and fine wines, expressing the unique characteristics of their regions.
          </p>
        </RevealAnimation>
      </header>
      
      {brands.length === 0 ? (
        <div className="py-24 text-center border border-white/10 rounded-3xl bg-white/5">
          <p className="text-xl text-white/50 font-light">No wines have been published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, i) => (
            <RevealAnimation key={brand.id} direction="up" delay={0.3 + (i * 0.1)}>
              <Link href={`/brands/${brand.slug}`}>
                <div className="group cursor-pointer rounded-[2.5rem] overflow-hidden glass aspect-[4/5] relative flex flex-col justify-end p-10">
                  <img 
                    src={brand.heroImage.url} 
                    alt={brand.heroImage.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="relative z-10">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-medium uppercase tracking-widest text-white mb-6 inline-block">
                      {brand.category}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-light mb-4 text-white drop-shadow-md">{brand.name}</h2>
                    <p className="text-white/80 font-light font-serif italic mb-8 drop-shadow-md text-xl">
                      {brand.tagline}
                    </p>
                    <div className="flex items-center space-x-3 text-sm uppercase tracking-widest text-accent font-medium group-hover:text-white transition-colors">
                      <span>View Brand</span>
                      <div className="w-8 h-8 rounded-full border border-accent/30 group-hover:border-white/30 flex items-center justify-center transition-colors">
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealAnimation>
          ))}
        </div>
      )}
    </div>
  );
}
