"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, FileText, TrendingUp, Phone, Mail, Clock, Presentation, Sparkles } from "lucide-react";

export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // Mock data for prototype
  const client = {
    id: "1",
    name: "The Ritz London",
    industry: "Hospitality - Luxury",
    tier: "Platinum",
    manager: "Sarah Jenkins",
    engagement: 94,
    lastContact: "2 hours ago",
    nextMeeting: "Tomorrow, 2:00 PM",
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10 py-6 border-b border-white/5 -mx-8 px-8 lg:-mx-12 lg:px-12">
        <div className="flex items-center space-x-6">
          <Link href="/clients">
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-light tracking-tight">{client.name}</h1>
            <div className="flex items-center space-x-3 mt-1">
              <span className="px-2 py-0.5 bg-accent/10 rounded-md text-[10px] font-medium uppercase tracking-widest text-accent border border-accent/20">
                {client.tier} Account
              </span>
              <span className="text-muted-foreground text-sm font-medium">{client.industry}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-white">
            <Phone className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-white">
            <Mail className="w-5 h-5" />
          </button>
          <button className="h-12 px-8 rounded-full bg-accent text-accent-foreground font-medium hover:bg-white transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Log Meeting</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          
          {/* Intelligence Overview */}
          <section className="grid grid-cols-2 gap-6">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <TrendingUp className="w-6 h-6 text-accent" />
                <span className="text-sm text-green-400 font-medium">+12% vs last quarter</span>
              </div>
              <h3 className="text-5xl font-light mb-2">{client.engagement}<span className="text-2xl text-white/40">/100</span></h3>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Engagement Score</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-medium text-white/50 mb-1">Next Scheduled Event</h4>
                <p className="text-xl font-medium">{client.nextMeeting}</p>
                <p className="text-sm text-white/70 mt-1">Q3 Portfolio Review & Tasting</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white/50 mb-1">Account Manager</h4>
                <p className="text-lg">{client.manager}</p>
              </div>
            </div>
          </section>

          {/* Relationship Timeline */}
          <section className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light">Activity Timeline</h2>
              <button className="text-sm text-accent hover:text-white transition-colors font-medium">View Full History</button>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(255,255,255,0.02)] z-10">
                  <Presentation className="w-5 h-5 text-accent" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg ml-6 md:ml-0 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-accent font-medium">Presentation Viewed</span>
                    <span className="text-xs text-white/40 flex items-center"><Clock className="w-3 h-3 mr-1"/> 2 hrs ago</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">Client opened the "Summer Rosé Selection" presentation and spent 14 minutes reviewing the Maison Mirabeau slides.</p>
                  <button className="text-xs font-medium uppercase tracking-widest text-white/50 hover:text-white transition-colors">View Analytics</button>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/20 bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-white/50 transition-colors">
                  <Calendar className="w-5 h-5 text-white/60" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/5 border border-white/10 ml-6 md:ml-0 opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">In-Person Meeting</span>
                    <span className="text-xs text-white/40">Aug 14, 2026</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">Discussed Q3 placement opportunities. High interest in low-ABV alternatives for the cocktail menu.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Top Brands Heatmap / Interest */}
          <section className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <h2 className="text-xl font-medium mb-6">Brand Interest</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80 font-medium">Sapling Spirits</span>
                  <span className="text-white/50">High</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full w-[85%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80 font-medium">Maison Mirabeau</span>
                  <span className="text-white/50">Medium</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent/60 rounded-full w-[60%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80 font-medium">Everleaf</span>
                  <span className="text-white/50">Growing</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent/40 rounded-full w-[40%]" />
                </div>
              </div>
            </div>
            <Link href={`/clients/${client.id}/recommendations`}>
              <button className="w-full mt-8 py-3 rounded-xl bg-accent text-accent-foreground hover:bg-white transition-colors text-sm font-medium flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>View AI Recommendations</span>
              </button>
            </Link>
          </section>

          {/* Quick Notes */}
          <section className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Relationship Notes</h2>
              <FileText className="w-4 h-4 text-white/40" />
            </div>
            <textarea 
              rows={5} 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none transition-colors text-sm leading-relaxed resize-none"
              defaultValue="Head bartender (Marco) prefers sustainable brands. Will be refreshing the menu in October. Key decision maker for spirits."
            />
            <button className="mt-4 text-sm font-medium text-accent hover:text-white transition-colors">
              Save Notes
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
