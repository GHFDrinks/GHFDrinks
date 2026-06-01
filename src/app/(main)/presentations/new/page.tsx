import React, { Suspense } from "react";
import { PresentationBuilder } from "@/components/presentation/PresentationBuilder";

export default function NewPresentationPage() {
  return (
    <div className="h-[calc(100vh-8rem)] -mx-8 lg:-mx-12 -mt-8 lg:-mt-12">
      <Suspense fallback={<div className="h-full flex items-center justify-center text-white/50">Loading Builder...</div>}>
        <PresentationBuilder />
      </Suspense>
    </div>
  );
}
