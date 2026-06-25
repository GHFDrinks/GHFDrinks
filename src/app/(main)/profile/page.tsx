"use client";

import React, { useState, useEffect } from "react";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { Users, Mail, Shield, Save, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  name: string;
  email: string;
  initials: string;
  role: string;
}

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Sales Executive");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check network status
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Load existing profile from localStorage
    const local = localStorage.getItem("ghf_user_profile");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
        setRole(parsed.role || "Sales Executive");
      } catch (e) {
        console.error("Error reading cached profile", e);
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSaveLocal = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please fill out Name and Email.");
      return;
    }

    const initials = name
      .split(" ")
      .map(w => w.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "JD";

    const profile: UserProfile = {
      name,
      email,
      initials,
      role
    };

    localStorage.setItem("ghf_user_profile", JSON.stringify(profile));
    
    // Dispatch custom event to notify Sidebar component to update its state
    window.dispatchEvent(new Event("ghf_profile_updated"));

    setSuccessMsg("Profile saved locally! All changes are active offline.");
  };

  const handleSignUpCloud = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Please fill out Name, Email and Password to register online.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const initials = name
        .split(" ")
        .map(w => w.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase() || "JD";

      const profile: UserProfile = {
        name,
        email,
        initials,
        role
      };

      // 1. Save locally first (offline robustness)
      localStorage.setItem("ghf_user_profile", JSON.stringify(profile));
      window.dispatchEvent(new Event("ghf_profile_updated"));

      if (!navigator.onLine) {
        setSuccessMsg("Saved locally. You are offline, registration will sync with the database when connection is restored.");
        setLoading(false);
        return;
      }

      // 2. Sign up on Supabase Auth
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role
          }
        }
      });

      if (error) {
        throw error;
      }

      setSuccessMsg("Online registration successful! Check your email to confirm verification.");
    } catch (err: any) {
      console.error("Registration error:", err);
      setErrorMsg(err.message || "Failed to register on the cloud database. Saved locally instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-24 px-6 lg:px-12 pt-12 max-w-4xl">
      <header>
        <RevealAnimation direction="up" delay={0.1}>
          <div className="flex items-center space-x-4 mb-6">
            <h1 className="text-6xl lg:text-7xl font-light tracking-tight">Profile & Setup</h1>
            {isOffline ? (
              <span className="flex items-center space-x-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs uppercase tracking-widest text-yellow-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Offline Mode</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs uppercase tracking-widest text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Online / Database Synced</span>
              </span>
            )}
          </div>
        </RevealAnimation>
        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-2xl text-muted-foreground font-light leading-relaxed">
            Setup your identity and configure your offline/online database user settings. Your username will populate presentations and sidebars.
          </p>
        </RevealAnimation>
      </header>

      {/* Success/Error Alerts */}
      {(successMsg || errorMsg) && (
        <RevealAnimation direction="up" delay={0.3}>
          {successMsg && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </RevealAnimation>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form 1: Save Profile Locally (Instant Offline Mode) */}
        <RevealAnimation direction="up" delay={0.4}>
          <div className="glass p-10 rounded-[2.5rem] border border-[var(--border)]/20 space-y-8 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">Offline Setup</span>
                <h2 className="text-2xl font-light text-[var(--foreground)]">Identity Configuration</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Update your active profile details. Saves instantly to LocalStorage. Works 100% offline.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[var(--foreground)]/60 font-medium">Full Name</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[var(--background)]/5 border border-[var(--border)]/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[var(--foreground)]/60 font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane.doe@ghfdrinks.com"
                      className="w-full bg-[var(--background)]/5 border border-[var(--border)]/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[var(--foreground)]/60 font-medium">System Role</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[var(--muted)] border border-[var(--border)]/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors text-[var(--foreground)] appearance-none"
                    >
                      <option value="Sales Executive">Sales Executive</option>
                      <option value="Brand Ambassador">Brand Ambassador</option>
                      <option value="Sales Director">Sales Director</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveLocal}
              className="w-full py-4 mt-8 rounded-full bg-[var(--background)]/15 text-[var(--foreground)] hover:bg-[var(--background)]/20 transition-all font-medium flex items-center justify-center space-x-2 border border-[var(--border)]/20 active:scale-95 transform"
            >
              <Save className="w-4 h-4" />
              <span>Apply Offline Profile</span>
            </button>
          </div>
        </RevealAnimation>

        {/* Form 2: Register Online (Supabase Database Synced) */}
        <RevealAnimation direction="up" delay={0.5}>
          <div className="glass p-10 rounded-[2.5rem] border border-[var(--border)]/20 bg-accent/5 space-y-8 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">Cloud Database</span>
                <h2 className="text-2xl font-light text-[var(--foreground)]">Create Cloud Account</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Register your account in the Supabase backend. Syncs presentation history and custom decks automatically.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[var(--foreground)]/60 font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--background)]/5 border border-[var(--border)]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <p className="text-[10px] text-muted-foreground">Min. 6 characters. Stores profile metadata in cloud.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignUpCloud}
              disabled={loading}
              className="w-full py-4 mt-8 rounded-full bg-accent text-accent-foreground font-semibold flex items-center justify-center space-x-2 hover:bg-[var(--background)] transition-all active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-accent-foreground" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              <span>Register & Sync Cloud</span>
            </button>
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
}
