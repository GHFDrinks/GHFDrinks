"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Play, 
  Wine, 
  FolderTree, 
  Activity, 
  Package 
} from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      label: "Activation Calendar",
      sub: "Key dates & promotional windows",
      href: "/calendar",
      icon: Calendar,
    },
    {
      label: "Halo Outlets",
      sub: "Prestige customer showcases",
      href: "/case-studies/prestige",
      icon: CheckCircle2,
    },
    {
      label: "Upcoming Events",
      sub: "Trade shows & brand activations",
      href: "/calendar",
      icon: MapPin,
    },
    {
      label: "Support Packages",
      sub: "On-trade brand support offerings",
      href: "/support",
      icon: Users,
    },
    {
      label: "Brand Videos",
      sub: "Brand films and digital assets",
      href: "/resources/videos",
      icon: Play,
    },
    {
      label: "Serve Inspiration",
      sub: "Signature serves & recipes",
      href: "/resources/serves",
      icon: Wine,
    },
    {
      label: "Case Studies",
      sub: "Independent & group showcases",
      href: "/case-studies/prestige",
      icon: FolderTree,
    },
    {
      label: "Category Insights",
      sub: "Market intelligence & reports",
      href: "/insights",
      icon: Activity,
    },
    {
      label: "POS Library",
      sub: "Point of sale kits & collateral",
      href: "/resources/pos",
      icon: Package,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-6 md:px-14 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-[var(--cream)]">
            Brand Resources
          </h1>
          <p className="text-sm text-[var(--sage)] font-medium">
            Access resources to support brand development in outlet
          </p>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res) => {
            const Icon = res.icon;
            return (
              <Link
                key={res.label}
                href={res.href}
                className="group flex flex-col justify-between p-6 h-48 rounded-2xl border border-[var(--sage)]/30 bg-[var(--card)] shadow-lg transition-all duration-300 hover:border-[var(--sage)] hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--background)] flex items-center justify-center text-[var(--sage)] group-hover:bg-[var(--sage)] group-hover:text-[var(--background)] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[var(--cream)] tracking-wide">
                    {res.label}
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/60">
                    {res.sub}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
