"use client";

import React, { useEffect, useState } from "react";
import { Brand } from "@/types/brand";
import { useBrands } from "@/hooks/useBrands";
import { BrandHero } from "./BrandHero";
import { BrandStory } from "./BrandStory";
import { VariantGrid } from "./VariantGrid";
import { PairingSection } from "./PairingSection";
import { ActivationSection } from "./ActivationSection";
import { SupportPackageSection } from "./SupportPackageSection";

export function BrandDetailClient({ initialBrand }: { initialBrand: Brand }) {
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const { brands } = useBrands();

  useEffect(() => {
    if (brands.length > 0) {
      const liveBrand = brands.find(b => b.slug === initialBrand.slug);
      if (liveBrand) {
        setBrand(liveBrand);
      }
    }
  }, [brands, initialBrand.slug]);

  return (
    <div className="space-y-0 pb-24">
      <BrandHero brand={brand} />
      
      <div className="px-6 lg:px-12">
        <BrandStory brand={brand} />
        
        <div className="border-t border-white/10" />
        <VariantGrid variants={brand.variants} />
        
        {brand.serves.length > 0 && (
          <>
            <div className="border-t border-white/10" />
            <PairingSection serves={brand.serves} />
          </>
        )}
        
        {brand.activations.length > 0 && (
          <>
            <div className="border-t border-white/10" />
            <ActivationSection activations={brand.activations} />
          </>
        )}

        {brand.supportPackages.length > 0 && (
          <SupportPackageSection packages={brand.supportPackages} />
        )}
      </div>
    </div>
  );
}
