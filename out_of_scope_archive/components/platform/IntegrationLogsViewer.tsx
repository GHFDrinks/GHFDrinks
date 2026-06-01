"use client";

import React, { useState } from "react";
import { 
  Search, 
  Terminal, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  FileCode,
  ArrowRight,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TraceLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  direction: 'inbound' | 'outbound';
  connector: string;
  message: string;
  latency: number;
  payload: Record<string, any>;
}

export function IntegrationLogsViewer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [selectedLog, setSelectedLog] = useState<TraceLog | null>(null);

  const logs: TraceLog[] = [
    {
      id: "log_1",
      timestamp: "2026-05-30T14:08:12Z",
      level: "info",
      direction: "inbound",
      connector: "Customer Portal Webhook",
      message: "Received portal engagement heartbeat tracking from cli_rosewood_london.",
      latency: 48,
      payload: {
        headers: { "x-ghf-signature-sha256": "88fa298ea7b7e281cc88db9f89e2" },
        body: { clientId: "cli_rosewood_london", durationSeconds: 145, session: "sess_99a8bc" }
      }
    },
    {
      id: "log_2",
      timestamp: "2026-05-30T14:05:00Z",
      level: "info",
      direction: "outbound",
      connector: "Salesforce CRM Connector",
      message: "Synced meeting_completed event for 'Ritz London Presentation'. SF ID: task_77fa8bc.",
      latency: 245,
      payload: {
        request: { url: "/services/data/v60.0/sobjects/Task", method: "POST", body: { Subject: "GHF Deck View", WhatId: "sf_acc_ Ritz" } },
        response: { id: "0018000000XyZ12", success: true, errors: [] }
      }
    },
    {
      id: "log_3",
      timestamp: "2026-05-30T14:02:10Z",
      level: "warn",
      direction: "outbound",
      connector: "Slack Notifications Grid",
      message: "Slack webhook POST completed with warning: Rate limits threshold reached 80%.",
      latency: 180,
      payload: {
        headers: { "Retry-After": "45" },
        response: { ok: true, warning: "ratelimit_approaching" }
      }
    },
    {
      id: "log_4",
      timestamp: "2026-05-30T11:00:02Z",
      level: "error",
      direction: "outbound",
      connector: "SAP S/4HANA ERP Connector",
      message: "Sync failure during inventory sync task. Connection timed out (504).",
      latency: 30000,
      payload: {
        request: { endpoint: "/sap/opu/odata/sap/RECONCILE_PORTFOLIO", method: "PUT" },
        error: { code: "GATEWAY_TIMEOUT", message: "Server failed to respond within 30000ms. Transaction aborted." }
      }
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.connector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "All" || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search API execution logs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm transition-colors placeholder:text-white/30 text-white"
          />
        </div>
        
        <div className="relative w-full sm:w-auto flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full sm:w-56 pl-3 pr-8 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white appearance-none focus:outline-none focus:border-white/20 cursor-pointer"
          >
            <option value="All" className="bg-[#0f0f11]">All Severity Levels</option>
            <option value="info" className="bg-[#0f0f11]">Info Logs</option>
            <option value="warn" className="bg-[#0f0f11]">Warning Logs</option>
            <option value="error" className="bg-[#0f0f11]">Error Logs</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Logs Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-white/5 bg-white/[0.01] rounded-[2rem] overflow-hidden">
            <div className="divide-y divide-white/5">
              {filteredLogs.length === 0 ? (
                <div className="p-12 text-center text-white/35 text-xs">No matching execution traces.</div>
              ) : (
                filteredLogs.map((log) => {
                  const isSelected = selectedLog?.id === log.id;
                  
                  return (
                    <div 
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className={cn(
                        "p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.01] transition-all",
                        isSelected ? "bg-white/[0.02] border-l-2 border-white" : ""
                      )}
                    >
                      <div className="flex items-start space-x-3.5 min-w-0">
                        {log.level === 'info' && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />}
                        {log.level === 'warn' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                        {log.level === 'error' && <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                        
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs font-semibold text-white truncate">{log.connector}</h4>
                            <span className="text-[9px] uppercase tracking-wider text-white/30 font-mono font-bold">
                              {log.direction}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 mt-1 line-clamp-1 leading-relaxed">
                            {log.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 font-mono text-[10px] text-white/40">
                        <span>{log.latency}ms</span>
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Payload Visualizer */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-white/60" />
              API Exchange Trace
            </h4>
          </div>

          {selectedLog ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-white/30 block uppercase font-medium">Connector Client</span>
                <span className="text-sm font-semibold text-white">{selectedLog.connector}</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Timestamp</span><span className="text-white font-mono">{selectedLog.timestamp}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">API Latency</span><span className="text-white font-mono">{selectedLog.latency}ms</span></div>
                <div className="flex justify-between"><span className="text-white/40">Trace ID</span><span className="text-white font-mono">{selectedLog.id}</span></div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-white/30 block uppercase font-medium">Payload Data</span>
                <pre className="p-4 bg-black/60 border border-white/5 rounded-2xl font-mono text-[10px] text-white/90 overflow-x-auto leading-relaxed max-h-[300px]">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-white/30">
              Select a trace log entry to view request headers, endpoints, and response payloads.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
