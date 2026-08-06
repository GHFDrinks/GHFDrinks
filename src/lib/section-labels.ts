import { createClient } from "@/lib/supabase/client";

/**
 * Admin-editable section header labels. Lets the client rename fixed headings
 * such as "Product Features" to a custom name (e.g. "Tasting Notes") across the
 * public site. Stored in the `site_config` table under the key below and
 * degrades gracefully to DEFAULT_SECTION_LABELS when missing (offline, before
 * the migration, or malformed), so headings never disappear.
 */

export const SECTION_LABELS_KEY = "section_labels";

export type SectionLabels = {
  /** Heading over the per-variant product feature list (tasting-notes page). */
  productFeatures: string;
  /** Heading over the taste-profile radar. */
  tasteProfile: string;
  /** Heading over the product description block. */
  productDescription: string;
};

export const DEFAULT_SECTION_LABELS: SectionLabels = {
  productFeatures: "Product Features",
  tasteProfile: "Taste Profile",
  productDescription: "Product Description",
};

export function isValidSectionLabels(v: unknown): v is Partial<SectionLabels> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/**
 * Read the admin-managed section labels, merged over the defaults so any key the
 * admin hasn't set keeps its built-in wording. Never throws.
 */
export async function fetchSectionLabels(): Promise<SectionLabels> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_config")
      .select("value")
      .eq("key", SECTION_LABELS_KEY)
      .maybeSingle();

    if (error || !data?.value || !isValidSectionLabels(data.value)) {
      return DEFAULT_SECTION_LABELS;
    }
    return { ...DEFAULT_SECTION_LABELS, ...(data.value as Partial<SectionLabels>) };
  } catch {
    return DEFAULT_SECTION_LABELS;
  }
}
