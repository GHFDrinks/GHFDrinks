"use client";

import React, { useState } from "react";
import { Users, Shield, Plus, MoreVertical, Search, CheckCircle2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function TeamManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const teamMembers = [
    { id: 1, name: "Sarah Jenkins", email: "sarah.j@ghfdrinks.com", role: "Owner", lastActive: "Just now" },
    { id: 2, name: "Marcus Chen", email: "marcus.c@ghfdrinks.com", role: "Admin", lastActive: "2 hours ago" },
    { id: 3, name: "Elena Rodriguez", email: "elena.r@ghfdrinks.com", role: "Editor", lastActive: "Yesterday" },
    { id: 4, name: "David Kim", email: "david.k@ghfdrinks.com", role: "Viewer", lastActive: "3 days ago" },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Team & Permissions</h1>
          <p className="text-muted-foreground font-light text-lg">Manage workspace access, roles, and collaborative permissions.</p>
        </div>
        <button className="h-12 px-6 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-white transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>Invite Member</span>
        </button>
      </header>

      {/* Role Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { role: "Owner", desc: "Full control over workspace and billing" },
          { role: "Admin", desc: "Manage users and team templates" },
          { role: "Editor", desc: "Create and edit shared presentations" },
          { role: "Viewer", desc: "View and present shared decks only" },
        ].map((r, i) => (
          <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
            <h4 className="font-medium text-white mb-2">{r.role}</h4>
            <p className="text-xs text-white/50 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder="Search team members..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white placeholder:text-white/40 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={member.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-medium text-white/70">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-xs text-white/50 mt-0.5">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      {member.role === 'Owner' || member.role === 'Admin' ? (
                        <Shield className="w-4 h-4 text-accent" />
                      ) : (
                        <Users className="w-4 h-4 text-white/40" />
                      )}
                      <span className="text-sm font-medium">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${member.lastActive === 'Just now' ? 'bg-green-400' : 'bg-white/30'}`} />
                      <span className="text-xs text-white/60">{member.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-white/40 hover:text-white transition-colors p-2">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
