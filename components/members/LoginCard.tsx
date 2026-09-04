"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

/**
 * Supabase returns its auth errors in English. Showing them raw on a German
 * site reads like a crash; these are the ones a member can actually hit.
 */
function germanAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-Mail-Adresse oder Passwort ist nicht korrekt.";
  if (m.includes("email not confirmed")) return "Bitte bestätige zuerst den Link in deiner Bestätigungs-E-Mail.";
  if (m.includes("user already registered")) return "Für diese E-Mail-Adresse gibt es bereits ein Konto. Melde dich stattdessen an.";
  if (m.includes("password should be at least")) return "Das Passwort muss mindestens 6 Zeichen lang sein.";
  if (m.includes("unable to validate email") || m.includes("invalid email")) return "Diese E-Mail-Adresse sieht nicht gültig aus.";
  if (m.includes("rate limit") || m.includes("too many")) return "Zu viele Versuche. Bitte warte einen Moment und versuch es erneut.";
  if (m.includes("network") || m.includes("fetch")) return "Keine Verbindung zum Server. Bitte prüf deine Internetverbindung.";
  return "Das hat leider nicht geklappt. Bitte versuch es erneut oder schreib uns an ashor.jgu@gmail.com.";
}

export default function LoginCard() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    background: "var(--surface2)",
    border: "1px solid var(--line)",
    borderRadius: "var(--r-sm)",
    color: "var(--text)",
    padding: ".8rem 1rem",
    fontFamily: "'Jost', sans-serif",
    fontSize: ".85rem",
    outline: "none",
    marginBottom: "1rem",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontFamily: "'Jost', sans-serif",
    fontSize: ".62rem",
    letterSpacing: ".2em",
    textTransform: "uppercase" as const,
    color: "var(--muted2)",
    display: "block",
    marginBottom: ".45rem",
    fontWeight: 500,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setSentTo("");
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(germanAuthError(error.message));
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          // Without this the confirmation link points at whatever "Site URL"
          // is configured in Supabase — often still localhost. The origin has
          // to be listed under Authentication → URL Configuration → Redirect URLs.
          options: { emailRedirectTo: `${window.location.origin}/members` },
        });

        if (error) {
          setError(germanAuthError(error.message));
        } else if (data.session) {
          // A session came straight back, which means e-mail confirmation is
          // switched off for this project. Nothing was sent and nothing needs
          // confirming — MembersArea picks the session up and swaps the view.
          setInfo("Konto erstellt. Du bist angemeldet.");
        } else if (data.user && data.user.identities?.length === 0) {
          // Supabase returns a success with an empty identities array when the
          // address already has an account, so that sign-up cannot be used to
          // probe which e-mail addresses are registered. No mail goes out.
          setError("Für diese E-Mail-Adresse gibt es bereits ein Konto. Melde dich an oder setz dein Passwort zurück.");
        } else {
          setSentTo(email);
          setInfo("Bestätigungs-E-Mail gesendet. Bitte prüf dein Postfach — auch den Spam-Ordner.");
        }
      }
    } catch {
      setError("Keine Verbindung zum Server. Bitte prüf deine Internetverbindung.");
    }
    setLoading(false);
  };

  const resend = async () => {
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: sentTo,
        options: { emailRedirectTo: `${window.location.origin}/members` },
      });
      if (error) setError(germanAuthError(error.message));
      else setInfo("Bestätigungs-E-Mail erneut gesendet.");
    } catch {
      setError("Keine Verbindung zum Server. Bitte prüf deine Internetverbindung.");
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 74, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.5rem", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold-solid), transparent)" }} />

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image src="/logo.png" alt="" width={64} height={64} sizes="64px" className="logo-img" style={{ objectFit: "contain", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: ".4rem", letterSpacing: "-.005em" }}>
            Mitgliederbereich
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", color: "var(--muted2)", letterSpacing: ".12em" }}>
            {mode === "login" ? "Melde dich an" : "Erstelle ein Konto"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor={`${id}-email`} style={labelStyle}>E-Mail</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            placeholder="deine@email.de"
          />

          <label htmlFor={`${id}-password`} style={labelStyle}>Passwort</label>
          <input
            id={`${id}-password`}
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ ...inputStyle, marginBottom: "1.5rem" }}
            placeholder="••••••••"
          />

          {error && (
            <p role="alert" style={{ color: "var(--clay)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem", marginBottom: "1rem", lineHeight: 1.65 }}>
              {error}
            </p>
          )}
          {info && (
            <p role="status" style={{ color: "var(--gold)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem", marginBottom: "1rem", lineHeight: 1.65 }}>
              {info}
            </p>
          )}
          {sentTo && (
            <button
              type="button"
              onClick={resend}
              disabled={loading}
              style={{
                background: "none", border: "none", padding: 0, marginBottom: "1rem",
                cursor: loading ? "wait" : "pointer", fontFamily: "'Jost', sans-serif",
                fontSize: ".72rem", color: "var(--muted2)", textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Keine E-Mail erhalten? Erneut senden
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-solid"
            style={{
              width: "100%", background: "var(--gold-solid)", color: "var(--on-gold)", padding: ".95rem",
              borderRadius: 999, fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: ".74rem",
              letterSpacing: ".16em", textTransform: "uppercase", border: "none",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Einen Moment …" : mode === "login" ? "Anmelden" : "Registrieren"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            type="button"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setInfo(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: ".72rem", color: "var(--muted2)", letterSpacing: ".08em", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            {mode === "login" ? "Noch kein Konto? Registrieren" : "Bereits registriert? Anmelden"}
          </button>
        </div>
      </div>
    </div>
  );
}
