import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AmbientBackground } from "@/components/experience/AmbientBackground";
import { CinematicTransition } from "@/components/experience/CinematicTransition";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <AppShell>
        <CinematicTransition>
          {children}
        </CinematicTransition>
      </AppShell>
    </>
  );
}
