import React from "react";
import { FollowUpComposer } from "@/components/copilot/FollowUpComposer";

export default function FollowUpsPage() {
  return (
    <div className="space-y-10">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Smart Follow-ups</h1>
        <p className="text-muted-foreground font-light text-lg">AI-synthesized post-meeting communication.</p>
      </header>

      <FollowUpComposer />
    </div>
  );
}
