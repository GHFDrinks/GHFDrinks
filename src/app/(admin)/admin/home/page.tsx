"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, ChevronUp, ChevronDown, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  DEFAULT_LANDING,
  TILE_TARGET_OPTIONS,
  fetchLandingConfig,
  type LandingSection,
  type LandingTile,
} from "@/lib/landing-config";
import { saveLandingConfig } from "@/lib/supabase/mutations/landing";

const SAGE = "#8fb08f";

function uid(prefix: string) {
  const rnd =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.floor(Math.random() * 1e9).toString(36);
  return `${prefix}-${rnd}`;
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export default function AdminHomeLayoutPage() {
  const [sections, setSections] = useState<LandingSection[]>(DEFAULT_LANDING.sections);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;
    fetchLandingConfig().then((cfg) => {
      if (!active) return;
      if (cfg?.sections?.length) setSections(cfg.sections);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  // Section operations
  const updateSection = (idx: number, patch: Partial<LandingSection>) =>
    setSections((s) => s.map((sec, i) => (i === idx ? { ...sec, ...patch } : sec)));
  const moveSection = (idx: number, dir: -1 | 1) => setSections((s) => move(s, idx, idx + dir));
  const deleteSection = (idx: number) => setSections((s) => s.filter((_, i) => i !== idx));
  const addSection = () =>
    setSections((s) => [...s, { id: uid("s"), label: "New Group", tiles: [] }]);

  // Tile operations
  const updateTile = (si: number, ti: number, patch: Partial<LandingTile>) =>
    setSections((s) =>
      s.map((sec, i) =>
        i === si
          ? { ...sec, tiles: sec.tiles.map((t, j) => (j === ti ? { ...t, ...patch } : t)) }
          : sec
      )
    );
  const moveTile = (si: number, ti: number, dir: -1 | 1) =>
    setSections((s) =>
      s.map((sec, i) => (i === si ? { ...sec, tiles: move(sec.tiles, ti, ti + dir) } : sec))
    );
  const deleteTile = (si: number, ti: number) =>
    setSections((s) =>
      s.map((sec, i) => (i === si ? { ...sec, tiles: sec.tiles.filter((_, j) => j !== ti) } : sec))
    );
  const addTile = (si: number) =>
    setSections((s) =>
      s.map((sec, i) =>
        i === si
          ? {
              ...sec,
              tiles: [...sec.tiles, { id: uid("t"), title: "New Tile", slug: TILE_TARGET_OPTIONS[0].slug }],
            }
          : sec
      )
    );

  const onSave = async () => {
    setSaving(true);
    setStatus("idle");
    setErrorMsg("");
    try {
      await saveLandingConfig({ sections });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const iconBtn =
    "p-1 rounded text-white/40 enabled:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer";
  const input =
    "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8fb08f] transition-colors";

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      {/* Sticky header */}
      <header className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4 px-8 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/brands" className="p-2 -ml-2 rounded-full hover:bg-white/5">
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-lg font-light tracking-wide">Home Layout</h1>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">
              Manage the front-page groups &amp; tiles
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {status === "saved" && (
            <span className="flex items-center gap-1.5 text-xs" style={{ color: SAGE }}>
              <CheckCircle2 className="w-4 h-4" /> Saved — live on the site
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1.5 text-xs text-red-400 max-w-xs truncate">
              <AlertTriangle className="w-4 h-4 shrink-0" /> {errorMsg}
            </span>
          )}
          <button
            onClick={onSave}
            disabled={saving}
            className="h-11 px-6 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 transition-all hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: SAGE, color: "#0a1410" }}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save Layout"}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 mt-8 space-y-5">
        <p className="text-sm text-white/50 leading-relaxed">
          These are the groups of tiles shown on the home page. Reorder groups and tiles with the
          arrows, rename a group, and add or remove tiles. Each tile opens a presentation. Changes go
          live after you press <span className="text-white/80 font-medium">Save Layout</span>.
        </p>

        {loading && <p className="text-white/40 text-sm">Loading current layout…</p>}

        {sections.map((section, si) => (
          <div
            key={section.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            {/* Group header row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex flex-col">
                <button
                  className={iconBtn}
                  onClick={() => moveSection(si, -1)}
                  disabled={si === 0}
                  aria-label="Move group up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  className={iconBtn}
                  onClick={() => moveSection(si, 1)}
                  disabled={si === sections.length - 1}
                  aria-label="Move group down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <input
                value={section.label}
                onChange={(e) => updateSection(si, { label: e.target.value })}
                placeholder="Group name"
                className={`${input} flex-1 font-medium`}
              />
              <button
                onClick={() => addTile(si)}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Tile
              </button>
              <button
                onClick={() => deleteSection(si)}
                className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                aria-label="Delete group"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Tiles */}
            <div className="divide-y divide-white/5">
              {section.tiles.length === 0 && (
                <p className="px-5 py-4 text-xs text-white/30 italic">
                  No tiles yet — use “+ Tile” to add one.
                </p>
              )}
              {section.tiles.map((tile, ti) => (
                <div key={tile.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex flex-col">
                    <button
                      className={iconBtn}
                      onClick={() => moveTile(si, ti, -1)}
                      disabled={ti === 0}
                      aria-label="Move tile up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className={iconBtn}
                      onClick={() => moveTile(si, ti, 1)}
                      disabled={ti === section.tiles.length - 1}
                      aria-label="Move tile down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    value={tile.title}
                    onChange={(e) => updateTile(si, ti, { title: e.target.value })}
                    placeholder="Tile label"
                    className={`${input} flex-1`}
                  />
                  <select
                    value={tile.slug}
                    onChange={(e) => updateTile(si, ti, { slug: e.target.value })}
                    className={`${input} w-56`}
                  >
                    {TILE_TARGET_OPTIONS.map((opt) => (
                      <option key={opt.slug} value={opt.slug} className="bg-[#111] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteTile(si, ti)}
                    className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    aria-label="Delete tile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={addSection}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-dashed border-white/15 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Group
        </button>
      </div>
    </div>
  );
}
