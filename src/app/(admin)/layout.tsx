"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin/home", label: "Home Layout" },
  { href: "/admin/brands", label: "Brands" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/activations", label: "Activations" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/media", label: "Media" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  // A tab is active for its exact route and any sub-route (e.g. editing a brand
  // under /admin/brands/[id] keeps the Brands tab highlighted).
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

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
        <div className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-xs tracking-widest uppercase px-2.5 py-1.5 rounded transition-colors ${
                  active
                    ? "bg-white/15 text-white font-semibold"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="text-xs tracking-widest uppercase border border-white/30 rounded px-3 py-1.5 text-white hover:opacity-70 ml-2"
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
