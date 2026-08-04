"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { mockBrands } from "@/data/brands";
import { Brand } from "@/types/brand";
import { getBrands } from "@/lib/supabase/queries/brands";
import { saveBrand } from "@/lib/supabase/mutations/brands";
import { ASSIGNABLE_PACKAGE_GROUPS } from "@/data/package-presentations";
import { uploadImage } from "../../_lib/image-upload";
import { DARK_ADMIN_ACCENT } from "@/lib/admin-theme";

export default function BrandEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("core");

  // Tabs for marketing lists
  const [haloTab, setHaloTab] = useState<"prestige" | "independent" | "national-group">("prestige");
  const [caseStudyTab, setCaseStudyTab] = useState<"prestige" | "independent" | "national-group">("prestige");

  useEffect(() => {
    params.then(async (p) => {
      setResolvedParams(p);
      if (p.id !== "new") {
        const allBrands = await getBrands();
        const found = allBrands.find((b) => b.id === p.id);
        if (found) {
          // Hydrate additional brand properties if not present
          setBrand({
            ...found,
            packages: found.packages || [],
            bcorp: found.bcorp || false,
            videoUrl: (found as any).videoUrl || "",
            brandInsights: (found as any).brandInsights?.length === 3 
              ? (found as any).brandInsights 
              : [
                  { headline: "", caption: "", detail: "", image: "" },
                  { headline: "", caption: "", detail: "", image: "" },
                  { headline: "", caption: "", detail: "", image: "" }
                ],
            promotions: (found as any).promotions || [],
            haloOutlets: (found as any).haloOutlets || [],
            caseStudies: (found as any).caseStudies || [],
            posLibrary: (found as any).posLibrary || [],
            servesData: (found as any).servesData || [],
            variants: found.variants.map((v: any) => ({
              ...v,
              taste_profile_radar: v.taste_profile_radar || {
                Sweet: 0, Fruity: 0, Fresh: 0, Savoury: 0, Herbal: 0, Spicy: 0, Floral: 0
              },
              product_features: v.product_features?.length ? v.product_features : [
                { title: "", description: "" },
                { title: "", description: "" },
                { title: "", description: "" }
              ],
              carousel_images: v.carousel_images || ["", "", ""]
            }))
          });
        }
      } else {
        setBrand({
          id: "new",
          slug: "",
          name: "",
          category: "Spirits",
          packages: [],
          tagline: "",
          heroImage: { url: "", alt: "" },
          lifestyleImages: [],
          venueBadges: [],
          promotionActive: false,
          bcorp: false,
          videoUrl: "",
          brandInsights: [
            { headline: "", caption: "", detail: "", image: "" },
            { headline: "", caption: "", detail: "", image: "" },
            { headline: "", caption: "", detail: "", image: "" }
          ],
          promotions: [],
          haloOutlets: [],
          caseStudies: [],
          posLibrary: [],
          servesData: [],
          story: { headline: "", content: [], image: { url: "", alt: "" } },
          variants: []
        });
      }
      setLoading(false);
    });
  }, [params]);

  const lastVariantRef = useRef<HTMLDivElement>(null);
  const scrollToNewVariant = useRef(false);

  // After "Add Variant" appends a variant, scroll the new (bottom) card into view.
  useEffect(() => {
    if (scrollToNewVariant.current) {
      scrollToNewVariant.current = false;
      lastVariantRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [brand?.variants?.length]);

  if (loading || !brand) return <div className="p-12 text-white/50 bg-[#050505] min-h-screen">Loading brand editor...</div>;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveBrand(brand);
      router.push("/admin/brands");
    } catch (e: any) {
      console.error("Failed to save brand:", e);
      alert("Failed to save brand: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file: File, type: string, index: number = 0, variantId?: string) => {
    try {
      const url = await uploadImage(file, brand.slug || "new", type, index);
      if (variantId) {
        setBrand((prev: any) => ({
          ...prev,
          variants: prev.variants.map((v: any) => {
            if (v.id === variantId) {
              if (type === "variant-carousel") {
                const updatedCarousels = [...(v.carousel_images || ["", "", ""])];
                updatedCarousels[index] = url;
                return { ...v, carousel_images: updatedCarousels };
              }
              return { ...v, image: { ...v.image, url } };
            }
            return v;
          })
        }));
      } else if (type === "hero") {
        setBrand((prev: any) => ({ ...prev, heroImage: { ...prev.heroImage, url } }));
      } else if (type === "insight") {
        setBrand((prev: any) => {
          const insights = [...prev.brandInsights];
          insights[index] = { ...insights[index], image: url };
          return { ...prev, brandInsights: insights };
        });
      } else if (type === "promotion") {
        setBrand((prev: any) => {
          const promos = [...prev.promotions];
          promos[index] = { ...promos[index], image: url };
          return { ...prev, promotions: promos };
        });
      } else if (type === "halo") {
        setBrand((prev: any) => {
          const halos = [...prev.haloOutlets];
          halos[index] = { ...halos[index], outletImage: url };
          return { ...prev, haloOutlets: halos };
        });
      } else if (type === "halo-logo") {
        setBrand((prev: any) => {
          const halos = [...prev.haloOutlets];
          halos[index] = { ...halos[index], outletLogo: url };
          return { ...prev, haloOutlets: halos };
        });
      } else if (type === "case-study") {
        setBrand((prev: any) => {
          const cases = [...prev.caseStudies];
          cases[index] = { ...cases[index], image: url };
          return { ...prev, caseStudies: cases };
        });
      } else if (type === "pos") {
        setBrand((prev: any) => {
          const pos = [...prev.posLibrary];
          pos[index] = { ...pos[index], image: url };
          return { ...prev, posLibrary: pos };
        });
      } else if (type.startsWith("serve-")) {
        // e.g. serve-springSummer-0
        const parts = type.split("-");
        const season = parts[1];
        const sIndex = parseInt(parts[2], 10);
        setBrand((prev: any) => {
          const servesData = [...prev.servesData];
          if (servesData[index]) {
            const list = [...(servesData[index][season] || [])];
            if (list[sIndex]) {
              list[sIndex] = { ...list[sIndex], image: url };
            }
            servesData[index] = { ...servesData[index], [season]: list };
          }
          return { ...prev, servesData };
        });
      }
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    }
  };

  const addVariant = () => {
    const newId = `new-v-${Date.now()}`;
    scrollToNewVariant.current = true;
    setBrand((prev: any) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: newId,
          name: "",
          description: "",
          abv: "",
          volume: "",
          image: { url: "", alt: "" },
          taste_profile_radar: { Sweet: 0, Fruity: 0, Fresh: 0, Savoury: 0, Herbal: 0, Spicy: 0, Floral: 0 },
          product_features: [{ title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }],
          carousel_images: ["", "", ""]
        }
      ],
      // If Spirits, initialize serves for the new variant
      servesData: prev.category === "Spirits" ? [
        ...prev.servesData,
        {
          variantSlug: newId,
          variantDisplayName: "",
          springSummer: [
            { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
            { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
            { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" }
          ],
          autumnWinter: [
            { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
            { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
            { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" }
          ]
        }
      ] : prev.servesData
    }));
  };

  const removeVariant = (vid: string) => {
    setBrand((prev: any) => ({
      ...prev,
      variants: prev.variants.filter((v: any) => v.id !== vid),
      servesData: prev.servesData.filter((s: any) => s.variantSlug !== vid)
    }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24" style={DARK_ADMIN_ACCENT}>
      {/* Sticky Header */}
      <header className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4 px-8 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/brands">
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-light">{brand.id === "new" ? "Create Brand" : `Edit ${brand.name}`}</h1>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">Admin Back-office Control</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="h-11 px-6 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 flex items-center space-x-2 disabled:opacity-50 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Brand"}</span>
        </button>
      </header>

      {/* Tabs Row */}
      <div className="flex border-b border-white/5 bg-[#0a0a0a] px-8">
        {[
          { id: "core", label: "Core Identity" },
          { id: "variants", label: "Variants & Tasting" },
          { id: "insights", label: "Brand Insights" },
          { id: "serves", label: "Serves (Spirits)" },
          { id: "marketing", label: "Marketing Lists" }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`py-4 px-6 text-sm font-medium border-b-2 transition-all ${
              activeTab === t.id ? "border-accent text-accent" : "border-transparent text-white/40 hover:text-white/75"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-8 space-y-8">
        {/* Core Tab */}
        {activeTab === "core" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-light tracking-wide text-accent border-b border-white/5 pb-2">Details</h3>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Brand Name</label>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                    placeholder="e.g. Sapling"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Slug</label>
                  <input
                    type="text"
                    value={brand.slug}
                    onChange={(e) => setBrand({ ...brand, slug: e.target.value.toLowerCase().replace(/ /g, "-") })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                    placeholder="e.g. sapling"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Category</label>
                  <select
                    value={brand.category}
                    onChange={(e) => setBrand({ ...brand, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                  >
                    <option value="Spirits">Spirits</option>
                    <option value="Wines">Wines</option>
                    <option value="Packaged">Packaged</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Tagline</label>
                  <input
                    type="text"
                    value={brand.tagline}
                    onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                    placeholder="Climate Positive Spirits"
                  />
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="bcorp"
                    checked={brand.bcorp}
                    onChange={(e) => setBrand({ ...brand, bcorp: e.target.checked })}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <label htmlFor="bcorp" className="text-sm font-medium text-white/80">Certified B Corp</label>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="promoActive"
                    checked={brand.promotionActive}
                    onChange={(e) => setBrand({ ...brand, promotionActive: e.target.checked })}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <label htmlFor="promoActive" className="text-sm font-medium text-white/80">Active Promotion</label>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-light tracking-wide text-accent border-b border-white/5 pb-2">Media & Video</h3>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Hero Image</label>
                  {brand.heroImage?.url && (
                    <img src={brand.heroImage.url} className="h-32 w-full object-cover rounded-lg border border-white/10" alt="" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "hero")}
                    className="w-full text-xs text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Brand Video URL (MP4 CDN / Blob)</label>
                  <input
                    type="text"
                    value={brand.videoUrl}
                    onChange={(e) => setBrand({ ...brand, videoUrl: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                    placeholder="https://cdn.example.com/sapling.mp4"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Story Title</label>
                  <input
                    type="text"
                    value={brand.story?.title}
                    onChange={(e) => setBrand({ ...brand, story: { ...brand.story, title: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Story Description</label>
                  <textarea
                    rows={3}
                    value={brand.story?.description}
                    onChange={(e) => setBrand({ ...brand, story: { ...brand.story, description: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Package Membership */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-lg font-light tracking-wide text-accent">Package Membership</h3>
                <p className="text-[11px] text-white/40 mt-1">
                  Which Occasion / Culture / Product tiles this brand appears in (home page + presentations).
                  Category — Spirits / Wines / Packaged — follows the brand&apos;s Category above automatically.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ASSIGNABLE_PACKAGE_GROUPS.map((grp) => (
                  <div key={grp.group} className="space-y-2">
                    <h4 className="text-xs uppercase tracking-widest text-white/50 font-medium">{grp.group}</h4>
                    {grp.options.map((opt) => {
                      const checked = (brand.packages || []).includes(opt.slug);
                      return (
                        <label key={opt.slug} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              const cur: string[] = brand.packages || [];
                              const next = e.target.checked
                                ? [...cur, opt.slug]
                                : cur.filter((s: string) => s !== opt.slug);
                              setBrand({ ...brand, packages: next });
                            }}
                            className="w-4 h-4 accent-accent rounded"
                          />
                          <span className="text-sm text-white/80">{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Variants Tab */}
        {activeTab === "variants" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-light text-accent">Brand Variants</h3>
              <button
                onClick={addVariant}
                className="h-10 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Variant</span>
              </button>
            </div>

            {brand.variants.map((v: any, vIdx: number) => (
              <div
                key={v.id}
                ref={vIdx === brand.variants.length - 1 ? lastVariantRef : null}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 relative scroll-mt-24"
              >
                <button
                  onClick={() => removeVariant(v.id)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Variant info */}
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="text-lg font-light text-white/90">Variant #{vIdx + 1} Details</h4>
                    <div className="space-y-3">
                      <label className="block text-xs uppercase text-white/45">Name</label>
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => {
                          const updated = [...brand.variants];
                          updated[vIdx] = { ...v, name: e.target.value };
                          setBrand({ ...brand, variants: updated });
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-xs uppercase text-white/45">ABV</label>
                        <input
                          type="text"
                          value={v.abv}
                          onChange={(e) => {
                            const updated = [...brand.variants];
                            updated[vIdx] = { ...v, abv: e.target.value };
                            setBrand({ ...brand, variants: updated });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-xs uppercase text-white/45">Volume</label>
                        <input
                          type="text"
                          value={v.volume}
                          onChange={(e) => {
                            const updated = [...brand.variants];
                            updated[vIdx] = { ...v, volume: e.target.value };
                            setBrand({ ...brand, variants: updated });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs uppercase text-white/45">Bottle Shot Image</label>
                      {v.image?.url && (
                        <img src={v.image.url} className="h-20 object-contain rounded border border-white/10" alt="" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "variant", 0, v.id)}
                        className="w-full text-xs text-white/40 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/10 file:text-white"
                      />
                    </div>
                  </div>

                  {/* Taste Profile Sliders */}
                  <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-medium">Tasting Profile Radar (0-5)</h4>
                    {["Sweet", "Fruity", "Fresh", "Savoury", "Herbal", "Spicy", "Floral"].map((flavor) => (
                      <div key={flavor} className="space-y-1">
                        <div className="flex justify-between text-xs text-white/70">
                          <span>{flavor}</span>
                          <span className="font-semibold">{v.taste_profile_radar?.[flavor] || 0}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.5"
                          value={v.taste_profile_radar?.[flavor] || 0}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            const updated = [...brand.variants];
                            updated[vIdx] = {
                              ...v,
                              taste_profile_radar: {
                                ...(v.taste_profile_radar || {}),
                                [flavor]: val
                              }
                            };
                            setBrand({ ...brand, variants: updated });
                          }}
                          className="w-full accent-accent h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Product Features & Carousel */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-medium">Product Features (3)</h4>
                    {[0, 1, 2].map((fIdx) => (
                      <div key={fIdx} className="space-y-2 p-2 border border-white/5 rounded-lg bg-black/15">
                        <input
                          type="text"
                          placeholder="Feature Title"
                          value={v.product_features?.[fIdx]?.title || ""}
                          onChange={(e) => {
                            const features = [...(v.product_features || [{ title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }])];
                            features[fIdx] = { ...features[fIdx], title: e.target.value };
                            const updated = [...brand.variants];
                            updated[vIdx] = { ...v, product_features: features };
                            setBrand({ ...brand, variants: updated });
                          }}
                          className="w-full bg-black/40 border border-white/5 rounded px-2 py-1 text-xs text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Feature Description"
                          value={v.product_features?.[fIdx]?.description || ""}
                          onChange={(e) => {
                            const features = [...(v.product_features || [{ title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }])];
                            features[fIdx] = { ...features[fIdx], description: e.target.value };
                            const updated = [...brand.variants];
                            updated[vIdx] = { ...v, product_features: features };
                            setBrand({ ...brand, variants: updated });
                          }}
                          className="w-full bg-black/40 border border-white/5 rounded px-2 py-1 text-xs text-white/70 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Images upload */}
                <div className="border-t border-white/5 pt-4 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-white/50">Carousel Images (Up to 3)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map((imgIdx) => (
                      <div key={imgIdx} className="space-y-2 bg-black/25 p-3 rounded-lg border border-white/5">
                        {v.carousel_images?.[imgIdx] && (
                          <img src={v.carousel_images[imgIdx]} className="h-16 w-full object-cover rounded border border-white/10" alt="" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "variant-carousel", imgIdx, v.id)}
                          className="w-full text-[10px] text-white/30 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/10 file:text-[10px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <div className="space-y-6">
            <h3 className="text-xl font-light text-accent">Brand Insights (Exactly 3 Stats)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((idx) => {
                const stat = brand.brandInsights[idx] || { headline: "", caption: "", detail: "", image: "" };
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-medium uppercase tracking-wider text-accent border-b border-white/5 pb-2">Stat #{idx + 1}</h4>
                    <div className="space-y-3">
                      <label className="block text-xs uppercase text-white/45">Headline (e.g. 42%)</label>
                      <input
                        type="text"
                        value={stat.headline}
                        onChange={(e) => {
                          const insights = [...brand.brandInsights];
                          insights[idx] = { ...stat, headline: e.target.value };
                          setBrand({ ...brand, brandInsights: insights });
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs uppercase text-white/45">Caption (e.g. YoY growth)</label>
                      <input
                        type="text"
                        value={stat.caption}
                        onChange={(e) => {
                          const insights = [...brand.brandInsights];
                          insights[idx] = { ...stat, caption: e.target.value };
                          setBrand({ ...brand, brandInsights: insights });
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs uppercase text-white/45">Detail</label>
                      <textarea
                        rows={3}
                        value={stat.detail}
                        onChange={(e) => {
                          const insights = [...brand.brandInsights];
                          insights[idx] = { ...stat, detail: e.target.value };
                          setBrand({ ...brand, brandInsights: insights });
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs uppercase text-white/45">Image</label>
                      {stat.image && (
                        <img src={stat.image} className="h-20 w-full object-cover rounded border border-white/10" alt="" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "insight", idx)}
                        className="w-full text-[10px] text-white/40 file:bg-white/10 file:text-[10px]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Serves Tab */}
        {activeTab === "serves" && (
          <div className="space-y-6">
            <h3 className="text-xl font-light text-accent">Serves Data (Spirits Only)</h3>
            {brand.category !== "Spirits" ? (
              <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-4 rounded-xl text-sm flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>Serves data is only configured for brand variants under the Spirits category.</span>
              </div>
            ) : (
              <div className="space-y-8">
                {brand.variants.map((v: any, vIdx: number) => {
                  const vServes = brand.servesData.find((s: any) => s.variantSlug === v.id) || {
                    variantSlug: v.id,
                    variantDisplayName: v.name,
                    springSummer: [
                      { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
                      { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
                      { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" }
                    ],
                    autumnWinter: [
                      { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
                      { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" },
                      { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" }
                    ]
                  };

                  const sDataIndex = brand.servesData.findIndex((s: any) => s.variantSlug === v.id);
                  const syncDisplayName = () => {
                    if (sDataIndex !== -1 && brand.servesData[sDataIndex].variantDisplayName !== v.name) {
                      const updated = [...brand.servesData];
                      updated[sDataIndex].variantDisplayName = v.name;
                      setBrand({ ...brand, servesData: updated });
                    }
                  };
                  syncDisplayName();

                  return (
                    <div key={v.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                      <h4 className="text-lg font-light text-white border-b border-white/5 pb-2">Serves for <span className="text-accent">{v.name || `Variant #${vIdx + 1}`}</span></h4>

                      {/* Spring / Summer Serves */}
                      <div className="space-y-4">
                        <h5 className="text-sm font-semibold uppercase text-white/50 tracking-wider">Spring / Summer (3 serves)</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[0, 1, 2].map((sIdx) => {
                            const serve = vServes.springSummer[sIdx] || { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" };
                            return (
                              <div key={sIdx} className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                                <input
                                  type="text"
                                  placeholder="Serve Name"
                                  value={serve.name}
                                  onChange={(e) => {
                                    const servesData = [...brand.servesData];
                                    const list = [...(servesData[sDataIndex]?.springSummer || [])];
                                    list[sIdx] = { ...serve, name: e.target.value };
                                    servesData[sDataIndex] = { ...servesData[sDataIndex], springSummer: list };
                                    setBrand({ ...brand, servesData });
                                  }}
                                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                                />
                                <textarea
                                  placeholder="Recipe & instructions"
                                  rows={2}
                                  value={serve.recipe}
                                  onChange={(e) => {
                                    const servesData = [...brand.servesData];
                                    const list = [...(servesData[sDataIndex]?.springSummer || [])];
                                    list[sIdx] = { ...serve, recipe: e.target.value };
                                    servesData[sDataIndex] = { ...servesData[sDataIndex], springSummer: list };
                                    setBrand({ ...brand, servesData });
                                  }}
                                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                  {[0, 1, 2].map((descIdx) => (
                                    <input
                                      key={descIdx}
                                      type="text"
                                      placeholder={`Flavour #${descIdx + 1}`}
                                      value={serve.flavourDescriptors?.[descIdx] || ""}
                                      onChange={(e) => {
                                        const desc = [...(serve.flavourDescriptors || ["", "", ""])];
                                        desc[descIdx] = e.target.value;
                                        const servesData = [...brand.servesData];
                                        const list = [...(servesData[sDataIndex]?.springSummer || [])];
                                        list[sIdx] = { ...serve, flavourDescriptors: desc as any };
                                        servesData[sDataIndex] = { ...servesData[sDataIndex], springSummer: list };
                                        setBrand({ ...brand, servesData });
                                      }}
                                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-[10px] text-white focus:outline-none"
                                    />
                                  ))}
                                </div>
                                <div className="space-y-1">
                                  {serve.image && (
                                    <img src={serve.image} className="h-16 w-full object-cover rounded border border-white/10" alt="" />
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], `serve-springSummer-${sIdx}`, sDataIndex)}
                                    className="w-full text-[10px] text-white/30 file:bg-white/10 file:text-[9px]"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Autumn / Winter Serves */}
                      <div className="space-y-4 border-t border-white/5 pt-4">
                        <h5 className="text-sm font-semibold uppercase text-white/50 tracking-wider">Autumn / Winter (3 serves)</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[0, 1, 2].map((sIdx) => {
                            const serve = vServes.autumnWinter[sIdx] || { name: "", recipe: "", flavourDescriptors: ["", "", ""], image: "" };
                            return (
                              <div key={sIdx} className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                                <input
                                  type="text"
                                  placeholder="Serve Name"
                                  value={serve.name}
                                  onChange={(e) => {
                                    const servesData = [...brand.servesData];
                                    const list = [...(servesData[sDataIndex]?.autumnWinter || [])];
                                    list[sIdx] = { ...serve, name: e.target.value };
                                    servesData[sDataIndex] = { ...servesData[sDataIndex], autumnWinter: list };
                                    setBrand({ ...brand, servesData });
                                  }}
                                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                                />
                                <textarea
                                  placeholder="Recipe & instructions"
                                  rows={2}
                                  value={serve.recipe}
                                  onChange={(e) => {
                                    const servesData = [...brand.servesData];
                                    const list = [...(servesData[sDataIndex]?.autumnWinter || [])];
                                    list[sIdx] = { ...serve, recipe: e.target.value };
                                    servesData[sDataIndex] = { ...servesData[sDataIndex], autumnWinter: list };
                                    setBrand({ ...brand, servesData });
                                  }}
                                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                  {[0, 1, 2].map((descIdx) => (
                                    <input
                                      key={descIdx}
                                      type="text"
                                      placeholder={`Flavour #${descIdx + 1}`}
                                      value={serve.flavourDescriptors?.[descIdx] || ""}
                                      onChange={(e) => {
                                        const desc = [...(serve.flavourDescriptors || ["", "", ""])];
                                        desc[descIdx] = e.target.value;
                                        const servesData = [...brand.servesData];
                                        const list = [...(servesData[sDataIndex]?.autumnWinter || [])];
                                        list[sIdx] = { ...serve, flavourDescriptors: desc as any };
                                        servesData[sDataIndex] = { ...servesData[sDataIndex], autumnWinter: list };
                                        setBrand({ ...brand, servesData });
                                      }}
                                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-[10px] text-white focus:outline-none"
                                    />
                                  ))}
                                </div>
                                <div className="space-y-1">
                                  {serve.image && (
                                    <img src={serve.image} className="h-16 w-full object-cover rounded border border-white/10" alt="" />
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], `serve-autumnWinter-${sIdx}`, sDataIndex)}
                                    className="w-full text-[10px] text-white/30 file:bg-white/10 file:text-[9px]"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Marketing Tab */}
        {activeTab === "marketing" && (
          <div className="space-y-8">
            {/* Promotions */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-lg font-light text-accent">Promotions</h3>
                <button
                  onClick={() => {
                    const promos = [...brand.promotions];
                    promos.push({ id: `promo-${Date.now()}`, title: "", description: "", startDate: "", endDate: "", targetUrl: "" });
                    setBrand({ ...brand, promotions: promos });
                  }}
                  className="h-8 px-3 rounded bg-white/10 hover:bg-white/15 text-xs flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Promotion</span>
                </button>
              </div>

              {brand.promotions.length === 0 ? (
                <p className="text-xs text-white/40 italic">No promotions configured for this brand.</p>
              ) : (
                <div className="space-y-4">
                  {brand.promotions.map((p: any, idx: number) => (
                    <div key={p.id} className="bg-black/20 p-4 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                      <button
                        onClick={() => {
                          const promos = brand.promotions.filter((x: any) => x.id !== p.id);
                          setBrand({ ...brand, promotions: promos });
                        }}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase text-white/40">Title</label>
                        <input
                          type="text"
                          value={p.title}
                          onChange={(e) => {
                            const list = [...brand.promotions];
                            list[idx] = { ...p, title: e.target.value };
                            setBrand({ ...brand, promotions: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase text-white/40">Target URL</label>
                        <input
                          type="text"
                          value={p.targetUrl}
                          onChange={(e) => {
                            const list = [...brand.promotions];
                            list[idx] = { ...p, targetUrl: e.target.value };
                            setBrand({ ...brand, promotions: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="block text-[10px] uppercase text-white/40">Description</label>
                        <textarea
                          rows={2}
                          value={p.description}
                          onChange={(e) => {
                            const list = [...brand.promotions];
                            list[idx] = { ...p, description: e.target.value };
                            setBrand({ ...brand, promotions: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Halo Outlets */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-lg font-light text-accent">Halo Outlets</h3>
                <button
                  onClick={() => {
                    const list = [...brand.haloOutlets];
                    list.push({ brandSlug: brand.slug, tier: haloTab, outletName: "", outletImage: "", outletLogo: "" });
                    setBrand({ ...brand, haloOutlets: list });
                  }}
                  className="h-8 px-3 rounded bg-white/10 hover:bg-white/15 text-xs flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Outlet</span>
                </button>
              </div>

              {/* Halo Tabs */}
              <div className="flex space-x-2 border-b border-white/5 pb-1">
                {(["prestige", "independent", "national-group"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setHaloTab(t)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md uppercase tracking-wider ${
                      haloTab === t ? "bg-accent text-accent-foreground" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {t.replace("-", " ")}
                  </button>
                ))}
              </div>

              <div className="space-y-4 mt-2">
                {brand.haloOutlets.filter((o: any) => o.tier === haloTab).length === 0 ? (
                  <p className="text-xs text-white/40 italic">No outlets added in this tier yet.</p>
                ) : (
                  brand.haloOutlets.map((o: any, idx: number) => {
                    const globalIdx = brand.haloOutlets.findIndex((x: any) => x === o);
                    return (
                      <div key={globalIdx} className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                        <button
                          onClick={() => {
                            const updated = brand.haloOutlets.filter((_: any, iIdx: number) => iIdx !== globalIdx);
                            setBrand({ ...brand, haloOutlets: updated });
                          }}
                          className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex-1 space-y-3">
                          <label className="block text-[10px] uppercase text-white/40">Outlet Name</label>
                          <input
                            type="text"
                            value={o.outletName}
                            onChange={(e) => {
                              const list = [...brand.haloOutlets];
                              list[globalIdx] = { ...o, outletName: e.target.value };
                              setBrand({ ...brand, haloOutlets: list });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                            placeholder="The Ned London"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase text-white/40">Outlet Image</label>
                          {o.outletImage && (
                            <img src={o.outletImage} className="h-12 w-20 object-cover rounded border border-white/10" alt="" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "halo", globalIdx)}
                            className="w-full text-[10px] text-white/30 file:bg-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase text-white/40">Outlet Logo (Optional)</label>
                          {o.outletLogo && (
                            <img src={o.outletLogo} className="h-12 w-20 object-contain rounded border border-white/10" alt="" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "halo-logo", globalIdx)}
                            className="w-full text-[10px] text-white/30 file:bg-white/10"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Case Studies */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-lg font-light text-accent">Case Studies</h3>
                <button
                  onClick={() => {
                    const list = [...brand.caseStudies];
                    list.push({ id: `case-${Date.now()}`, brandSlug: brand.slug, tier: caseStudyTab, title: "", image: "", outletName: "", summary: "", fullText: "" });
                    setBrand({ ...brand, caseStudies: list });
                  }}
                  className="h-8 px-3 rounded bg-white/10 hover:bg-white/15 text-xs flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Case Study</span>
                </button>
              </div>

              {/* Case Study Tabs */}
              <div className="flex space-x-2 border-b border-white/5 pb-1">
                {(["prestige", "independent", "national-group"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setCaseStudyTab(t)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md uppercase tracking-wider ${
                      caseStudyTab === t ? "bg-accent text-accent-foreground" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {t.replace("-", " ")}
                  </button>
                ))}
              </div>

              <div className="space-y-4 mt-2">
                {brand.caseStudies.filter((c: any) => c.tier === caseStudyTab).length === 0 ? (
                  <p className="text-xs text-white/40 italic">No case studies in this tier yet.</p>
                ) : (
                  brand.caseStudies.filter((c: any) => c.tier === caseStudyTab).map((c: any, idx: number) => {
                    const globalIdx = brand.caseStudies.findIndex((x: any) => x === c);
                    return (
                      <div key={c.id || globalIdx} className="bg-black/20 p-4 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                        <button
                          onClick={() => {
                            const updated = brand.caseStudies.filter((_: any, iIdx: number) => iIdx !== globalIdx);
                            setBrand({ ...brand, caseStudies: updated });
                          }}
                          className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="space-y-3">
                          <label className="block text-[10px] uppercase text-white/40">Title</label>
                          <input
                            type="text"
                            value={c.title}
                            onChange={(e) => {
                              const list = [...brand.caseStudies];
                              list[globalIdx] = { ...c, title: e.target.value };
                              setBrand({ ...brand, caseStudies: list });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="block text-[10px] uppercase text-white/40">Outlet Name</label>
                          <input
                            type="text"
                            value={c.outletName}
                            onChange={(e) => {
                              const list = [...brand.caseStudies];
                              list[globalIdx] = { ...c, outletName: e.target.value };
                              setBrand({ ...brand, caseStudies: list });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-3 md:col-span-2">
                          <label className="block text-[10px] uppercase text-white/40">Summary</label>
                          <input
                            type="text"
                            value={c.summary}
                            onChange={(e) => {
                              const list = [...brand.caseStudies];
                              list[globalIdx] = { ...c, summary: e.target.value };
                              setBrand({ ...brand, caseStudies: list });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-3 md:col-span-2">
                          <label className="block text-[10px] uppercase text-white/40">Full Text</label>
                          <textarea
                            rows={3}
                            value={c.fullText}
                            onChange={(e) => {
                              const list = [...brand.caseStudies];
                              list[globalIdx] = { ...c, fullText: e.target.value };
                              setBrand({ ...brand, caseStudies: list });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="block text-[10px] uppercase text-white/40">Case Study Image</label>
                          {c.image && (
                            <img src={c.image} className="h-20 w-32 object-cover rounded border border-white/10" alt="" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "case-study", globalIdx)}
                            className="w-full text-[10px] text-white/30 file:bg-white/10"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* POS Library */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-lg font-light text-accent">POS Library (Max 15)</h3>
                <button
                  disabled={brand.posLibrary.length >= 15}
                  onClick={() => {
                    const list = [...brand.posLibrary];
                    list.push({ id: `pos-${Date.now()}`, brandSlug: brand.slug, title: "", image: "", description: "", downloadUrl: "" });
                    setBrand({ ...brand, posLibrary: list });
                  }}
                  className="h-8 px-3 rounded bg-white/10 hover:bg-white/15 text-xs flex items-center space-x-1 disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add POS Item</span>
                </button>
              </div>

              {brand.posLibrary.length === 0 ? (
                <p className="text-xs text-white/40 italic">No POS assets uploaded.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brand.posLibrary.map((pos: any, idx: number) => (
                    <div key={pos.id} className="bg-black/20 p-4 rounded-xl border border-white/5 relative flex flex-col justify-between space-y-3">
                      <button
                        onClick={() => {
                          const list = brand.posLibrary.filter((x: any) => x.id !== pos.id);
                          setBrand({ ...brand, posLibrary: list });
                        }}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase text-white/40">POS Asset Title</label>
                        <input
                          type="text"
                          value={pos.title}
                          onChange={(e) => {
                            const list = [...brand.posLibrary];
                            list[idx] = { ...pos, title: e.target.value };
                            setBrand({ ...brand, posLibrary: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                          placeholder="Sapling Table Talkers"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase text-white/40">Description</label>
                        <textarea
                          rows={2}
                          value={pos.description}
                          onChange={(e) => {
                            const list = [...brand.posLibrary];
                            list[idx] = { ...pos, description: e.target.value };
                            setBrand({ ...brand, posLibrary: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase text-white/40">Download URL (PDF / asset package link)</label>
                        <input
                          type="text"
                          value={pos.downloadUrl || ""}
                          onChange={(e) => {
                            const list = [...brand.posLibrary];
                            list[idx] = { ...pos, downloadUrl: e.target.value };
                            setBrand({ ...brand, posLibrary: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                          placeholder="https://…/sapling-pos-pack.pdf"
                        />
                        <p className="text-[9px] text-white/30 leading-relaxed">
                          Paste a link to the hosted file (Supabase Storage or a CDN). The public POS
                          Library shows a working Download button when this is set.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase text-white/40">POS Image</label>
                        {pos.image && (
                          <img src={pos.image} className="h-16 w-full object-cover rounded border border-white/10" alt="" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "pos", idx)}
                          className="w-full text-[10px] text-white/30 file:bg-white/10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
