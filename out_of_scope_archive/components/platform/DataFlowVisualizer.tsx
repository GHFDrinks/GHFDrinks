"use client";

import React, { useState } from "react";
import { 
  Database, 
  MessageSquare, 
  Mail, 
  Layers, 
  Globe, 
  Zap, 
  Server,
  ArrowRightLeft,
  Activity,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DataNode {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  direction: 'inbound' | 'outbound' | 'bidirectional';
  icon: any;
  x: number; // grid coords
  y: number;
}

export function DataFlowVisualizer() {
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

  const nodes: DataNode[] = [
    { id: "salesforce", name: "Salesforce CRM", type: "CRM System", status: "active", direction: "bidirectional", icon: Database, x: 20, y: 20 },
    { id: "slack", name: "Slack Alerts", type: "Communication", status: "active", direction: "outbound", icon: MessageSquare, x: 80, y: 20 },
    { id: "sap", name: "SAP S/4HANA ERP", type: "ERP Ledger", status: "error", direction: "bidirectional", icon: Server, x: 80, y: 80 },
    { id: "hubspot", name: "HubSpot CRM", type: "Marketing", status: "inactive", direction: "bidirectional", icon: Layers, x: 20, y: 80 },
    { id: "email", name: "SMTP / SendGrid", type: "Email Gateway", status: "active", direction: "outbound", icon: Mail, x: 50, y: 90 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <Activity className="w-5 h-5 text-white/70 animate-pulse" />
          <div>
            <h4 className="text-sm font-medium text-white">Integration Schema Topology</h4>
            <p className="text-white/40 text-xs">Hover over nodes to inspect structural mappings and sync directions.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* SVG Flow Canvas */}
        <div className="lg:col-span-3 bg-black/40 border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-center min-h-[420px] relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* SVG Connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '420px' }}>
            <defs>
              <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="error-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" stopColor-ratio="0.1" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Connecting Lines to Central Hub (50%, 50%) */}
            {/* Salesforce: Top-Left */}
            <path 
              d="M 200 120 Q 250 180 320 210" 
              fill="none" 
              stroke="rgba(255,255,255,0.06)" 
              strokeWidth="2" 
            />
            <path 
              d="M 200 120 Q 250 180 320 210" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="1.5" 
              strokeDasharray="8 12" 
              className={cn(activeFlow === "salesforce" ? "animate-[dash_2s_linear_infinite]" : "animate-[dash_8s_linear_infinite]")}
            />

            {/* Slack: Top-Right */}
            <path 
              d="M 450 120 Q 400 180 320 210" 
              fill="none" 
              stroke="rgba(255,255,255,0.06)" 
              strokeWidth="2" 
            />
            <path 
              d="M 450 120 Q 400 180 320 210" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="1.5" 
              strokeDasharray="6 14" 
              className={cn(activeFlow === "slack" ? "animate-[dash_2s_linear_infinite]" : "animate-[dash_8s_linear_infinite]")}
            />

            {/* SAP ERP: Bottom-Right (Alert) */}
            <path 
              d="M 450 300 Q 400 240 320 210" 
              fill="none" 
              stroke="rgba(239,68,68,0.15)" 
              strokeWidth="2" 
            />
            <path 
              d="M 450 300 Q 400 240 320 210" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="1" 
              strokeDasharray="4 20" 
              className="animate-[dash_4s_linear_infinite]" 
            />

            {/* HubSpot: Bottom-Left */}
            <path 
              d="M 200 300 Q 250 240 320 210" 
              fill="none" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="2" 
            />

            {/* SMTP Email: Bottom-Center */}
            <path 
              d="M 320 330 L 320 210" 
              fill="none" 
              stroke="rgba(255,255,255,0.06)" 
              strokeWidth="2" 
            />
            <path 
              d="M 320 330 L 320 210" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="1.5" 
              strokeDasharray="5 15" 
              className="animate-[dash_10s_linear_infinite]" 
            />
          </svg>

          {/* Central Hub Node */}
          <div className="absolute top-[160px] left-[270px] w-28 h-28 rounded-full border border-white/20 bg-black/60 shadow-[0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-2xl flex flex-col items-center justify-center z-20 group">
            <div className="absolute inset-0.5 rounded-full border border-white/10 animate-ping opacity-25" />
            <ArrowRightLeft className="w-6 h-6 text-white mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-wider uppercase font-semibold text-white/80">GHF Hub</span>
          </div>

          {/* Salesforce Node (Top-Left) */}
          <div 
            onMouseEnter={() => setActiveFlow("salesforce")}
            onMouseLeave={() => setActiveFlow(null)}
            className="absolute top-[70px] left-[90px] p-4 bg-[#0a0a0c]/90 border border-white/10 rounded-2xl flex items-center space-x-3 z-20 hover:border-white/30 hover:scale-105 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
              <Database className="w-4.5 h-4.5 text-[#00A1E0]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-white block">Salesforce CRM</span>
              <span className="text-[9px] text-green-400 font-mono font-bold flex items-center gap-0.5"><span className="w-1 h-1 bg-green-400 rounded-full animate-ping" />Connected</span>
            </div>
          </div>

          {/* Slack Node (Top-Right) */}
          <div 
            onMouseEnter={() => setActiveFlow("slack")}
            onMouseLeave={() => setActiveFlow(null)}
            className="absolute top-[70px] right-[90px] p-4 bg-[#0a0a0c]/90 border border-white/10 rounded-2xl flex items-center space-x-3 z-20 hover:border-white/30 hover:scale-105 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
              <MessageSquare className="w-4.5 h-4.5 text-[#4A154B]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-white block">Slack Alerts</span>
              <span className="text-[9px] text-green-400 font-mono font-bold flex items-center gap-0.5"><span className="w-1 h-1 bg-green-400 rounded-full" />Connected</span>
            </div>
          </div>

          {/* SAP ERP Node (Bottom-Right) */}
          <div 
            onMouseEnter={() => setActiveFlow("sap")}
            onMouseLeave={() => setActiveFlow(null)}
            className="absolute bottom-[70px] right-[90px] p-4 bg-[#0a0a0c]/90 border border-red-500/20 rounded-2xl flex items-center space-x-3 z-20 hover:border-red-500/40 hover:scale-105 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-center">
              <Server className="w-4.5 h-4.5 text-red-400" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-white block">SAP S/4HANA</span>
              <span className="text-[9px] text-red-400 font-mono font-bold flex items-center gap-0.5"><AlertTriangle className="w-3 h-3" />Timeout</span>
            </div>
          </div>

          {/* HubSpot Node (Bottom-Left) */}
          <div 
            onMouseEnter={() => setActiveFlow("hubspot")}
            onMouseLeave={() => setActiveFlow(null)}
            className="absolute bottom-[70px] left-[90px] p-4 bg-[#0a0a0c]/90 border border-white/5 opacity-55 rounded-2xl flex items-center space-x-3 z-20 hover:scale-105 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
              <Layers className="w-4.5 h-4.5 text-white/30" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-white/50 block">HubSpot Marketing</span>
              <span className="text-[9px] text-white/30 font-mono font-bold">Offline</span>
            </div>
          </div>

          {/* SMTP Node (Bottom-Center) */}
          <div 
            onMouseEnter={() => setActiveFlow("email")}
            onMouseLeave={() => setActiveFlow(null)}
            className="absolute bottom-[20px] left-[225px] p-4 bg-[#0a0a0c]/90 border border-white/10 rounded-2xl flex items-center space-x-3 z-20 hover:border-white/30 hover:scale-105 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
              <Mail className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-white block">SMTP Gateway</span>
              <span className="text-[9px] text-green-400 font-mono font-bold">Ready</span>
            </div>
          </div>
        </div>

        {/* Node Telemetry Inspector */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold">Node Telemetry</h4>
            
            {activeFlow === "salesforce" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="text-[10px] text-white/35 block uppercase font-medium">Connector</span>
                  <span className="text-base font-medium text-white">Salesforce Service</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Direction</span><span className="text-white">Bi-directional</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Sync Mode</span><span className="text-white">Incremental</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Latency</span><span className="text-emerald-400">245 ms</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Active Triggers</span><span className="text-white">4 active</span></div>
                </div>
              </div>
            )}

            {activeFlow === "slack" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="text-[10px] text-white/35 block uppercase font-medium">Connector</span>
                  <span className="text-base font-medium text-white">Slack Notifications</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Direction</span><span className="text-white">Outbound-only</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Events</span><span className="text-white">Realtime stream</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Latency</span><span className="text-emerald-400">120 ms</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Delivery channel</span><span className="text-white font-mono">#ghf-deals-live</span></div>
                </div>
              </div>
            )}

            {activeFlow === "sap" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="text-[10px] text-red-400 block uppercase font-medium">Connector Error</span>
                  <span className="text-base font-medium text-white">SAP S/4HANA ERP</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Direction</span><span className="text-white">Bi-directional</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">ErrorCode</span><span className="text-red-400 font-mono font-bold">504 Gateway Timeout</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Queue Status</span><span className="text-amber-400">142 jobs blocked</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Retry Attempt</span><span className="text-white font-mono">in 8 mins</span></div>
                </div>
              </div>
            )}

            {!activeFlow && (
              <div className="py-12 text-center text-xs text-white/30">
                Hover over an active connector node in the schema graph to inspect active data-transfer mapping properties.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-white/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span>Secure topology routing enabled</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>
    </div>
  );
}
