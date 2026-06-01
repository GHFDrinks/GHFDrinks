"use client";

import React from "react";
import { motion } from "framer-motion";
import { TastingNote } from "@/types/brand";

export function TastingNotes({ notes }: { notes: TastingNote[] }) {
  return (
    <div className="space-y-4">
      {notes.map((note, idx) => (
        <div key={note.flavor} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-white/90">{note.flavor}</span>
            <span className="text-white/40">{note.intensity}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${note.intensity}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
              className="h-full bg-accent rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
