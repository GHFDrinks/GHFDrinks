import { PACKAGE_PRESENTATIONS } from "./package-presentations";

// The home-tile carousels share the same brand line-ups as the presentations.
export const PACKAGE_BRANDS: Record<string, string[]> = {
  ...PACKAGE_PRESENTATIONS,
};
