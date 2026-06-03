"use client";

import React from "react";
import { GHFSidebar } from "./GHFSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
      <GHFSidebar />
    </div>
  );
}
