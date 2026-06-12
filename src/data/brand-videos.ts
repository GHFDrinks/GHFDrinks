export const BRAND_VIDEOS: Record<string, string> = {
  sapling: "",
  fielden: "",
  dropworks: "",
  desdeya: "",
  pensador: "",
  everleaf: "",
  "wild-idol": "",
  "coates-and-seely": "",
  mirabeau: "",
  "craggy-range": "",
  "quinta-da-romaneira": "",
  noam: "",
  wignac: "",
  "cote-citron": "",
  "big-drop": "",
  "fever-tree": "",
  dreamsake: ""
};

export function getBrandVideo(slug: string): string {
  return BRAND_VIDEOS[slug] || "";
}
