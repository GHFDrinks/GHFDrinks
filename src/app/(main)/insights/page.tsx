"use client";

import React from "react";
import { TrendingUp, Zap, Wine, ArrowRight } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";

const INSIGHTS = [
  {
    icon: Zap,
    tag: "Sustainability",
    title: "Eco-Conscious Spending Accelerates",
    stat: "73%",
    statLabel: "of premium consumers prioritize sustainable brands",
    description: "Modern consumers are actively choosing brands with strong environmental credentials. Sapling's one-bottle-one-tree initiative directly aligns with this growing demand, proving to be a key driver for house pours in city center venues."
  },
  {
    icon: TrendingUp,
    tag: "No & Low Alc",
    title: "The Mindful Drinking Surge",
    stat: "+34%",
    statLabel: "Volume growth in No & Low category year-on-year",
    description: "The non-alcoholic market is no longer a niche trend. High-quality botanical alternatives like Everleaf offer operators the ability to maintain premium margins on non-drinkers while delivering a sophisticated experience."
  },
  {
    icon: TrendingUp,
    tag: "Demographics",
    title: "Premiumization Among Gen Z & Millennials",
    stat: "2.4x",
    statLabel: "Higher spend per serve on craft & premium brands",
    description: "Younger LDA cohorts drink less in volume but choose higher quality when they do. Aesthetic bottles, botanical storytellings, and local sourcing are essential elements to attract this high-spending audience."
  }
];

export default function InsightsPage() {
  return (
    <div className="space-y-16 pb-24 px-6 lg:px-12 pt-12">
      <header>
        <RevealAnimation direction="up" delay={0.1}>
          <h1 className="text-6xl lg:text-8xl font-light tracking-tight mb-6">Category Insights</h1>
        </RevealAnimation>
        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            Support the sell-in story with data-driven insights on premium hospitality and beverage consumption trends.
          </p>
        </RevealAnimation>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INSIGHTS.map((item, idx) => (
          <RevealAnimation key={idx} direction="up" delay={0.3 + (idx * 0.1)}>
            <div className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-10 backdrop-blur-md flex flex-col justify-between h-full hover:border-accent/30 transition-colors">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    {item.tag}
                  </span>
                </div>
                
                <h3 className="text-2xl font-light text-white leading-snug">{item.title}</h3>
                
                {/* Big Stat Showcase */}
                <div className="py-6 border-y border-white/5 space-y-2">
                  <span className="text-5xl lg:text-6xl font-light tracking-tight text-accent block">
                    {item.stat}
                  </span>
                  <span className="text-xs text-white/50 font-medium block">
                    {item.statLabel}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 flex items-center space-x-2 text-xs text-accent font-semibold uppercase tracking-wider group-hover:text-white transition-colors cursor-pointer">
                <span>View Full Report</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </RevealAnimation>
        ))}
      </div>

      {/* Retail / Trade Strategy Tip */}
      <RevealAnimation direction="up" delay={0.6}>
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-accent/5 to-transparent p-8 lg:p-12 backdrop-blur-md space-y-6 max-w-4xl">
          <div className="flex items-center space-x-3 text-xs font-semibold uppercase tracking-widest text-accent">
            <Wine className="w-5 h-5" />
            <span>GHF Retail Strategy Tip</span>
          </div>
          <h2 className="text-3xl font-light text-white">How to use these insights during client meetings</h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            When pitching to luxury hotel groups or boutique bars, start the conversation with macro trends. Establish yourself as a category consultant by pointing to the mindful drinking surge or sustainability metrics. Once the account agrees on the consumer need, introduce GHF support packages and co-branded activations to secure the listing.
          </p>
        </div>
      </RevealAnimation>
    </div>
  );
}
