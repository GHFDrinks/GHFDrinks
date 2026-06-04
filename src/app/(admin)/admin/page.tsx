"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";

export default function AdminDashboardPage() {
  const { brands, loading } = useBrands();

  const spirits = brands.filter((b) => b.category === "Spirits").length;
  const wines = brands.filter((b) => b.category === "Wines").length;
  const beer = brands.filter((b) => b.category === "Beer, Cider & Mixer").length;
  const totalSKUs = brands.reduce((a, b) => a + b.variants.length, 0);

  return (
    <div className="p-10 min-h-screen bg-white">

      <div className="flex items-center justify-between mb-10">
        <div>
          <h1
            className="text-4xl font-light mb-1 tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            GHF Admin
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Manage your portfolio content
          </p>
        </div>
        <Link
          href="/admin/brands/new"
          className="px-5 py-2.5 text-sm font-medium rounded-lg text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          + Add Brand
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Brands", value: loading ? "—" : brands.length },
          { label: "Spirits", value: loading ? "—" : spirits },
          { label: "Wines", value: loading ? "—" : wines },
          { label: "Total SKUs", value: loading ? "—" : totalSKUs },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-gray-200 rounded-xl p-5"
          >
            <p
              className="text-4xl font-light mb-1"
              style={{ color: "var(--accent)" }}
            >
              {s.value}
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { label: "Edit Brands", desc: "Update descriptions, SKUs, activations", href: "/admin/brands" },
          { label: "Manage Promotions", desc: "Turn live promotions on or off per brand", href: "/admin/brands" },
          { label: "Media", desc: "View uploaded media assets", href: "/admin/media" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors"
          >
            <h2
              className="text-base font-medium mb-1"
              style={{ color: "var(--accent)" }}
            >
              {item.label}
            </h2>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Brand list */}
      <div>
        <h2
          className="text-xl font-medium mb-4"
          style={{ color: "var(--accent)" }}
        >
          All Brands
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/admin/brands/${b.id}`}
              className="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-400 transition-colors"
            >
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {b.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {b.category} · {b.variants.length} SKUs
                </p>
              </div>
              {b.promotionActive && (
                <span
                  className="text-[10px] font-bold tracking-widest uppercase border rounded px-2 py-0.5"
                  style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
                >
                  Promo Live
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
