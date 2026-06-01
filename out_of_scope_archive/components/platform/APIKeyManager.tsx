"use client";

import React, { useState } from "react";
import { 
  INITIAL_API_KEYS, 
  APIKey 
} from "./mockData";
import { 
  Key, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  X, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function APIKeyManager() {
  const [keys, setKeys] = useState<APIKey[]>(INITIAL_API_KEYS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Key Form Fields
  const [newName, setNewName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [expiryDays, setExpiryDays] = useState("30");
  
  // Generated Key Display
  const [generatedKeyResult, setGeneratedKeyResult] = useState<string | null>(null);

  const availableScopes = [
    { value: "read:brands", label: "Read Brands", desc: "Read brand portfolios and tasting notes" },
    { value: "write:brands", label: "Write Brands", desc: "Add or edit brand variants" },
    { value: "read:presentations", label: "Read Presentations", desc: "Access sales presentations" },
    { value: "write:presentations", label: "Write Presentations", desc: "Create or modify presentations" },
    { value: "read:clients", label: "Read Clients", desc: "View client list and tiers" },
    { value: "write:activities", label: "Write Activities", desc: "Post sales meeting logs and tasks" }
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || selectedScopes.length === 0) return;

    // Generate simulated key
    const rawKey = `ghf_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    const expiresAt = expiryDays === "never" 
      ? null 
      : new Date(Date.now() + parseInt(expiryDays) * 24 * 60 * 60 * 1000).toISOString();

    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      name: newName,
      prefix: "ghf_live_",
      key: `ghf_live_••••••••••••••••${rawKey.substring(rawKey.length - 4)}`,
      scopes: selectedScopes,
      status: "active",
      created_at: new Date().toISOString(),
      last_used_at: "Never",
      expires_at: expiresAt
    };

    setKeys([newKey, ...keys]);
    setGeneratedKeyResult(rawKey);
  };

  const handleToggleScope = (scope: string) => {
    setSelectedScopes(prev => 
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]
    );
  };

  const handleRevoke = (id: string) => {
    setKeys(prev => prev.map(k => {
      if (k.id === id) {
        return { ...k, status: "revoked" };
      }
      return k;
    }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const closeCreateFlow = () => {
    setShowCreateModal(false);
    setGeneratedKeyResult(null);
    setNewName("");
    setSelectedScopes([]);
    setExpiryDays("30");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-light tracking-wide text-white uppercase">
            API Keys & Access Tokens
          </h3>
          <p className="text-white/40 text-xs mt-1">
            Authenticate developers and external connectors securely to pull portfolio information or push CRM actions.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-white/95 rounded-xl text-xs font-semibold shadow-lg shadow-white/5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Key</span>
        </button>
      </div>

      {/* Keys List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {keys.map((key) => {
          const isRevoked = key.status === "revoked";
          return (
            <div 
              key={key.id}
              className={cn(
                "p-6 rounded-[2rem] border transition-all duration-300 bg-white/[0.02] flex flex-col justify-between",
                isRevoked ? "border-white/5 opacity-55" : "border-white/10"
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-2.5">
                    <Key className={cn("w-4.5 h-4.5", isRevoked ? "text-white/30" : "text-white/70")} />
                    <h4 className="text-sm font-semibold text-white truncate">{key.name}</h4>
                  </div>
                  
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                    isRevoked 
                      ? "bg-red-500/10 text-red-400 border border-red-500/10" 
                      : "bg-green-500/10 text-green-400 border border-green-500/10"
                  )}>
                    {key.status}
                  </span>
                </div>

                <div className="bg-black/30 border border-white/5 px-3 py-2 rounded-xl flex items-center justify-between text-xs font-mono mb-4">
                  <span className="text-white/75 select-all">{key.key}</span>
                  {!isRevoked && (
                    <button
                      onClick={() => handleCopy(key.key, key.id)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      {copiedId === key.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {/* Scopes */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] text-white/30 block uppercase font-medium">Scopes</span>
                  <div className="flex flex-wrap gap-1">
                    {key.scopes.map(s => (
                      <span 
                        key={s}
                        className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-white/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono">
                <div className="space-y-1">
                  <div>Last Used: {key.last_used_at}</div>
                  <div>Expires: {key.expires_at ? new Date(key.expires_at).toLocaleDateString() : "Never"}</div>
                </div>

                {!isRevoked && (
                  <button
                    onClick={() => handleRevoke(key.id)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-red-500/10 hover:bg-red-500/10 text-red-400 rounded-lg text-[10px] font-semibold transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Revoke</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Key Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  onClick={closeCreateFlow}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="text-2xl font-light text-white">Generate Client API Key</h4>
                <p className="text-white/40 text-xs mt-1">Issue a secure token to represent external data synchronization jobs.</p>
              </div>

              {!generatedKeyResult ? (
                <form onSubmit={handleCreate} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-1.5">
                        Key Description / Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Salesforce Opportunity Syncer"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-2">
                        Token Scopes (Permissions)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 bg-black/20 border border-white/5 p-3 rounded-2xl">
                        {availableScopes.map((scope) => {
                          const isSelected = selectedScopes.includes(scope.value);
                          return (
                            <button
                              key={scope.value}
                              type="button"
                              onClick={() => handleToggleScope(scope.value)}
                              className={cn(
                                "p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1",
                                isSelected 
                                  ? "bg-white text-black border-white" 
                                  : "bg-white/5 text-white/70 border-white/5 hover:border-white/15"
                              )}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-xs font-semibold">{scope.label}</span>
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <span className={cn(
                                "text-[10px] leading-relaxed",
                                isSelected ? "text-black/60" : "text-white/40"
                              )}>
                                {scope.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-1.5">
                        Expiration
                      </label>
                      <select
                        value={expiryDays}
                        onChange={(e) => setExpiryDays(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-sm text-white cursor-pointer"
                      >
                        <option value="30" className="bg-[#0f0f11]">Expires in 30 Days</option>
                        <option value="90" className="bg-[#0f0f11]">Expires in 90 Days</option>
                        <option value="365" className="bg-[#0f0f11]">Expires in 1 Year</option>
                        <option value="never" className="bg-[#0f0f11]">Never Expire (Not Recommended)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeCreateFlow}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-white text-black hover:bg-white/90 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-white/5"
                    >
                      Generate Key
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-start space-x-3 text-xs text-amber-400">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-semibold block mb-0.5">Please copy this key immediately!</span>
                      For security reasons, you will not be able to view this API key again once this dialog is closed.
                    </div>
                  </div>

                  <div className="bg-black border border-white/10 px-4 py-3.5 rounded-xl flex items-center justify-between text-sm font-mono">
                    <span className="text-white select-all break-all pr-4">{generatedKeyResult}</span>
                    <button
                      onClick={() => handleCopy(generatedKeyResult, "new_key")}
                      className="px-3.5 py-1.5 bg-white text-black hover:bg-white/90 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedId === "new_key" ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={closeCreateFlow}
                    className="w-full py-3 bg-white text-black hover:bg-white/95 rounded-xl text-xs font-semibold transition-all"
                  >
                    I have copied the key securely
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
