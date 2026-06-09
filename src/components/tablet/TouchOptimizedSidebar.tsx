"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, Wine, Image as ImageIcon, Zap, FolderTree, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Brands", href: "/admin/brands", icon: Wine },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Promotions", href: "/admin/promotions", icon: Zap },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Users", href: "/admin/users", icon: Users },
];

export function TouchOptimizedSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile/Tablet Header & Menu Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-6">
        <Link href="/admin" className="text-xl font-light tracking-widest uppercase text-white">
          GHF<span className="text-accent ml-2">Admin</span>
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 -mr-3 rounded-full flex items-center justify-center text-white active:bg-[var(--background)]/10 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Touch Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-[80vw] max-w-sm bg-[#0a0a0a] border-r border-white/5 flex flex-col z-[70] lg:hidden shadow-2xl"
            >
              <div className="h-24 flex items-center justify-between px-8 border-b border-white/5">
                <Link href="/admin" className="text-xl font-light tracking-widest uppercase text-white">
                  GHF<span className="text-accent ml-2">Admin</span>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 -mr-3 rounded-full flex items-center justify-center text-white/50 active:bg-[var(--background)]/10 active:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto overscroll-contain">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <div className={cn(
                        "flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all active:scale-95 touch-manipulation",
                        isActive 
                          ? "bg-accent/10 text-accent font-medium border border-accent/20" 
                          : "text-white/60 hover:bg-[var(--background)]/5 hover:text-white"
                      )}>
                        <Icon className={cn("w-6 h-6", isActive ? "text-accent" : "text-white/40")} />
                        <span className="text-lg">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
