"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Plus } from "lucide-react";
import Link from "next/link";
import { mockBrands } from "@/data/brands";
import { Brand } from "@/types/brand";
import { saveBrand } from "@/lib/supabase/mutations/brands";

export default function BrandEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    params.then(p => {
      setResolvedParams(p);
      if (p.id !== "new") {
        const found = mockBrands.find(b => b.id === p.id);
        if (found) setBrand(found);
      } else {
        // Initialize empty brand
        setBrand({
          id: "",
          slug: "",
          name: "",
          category: "",
          tagline: "",
          heroImage: { url: "", alt: "" },
          lifestyleImages: [],
          venueBadges: [],
          promotionActive: false,
          bcorp: false,
          story: { headline: "", content: [], image: { url: "", alt: "" } },
          variants: [],
          serves: [],
          activations: [],
          mediaGallery: [],
          supportPackages: []
        });
      }
    });
  }, [params]);

  if (!brand) return <div className="p-12 text-white/50">Loading brand data...</div>;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveBrand(brand);
      router.push("/admin/brands");
    } catch (e) {
      console.error("Failed to save brand:", e);
      alert("Failed to save brand. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10 py-6 border-b border-white/5 -mx-8 px-8 lg:-mx-12 lg:px-12">
        <div className="flex items-center space-x-6">
          <Link href="/admin/brands">
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-light tracking-tight">{resolvedParams?.id === "new" ? "Create Brand" : `Edit ${brand.name}`}</h1>
            <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mt-1">Brand Profile</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-12 px-8 rounded-full bg-accent text-accent-foreground font-medium hover:bg-white transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Core Info */}
          <section className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <h2 className="text-xl font-medium mb-6">Core Identity</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Brand Name</label>
                  <input type="text" value={brand.name} onChange={e => setBrand({...brand, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none transition-colors" placeholder="e.g. Sapling Spirits" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Category</label>
                  <select value={brand.category} onChange={e => setBrand({...brand, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none transition-colors appearance-none">
                    <option value="">Select Category...</option>
                    <option value="Spirits">Spirits</option>
                    <option value="No & Low Alc">No & Low Alc</option>
                    <option value="Wine">Wine</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Tagline / Catchphrase</label>
                <input type="text" value={brand.tagline} onChange={e => setBrand({...brand, tagline: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none transition-colors font-serif italic" placeholder="e.g. Climate Positive Spirits" />
              </div>
            </div>
          </section>

          {/* The Story */}
          <section className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <h2 className="text-xl font-medium mb-6">The Story</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Headline</label>
                <input type="text" value={brand.story.headline} onChange={e => setBrand({...brand, story: {...brand.story, headline: e.target.value}})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Story Content</label>
                <textarea rows={6} value={brand.story.content?.join('\n') || ''} onChange={e => setBrand({...brand, story: {...brand.story, content: e.target.value.split('\n')}})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none transition-colors leading-relaxed" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Media & Assets */}
          <section className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <h2 className="text-xl font-medium mb-6">Hero Media</h2>
            <div className="aspect-[4/5] rounded-2xl bg-black/50 border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-accent transition-colors">
              {brand.heroImage?.url ? (
                <>
                  <img src={brand.heroImage.url} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 bg-black/80 rounded-lg text-sm font-medium backdrop-blur-md">Change Image</span>
                  </div>
                </>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 text-white/20 mb-4" />
                  <p className="text-sm text-white/50 text-center px-8">Drag and drop or click to upload high-res hero image</p>
                </>
              )}
            </div>
          </section>

          {/* Variants Quick Stats */}
          <section className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Variants</h2>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white text-white hover:text-black transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {brand.variants.length > 0 ? brand.variants.map(v => (
                <div key={v.id} className="flex items-center space-x-4 p-3 rounded-xl bg-black/50 border border-white/5">
                  <img src={v.image.url} className="w-8 h-12 object-contain" alt="" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.abv} • {v.volume}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-white/40 italic">No variants added yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
