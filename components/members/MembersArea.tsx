"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import LoginCard from "./LoginCard";
import Dashboard from "./Dashboard";

export default function MembersArea() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ paddingTop: 74, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Jost', sans-serif", color: "var(--muted2)", fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Laden…</div>
      </div>
    );
  }

  return user ? <Dashboard user={user} /> : <LoginCard />;
}
