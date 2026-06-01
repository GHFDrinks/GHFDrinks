"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IntegrationManager } from "@/components/platform/IntegrationManager";
import { IntegrationHealthPanel } from "@/components/platform/IntegrationHealthPanel";
import { 
  CloudLightning, 
  Grid, 
  Globe, 
  Zap, 
  Terminal,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntegrationsDashboardPage() {
  const pathname = usePathname();

  const sublinks = [
    { name: "Overview", href: "/integrations", icon: CloudLightning },
    { name: "Connector Catalog", href: "/integrations/catalog", icon: Grid },
    { name: "Webhooks", href: "/integrations/webhooks", icon: Globe },
    { name: "Automation Builder", href: "/integrations/automation", icon: Zap },
    { name: "API Logs", href: "/integrations/logs", icon: Terminal }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Navigation Headers */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Enterprise Integrations
          </span>
          <h1 className="text-4xl font-light tracking-tight text-white mt-3">
            Integration Ecosystem
          </h1>
          <p className="text-white/40 font-light text-base mt-1">
            Connect and synchronize GHF presentation pipelines with external CRM and ERP data layers.
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

      {/* Main Overview Dashboard */}
      <div className="space-y-12">
        <IntegrationManager />
        
        <div className="border-t border-white/5 pt-10">
          <IntegrationHealthPanel />
        </div>
      </div>
    </div>
  );
}
