"use client";

import React from "react";
import { TrendingUp, Users, BookOpen, Clock, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SalesInsightsPage() {
  const topBrands = [
    { name: "Sapling Spirits", views: 142, trend: "+12%" },
    { name: "Maison Mirabeau", views: 98, trend: "+5%" },
    { name: "Everleaf", views: 86, trend: "+18%" },
    { name: "Double Dutch", views: 64, trend: "-2%" },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Sales Insights</h1>
          <p className="text-muted-foreground font-light text-lg">Platform intelligence and presentation engagement metrics.</p>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <BookOpen className="w-16 h-16" />
          </div>
          <div className="relative z-10">
            <BookOpen className="w-5 h-5 text-accent mb-4" />
            <h3 className="text-3xl font-light mb-1">284</h3>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Presentations Delivered</p>
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-16 h-16" />
          </div>
          <div className="relative z-10">
            <Users className="w-5 h-5 text-accent mb-4" />
            <h3 className="text-3xl font-light mb-1">45</h3>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Active Accounts</p>
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clock className="w-16 h-16" />
          </div>
          <div className="relative z-10">
            <Clock className="w-5 h-5 text-accent mb-4" />
            <h3 className="text-3xl font-light mb-1">14m</h3>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Avg. Session Duration</p>
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity className="w-16 h-16" />
          </div>
          <div className="relative z-10">
            <Activity className="w-5 h-5 text-green-400 mb-4" />
            <h3 className="text-3xl font-light mb-1 text-green-400">+24%</h3>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Overall Engagement</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Brands Heatmap */}
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium">Most Viewed Brands</h2>
            <TrendingUp className="w-5 h-5 text-white/40" />
          </div>
          <div className="space-y-6">
            {topBrands.map((brand, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/90 font-medium">{brand.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-white/50">{brand.views} views</span>
                    <span className={brand.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{brand.trend}</span>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full" 
                    style={{ width: `${(brand.views / topBrands[0].views) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highly Engaged Accounts */}
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium">Highly Engaged Accounts</h2>
            <button className="text-sm text-accent hover:text-white transition-colors font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: "The Ritz London", score: 94, link: "1" },
              { name: "Connaught Bar", score: 91, link: "4" },
              { name: "Soho House", score: 88, link: "2" },
            ].map((account, i) => (
              <Link key={i} href={`/clients/${account.link}`} className="block">
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20 hover:bg-white/5 transition-colors group">
                  <span className="font-medium group-hover:text-accent transition-colors">{account.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-white/80">{account.score} Score</span>
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-accent" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
