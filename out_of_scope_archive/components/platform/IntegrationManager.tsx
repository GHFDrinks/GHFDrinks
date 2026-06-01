"use client";

import React, { useState } from "react";
import { 
  CloudLightning, 
  Activity, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Sliders,
  CheckCircle2,
  ListRestart
} from "lucide-react";
import { ConnectorRegistry } from "./ConnectorRegistry";
import { Integration, INITIAL_INTEGRATIONS } from "./mockData";
import { motion } from "framer-motion";

export function IntegrationManager() {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [syncingAll, setSyncingAll] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const activeCount = integrations.filter(i => i.status === "active").length;
  const errorCount = integrations.filter(i => i.status === "error").length;
  const avgUptime = (integrations.reduce((acc, curr) => acc + curr.uptime, 0) / integrations.length).toFixed(2);
  const avgLatency = Math.round(
    integrations.filter(i => i.status === "active").reduce((acc, curr) => acc + curr.latency, 0) / 
    (integrations.filter(i => i.status === "active").length || 1)
  );

  const triggerForceSync = () => {
    setSyncingAll(true);
    setSyncMessage("Re-indexing CRM fields & refreshing caches...");
    setTimeout(() => {
      setSyncingAll(false);
      setSyncMessage("Sync complete. 48 records synced successfully.");
      setTimeout(() => setSyncMessage(""), 4000);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Active Connections */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CloudLightning className="w-16 h-16 text-white" />
          </div>
          <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Active Pipelines</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-light text-white">{activeCount}</span>
            <span className="text-white/30 text-sm">/ {integrations.length}</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-3 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>All core services operational</span>
          </div>
        </motion.div>

        {/* Card 2: System Uptime */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity className="w-16 h-16 text-white" />
          </div>
          <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Operational Uptime</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-light text-white">{avgUptime}%</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-3 text-xs text-white/40">
            <span>Aggregated 30-day average</span>
          </div>
        </motion.div>

        {/* Card 3: Avg Response Time */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Clock className="w-16 h-16 text-white" />
          </div>
          <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Avg Latency</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-light text-white">{avgLatency}ms</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-3 text-xs text-white/40 font-mono">
            <span>Direct API integrations</span>
          </div>
        </motion.div>

        {/* Card 4: System Alerts */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`p-6 border rounded-3xl backdrop-blur-md relative overflow-hidden transition-all duration-300 ${
            errorCount > 0 
              ? 'bg-red-500/[0.03] border-red-500/20' 
              : 'bg-white/[0.03] border-white/5'
          }`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
          <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Sync Alerts</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className={`text-4xl font-light ${errorCount > 0 ? 'text-red-400' : 'text-white'}`}>
              {errorCount}
            </span>
            <span className="text-white/30 text-sm">active</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-3 text-xs">
            {errorCount > 0 ? (
              <span className="text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> SAP ERP Gateway Timeout
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy integration loops
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Manual Sync Bar & Control Hub */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gradient-to-r from-white/[0.03] to-transparent border border-white/5 rounded-3xl gap-4">
        <div>
          <h4 className="text-base font-medium text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-white/60" />
            Integration Controls
          </h4>
          <p className="text-white/50 text-xs mt-1 max-w-xl">
            Manual reconcile forces synchronization on all active CRM, marketing, and collaboration pipelines. Helpful after database migrations or mass updates.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {syncMessage && (
            <span className="text-xs text-white/60 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl font-medium animate-pulse max-w-xs truncate">
              {syncMessage}
            </span>
          )}
          <button
            onClick={triggerForceSync}
            disabled={syncingAll}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black text-xs font-semibold rounded-xl hover:bg-white/90 disabled:bg-white/50 transition-all shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingAll ? 'animate-spin' : ''}`} />
            <span>{syncingAll ? "Syncing..." : "Reconcile All"}</span>
          </button>
        </div>
      </div>

      {/* Registry Panel */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-lg font-light tracking-wide text-white uppercase">
            Connector Catalog
          </h3>
        </div>
        <ConnectorRegistry />
      </div>
    </div>
  );
}
