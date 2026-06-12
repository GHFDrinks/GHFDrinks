"use client";

import React from "react";
import Link from "next/link";
import { Package } from "lucide-react";

export default function PosLibraryPage() {
  return (
    <div className="min-h-screen py-16 px-6 md:px-14 bg-[var(--background)] flex flex-col justify-center items-center">
      <div className="max-w-md w-full text-center space-y-6">
        <Link
          href="/resources"
          className="text-xs tracking-widest uppercase text-[var(--sage)] hover:text-white transition-colors inline-block mb-4"
        >
          ← Back to resources
        </Link>
        <div className="mx-auto w-16 h-16 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--sage)] border border-[var(--sage)]/30">
          <Package className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight text-[var(--cream)]">
            POS Library
          </h1>
          <p className="text-sm text-[var(--sage)] font-mono uppercase tracking-widest">
            Coming Soon
          </p>
        </div>
        <p className="text-sm text-[var(--foreground)]/60 leading-relaxed">
          We are currently cataloging our physical point of sale materials, menus, backbar displays, and promotional kits. Check back soon for ordering details.
        </p>
      </div>
    </div>
  );
}
