"use client";

import React, { useState } from "react";
import { 
  MOCK_SYNC_JOBS, 
  SyncJob 
} from "./mockData";
import { 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Database,
  ArrowRight,
  ShieldCheck,
  Split,
  Search,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConflictItem {
  id: string;
  field: string;
  localValue: string;
  externalValue: string;
  entityName: string;
  entityType: string;
  externalSource: string;
}

export function SyncMonitor() {
  const [jobs, setJobs] = useState<SyncJob[]>(MOCK_SYNC_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeJobDetails, setActiveJobDetails] = useState<SyncJob | null>(null);
  
  // Interactive conflicts list
  const [conflicts, setConflicts] = useState<ConflictItem[]>([
    {
      id: "conf_1",
      field: "Account Tier",
      localValue: "Platinum",
      externalValue: "Gold",
      entityName: "Rosewood London",
      entityType: "Client",
      externalSource: "Salesforce CRM"
    },
    {
      id: "conf_2",
      field: "Budget",
      localValue: "£45,000",
      externalValue: "£35,000",
      entityName: "London Fashion Week 2026",
      entityType: "Activation Opportunity",
      externalSource: "Salesforce CRM"
    }
  ]);
  
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const handleResolve = (conflictId: string, choice: 'local' | 'external') => {
    setResolvingId(conflictId);
    
    // Simulate resolving
    setTimeout(() => {
      setConflicts(prev => prev.filter(c => c.id !== conflictId));
      setResolvingId(null);
    }, 1000);
  };

  const handleTriggerSync = (id: string) => {
    // Set status to running
    setJobs(prev => prev.map(job => {
      if (job.id === id) {
        return { ...job, status: 'running', startedAt: new Date().toISOString() };
      }
      return job;
    }));

    // Simulate completion
    setTimeout(() => {
      setJobs(prev => prev.map(job => {
        if (job.id === id) {
          return { 
            ...job, 
            status: 'success', 
            processed: job.processed + Math.floor(Math.random() * 10) + 1,
            completedAt: new Date().toISOString() 
          };
        }
        return job;
      }));
    }, 2000);
  };

  const filteredJobs = jobs.filter(job => 
    job.integrationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Conflicts Resolution Section */}
      <AnimatePresence>
        {conflicts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 bg-amber-500/[0.02] border border-amber-500/20 rounded-[2rem] space-y-4"
          >
            <div className="flex items-center space-x-2.5">
              <Split className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-sm font-semibold text-white">Sync Conflicts Identified</h4>
                <p className="text-white/40 text-xs mt-0.5">Discrepancies found between local edits and remote CRM databases. Action required.</p>
              </div>
            </div>

            <div className="space-y-4">
              {conflicts.map((conflict) => (
                <div 
                  key={conflict.id}
                  className="p-5 bg-black/40 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">
                        {conflict.entityType}
                      </span>
                      <span className="text-sm font-medium text-white">{conflict.entityName}</span>
                    </div>
                    <p className="text-xs text-white/50">
                      Field <span className="text-white font-semibold font-mono">{conflict.field}</span> is out of sync.
                    </p>
                  </div>

                  {/* Resolution Choices */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Local Option */}
                    <button
                      onClick={() => handleResolve(conflict.id, 'local')}
                      disabled={resolvingId === conflict.id}
                      className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-semibold text-white transition-all flex flex-col items-center"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-white/40">Keep Local Deck</span>
                      <span className="text-white mt-0.5">{conflict.localValue}</span>
                    </button>

                    <ArrowRight className="w-4 h-4 text-white/30" />

                    {/* External Option */}
                    <button
                      onClick={() => handleResolve(conflict.id, 'external')}
                      disabled={resolvingId === conflict.id}
                      className="px-4 py-2.5 bg-white text-black hover:bg-white/90 rounded-xl text-xs font-semibold transition-all flex flex-col items-center"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-black/50">Keep {conflict.externalSource}</span>
                      <span className="font-semibold mt-0.5">{conflict.externalValue}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Jobs List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold">Synchronization Jobs</h4>
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input 
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-black/40 border border-white/5 rounded-xl focus:border-white/20 focus:outline-none text-xs text-white"
              />
            </div>
          </div>

          <div className="border border-white/5 bg-white/[0.01] rounded-[2rem] overflow-hidden">
            <div className="divide-y divide-white/5">
              {filteredJobs.map((job) => {
                const isRunning = job.status === 'running';
                const isSuccess = job.status === 'success';
                const isFailed = job.status === 'failed';

                return (
                  <div 
                    key={job.id}
                    onClick={() => setActiveJobDetails(job)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.01] transition-colors"
                  >
                    <div className="flex items-start space-x-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Database className="w-5 h-5 text-white/70" />
                      </div>
                      
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{job.integrationName}</h4>
                        <div className="flex items-center space-x-2 mt-1 text-[10px] text-white/40 font-mono">
                          <span className="uppercase font-bold text-white/50">{job.type} sync</span>
                          <span>•</span>
                          <span>Started {new Date(job.startedAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Stats */}
                      <div className="text-right space-y-0.5">
                        <span className="text-[10px] text-white/30 block uppercase font-medium">Reconciled</span>
                        <span className="text-xs font-semibold text-white/80 font-mono">
                          {job.processed} records
                        </span>
                      </div>

                      {/* Status and Action */}
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase",
                          isSuccess && "bg-green-500/10 text-green-400 border border-green-500/20",
                          isFailed && "bg-red-500/10 text-red-400 border border-red-500/20",
                          isRunning && "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        )}>
                          {job.status}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTriggerSync(job.id);
                          }}
                          disabled={isRunning}
                          className="p-2 border border-white/5 hover:bg-white/5 rounded-xl transition-all disabled:opacity-30"
                        >
                          <RefreshCw className={cn("w-3.5 h-3.5 text-white/60", isRunning && "animate-spin")} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Job Diagnostics */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sync Diagnostics
            </h4>
          </div>

          {activeJobDetails ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-white/30 block uppercase font-medium">Pipeline Name</span>
                <span className="text-base font-semibold text-white">{activeJobDetails.integrationName}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-black/40 border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-green-400 block uppercase font-medium">Processed</span>
                  <span className="text-xl font-bold text-white font-mono">{activeJobDetails.processed}</span>
                </div>
                <div className="p-3.5 bg-black/40 border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-red-400 block uppercase font-medium">Failed</span>
                  <span className="text-xl font-bold text-white font-mono">{activeJobDetails.failed}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Sync Protocol</span>
                  <span className="text-white font-mono uppercase">{activeJobDetails.type}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Status</span>
                  <span className="text-white capitalize">{activeJobDetails.status}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Conflict Detections</span>
                  <span className="text-white font-mono">{activeJobDetails.conflicts} resolved</span>
                </div>
                {activeJobDetails.completedAt && (
                  <div className="flex justify-between">
                    <span className="text-white/40">Completed At</span>
                    <span className="text-white font-mono">
                      {new Date(activeJobDetails.completedAt).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-white/30">
              Select a sync job to view complete reconciliation telemetry and details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
