import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsSidebar } from "@/components/analytics/AnalyticsSidebar";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GHF Executive Analytics",
  description: "Enterprise sales intelligence and portfolio performance.",
};

export default function AnalyticsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex bg-[#050505] text-foreground selection:bg-accent selection:text-accent-foreground overscroll-none pt-16 lg:pt-0">
        <AnalyticsSidebar />
        <main className="flex-1 overflow-x-hidden relative">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
