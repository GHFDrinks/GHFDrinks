"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Loader2 } from "lucide-react";
import { Brand } from "@/types/brand";
import { getBrands } from "@/lib/supabase/queries/brands";
import { deleteBrand } from "@/lib/supabase/mutations/brands";

export default function AdminBrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getBrands();
      setBrands(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this brand?")) {
      await deleteBrand(id);
      setBrands(brands.filter(b => b.id !== id));
    }
  };

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-white/50 font-medium">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Brands</h1>
          <p className="text-muted-foreground font-light text-lg">Manage your brand portfolio and associated content.</p>
        </div>
        <Link href="/admin/brands/new">
          <button className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Brand</span>
          </button>
        </Link>
      </header>

      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder="Search brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                <th className="px-6 py-4 font-medium">Brand</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Variants</th>
                <th className="px-6 py-4 font-medium">Last Updated</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr key={brand.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                        <img src={brand.heroImage.url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <div className="font-medium text-lg">{brand.name}</div>
                        <div className="text-sm text-white/50">{brand.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium uppercase tracking-widest text-accent">
                      {brand.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{brand.variants.length} products</td>
                  <td className="px-6 py-4 text-white/70">Just now</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/brands/${brand.id}`}>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors" title="Edit Brand">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(brand.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-white/60 hover:text-red-400 transition-colors" title="Delete Brand">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBrands.length === 0 && (
            <div className="text-center py-12 text-white/40">
              No brands found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
