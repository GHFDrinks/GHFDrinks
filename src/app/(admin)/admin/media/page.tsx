"use client";

import React, { useState } from "react";
import { Plus, Play, Image as ImageIcon, Search, SlidersHorizontal, Film, FileVideo } from "lucide-react";
import { motion } from "framer-motion";
import { DARK_ADMIN_ACCENT } from "@/lib/admin-theme";

export default function MediaLibraryPage() {
  const [activeTab, setActiveTab] = useState("all");

  const mediaAssets = [
    { id: 1, name: "Maison_Mirabeau_Hero_1440p.mp4", type: "video", size: "142 MB", brand: "Maison Mirabeau", date: "Aug 12, 2026", thumbnail: "https://images.pexels.com/photos/3191578/pexels-photo-3191578.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Sapling_Spirits_Tree_Planting.mp4", type: "video", size: "86 MB", brand: "Sapling Spirits", date: "Aug 10, 2026", thumbnail: "https://images.pexels.com/photos/4255577/pexels-photo-4255577.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Everleaf_Forest_Serve.jpg", type: "image", size: "4.2 MB", brand: "Everleaf", date: "Aug 05, 2026", thumbnail: "https://images.pexels.com/photos/10350734/pexels-photo-10350734.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Double_Dutch_Mixers.jpg", type: "image", size: "3.1 MB", brand: "Double Dutch", date: "Jul 28, 2026", thumbnail: "https://images.pexels.com/photos/6157052/pexels-photo-6157052.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 space-y-8" style={DARK_ADMIN_ACCENT}>
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Media Library</h1>
          <p className="text-muted-foreground font-light text-lg">Manage cinematic video assets and high-resolution imagery for immersive presentations.</p>
        </div>
        <button className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Upload Media</span>
        </button>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <Film className="w-6 h-6 text-accent mb-4" />
          <h3 className="text-3xl font-light mb-1">24</h3>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Cinematic Videos</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <ImageIcon className="w-6 h-6 text-accent mb-4" />
          <h3 className="text-3xl font-light mb-1">142</h3>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Hi-Res Images</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <FileVideo className="w-6 h-6 text-accent mb-4" />
          <h3 className="text-3xl font-light mb-1">4.2 GB</h3>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Total Storage Used</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-accent/10 border border-accent/20 relative overflow-hidden">
          <Play className="w-6 h-6 text-accent mb-4" />
          <h3 className="text-3xl font-light mb-1 text-accent">100%</h3>
          <p className="text-xs font-medium uppercase tracking-widest text-accent/70">Offline Optimized</p>
        </div>
      </div>

      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 p-1 bg-black/40 rounded-xl border border-white/10 w-fit">
            {['all', 'videos', 'images'].map(tab => (
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
                placeholder="Search assets..." 
                className="w-full h-10 pl-10 pr-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-sm"
              />
            </div>
            <button className="h-10 px-4 rounded-xl bg-black/40 border border-white/10 hover:bg-white/5 transition-colors flex items-center space-x-2 text-sm font-medium">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaAssets.map((asset, i) => (
            <motion.div 
              key={asset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl bg-black border border-white/10 overflow-hidden hover:border-white/30 transition-colors"
            >
              <div className="aspect-video relative overflow-hidden">
                <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                {asset.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </button>
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-medium uppercase tracking-widest border border-white/10">
                  {asset.type}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium truncate pr-4">{asset.name}</h4>
                  <button className="text-white/40 hover:text-white transition-colors shrink-0 text-sm font-bold">
                    •••
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{asset.brand}</span>
                  <span>{asset.size}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
