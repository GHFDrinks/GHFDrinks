"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useBrands } from "@/hooks/useBrands";

const PACKAGE_NAV = [
  { label: "Best of British", href: "/packages/best-of-british" },
  { label: "Sustainable", href: "/packages/sustainable" },
  { label: "European Lifestyle", href: "/packages/european-lifestyle" },
  { label: "Crafted & Discerning", href: "/packages/crafted-and-discerning" },
  { label: "Elevated & Sophisticated", href: "/packages/elevated-and-sophisticated" },
  { label: "Contemporary & Creative", href: "/packages/contemporary-and-creative" },
];

const STATIC_NAV = [
  { label: "Presentations", href: "/presentations" },
  { label: "Build Presentation", href: "/presentations/new" },
  { label: "GHF Activations", href: "/activations" },
  { label: "GHF Support", href: "/support" },
  { label: "Activation Calendars", href: "/calendar" },
  { label: "Category Insights", href: "/insights" },
  { label: "Tasting Notes", href: "/tasting-notes" },
];

export function GHFSidebar() {
  const pathname = usePathname();
  const { brands } = useBrands();

  const spirits = brands.filter((b) => b.category === "Spirits");
  const wines = brands.filter((b) => b.category === "Wines");
  const beer = brands.filter((b) => b.category === "Beer, Cider & Mixer");

  const [open, setOpen] = useState<Record<string, boolean>>({
    Spirits: true,
    Wines: true,
    Beer: true,
    Packages: true,
  });

  function toggle(key: string) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function isActive(href: string) {
    return pathname?.startsWith(href);
  }

  return (
    <aside
      className="flex-shrink-0 w-48 h-screen overflow-y-auto flex flex-col border-l"
      style={{ backgroundColor: "var(--sidebar-bg)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Category label */}
      <div className="px-4 pt-5 pb-1">
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--sage)" }}
        >
          Category
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4 text-sm">

        {/* SPIRITS */}
        <button
          onClick={() => toggle("Spirits")}
          className="w-full text-left px-2 py-1.5 font-medium hover:opacity-80 transition-opacity"
          style={{ color: "var(--sidebar-text)" }}
        >
          Spirits
        </button>
        {open.Spirits &&
          spirits.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className={cn("block pl-4 pr-2 py-1 text-xs rounded transition-colors")}
              style={{
                color: isActive(`/brands/${b.slug}`)
                  ? "var(--sage)"
                  : "var(--sidebar-text-muted)",
                backgroundColor: isActive(`/brands/${b.slug}`)
                  ? "var(--sidebar-active)"
                  : "transparent",
              }}
            >
              {b.name}
            </Link>
          ))}

        {/* WINES */}
        <button
          onClick={() => toggle("Wines")}
          className="w-full text-left px-2 py-1.5 font-medium hover:opacity-80 transition-opacity mt-1"
          style={{ color: "var(--sidebar-text)" }}
        >
          Wines
        </button>
        {open.Wines &&
          wines.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className={cn("block pl-4 pr-2 py-1 text-xs rounded transition-colors")}
              style={{
                color: isActive(`/brands/${b.slug}`)
                  ? "var(--sage)"
                  : "var(--sidebar-text-muted)",
                backgroundColor: isActive(`/brands/${b.slug}`)
                  ? "var(--sidebar-active)"
                  : "transparent",
              }}
            >
              {b.name}
            </Link>
          ))}

        {/* BEER CIDER MIXER */}
        <button
          onClick={() => toggle("Beer")}
          className="w-full text-left px-2 py-1.5 font-medium hover:opacity-80 transition-opacity mt-1"
          style={{ color: "var(--sidebar-text)" }}
        >
          Beer. Cider. Mixer.
        </button>
        {open.Beer &&
          beer.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className={cn("block pl-4 pr-2 py-1 text-xs rounded transition-colors")}
              style={{
                color: isActive(`/brands/${b.slug}`)
                  ? "var(--sage)"
                  : "var(--sidebar-text-muted)",
                backgroundColor: isActive(`/brands/${b.slug}`)
                  ? "var(--sidebar-active)"
                  : "transparent",
              }}
            >
              {b.name}
            </Link>
          ))}

        {/* PACKAGES */}
        <div className="mt-3">
          <button
            onClick={() => toggle("Packages")}
            className="w-full text-left px-2 py-1.5 font-semibold tracking-wide hover:opacity-80 transition-opacity"
            style={{ color: "var(--sage)" }}
          >
            Packages
          </button>
          {open.Packages &&
            PACKAGE_NAV.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={cn("block pl-4 pr-2 py-1 text-xs rounded transition-colors")}
                style={{
                  color: isActive(p.href) ? "var(--sage)" : "var(--sidebar-text-muted)",
                  backgroundColor: isActive(p.href)
                    ? "var(--sidebar-active)"
                    : "transparent",
                }}
              >
                {p.label}
              </Link>
            ))}
        </div>

        {/* STATIC SECTIONS */}
        <div className="mt-3 space-y-0.5">
          {STATIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("block px-2 py-1.5 text-sm font-medium rounded transition-colors")}
              style={{
                color: isActive(item.href) ? "var(--sage)" : "var(--sidebar-text)",
                backgroundColor: isActive(item.href)
                  ? "var(--sidebar-active)"
                  : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* GHF Monogram — bottom of sidebar, matches PDF */}
      <div
        className="p-4 flex justify-center border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold tracking-widest"
          style={{ borderColor: "var(--sage)", color: "var(--sage)" }}
        >
          GHF
        </div>
      </div>
    </aside>
  );
}
