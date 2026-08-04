"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, Loader2, Save, Check } from "lucide-react";
import { DARK_ADMIN_ACCENT } from "@/lib/admin-theme";
import { ACTIVATION_WINDOWS } from "@/data/activation-windows";
import { getBrands } from "@/lib/supabase/queries/brands";
import { createClient } from "@/lib/supabase/client";
import { Brand } from "@/types/brand";

export default function AdminCalendarPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDate, setEditingDate] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      // Load brands
      const brandList = await getBrands();
      setBrands(brandList);

      // Load calendar dates
      const supabase = createClient();
      const { data, error } = await supabase
        .from("calendar_dates")
        .select("*")
        .order("name");

      if (error || !data || data.length === 0) {
        // Fallback to static ACTIVATION_WINDOWS mapping
        const formatted = Object.entries(ACTIVATION_WINDOWS).map(([name, val], idx) => {
          return {
            id: `static-${idx}`,
            name,
            month: Array.isArray(val.month) ? val.month : [val.month],
            day: val.day || null,
            day_range: val.range || null,
            relevant_brands: []
          };
        });
        setDates(formatted);
      } else {
        setDates(data.map((d: any) => ({
          id: d.id,
          name: d.name,
          month: Array.isArray(d.month) ? d.month : [d.month],
          day: d.day,
          day_range: d.day_range,
          relevant_brands: d.relevant_brands || []
        })));
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleEdit = (dateItem: any) => {
    setEditingDate({
      ...dateItem,
      monthString: dateItem.month.join(", "),
      rangeString: dateItem.day_range ? dateItem.day_range.join("-") : ""
    });
  };

  const handleCreate = () => {
    setEditingDate({
      id: "new",
      name: "",
      month: [1],
      monthString: "1",
      day: null,
      day_range: null,
      rangeString: "",
      relevant_brands: []
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this key date?")) return;

    const supabase = createClient();
    if (id.length > 10 && !id.startsWith("static-")) {
      const { error } = await supabase.from("calendar_dates").delete().eq("id", id);
      if (error) {
        alert("Failed to delete key date: " + error.message);
        return;
      }
    }
    setDates(dates.filter(d => d.id !== id));
  };

  const handleSave = async () => {
    if (!editingDate.name) {
      alert("Key date name is required.");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();

    // Parse month array
    const months = editingDate.monthString
      ? editingDate.monthString.split(",").map((m: string) => parseInt(m.trim(), 10)).filter((m: number) => !isNaN(m))
      : [1];

    // Parse range
    let rangePayload = null;
    if (editingDate.rangeString) {
      const parts = editingDate.rangeString.split("-").map((p: string) => parseInt(p.trim(), 10)).filter((p: number) => !isNaN(p));
      if (parts.length === 2) {
        rangePayload = parts;
      }
    }

    const payload = {
      name: editingDate.name,
      month: months,
      day: editingDate.day ? parseInt(editingDate.day, 10) : null,
      day_range: rangePayload,
      relevant_brands: editingDate.relevant_brands || []
    };

    if (editingDate.id && editingDate.id !== "new" && !editingDate.id.startsWith("static-") && editingDate.id.length > 10) {
      // Update
      const { data, error } = await supabase
        .from("calendar_dates")
        .update(payload)
        .eq("id", editingDate.id)
        .select()
        .single();

      if (error) {
        alert("Failed to update: " + error.message);
      } else {
        setDates(dates.map(d => d.id === editingDate.id ? {
          id: data.id,
          name: data.name,
          month: data.month,
          day: data.day,
          day_range: data.day_range,
          relevant_brands: data.relevant_brands
        } : d));
        setEditingDate(null);
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from("calendar_dates")
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.warn("Database insert failed, updating local state:", error);
        const localNew = {
          ...editingDate,
          id: editingDate.id === "new" ? `cal-${Date.now()}` : editingDate.id,
          month: months,
          day_range: rangePayload
        };
        setDates([localNew, ...dates.filter(d => d.id !== editingDate.id)]);
        setEditingDate(null);
      } else {
        setDates([{
          id: data.id,
          name: data.name,
          month: data.month,
          day: data.day,
          day_range: data.day_range,
          relevant_brands: data.relevant_brands
        }, ...dates.filter(d => d.id !== editingDate.id)]);
        setEditingDate(null);
      }
    }
    setIsSaving(false);
  };

  const toggleBrand = (slug: string) => {
    setEditingDate((prev: any) => {
      const selected = prev.relevant_brands || [];
      const updated = selected.includes(slug)
        ? selected.filter((s: string) => s !== slug)
        : [...selected, slug];
      return { ...prev, relevant_brands: updated };
    });
  };

  const getMonthName = (num: number) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[num - 1] || `${num}`;
  };

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center space-y-4 bg-[#050505] min-h-screen text-white">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-white/50 font-medium">Loading Key Dates Calendar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 space-y-8" style={DARK_ADMIN_ACCENT}>
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Key Dates Calendar</h1>
          <p className="text-muted-foreground font-light text-lg">Manage key trade events, activation windows and connect relevant brands.</p>
        </div>
        <button
          onClick={handleCreate}
          className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Key Date</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Key Dates List */}
        <div className="lg:col-span-2 p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
          <h2 className="text-xl font-light text-accent">Activation Windows & Key Dates ({dates.length})</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dates.map((d) => (
              <div key={d.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white/90 text-lg">{d.name}</h3>
                    <p className="text-xs text-white/40 font-mono mt-0.5">
                      {d.month.map((m: number) => getMonthName(m)).join(", ")}
                      {d.day && ` - Day ${d.day}`}
                      {d.day_range && ` - Days ${d.day_range[0]} to ${d.day_range[1]}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(d)}
                      className="p-1.5 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="p-1.5 hover:bg-red-500/20 rounded text-white/60 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Connected Brands */}
                <div className="flex flex-wrap gap-1 border-t border-white/5 pt-2">
                  {d.relevant_brands && d.relevant_brands.length > 0 ? (
                    d.relevant_brands.map((bSlug: string) => (
                      <span key={bSlug} className="text-[10px] bg-accent/10 border border-accent/20 px-2 py-0.5 rounded text-accent">
                        {bSlug}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-white/30 italic">No connected brands</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Panel */}
        <div>
          {editingDate ? (
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
              <h2 className="text-xl font-light text-accent border-b border-white/5 pb-2">
                {editingDate.id === "new" ? "Add Key Date" : "Edit Key Date"}
              </h2>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Date/Window Name</label>
                <input
                  type="text"
                  value={editingDate.name}
                  onChange={(e) => setEditingDate({ ...editingDate, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. Martini Day"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Months (e.g. 6 or 6, 7, 8)</label>
                <input
                  type="text"
                  value={editingDate.monthString}
                  onChange={(e) => setEditingDate({ ...editingDate, monthString: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. 6"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Specific Day (Optional)</label>
                  <input
                    type="number"
                    value={editingDate.day || ""}
                    onChange={(e) => setEditingDate({ ...editingDate, day: e.target.value ? parseInt(e.target.value, 10) : null })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                    placeholder="e.g. 19"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs uppercase text-white/45">Day Range (e.g. 1-31)</label>
                  <input
                    type="text"
                    value={editingDate.rangeString}
                    onChange={(e) => setEditingDate({ ...editingDate, rangeString: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                    placeholder="e.g. 14-20"
                  />
                </div>
              </div>

              {/* Brands connection list */}
              <div className="space-y-3 border-t border-white/5 pt-3">
                <label className="block text-xs uppercase text-white/45 flex items-center space-x-1">
                  <span>Connected Brands</span>
                  <span className="text-[10px] text-white/30 lowercase">(click to toggle)</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-2 bg-black/30 border border-white/5 rounded-lg">
                  {brands.map((b) => {
                    const isSelected = editingDate.relevant_brands?.includes(b.slug);
                    return (
                      <button
                        key={b.slug}
                        onClick={() => toggleBrand(b.slug)}
                        className={`text-xs px-2 py-1 rounded text-left border flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-accent/15 border-accent text-accent"
                            : "bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate pr-1">{b.name}</span>
                        {isSelected && <Check className="w-3 h-3 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
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
                  onClick={() => setEditingDate(null)}
                  className="h-11 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-center py-12 text-white/40 italic text-sm space-y-2">
              <Calendar className="w-6 h-6 mx-auto text-white/20" />
              <p>Select a date window to edit, or click Add Key Date to register a new promotional calendar date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
