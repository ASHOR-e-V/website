"use client";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    background: "var(--surface2)",
    border: "1px solid var(--line)",
    borderRadius: "var(--r-sm)",
    color: "var(--text)",
    padding: ".75rem 1rem",
    fontFamily: "'Jost', sans-serif",
    fontSize: ".85rem",
    outline: "none",
    marginBottom: "1rem",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setInfo("Bestätigungs-E-Mail gesendet. Bitte prüfe dein Postfach.");
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 74, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.5rem", boxShadow: "var(--shadow)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "2rem", right: "2rem", height: 1, background: "var(--gold)" }} />
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image src="/logo.png" alt="ASHOR Logo" width={64} height={64} className="logo-img" style={{ objectFit: "contain", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: ".3rem" }}>Mitgliederbereich</h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".72rem", color: "var(--muted2)", letterSpacing: ".1em" }}>
            {mode === "login" ? "Melde dich an" : "Registriere dich"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted2)", display: "block", marginBottom: ".4rem" }}>E-Mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} placeholder="deine@email.de" />

          <label style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted2)", display: "block", marginBottom: ".4rem" }}>Passwort</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ ...inputStyle, marginBottom: "1.5rem" }} placeholder="••••••••" />

          {error && <p style={{ color: "#e05c5c", fontFamily: "'Jost', sans-serif", fontSize: ".78rem", marginBottom: "1rem" }}>{error}</p>}
          {info && <p style={{ color: "var(--gold)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem", marginBottom: "1rem" }}>{info}</p>}

          <button type="submit" disabled={loading} style={{ width: "100%", background: "var(--gold-dim)", color: "var(--text)", padding: ".9rem", borderRadius: 999, fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: ".75rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--gold-line)", cursor: "pointer" }}>
            {loading ? "…" : mode === "login" ? "Anmelden" : "Registrieren"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setInfo(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: ".72rem", color: "var(--muted2)", letterSpacing: ".1em" }}>
            {mode === "login" ? "Noch kein Konto? Registrieren" : "Bereits registriert? Anmelden"}
          </button>
        </div>
      </div>
    </div>
  );
}
