"use client";

import React from "react";
import { LifeBuoy, Check, Shield, Mail, Phone, Calendar } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";

const TIERS = [
  {
    name: "Standard",
    investment: "Up to £500",
    benefits: [
      "Digital assets & menu templates",
      "Point-of-Sale (POS) display support",
      "Standard staff training guide"
    ]
  },
  {
    name: "Gold",
    investment: "Up to £1,200",
    benefits: [
      "Custom co-branded menu design & printing",
      "Interactive staff masterclass sessions",
      "Brand-sponsored social media post",
      "Exclusive glassware & bar tools allocation"
    ]
  },
  {
    name: "Platinum",
    investment: "Up to £3,000+",
    benefits: [
      "Bespoke patio/terrace branding transformation",
      "Tailored consumer launch activation event",
      "Joint press release and PR amplification",
      "Priority allocation of limited/seasonal variants"
    ]
  }
];

export default function SupportPage() {
  return (
    <div className="space-y-16 pb-24 px-6 lg:px-12 pt-12">
      <header>
        <RevealAnimation direction="up" delay={0.1}>
          <h1 className="text-6xl lg:text-8xl font-light tracking-tight mb-6">GHF Support</h1>
        </RevealAnimation>
        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            Our trade partner enablement program. Discover the resources and support budgets unlocked by GHF brand listings.
          </p>
        </RevealAnimation>
      </header>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TIERS.map((tier, idx) => (
          <RevealAnimation key={tier.name} direction="up" delay={0.3 + (idx * 0.1)}>
            <div className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-10 backdrop-blur-md space-y-8 hover:border-accent/30 transition-colors flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-light text-white mb-2">{tier.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent">Support Allocation</p>
                </div>
                
                <div className="text-4xl font-light tracking-tight text-white py-4 border-y border-white/5">
                  {tier.investment}
                </div>

                <ul className="space-y-3 pt-2">
                  {tier.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-3 text-sm font-light text-muted-foreground">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 text-xs text-white/40 italic">
                *Requires verification by regional GHF account representative.
              </div>
            </div>
          </RevealAnimation>
        ))}
      </div>

      {/* Support FAQ & Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        {/* Guideline Details */}
        <RevealAnimation direction="up" delay={0.5}>
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-10 space-y-6">
            <div className="flex items-center space-x-3 text-xs font-semibold uppercase tracking-widest text-accent">
              <Shield className="w-5 h-5" />
              <span>Program Guidelines</span>
            </div>
            <h3 className="text-2xl font-light text-white">How support budgets are calculated</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Support budgets are assigned to key trade accounts based on the volume and variety of GHF brands listed. Listing multiple variants (e.g., Sapling Vodka and Sapling Gin) qualifies the account for higher-tier support brackets, which can be pooled together to finance significant activations such as launch parties, co-branded masterclasses, and venue transformations.
            </p>
          </div>
        </RevealAnimation>

        {/* Contact details */}
        <RevealAnimation direction="up" delay={0.6}>
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-accent/5 to-transparent p-8 lg:p-10 space-y-6">
            <div className="flex items-center space-x-3 text-xs font-semibold uppercase tracking-widest text-accent">
              <LifeBuoy className="w-5 h-5" />
              <span>Direct Support Desk</span>
            </div>
            <h3 className="text-2xl font-light text-white">Get in touch with our team</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
              Have questions regarding co-branded materials or custom menu templates? Our support desk is available to assist you.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-accent" />
                <span>support@ghfdrinks.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/70">
                <Phone className="w-4 h-4 text-accent" />
                <span>+44 (0) 20 7123 4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/70">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Monday – Friday, 9:00 – 17:30 GMT</span>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
}
