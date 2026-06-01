"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Presentation, Target, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";

export function ExecutiveOverview() {
  const kpis = [
    { label: "Portfolio Momentum", value: "84.2", trend: "+12.4%", isPositive: true, icon: TrendingUp },
    { label: "Active Presentations", value: "1,248", trend: "+5.2%", isPositive: true, icon: Presentation },
    { label: "Engagement Rate", value: "68%", trend: "-2.1%", isPositive: false, icon: Users },
    { label: "Pipeline Impact", value: "£4.2M", trend: "+18.5%", isPositive: true, icon: Target },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/40 border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white/60" />
                </div>
                <div className={cn(
                  "flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full",
                  kpi.isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                )}>
                  {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{kpi.trend}</span>
                </div>
              </div>
              <h3 className="text-4xl font-light tracking-tight mb-1">{kpi.value}</h3>
              <p className="text-white/40 text-sm tracking-wide">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Chart Area (Mocked for Visuals) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-black/40 border border-white/5 rounded-[2rem] p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-medium tracking-wide">Sales Momentum</h2>
              <p className="text-sm text-white/40">Portfolio engagement vs pipeline generated (Q3)</p>
            </div>
            <select className="bg-white/5 border border-white/10 text-sm rounded-lg px-3 py-1 outline-none text-white/70">
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2 pt-4 relative">
            {/* Mock Chart Bars */}
            {[40, 55, 45, 70, 65, 80, 75, 90, 85, 100, 95, 110].map((height, i) => (
              <div key={i} className="w-full relative group h-full flex flex-col justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(height / 110) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.05), ease: "easeOut" }}
                  className="w-full bg-accent/20 rounded-t-sm group-hover:bg-accent/40 transition-colors relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black px-2 py-1 rounded text-xs">
                    {height}k
                  </div>
                </motion.div>
              </div>
            ))}
            
            {/* Mock Trend Line overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                d="M 0,200 Q 100,180 200,150 T 400,100 T 600,80 T 800,20" 
                fill="none" 
                stroke="var(--accent)" 
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(var(--accent),0.5)]"
              />
            </svg>
          </div>
        </motion.div>

        {/* AI Insight Sidebar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-accent/5 border border-accent/20 rounded-[2rem] p-8 flex flex-col"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-medium text-accent">Copilot Insights</h2>
          </div>
          
          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-white text-sm font-medium mb-2">Emerging Trend</h3>
              <p className="text-white/60 text-sm leading-relaxed">Presentations featuring the "Riviera Summer Terrace" activation are converting at 3.2x the standard rate this month.</p>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <h3 className="text-white text-sm font-medium mb-2">Attention Required</h3>
              <p className="text-white/60 text-sm leading-relaxed">Non-alc category engagement dropped 12% in the North region. Suggest pushing Everleaf masterclass training.</p>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <h3 className="text-white text-sm font-medium mb-2">Portfolio Synergy</h3>
              <p className="text-white/60 text-sm leading-relaxed">Accounts adopting Maison Mirabeau are 40% more likely to list Sapling if pitched in the same session.</p>
            </div>
          </div>
          
          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium mt-6 text-white">
            Generate Executive Report
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
