import React from "react";
import { MeetingPrepAssistant } from "@/components/copilot/MeetingPrepAssistant";

export default function MeetingPrepPage() {
  return (
    <div className="space-y-10">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Meeting Intelligence</h1>
        <p className="text-muted-foreground font-light text-lg">AI-powered preparation and portfolio strategy.</p>
      </header>

      <MeetingPrepAssistant />
    </div>
  );
}
