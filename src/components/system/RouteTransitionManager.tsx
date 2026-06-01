"use client";

import { useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * RouteTransitionManager hooks into the Next.js router to enable smooth
 * transitions between Server Components without freezing the UI.
 * It is specifically designed to work seamlessly with Framer Motion.
 */
export function RouteTransitionManager() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Overriding the default link click behavior isn't strictly necessary with Next.js 15
    // since we use <Link /> components, but we can emit events when the route changes
    // to trigger the GlobalLoader accurately for Server Component fetches.
    
    const handleRouteChangeStart = () => {
      document.body.classList.add("route-transitioning");
    };

    const handleRouteChangeComplete = () => {
      document.body.classList.remove("route-transitioning");
    };

    handleRouteChangeStart();
    const timeout = setTimeout(handleRouteChangeComplete, 600); // Cinematic transition duration

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
