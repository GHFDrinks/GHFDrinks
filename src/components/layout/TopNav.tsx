"use client";

import React from "react";
import { Menu, Search, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { InstallPrompt } from "@/components/offline/InstallPrompt";

export function TopNav({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  
  // Create a clean readable title from the pathname
  const getPageTitle = () => {
    if (pathname === "/") return "Overview";
    const path = pathname?.split("/").pop() || "";
    return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
  };

  return (
    <header className="h-24 px-8 flex items-center justify-between z-40 bg-background/50 backdrop-blur-sm sticky top-0 border-b border-white/5">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-6 p-2 -ml-2 rounded-full hover:bg-[var(--background)]/5 transition-colors lg:hidden text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-light tracking-tight text-white">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <InstallPrompt />
        <button className="w-10 h-10 rounded-full hover:bg-[var(--background)]/5 flex items-center justify-center transition-colors text-muted-foreground hover:text-white">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button className="relative w-10 h-10 rounded-full hover:bg-[var(--background)]/5 flex items-center justify-center transition-colors text-muted-foreground hover:text-white">
          <Bell className="w-5 h-5" strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent border-2 border-background"></span>
        </button>
      </div>
    </header>
  );
}
