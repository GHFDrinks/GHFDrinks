export type UpcomingEvent = {
  id: string;
  title: string;
  date: string; // string representation or ISO
  image: string;
  description: string;
  location?: string;
  ticketUrl?: string;
};

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "london-wine-fair-2026",
    title: "London Wine Fair 2026",
    date: "May 18 - 20, 2026",
    image: "/brands/craggy-range/lifestyle-1.jpg",
    description: "Visit the GHF Drinks stand at the London Wine Fair. We will be showcasing our complete range of cool-climate wines, biodynamic ciders, and premium sakes.",
    location: "Olympia London",
    ticketUrl: "https://www.londonwinefair.com",
  },
  {
    id: "sapling-planting-weekend",
    title: "Sapling Planting Weekend",
    date: "June 6 - 7, 2026",
    image: "/brands/sapling/lifestyle-1.jpg",
    description: "Join the Sapling team in Sussex for our annual tree-planting and forest rejuvenation weekend. Includes wild cooking, premium vodka tastings, and camping.",
    location: "Sussex Woodlands",
  },
  {
    id: "english-sparkling-tasting",
    title: "English Sparkling Showcase",
    date: "July 12, 2026",
    image: "/brands/coates-and-seely/lifestyle-1.jpg",
    description: "An exclusive consumer tasting session exploring Coates & Seely's Brut and Rosé traditional method sparkling wines on the river terrace.",
    location: "Savoy River Terrace, London",
  },
  {
    id: "mezcal-masterclass-london",
    title: "Pensador Agave Discovery",
    date: "September 24, 2026",
    image: "/brands/pensador/lifestyle-1.jpg",
    description: "A deep dive into artisanal agave spirits, hosted by Pensador founder and Oaxacan mezcaleros. Includes neat tastings and food pairings.",
    location: "KOL Chamber, London",
  }
];
