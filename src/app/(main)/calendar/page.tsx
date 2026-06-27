"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { GHF_CAMPAIGNS, GHFCampaign } from "@/data/ghf-campaigns";
import { ACTIVATION_WINDOWS, ActivationDate } from "@/data/activation-windows";

interface CalEvent {
  name: string;
  date?: string;
}

interface CalMonth {
  month: string;
  ghfActivation?: string;
  events: CalEvent[];
}

const CALENDAR_2026: CalMonth[] = [
  { month: "January", ghfActivation: "Dry January", events: [] },
  {
    month: "February",
    events: [
      { name: "Waitangi Day (NZ National Day)", date: "Friday 6th" },
      { name: "Syrah Day", date: "Monday 16th" },
      { name: "Margarita Day", date: "Sunday 22nd" },
    ],
  },
  { month: "March", events: [{ name: "B-Corp Month", date: "Month" }] },
  {
    month: "April",
    ghfActivation: "Earth Month",
    events: [
      { name: "Record Store Day", date: "Saturday 18th" },
      { name: "Earth Day", date: "Wednesday 22nd" },
    ],
  },
  {
    month: "May",
    ghfActivation: "Summer Sip & Spritz",
    events: [
      { name: "Sauvignon Blanc Day", date: "Friday 1st" },
      { name: "Cocktail Day", date: "Wednesday 13th" },
      { name: "Whisky Day", date: "Saturday 16th" },
      { name: "Paloma Day", date: "Friday 22nd" },
    ],
  },
  {
    month: "June",
    ghfActivation: "Summer Sip & Spritz",
    events: [
      { name: "Environment Day", date: "Friday 5th" },
      { name: "Rosé Day", date: "Saturday 13th" },
      { name: "Sushi Day", date: "Thursday 18th" },
      { name: "Martini Day", date: "Friday 19th" },
    ],
  },
  {
    month: "July",
    ghfActivation: "Summer Sip & Spritz",
    events: [
      { name: "Rum Day", date: "Saturday 11th" },
      { name: "Tequila Day", date: "Friday 24th" },
    ],
  },
  {
    month: "August",
    ghfActivation: "Summer Sip & Spritz",
    events: [
      { name: "Spritz Day", date: "Saturday 1st" },
      { name: "Rum Day", date: "Sunday 16th" },
      { name: "Pinot Noir Day", date: "Tuesday 18th" },
    ],
  },
  {
    month: "September",
    ghfActivation: "Negroni Week",
    events: [
      { name: "Zero Waste Week", date: "Week 1" },
      { name: "Mexican Independence", date: "Wednesday 16th" },
      { name: "Harvest Festival" },
    ],
  },
  {
    month: "October",
    events: [
      { name: "World Sake Day", date: "Thursday 1st" },
      { name: "Buy British Day", date: "Saturday 3rd" },
      { name: "Vodka Day", date: "Sunday 4th" },
      { name: "G&T Day", date: "Monday 19th" },
      { name: "Mezcal Day", date: "Wednesday 21st" },
    ],
  },
  { month: "November", events: [{ name: "Day of the Dead", date: "Monday 2nd" }] },
  { month: "December", ghfActivation: "Festive", events: [] },
];

