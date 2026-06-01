"use client";

import React from "react";
import { Users, FileText, Activity, ArrowRight, MessageSquare, Plus, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WorkspaceHubPage() {
  const teamActivity = [
    { id: 1, user: "Sarah Jenkins", action: "shared a presentation", target: "Q3 Premium Venues Pitch", time: "10 mins ago", type: "share" },
    { id: 2, user: "Marcus Chen", action: "commented on", target: "Sustainable Portfolio Deck", time: "2 hours ago", type: "comment" },
    { id: 3, user: "Elena Rodriguez", action: "updated template", target: "Standard Low-ABV Intro", time: "Yesterday", type: "edit" },
  ];

  const sharedPresentations = [
    { id: "p1", name: "Q3 Premium Venues Pitch", author: "Sarah Jenkins", views: 24, lastUpdated: "Today" },
    { id: "p2", name: "Sustainable Portfolio Deck", author: "Team Template", views: 142, lastUpdated: "Last Week" },
    { id: "p3", name: "Global Key Accounts: Ritz", author: "Marcus Chen", views: 8, lastUpdated: "2 Weeks Ago" },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Team Hub</h1>
          <p className="text-muted-foreground font-light text-lg">Collaborate on presentations and share resources across the UK Sales Team.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/workspace/team">
            <button className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium">
              Manage Team
            </button>
          </Link>
          <button className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Shared Deck</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <Users className="w-6 h-6 text-accent mb-4" />
            <h3 className="text-4xl font-light mb-2">12</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Active Members</p>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <FileText className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <FileText className="w-6 h-6 text-accent mb-4" />
            <h3 className="text-4xl font-light mb-2">48</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Shared Presentations</p>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <MessageSquare className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <MessageSquare className="w-6 h-6 text-accent mb-4" />
            <h3 className="text-4xl font-light mb-2">5</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Open Reviews</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Shared Presentations Board */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-medium">Shared Presentations</h2>
            <Link href="/workspace/presentations" className="text-sm text-accent hover:text-white transition-colors font-medium">View All</Link>
          </div>
          
          <div className="space-y-4">
            {sharedPresentations.map((pres, i) => (
              <motion.div 
                key={pres.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <FileText className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white group-hover:text-accent transition-colors">{pres.name}</h4>
                    <p className="text-sm text-white/50 mt-1">Shared by {pres.author} • {pres.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">{pres.views}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Team Views</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-accent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Realtime Activity Feed */}
        <div className="lg:col-span-1">
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium flex items-center space-x-2">
                <Activity className="w-5 h-5 text-accent" />
                <span>Team Activity</span>
              </h2>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
              {teamActivity.map((activity, i) => (
                <div key={activity.id} className="relative flex items-start group">
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-white/20 flex items-center justify-center shrink-0 z-10 mt-0.5">
                    {activity.type === 'share' && <Users className="w-3.5 h-3.5 text-blue-400" />}
                    {activity.type === 'comment' && <MessageSquare className="w-3.5 h-3.5 text-accent" />}
                    {activity.type === 'edit' && <FileText className="w-3.5 h-3.5 text-green-400" />}
                  </div>
                  <div className="ml-5">
                    <p className="text-sm text-white/90 leading-snug">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium text-accent">{activity.target}</span>
                    </p>
                    <p className="text-xs text-white/40 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 rounded-xl bg-black/40 border border-white/10 text-white/60 hover:text-white transition-colors text-sm font-medium">
              View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
