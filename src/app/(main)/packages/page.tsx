"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Package, Zap } from "lucide-react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { getBrands } from "@/lib/supabase/queries/brands";
import { Brand } from "@/types/brand";

interface ListingItem {
  brandId: string;
  brandName: string;
  tier: "Standard" | "Gold" | "Platinum";
  value: number;
}

export default function PackagesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Package builder state
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedTier, setSelectedTier] = useState<"Standard" | "Gold" | "Platinum">("Standard");
  const [listings, setListings] = useState<ListingItem[]>([]);

  useEffect(() => {
    async function loadBrands() {
      const data = await getBrands();
      setBrands(data);
      if (data.length > 0) {
        setSelectedBrandId(data[0].id);
      }
      setLoading(false);
    }
    loadBrands();
  }, []);

  const getTierValue = (tier: "Standard" | "Gold" | "Platinum") => {
    switch (tier) {
      case "Standard": return 500;
      case "Gold": return 1200;
      case "Platinum": return 3000;
    }
  };

  const handleAddListing = () => {
    const brand = brands.find(b => b.id === selectedBrandId);
    if (!brand) return;
    
    // Check if already listed
    if (listings.some(l => l.brandId === selectedBrandId)) {
      alert("This brand is already added to the package.");
      return;
    }

    const value = getTierValue(selectedTier);
    setListings([...listings, {
      brandId: selectedBrandId,
      brandName: brand.name,
      tier: selectedTier,
      value
    }]);
  };

  const handleRemoveListing = (brandId: string) => {
    setListings(listings.filter(l => l.brandId !== brandId));
  };

  const totalBudget = listings.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24 px-6 lg:px-12 pt-12">
      <header>
        <RevealAnimation direction="up" delay={0.1}>
          <h1 className="text-6xl lg:text-8xl font-light tracking-tight mb-6">Support Packages</h1>
        </RevealAnimation>
        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            Build a bespoke listings package to unlock customized marketing and GHF support budgets.
          </p>
        </RevealAnimation>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
        {/* Interactive Builder Form */}
        <div className="xl:col-span-2 space-y-8">
          <section className="p-8 lg:p-10 rounded-[2.5rem] border border-white/10 bg-white/5 space-y-6">
            <h2 className="text-2xl font-light text-white">Add Product Listing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Select Brand</label>
                <select
                  value={selectedBrandId}
                  onChange={e => setSelectedBrandId(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors appearance-none"
                >
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Select Listing Tier</label>
                <select
                  value={selectedTier}
                  onChange={e => setSelectedTier(e.target.value as any)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors appearance-none"
                >
                  <option value="Standard">Standard Listing (£500 budget)</option>
                  <option value="Gold">Gold Listing (£1,200 budget)</option>
                  <option value="Platinum">Platinum Listing (£3,000 budget)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAddListing}
              className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-white transition-all transform hover:scale-[1.01] flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add to Listings Package</span>
            </button>
          </section>

          {/* Active Listings Table */}
          <section className="p-8 lg:p-10 rounded-[2.5rem] border border-white/10 bg-white/5 space-y-6">
            <h2 className="text-2xl font-light text-white">Proposed Listings ({listings.length})</h2>
            
            {listings.length === 0 ? (
              <p className="text-muted-foreground font-light italic text-center py-8">No listings added to this package yet.</p>
            ) : (
              <div className="space-y-4">
                {listings.map(item => (
                  <div key={item.brandId} className="flex items-center justify-between p-5 rounded-2xl bg-black/30 border border-white/5 hover:border-white/10 transition-colors">
                    <div>
                      <h4 className="font-semibold text-white text-lg">{item.brandName}</h4>
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">{item.tier} Tier</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <span className="font-semibold text-white text-lg">£{item.value.toLocaleString()}</span>
                      <button
                        onClick={() => handleRemoveListing(item.brandId)}
                        className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Budget Summary Panel */}
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 lg:p-10 space-y-8 sticky top-6">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <Package className="w-5 h-5" />
            <span>Package Summary</span>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-white/50 block font-medium">Total Support Budget Unlocked</span>
            <span className="text-5xl lg:text-6xl font-light tracking-tight text-white block">
              £{totalBudget.toLocaleString()}
            </span>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <Zap className="w-4 h-4" />
              <span>Unlocked Benefits</span>
            </div>
            
            <ul className="space-y-3 text-sm font-light text-muted-foreground">
              {listings.length === 0 ? (
                <li className="italic">Add brand listings to unlock bespoke menu designs, custom event support, and POS merchandise.</li>
              ) : (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent mr-1">✓</span>
                    <span>Custom menu designs & print materials</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent mr-1">✓</span>
                    <span>Staff incentive schemes & training sessions</span>
                  </li>
                  {listings.some(l => l.tier === "Gold" || l.tier === "Platinum") && (
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mr-1">✓</span>
                      <span>Co-branded local marketing events support</span>
                    </li>
                  )}
                  {listings.some(l => l.tier === "Platinum") && (
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mr-1">✓</span>
                      <span>Bespoke venue terrace transformation support</span>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
