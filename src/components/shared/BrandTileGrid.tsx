"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { getBrandImages } from "@/lib/brand-images";

export interface BrandTileGridProps {
  basePath: string; // e.g. "/tasting-notes"
  filter?: (brand: any) => boolean;
  onClick?: (slug: string) => void;
}

export function BrandTileGrid({ basePath, filter, onClick }: BrandTileGridProps) {
  const { brands } = useBrands();
  
  // Use loaded brands or fall back to static list
  const activeList = (brands && brands.length > 0 ? brands : STATIC_BRANDS);
  const filteredList = filter ? activeList.filter(filter) : activeList;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredList.map((brand) => {
        const images = getBrandImages(brand.slug);
        const bgImage = images?.lifestyle?.[0] || images?.hero || "/placeholder.jpg";

        const innerContent = (
          <div className="relative aspect-[4/3] w-full rounded-lg border border-[var(--sage)]/20 overflow-hidden group bg-[var(--card)] flex items-center justify-center transition-all duration-300 hover:border-[var(--sage)]">
            {/* Background Image */}
            <img
              src={bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors" />

            {/* Logo or text centered */}
            <div className="relative z-10 w-full max-w-[50%] flex items-center justify-center p-4">
              {images?.logo ? (
                <img
                  src={images.logo}
                  alt={brand.name}
                  className="max-h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              ) : (
                <span className="text-sm font-bold uppercase tracking-widest text-[var(--cream)] text-center transition-transform duration-300 group-hover:scale-105">
                  {brand.name}
                </span>
              )}
            </div>
          </div>
        );

        if (onClick) {
          return (
            <button
              key={brand.slug}
              onClick={() => onClick(brand.slug)}
              className="w-full text-left focus:outline-none cursor-pointer"
            >
              {innerContent}
            </button>
          );
        }

        return (
          <Link
            key={brand.slug}
            href={`${basePath}/${brand.slug}`}
            className="w-full block cursor-pointer"
          >
            {innerContent}
          </Link>
        );
      })}
    </div>
  );
}
