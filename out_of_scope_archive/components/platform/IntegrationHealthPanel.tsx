"use client";

import React, { useState } from "react";
import { 
  INITIAL_INTEGRATIONS, 
  Integration 
} from "./mockData";
import { 
  Heart, 
  Activity, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight, 
  RefreshCw, 
  CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function IntegrationHealthPanel() {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshHealth = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate fluctuation
      setIntegrations(prev => prev.map(item => {
        if (item.status === 'active') {
          return {
            ...item,
            latency: Math.max(50, item.latency + Math.floor(Math.random() * 40) - 20),
            errorRate: Math.max(0, parseFloat((item.errorRate + (Math.random() * 0.04) - 0.02).toFixed(2)))
          };
        }
        return item;
      }));
      setRefreshing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-light tracking-wide text-white uppercase flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 fill-red-400/20" />
            Integration Health & Uptime Diagnostics
          </h3>
          <p className="text-white/40 text-xs mt-1">
            Real-time transaction latency, error counts, and health statuses of all connected database engines.
          </p>
        </div>

        <button
          onClick={handleRefreshHealth}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", refreshing ? "animate-spin" : "")} />
          <span>{refreshing ? "Checking Uptime..." : "Refresh Health"}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((conn) => {
          const isActive = conn.status === "active";
          const isError = conn.status === "error";

          // Calculate custom SVG bar length or styles
          const errorSeverity = conn.errorRate > 5 ? "text-red-400" : conn.errorRate > 0.5 ? "text-amber-400" : "text-emerald-400";
          const latencySeverity = conn.latency > 500 ? "text-red-400" : conn.latency > 250 ? "text-amber-400" : "text-emerald-400";

          return (
            <div 
              key={conn.id}
              className={cn(
                "p-6 rounded-[2rem] border bg-white/[0.02] transition-all duration-300 flex flex-col justify-between gap-6",
                isActive ? "border-white/10" : isError ? "border-red-500/20 bg-red-500/[0.01]" : "border-white/5 opacity-55"
              )}
            >
              {/* Connector Meta */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{conn.name}</h4>
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-medium font-mono">{conn.category}</span>
                </div>
                
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border",
                  isActive && "bg-green-500/5 text-green-400 border-green-500/10",
                  isError && "bg-red-500/5 text-red-400 border-red-500/10",
                  !isActive && !isError && "bg-white/5 text-white/40 border-white/5"
                )}>
                  {conn.status}
                </span>
              </div>

              {/* Health Metrics */}
              {conn.status !== 'inactive' ? (
                <div className="space-y-4">
                  {/* Uptime Gauge */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40 flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> Service Uptime</span>
                      <span className="font-semibold text-white font-mono">{conn.uptime}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          conn.uptime > 99 ? "bg-emerald-400" : conn.uptime > 95 ? "bg-amber-400" : "bg-red-400"
                        )}
                        style={{ width: `${conn.uptime}%` }}
                      />
                    </div>
                  </div>

                  {/* Latency */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Response Latency</span>
                    <span className={cn("font-semibold font-mono", latencySeverity)}>
                      {conn.latency > 0 ? `${conn.latency} ms` : "N/A"}
                    </span>
                  </div>

                  {/* Error Rate */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Error Rate (24h)</span>
                    <span className={cn("font-semibold font-mono", errorSeverity)}>
                      {conn.errorRate}%
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-white/30">
                  Integration offline. Re-configure credentials to initiate active health monitoring loops.
                </div>
              )}

              {/* Status pill or details */}
              {isActive && (
                <div className="flex items-center text-[10px] text-green-400 gap-1 mt-1 justify-center bg-green-500/5 border border-green-500/10 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Healthy ping response</span>
                </div>
              )}
              {isError && (
                <div className="flex items-center text-[10px] text-red-400 gap-1 mt-1 justify-center bg-red-500/5 border border-red-500/10 py-1.5 rounded-xl">
                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                  <span>Gateway Connection Timeout</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
