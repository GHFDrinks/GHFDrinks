"use client";

import React, { useState } from "react";
import { Activity, Clock, Filter, MessageSquare, Edit2, Play, Users, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkspaceActivityPage() {
  const [filter, setFilter] = useState("all");

  const fullActivityLog = [
    { id: 1, user: "Sarah Jenkins", role: "Owner", action: "shared a presentation", target: "Q3 Premium Venues Pitch", time: "10 mins ago", type: "share", icon: Users, color: "text-blue-400" },
    { id: 2, user: "Marcus Chen", role: "Admin", action: "left a comment on", target: "Sustainable Portfolio Deck", time: "2 hours ago", type: "comment", icon: MessageSquare, color: "text-accent" },
    { id: 3, user: "Elena Rodriguez", role: "Editor", action: "updated template", target: "Standard Low-ABV Intro", time: "Yesterday", type: "edit", icon: Edit2, color: "text-green-400" },
    { id: 4, user: "David Kim", role: "Viewer", action: "presented", target: "Global Key Accounts: Ritz", time: "Yesterday", type: "present", icon: Play, color: "text-purple-400" },
    { id: 5, user: "Sarah Jenkins", role: "Owner", action: "approved", target: "Holiday Gifting Campaign", time: "3 days ago", type: "approve", icon: Activity, color: "text-green-500" },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Workspace Activity</h1>
          <p className="text-muted-foreground font-light text-lg">Realtime audit log of team collaboration and presentation usage.</p>
        </div>
      </header>

      <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center space-x-2 p-1 bg-black/40 rounded-xl border border-white/10 w-fit">
            {['all', 'comments', 'edits', 'presentations'].map(tab => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === tab ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search activity logs..." 
                className="w-full h-10 pl-10 pr-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
          {fullActivityLog.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={activity.id} 
                className="relative flex items-start group"
              >
                <div className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_rgba(255,255,255,0.02)] group-hover:border-white/40 transition-colors">
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="ml-6 flex-1 bg-black/20 p-5 rounded-2xl border border-white/5 group-hover:bg-black/40 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white/90">
                      <span className="font-medium text-white">{activity.user}</span> 
                      <span className="px-2 py-0.5 mx-2 rounded-md bg-white/5 text-[10px] uppercase tracking-widest text-white/50">{activity.role}</span>
                    </p>
                    <p className="text-xs text-white/40 flex items-center shrink-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                  <p className="text-white/70 text-sm">
                    {activity.action} <span className="font-medium text-white group-hover:text-accent transition-colors cursor-pointer">{activity.target}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
