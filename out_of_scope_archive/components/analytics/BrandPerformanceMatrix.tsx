"use client";

import React from "react";
import { motion } from "framer-motion";
import { mockBrands } from "@/data/brands";

export function BrandPerformanceMatrix() {
  // Mock performance data mapped to brands
  const performanceData = mockBrands.map((b, i) => ({
    ...b,
    engagementScore: 75 + Math.random() * 20, // 75-95
    presentationCount: 120 + Math.floor(Math.random() * 400),
    winRate: 40 + Math.random() * 30, // 40-70%
    momentum: (Math.random() > 0.3 ? 1 : -1) * (2 + Math.random() * 8) // -10 to +10%
  })).sort((a, b) => b.engagementScore - a.engagementScore);

  return (
    <div className="bg-black/40 border border-white/5 rounded-[2rem] overflow-hidden">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-wide">Brand Engagement Matrix</h2>
          <p className="text-sm text-white/40">Portfolio performance across all active presentations</p>
        </div>
        <select className="bg-white/5 border border-white/10 text-sm rounded-lg px-4 py-2 outline-none text-white/70">
          <option>All Categories</option>
          <option>Spirits</option>
          <option>Wine</option>
          <option>No & Low Alc</option>
        </select>
      </div>

      <div className="p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-white/40 border-b border-white/10">
                <th className="pb-4 font-medium pl-4">Brand</th>
                <th className="pb-4 font-medium text-center">Engagement</th>
                <th className="pb-4 font-medium text-center">Pitches</th>
                <th className="pb-4 font-medium text-center">Win Rate</th>
                <th className="pb-4 font-medium text-right pr-4">Momentum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {performanceData.map((data, i) => (
                <motion.tr 
                  key={data.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 pl-4 flex items-center space-x-4">
                    <img src={data.heroImage.url} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-white group-hover:text-accent transition-colors">{data.name}</div>
                      <div className="text-xs text-white/40">{data.category}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-light mb-1">{data.engagementScore.toFixed(1)}</div>
                      <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${data.engagementScore}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-accent"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center text-white/70 font-light text-lg">
                    {data.presentationCount}
                  </td>
                  <td className="py-4 text-center text-white/70 font-light text-lg">
                    {data.winRate.toFixed(1)}%
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className={`inline-flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${data.momentum > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      <span>{data.momentum > 0 ? '+' : ''}{data.momentum.toFixed(1)}%</span>
                    </div>
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
