import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { PresentationProvider } from "@/lib/presentation-store";
import { OfflineProvider } from "@/components/offline/OfflineProvider";
import { ErrorBoundary } from "@/components/system/ErrorBoundary";
import { GlobalLoader } from "@/components/system/GlobalLoader";
import { AppHealthMonitor } from "@/components/system/AppHealthMonitor";
import { AccessibilityControls } from "@/components/system/AccessibilityControls";
import { SyncConflictResolver } from "@/components/system/SyncConflictResolver";
import { PerformanceOverlay } from "@/components/system/PerformanceOverlay";
import { NetworkRecoveryLayer } from "@/components/system/NetworkRecoveryLayer";
import { RouteTransitionManager } from "@/components/system/RouteTransitionManager";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GHF Drinks | Luxury Presentation Platform",
  description: "Offline-first presentation platform for premium drinks brands.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GHF Deck",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground overscroll-none">
        <ErrorBoundary>
          <Suspense fallback={null}>
            <GlobalLoader />
          </Suspense>
          <AppHealthMonitor />
          <AccessibilityControls />
          <SyncConflictResolver />
          <PerformanceOverlay />
          <NetworkRecoveryLayer />
          <RouteTransitionManager />
          <OfflineProvider>
            <PresentationProvider>
              {children}
            </PresentationProvider>
          </OfflineProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

