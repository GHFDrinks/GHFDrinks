"use client";

import React from "react";

interface CalEvent { name: string; date?: string; }
interface CalMonth { month: string; ghfActivation?: string; events: CalEvent[]; }

const CALENDAR_2026: CalMonth[] = [
  { month: "January", ghfActivation: "Dry January", events: [] },
  { month: "February", events: [
    { name: "Waitangi Day", date: "Friday 6th" },
    { name: "Syrah Day", date: "Monday 16th" },
    { name: "Margarita Day", date: "Sunday 22nd" },
  ]},
  { month: "March", events: [{ name: "B-Corp Month", date: "Month" }] },
  { month: "April", ghfActivation: "Earth Month", events: [
    { name: "Record Store Day", date: "Saturday 18th" },
    { name: "Earth Day", date: "Wednesday 22nd" },
  ]},
  { month: "May", ghfActivation: "Summer Sip & Spritz", events: [
    { name: "Sauvignon Blanc Day", date: "Friday 1st" },
    { name: "World Cocktail Day", date: "Wednesday 13th" },
    { name: "World Whisky Day", date: "Saturday 16th" },
    { name: "Paloma Day", date: "Friday 22nd" },
  ]},
  { month: "June", ghfActivation: "Summer Sip & Spritz", events: [
    { name: "Environment Day", date: "Friday 5th" },
    { name: "Rosé Day", date: "Saturday 13th" },
    { name: "Sushi Day", date: "Thursday 18th" },
    { name: "Martini Day", date: "Friday 19th" },
  ]},
  { month: "July", ghfActivation: "Summer Sip & Spritz", events: [
    { name: "Tequila Day", date: "Friday 24th" },
  ]},
  { month: "August", ghfActivation: "Summer Sip & Spritz", events: [
    { name: "Spritz Day", date: "Saturday 1st" },
    { name: "Rum Day", date: "Sunday 16th" },
    { name: "Pinot Noir Day", date: "Tuesday 18th" },
  ]},
  { month: "September", ghfActivation: "Negroni Week", events: [
    { name: "Zero Waste Week", date: "Week 1" },
    { name: "Mexican Independence", date: "Wednesday 16th" },
    { name: "Harvest Festival" },
  ]},
  { month: "October", events: [
    { name: "World Sake Day", date: "Thursday 1st" },
    { name: "Buy British Day", date: "Saturday 3rd" },
    { name: "Vodka Day", date: "Sunday 4th" },
    { name: "Mezcal Day", date: "Wednesday 21st" },
  ]},
  { month: "November", events: [{ name: "Day of the Dead", date: "Monday 2nd" }] },
  { month: "December", ghfActivation: "Festive", events: [] },
];

export default function CalendarPage() {
  return (
    <div className="min-h-screen px-10 py-10" style={{ backgroundColor: "var(--background)" }}>
      <div className="flex gap-8 items-stretch">

        {/* Vertical 2026 numeral */}
        <div className="flex-shrink-0 flex items-end">
          <span
            className="font-light leading-none select-none"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "120px",
              color: "transparent",
              WebkitTextStroke: "1.5px var(--gold)",
              letterSpacing: "0.05em",
            }}
          >
            2026
          </span>
        </div>

        {/* 12-month grid: 4 cols x 3 rows */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {CALENDAR_2026.map((m) => (
            <div
              key={m.month}
              className="border rounded-lg p-4 flex flex-col"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", minHeight: "200px" }}
            >
              <h2 className="text-lg font-medium mb-2" style={{ color: "var(--foreground)" }}>
                {m.month}
              </h2>

              {m.ghfActivation && (
                <div
                  className="mb-3 px-2 py-1.5 rounded text-center"
                  style={{ backgroundColor: "rgba(201,168,76,0.18)", border: "1px solid var(--gold)" }}
                >
                  <p className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--gold)" }}>GHF Activation</p>
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: "var(--gold)" }}>{m.ghfActivation}</p>
                </div>
              )}

              <div className="space-y-2">
                {m.events.map((e, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold leading-tight" style={{ color: "var(--foreground)" }}>• {e.name}</p>
                    {e.date && (
                      <p className="text-[10px] tracking-[0.2em] uppercase pl-3" style={{ color: "var(--muted-foreground)" }}>{e.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-4xl font-light mt-8 tracking-tight" style={{ color: "var(--gold)" }}>
        Activation Calendar
      </h1>
      <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
        Key dates and GHF activations across 2026
      </p>
    </div>
  );
}
