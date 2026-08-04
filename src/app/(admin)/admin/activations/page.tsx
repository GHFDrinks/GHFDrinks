"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, MapPin, Loader2, Save, Check } from "lucide-react";
import { DARK_ADMIN_ACCENT } from "@/lib/admin-theme";
import { getBrands } from "@/lib/supabase/queries/brands";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "../_lib/image-upload";
import { Brand } from "@/types/brand";

export default function AdminActivationsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [activations, setActivations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivation, setEditingActivation] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getBrands();
      setBrands(data);
      if (data.length > 0) {
        setSelectedBrand(data[0]);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (!selectedBrand) return;
    const brandId = selectedBrand.id;
    const brandActivations = selectedBrand.activations || [];

    async function loadActivations() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("activations")
        .select("*")
        .eq("brand_id", brandId);

      if (error || !data || data.length === 0) {
        // Fallback to static activations for this brand
        setActivations(brandActivations);
      } else {
        setActivations(data.map((a: any) => ({
          id: a.id,
          title: a.title,
          description: a.description || "",
          date: a.date || "",
          location: a.location || "",
          image: { url: a.image_url || "", alt: a.title },
          type: a.type || "upcoming",
          activationType: a.activation_type || "",
          keyDates: a.key_dates || [],
          mixerPairings: a.mixer_pairings || []
        })));
      }
    }
    loadActivations();
  }, [selectedBrand]);

  const handleEdit = (act: any) => {
    setEditingActivation({
      ...act,
      keyDatesText: act.keyDates?.join(", ") || ""
    });
  };

  const handleCreate = () => {
    setEditingActivation({
      id: "new",
      title: "",
      description: "",
      date: "",
      location: "",
      image: { url: "", alt: "" },
      type: "upcoming",
      activationType: "",
      keyDates: [],
      keyDatesText: "",
      mixerPairings: []
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activation?")) return;
    
    const supabase = createClient();
    if (id.length > 10 && !id.startsWith("new-") && !id.includes("-act-")) {
      const { error } = await supabase.from("activations").delete().eq("id", id);
      if (error) {
        alert("Failed to delete activation: " + error.message);
        return;
      }
    }
    setActivations(activations.filter(a => a.id !== id));
  };

  const handleSave = async () => {
    if (!selectedBrand) return;
    if (!editingActivation.title) {
      alert("Activation title is required.");
      return;
    }
    
    setIsSaving(true);
    const supabase = createClient();

    // Parse key dates text
    const keyDates = editingActivation.keyDatesText
      ? editingActivation.keyDatesText.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const payload = {
      brand_id: selectedBrand.id,
      title: editingActivation.title,
      description: editingActivation.description,
      date: editingActivation.date,
      location: editingActivation.location,
      image_url: editingActivation.image?.url || "",
      type: editingActivation.type,
      activation_type: editingActivation.activationType,
      key_dates: keyDates,
      mixer_pairings: editingActivation.mixerPairings || []
    };

    if (editingActivation.id && editingActivation.id !== "new" && !editingActivation.id.includes("-act-") && editingActivation.id.length > 10) {
      // Update
      const { data, error } = await supabase
        .from("activations")
        .update(payload)
        .eq("id", editingActivation.id)
        .select()
        .single();

      if (error) {
        alert("Failed to update: " + error.message);
      } else {
        setActivations(activations.map(a => a.id === editingActivation.id ? {
          id: data.id,
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          image: { url: data.image_url, alt: data.title },
          type: data.type,
          activationType: data.activation_type,
          keyDates: data.key_dates,
          mixerPairings: data.mixer_pairings
        } : a));
        setEditingActivation(null);
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from("activations")
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.warn("Database insert failed, updating local state:", error);
        const localNew = {
          ...editingActivation,
          id: editingActivation.id === "new" ? `act-${Date.now()}` : editingActivation.id,
          keyDates
        };
        setActivations([localNew, ...activations.filter(a => a.id !== editingActivation.id)]);
        setEditingActivation(null);
      } else {
        setActivations([{
          id: data.id,
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          image: { url: data.image_url, alt: data.title },
          type: data.type,
          activationType: data.activation_type,
          keyDates: data.key_dates,
          mixerPairings: data.mixer_pairings
        }, ...activations.filter(a => a.id !== editingActivation.id)]);
        setEditingActivation(null);
      }
    }
    setIsSaving(false);
  };

  const handleImageUploadLocal = async (file: File) => {
    if (!selectedBrand) return;
    try {
      const url = await uploadImage(file, selectedBrand.slug, "activation", activations.length);
      setEditingActivation((prev: any) => ({ ...prev, image: { ...prev.image, url } }));
    } catch (e: any) {
      alert("Image upload failed: " + e.message);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center space-y-4 bg-[#050505] min-h-screen text-white">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-white/50 font-medium">Loading Activations Editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 space-y-8" style={DARK_ADMIN_ACCENT}>
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Activations Editor</h1>
          <p className="text-muted-foreground font-light text-lg">Configure custom brand activations, key trade dates, and seasonal menus.</p>
        </div>
        <button
          onClick={handleCreate}
          disabled={!selectedBrand}
          className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2 disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          <span>Add Activation</span>
        </button>
      </header>

      {/* Brand Selector */}
      <div className="flex items-center space-x-4 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <label className="text-sm font-semibold uppercase tracking-wider text-white/55">Select Brand:</label>
        <select
          value={selectedBrand?.id || ""}
          onChange={(e) => {
            const found = brands.find(b => b.id === e.target.value);
            if (found) setSelectedBrand(found);
          }}
          className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none text-white font-medium"
        >
          {brands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List of Activations for Selected Brand */}
        <div className="lg:col-span-2 p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
          <h2 className="text-xl font-light text-accent">Activations for {selectedBrand?.name} ({activations.length})</h2>
          
          {activations.length === 0 ? (
            <div className="text-center py-12 text-white/40 italic">
              No activations listed for this brand yet.
            </div>
          ) : (
            <div className="space-y-4">
              {activations.map((act) => (
                <div key={evtId(act)} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between group hover:border-white/10 transition-all">
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                      {act.image?.url ? (
                        <img src={act.image.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No Image</div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-lg text-white/90">{act.title}</h3>
                        {act.activationType && (
                          <span className="px-2 py-0.5 bg-accent/20 border border-accent/30 text-accent rounded text-[10px] uppercase font-bold tracking-wider">
                            {act.activationType}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-white/50">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{act.date}</span>
                        </span>
                        {act.location && (
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{act.location}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/70 line-clamp-2 max-w-xl mt-1">{act.description}</p>
                      {act.keyDates?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {act.keyDates.map((kd: string, i: number) => (
                            <span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/60">
                              {kd}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleEdit(act)}
                      className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(act.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-white/60 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Panel */}
        <div>
          {editingActivation ? (
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
              <h2 className="text-xl font-light text-accent border-b border-white/5 pb-2">
                {editingActivation.id === "new" ? "Add Activation" : "Edit Activation"}
              </h2>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Activation Title</label>
                <input
                  type="text"
                  value={editingActivation.title}
                  onChange={(e) => setEditingEvent({ ...editingActivation, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. Earth Day Takeover"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Activation Type (Badge text)</label>
                <input
                  type="text"
                  value={editingActivation.activationType}
                  onChange={(e) => setEditingEvent({ ...editingActivation, activationType: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. ROTATING COCKTAIL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Date / Duration</label>
                  <input
                    type="text"
                    value={editingActivation.date}
                    onChange={(e) => setEditingEvent({ ...editingActivation, date: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                    placeholder="e.g. April 22, 2026"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Location</label>
                  <input
                    type="text"
                    value={editingActivation.location}
                    onChange={(e) => setEditingEvent({ ...editingActivation, location: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                    placeholder="e.g. London"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Key Dates (Comma-separated)</label>
                <input
                  type="text"
                  value={editingActivation.keyDatesText}
                  onChange={(e) => setEditingEvent({ ...editingActivation, keyDatesText: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. Earth Day, Negroni Week"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Description</label>
                <textarea
                  rows={4}
                  value={editingActivation.description}
                  onChange={(e) => setEditingEvent({ ...editingActivation, description: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="Activation details..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Activation Image</label>
                {editingActivation.image?.url && (
                  <img src={editingActivation.image.url} className="h-24 w-full object-cover rounded border border-white/10" alt="" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUploadLocal(e.target.files[0])}
                  className="w-full text-xs text-white/40 file:bg-white/10 file:text-white"
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 h-11 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save"}</span>
                </button>
                <button
                  onClick={() => setEditingActivation(null)}
                  className="h-11 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-center py-12 text-white/40 italic text-sm">
              Select an activation to edit, or click Add Activation to create a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function evtId(act: any) {
    return act.id || act.title;
  }

  // Alias for setEditingActivation state helper to keep same pattern
  function setEditingEvent(val: any) {
    if (typeof val === "function") {
      setEditingActivation(val);
    } else {
      setEditingActivation(val);
    }
  }
}
