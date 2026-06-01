import React from "react";
import { PresentationEngagementMap } from "@/components/analytics/PresentationEngagementMap";

export default function PresentationAnalyticsPage() {
  return (
    <div className="space-y-10">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Presentation Impact</h1>
        <p className="text-muted-foreground font-light text-lg">Storytelling effectiveness and audience retention analysis.</p>
      </header>

      <PresentationEngagementMap />
    </div>
  );
}
