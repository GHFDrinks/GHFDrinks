import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { PresentationProvider } from "@/lib/presentation-store";
import { OfflineProvider } from "@/components/offline/OfflineProvider";
import { ErrorBoundary } from "@/components/system/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "GHF Portfolio Presenter",
  description: "Interactive brand presentation tool for GHF Drinks sales teams.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GHF Presenter",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3a2a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground overscroll-none">
        <ErrorBoundary>
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
