"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { getSupportTiles, SupportResult, SupportInputs, SupportCategory, SUPPORT_TILE_DETAILS } from "@/lib/support-rules";
import { SupportTile } from "@/components/support/SupportTile";

const TABS = [
  { label: "Spirits Launch", slug: "launch-support" },
  { label: "Rotating Cocktail", slug: "rotating-cocktail" },
  { label: "Wine Bundle", slug: "wine-bundle" },
  { label: "Packaged Launch", slug: "packaged-launch" },
];

export default function SupportOptionDetailPage() {
  const router = useRouter();
  const { brandSlug, optionSlug } = useParams<{ brandSlug: string; optionSlug: string }>();
  const { brands } = useBrands();
  const brand = brands.find((b) => b.slug === brandSlug);

  const [returnTo, setReturnTo] = useState<{ url: string; label: string } | null>(null);

  // Form states
  const [spiritsSkus, setSpiritsSkus] = useState("");
  const [spiritsPositioning, setSpiritsPositioning] = useState("");

  const [rotatingSkus, setRotatingSkus] = useState("");

  const [wineBottleSkus, setWineBottleSkus] = useState("");
  const [wineGlassSkus, setWineGlassSkus] = useState("");

  const [packagedSkus, setPackagedSkus] = useState("");
  const [packagedPositioning, setPackagedPositioning] = useState("");

  const [showTiles, setShowTiles] = useState(false);
  const [supportResult, setSupportResult] = useState<SupportResult>({ tiles: [] });
  const [highlightedTiles, setHighlightedTiles] = useState<string[]>([]);

  // Sync session storage return path
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = sessionStorage.getItem("ghf_return_to");
      const label = sessionStorage.getItem("ghf_return_label") || "Back";
      if (url) {
        setReturnTo({ url, label });
      }
    }
  }, []);

  // Reset tiles shown when tab (optionSlug) changes
  useEffect(() => {
    setShowTiles(false);
    setHighlightedTiles([]);
  }, [optionSlug]);

  const handleBack = () => {
    if (returnTo) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("ghf_return_to");
        sessionStorage.removeItem("ghf_return_label");
      }
      router.push(returnTo.url);
    } else {
      router.back();
    }
  };

  // Input change interceptors to hide stale results
  const handleSpiritsSkusChange = (val: string) => {
    setSpiritsSkus(val);
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const handleSpiritsPositioningChange = (val: string) => {
    setSpiritsPositioning(val);
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const handleRotatingSkusChange = (val: string) => {
    setRotatingSkus(val);
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const handleWineBottleChange = (val: string) => {
    setWineBottleSkus(val);
    setWineGlassSkus(val);
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const handleWineGlassChange = (val: string) => {
    setWineBottleSkus(val);
    setWineGlassSkus(val);
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const handlePackagedSkusChange = (val: string) => {
    setPackagedSkus(val);
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const handlePackagedPositioningChange = (val: string) => {
    setPackagedPositioning(val);
    setShowTiles(false);
    setHighlightedTiles([]);
  };

  const isFormValid = () => {
    if (optionSlug === "launch-support") {
      return spiritsSkus !== "" && spiritsPositioning !== "";
    }
    if (optionSlug === "rotating-cocktail") {
      return rotatingSkus !== "";
    }
    if (optionSlug === "wine-bundle") {
      return wineBottleSkus !== "" && wineGlassSkus !== "";
    }
    if (optionSlug === "packaged-launch") {
      return packagedSkus !== "" && packagedPositioning !== "";
    }
    return false;
  };

  const handleCalculateSupport = () => {
    const inputs: SupportInputs = {
      category: optionSlug as SupportCategory,
    };

    if (optionSlug === "launch-support") {
      inputs.category = "spirits-launch";
      inputs.numberOfSkus = parseInt(spiritsSkus, 10);
      inputs.positioning = spiritsPositioning as any;
    } else if (optionSlug === "rotating-cocktail") {
      inputs.category = "rotating-cocktail";
      inputs.numberOfSkus = parseInt(rotatingSkus, 10);
    } else if (optionSlug === "wine-bundle") {
      inputs.category = "wine-bundle";
      inputs.skusByBottle = parseInt(wineBottleSkus, 10);
      inputs.skusByGlass = parseInt(wineGlassSkus, 10);
    } else if (optionSlug === "packaged-launch") {
      inputs.category = "packaged-launch";
      inputs.numberOfSkus = parseInt(packagedSkus, 10);
      inputs.positioning = packagedPositioning as any;
    }

    const result = getSupportTiles(inputs);
    setSupportResult(result);
    setHighlightedTiles([]);
    setShowTiles(true);
  };

  const handleTileClick = (title: string) => {
    const mode = supportResult.choiceMode || "all";
    if (mode === "pick-one") {
      if (highlightedTiles.includes(title)) {
        setHighlightedTiles([]);
      } else {
        setHighlightedTiles([title]);
      }
    } else {
      // Toggle highlight
      if (highlightedTiles.includes(title)) {
        setHighlightedTiles(highlightedTiles.filter((t) => t !== title));
      } else {
        setHighlightedTiles([...highlightedTiles, title]);
      }
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

  return (
    <div className="min-h-screen bg-[var(--background)] p-12 text-[var(--cream)] flex flex-col max-w-4xl mx-auto space-y-8">
      {/* Header Navigation */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)] cursor-pointer"
        >
          ← {returnTo ? returnTo.label : "Back to presentation"}
        </button>
        {brand && (
          <span className="text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
            {brand.name} Support
          </span>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-4 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => {
          const isActive = tab.slug === optionSlug;
          return (
            <button
              key={tab.slug}
              onClick={() => router.push(`/support/${brandSlug}/${tab.slug}`)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border cursor-pointer ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Controls Section */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-light tracking-wide text-[var(--foreground)] border-b border-[var(--border)] pb-3">
          Configure Support Criteria
        </h2>

        {/* Spirits Launch form */}
        {optionSlug === "launch-support" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                Number of SKUs
              </label>
              <select
                value={spiritsSkus}
                onChange={(e) => handleSpiritsSkusChange(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]"
              >
                <option value="">Select SKUs...</option>
                {skuOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} {opt === "1" ? "SKU" : "SKUs"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                Positioning
              </label>
              <select
                value={spiritsPositioning}
                onChange={(e) => handleSpiritsPositioningChange(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]"
              >
                <option value="">Select positioning...</option>
                <option value="back-bar">Back Bar</option>
                <option value="cocktail-1-month">Cocktail 1 Month</option>
                <option value="cocktail-3-month">Cocktail 3 Month</option>
                <option value="cocktail-12-month">Cocktail 12 Month</option>
              </select>
            </div>
          </div>
        )}

        {/* Rotating Cocktail form */}
        {optionSlug === "rotating-cocktail" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                Number of SKUs
              </label>
              <select
                value={rotatingSkus}
                onChange={(e) => handleRotatingSkusChange(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]"
              >
                <option value="">Select SKUs...</option>
                {skuOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} {opt === "1" ? "SKU" : "SKUs"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Wine Bundle form */}
        {optionSlug === "wine-bundle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                Number of SKUs By the Bottle
              </label>
              <select
                value={wineBottleSkus}
                onChange={(e) => handleWineBottleChange(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]"
              >
                <option value="">Select SKUs...</option>
                {wineSkuOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} SKUs
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                Number of SKUs By the Glass
              </label>
              <select
                value={wineGlassSkus}
                onChange={(e) => handleWineGlassChange(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]"
              >
                <option value="">Select SKUs...</option>
                {wineSkuOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} SKUs
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Packaged Launch form */}
        {optionSlug === "packaged-launch" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                Number of SKUs
              </label>
              <select
                value={packagedSkus}
                onChange={(e) => handlePackagedSkusChange(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]"
              >
                <option value="">Select SKUs...</option>
                {skuOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} {opt === "1" ? "SKU" : "SKUs"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                Positioning
              </label>
              <select
                value={packagedPositioning}
                onChange={(e) => handlePackagedPositioningChange(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 text-sm focus:border-[var(--sage)] outline-none text-[var(--foreground)]"
              >
                <option value="">Select positioning...</option>
                <option value="special-1-month">Special 1 Month</option>
              </select>
            </div>
          </div>
        )}

        {/* Submit Button */}
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

      {/* Dynamic Results Display */}
      {showTiles && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-xl space-y-6 animate-fade-in">
          
          {/* Main Message (e.g. No Support Available) */}
          {supportResult.message && (
            <p className="text-center text-lg font-light text-[var(--foreground)]">
              {supportResult.message}
            </p>
          )}

          {/* Tiles Grid */}
          {supportResult.tiles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportResult.tiles.map((tile) => {
                const isSelected = highlightedTiles.includes(tile.title);
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
            </div>
          )}

          {/* Constraints and Selection Instructions */}
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

      {/* Footer copyright */}
      <div className="text-center text-[9px] tracking-widest text-[var(--muted-foreground)] uppercase mt-12 border-t border-[var(--border)] pt-4">
        GHF Drinks Portfolio © 2026
      </div>
    </div>
  );
}
