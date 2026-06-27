"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, MapPin, Loader2, Save } from "lucide-react";
import { UPCOMING_EVENTS } from "@/data/upcoming-events";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { uploadImage } from "../_lib/image-upload";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("upcoming_events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to static data
        setEvents(UPCOMING_EVENTS.map(e => ({
          id: e.id,
          title: e.title,
          date: e.date,
          description: e.description,
          location: e.location || "",
          image_url: e.image,
          ticket_url: e.ticketUrl || ""
        })));
      } else {
        setEvents(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleEdit = (event: any) => {
    setEditingEvent({ ...event });
  };

  const handleCreate = () => {
    setEditingEvent({
      id: "new",
      title: "",
      date: "",
      description: "",
      location: "",
      image_url: "",
      ticket_url: ""
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    
    const supabase = createClient();
    if (id.length > 10 && !id.startsWith("new-")) {
      const { error } = await supabase.from("upcoming_events").delete().eq("id", id);
      if (error) {
        alert("Failed to delete event from database: " + error.message);
        return;
      }
    }
    setEvents(events.filter(e => e.id !== id));
  };

  const handleSave = async () => {
    if (!editingEvent.title) {
      alert("Event title is required.");
      return;
    }
    setIsSaving(true);
    const supabase = createClient();

    const payload = {
      title: editingEvent.title,
      date: editingEvent.date,
      description: editingEvent.description,
      location: editingEvent.location,
      image_url: editingEvent.image_url,
      ticket_url: editingEvent.ticket_url
    };

    if (editingEvent.id && editingEvent.id !== "new" && !editingEvent.id.includes("london-") && !editingEvent.id.includes("sapling-") && !editingEvent.id.includes("english-") && !editingEvent.id.includes("mezcal-")) {
      // Real database uuid update
      const { data, error } = await supabase
        .from("upcoming_events")
        .update(payload)
        .eq("id", editingEvent.id)
        .select()
        .single();
      
      if (error) {
        alert("Failed to save to Supabase: " + error.message);
      } else {
        setEvents(events.map(e => e.id === editingEvent.id ? data : e));
        setEditingEvent(null);
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from("upcoming_events")
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.warn("Could not insert to DB, saving locally:", error);
        // Fallback save in local state
        const localNew = { ...editingEvent, id: editingEvent.id === "new" ? `evt-${Date.now()}` : editingEvent.id };
        setEvents([localNew, ...events.filter(e => e.id !== editingEvent.id)]);
        setEditingEvent(null);
      } else {
        setEvents([data, ...events.filter(e => e.id !== editingEvent.id)]);
        setEditingEvent(null);
      }
    }
    setIsSaving(false);
  };

  const handleImageUploadLocal = async (file: File) => {
    try {
      const url = await uploadImage(file, "upcoming-events", "event", events.length);
      setEditingEvent((prev: any) => ({ ...prev, image_url: url }));
    } catch (e: any) {
      alert("Image upload failed: " + e.message);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center space-y-4 bg-[#050505] min-h-screen text-white">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-white/50 font-medium">Loading Upcoming Events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Upcoming Events</h1>
          <p className="text-muted-foreground font-light text-lg">Schedule and configure trade shows, plantings, and tastings.</p>
        </div>
        <button
          onClick={handleCreate}
          className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events Table / List */}
        <div className="lg:col-span-2 p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
          <h2 className="text-xl font-light text-accent">Active Events ({events.length})</h2>
          
          <div className="space-y-4">
            {events.map((evt) => (
              <div key={evt.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between group hover:border-white/10 transition-all">
                <div className="flex space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                    {evt.image_url ? (
                      <img src={evt.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No Image</div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg text-white/90">{evt.title}</h3>
                    <div className="flex items-center space-x-4 text-xs text-white/50">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date}</span>
                      </span>
                      {evt.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{evt.location}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2 max-w-xl mt-1">{evt.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleEdit(evt)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-white/60 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Panel */}
        <div>
          {editingEvent ? (
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
              <h2 className="text-xl font-light text-accent border-b border-white/5 pb-2">
                {editingEvent.id === "new" ? "New Event" : "Edit Event"}
              </h2>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Event Title</label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. London Wine Fair"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Date / Duration</label>
                <input
                  type="text"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. May 18 - 20, 2026"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Location</label>
                <input
                  type="text"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. Olympia London"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Ticket URL</label>
                <input
                  type="text"
                  value={editingEvent.ticket_url}
                  onChange={(e) => setEditingEvent({ ...editingEvent, ticket_url: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Description</label>
                <textarea
                  rows={4}
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="Event details..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase text-white/45">Event Banner Image</label>
                {editingEvent.image_url && (
                  <img src={editingEvent.image_url} className="h-24 w-full object-cover rounded border border-white/10" alt="" />
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
                  onClick={() => setEditingEvent(null)}
                  className="h-11 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-center py-12 text-white/40 italic text-sm">
              Select an event to edit, or click Create Event to add a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
