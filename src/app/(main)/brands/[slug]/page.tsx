import React from "react";
import { notFound } from "next/navigation";
import { getBrands, getBrandBySlug } from "@/lib/supabase/queries/brands";
import { BrandHero } from "@/components/brand/BrandHero";
import { BrandStory } from "@/components/brand/BrandStory";
import { VariantGrid } from "@/components/brand/VariantGrid";
import { PairingSection } from "@/components/brand/PairingSection";
import { ActivationSection } from "@/components/brand/ActivationSection";
import { SupportPackageSection } from "@/components/brand/SupportPackageSection";

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const brand = await getBrandBySlug(resolvedParams.slug);

  if (!brand) {
    notFound();
  }

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