const BRAND_KEY_DATES: Record<string, string[]> = {
  sapling: ["B-Corp Month", "Earth Day", "Cocktail Day", "Martini Day", "Vodka Day", "Buy British Day"],
  fielden: ["Whisky Day", "Harvest Festival", "Buy British Day"],
  desdeya: ["Margarita Day", "Paloma Day", "Tequila Day", "Mexican Independence", "Day of the Dead"],
  pensador: ["Mezcal Day", "Mexican Independence", "Day of the Dead"],
  dropworks: ["Rum Day", "Cocktail Day", "Buy British Day"],
  everleaf: ["Cocktail Day", "Earth Day", "Spritz Day"],
  "craggy-range": ["Waitangi Day (NZ National Day)", "Syrah Day", "Sauvignon Blanc Day", "Pinot Noir Day"],
  mirabeau: ["Rosé Day", "Earth Day"],
  dreamsake: ["Sushi Day", "World Sake Day"],
  wignac: ["Spritz Day"],
  "cote-citron": ["Spritz Day"],
  "coates-and-seely": ["Cocktail Day"],
  "wild-idol": ["Dry January"],
  "big-drop": ["Dry January"],
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth2026(monthIndex: number) {
  const date = new Date(2026, monthIndex, 1);
  const startDayOfWeek = date.getDay();
  const numDays = new Date(2026, monthIndex + 1, 0).getDate();
  return { startDayOfWeek, numDays };
}

export default function CalendarPage() {
  const router = useRouter();
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string | null>(null);
  const [expandedMonthIndex, setExpandedMonthIndex] = useState<number | null>(null);
  const [selectedGhfCampaign, setSelectedGhfCampaign] = useState<GHFCampaign | null>(null);

  // Determine standard support text limit
  const truncateDescription = (text: string) => {
    const words = text.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return text;
  };

  const activeBrand = STATIC_BRANDS.find((b) => b.slug === selectedBrandSlug);

  // Return GHF Campaign by name (handles 'Festive' grouping)
  const getCampaignByName = (name: string) => {
    let lookup = name;
    if (name === "Festive") {
      lookup = activeBrand?.category?.toLowerCase() === "wines" ? "Festive Dining" : "Festive Spirit";
    }
    return GHF_CAMPAIGNS.find((c) => c.name.toLowerCase() === lookup.toLowerCase());
  };

  // Determine if a month highlights for the active filter
  const isMonthHighlighted = (monthName: string, idx: number) => {
    const mData = CALENDAR_2026[idx];
    if (!selectedBrandSlug) {
      // Default: Highlight GHF activations
      return !!mData.ghfActivation;
    }

    // Check relevant GHF activations
    if (mData.ghfActivation) {
      const campaign = getCampaignByName(mData.ghfActivation);
      if (campaign && campaign.relevantBrandSlugs.includes(selectedBrandSlug)) {
        return true;
      }
    }

    // Check relevant key dates
    const brandDates = BRAND_KEY_DATES[selectedBrandSlug] || [];
    return mData.events.some((e) => brandDates.includes(e.name));
  };

  // Get filtered events for a month based on active brand slug
  const getFilteredEvents = (mData: CalMonth) => {
    if (!selectedBrandSlug) return [];
    const brandDates = BRAND_KEY_DATES[selectedBrandSlug] || [];
    return mData.events.filter((e) => brandDates.includes(e.name));
  };

  const handleCampaignClick = (campaign: GHFCampaign) => {
    setSelectedGhfCampaign(campaign);
  };

  const navigateToCampaign = (campaignSlug: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ghf_return_to", "/calendar");
      sessionStorage.setItem("ghf_return_label", "Back to Calendar");
    }
    router.push(`/activations/${campaignSlug}`);
  };

  // Expand view calendar grid values
  const renderMonthDays = (monthIndex: number) => {
    const { startDayOfWeek, numDays } = getDaysInMonth2026(monthIndex);
    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const monthName = MONTH_NAMES[monthIndex];
    const mData = CALENDAR_2026[monthIndex];

    // Find highlighted days/ranges
    const activeDays: Record<number, string> = {};
    const checkActivation = (name: string) => {
      const win = ACTIVATION_WINDOWS[name];
      if (win) {
        const isCurrentMonth = Array.isArray(win.month)
          ? win.month.includes(monthIndex + 1)
          : win.month === monthIndex + 1;

        if (isCurrentMonth) {
          if (win.day !== undefined) {
            activeDays[win.day] = name;
          }
          if (win.range) {
            for (let d = win.range[0]; d <= win.range[1]; d++) {
              activeDays[d] = name;
            }
          }
        }
      }
    };

    // Trace active events
    if (mData.ghfActivation) {
      checkActivation(mData.ghfActivation);
    }
    mData.events.forEach((e) => {
      checkActivation(e.name);
    });

    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-2xl max-w-lg mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <h3 className="text-xl font-light text-[var(--foreground)]">
            {monthName} 2026
          </h3>
          <button
            onClick={() => setExpandedMonthIndex(null)}
            className="text-xs uppercase tracking-widest text-[var(--sage)] hover:text-[var(--foreground)] transition-colors font-bold cursor-pointer"
          >
            ← Close Grid
          </button>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {daysOfWeek.map((d) => (
            <span key={d} className="font-bold text-[var(--muted-foreground)] py-1">
              {d}
            </span>
          ))}
          {days.map((dayVal, idx) => {
            if (dayVal === null) {
              return <span key={`empty-${idx}`} />;
            }
            const activeEvent = activeDays[dayVal];
            return (
              <div
                key={`day-${dayVal}`}
                title={activeEvent}
                className={`aspect-square rounded-full flex flex-col items-center justify-center text-xs relative transition-all ${
                  activeEvent
                    ? "bg-[var(--sage)] text-[var(--background)] font-bold shadow-md cursor-pointer hover:scale-105"
                    : "text-[var(--foreground)]/70 hover:bg-[var(--border)]/30"
                }`}
                onClick={() => {
                  if (activeEvent) {
                    const campaign = getCampaignByName(activeEvent);
                    if (campaign) {
                      handleCampaignClick(campaign);
                    }
                  }
                }}
              >
                <span>{dayVal}</span>
                {activeEvent && (
                  <span className="absolute bottom-1 text-[5px] uppercase tracking-tighter opacity-80 line-clamp-1 max-w-[80%]">
                    •
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* List of Month Activations */}
        <div className="space-y-3 pt-4 border-t border-[var(--border)]/40">
          <p className="text-[10px] tracking-widest uppercase text-[var(--muted-foreground)]">
            Activations & Key Dates
          </p>
          {mData.ghfActivation && (
            <div className="p-3 bg-[var(--sage)]/10 rounded-lg flex items-center justify-between border border-[var(--sage)]/25">
              <div>
                <span className="text-[8px] font-bold tracking-widest uppercase text-[var(--sage)] block">
                  GHF Activation
                </span>
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {mData.ghfActivation}
                </span>
              </div>
              <button
                onClick={() => {
                  const camp = getCampaignByName(mData.ghfActivation!);
                  if (camp) handleCampaignClick(camp);
                }}
                className="text-[10px] font-bold uppercase tracking-wider text-[var(--sage)] hover:underline cursor-pointer"
              >
                Details
              </button>
            </div>
          )}

          {mData.events.map((e, idx) => {
            const isRelevant = !selectedBrandSlug || (BRAND_KEY_DATES[selectedBrandSlug] || []).includes(e.name);
            if (!isRelevant) return null;
            return (
              <div key={idx} className="p-3 bg-[var(--border)]/20 rounded-lg flex items-center justify-between border border-[var(--border)]/50">
                <div>
                  <span className="text-[8px] font-bold tracking-widest uppercase text-[var(--muted-foreground)] block">
                    Key Date
                  </span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    {e.name}
                  </span>
                </div>
                {e.date && (
                  <span className="text-[10px] text-[var(--muted-foreground)] font-semibold uppercase">
                    {e.date}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
          2026 Activation Calendar
        </h1>
        <button
          onClick={() => router.push("/")}
          className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
        >
          ← Home
        </button>
      </div>

      {/* Brand Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-4 mb-8 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => {
            setSelectedBrandSlug(null);
            setExpandedMonthIndex(null);
          }}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border cursor-pointer flex-shrink-0 ${
            selectedBrandSlug === null
              ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
              : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]"
          }`}
        >
          All Brands
        </button>
        {STATIC_BRANDS.map((brand) => {
          const isActive = brand.slug === selectedBrandSlug;
          return (
            <button
              key={brand.slug}
              onClick={() => {
                setSelectedBrandSlug(brand.slug);
                setExpandedMonthIndex(null);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border cursor-pointer flex-shrink-0 ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]"
              }`}
            >
              {brand.name}
            </button>
          );
        })}
      </div>

      {/* Primary Content Grid */}
      {expandedMonthIndex !== null ? (
        <div className="flex-1 flex items-center justify-center py-6">
          {renderMonthDays(expandedMonthIndex)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
          {CALENDAR_2026.map((m, idx) => {
            const isLit = isMonthHighlighted(m.month, idx);
            const filteredEvents = getFilteredEvents(m);
            const hasGhf = !!m.ghfActivation;
            const campaign = m.ghfActivation ? getCampaignByName(m.ghfActivation) : null;
            const isGhfActive =
              hasGhf && (!selectedBrandSlug || (campaign && campaign.relevantBrandSlugs.includes(selectedBrandSlug)));

            return (
              <div
                key={m.month}
                onClick={() => isLit && setExpandedMonthIndex(idx)}
                className={`border rounded-lg p-5 flex flex-col min-h-[220px] transition-all relative group ${
                  isLit
                    ? "cursor-pointer hover:border-[var(--sage)] hover:shadow-lg bg-[var(--card)] border-[var(--border)]"
                    : "opacity-45 bg-[var(--card)]/40 border-[var(--border)]/50"
                }`}
              >
                <h2 className="text-xl font-light text-[var(--foreground)] mb-3">
                  {m.month}
                </h2>

                {/* GHF Activation Label */}
                {isGhfActive && m.ghfActivation && (
                  <div
                    onClick={(e) => {
                      if (campaign) {
                        e.stopPropagation();
                        handleCampaignClick(campaign);
                      }
                    }}
                    className="mb-3 px-3 py-2 rounded border border-[var(--sage)]/30 bg-[var(--sage)]/5 text-center transition-all hover:bg-[var(--sage)]/15"
                  >
                    <p className="text-[8px] tracking-[0.25em] uppercase text-[var(--sage)] font-bold">
                      GHF Activation
                    </p>
                    <p className="text-xs font-bold tracking-wider uppercase text-[var(--sage)] mt-0.5">
                      {m.ghfActivation}
                    </p>
                  </div>
                )}

                {/* Brand-Specific Key Dates List */}
                <div className="space-y-1.5 flex-1 overflow-hidden">
                  {selectedBrandSlug &&
                    filteredEvents.map((e, eIdx) => (
                      <div key={eIdx} className="text-xs text-[var(--muted-foreground)]">
                        • {e.name}
                      </div>
                    ))}
                </div>

                {isLit && (
                  <span className="absolute bottom-4 right-4 text-[9px] tracking-widest uppercase font-bold text-[var(--sage)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Zoom →
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* GHF Activation Details Overlay Popup */}
      {selectedGhfCampaign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl space-y-6 relative text-center flex flex-col items-center">
            <button
              onClick={() => setSelectedGhfCampaign(null)}
              className="absolute top-4 right-4 text-xs uppercase tracking-widest hover:text-[var(--sage)] text-[var(--muted-foreground)] font-bold cursor-pointer"
            >
              ✕ Close
            </button>

            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block">
              GHF Portfolio Activation
            </span>
            <h3 className="text-2xl font-light text-[var(--foreground)]">
              {selectedGhfCampaign.name}
            </h3>

            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-sm">
              {truncateDescription(selectedGhfCampaign.description)}
            </p>

            <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)] w-full text-left">
              <span className="text-[9px] tracking-widest uppercase text-[var(--sage)] font-bold block mb-1">
                Campaign Support Included:
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Support includes menu printing, staff trainings and incentives, stock support
              </p>
            </div>

            <div className="flex gap-4 w-full pt-2">
              <button
                onClick={() => setSelectedGhfCampaign(null)}
                className="flex-1 py-3 border border-[var(--border)] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[var(--border)]/40 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => navigateToCampaign(selectedGhfCampaign.id)}
                className="flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[var(--background)] bg-[var(--foreground)] hover:opacity-90 cursor-pointer"
              >
                Find Out More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brand-Specific Key Dates model disclaimer */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-10 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Brand key dates are curated manually. Future updates will be managed via the Back Office system.
      </div>
    </div>
  );
}
