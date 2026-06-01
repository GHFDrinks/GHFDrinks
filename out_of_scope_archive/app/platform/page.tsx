"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlatformSettingsPanel } from "@/components/platform/PlatformSettingsPanel";
import { DataFlowVisualizer } from "@/components/platform/DataFlowVisualizer";
import { 
  Settings2, 
  Terminal, 
  Layers, 
  ShieldAlert,
  ArrowRightLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlatformDashboardPage() {
  const pathname = usePathname();

  const sublinks = [
    { name: "Platform Settings", href: "/platform", icon: Settings2 },
    { name: "Event Bus Stream", href: "/platform/events", icon: ArrowRightLeft },
    { name: "Developer Panel", href: "/platform/developers", icon: Terminal }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Navigation Headers */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Developer Console
          </span>
          <h1 className="text-4xl font-light tracking-tight text-white mt-3">
            Open Platform Hub
          </h1>
          <p className="text-white/40 font-light text-base mt-1">
            Build enterprise bridges, manage security credentials, and trace system activities.
          </p>
        </div>
      </header>

      {/* Segmented Sub-Navbar */}
      <div className="border-b border-white/5 pb-0.5 flex items-center space-x-1.5 overflow-x-auto scrollbar-hide">
        {sublinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 rounded-t-xl text-xs font-semibold tracking-wide border-b-2 transition-all relative",
                isActive 
                  ? "border-white text-white bg-white/[0.02]" 
                  : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Overview Layout Grid */}
      <div className="space-y-12">
        <div>
          <h3 className="text-lg font-light tracking-wide text-white uppercase mb-4">
            Ecosystem Topology
          </h3>
          <DataFlowVisualizer />
        </div>

        <div className="border-t border-white/5 pt-10">
          <PlatformSettingsPanel />
        </div>
      </div>
    </div>
  );
}
