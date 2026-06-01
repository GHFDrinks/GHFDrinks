"use client";

import React from "react";
import { Calendar, Plus, MapPin, Users, ChevronRight } from "lucide-react";

export default function MeetingsPage() {
  const meetings = [
    { id: 1, title: "Q3 Portfolio Review", client: "The Ritz London", date: "Tomorrow, 2:00 PM", location: "150 Piccadilly, London", attendees: 3, status: "Upcoming" },
    { id: 2, title: "Tasting Session: Low ABV", client: "Connaught Bar", date: "Aug 15, 4:00 PM", location: "Carlos Pl, London", attendees: 2, status: "Upcoming" },
    { id: 3, title: "Initial Discovery", client: "Soho House", date: "Aug 10, 11:00 AM", location: "Virtual", attendees: 4, status: "Completed" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Meetings</h1>
          <p className="text-muted-foreground font-light text-lg">Schedule and track client engagements and tasting sessions.</p>
        </div>
        <button className="h-12 px-6 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-white transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Schedule Meeting</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-light mb-2">12</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Upcoming This Month</p>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-light mb-2">45</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Completed (YTD)</p>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-light mb-2">8</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Requires Follow-up</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                <Calendar className="w-6 h-6 text-white/50 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-medium">{meeting.title}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-widest border ${
                    meeting.status === 'Upcoming' 
                      ? 'bg-accent/10 text-accent border-accent/20' 
                      : 'bg-white/5 text-white/50 border-white/10'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
                <p className="text-white/60 mb-4">{meeting.client}</p>
                <div className="flex items-center space-x-6 text-sm text-white/40">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {meeting.date}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {meeting.location}</span>
                  <span className="flex items-center"><Users className="w-4 h-4 mr-2" /> {meeting.attendees} Attendees</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 md:pl-6 md:border-l border-white/5">
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                View Details
              </button>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
