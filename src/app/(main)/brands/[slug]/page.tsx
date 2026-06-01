import React from "react";
import { notFound } from "next/navigation";
import { getBrands, getBrandBySlug } from "@/lib/supabase/queries/brands";
import { BrandDetailClient } from "@/components/brand/BrandDetailClient";

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

  return <BrandDetailClient initialBrand={brand} />;
}
