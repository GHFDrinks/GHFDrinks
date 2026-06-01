"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { OfflineIndicator } from "./OfflineIndicator";
import { AssetPreloader } from "./AssetPreloader";

interface OfflineContextType {
  isOffline: boolean;
}

const OfflineContext = createContext<OfflineContextType>({ isOffline: false });

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Initialize state
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline }}>
      {children}
      {hasMounted && <OfflineIndicator isOffline={isOffline} />}
      {hasMounted && <AssetPreloader />}
    </OfflineContext.Provider>
  );
}

export const useOffline = () => useContext(OfflineContext);
