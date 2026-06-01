"use client";

import React, { useState } from "react";
import { Link as LinkIcon, Database, CheckCircle2, Settings2, Key, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IntegrationsPage() {
  const [salesforceConnected, setSalesforceConnected] = useState(true);

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Integrations</h1>
          <p className="text-muted-foreground font-light text-lg">Connect GHF Deck with your enterprise systems.</p>
        </div>
      </header>

      <div className="space-y-6">
        {/* Salesforce Integration */}
        <div className={`p-8 rounded-[2rem] border ${salesforceConnected ? 'bg-accent/5 border-accent/20' : 'bg-white/5 border-white/10'} relative overflow-hidden transition-colors`}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Database className="w-24 h-24" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium">Salesforce CRM</h2>
                  <div className="flex items-center space-x-2 mt-1 text-sm font-medium">
                    {salesforceConnected ? (
                      <>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-green-400">Connected & Active</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="text-white/50">Not Connected</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-white/60 max-w-xl leading-relaxed mb-6">
                Synchronize Accounts, Opportunities, and Activity Events between GHF Deck and Salesforce. This powers the CRM Intelligence dashboard.
              </p>
              
              {salesforceConnected && (
                <div className="flex items-center space-x-4">
                  <Link href="/crm-sync">
                    <button className="px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-white transition-colors text-sm">
                      View Sync Status
                    </button>
                  </Link>
                  <button className="px-6 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors text-sm flex items-center space-x-2">
                    <Settings2 className="w-4 h-4" />
                    <span>Mapping Config</span>
                  </button>
                </div>
              )}
            </div>

            {!salesforceConnected && (
              <button 
                onClick={() => setSalesforceConnected(true)}
                className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors shrink-0"
              >
                Connect Account
              </button>
            )}
          </div>
        </div>

        {/* Auth0 / Identity Provider */}
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden opacity-70">
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Key className="w-6 h-6 text-white/50" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium">Enterprise SSO</h2>
                  <p className="text-sm font-medium text-white/50 mt-1">SAML & OAuth2 Providers</p>
                </div>
              </div>
              <p className="text-white/60 max-w-xl leading-relaxed mb-6">
                Configure Single Sign-On for your sales organization via Azure AD, Okta, or Google Workspace.
              </p>
            </div>
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors shrink-0 text-sm">
              Configure SSO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
