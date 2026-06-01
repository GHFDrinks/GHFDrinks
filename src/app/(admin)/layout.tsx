import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { TouchOptimizedSidebar } from "@/components/tablet/TouchOptimizedSidebar";
import { SessionRecovery } from "@/components/system/SessionRecovery";
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
  title: "GHF Admin | Content Management",
  description: "Secure content management system for GHF Drinks.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex bg-[#050505] text-foreground selection:bg-accent selection:text-accent-foreground pt-16 lg:pt-0">
        <SessionRecovery />
        <AdminSidebar className="hidden lg:flex" />
        <TouchOptimizedSidebar />
        <main className="flex-1 overflow-x-hidden relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
