"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UPCOMING_EVENTS } from "@/data/upcoming-events";

export default function UpcomingEventsPage() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Collapse on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTileClick = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="min-h-screen px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              Resources Hub
            </span>
            <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
              Upcoming Events
            </h1>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Consumer tastings, brand dinners, and trade activations with available tickets
            </p>
          </div>
          <button
            onClick={() => router.push("/resources")}
            className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
          >
            ← Resources
          </button>
        </div>

        {/* Global Events List Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {UPCOMING_EVENTS.map((event) => {
            const isExpanded = expandedId === event.id;
            const isDimmed = expandedId !== null && !isExpanded;

            return (
              <div
                key={event.id}
                onClick={() => handleTileClick(event.id)}
                className={`bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer ${
                  isDimmed ? "opacity-45 scale-[0.98] blur-[0.5px]" : "opacity-100 scale-100"
                } ${isExpanded ? "border-[var(--sage)] ring-1 ring-[var(--sage)]/40" : "hover:border-[var(--sage)]/40"}`}
              >
                {/* Full-bleed image slot */}
                <div className="aspect-[16/9] overflow-hidden relative bg-[var(--muted)]">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45" />

                  {/* Absolute date overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--sage)] block">
                      {event.date}
                    </span>
                    <h3 className="text-lg font-light text-[var(--pearl)] tracking-wide mt-0.5">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom expandable details */}
                <div className="p-6 space-y-4">
                  {event.location && (
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                      <span className="font-semibold uppercase tracking-wider text-[var(--sage)]">
                        Location:
                      </span>
                      <span>{event.location}</span>
                    </div>
                  )}

                  {/* Dynamic in-page slide transition */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isExpanded ? "250px" : "0px",
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? "1rem" : "0px",
                    }}
                  >
                    <div className="space-y-4 border-t border-[var(--border)]/60 pt-4">
                      <p className="text-xs text-[var(--foreground)]/90 leading-relaxed">
                        {event.description}
                      </p>

                      {event.ticketUrl && (
                        <div className="pt-2">
                          <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-block px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-[10px] font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
                          >
                            Get Tickets / Register
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Event details and dates represent planned activations. Support ticketing can be configured via back office.
      </div>
    </div>
  );
}
