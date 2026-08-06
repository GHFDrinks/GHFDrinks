"use server";

import { createClient } from "../server";
import { revalidatePath } from "next/cache";
import { SECTION_LABELS_KEY, isValidSectionLabels, type SectionLabels } from "@/lib/section-labels";

/** Persist admin-edited section header labels to the site_config table. */
export async function saveSectionLabels(labels: SectionLabels) {
  if (!isValidSectionLabels(labels)) {
    throw new Error("Invalid section labels.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("site_config").upsert(
    {
      key: SECTION_LABELS_KEY,
      value: labels,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );

  if (error) {
    console.error("Save section labels error:", error);
    throw new Error("Failed to save section labels: " + error.message);
  }

  // Refresh public pages that render these headings.
  revalidatePath("/tasting-notes");
  revalidatePath("/brands");
  return { success: true };
}
