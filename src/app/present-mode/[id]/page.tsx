import React from "react";
import { FullscreenViewer } from "@/components/presentation/FullscreenViewer";

export default async function PresentModePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <FullscreenViewer presentationId={resolvedParams.id} />;
}
