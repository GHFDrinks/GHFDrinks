"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // The login page is a standalone full-screen view (no admin chrome).
  if (isLogin) {
    return <div className="min-h-screen bg-[#050505]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div
        className="flex items-center justify-between px-10 py-4 border-b border-gray-200"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <div className="flex items-center gap-6">
          <div
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-bold tracking-widest"
            style={{ borderColor: "var(--cream)", color: "var(--cream)" }}
          >
            GHF
          </div>
          <span className="text-white text-sm font-medium tracking-wide">Admin Panel</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin/home" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Home Layout
          </Link>
          <Link href="/admin/brands" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Brands
          </Link>
          <Link href="/admin/activations" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Activations
          </Link>
          <Link href="/admin/calendar" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Calendar
          </Link>
          <Link href="/admin/events" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Events
          </Link>
          <Link href="/admin/media" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Media
          </Link>
          <Link
            href="/"
            className="text-xs tracking-widest uppercase border border-white/30 rounded px-3 py-1.5 text-white hover:opacity-70"
          >
            View Site
          </Link>
          <button
            onClick={handleSignOut}
            className="text-xs tracking-widest uppercase border border-white/30 rounded px-3 py-1.5 text-white hover:opacity-70 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
