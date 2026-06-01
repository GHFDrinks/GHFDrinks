"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Key, 
  Globe, 
  Sliders, 
  HelpCircle,
  Save,
  Check,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PlatformSettingsPanel() {
  const [webhookSignatureEnabled, setWebhookSignatureEnabled] = useState(true);
  const [rateLimit, setRateLimit] = useState(250); // Req/min
  const [retryAttempts, setRetryAttempts] = useState(3);
  const [ipWhitelist, setIpWhitelist] = useState("104.22.82.110, 82.44.19.220, 192.168.1.1");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 bg-white/[0.01] border border-white/5 p-8 rounded-[2.5rem] max-w-3xl">
      {/* Title */}
      <div className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h3 className="text-xl font-light text-white uppercase tracking-wider">Global Platform Policy</h3>
          <p className="text-white/40 text-xs mt-1">Configure security constraints, delivery policies, and rate limits for all client gateways.</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black hover:bg-white/95 rounded-xl text-xs font-semibold shadow-lg shadow-white/5 transition-all cursor-pointer disabled:opacity-40"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span>Saved Successfully</span>
            </>
          ) : saving ? (
            <span>Saving Settings...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Policy</span>
            </>
          )}
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Section 1: Security */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white/70" />
            Security & Cryptography
          </h4>
          
          <div className="flex items-center justify-between gap-6">
            <div className="space-y-0.5 max-w-lg">
              <label className="text-xs font-semibold text-white block">Enforce Signed Webhook Deliveries</label>
              <span className="text-[11px] text-white/40 leading-relaxed block">
                Encrypt outgoing payloads with a SHA-256 HMAC header token matching the endpoint secret. Prevents MITM verification spoofing.
              </span>
            </div>
            
            <button
              onClick={() => setWebhookSignatureEnabled(!webhookSignatureEnabled)}
              className={cn(
                "w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 relative shrink-0",
                webhookSignatureEnabled ? "bg-white" : "bg-white/10"
              )}
            >
              <div className={cn(
                "w-4.5 h-4.5 rounded-full transition-transform duration-300 shadow-sm",
                webhookSignatureEnabled ? "translate-x-4.5 bg-black" : "translate-x-0 bg-white/60"
              )} />
            </button>
          </div>
        </div>

        {/* Section 2: Rate Limits */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-white/70" />
            Access Controls & Limits
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-white">Default API Key Rate Limit</label>
              <span className="font-semibold text-white font-mono">{rateLimit} Req/min</span>
            </div>
            
            <input 
              type="range"
              min="50"
              max="1000"
              step="50"
              value={rateLimit}
              onChange={(e) => setRateLimit(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <span className="text-[10px] text-white/35 block leading-relaxed">
              Global limit allocated per active developer credential. Excessive traffic receives a 429 Too Many Requests response code.
            </span>
          </div>
        </div>

        {/* Section 3: Webhook Retries */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-white/70" />
            Webhook Delivery Strategy
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-6">
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-white block">Auto-Retry Deliveries</label>
                <span className="text-[11px] text-white/40 block">Number of attempts before moving payloads to dead-letter queue.</span>
              </div>
              
              <select
                value={retryAttempts}
                onChange={(e) => setRetryAttempts(parseInt(e.target.value))}
                className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white cursor-pointer"
              >
                <option value="1">1 Attempt</option>
                <option value="3">3 Attempts (Exponential Backoff)</option>
                <option value="5">5 Attempts (Maximum)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: IP Whitelist */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-white/70" />
            IP Address Restrictions
          </h4>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">API Gateway Whitelist (CIDR Rules)</label>
            <input 
              type="text" 
              value={ipWhitelist}
              onChange={(e) => setIpWhitelist(e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-xs text-white font-mono"
            />
            <span className="text-[10px] text-white/35 block leading-relaxed">
              Comma-separated list of approved IP addresses or ranges allowed to trigger inbound sync gateways. Leave empty to allow any IP.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
