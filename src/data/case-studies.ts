export interface CaseStudy {
  id: string;
  outletName: string;
  description: string;
  imagePlaceholderColor: string;
  details: string;
}

export const CASE_STUDIES: Record<string, CaseStudy[]> = {
  prestige: [
    {
      id: "prestige-1",
      outletName: "The Ritz London [PLACEHOLDER]",
      description: "Luxury hotel activation featuring premium serves and bespoke staff pairing masterclasses.",
      imagePlaceholderColor: "var(--card)",
      details: "This is a detailed placeholder description for The Ritz London case study. It showcases how GHF Drinks implemented premium serves in high-end hospitality venues, driving cocktail margins and guest satisfaction."
    },
    {
      id: "prestige-2",
      outletName: "Annabel's [PLACEHOLDER]",
      description: "Exquisite private member club rotating cocktail partnership with customized brand activations.",
      imagePlaceholderColor: "var(--card)",
      details: "This Annabel's private club case study detail illustrates our capability in delivering highly tailored and exclusive activations that appeal to discerning members."
    },
    {
      id: "prestige-3",
      outletName: "Savoy Grill [PLACEHOLDER]",
      description: "Fine dining menu integration of artisanal English sparkling wines and climate positive spirits.",
      imagePlaceholderColor: "var(--card)",
      details: "Savoy Grill details go here. Displays the long-term sales lift resulting from listing Coates & Seely alongside curated gin & vodka serves."
    }
  ],
  independent: [
    {
      id: "indie-1",
      outletName: "The Pelican Notting Hill [PLACEHOLDER]",
      description: "Regenerative agriculture menu focus and sustainable beer partnership with local storytelling.",
      imagePlaceholderColor: "var(--card)",
      details: "Detailed indie-1 case study for Notting Hill's popular pub showcasing natural wine growth and community engagement."
    },
    {
      id: "indie-2",
      outletName: "Noble Rot [PLACEHOLDER]",
      description: "Bespoke wine flight program highlighting organic, boutique vineyards and staff education.",
      imagePlaceholderColor: "var(--card)",
      details: "Noble Rot case study detail focusing on wine lists curation, sommelier training, and menu pairing achievements."
    },
    {
      id: "indie-3",
      outletName: "Callooh Callay [PLACEHOLDER]",
      description: "Innovative craft rum menu activation utilizing high-ester expressions in creative serves.",
      imagePlaceholderColor: "var(--card)",
      details: "Callooh Callay case study showing how DropWorks rum serves boosted midweek traffic with unique mixology events."
    }
  ],
  national: [
    {
      id: "national-1",
      outletName: "Soho House Group [PLACEHOLDER]",
      description: "Global listing of climate positive gin and house-pour radlers across UK locations.",
      imagePlaceholderColor: "var(--card)",
      details: "Soho House group case study details showing the national distribution, logistics support, and volume success of Sapling."
    },
    {
      id: "national-2",
      outletName: "The Pig Hotels [PLACEHOLDER]",
      description: "Hyper-local garden-to-glass botanical non-alcoholic menu alignment across all sites.",
      imagePlaceholderColor: "var(--card)",
      details: "Detailed case study for The Pig Hotels group illustrating sustainable listing and local gin pairings."
    },
    {
      id: "national-3",
      outletName: "Dishoom [PLACEHOLDER]",
      description: "Exclusive craft soda and non-alcoholic aperitif pairings matching spicy culinary profiles.",
      imagePlaceholderColor: "var(--card)",
      details: "Dishoom detail showing how Everleaf pairings drove non-alcoholic spend by 18% over a six-month window."
    }
  ]
};

export function getCaseStudies(tier: string): CaseStudy[] {
  return CASE_STUDIES[tier.toLowerCase()] || [];
}
