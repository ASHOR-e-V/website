"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import LoginCard from "./LoginCard";
import Forum from "./Forum";

type Profile = { is_board: boolean; is_approved: boolean; forum_banned: boolean; full_name: string | null };

function CenteredNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 74, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem", textAlign: "center" }}>
      {children}
    </div>
  );
}

export default function ForumArea() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoadingUser(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setLoadingProfile(false); return; }
    supabase.from("profiles").select("is_board, is_approved, forum_banned, full_name").eq("id", user.id).single()
      .then(({ data, error }) => {
        if (error) console.error("profiles fetch failed:", error.message);
        setProfile(data);
        setLoadingProfile(false);
      });
  }, [user]);

  if (loadingUser || (user && loadingProfile)) {
    return (
      <CenteredNote>
        <div style={{ fontFamily: "'Jost', sans-serif", color: "var(--muted2)", fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Laden…</div>
      </CenteredNote>
    );
  }

  if (!user) return <LoginCard />;

  // Fail closed, same as Dashboard.tsx: a profile that hasn't loaded, or
  // failed to load, is treated as "not approved" — never falls through to
  // the forum just because the fetch errored.
  const isBoard = profile?.is_board ?? false;
  const isApproved = profile?.is_approved ?? false;

  if (!isBoard && !isApproved) {
    return (
      <CenteredNote>
        <div style={{ width: "100%", maxWidth: 460, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.8rem 2.5rem", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold-solid), transparent)" }} />
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>Noch nicht freigeschaltet</h1>
          <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".92rem", lineHeight: 1.85, marginBottom: "1.8rem" }}>
            Das Forum steht freigeschalteten Mitgliedern offen. Sobald der Vorstand deine Registrierung geprüft hat, kannst du hier mitlesen und schreiben.
          </p>
          <Link href="/members" className="btn-ghost" style={{ display: "inline-flex", fontFamily: "'Jost', sans-serif", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", padding: ".7rem 1.4rem", borderRadius: "var(--r-sm)", textDecoration: "none" }}>
            Zurück zum Mitgliederbereich
          </Link>
        </div>
      </CenteredNote>
    );
  }

  return (
    <Forum
      user={user}
      isBoard={isBoard}
      isBanned={profile?.forum_banned ?? false}
      displayName={profile?.full_name ?? user.email ?? "Mitglied"}
    />
  );
}
