"use client";

import React, { useState } from "react";
import { 
  MOCK_AUDIT_LOGS, 
  AuditLog 
} from "./mockData";
import { 
  Search, 
  ShieldAlert, 
  User, 
  Clock, 
  Globe, 
  Info,
  Calendar,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AuditExplorer() {
  const [logs, setLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("All");

  const actions = ["All", "api_key_created", "webhook_updated", "sync_failure_logged", "integration_settings_changed"];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) || 
                          log.details.toLowerCase().includes(search.toLowerCase()) ||
                          log.action.toLowerCase().includes(search.toLowerCase());
    const matchesAction = filterAction === "All" || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search audit trail..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm transition-colors placeholder:text-white/30 text-white"
          />
        </div>
        
        <div className="relative w-full sm:w-auto flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="w-full sm:w-56 pl-3 pr-8 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white appearance-none focus:outline-none focus:border-white/20 cursor-pointer"
          >
            {actions.map(act => (
              <option key={act} value={act} className="bg-[#0f0f11]">
                {act === "All" ? "Filter: All Actions" : act.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table/List */}
      <div className="border border-white/5 bg-white/[0.01] rounded-[2rem] overflow-hidden">
        <div className="divide-y divide-white/5">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-white/35 text-xs">No audit logs match criteria.</div>
          ) : (
            filteredLogs.map((log) => (
              <div 
                key={log.id}
                className="p-6 hover:bg-white/[0.01] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-y-1.5">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg text-white/70">
                      {log.action.replace(/_/g, " ")}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <div className="flex items-center space-x-1.5 text-xs text-white/50">
                      <User className="w-3.5 h-3.5" />
                      <span>{log.user}</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed font-light">
                    {log.details}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-white/40">
                    <Globe className="w-3.5 h-3.5" />
                    <span>IP: {log.ip}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 text-[11px] text-white/30">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
