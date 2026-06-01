import React from "react";
import Link from "next/link";
import { Plus, Wine, Image as ImageIcon, Users, FileText } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Active Brands", value: "19", icon: Wine },
    { label: "Media Assets", value: "482", icon: ImageIcon },
    { label: "Saved Presentations", value: "34", icon: FileText },
    { label: "Admin Users", value: "5", icon: Users },
  ];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground font-light text-lg">Here's what's happening with your content today.</p>
        </div>
        <Link href="/admin/brands/new">
          <button className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Brand</span>
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <Icon className="w-8 h-8 text-accent mb-6" />
                <h3 className="text-5xl font-light mb-2">{stat.value}</h3>
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="p-10 rounded-[2rem] bg-white/5 border border-white/10">
        <h2 className="text-2xl font-light mb-8">Recent Activity</h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 pb-6 border-b border-white/5">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <Wine className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-lg">Sapling Spirits updated</p>
              <p className="text-muted-foreground text-sm">David updated the hero image and 2 variants.</p>
            </div>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-4 pb-6 border-b border-white/5">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-lg">New Media Uploaded</p>
              <p className="text-muted-foreground text-sm">5 new images added to Everleaf's gallery.</p>
            </div>
            <span className="text-sm text-muted-foreground">Yesterday</span>
          </div>
        </div>
      </section>
    </div>
  );
}
