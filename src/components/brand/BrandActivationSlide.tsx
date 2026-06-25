"use client";

import React, { useState } from "react";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";
import { ACTIVATION_WINDOWS } from "@/data/activation-windows";
import { ConstantTabs } from "@/components/present/ConstantTabs";

// Helper to get start day (0=Sunday) and number of days for any month in 2026
function getDaysInMonth2026(month: number) {
  const date = new Date(2026, month - 1, 1);
  const startDayOfWeek = date.getDay(); // 0 = Sunday
  const numDays = new Date(2026, month, 0).getDate();
  return { startDayOfWeek, numDays };
}

export function BrandActivationSlide({ brand, isWebPage = false }: { brand: Brand; isWebPage?: boolean }) {
  const [viewModes, setViewModes] = useState<Array<"normal" | "year" | "month">>(["normal", "normal"]);
  const [selectedEvent, setSelectedEvent] = useState<Array<string | null>>([null, null]);
  const [selectedMonth, setSelectedMonth] = useState<Array<number>>([1, 1]);

  if (!brand.activations || brand.activations.length === 0) return null;

  const local = getBrandImages(brand.slug);
  const act1 = brand.activations[0];
  const act2 = brand.activations[1];

  const act1Photo =
    local?.activations?.[0] || act1.photo1?.url || act1.image?.url || "";
  const act2Photo =
    local?.activations?.[1] || act2?.photo1?.url || act2?.image?.url || "";

  const allDates = brand.activations.flatMap((a) => a.keyDates || []);
  const tickerText = allDates.length > 0 ? allDates.join("    ·    ") : "";

  const hasTwo = !!act2;

  function renderYearView(act: any, idx: number) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Find highlighted months
    const highlightedMonths = new Set<number>();
    (act.keyDates || []).forEach((d: string) => {
      const win = ACTIVATION_WINDOWS[d];
      if (win) highlightedMonths.add(win.month);
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
                    const matchedEvent = (act.keyDates || []).find(
                      (d: string) => ACTIVATION_WINDOWS[d]?.month === monthNum
                    );
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
            Key Activation Windows
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(act.keyDates || []).map((date: string, i: number) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  const win = ACTIVATION_WINDOWS[date];
                  if (win) {
                    setSelectedEvent((prev) => {
                      const copy = [...prev];
                      copy[idx] = date;
                      return copy;
                    });
                    setSelectedMonth((prev) => {
                      const copy = [...prev];
                      copy[idx] = win.month;
                      return copy;
                    });
                    setViewModes((prev) => {
                      const copy = [...prev];
                      copy[idx] = "month";
                      return copy;
                    });
                  }
                }}
                className="text-[9px] px-2.5 py-1 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]/80 hover:border-[var(--sage)] hover:text-[var(--foreground)] transition-colors"
              >
                {date}
              </button>
            ))}
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

        <div className="text-[9px] tracking-wider text-[var(--muted-foreground)] text-center mt-4 pt-2 border-t border-[var(--border)]">
          2026 Activation Schedule
        </div>
      </div>
    );
  }

  function renderNormalView(act: any, idx: number, photo: string) {
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
          
          {/* Category overlay badge */}
          <div className="absolute top-4 left-4 bg-[var(--background)]/90 backdrop-blur px-3 py-1 rounded-full border border-[var(--border)]">
            <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--sage)]">
              {act.activationType || "Campaign"}
            </span>
          </div>

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

          {act.keyDates && act.keyDates.length > 0 && (
            <div className="pt-4 border-t border-[var(--border)] mt-4">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted-foreground)] mb-2">
                Key Activation Windows
              </p>
              <div className="flex flex-wrap gap-1.5">
                {act.keyDates.map((date: string, i: number) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card flip
                      const win = ACTIVATION_WINDOWS[date];
                      if (win) {
                        setSelectedEvent((prev) => {
                          const copy = [...prev];
                          copy[idx] = date;
                          return copy;
                        });
                        setSelectedMonth((prev) => {
                          const copy = [...prev];
                          copy[idx] = win.month;
                          return copy;
                        });
                        setViewModes((prev) => {
                          const copy = [...prev];
                          copy[idx] = "month";
                          return copy;
                        });
                      }
                    }}
                    className="text-[9px] px-2.5 py-1 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]/80 hover:border-[var(--sage)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {date}
                  </button>
                ))}
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
            Activations & Campaigns
          </span>
          <h2 className="text-4xl font-light tracking-tight text-[var(--cream)]">
            Brand Activations
          </h2>
        </div>

        {/* Main Grid */}
        <div className={`grid ${hasTwo ? "grid-cols-1 md:grid-cols-2 gap-8" : "grid-cols-1 max-w-2xl mx-auto"} w-full`}>
          {[act1, act2].map((act, idx) => {
            if (!act) return null;
            const photo = idx === 0 ? act1Photo : act2Photo;
            
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
            Activations & Campaigns
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
            Story ↗
          </a>
        </div>
      </div>

      {/* Main Activation Area */}
      <div className="flex-1 my-auto flex items-center justify-center py-6">
        <div className={`grid ${hasTwo ? "grid-cols-2 gap-8" : "grid-cols-1 max-w-2xl"} w-full h-full max-h-[70vh]`}>
          {[act1, act2].map((act, idx) => {
            if (!act) return null;
            const photo = idx === 0 ? act1Photo : act2Photo;
            
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

      {/* Bottom Ticker */}
      {tickerText ? (
        <div
          className="h-8 flex-shrink-0 flex items-center overflow-hidden border-t border-[var(--border)] mt-4 bg-[var(--card)] rounded-lg"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted-foreground)] px-10">
              · {tickerText} · {tickerText} · {tickerText} ·
            </span>
          </div>
        </div>
      ) : (
        <div className="h-4" />
      )}

      <ConstantTabs brandSlug={brand.slug} />
    </section>
  );
}
