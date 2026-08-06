"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, RefreshCcw, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  SUPPORT_SCENARIOS,
  DEFAULT_SUPPORT_CONFIG,
  fetchSupportConfig,
} from "@/lib/support-config";
import type { SupportTileSpec } from "@/lib/support-rules";
import { saveSupportConfig } from "@/lib/supabase/mutations/support-config";

const SAGE = "#8fb08f";

export default function AdminSupportRulesPage() {
  // scenario key -> tiles
  const [scenarios, setScenarios] = useState<Record<string, SupportTileSpec[]>>(
    DEFAULT_SUPPORT_CONFIG.scenarios
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let active = true;
    fetchSupportConfig().then((cfg) => {
      if (!active) return;
      // Merge so any scenario the admin hasn't touched keeps its built-in tiles.
      setScenarios({ ...DEFAULT_SUPPORT_CONFIG.scenarios, ...cfg.scenarios });
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const updateTile = (key: string, ti: number, patch: Partial<SupportTileSpec>) =>
    setScenarios((s) => ({
      ...s,
      [key]: (s[key] || []).map((t, j) => (j === ti ? { ...t, ...patch } : t)),
    }));

  const addTile = (key: string) =>
    setScenarios((s) => ({ ...s, [key]: [...(s[key] || []), { title: "" }] }));

  const deleteTile = (key: string, ti: number) =>
    setScenarios((s) => ({ ...s, [key]: (s[key] || []).filter((_, j) => j !== ti) }));

  const resetScenario = (key: string) =>
    setScenarios((s) => ({ ...s, [key]: DEFAULT_SUPPORT_CONFIG.scenarios[key] || [] }));

  const onSave = async () => {
    setSaving(true);
    setStatus("idle");
    setErrorMsg("");
    try {
      // Drop empty-titled tiles before saving.
      const cleaned: Record<string, SupportTileSpec[]> = {};
      for (const [key, tiles] of Object.entries(scenarios)) {
        cleaned[key] = tiles
          .filter((t) => t.title && t.title.trim() !== "")
          .map((t) => ({
            title: t.title.trim(),
            ...(t.badge && t.badge.trim() ? { badge: t.badge.trim() } : {}),
            ...(t.exclusivityGroup && t.exclusivityGroup.trim()
              ? { exclusivityGroup: t.exclusivityGroup.trim() }
              : {}),
          }));
      }
      await saveSupportConfig({ scenarios: cleaned });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const input =
    "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8fb08f] transition-colors";

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      <header className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4 px-8 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/brands" className="p-2 -ml-2 rounded-full hover:bg-white/5">
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
          <div>
            <h1 className="text-lg font-light tracking-wide">Support Packages</h1>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">
              Which products show for each SKU scenario
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
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 mt-8 space-y-5">
        <p className="text-sm text-white/50 leading-relaxed">
          Each card is a SKU scenario from the support calculator. Edit the product tiles shown for
          that scenario — the tile title must match a known support product to show its description.
          The <span className="text-white/80 font-medium">Badge</span> shows a small note (e.g.
          “*Volume Dependent”) and <span className="text-white/80 font-medium">Group</span> makes
          tiles mutually exclusive (an either/or choice). Changes go live after you Save.
        </p>

        {loading && <p className="text-white/40 text-sm">Loading current configuration…</p>}

        {SUPPORT_SCENARIOS.map((scenario) => {
          const tiles = scenarios[scenario.key] || [];
          return (
            <div
              key={scenario.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <div>
                  <h2 className="text-sm font-medium tracking-wide">{scenario.label}</h2>
                  {scenario.hint && (
                    <p className="text-[11px] text-white/40 mt-0.5 uppercase tracking-wider">
                      {scenario.hint}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => resetScenario(scenario.key)}
                    title="Reset to built-in default"
                    className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                  <button
                    onClick={() => addTile(scenario.key)}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tile
                  </button>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {tiles.length === 0 && (
                  <p className="px-5 py-4 text-xs text-white/30 italic">
                    No products — this scenario shows “No Support Available”.
                  </p>
                )}
                {tiles.map((tile, ti) => (
                  <div key={ti} className="flex flex-col md:flex-row md:items-center gap-2 px-5 py-3">
                    <input
                      value={tile.title}
                      onChange={(e) => updateTile(scenario.key, ti, { title: e.target.value })}
                      placeholder="Product title"
                      className={`${input} flex-1`}
                    />
                    <input
                      value={tile.badge || ""}
                      onChange={(e) => updateTile(scenario.key, ti, { badge: e.target.value })}
                      placeholder="Badge (optional)"
                      className={`${input} md:w-44`}
                    />
                    <input
                      value={tile.exclusivityGroup || ""}
                      onChange={(e) =>
                        updateTile(scenario.key, ti, { exclusivityGroup: e.target.value })
                      }
                      placeholder="Group (optional)"
                      className={`${input} md:w-36`}
                    />
                    <button
                      onClick={() => deleteTile(scenario.key, ti)}
                      className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer self-end md:self-auto"
                      aria-label="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
