"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Calendar as CalendarIcon, MapPin, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { getBrands } from "@/lib/supabase/queries/brands";
import { Brand } from "@/types/brand";

interface CalendarEvent {
  id: string;
  title: string;
  brandName: string;
  brandCategory: string;
  dateStr: string; // e.g., "October 2026"
  month: number;   // 0-11
  year: number;
  location: string;
  description: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(9); // Default to October (has planting)

  useEffect(() => {
    async function loadEvents() {
      const brands = await getBrands();
      const loaded: CalendarEvent[] = [];
      
      brands.forEach(brand => {
        if (brand.activations) {
          brand.activations.forEach(act => {
            // Parse date string like "October 2026" or "January 2027"
            let month = 0;
            let year = 2026;
            
            const parts = act.date.split(" ");
            if (parts.length === 2) {
              const mIdx = MONTH_NAMES.findIndex(m => m.toLowerCase() === parts[0].toLowerCase());
              if (mIdx !== -1) month = mIdx;
              const yNum = parseInt(parts[1]);
              if (!isNaN(yNum)) year = yNum;
            }
            
            loaded.push({
              id: act.id || Math.random().toString(),
              title: act.title,
              brandName: brand.name,
              brandCategory: brand.category,
              dateStr: act.date,
              month,
              year,
              location: act.location,
              description: act.description
            });
          });
        }
      });
      
      setEvents(loaded);
      setLoading(false);
    }
    loadEvents();
  }, []);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const activeEvents = events.filter(e => e.month === selectedMonth && e.year === selectedYear);

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
          <h1 className="text-6xl lg:text-8xl font-light tracking-tight mb-6">Activation Calendar</h1>
        </RevealAnimation>
        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            Track seasonal activation milestones and campaign dates across our entire beverage portfolio.
          </p>
        </RevealAnimation>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
        {/* Calendar Picker Card */}
        <div className="xl:col-span-2 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-10 backdrop-blur-md space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-white">
              {MONTH_NAMES[selectedMonth]} <span className="text-accent font-semibold">{selectedYear}</span>
            </h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevMonth}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={handleNextMonth}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Month grid layout */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {MONTH_NAMES.map((m, idx) => {
              const hasEvents = events.some(e => e.month === idx && e.year === selectedYear);
              const isSelected = selectedMonth === idx;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(idx)}
                  className={`relative p-5 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? "bg-accent border-accent text-accent-foreground font-semibold"
                      : "bg-black/25 border-white/5 text-white hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span className="text-sm block">{m.slice(0, 3)}</span>
                  {hasEvents && (
                    <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-accent-foreground" : "bg-accent"
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Year selector */}
          <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Select Year:</span>
            {[2026, 2027].map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                  selectedYear === y
                    ? "bg-white/10 border-white/20 text-white"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Month Activations Panel */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
            Activations in {MONTH_NAMES[selectedMonth]} {selectedYear}
          </h3>
          
          {activeEvents.length === 0 ? (
            <div className="rounded-[2rem] border border-white/5 bg-black/25 p-8 text-center text-white/40 italic">
              No activations scheduled for this month.
            </div>
          ) : (
            <div className="space-y-6">
              {activeEvents.map(e => (
                <div key={e.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 space-y-6 hover:border-accent/25 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-accent/15 border border-accent/25 rounded-full text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {e.brandCategory}
                    </span>
                    <span className="text-xs text-white/50 font-medium">{e.brandName}</span>
                  </div>
                  <h4 className="text-2xl font-light text-white leading-snug">{e.title}</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{e.description}</p>
                  
                  <div className="flex items-center space-x-2 text-xs text-white/60 pt-4 border-t border-white/5">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{e.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
