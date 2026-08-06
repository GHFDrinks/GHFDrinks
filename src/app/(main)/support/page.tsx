"use client";

import React, { useState, useEffect } from "react";
import {
  getSupportTilesWithLocked,
  SupportResult,
  SupportInputs,
  SupportTileSpec,
  SUPPORT_TILE_DETAILS,
} from "@/lib/support-rules";
import { fetchSupportConfig, DEFAULT_SUPPORT_CONFIG, type SupportConfig } from "@/lib/support-config";
import { SupportTile } from "@/components/support/SupportTile";

const TABS = [
  { label: "Spirits Launch", slug: "launch-support" },
  { label: "Rotating Cocktail", slug: "rotating-cocktail" },
  { label: "Wine Bundle", slug: "wine-bundle" },
  { label: "Packaged Launch", slug: "packaged-launch" },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("launch-support");

  const [spiritsSkus, setSpiritsSkus] = useState("");
  const [spiritsPositioning, setSpiritsPositioning] = useState("");
  const [rotatingSkus, setRotatingSkus] = useState("");
  const [wineBottleSkus, setWineBottleSkus] = useState("");
  const [wineGlassSkus, setWineGlassSkus] = useState("");
  const [packagedSkus, setPackagedSkus] = useState("");
  const [packagedPositioning, setPackagedPositioning] = useState("");

  const [showTiles, setShowTiles] = useState(false);
  const [supportResult, setSupportResult] = useState<SupportResult>({ tiles: [] });
  const [lockedTiles, setLockedTiles] = useState<SupportTileSpec[]>([]);
  const [highlightedTiles, setHighlightedTiles] = useState<string[]>([]);
  const [supportConfig, setSupportConfig] = useState<SupportConfig>(DEFAULT_SUPPORT_CONFIG);

  // Admin-managed support tiles per SKU scenario (falls back to defaults).
  useEffect(() => {
    let active = true;
    fetchSupportConfig().then((c) => active && setSupportConfig(c));
    return () => {
      active = false;
    };
  }, []);

  const resetResults = () => {
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const changeTab = (slug: string) => {
    setActiveTab(slug);
    resetResults();
  };

  const isFormValid = () => {
    if (activeTab === "launch-support") return spiritsSkus !== "" && spiritsPositioning !== "";
    if (activeTab === "rotating-cocktail") return rotatingSkus !== "";
    if (activeTab === "wine-bundle") return wineBottleSkus !== "" && wineGlassSkus !== "";
    if (activeTab === "packaged-launch") return packagedSkus !== "" && packagedPositioning !== "";
    return false;
  };

  const handleCalculateSupport = () => {
    let inputs: SupportInputs = { category: "spirits-launch" };
    if (activeTab === "launch-support") {
      inputs = { category: "spirits-launch", numberOfSkus: parseInt(spiritsSkus, 10), positioning: spiritsPositioning as SupportInputs["positioning"] };
    } else if (activeTab === "rotating-cocktail") {
      inputs = { category: "rotating-cocktail", numberOfSkus: parseInt(rotatingSkus, 10) };
    } else if (activeTab === "wine-bundle") {
      inputs = { category: "wine-bundle", skusByBottle: parseInt(wineBottleSkus, 10), skusByGlass: parseInt(wineGlassSkus, 10) };
    } else if (activeTab === "packaged-launch") {
      inputs = { category: "packaged-launch", numberOfSkus: parseInt(packagedSkus, 10), positioning: packagedPositioning as SupportInputs["positioning"] };
    }
    const result = getSupportTilesWithLocked(inputs, supportConfig);
    setSupportResult(result);
    setLockedTiles(result.lockedTiles);
    setHighlightedTiles([]);
    setShowTiles(true);
  };

  const handleTileClick = (title: string) => {
    const mode = supportResult.choiceMode || "all";
    if (mode === "pick-one") {
      setHighlightedTiles(highlightedTiles.includes(title) ? [] : [title]);
    } else {
      setHighlightedTiles(
        highlightedTiles.includes(title)
          ? highlightedTiles.filter((t) => t !== title)
          : [...highlightedTiles, title]
      );
    }
  };

  // Groups that currently have a selected tile — used to grey out the remaining
  // (now unavailable) options in the same either/or group.
  const selectedGroups = new Set(
    supportResult.tiles
      .filter((t) => highlightedTiles.includes(t.title) && t.exclusivityGroup)
      .map((t) => t.exclusivityGroup)
  );

  const skuOptions = Array.from({ length: 10 }, (_, i) => String(i + 1));
  const wineSkuOptions = ["2", "3", "4"];

  const selectClass =
    "w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]";
  const labelClass = "text-xs font-bold uppercase tracking-wider text-[var(--sage)]";

  return (
    <div className="min-h-screen bg-[var(--background)] p-12 flex flex-col max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--border)] pb-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
          GHF Support
        </span>
        <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
          Configure Support
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-4 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => changeTab(tab.slug)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border cursor-pointer whitespace-nowrap ${
              tab.slug === activeTab
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-light tracking-wide text-[var(--foreground)] border-b border-[var(--border)] pb-3">
          Configure Support Criteria
        </h2>

        {activeTab === "launch-support" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Number of SKUs</label>
              <select value={spiritsSkus} onChange={(e) => { setSpiritsSkus(e.target.value); resetResults(); }} className={selectClass}>
                <option value="">Select SKUs...</option>
                {skuOptions.map((o) => (<option key={o} value={o}>{o} {o === "1" ? "SKU" : "SKUs"}</option>))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Positioning</label>
              <select value={spiritsPositioning} onChange={(e) => { setSpiritsPositioning(e.target.value); resetResults(); }} className={selectClass}>
                <option value="">Select positioning...</option>
                <option value="back-bar">Back Bar</option>
                <option value="cocktail-1-month">Cocktail 1 Month</option>
                <option value="cocktail-3-month">Cocktail 3 Month</option>
                <option value="cocktail-12-month">Cocktail 12 Month</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "rotating-cocktail" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Number of SKUs</label>
              <select value={rotatingSkus} onChange={(e) => { setRotatingSkus(e.target.value); resetResults(); }} className={selectClass}>
                <option value="">Select SKUs...</option>
                {skuOptions.map((o) => (<option key={o} value={o}>{o} {o === "1" ? "SKU" : "SKUs"}</option>))}
              </select>
            </div>
          </div>
        )}

        {activeTab === "wine-bundle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Number of SKUs By the Bottle</label>
              <select value={wineBottleSkus} onChange={(e) => { setWineBottleSkus(e.target.value); setWineGlassSkus(e.target.value); resetResults(); }} className={selectClass}>
                <option value="">Select SKUs...</option>
                {wineSkuOptions.map((o) => (<option key={o} value={o}>{o} SKUs</option>))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Number of SKUs By the Glass</label>
              <select value={wineGlassSkus} onChange={(e) => { setWineBottleSkus(e.target.value); setWineGlassSkus(e.target.value); resetResults(); }} className={selectClass}>
                <option value="">Select SKUs...</option>
                {wineSkuOptions.map((o) => (<option key={o} value={o}>{o} SKUs</option>))}
              </select>
            </div>
          </div>
        )}

        {activeTab === "packaged-launch" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Number of SKUs</label>
              <select value={packagedSkus} onChange={(e) => { setPackagedSkus(e.target.value); resetResults(); }} className={selectClass}>
                <option value="">Select SKUs...</option>
                {skuOptions.map((o) => (<option key={o} value={o}>{o} {o === "1" ? "SKU" : "SKUs"}</option>))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Positioning</label>
              <select value={packagedPositioning} onChange={(e) => { setPackagedPositioning(e.target.value); resetResults(); }} className={selectClass}>
                <option value="">Select positioning...</option>
                <option value="special-1-month">Special 1 Month</option>
              </select>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleCalculateSupport}
            disabled={!isFormValid()}
            className="px-6 py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              backgroundColor: isFormValid() ? "var(--foreground)" : "var(--muted)",
              color: isFormValid() ? "var(--background)" : "var(--muted-foreground)",
            }}
          >
            Show Support Available
          </button>
        </div>
      </div>

      {/* Results */}
      {showTiles && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-xl space-y-6 animate-fade-in">
          {supportResult.message && (
            <p className="text-center text-lg font-light text-[var(--foreground)]">
              {supportResult.message}
            </p>
          )}

          {(supportResult.tiles.length > 0 || lockedTiles.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportResult.tiles.map((tile) => {
                const isSelected = highlightedTiles.includes(tile.title);
                // Grey out same-group options once one in the group is chosen.
                const isGreyed =
                  !!tile.exclusivityGroup && !isSelected && selectedGroups.has(tile.exclusivityGroup);
                return (
                  <div
                    key={tile.title}
                    onClick={() => handleTileClick(tile.title)}
                    className={`cursor-pointer rounded-lg transition-all ${
                      isSelected ? "ring-2 ring-[var(--sage)] scale-[1.02]" : ""
                    } ${isGreyed ? "opacity-40 grayscale" : ""}`}
                  >
                    <SupportTile
                      title={tile.title}
                      description={SUPPORT_TILE_DETAILS[tile.title]}
                      badge={tile.badge}
                    />
                  </div>
                );
              })}

              {/* Locked options — unlocked by choosing a higher SKU count. Shown
                  greyed and non-interactive so the user can see what more SKUs get. */}
              {lockedTiles.map((tile) => (
                <div
                  key={`locked-${tile.title}`}
                  title="Available with a higher number of SKUs"
                  className="relative rounded-lg opacity-40 grayscale pointer-events-none select-none"
                >
                  <SupportTile
                    title={tile.title}
                    description={SUPPORT_TILE_DETAILS[tile.title]}
                    badge={tile.badge}
                  />
                  <span className="absolute top-2 right-2 z-10 text-[8px] font-bold tracking-wider uppercase bg-[var(--foreground)] text-[var(--background)] px-2 py-0.5 rounded-full">
                    More SKUs
                  </span>
                </div>
              ))}
            </div>
          )}

          {supportResult.constraints && supportResult.constraints.length > 0 && (
            <div className="pt-4 border-t border-[var(--border)]/40 space-y-2">
              <span className="text-[10px] tracking-wider uppercase text-[var(--sage)] font-bold block">
                Required Terms & Selection Guidelines
              </span>
              <ul className="list-disc pl-5 space-y-1">
                {supportResult.constraints.map((c, idx) => (
                  <li key={idx} className="text-xs italic text-[var(--sage)] leading-relaxed">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="text-center text-[9px] tracking-widest text-[var(--muted-foreground)] uppercase mt-12 border-t border-[var(--border)] pt-4">
        GHF Drinks Portfolio © 2026
      </div>
    </div>
  );
}
