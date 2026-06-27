"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Presentation } from "@/types/presentation";
import { getPresentations } from "@/lib/supabase/queries/presentations";
import { savePresentation as saveToSupabase, deletePresentationAction } from "@/lib/supabase/mutations/presentations";

interface PresentationContextType {
  savedPresentations: Presentation[];
  savePresentation: (p: Presentation) => Promise<void>;
  deletePresentation: (id: string) => Promise<void>;
  getPresentation: (id: string) => Presentation | undefined;
  isSyncing: boolean;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [savedPresentations, setSavedPresentations] = useState<Presentation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    async function loadData() {
      // 1. Load from localStorage immediately for fast boot & offline mode
      const local = localStorage.getItem("ghf_presentations");
      let localData: Presentation[] = [];
      if (local) {
        try {
          localData = JSON.parse(local);
          setSavedPresentations(localData);
        } catch (e) {
          console.error("Failed to parse saved presentations");
        }
      }
      setIsLoaded(true);

      // 2. Fetch from Supabase in background to sync (only if online)
      if (navigator.onLine) {
        setIsSyncing(true);
        try {
          const remoteData = await getPresentations();
          // Extremely basic sync: remote wins. In a real app, use timestamps.
          if (remoteData && remoteData.length > 0) {
            setSavedPresentations(remoteData);
            localStorage.setItem("ghf_presentations", JSON.stringify(remoteData));
          }
        } catch (e) {
          console.error("Sync failed, falling back to local storage.", e);
        } finally {
          setIsSyncing(false);
        }
      }
    }
    loadData();
  }, []);

  const savePresentation = async (p: Presentation) => {
    // Optimistic UI Update & Offline Save
    const exists = savedPresentations.find(existing => existing.id === p.id);
    const newPresentations = exists 
      ? savedPresentations.map(existing => existing.id === p.id ? p : existing)
      : [...savedPresentations, p];
      
    setSavedPresentations(newPresentations);
    localStorage.setItem("ghf_presentations", JSON.stringify(newPresentations));

    // Supabase Background Sync
    if (navigator.onLine) {
      try {
        await saveToSupabase(p);
      } catch (e) {
        console.error("Failed to sync presentation to cloud:", e);
      }
    }
  };

  const deletePresentation = async (id: string) => {
    // Optimistic UI
    const newPresentations = savedPresentations.filter(p => p.id !== id);
    setSavedPresentations(newPresentations);
    localStorage.setItem("ghf_presentations", JSON.stringify(newPresentations));

    if (navigator.onLine) {
      try {
        await deletePresentationAction(id);
      } catch (e) {
        console.error("Failed to delete presentation from cloud:", e);
      }
    }
  };

  const getPresentation = useCallback((id: string) => {
    return savedPresentations.find(p => p.id === id);
  }, [savedPresentations]);

  return (
    <PresentationContext.Provider value={{ savedPresentations, savePresentation, deletePresentation, getPresentation, isSyncing }}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentationStore() {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error("usePresentationStore must be used within a PresentationProvider");
  }
  return context;
}

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used inside PresentationProvider");
  return ctx;
}

