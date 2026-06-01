"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APIKeyManager } from "@/components/platform/APIKeyManager";
import { AuditExplorer } from "@/components/platform/AuditExplorer";
import { 
  Settings2, 
  Terminal, 
  ArrowRightLeft,
  Key,
  History,
  FileCode,
  Play,
  Activity,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlatformDevelopersPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'keys' | 'audits' | 'explorer'>('keys');

  // API Explorer states
  const [selectedEndpoint, setSelectedEndpoint] = useState('GET /v1/brands');
  const [requestSending, setRequestSending] = useState(false);
  const [explorerResult, setExplorerResult] = useState<string | null>(null);

  const sublinks = [
    { name: "Platform Settings", href: "/platform", icon: Settings2 },
    { name: "Event Bus Stream", href: "/platform/events", icon: ArrowRightLeft },
    { name: "Developer Panel", href: "/platform/developers", icon: Terminal }
  ];

  const handleSendExplorerRequest = () => {
    setRequestSending(true);
    setExplorerResult(null);

    setTimeout(() => {
      let resultBody = {};
      if (selectedEndpoint === 'GET /v1/brands') {
        resultBody = {
          count: 3,
          data: [
            { id: "brand_macallan", name: "The Macallan", category: "Spirits", subCategory: "Single Malt Scotch" },
            { id: "brand_dom_perignon", name: "Dom Pérignon", category: "Wines", subCategory: "Champagne" },
            { id: "brand_hibiki", name: "Hibiki", category: "Spirits", subCategory: "Japanese Whisky" }
          ]
        };
      } else if (selectedEndpoint === 'POST /v1/meetings') {
        resultBody = {
          success: true,
          meetingId: "meet_claridges_2901",
          syncedToSalesforce: true,
          salesforceEventId: "sf_evt_99182a",
          clientName: "Claridge's London",
          scheduledAt: new Date().toISOString()
        };
      } else {
        resultBody = {
          ok: true,
          events: ["presentation_created", "client_viewed_portal"],
          rateLimitRemaining: 249
        };
      }

      setExplorerResult(JSON.stringify(resultBody, null, 2));
      setRequestSending(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Navigation Headers */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Developer Console
          </span>
          <h1 className="text-4xl font-light tracking-tight text-white mt-3">
            Developer & Integrity Portal
          </h1>
          <p className="text-white/40 font-light text-base mt-1">
            Access secure API endpoints, issue custom tokens, and browse security audit compliance trails.
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

      {/* Local Toggle: Keys, Audits, API Explorer */}
      <div className="flex items-center space-x-2 bg-white/5 border border-white/10 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('keys')}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            activeTab === 'keys' 
              ? "bg-white text-black shadow-md" 
              : "text-white/60 hover:text-white"
          )}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Access Tokens</span>
        </button>
        <button
          onClick={() => setActiveTab('audits')}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            activeTab === 'audits' 
              ? "bg-white text-black shadow-md" 
              : "text-white/60 hover:text-white"
          )}
        >
          <History className="w-3.5 h-3.5" />
          <span>Security Audit Trail</span>
        </button>
        <button
          onClick={() => setActiveTab('explorer')}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            activeTab === 'explorer' 
              ? "bg-white text-black shadow-md" 
              : "text-white/60 hover:text-white"
          )}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>API Explorer</span>
        </button>
      </div>

      {/* Render Active Dashboard Segment */}
      <div className="space-y-6">
        {activeTab === 'keys' && (
          <APIKeyManager />
        )}
        
        {activeTab === 'audits' && (
          <AuditExplorer />
        )}

        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Input Selection Block */}
            <div className="lg:col-span-1 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold">Endpoint Request</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-white/40 font-medium mb-1.5">Target REST URI</label>
                  <select
                    value={selectedEndpoint}
                    onChange={(e) => setSelectedEndpoint(e.target.value)}
                    className="w-full px-3.5 py-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white cursor-pointer font-mono"
                  >
                    <option value="GET /v1/brands" className="bg-[#0f0f11]">GET /v1/brands</option>
                    <option value="POST /v1/meetings" className="bg-[#0f0f11]">POST /v1/meetings</option>
                    <option value="GET /v1/status" className="bg-[#0f0f11]">GET /v1/status</option>
                  </select>
                </div>

                <button
                  onClick={handleSendExplorerRequest}
                  disabled={requestSending}
                  className="w-full py-3 bg-white text-black hover:bg-white/95 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>{requestSending ? "Executing Query..." : "Execute API Request"}</span>
                </button>
              </div>
            </div>

            {/* Output Visualizer Block */}
            <div className="lg:col-span-2 p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-4 min-h-[300px]">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs text-white/40">
                <span className="flex items-center gap-1.5"><Code className="w-4 h-4 text-white/50" /> JSON Contract Payload</span>
                {explorerResult && <span className="text-green-400 font-mono flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />200 OK</span>}
              </div>

              {explorerResult ? (
                <pre className="p-5 bg-black/60 border border-white/5 rounded-2xl font-mono text-[10px] text-white/90 overflow-x-auto leading-relaxed max-h-[350px]">
                  {explorerResult}
                </pre>
              ) : requestSending ? (
                <div className="py-24 text-center text-xs text-white/30 animate-pulse">
                  Polling API gateways...
                </div>
              ) : (
                <div className="py-24 text-center text-xs text-white/30">
                  Select an endpoint and hit Execute to preview the raw contract response structure.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
