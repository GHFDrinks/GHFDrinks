import React from "react";
import { BrandPerformanceMatrix } from "@/components/analytics/BrandPerformanceMatrix";

export default function BrandsAnalyticsPage() {
  return (
    <div className="space-y-10">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Brand Performance</h1>
        <p className="text-muted-foreground font-light text-lg">Portfolio engagement and momentum across the platform.</p>
      </header>

      <BrandPerformanceMatrix />
    </div>
  );
}
