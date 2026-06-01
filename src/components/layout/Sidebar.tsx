"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Wine, 
  GlassWater, 
  Beer, 
  Zap, 
  Calendar, 
  BookOpen, 
  LifeBuoy, 
  TrendingUp, 
  Package, 
  Presentation
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Spirits", href: "/brands/spirits", icon: GlassWater },
  { name: "Wines", href: "/brands/wines", icon: Wine },
  { name: "Beer, Cider & Mixer", href: "/brands/beer", icon: Beer },
  { name: "GHF Activations", href: "/activations", icon: Zap },
  { name: "Activation Calendars", href: "/calendar", icon: Calendar },
  { name: "Tasting Notes", href: "/tasting-notes", icon: BookOpen },
  { name: "Category Insights", href: "/insights", icon: TrendingUp },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "Presentations", href: "/presentations", icon: Presentation },
  { name: "GHF Support", href: "/support", icon: LifeBuoy },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform flex flex-col border-r border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-24 items-center px-8 border-b border-white/5">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
            G
          </div>
          <span className="text-xl font-medium tracking-tight">GHF Drinks</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex items-center px-4 py-3 rounded-xl group overflow-hidden transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center space-x-4">
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent/80"
                  )}
                  strokeWidth={1.5}
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent/80"
                  )}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      {/* Footer Area */}
      <div className="p-6 border-t border-white/5">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-muted-foreground">Sales Executive</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
