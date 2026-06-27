"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PROMOTIONS } from "@/data/promotions";

export default function PromotionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const promo = PROMOTIONS.find((p) => p.id === id);

  const [returnTo, setReturnTo] = useState<{ url: string; label: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = sessionStorage.getItem("ghf_return_to");
      const label = sessionStorage.getItem("ghf_return_label") || "Back";
      if (url) {
        setReturnTo({ url, label });
      }
    }
  }, []);

  if (!promo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)]">
        <div className="text-center space-y-4">
          <p className="text-lg text-[var(--muted-foreground)]">Promotion not found.</p>
          <button
            onClick={() => router.back()}
            className="text-xs uppercase tracking-widest text-[var(--sage)] underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (returnTo) {
      router.push(returnTo.url);
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Navigation */}
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
        >
          ← {returnTo ? returnTo.label : "Back"}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-xl space-y-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block">
          Special Promotion
        </span>
        <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
          {promo.title}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {promo.description}
        </p>

        <div className="pt-6 border-t border-[var(--border)] space-y-2">
          <p className="text-xs tracking-widest uppercase text-[var(--muted-foreground)]">Active Period</p>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {new Date(promo.startDate).toLocaleDateString()} – {new Date(promo.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
