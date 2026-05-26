"use client";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Tab = "announcements" | "protocols" | "members";

export default function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<Tab>("announcements");

  const tabStyle = (t: Tab) => ({
    fontFamily: "'Jost', sans-serif",
    fontSize: ".7rem",
    letterSpacing: ".18em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
    padding: ".6rem 1.2rem",
    borderRadius: 999,
    border: "1px solid",
    cursor: "pointer",
    borderColor: tab === t ? "var(--gold)" : "var(--line)",
    background: tab === t ? "var(--gold-dim)" : "transparent",
    color: tab === t ? "var(--gold)" : "var(--muted)",
  });

  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ background: "var(--surface2)", borderBottom: "1px solid var(--line)", padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>Mitgliederbereich</div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700 }}>Willkommen zurück</h1>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".78rem", color: "var(--muted2)", marginTop: ".3rem" }}>{user.email}</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", background: "none", border: "1px solid var(--line)", padding: ".5rem 1rem", borderRadius: 999, cursor: "pointer" }}
          >
            Abmelden
          </button>
        </div>
        <div style={{ maxWidth: "var(--max)", margin: "1.5rem auto 0", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <button style={tabStyle("announcements")} onClick={() => setTab("announcements")}>Ankündigungen</button>
          <button style={tabStyle("protocols")} onClick={() => setTab("protocols")}>Protokolle</button>
          <button style={tabStyle("members")} onClick={() => setTab("members")}>Mitglieder</button>
        </div>
      </div>

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {tab === "announcements" && <AnnouncementsTab />}
        {tab === "protocols" && <ProtocolsTab />}
        {tab === "members" && <MembersTab />}
      </div>
    </div>
  );
}

function AnnouncementsTab() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Ankündigungen</h2>
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2rem", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
        Noch keine Ankündigungen. Der Vorstand kann hier Neuigkeiten für Mitglieder veröffentlichen.
      </div>
    </div>
  );
}

function ProtocolsTab() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Sitzungsprotokolle</h2>
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2rem", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
        Noch keine Protokolle hochgeladen. Protokolle werden hier nach jeder Vorstandssitzung veröffentlicht.
      </div>
    </div>
  );
}

function MembersTab() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Mitgliederliste</h2>
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2rem", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
        Die Mitgliederliste ist nur für Vorstandsmitglieder sichtbar. Diese Funktion wird in Kürze freigeschaltet.
      </div>
    </div>
  );
}
