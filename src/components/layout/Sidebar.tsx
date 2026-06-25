"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Wine, 
  GlassWater, 
  Beer, 
  Zap, 
  Calendar, 
  BookOpen, 
  LifeBuoy, 
  TrendingUp, 
  Package, 
  Presentation
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { name: "Spirits", href: "/brands/spirits", icon: GlassWater },
  { name: "Wines", href: "/brands/wines", icon: Wine },
  { name: "Packaged", href: "/brands/beer", icon: Beer },
  { name: "GHF Activations", href: "/activations", icon: Zap },
  { name: "Activation Calendars", href: "/calendar", icon: Calendar },
  { name: "Tasting Notes", href: "/tasting-notes", icon: BookOpen },
  { name: "Category Insights", href: "/insights", icon: TrendingUp },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "Presentations", href: "/presentations", icon: Presentation },
  { name: "GHF Support", href: "/support", icon: LifeBuoy },
];

interface UserProfile {
  name: string;
  email: string;
  initials: string;
  role: string;
}

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const [user, setUser] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    function loadUser() {
      // 1. Check local storage
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("ghf_user_profile");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            setUser(parsed);
            return;
          } catch (e) {
            console.error("Failed to parse cached profile", e);
          }
        }
      }

      // 2. Fallback to Supabase Auth
      async function fetchAuth() {
        try {
          const supabase = createClient();
          const { data: { user: authUser } } = await supabase.auth.getUser();
          if (authUser) {
            const email = authUser.email || "";
            const name = authUser.user_metadata?.full_name || email.split("@")[0];
            
            const formattedName = name
              .split(/[._-]/)
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            
            const initials = formattedName
              .split(" ")
              .map((w: string) => w.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase() || "GA";

            const profile = {
              name: formattedName,
              email,
              initials,
              role: email.toLowerCase().includes("admin") ? "Administrator" : "Sales Executive"
            };

            setUser(profile);
            localStorage.setItem("ghf_user_profile", JSON.stringify(profile));
          }
        } catch (err) {
          console.error("Failed to load user in sidebar:", err);
        }
      }
      fetchAuth();
    }

    loadUser();

    // Listen to local/custom events for instant re-render when user saves profile
    const handleUpdate = () => loadUser();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("ghf_profile_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("ghf_profile_updated", handleUpdate);
    };
  }, []);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform flex flex-col bg-[var(--sidebar)] border-r border-[var(--border)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-24 items-center px-8 border-b border-[var(--border)]/20">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
            G
          </div>
          <span className="text-xl font-medium tracking-tight">GHF Drinks</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex items-center px-4 py-3 rounded-xl group overflow-hidden transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-[var(--accent)]/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center space-x-4">
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent/80"
                  )}
                  strokeWidth={1.5}
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent/80"
                  )}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      {/* Footer Area */}
      <Link 
        href="/profile" 
        className="p-6 border-t border-[var(--border)]/20 flex items-center space-x-4 hover:bg-[var(--background)]/5 transition-colors cursor-pointer block"
      >
        <div className="w-10 h-10 rounded-full bg-[var(--background)]/5 border border-[var(--border)]/20 flex items-center justify-center text-xs font-semibold text-accent">
          {user ? user.initials : "JD"}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[var(--foreground)]">{user ? user.name : "John Doe"}</span>
          <span className="text-xs text-muted-foreground">{user ? user.role : "Sales Executive"}</span>
        </div>
      </Link>
    </aside>
  );
}
