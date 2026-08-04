"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { OfflineIndicator } from "./OfflineIndicator";
import { AssetPreloader } from "./AssetPreloader";

export type NetStatus = "online" | "offline" | "syncing" | "synced";

interface OfflineContextType {
  isOffline: boolean;
  status: NetStatus;
}

const OfflineContext = createContext<OfflineContextType>({ isOffline: false, status: "online" });

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<NetStatus>("online");
  const [hasMounted, setHasMounted] = useState(false);
  const wasOffline = useRef(false);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setHasMounted(true);
    if (!navigator.onLine) {
      wasOffline.current = true;
      setStatus("offline");
    }

    const handleOffline = () => {
      wasOffline.current = true;
      if (safety.current) clearTimeout(safety.current);
      setStatus("offline");
    };

    const handleOnline = () => {
      if (wasOffline.current) {
        // Reconnected after being offline — pull the latest team updates.
        // useBrands / the presentation store also listen to `online` and refetch;
        // they emit `ghf:synced` when done, which flips us to "synced".
        setStatus("syncing");
        if (safety.current) clearTimeout(safety.current);
        safety.current = setTimeout(() => {
          wasOffline.current = false;
          setStatus("synced");
          setTimeout(() => setStatus("online"), 2500);
        }, 6000); // fallback if no synced event arrives
      } else {
        setStatus("online");
      }
    };

    const handleSynced = () => {
      // Only meaningful right after a reconnect.
      if (wasOffline.current) {
        wasOffline.current = false;
        if (safety.current) clearTimeout(safety.current);
        setStatus("synced");
        setTimeout(() => setStatus("online"), 2500);
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("ghf:synced", handleSynced);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("ghf:synced", handleSynced);
      if (safety.current) clearTimeout(safety.current);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline: status === "offline", status }}>
      {children}
      {hasMounted && <OfflineIndicator status={status} />}
      {hasMounted && <AssetPreloader />}
    </OfflineContext.Provider>
  );
}

export const useOffline = () => useContext(OfflineContext);
