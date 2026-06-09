"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { usePresentation } from "@/lib/presentation-store";
import { Presentation } from "@/types/presentation";

export default function NewPresentationPage() {
  const { brands } = useBrands();
  const { savePresentation } = usePresentation();
  const router = useRouter();

  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function toggle(brandId: string) {
    setSelected((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  }

  function moveUp(brandId: string) {
    setSelected((prev) => {
      const idx = prev.indexOf(brandId);
      if (idx <= 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }

  function moveDown(brandId: string) {
    setSelected((prev) => {
      const idx = prev.indexOf(brandId);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }

  async function handleSave() {
    if (!name.trim() || selected.length === 0) return;
    setSaving(true);
    const presentation: Presentation = {
      id: crypto.randomUUID(),
      name: name.trim(),
      dateCreated: new Date().toISOString(),
      brands: selected,
      slides: selected.flatMap((brandId) => [
        { id: crypto.randomUUID(), brandId, type: "intro" as const },
        { id: crypto.randomUUID(), brandId, type: "activation" as const },
      ]),
    };
    await savePresentation(presentation);
    router.push("/presentations");
  }

  const categories = ["Spirits", "Wines", "Beer, Cider & Mixer"];

  const selectedBrands = selected
    .map((id) => brands.find((b) => b.id === id))
    .filter(Boolean) as typeof brands;

  return (
    <div className="flex min-h-screen bg-[var(--background)]">

      {/* LEFT — brand picker */}
      <div className="flex-1 p-10 border-r border-[var(--border)] overflow-y-auto">
        <h1
          className="text-3xl font-light mb-1 tracking-tight"
          style={{ color: "var(--accent)" }}
        >
          Build Bespoke Presentation
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--muted-foreground)" }}
        >
          Select the brands you want to present, in the order you want them.
        </p>

        {/* Presentation name */}
        <div className="mb-8">
          <label
            className="text-xs tracking-widest uppercase block mb-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            Presentation Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. The Devonshire — July 2026"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500 transition-colors"
          />
        </div>

        {/* Brand selection by category */}
        {categories.map((cat) => {
          const catBrands = brands.filter((b) => b.category === cat);
          if (catBrands.length === 0) return null;
          return (
            <div key={cat} className="mb-8">
              <p
                className="text-xs tracking-widest uppercase font-semibold mb-3"
                style={{ color: "var(--muted-foreground)" }}
              >
                {cat}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {catBrands.map((b) => {
                  const isSelected = selected.includes(b.id);
                  const position = selected.indexOf(b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggle(b.id)}
                      className="relative border rounded-xl p-3 text-left transition-all"
                      style={{
                        borderColor: isSelected
                          ? "var(--accent)"
                          : "var(--border)",
                        backgroundColor: isSelected
                          ? "var(--muted)"
                          : "white",
                      }}
                    >
                      {/* Position number badge */}
                      {isSelected && (
                        <div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: "var(--accent)" }}
                        >
                          {position + 1}
                        </div>
                      )}
                      <p
                        className="text-sm font-medium leading-tight"
                        style={{
                          color: isSelected
                            ? "var(--accent)"
                            : "var(--foreground)",
                        }}
                      >
                        {b.name}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {b.variants.length} SKUs
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT — selected order + save */}
      <div
        className="w-72 flex-shrink-0 flex flex-col p-6 border-l border-[var(--border)]"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <h2
          className="text-xs tracking-widest uppercase font-semibold mb-4"
          style={{ color: "var(--accent)" }}
        >
          Presentation Order
        </h2>

        {selected.length === 0 ? (
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            No brands selected yet. Pick brands from the left to build your
            presentation.
          </p>
        ) : (
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {selectedBrands.map((b, idx) => (
              <div
                key={b.id}
                className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2"
              >
                {/* Index */}
                <span
                  className="text-xs font-bold w-4 flex-shrink-0"
                  style={{ color: "var(--accent)" }}
                >
                  {idx + 1}
                </span>

                {/* Brand name */}
                <span className="text-xs flex-1 leading-tight font-medium truncate">
                  {b.name}
                </span>

                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveUp(b.id)}
                    disabled={idx === 0}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]/80 disabled:opacity-20 text-xs leading-none"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveDown(b.id)}
                    disabled={idx === selectedBrands.length - 1}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]/80 disabled:opacity-20 text-xs leading-none"
                  >
                    ▼
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => toggle(b.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Save button */}
        <div className="mt-6 flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={handleSave}
            disabled={saving || !name.trim() || selected.length === 0}
            className="w-full py-2.5 text-sm font-medium rounded-lg text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {saving
              ? "Saving..."
              : `Save Presentation (${selected.length} brand${selected.length !== 1 ? "s" : ""})`}
          </button>
          <button
            onClick={() => router.push("/presentations")}
            className="w-full py-2 text-xs text-center transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}