"use client";

import React, { useState } from "react";
import { CloudSync, CheckCircle2, AlertTriangle, ArrowRight, Database, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function CRMSyncPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("10 minutes ago");

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync("Just now");
    }, 2500);
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Salesforce Sync</h1>
          <p className="text-muted-foreground font-light text-lg">Manage bidirectional data synchronization between GHF Sales and Salesforce CRM.</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="h-12 px-6 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-white transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? "Syncing Data..." : "Force Sync Now"}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-medium">Connection Status</h2>
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-lg font-medium text-white">Connected to Salesforce</span>
            </div>
            <p className="text-white/50 text-sm">Instance: GHF_Drinks_Production_EU</p>
          </div>
          <div className="mt-8 p-4 bg-black/50 rounded-xl border border-white/5">
            <p className="text-sm text-white/70">Last successful sync: <span className="text-white font-medium">{lastSync}</span></p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <CloudSync className="w-6 h-6 text-white/70" />
              <h2 className="text-xl font-medium">Sync Configuration</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
              <div>
                <h4 className="font-medium text-sm text-white">Accounts & Contacts</h4>
                <p className="text-xs text-white/50 mt-1">Bidirectional sync every 15 mins</p>
              </div>
              <div className="w-10 h-6 bg-accent rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
              <div>
                <h4 className="font-medium text-sm text-white">Opportunities</h4>
                <p className="text-xs text-white/50 mt-1">Read-only from Salesforce</p>
              </div>
              <div className="w-10 h-6 bg-accent rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
              <div>
                <h4 className="font-medium text-sm text-white">Activity & Presentations</h4>
                <p className="text-xs text-white/50 mt-1">Push to Salesforce in real-time</p>
              </div>
              <div className="w-10 h-6 bg-accent rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
        <h2 className="text-xl font-medium mb-6">Recent Sync Logs</h2>
        <div className="space-y-4">
          {[
            { id: 1, type: "Push", entity: "Activity Event", details: "Logged presentation session for 'The Ritz London'", status: "Success", time: "10 mins ago" },
            { id: 2, type: "Pull", entity: "Account", details: "Updated tier for 'Hawksmoor' to Gold", status: "Success", time: "1 hour ago" },
            { id: 3, type: "Push", entity: "Note", details: "Pushed relationship note by Sarah Jenkins", status: "Success", time: "2 hours ago" },
          ].map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.type === 'Push' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                  {log.type === 'Push' ? <UploadCloud className="w-4 h-4" /> : <CloudSync className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{log.entity}</h4>
                  <p className="text-xs text-white/50 mt-0.5">{log.details}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="flex items-center space-x-1 text-xs font-medium text-green-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{log.status}</span>
                </span>
                <p className="text-xs text-white/40 mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Temporary import fixes for the file
import { RefreshCw } from "lucide-react";
