"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { cn } from "@/lib/utils";

export function HiddenMenu() {
  const pathname = usePathname();
  const { brands } = useBrands();
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    SPIRITS: false,
    WINES: false,
    PACKAGED: false,
  });

  // Hidden on present-mode playback screens to ensure a clean visual flow
  if (pathname?.startsWith("/present-mode") || pathname?.startsWith("/immersive")) {
    return null;
  }

  const spirits = brands.filter((b) => b.category === "Spirits");
  const wines = brands.filter((b) => b.category === "Wines");
  const packaged = brands.filter((b) => b.category === "Beer, Cider & Mixer");

  function toggleExpand(key: string) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  }

  return (
    <>
      {/* Circular Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-[90] rounded-full flex items-center justify-center bg-[var(--card)] border border-[var(--sage)] shadow-lg hover:scale-105 active:scale-95 transition-all"
        style={{ width: "44px", height: "44px" }}
        aria-label="Open Menu"
      >
        <svg className="w-5 h-5 text-[var(--cream)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-[91] backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Slide-in Panel */}
      <div
        className="fixed top-0 right-0 h-full w-[320px] bg-[var(--card)] z-[92] shadow-2xl flex flex-col p-6 overflow-y-auto"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-[var(--cream)] hover:opacity-75 transition-opacity text-2xl font-light"
          aria-label="Close Menu"
        >
          &times;
        </button>

        {/* Content Container */}
        <div className="flex flex-col h-full pt-6">
          {/* Header */}
          <div className="mb-6">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--cream)]">
              GHF DRINKS
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2.5 text-xs mb-6">
            {[
              { label: "Home", href: "/" },
              { label: "Build Presentation", href: "/presentations/new" },
              { label: "Saved Presentations", href: "/presentations" },
              { label: "Resources", href: "/resources" },
              { label: "Activation Calendar", href: "/calendar" },
              { label: "GHF Activations", href: "/activations" },
              { label: "GHF Support", href: "/support" },
              { label: "Tasting Notes", href: "/tasting-notes" },
              { label: "Category Insights", href: "/insights" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "hover:text-[var(--sage)] transition-colors py-1 block uppercase tracking-wider font-light",
                  isActive(link.href) ? "text-[var(--sage)] font-medium" : "text-[var(--muted-foreground)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-[1px] w-full bg-[var(--sage)] opacity-30 mb-6" />

          {/* Collapsible Categories */}
          <div className="space-y-4 text-xs">
            {/* SPIRITS */}
            <div>
              <button
                onClick={() => toggleExpand("SPIRITS")}
                className="w-full flex items-center justify-between py-1.5 font-medium tracking-[0.15em] text-[var(--cream)] hover:text-[var(--sage)] transition-colors uppercase border-b border-[var(--border)]"
              >
                <span>Spirits</span>
                <span className="text-[10px]">{expanded.SPIRITS ? "−" : "+"}</span>
              </button>
              {expanded.SPIRITS && (
                <div className="pl-3 mt-2 flex flex-col gap-1.5 border-l border-[var(--border)]">
                  {spirits.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/brands/${b.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-[11px] py-0.5 transition-colors hover:text-[var(--sage)]",
                        isActive(`/brands/${b.slug}`) ? "text-[var(--sage)] font-normal" : "text-[var(--muted-foreground)]"
                      )}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* WINES */}
            <div>
              <button
                onClick={() => toggleExpand("WINES")}
                className="w-full flex items-center justify-between py-1.5 font-medium tracking-[0.15em] text-[var(--cream)] hover:text-[var(--sage)] transition-colors uppercase border-b border-[var(--border)]"
              >
                <span>Wines</span>
                <span className="text-[10px]">{expanded.WINES ? "−" : "+"}</span>
              </button>
              {expanded.WINES && (
                <div className="pl-3 mt-2 flex flex-col gap-1.5 border-l border-[var(--border)]">
                  {wines.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/brands/${b.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-[11px] py-0.5 transition-colors hover:text-[var(--sage)]",
                        isActive(`/brands/${b.slug}`) ? "text-[var(--sage)] font-normal" : "text-[var(--muted-foreground)]"
                      )}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* PACKAGED */}
            <div>
              <button
                onClick={() => toggleExpand("PACKAGED")}
                className="w-full flex items-center justify-between py-1.5 font-medium tracking-[0.15em] text-[var(--cream)] hover:text-[var(--sage)] transition-colors uppercase border-b border-[var(--border)]"
              >
                <span>Packaged</span>
                <span className="text-[10px]">{expanded.PACKAGED ? "−" : "+"}</span>
              </button>
              {expanded.PACKAGED && (
                <div className="pl-3 mt-2 flex flex-col gap-1.5 border-l border-[var(--border)]">
                  {packaged.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/brands/${b.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-[11px] py-0.5 transition-colors hover:text-[var(--sage)]",
                        isActive(`/brands/${b.slug}`) ? "text-[var(--sage)] font-normal" : "text-[var(--muted-foreground)]"
                      )}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
