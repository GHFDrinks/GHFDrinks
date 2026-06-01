"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Calendar, Activity, TrendingUp, Link as LinkIcon, RefreshCw, LogOut, Sparkles, Briefcase, Menu, X, Bot, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { WorkspaceSwitcher } from "@/components/collaboration/WorkspaceSwitcher";

const CRM_NAV = [
  { name: "Team Hub", href: "/workspace", icon: Users },
  { name: "Clients", href: "/clients", icon: Briefcase },
  { name: "Meetings", href: "/meetings", icon: Calendar },
  { name: "Meeting Prep", href: "/meeting-prep", icon: Sparkles },
  { name: "Live Copilot", href: "/ai-workflows", icon: Brain },
  { name: "Follow-ups", href: "/followups", icon: Bot },
  { name: "Executive Intel", href: "/analytics", icon: TrendingUp },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "CRM Sync", href: "/crm-sync", icon: RefreshCw },
  { name: "Integrations", href: "/admin/integrations", icon: LinkIcon },
];

export function CRMSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile/Tablet Header & Menu Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-6">
        <Link href="/clients" className="text-xl font-light tracking-widest uppercase text-white">
          GHF<span className="text-accent ml-2">Sales</span>
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
                <div className="flex justify-between items-center mb-8">
                  <Link href="/clients" className="text-xl font-light tracking-widest uppercase text-white" onClick={() => setIsOpen(false)}>
                    GHF<span className="text-accent ml-2">Sales</span>
                  </Link>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-white/50 active:bg-white/10 active:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <WorkspaceSwitcher />
              </div>

              <nav className="flex-1 p-6 space-y-2 overflow-y-auto overscroll-contain">
                <div className="text-xs uppercase tracking-widest text-white/30 font-medium mb-4 px-4">CRM & Intelligence</div>
                {CRM_NAV.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
        <div className="p-6 border-b border-white/5">
          <Link href="/clients" className="text-xl font-light tracking-widest uppercase text-white block mb-8">
            GHF<span className="text-accent ml-2">Sales</span>
          </Link>
          <WorkspaceSwitcher />
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <div className="text-xs uppercase tracking-widest text-white/30 font-medium mb-4 px-4">CRM & Intelligence</div>
          {CRM_NAV.map((item) => {
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
          <Link href="/admin">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-white/60 hover:text-white hover:bg-white/5 w-full text-sm font-medium mb-2">
              <span>Back to CMS</span>
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
