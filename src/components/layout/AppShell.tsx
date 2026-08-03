"use client";

import React from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header band reserved for the fixed GHF logo / menu (top-right) so page
          content always flows below it rather than sharing its line. */}
      <div className="h-20 flex-shrink-0" aria-hidden="true" />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
