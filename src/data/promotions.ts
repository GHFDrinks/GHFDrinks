export type Promotion = {
  id: string;
  brandSlug: string;
  title: string;
  description: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  targetUrl?: string;
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "paloma-day-special",
    brandSlug: "desdeya",
    title: "Paloma Day Special",
    description: "Featured pricing and custom menu assets on Desdeya Tequila Blanco for Paloma Day celebrations.",
    startDate: "2026-06-01T00:00:00.000Z",
    endDate: "2026-12-31T23:59:59.000Z",
    targetUrl: "/promotions/paloma-day-special",
  }
];
