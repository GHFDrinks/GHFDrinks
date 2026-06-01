"use client";

import React from "react";
import { Activity, Calendar, Presentation, MessageSquare, Clock } from "lucide-react";

export default function ActivityFeedPage() {
  const activities = [
    { id: 1, type: "presentation", title: "Presentation Viewed", account: "The Ritz London", time: "2 hours ago", icon: Presentation, desc: "Sarah Jenkins opened the Q3 Spirits Proposal" },
    { id: 2, type: "meeting", title: "Meeting Logged", account: "Hawksmoor", time: "5 hours ago", icon: Calendar, desc: "In-person tasting session completed" },
    { id: 3, type: "note", title: "Relationship Note Added", account: "Soho House", time: "Yesterday", icon: MessageSquare, desc: "Updated key decision maker contact info" },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Activity Feed</h1>
          <p className="text-muted-foreground font-light text-lg">Real-time intelligence on account interactions and presentations.</p>
        </div>
      </header>

      <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Activity className="w-24 h-24" />
        </div>
        
        <div className="space-y-6 relative z-10 before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="relative flex items-center group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/10 bg-black shrink-0 z-10 group-hover:border-accent transition-colors">
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-accent transition-colors" />
                </div>
                <div className="w-[calc(100%-4rem)] p-6 rounded-2xl bg-white/5 border border-white/5 shadow-lg ml-6 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">{activity.title} • <span className="text-white/60">{activity.account}</span></span>
                    <span className="text-xs text-white/40 flex items-center"><Clock className="w-3 h-3 mr-1"/> {activity.time}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{activity.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
