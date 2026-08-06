"use server";

import { createClient } from "../server";
import { revalidatePath } from "next/cache";
import { SUPPORT_CONFIG_KEY, isValidSupportConfig, type SupportConfig } from "@/lib/support-config";

/** Persist admin-edited support tiles (per SKU scenario) to site_config. */
export async function saveSupportConfig(config: SupportConfig) {
  if (!isValidSupportConfig(config)) {
    throw new Error("Invalid support configuration.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("site_config").upsert(
    {
      key: SUPPORT_CONFIG_KEY,
      value: config,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );

  if (error) {
    console.error("Save support config error:", error);
    throw new Error("Failed to save support configuration: " + error.message);
  }

  revalidatePath("/support");
  return { success: true };
}
