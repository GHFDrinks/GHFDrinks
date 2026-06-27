"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  Calendar, 
  Play, 
  Wine, 
  FolderTree, 
  Package 
} from "lucide-react";

export default function ResourcesPage() {
  const router = useRouter();

  const sections = [
    {
      title: "Halo Outlets",
      subtitle: "Prestige customer showcases and premium venue listings",
      href: "/resources/halo-outlets",
      icon: CheckCircle2,
    },
    {
      title: "Upcoming Events",
      subtitle: "Consumer tastings, trade dinners, and activation tickets",
      href: "/resources/upcoming-events",
      icon: Calendar,
    },
    {
      title: "Brand Videos",
      subtitle: "High-definition brand films and digital storytelling assets",
      href: "/resources/videos",
      icon: Play,
    },
    {
      title: "Serve Inspiration",
      subtitle: "Bespoke seasonal serves, cocktail recipes, and mixology logs",
      href: "/resources/serves",
      icon: Wine,
    },
    {
      title: "Case Studies",
      subtitle: "On-trade performance success metrics across hospitality tiers",
      href: "/resources/case-studies",
      icon: FolderTree,
    },
    {
      title: "POS Library",
      subtitle: "Print collateral, branded table-talkers, and venue assets",
      href: "/resources/pos",
      icon: Package,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-12 bg-[var(--background)] flex flex-col justify-between max-w-6xl mx-auto">
      <div className="space-y-12">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              Sales Enablement
            </span>
            <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
              Brand Resources
            </h1>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Asset kits and on-trade collateral supporting portfolio integration
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
          >
            ← Home
          </button>
        </div>

        {/* 6 Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec) => {
            const IconComponent = sec.icon;
            return (
              <Link
                key={sec.title}
                href={sec.href}
                className="group p-8 rounded-xl border border-[var(--sage)]/20 bg-[var(--card)] shadow-lg hover:border-[var(--sage)] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px] cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--sage)] group-hover:bg-[var(--sage)] group-hover:text-[var(--background)] transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-2 mt-6">
                  <h3 className="text-lg font-light text-[var(--foreground)] tracking-wide group-hover:text-[var(--sage)] transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {sec.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4 w-full">
        GHF Drinks Portfolio © 2026
      </div>
    </div>
  );
}
