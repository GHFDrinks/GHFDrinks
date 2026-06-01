"use client";

import React, { useState } from "react";
import { FileText, Search, Filter, MoreVertical, Play, MessageSquare, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkspacePresentationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const presentations = [
    { id: 1, name: "Q3 Premium Venues Pitch", author: "Sarah Jenkins", role: "Owner", updated: "2 hours ago", views: 24, comments: 3, status: "Active" },
    { id: 2, name: "Sustainable Portfolio Deck", author: "Team Template", role: "System", updated: "Last Week", views: 142, comments: 0, status: "Template" },
    { id: 3, name: "Global Key Accounts: Ritz", author: "Marcus Chen", role: "Admin", updated: "2 Weeks Ago", views: 8, comments: 12, status: "In Review" },
    { id: 4, name: "Low-ABV Masterclass", author: "Elena Rodriguez", role: "Editor", updated: "1 Month Ago", views: 56, comments: 1, status: "Active" }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Team Presentations</h1>
          <p className="text-muted-foreground font-light text-lg">Collaborate, review, and manage the shared presentation library.</p>
        </div>
        <button className="h-12 px-6 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-white transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Shared Deck</span>
        </button>
      </header>

      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 p-1 bg-black/40 rounded-xl border border-white/10 w-fit">
            {['all', 'active', 'in review', 'templates'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
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
                placeholder="Search presentations..." 
                className="w-full h-10 pl-10 pr-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-sm"
              />
            </div>
            <button className="h-10 px-4 rounded-xl bg-black/40 border border-white/10 hover:bg-white/5 transition-colors flex items-center space-x-2 text-sm font-medium">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {presentations.map((pres, i) => (
            <motion.div 
              key={pres.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-colors group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white/70 group-hover:text-accent transition-colors" />
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest border ${
                    pres.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    pres.status === 'In Review' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                    'bg-white/5 text-white/50 border-white/10'
                  }`}>
                    {pres.status}
                  </span>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mb-2 pr-8">{pres.name}</h3>
              <p className="text-sm text-white/50 mb-8">
                Created by <span className="text-white/80">{pres.author}</span> • {pres.updated}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center space-x-6 text-sm text-white/50">
                  <span className="flex items-center">
                    <Play className="w-4 h-4 mr-2" /> {pres.views} Views
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" /> {pres.comments} Comments
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link href={`/presentations/new?edit=${pres.id}`}>
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium">
                      Edit
                    </button>
                  </Link>
                  <Link href={`/immersive/${pres.id}`}>
                    <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-white transition-colors text-xs font-medium">
                      Present
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
