"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wine, Image as ImageIcon, Zap, FolderTree, LogOut, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Brands", href: "/admin/brands", icon: Wine },
  { name: "Media Assets", href: "/admin/media", icon: ImageIcon },
  { name: "Promotions", href: "/admin/promotions", icon: Zap },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Users", href: "/admin/users", icon: Users },
];

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-64 flex-shrink-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col h-screen sticky top-0", className)}>
      <div className="h-24 flex items-center px-8 border-b border-white/5">
        <Link href="/admin" className="text-xl font-light tracking-widest uppercase text-white">
          GHF<span className="text-accent ml-2">CMS</span>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {ADMIN_NAV.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                isActive 
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-white/60 hover:text-red-400 hover:bg-red-500/10 w-full text-sm font-medium">
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
