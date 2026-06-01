"use client";

import React, { useState } from "react";
import { 
  INITIAL_WORKFLOWS, 
  Workflow 
} from "./mockData";
import { 
  Zap, 
  Play, 
  Trash2, 
  Plus, 
  Check, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Edit3,
  ListRestart,
  ArrowRight,
  Sparkles,
  Search
} from "lucide-react";
import { WorkflowDesigner } from "./WorkflowDesigner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AutomationBuilder() {
  const [workflows, setWorkflows] = useState<Workflow[]>(INITIAL_WORKFLOWS);
  const [search, setSearch] = useState("");
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [showCreateMode, setShowCreateMode] = useState(false);
  const [runHistory, setRunHistory] = useState<{ id: string; name: string; status: 'success' | 'failed'; time: string }[]>([
    { id: "rh_1", name: "Luxury Follow-Up Trigger", status: "success", time: "10 mins ago" },
    { id: "rh_2", name: "Salesforce Deal Accelerator", status: "success", time: "18 mins ago" },
    { id: "rh_3", name: "Urgent Slack Notification on Sync Failure", status: "failed", time: "3 hours ago" }
  ]);
  const [runningWorkflowId, setRunningWorkflowId] = useState<string | null>(null);

  const toggleActive = (id: string) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isActive: !w.isActive };
      }
      return w;
    }));
  };

  const handleDelete = (id: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
  };

  const handleRunWorkflow = (workflow: Workflow) => {
    setRunningWorkflowId(workflow.id);

    // Simulate run
    setTimeout(() => {
      const isSuccessful = Math.random() > 0.15;
      const runResult = {
        id: `rh_${Date.now()}`,
        name: workflow.name,
        status: isSuccessful ? "success" as const : "failed" as const,
        time: "Just now"
      };

      setRunHistory(prev => [runResult, ...prev]);
      setRunningWorkflowId(null);
      
      // Update workflow run state
      setWorkflows(prev => prev.map(w => {
        if (w.id === workflow.id) {
          return { 
            ...w, 
            lastRunStatus: isSuccessful ? "success" : "failed",
            lastRunTime: new Date().toISOString()
          };
        }
        return w;
      }));
    }, 1500);
  };

  const saveWorkflow = (name: string, description: string, trigger: string, actions: string[]) => {
    if (editingWorkflow) {
      // Edit mode
      setWorkflows(prev => prev.map(w => {
        if (w.id === editingWorkflow.id) {
          return {
            ...w,
            name,
            description,
            trigger,
            actions
          };
        }
        return w;
      }));
      setEditingWorkflow(null);
    } else {
      // Create mode
      const newWf: Workflow = {
        id: `wf_${Date.now()}`,
        name,
        description,
        trigger,
        actions,
        isActive: true,
        lastRunStatus: "idle"
      };
      setWorkflows([newWf, ...workflows]);
      setShowCreateMode(false);
    }
  };

  const filtered = workflows.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) || 
    w.description.toLowerCase().includes(search.toLowerCase()) ||
    w.trigger.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {showCreateMode || editingWorkflow ? (
          <motion.div
            key="designer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <WorkflowDesigner
              workflow={editingWorkflow}
              onSave={saveWorkflow}
              onCancel={() => {
                setShowCreateMode(false);
                setEditingWorkflow(null);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search automated workflows..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm transition-colors placeholder:text-white/30 text-white"
                />
              </div>

              <button
                onClick={() => setShowCreateMode(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-white/95 rounded-xl text-xs font-semibold shadow-lg shadow-white/5 transition-all cursor-pointer w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>Create Workflow</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Workflows List */}
              <div className="lg:col-span-2 space-y-4">
                {filtered.map((wf) => {
                  const isRunning = runningWorkflowId === wf.id;
                  
                  return (
                    <div 
                      key={wf.id}
                      className={cn(
                        "p-6 rounded-[2rem] border transition-all duration-300 bg-white/[0.02] flex flex-col justify-between gap-6",
                        wf.isActive ? "border-white/10" : "border-white/5 opacity-60"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                              <Zap className="w-4 h-4" />
                            </div>
                            <h4 className="text-base font-medium text-white">{wf.name}</h4>
                            
                            <button
                              onClick={() => toggleActive(wf.id)}
                              className={cn(
                                "w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 relative shrink-0",
                                wf.isActive ? "bg-white" : "bg-white/10"
                              )}
                            >
                              <div className={cn(
                                "w-4.5 h-4.5 rounded-full transition-transform duration-300 shadow-sm",
                                wf.isActive ? "translate-x-4.5 bg-black" : "translate-x-0 bg-white/60"
                              )} />
                            </button>
                          </div>

                          <p className="text-white/50 text-xs leading-relaxed max-w-xl">
                            {wf.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-white/40">
                            <span className="text-white/60 font-semibold">TRIGGER:</span>
                            <span className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/70">
                              {wf.trigger}
                            </span>
                            <span>•</span>
                            <span>{wf.actions.length} Actions configured</span>
                          </div>
                        </div>

                        {/* Quick Trigger Button */}
                        <div className="flex sm:flex-col items-center sm:items-end gap-2.5 justify-between shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                          <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                            wf.lastRunStatus === "success" && "bg-green-500/10 text-green-400 border border-green-500/10",
                            wf.lastRunStatus === "failed" && "bg-red-500/10 text-red-400 border border-red-500/10",
                            wf.lastRunStatus === "idle" && "bg-white/5 text-white/40 border border-white/5"
                          )}>
                            Last Run: {wf.lastRunStatus}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRunWorkflow(wf)}
                              disabled={isRunning || !wf.isActive}
                              className="px-3 py-1.5 border border-white/10 hover:bg-white/5 disabled:opacity-30 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5"
                            >
                              {isRunning ? (
                                <ListRestart className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                              <span>Test Run</span>
                            </button>

                            <button
                              onClick={() => setEditingWorkflow(wf)}
                              className="p-1.5 border border-white/5 hover:bg-white/5 text-white/60 hover:text-white rounded-lg transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDelete(wf.id)}
                              className="p-1.5 border border-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Horizontal Steps Pipeline Preview */}
                      <div className="flex items-center flex-wrap gap-2 pt-4 border-t border-white/5">
                        <span className="text-[9px] uppercase font-bold text-white/30 tracking-wider">Flow:</span>
                        {wf.actions.map((act, index) => {
                          const isLast = index === wf.actions.length - 1;
                          return (
                            <React.Fragment key={act}>
                              <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-xs font-medium text-white/70">
                                {act}
                              </span>
                              {!isLast && <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Execution Logs */}
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-white/60" />
                    Automation Runs
                  </h4>
                </div>

                <div className="space-y-3.5 divide-y divide-white/5 max-h-[400px] overflow-y-auto pr-1">
                  {runHistory.map((run, idx) => (
                    <div key={run.id} className={cn("flex items-center justify-between text-xs pt-3.5", idx === 0 ? "pt-0" : "")}>
                      <div className="min-w-0">
                        <span className="font-medium text-white block truncate">{run.name}</span>
                        <span className="text-[10px] text-white/30 font-mono mt-0.5 block">{run.time}</span>
                      </div>
                      
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase shrink-0 ml-2 border",
                        run.status === 'success' 
                          ? 'bg-green-500/5 text-green-400 border-green-500/10' 
                          : 'bg-red-500/5 text-red-400 border-red-500/10'
                      )}>
                        {run.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
