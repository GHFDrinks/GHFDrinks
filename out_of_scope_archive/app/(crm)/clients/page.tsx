"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Building2, TrendingUp, Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_CLIENTS = [
  { id: "1", name: "The Ritz London", industry: "Hospitality - Luxury", tier: "Platinum", lastContact: "2 hours ago", engagement: 94 },
  { id: "2", name: "Soho House", industry: "Members Club", tier: "Platinum", lastContact: "Yesterday", engagement: 88 },
  { id: "3", name: "Hawksmoor", industry: "Restaurant Group", tier: "Gold", lastContact: "3 days ago", engagement: 72 },
  { id: "4", name: "Connaught Bar", industry: "Bar - Premium", tier: "Platinum", lastContact: "1 week ago", engagement: 91 },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = MOCK_CLIENTS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Accounts</h1>
          <p className="text-muted-foreground font-light text-lg">Manage relationships and track presentation engagement.</p>
        </div>
        <button className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Account</span>
        </button>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Building2 className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <Building2 className="w-6 h-6 text-accent mb-4" />
            <h3 className="text-4xl font-light mb-2">124</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Active Accounts</p>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <TrendingUp className="w-6 h-6 text-accent mb-4" />
            <h3 className="text-4xl font-light mb-2">86%</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Engagement Rate</p>
          </div>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Calendar className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <Calendar className="w-6 h-6 text-accent mb-4" />
            <h3 className="text-4xl font-light mb-2">12</h3>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Meetings This Week</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder="Search accounts or industries..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                <th className="px-6 py-4 font-medium">Account Name</th>
                <th className="px-6 py-4 font-medium">Industry</th>
                <th className="px-6 py-4 font-medium">Tier</th>
                <th className="px-6 py-4 font-medium">Last Contact</th>
                <th className="px-6 py-4 font-medium">Engagement Score</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={client.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <Link href={`/clients/${client.id}`} className="block">
                      <div className="font-medium text-lg group-hover:text-accent transition-colors">{client.name}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-5 text-white/70">{client.industry}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium uppercase tracking-widest text-accent">
                      {client.tier}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-white/70">{client.lastContact}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden w-24">
                        <div 
                          className="h-full bg-accent rounded-full" 
                          style={{ width: `${client.engagement}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{client.engagement}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link href={`/clients/${client.id}`}>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center inline-flex group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                        <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-accent" />
                      </div>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredClients.length === 0 && (
            <div className="text-center py-12 text-white/40">
              No accounts found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
