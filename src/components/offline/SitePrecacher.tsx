"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadCloud, CheckCircle2 } from "lucide-react";
import { useBrands } from "@/hooks/useBrands";
import { collectOfflineRoutes } from "@/lib/offline-routes";

const CONCURRENCY = 4;
const FETCH_TIMEOUT_MS = 20000;
// Don't re-download the whole site on every page load/refresh; a reconnect
// (`online` event) always forces a fresh pass regardless. Persisted so the
// throttle survives refreshes, not just in-session re-runs.
const MIN_REWARM_MS = 15 * 60 * 1000;
const LAST_RUN_KEY = "ghf:precache-last-run";

function readLastRun(): number {
  try {
    return Number(localStorage.getItem(LAST_RUN_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeLastRun(ts: number) {
  try {
    localStorage.setItem(LAST_RUN_KEY, String(ts));
  } catch {
    /* private mode / storage full — throttle just won't persist */
  }
}

async function fetchOnce(url: string, rsc: boolean) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    await fetch(url, {
      signal: controller.signal,
      credentials: "same-origin",
      // Bust the browser's own HTTP cache so the request reaches the service
      // worker and gets stored — but let the SW's NetworkFirst do the caching.
      cache: "no-cache",
      headers: rsc
        ? { RSC: "1", Accept: "text/x-component" }
        : { Accept: "text/html" },
    });
  } catch {
    /* offline mid-run, 404, abort — ignore; NetworkFirst only stores 200s */
  } finally {
    clearTimeout(timer);
  }
}

/** Warm one route: its HTML document and its RSC payload. */
async function warmRoute(url: string) {
  await fetchOnce(url, false);
  await fetchOnce(url, true);
}

/**
 * Downloads the entire site into the service-worker cache while online, so any
 * page opens offline — not just the ones the user happened to visit. Runs on
 * first load and again on every reconnect. Shows a small, self-dismissing
 * progress pill while it works.
 */
export function SitePrecacher() {
  const { brands } = useBrands();
  const running = useRef(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [justFinished, setJustFinished] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("caches" in window)) return;

    const run = async (force: boolean) => {
      if (running.current) return;
      if (!navigator.onLine) return;
      if (!force && Date.now() - readLastRun() < MIN_REWARM_MS) return;

      // Ensure the service worker is active and controlling this page,
      // otherwise our fetches bypass it and nothing gets cached.
      const reg = await navigator.serviceWorker.ready.catch(() => null);
      if (!reg) return;
      if (!navigator.serviceWorker.controller) {
        // SW installed but not yet in control (very first load). It will claim
        // the page shortly; try again then.
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => run(force),
          { once: true }
        );
        return;
      }

      const routes = collectOfflineRoutes(brands);
      if (routes.length === 0) return;

      running.current = true;
      writeLastRun(Date.now());
      setJustFinished(false);
      setProgress({ done: 0, total: routes.length });

      let done = 0;
      const queue = [...routes];
      const worker = async () => {
        while (queue.length) {
          if (!navigator.onLine) return; // gave up — connection dropped
          const url = queue.shift()!;
          await warmRoute(url);
          done += 1;
          setProgress({ done, total: routes.length });
          window.dispatchEvent(
            new CustomEvent("ghf:precache", {
              detail: { done, total: routes.length },
            })
          );
        }
      };

      try {
        await Promise.all(
          Array.from({ length: Math.min(CONCURRENCY, routes.length) }, worker)
        );
      } finally {
        running.current = false;
        const completed = done >= routes.length;
        setProgress(null);
        if (completed) {
          setJustFinished(true);
          window.dispatchEvent(new Event("ghf:precache-done"));
          setTimeout(() => setJustFinished(false), 4000);
        }
      }
    };

    // Warm shortly after load, when the browser is idle.
    const kick = () => run(false);
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window
        ? (window as unknown as { requestIdleCallback: (c: () => void) => void }).requestIdleCallback(cb)
        : setTimeout(cb, 2500);
    idle(kick);

    const onOnline = () => run(true);
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [brands]);

  const pct = progress ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <AnimatePresence>
      {(progress || justFinished) && (
        <motion.div
          key={justFinished ? "done" : "progress"}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          {justFinished ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-medium tracking-widest uppercase text-white">
                Saved for offline
              </span>
            </>
          ) : (
            <>
              <DownloadCloud className="w-4 h-4 text-white animate-pulse" />
              <span className="text-sm font-medium tracking-widest uppercase text-white">
                Saving for offline · {pct}%
              </span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
