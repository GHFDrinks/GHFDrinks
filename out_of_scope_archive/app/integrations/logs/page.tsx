"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IntegrationLogsViewer } from "@/components/platform/IntegrationLogsViewer";
import { SyncMonitor } from "@/components/platform/SyncMonitor";
import { 
  CloudLightning, 
  Grid, 
  Globe, 
  Zap, 
  Terminal,
  Activity,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntegrationsLogsPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'traces' | 'syncs'>('traces');

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
            Execution Logs & Diagnostics
          </h1>
          <p className="text-white/40 font-light text-base mt-1">
            Reconcile synchronization jobs and monitor detailed API transactional trace flows.
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

      {/* Local Toggle: Trace Logs vs Sync Monitor */}
      <div className="flex items-center space-x-2 bg-white/5 border border-white/10 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('traces')}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            activeTab === 'traces' 
              ? "bg-white text-black shadow-md shadow-white/10" 
              : "text-white/60 hover:text-white"
          )}
        >
          <History className="w-3.5 h-3.5" />
          <span>API Traces</span>
        </button>
        <button
          onClick={() => setActiveTab('syncs')}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            activeTab === 'syncs' 
              ? "bg-white text-black shadow-md" 
              : "text-white/60 hover:text-white"
          )}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Sync Engine Monitor</span>
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'traces' ? (
          <IntegrationLogsViewer />
        ) : (
          <SyncMonitor />
        )}
      </div>
    </div>
  );
}
