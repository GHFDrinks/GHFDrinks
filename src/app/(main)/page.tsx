"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Wine, MapPin, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useBrands } from "@/hooks/useBrands";
import { Brand } from "@/types/brand";

interface HomeActivation {
  id: string;
  brandName: string;
  title: string;
  date: string;
  location: string;
}

export default function Home() {
  const { brands, loading } = useBrands();
  const [activations, setActivations] = useState<HomeActivation[]>([]);

  useEffect(() => {
    if (brands.length > 0) {
      // Extract upcoming activations
      const list: HomeActivation[] = [];
      brands.forEach(brand => {
        if (brand.activations) {
          brand.activations.forEach(act => {
            list.push({
              id: act.id || Math.random().toString(),
              brandName: brand.name,
              title: act.title,
              date: act.date,
              location: act.location
            });
          });
        }
      });
      setActivations(list.slice(0, 3)); // show top 3
    }
  }, [brands]);

  if (loading && brands.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] rounded-[2rem] overflow-hidden flex items-end p-12 group">
        <div className="absolute inset-0 bg-black">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center space-x-3 mb-6"
          >
            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest font-medium">
              New Collection
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-tight"
          >
            The Art of <br />
            <span className="font-serif italic text-white/90">Hospitality.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg lg:text-xl text-white/70 max-w-xl mb-10 font-light"
          >
            Discover our curated portfolio of premium spirits, fine wines, and exceptional experiences designed for the world's finest venues.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center space-x-6"
          >
            <Link href="/brands">
              <button className="h-14 px-8 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors flex items-center space-x-2">
                <span>Explore Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <button className="h-14 w-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors group/play">
              <Play className="w-5 h-5 text-white ml-1 group-hover/play:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-light tracking-tight mb-3">Featured Portfolios</h2>
            <p className="text-muted-foreground text-lg">Our premier selections for the season.</p>
          </div>
          <Link href="/brands" className="text-sm uppercase tracking-widest text-accent hover:text-white transition-colors flex items-center space-x-2">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <Link href={`/brands/${brand.slug}`}>
                <div className="relative h-[300px] rounded-3xl overflow-hidden mb-6">
                  <img
                    src={brand.heroImage.url}
                    alt={brand.heroImage.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </div>
                <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">{brand.category}</span>
                <h3 className="text-2xl font-light mb-2">{brand.name}</h3>
                <p className="text-muted-foreground line-clamp-2 font-light">{brand.tagline}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Activations widget */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-light tracking-tight mb-3">Upcoming Activations</h2>
            <p className="text-muted-foreground text-lg">Key events and brand moments.</p>
          </div>
          <Link href="/activations" className="text-sm uppercase tracking-widest text-accent hover:text-white transition-colors flex items-center space-x-2">
            <span>View Calendar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {activations.length === 0 ? (
          <div className="rounded-3xl border border-white/5 bg-black/25 p-8 text-center text-white/40 italic">
            No upcoming activations scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activations.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                className="glass p-8 rounded-3xl group cursor-pointer hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                    <Wine className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{act.date}</span>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">{act.brandName}</span>
                <h4 className="text-xl font-medium mb-3 text-white">{act.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-4 border-t border-white/5">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{act.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
