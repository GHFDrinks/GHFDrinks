"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, PieChart, Activity, Map, Users, Target, FileText, Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const ANALYTICS_NAV = [
  { name: "Executive Overview", href: "/analytics", icon: BarChart3 },
  { name: "Brand Performance", href: "/analytics/brands", icon: PieChart },
  { name: "Presentation Impact", href: "/analytics/presentations", icon: Activity },
  { name: "Regional Map", href: "/analytics/regions", icon: Map },
  { name: "Team Activity", href: "/analytics/teams", icon: Users },
  { name: "Opportunity Forecast", href: "/analytics/forecast", icon: Target },
  { name: "Generated Reports", href: "/analytics/reports", icon: FileText },
];

export function AnalyticsSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile/Tablet Header & Menu Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-6">
        <Link href="/analytics" className="text-xl font-light tracking-widest uppercase text-white">
          GHF<span className="text-accent ml-2">Intelligence</span>
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 -mr-3 rounded-full flex items-center justify-center text-white active:bg-white/10 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Touch Sidebar Drawer for Tablet/Mobile */}
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
              <div className="p-6 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <Link href="/analytics" className="text-xl font-light tracking-widest uppercase text-white" onClick={() => setIsOpen(false)}>
                    GHF<span className="text-accent ml-2">Intel</span>
                  </Link>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-white/50 active:bg-white/10 active:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <nav className="flex-1 p-6 space-y-2 overflow-y-auto overscroll-contain">
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-medium mb-4 px-4">Executive Dashboard</div>
                {ANALYTICS_NAV.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/analytics" && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all active:scale-95 touch-manipulation",
                        isActive 
                          ? "bg-accent/10 text-accent font-medium border border-accent/20" 
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className={cn("w-6 h-6", isActive ? "text-accent" : "text-white/40")} />
                      <span className="text-lg">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-white/5">
                <Link href="/admin">
                  <button className="flex items-center space-x-3 px-4 py-4 rounded-xl transition-all text-white/60 active:text-white active:bg-white/5 w-full text-base font-medium mb-2">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to CMS</span>
                  </button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className={cn("hidden lg:flex w-72 flex-shrink-0 bg-[#0a0a0a] border-r border-white/5 flex-col h-screen sticky top-0", className)}>
        <div className="p-8 border-b border-white/5">
          <Link href="/analytics" className="text-2xl font-light tracking-widest uppercase text-white block">
            GHF<span className="text-accent ml-2">Intel</span>
          </Link>
          <p className="text-xs text-white/40 mt-2 font-medium tracking-wide">EXECUTIVE DASHBOARD</p>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {ANALYTICS_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/analytics" && pathname.startsWith(item.href));
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
          <Link href="/admin">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-white/60 hover:text-white hover:bg-white/5 w-full text-sm font-medium mb-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Exit Intelligence</span>
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
