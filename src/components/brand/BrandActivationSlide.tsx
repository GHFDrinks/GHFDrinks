"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";
import { ACTIVATION_WINDOWS } from "@/data/activation-windows";
import { ConstantTabs } from "@/components/present/ConstantTabs";
import { GHF_CAMPAIGNS, GHFCampaign } from "@/data/ghf-campaigns";

// Helper to get start day (0=Sunday) and number of days for any month in 2026
function getDaysInMonth2026(month: number) {
  const date = new Date(2026, month - 1, 1);
  const startDayOfWeek = date.getDay(); // 0 = Sunday
  const numDays = new Date(2026, month, 0).getDate();
  return { startDayOfWeek, numDays };
}

function getGhfCampaign(dateName: string, brandCategory?: string) {
  let name = dateName;
  if (dateName === "Festive") {
    name = brandCategory?.toLowerCase() === "spirits" ? "Festive Spirit" : "Festive Dining";
  }
  return GHF_CAMPAIGNS.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

export function BrandActivationSlide({ brand, isWebPage = false }: { brand: Brand; isWebPage?: boolean }) {
  const router = useRouter();
  const [viewModes, setViewModes] = useState<Array<"normal" | "year" | "month">>(["normal", "normal"]);
  const [selectedEvent, setSelectedEvent] = useState<Array<string | null>>([null, null]);
  const [selectedMonth, setSelectedMonth] = useState<Array<number>>([1, 1]);
  const [selectedGhfCampaign, setSelectedGhfCampaign] = useState<GHFCampaign | null>(null);

  const local = getBrandImages(brand.slug);
  const activations = brand.activations || [];

  // Filter GHF campaigns relevant to this brand
  const brandGhfCampaigns = GHF_CAMPAIGNS.filter((c) =>
    c.relevantBrandSlugs.includes(brand.slug)
  );
  const brandGhfNames = brandGhfCampaigns.map((c) => c.name);

  // Generate exactly 2 tiles to render
  const tiles: Array<
    | { type: "real"; act: any; idx: number; photo: string }
    | { type: "placeholder" }
  > = [];

  if (activations.length >= 2) {
    tiles.push({
      type: "real",
      act: activations[0],
      idx: 0,
      photo: local?.activations?.[0] || activations[0].image?.url || "",
    });
    tiles.push({
      type: "real",
      act: activations[1],
      idx: 1,
      photo: local?.activations?.[1] || activations[1].image?.url || "",
    });
  } else if (activations.length === 1) {
    tiles.push({
      type: "real",
      act: activations[0],
      idx: 0,
      photo: local?.activations?.[0] || activations[0].image?.url || "",
    });
    tiles.push({ type: "placeholder" });
  } else {
    tiles.push({ type: "placeholder" });
    tiles.push({ type: "placeholder" });
  }

  const getActDates = (act: any) => {
    return Array.from(
      new Set([
        ...(act.keyDates || []),
        ...brandGhfNames,
      ])
    );
  };

  const hasTwo = tiles.length > 1;

  function renderYearView(act: any, idx: number) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const allDates = getActDates(act);

    // Find highlighted months
    const highlightedMonths = new Set<number>();
    (allDates || []).forEach((d: string) => {
      const win = ACTIVATION_WINDOWS[d];
      if (win) {
        if (Array.isArray(win.month)) {
          win.month.forEach((m) => highlightedMonths.add(m));
        } else {
          highlightedMonths.add(win.month);
        }
      }
    });

    return (
      <div className="flex flex-col h-full p-6 justify-between min-h-[400px]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold tracking-widest text-[var(--cream)] uppercase">
              2026 Calendar
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewModes((prev) => {
                  const copy = [...prev];
                  copy[idx] = "normal";
                  return copy;
                });
              }}
              className="text-xs text-[var(--sage)] hover:text-[var(--foreground)] transition-colors"
            >
              ← back
            </button>
          </div>
          <p className="text-[11px] text-[var(--muted-foreground)] mb-6">
            Highlighting months with active campaigns. Click a highlighted month to zoom.
          </p>

          {/* 4x3 Grid */}
          <div className="grid grid-cols-4 gap-2">
            {months.map((m, mIdx) => {
              const monthNum = mIdx + 1;
              const isHighlighted = highlightedMonths.has(monthNum);
              return (
                <button
                  key={m}
                  disabled={!isHighlighted}
                  onClick={(e) => {
                    e.stopPropagation();
                    const matchedEvent = (allDates || []).find((d: string) => {
                      const win = ACTIVATION_WINDOWS[d];
                      if (!win) return false;
                      if (Array.isArray(win.month)) {
                        return win.month.includes(monthNum);
                      }
                      return win.month === monthNum;
                    });
                    setSelectedEvent((prev) => {
                      const copy = [...prev];
                      copy[idx] = matchedEvent || null;
                      return copy;
                    });
                    setSelectedMonth((prev) => {
                      const copy = [...prev];
                      copy[idx] = monthNum;
                      return copy;
                    });
                    setViewModes((prev) => {
                      const copy = [...prev];
                      copy[idx] = "month";
                      return copy;
                    });
                  }}
                  className={`py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-all ${
                    isHighlighted
                      ? "bg-[var(--sage)] text-[var(--background)] hover:scale-[1.05]"
                      : "bg-[var(--background)]/40 text-[var(--muted-foreground)]/30 cursor-not-allowed"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Campaign List */}
        <div className="pt-4 border-t border-[var(--border)] mt-4">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted-foreground)] mb-2">
            Key Dates
          </p>
          <div className="flex flex-wrap gap-1.5">
            {allDates.map((date: string, i: number) => {
              const campaign = getGhfCampaign(date, brand.category);
              const isGhf = !!campaign;

              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isGhf) {
                      setSelectedGhfCampaign(campaign);
                    } else {
                      const win = ACTIVATION_WINDOWS[date];
                      if (win) {
                        setSelectedEvent((prev) => {
                          const copy = [...prev];
                          copy[idx] = date;
                          return copy;
                        });
                        setSelectedMonth((prev) => {
                          const copy = [...prev];
                          copy[idx] = Array.isArray(win.month) ? win.month[0] : win.month;
                          return copy;
                        });
                        setViewModes((prev) => {
                          const copy = [...prev];
                          copy[idx] = "month";
                          return copy;
                        });
                      }
                    }
                  }}
                  className={`text-[9px] px-2.5 py-1 rounded transition-colors ${
                    isGhf
                      ? "bg-[var(--sage)] text-[var(--foreground)] font-bold hover:opacity-90"
                      : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--sage)]"
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function renderMonthView(act: any, idx: number) {
    const monthNum = selectedMonth[idx];
    const eventName = selectedEvent[idx];
    const eventData = eventName ? ACTIVATION_WINDOWS[eventName] : null;

    const monthsFull = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const { startDayOfWeek, numDays } = getDaysInMonth2026(monthNum);

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    function isDayHighlighted(dayNum: number) {
      if (!eventData) return false;
      if (eventData.day !== undefined) {
        return eventData.day === dayNum;
      }
      if (eventData.range) {
        return dayNum >= eventData.range[0] && dayNum <= eventData.range[1];
      }
      return true;
    }

    return (
      <div className="flex flex-col h-full p-6 justify-between min-h-[400px]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold tracking-widest text-[var(--cream)] uppercase">
              {monthsFull[monthNum - 1]} 2026
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewModes((prev) => {
                  const copy = [...prev];
                  copy[idx] = "year";
                  return copy;
                });
              }}
              className="text-xs text-[var(--sage)] hover:text-[var(--foreground)] transition-colors"
            >
              ← back
            </button>
          </div>

          {eventName && (
            <div className="mb-4 bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent-orange)]">
                Active Campaign
              </p>
              <p className="text-xs text-[var(--cream)] font-medium mt-0.5">
                {eventName}
                {eventData?.day && ` (${monthsFull[monthNum - 1]} ${eventData.day})`}
                {eventData?.range && ` (${monthsFull[monthNum - 1]} ${eventData.range[0]}-${eventData.range[1]})`}
              </p>
            </div>
          )}

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
            {daysOfWeek.map((d) => (
              <span key={d} className="font-bold text-[var(--muted-foreground)] py-1">
                {d}
              </span>
            ))}
            {days.map((dayVal, dIdx) => {
              if (dayVal === null) {
                return <span key={`empty-${dIdx}`} />;
              }
              const active = isDayHighlighted(dayVal);
              return (
                <span
                  key={`day-${dayVal}`}
                  className={`py-1.5 rounded-full flex items-center justify-center font-medium ${
                    active
                      ? "bg-[var(--accent-orange)] text-[var(--cream)] font-bold shadow-md"
                      : "text-[var(--foreground)]/70"
                  }`}
                >
                  {dayVal}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function renderNormalView(act: any, idx: number, photo: string) {
    const allDates = getActDates(act);

    return (
      <>
        {/* Photo container with fixed ratio & border bottom */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--border)] flex-shrink-0 bg-[var(--muted)]">
          {photo ? (
            <img
              src={photo}
              alt={act.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--muted)] to-[var(--background)]" />
          )}

          {/* Mixer Pairing overlay */}
          {act.mixerPairings && act.mixerPairings[0] && (
            <div className="absolute bottom-4 right-4 bg-[var(--background)]/90 backdrop-blur px-3 py-1.5 rounded-xl border border-[var(--border)] flex items-center gap-2">
              <span className="text-[9px] tracking-wider uppercase text-[var(--muted-foreground)]">
                Serve with:
              </span>
              <img
                src={act.mixerPairings[0].imageUrl}
                alt={act.mixerPairings[0].name}
                className="w-5 h-5 object-contain"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 flex flex-col justify-between min-h-0 overflow-y-auto scrollbar-hide">
          <div className="space-y-3">
            <h3 className="text-xl font-light tracking-wide text-[var(--foreground)] group-hover:text-[var(--sage)] transition-colors">
              {act.title}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              {act.description}
            </p>
          </div>

          {allDates && allDates.length > 0 && (
            <div className="pt-4 border-t border-[var(--border)] mt-4">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted-foreground)] mb-2">
                Key Dates
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allDates.map((date: string, i: number) => {
                  const campaign = getGhfCampaign(date, brand.category);
                  const isGhf = !!campaign;

                  return (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent card flip
                        if (isGhf) {
                          setSelectedGhfCampaign(campaign);
                        } else {
                          const win = ACTIVATION_WINDOWS[date];
                          if (win) {
                            setSelectedEvent((prev) => {
                              const copy = [...prev];
                              copy[idx] = date;
                              return copy;
                            });
                            setSelectedMonth((prev) => {
                              const copy = [...prev];
                              copy[idx] = Array.isArray(win.month) ? win.month[0] : win.month;
                              return copy;
                            });
                            setViewModes((prev) => {
                              const copy = [...prev];
                              copy[idx] = "month";
                              return copy;
                            });
                          }
                        }
                      }}
                      className={`text-[9px] px-2.5 py-1 rounded transition-colors ${
                        isGhf
                          ? "bg-[var(--sage)] text-[var(--foreground)] font-bold hover:opacity-90"
                          : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--sage)]"
                      }`}
                    >
                      {date}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  if (isWebPage) {
    return (
      <section className="w-full max-w-6xl mx-auto py-16 px-14">
        {/* Section Title */}
        <div className="mb-10">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
            Activations
          </span>
          <h2 className="text-4xl font-light tracking-tight text-[var(--cream)]">
            Brand Activations
          </h2>
        </div>

        {/* Main Grid */}
        <div className={`grid ${hasTwo ? "grid-cols-1 md:grid-cols-2 gap-8" : "grid-cols-1 max-w-2xl mx-auto"} w-full`}>
          {tiles.map((tile, idx) => {
            if (tile.type === "placeholder") {
              return (
                <div
                  key={`placeholder-${idx}`}
                  className="flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl min-h-[420px] justify-center items-center text-center p-8"
                >
                  <p className="text-lg font-light tracking-wide uppercase text-[var(--sage)]">
                    More activations coming soon
                  </p>
                </div>
              );
            }

            const { act, photo } = tile;
            return (
              <div
                key={act.id}
                onClick={() => {
                  if (viewModes[idx] === "normal") {
                    setViewModes((prev) => {
                      const copy = [...prev];
                      copy[idx] = "year";
                      return copy;
                    });
                  }
                }}
                className={`flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[var(--sage)]/35 group min-h-[420px] ${
                  viewModes[idx] === "normal" ? "cursor-pointer" : ""
                }`}
              >
                {viewModes[idx] === "year" && renderYearView(act, idx)}
                {viewModes[idx] === "month" && renderMonthView(act, idx)}
                {viewModes[idx] === "normal" && renderNormalView(act, idx, photo)}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col overflow-hidden bg-[var(--background)] p-12 justify-between relative">
      
      {/* Top Editorial Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage)] animate-pulse" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold">
            Activations
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted-foreground)]">
            {brand.name}
          </span>
          <a
            href={`/brands/${brand.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-2.5 py-1 rounded bg-[var(--card)]"
          >
            Discover More
          </a>
        </div>
      </div>

      {/* Main Activation Area */}
      <div className="flex-1 my-auto flex items-center justify-center py-6">
        <div className={`grid ${hasTwo ? "grid-cols-2 gap-8" : "grid-cols-1 max-w-2xl"} w-full h-full max-h-[70vh]`}>
          {tiles.map((tile, idx) => {
            if (tile.type === "placeholder") {
              return (
                <div
                  key={`placeholder-${idx}`}
                  className="flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl h-full justify-center items-center text-center p-8"
                >
                  <p className="text-lg font-light tracking-wide uppercase text-[var(--sage)]">
                    More activations coming soon
                  </p>
                </div>
              );
            }

            const { act, photo } = tile;
            return (
              <div
                key={act.id}
                onClick={() => {
                  if (viewModes[idx] === "normal") {
                    setViewModes((prev) => {
                      const copy = [...prev];
                      copy[idx] = "year";
                      return copy;
                    });
                  }
                }}
                className={`flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[var(--sage)]/30 group ${
                  viewModes[idx] === "normal" ? "cursor-pointer" : ""
                }`}
              >
                {viewModes[idx] === "year" && renderYearView(act, idx)}
                {viewModes[idx] === "month" && renderMonthView(act, idx)}
                {viewModes[idx] === "normal" && renderNormalView(act, idx, photo)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-4" />

      {/* GHF Activation Detail Modal */}
      {selectedGhfCampaign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block">
                GHF Campaign
              </span>
              <h3 className="text-2xl font-light text-[var(--foreground)]">{selectedGhfCampaign.name}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed pt-2">
                {selectedGhfCampaign.description.split(" ").slice(0, 20).join(" ") + (selectedGhfCampaign.description.split(" ").length > 20 ? "..." : "")}
              </p>
              <p className="text-xs text-[var(--sage)] font-medium pt-3 border-t border-[var(--border)]/40 mt-3">
                Support includes menu printing, staff trainings and incentives, stock support
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedGhfCampaign(null)}
                className="flex-1 py-3 border border-[var(--border)] text-[var(--foreground)] text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[var(--muted)]/20 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("returnTo", window.location.pathname);
                  }
                  router.push(`/activations/${selectedGhfCampaign.id}`);
                }}
                className="flex-1 py-3 bg-[var(--foreground)] text-[var(--background)] text-xs font-bold tracking-widest uppercase rounded-lg hover:opacity-90 transition-all"
              >
                Find out more
              </button>
            </div>
          </div>
        </div>
      )}

      <ConstantTabs brandSlug={brand.slug} />
    </section>
  );
}
