"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, 
  Search, 
  Code, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RefreshCw,
  SlidersHorizontal,
  PlusCircle
} from "lucide-react";
import { MOCK_EVENT_LOGS, EventLog } from "./mockData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function EventBusDashboard() {
  const [logs, setLogs] = useState<EventLog[]>(MOCK_EVENT_LOGS);
  const [filterType, setFilterType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePayloadLog, setActivePayloadLog] = useState<EventLog | null>(null);
  const [isPlayingSimulator, setIsPlayingSimulator] = useState(false);

  const eventTypes = [
    "All",
    "presentation_created",
    "presentation_shared",
    "client_viewed_portal",
    "activation_updated",
    "meeting_completed",
    "recommendation_generated",
    "content_published",
    "engagement_recorded"
  ];

  // Simulator loop to add random events periodically if turned on
  useEffect(() => {
    if (!isPlayingSimulator) return;

    const mockClients = ["The Ritz Paris", "Rosewood London", "Savoy Hotel", "Claridge's", "Connaught Bar"];
    const mockBrands = ["Macallan Reflexion", "Hibiki Harmony", "Dom Pérignon", "Glenfiddich 18", "Hennessy XO"];
    
    const interval = setInterval(() => {
      const randomType = eventTypes[Math.floor(Math.random() * (eventTypes.length - 1)) + 1];
      const randomClient = mockClients[Math.floor(Math.random() * mockClients.length)];
      
      let payload: Record<string, any> = {};
      let source = "platform";
      
      switch(randomType) {
        case "client_viewed_portal":
          payload = {
            clientId: `cli_${randomClient.toLowerCase().replace(" ", "_")}`,
            portalSessionId: `sess_${Math.random().toString(36).substring(2, 8)}`,
            durationSeconds: Math.floor(Math.random() * 200) + 30,
            brandsViewed: [mockBrands[Math.floor(Math.random() * mockBrands.length)], mockBrands[Math.floor(Math.random() * mockBrands.length)]],
            deviceType: "iPad Pro"
          };
          source = "web_portal";
          break;
        case "meeting_completed":
          payload = {
            meetingId: `meet_${Math.random().toString(36).substring(2, 8)}`,
            clientName: randomClient,
            repId: "rep_john_doe",
            durationMinutes: 30 + Math.floor(Math.random() * 60)
          };
          source = "sales_tablet";
          break;
        case "presentation_created":
          payload = {
            presentationId: `pres_${Math.random().toString(36).substring(2, 8)}`,
            name: `${randomClient} Luxury Tasting Setup`,
            brands: [mockBrands[0], mockBrands[1]],
            slideCount: 12
          };
          source = "platform";
          break;
        default:
          payload = {
            timestamp: new Date().toISOString(),
            status: "success",
            reconciled: true,
            scope: "global"
          };
          source = "system";
      }

      const newEvent: EventLog = {
        id: `evt_${Date.now()}`,
        eventType: randomType,
        source: source,
        timestamp: new Date().toISOString(),
        status: Math.random() > 0.05 ? "processed" : "failed",
        payload: payload
      };

      setLogs(prev => [newEvent, ...prev.slice(0, 19)]); // Keep last 20
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlayingSimulator]);

  const handleSimulateSingle = () => {
    const newEvent: EventLog = {
      id: `evt_${Date.now()}`,
      eventType: "client_viewed_portal",
      source: "web_portal",
      timestamp: new Date().toISOString(),
      status: "processed",
      payload: {
        clientId: "cli_ritz_london",
        clientName: "The Ritz London",
        portalSessionId: "sess_simulated",
        durationSeconds: 198,
        brandsViewed: ["Dom Pérignon Rosé", "Macallan Reflexion"],
        deviceType: "Safari Mobile"
      }
    };
    setLogs(prev => [newEvent, ...prev]);
  };

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === "All" || log.eventType === filterType;
    const matchesSearch = log.eventType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Simulation and Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl gap-4 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-white/60 animate-pulse" />
          <div>
            <h4 className="text-sm font-medium text-white">Event Stream Simulator</h4>
            <p className="text-white/40 text-xs">Simulate real-time sales and portfolio events feeding into the bus.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlayingSimulator(!isPlayingSimulator)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
              isPlayingSimulator 
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
            )}
          >
            <Play className={cn("w-3.5 h-3.5", isPlayingSimulator ? "fill-amber-400 animate-spin" : "")} />
            <span>{isPlayingSimulator ? "Simulating Events..." : "Start Sim Loop"}</span>
          </button>
          
          <button
            onClick={handleSimulateSingle}
            className="px-4 py-2 bg-white text-black hover:bg-white/90 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Publish Client Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Logs list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text"
                placeholder="Search event type or source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/5 rounded-xl focus:border-white/20 focus:outline-none text-xs text-white"
              />
            </div>
            
            <div className="relative w-full sm:w-auto">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-8 py-2 bg-black/40 border border-white/5 rounded-xl text-xs text-white appearance-none focus:outline-none focus:border-white/20 cursor-pointer"
              >
                {eventTypes.map(t => (
                  <option key={t} value={t} className="bg-[#0f0f11]">
                    {t === "All" ? "Filter: All Events" : t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Stream list */}
          <div className="border border-white/5 bg-white/[0.01] rounded-[2rem] overflow-hidden">
            <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {filteredLogs.length === 0 ? (
                  <div className="p-8 text-center text-white/30 text-xs">No matching events recorded.</div>
                ) : (
                  filteredLogs.map((log) => {
                    const isSelected = activePayloadLog?.id === log.id;
                    return (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        key={log.id}
                        onClick={() => setActivePayloadLog(log)}
                        className={cn(
                          "p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors select-none",
                          isSelected ? "bg-white/[0.03] border-l-2 border-white" : ""
                        )}
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          {log.status === "processed" ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                          
                          <div className="min-w-0">
                            <span className="font-mono text-xs text-white font-medium block truncate">
                              {log.eventType}
                            </span>
                            <span className="text-[10px] text-white/30 flex items-center gap-1.5 mt-0.5">
                              <span className="font-semibold text-white/40 uppercase tracking-widest">{log.source}</span>
                              •
                              <Clock className="w-3 h-3" /> {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase",
                            log.status === "processed" 
                              ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          )}>
                            {log.status}
                          </span>
                          <Code className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Payload Inspector */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-medium flex items-center gap-1.5">
              <Code className="w-4 h-4 text-white/60" />
              Event Payload
            </h4>
            {activePayloadLog && (
              <span className="text-[10px] font-mono text-white/40">ID: {activePayloadLog.id.substring(0, 10)}...</span>
            )}
          </div>

          {activePayloadLog ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-white/30 font-medium block">Metadata</span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-white/40">Type</span><span className="text-white font-mono">{activePayloadLog.eventType}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Source</span><span className="text-white capitalize">{activePayloadLog.source}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Timestamp</span><span className="text-white font-mono">{activePayloadLog.timestamp}</span></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-white/30 font-medium block">Data Payload</span>
                <pre className="p-4 bg-black/60 border border-white/5 rounded-2xl font-mono text-[10px] text-white/90 overflow-x-auto leading-relaxed max-h-[300px]">
                  {JSON.stringify(activePayloadLog.payload, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-white/30">
              Select an event from the stream to inspect its live data payload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
