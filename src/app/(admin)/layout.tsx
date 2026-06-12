import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
          <span className="text-white text-sm font-medium tracking-wide">
            Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin/brands" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Brands
          </Link>
          <Link href="/admin/media" className="text-xs text-white tracking-widest uppercase hover:opacity-70">
            Media
          </Link>
          <Link href="/" className="text-xs tracking-widest uppercase border border-white/30 rounded px-3 py-1.5 text-white hover:opacity-70">
            View Site
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
