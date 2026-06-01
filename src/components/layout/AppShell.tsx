"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - fixed and toggleable on mobile, persistent on desktop if needed, though presentation tools often hide it. 
          Given the requirement "Sidebar navigation", we'll make it an elegant fixed panel or collapsible panel. */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <TopNav toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
