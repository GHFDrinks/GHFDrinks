"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  MessageSquare, 
  Mail, 
  Settings2, 
  Check, 
  AlertTriangle, 
  X, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Search,
  Sliders
} from "lucide-react";
import { Integration, INITIAL_INTEGRATIONS } from "./mockData";
import { cn } from "@/lib/utils";

export function ConnectorRegistry({ 
  onConfigure 
}: { 
  onConfigure?: (integration: Integration) => void 
}) {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [selectedConnector, setSelectedConnector] = useState<Integration | null>(null);
  
  // Custom logo maps
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "salesforce":
        return <Database className="w-6 h-6 text-[#00A1E0]" />;
      case "hubspot":
        return <Sliders className="w-6 h-6 text-[#FF7A59]" />;
      case "slack":
        return <MessageSquare className="w-6 h-6 text-[#4A154B]" />;
      case "google_workspace":
        return <Layers className="w-6 h-6 text-[#4285F4]" />;
      case "m365":
        return <Layers className="w-6 h-6 text-[#0078D4]" />;
      case "dynamics":
        return <Database className="w-6 h-6 text-[#00205B]" />;
      case "email":
        return <Mail className="w-6 h-6 text-emerald-400" />;
      case "erp":
        return <Layers className="w-6 h-6 text-amber-500" />;
      default:
        return <Layers className="w-6 h-6 text-white" />;
    }
  };

  const toggleStatus = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'active' ? 'inactive' : 'active';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const filtered = integrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "CRM", "Communication", "ERP", "Marketing", "Collaboration", "Workspace"];

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search enterprise connectors..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm transition-colors placeholder:text-white/30 text-white"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300",
                filterCategory === cat
                  ? "bg-white text-black shadow-md shadow-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((connector) => {
          const isActive = connector.status === "active";
          const isError = connector.status === "error";

          return (
            <motion.div
              layout
              key={connector.id}
              className={cn(
                "group relative rounded-[2rem] border p-6 flex flex-col justify-between transition-all duration-500 overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent hover:from-white/[0.07] hover:to-white/[0.01]",
                isActive ? "border-white/15 shadow-[0_0_30px_rgba(255,255,255,0.02)]" : "border-white/5",
                isError && "border-red-500/25 bg-red-500/[0.02] shadow-[0_0_30px_rgba(239,68,68,0.02)]"
              )}
            >
              {/* Animated glow on active */}
              {isActive && (
                <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:border-white/20 transition-colors">
                    {getProviderIcon(connector.provider)}
                  </div>
                  
                  {/* Status Badges */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleStatus(connector.id)}
                      className={cn(
                        "w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 relative",
                        isActive ? "bg-white" : isError ? "bg-red-500/30" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "w-4.5 h-4.5 rounded-full transition-transform duration-300 shadow-sm",
                        isActive ? "translate-x-4.5 bg-black" : "translate-x-0 bg-white/60"
                      )} />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-lg font-medium text-white group-hover:text-accent transition-colors">
                      {connector.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                      {connector.category}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed mt-2 line-clamp-3">
                    {connector.description}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center space-x-1.5 text-white/40">
                  {isActive ? (
                    <span className="flex items-center text-green-400 font-medium gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      Online
                    </span>
                  ) : isError ? (
                    <span className="flex items-center text-red-400 font-medium gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Sync Alert
                    </span>
                  ) : (
                    <span className="text-white/40">Offline</span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedConnector(connector);
                    if (onConfigure) onConfigure(connector);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Configuration Detail Sheet Modal */}
      <AnimatePresence>
        {selectedConnector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  onClick={() => setSelectedConnector(null)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {getProviderIcon(selectedConnector.provider)}
                </div>
                <div>
                  <h4 className="text-2xl font-light text-white">{selectedConnector.name}</h4>
                  <p className="text-white/40 text-xs tracking-wider uppercase font-medium mt-0.5">
                    {selectedConnector.category} Connector
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-2">
                    Description
                  </label>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {selectedConnector.description}
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <h5 className="text-xs uppercase tracking-widest text-white/30 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Security & Connection
                  </h5>
                  
                  {selectedConnector.status === 'active' ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Status</span>
                        <span className="text-green-400 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Connected
                        </span>
                      </div>
                      {selectedConnector.config && Object.entries(selectedConnector.config).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center text-xs">
                          <span className="text-white/50 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white font-mono text-[11px] truncate max-w-[200px]">{String(val)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Uptime</span>
                        <span className="text-white">{selectedConnector.uptime}%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Avg Latency</span>
                        <span className="text-white">{selectedConnector.latency}ms</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-white/40 text-xs mb-3">No active connection. Link account to begin sync.</p>
                      <button 
                        onClick={() => {
                          toggleStatus(selectedConnector.id);
                          setSelectedConnector(prev => prev ? { ...prev, status: 'active' } : null);
                        }}
                        className="px-5 py-2 bg-white text-black text-xs font-semibold rounded-xl hover:bg-white/90 transition-colors"
                      >
                        Authenticate Credentials
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => {
                      if (onConfigure) onConfigure(selectedConnector);
                      setSelectedConnector(null);
                    }}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-all text-center"
                  >
                    Advanced Mapping Schema
                  </button>
                  {selectedConnector.status === 'active' && (
                    <button 
                      onClick={() => {
                        toggleStatus(selectedConnector.id);
                        setSelectedConnector(prev => prev ? { ...prev, status: 'inactive' } : null);
                      }}
                      className="px-5 py-3 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-xl transition-all"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
