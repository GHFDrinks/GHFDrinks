"use client";

import React, { useEffect, useState } from "react";
import { Brand } from "@/types/brand";
import { useBrands } from "@/hooks/useBrands";
import { BrandIntroSlide } from "./BrandIntroSlide";
import { BrandActivationSlide } from "./BrandActivationSlide";

export function BrandDetailClient({ initialBrand }: { initialBrand: Brand }) {
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const { brands } = useBrands();

  useEffect(() => {
    if (brands.length > 0) {
      const live = brands.find((b) => b.slug === initialBrand.slug);
      if (live) setBrand(live);
    }
  }, [brands, initialBrand.slug]);

  return (
    <div>
      <BrandIntroSlide brand={brand} />
      <BrandActivationSlide brand={brand} />
    </div>
  );
}
