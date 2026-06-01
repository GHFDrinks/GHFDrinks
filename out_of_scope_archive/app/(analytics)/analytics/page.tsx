import React from "react";
import { ExecutiveOverview } from "@/components/analytics/ExecutiveOverview";

export default function AnalyticsDashboardPage() {
  return (
    <div className="space-y-10">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Executive Intelligence</h1>
        <p className="text-muted-foreground font-light text-lg">Platform-wide sales and portfolio performance.</p>
      </header>

      <ExecutiveOverview />
    </div>
  );
}
