"use server";

import { createClient } from "../server";
import { revalidatePath } from "next/cache";
import { HOME_LANDING_KEY, isValidLandingConfig, type LandingConfig } from "@/lib/landing-config";

/** Persist the admin-edited home landing layout to the site_config table. */
export async function saveLandingConfig(config: LandingConfig) {
  if (!isValidLandingConfig(config)) {
    throw new Error("Invalid layout — every tile needs a title and a target.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("site_config").upsert(
    {
      key: HOME_LANDING_KEY,
      value: config,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );

  if (error) {
    console.error("Save landing config error:", error);
    throw new Error("Failed to save layout: " + error.message);
  }

  // Refresh the public home page so reps see the new layout.
  revalidatePath("/");
  return { success: true };
}
