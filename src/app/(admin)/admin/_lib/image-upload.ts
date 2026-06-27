import { createClient } from "@/lib/supabase/client";

export interface UploadedAsset {
  id?: string;
  brand_slug: string;
  asset_type: string;
  asset_index: number;
  filename: string;
  data: string; // base64 or url
  mime_type: string;
}

export async function uploadImage(
  file: File,
  brandSlug: string,
  assetType: string,
  assetIndex: number = 0
): Promise<string> {
  // Validate file type
  const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a PNG or JPG/JPEG image.");
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error("File is too large. Maximum size is 5MB.");
  }

  // Convert to Base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const supabase = createClient();

  // Upsert into brand_assets
  const { data, error } = await supabase
    .from("brand_assets")
    .upsert(
      {
        brand_slug: brandSlug,
        asset_type: assetType,
        asset_index: assetIndex,
        filename: file.name,
        data: base64Data,
        mime_type: file.type,
      },
      {
        onConflict: "brand_slug,asset_type,asset_index",
      }
    )
    .select()
    .single();

  if (error) {
    console.error("Database save failed:", error);
    // Return base64Data so it works in UI even if DB failed or doesn't have permissions
    return base64Data;
  }

  return data.data;
}

export async function getBrandAssetsFromDb(brandSlug: string): Promise<Record<string, string[]>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("brand_assets")
    .select("*")
    .eq("brand_slug", brandSlug);

  if (error || !data) {
    return {};
  }

  const assets: Record<string, string[]> = {};
  data.forEach((row: any) => {
    const type = row.asset_type;
    const index = row.asset_index;
    if (!assets[type]) {
      assets[type] = [];
    }
    assets[type][index] = row.data;
  });

  return assets;
}
