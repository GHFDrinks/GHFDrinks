"use client";

import React, { useState } from "react";
import { 
  Webhook, 
  INITIAL_WEBHOOKS,
  Webhook as WebhookType
} from "./mockData";
import { 
  Globe, 
  Key, 
  Calendar, 
  Check, 
  Trash2, 
  Plus, 
  X, 
  Eye, 
  EyeOff, 
  Play, 
  RefreshCw,
  Activity,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function WebhookManager() {
  const [webhooks, setWebhooks] = useState<WebhookType[]>(INITIAL_WEBHOOKS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSecretId, setShowSecretId] = useState<string | null>(null);
  
  // Create Modal Fields
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
  // Test webhook details
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ status: number; body: string } | null>(null);

  const availableEvents = [
    "presentation_created",
    "presentation_shared",
    "client_viewed_portal",
    "activation_updated",
    "meeting_completed",
    "recommendation_generated",
    "content_published",
    "engagement_recorded"
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUrl || selectedEvents.length === 0) return;
    
    const newWebhook: WebhookType = {
      id: `wh_${Date.now()}`,
      name: newName,
      url: newUrl,
      events: selectedEvents,
      status: 'active',
      secret: `whsec_${Math.random().toString(16).substring(2, 18)}`,
      created_at: new Date().toISOString(),
      successRate: 100.0
    };

    setWebhooks([newWebhook, ...webhooks]);
    setShowCreateModal(false);
    
    // Reset fields
    setNewName("");
    setNewUrl("");
    setSelectedEvents([]);
  };

  const handleDelete = (id: string) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  const handleToggleEvent = (event: string) => {
    setSelectedEvents(prev => 
      prev.includes(event) ? prev.filter(e => e !== event) : [...prev, event]
    );
  };

  const triggerTest = (webhook: WebhookType) => {
    setTestingId(webhook.id);
    setTestResult(null);
    
    setTimeout(() => {
      setTestResult({
        status: 200,
        body: JSON.stringify({
          ok: true,
          delivered_at: new Date().toISOString(),
          payload_type: "ping_test",
          message: "Secure delivery verified via SHA256 signature hash."
        }, null, 2)
      });
      setTestingId(null);
    }, 1500);
  };

  const toggleStatus = (id: string) => {
    setWebhooks(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, status: w.status === 'active' ? 'inactive' : 'active' };
      }
      return w;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-light tracking-wide text-white uppercase">
            Outbound Webhooks
          </h3>
          <p className="text-white/40 text-xs mt-1">
            Subscribe external endpoints to receive real-time payload alerts when actions occur in the presentation workspace.
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-white/95 rounded-xl text-xs font-semibold shadow-lg shadow-white/5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Endpoint</span>
        </button>
      </div>

      {/* Webhooks List */}
      <div className="space-y-6">
        {webhooks.map((webhook) => {
          const isSecretVisible = showSecretId === webhook.id;
          const isTesting = testingId === webhook.id;

          return (
            <div 
              key={webhook.id}
              className={cn(
                "p-6 rounded-[2rem] border transition-all duration-300 bg-white/[0.02]",
                webhook.status === 'active' ? "border-white/10" : "border-white/5 opacity-60"
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Details */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-white">{webhook.name}</h4>
                      <p className="text-white/40 text-xs font-mono select-all mt-0.5">{webhook.url}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-auto lg:ml-0">
                      <button
                        onClick={() => toggleStatus(webhook.id)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase",
                          webhook.status === 'active' 
                            ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                            : "bg-white/10 text-white/50 border border-white/10"
                        )}
                      >
                        {webhook.status}
                      </button>
                      {webhook.successRate && (
                        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded-full border border-emerald-500/10">
                          {webhook.successRate}% delivery rate
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Secret Token Field */}
                  <div className="flex items-center space-x-2 bg-black/40 border border-white/5 px-4 py-2.5 rounded-xl max-w-xl text-xs">
                    <Key className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-white/40 font-mono">Signing Secret:</span>
                    <span className="font-mono text-white/75 flex-1 tracking-wider">
                      {isSecretVisible ? webhook.secret : "••••••••••••••••••••••••••••••••"}
                    </span>
                    <button
                      onClick={() => setShowSecretId(isSecretVisible ? null : webhook.id)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      {isSecretVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Subscribed Events */}
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-white/30 font-medium mb-1.5">
                      Subscribed Events
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {webhook.events.map((evt) => (
                        <span 
                          key={evt}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/70"
                        >
                          {evt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerTest(webhook)}
                      disabled={isTesting || webhook.status !== 'active'}
                      className="px-4 py-2 border border-white/10 hover:bg-white/5 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
                    >
                      {isTesting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Trigger Ping</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(webhook.id)}
                      className="p-2 border border-red-500/10 hover:bg-red-500/10 text-red-400 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-white/30 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Created {new Date(webhook.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Test Response Drawer */}
              {testResult && selectedEvents.length >= 0 && (
                <div className="mt-6 border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-white/50 font-medium">Last Ping Result</span>
                    <span className={cn(
                      "font-semibold flex items-center gap-1",
                      testResult.status === 200 ? "text-green-400" : "text-red-400"
                    )}>
                      <Activity className="w-3.5 h-3.5" /> Status {testResult.status} OK
                    </span>
                  </div>
                  <pre className="p-4 bg-black/60 border border-white/5 rounded-2xl font-mono text-[11px] text-white/80 overflow-x-auto leading-relaxed">
                    {testResult.body}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.form 
              onSubmit={handleCreate}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="text-2xl font-light text-white">New Webhook Endpoint</h4>
                <p className="text-white/40 text-xs mt-1">Configure GHF platform to send webhook payloads to your servers.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-1.5">
                    Endpoint Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Salesforce Flow Link"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-1.5">
                    Payload URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://api.yourdomain.com/webhooks"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-2">
                    Event Subscriptions
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 border border-white/5 p-3 rounded-2xl bg-black/20">
                    {availableEvents.map((evt) => {
                      const isSelected = selectedEvents.includes(evt);
                      return (
                        <button
                          key={evt}
                          type="button"
                          onClick={() => handleToggleEvent(evt)}
                          className={cn(
                            "px-3 py-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between",
                            isSelected 
                              ? "bg-white text-black border-white" 
                              : "bg-white/5 text-white/60 border-white/5 hover:border-white/15"
                          )}
                        >
                          <span>{evt}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-white text-black hover:bg-white/90 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-white/5"
                >
                  Create Endpoint
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
