"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowRightIcon } from "@/components/icons";

const MITGLIEDSANTRAG_URL = "https://forms.gle/ikGrceeTmnzDKaCU8";

/**
 * Supabase returns its auth errors in English. Showing them raw on a German
 * site reads like a crash; these are the ones a member can actually hit.
 */
function germanAuthError(message: string): string {
  const m = message.toLowerCase();
  // Already German — raised by the sign-up hook in the database.
  if (m.includes("ashor-mitglied")) return message;
  if (m.includes("invalid login credentials")) return "E-Mail-Adresse oder Passwort ist nicht korrekt.";
  if (m.includes("email not confirmed")) return "Bitte bestätige zuerst den Link in deiner Bestätigungs-E-Mail.";
  if (m.includes("user already registered")) return "Für diese E-Mail-Adresse gibt es bereits ein Konto. Melde dich stattdessen an.";
  if (m.includes("password should be at least")) return "Das Passwort muss mindestens 6 Zeichen lang sein.";
  if (m.includes("unable to validate email") || m.includes("invalid email")) return "Diese E-Mail-Adresse sieht nicht gültig aus.";
  if (m.includes("rate limit") || m.includes("too many")) return "Zu viele Versuche. Bitte warte einen Moment und versuch es erneut.";
  if (m.includes("network") || m.includes("fetch")) return "Keine Verbindung zum Server. Bitte prüf deine Internetverbindung.";
  return "Das hat leider nicht geklappt. Bitte versuch es erneut oder schreib uns an ashor.jgu@gmail.com.";
}

const linkButtonStyle = {
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  fontFamily: "'Jost', sans-serif",
  fontSize: ".72rem",
  color: "var(--muted2)",
  letterSpacing: ".08em",
  textDecoration: "underline",
  textUnderlineOffset: 3,
} as const;

type Mode = "login" | "gate" | "register" | "no-member";

export default function LoginCard() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => { setError(""); setInfo(""); setSentTo(""); };
  const go = (m: Mode) => { reset(); setMode(m); };

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

  const primaryButton = {
    width: "100%", background: "var(--gold-solid)", color: "var(--on-gold)", padding: ".95rem",
    borderRadius: "var(--r-sm)", fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: ".74rem",
    letterSpacing: ".16em", textTransform: "uppercase" as const, border: "none", cursor: "pointer",
  };

  const secondaryButton = {
    width: "100%", background: "transparent", color: "var(--text)", padding: ".95rem",
    borderRadius: "var(--r-sm)", fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: ".74rem",
    letterSpacing: ".16em", textTransform: "uppercase" as const,
    border: "1px solid var(--line-strong)", cursor: "pointer",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();
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
          // to be listed under Authentication → URL Configuration.
          options: { emailRedirectTo: `${window.location.origin}/members` },
        });

        if (error) {
          setError(germanAuthError(error.message));
        } else if (data.session) {
          // A session came straight back, so e-mail confirmation is switched
          // off for this project. Nothing was sent and nothing needs
          // confirming — MembersArea picks the session up and swaps the view.
          setInfo("Konto erstellt. Du bist angemeldet.");
        } else if (data.user && data.user.identities?.length === 0) {
          // Supabase returns success with an empty identities array when the
          // address already has an account, so sign-up cannot be used to probe
          // which addresses are registered. No mail goes out in that case.
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

  const subtitle =
    mode === "login" ? "Melde dich an"
      : mode === "gate" ? "Nur für Mitglieder"
        : mode === "register" ? "Erstelle dein Konto"
          : "Werde zuerst Mitglied";

  return (
    <div style={{ paddingTop: 74, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem" }}>
      <div style={{ width: "100%", maxWidth: 430, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold-solid), transparent)" }} />

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image src="/logo.png" alt="" width={64} height={64} sizes="64px" className="logo-img" style={{ objectFit: "contain", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: ".5rem", letterSpacing: "-.005em" }}>
            Mitgliederbereich
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", color: "var(--muted2)", letterSpacing: ".12em" }}>
            {subtitle}
          </p>
        </div>

        {/* Gate. This question routes people; it does not protect anything.
            The actual control is in the database — see
            supabase/mitgliederbereich-absichern.sql. */}
        {mode === "gate" && (
          <div>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".92rem", lineHeight: 1.85, marginBottom: "1.8rem", textAlign: "center" }}>
              Der Mitgliederbereich steht ausschliesslich Mitgliedern von ASHOR offen. Bist du bereits Mitglied?
            </p>
            <button type="button" onClick={() => go("register")} className="btn-solid" style={{ ...primaryButton, marginBottom: ".7rem" }}>
              Ja, ich bin Mitglied
            </button>
            <button type="button" onClick={() => go("no-member")} className="btn-ghost" style={secondaryButton}>
              Noch nicht
            </button>
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button type="button" onClick={() => go("login")} style={linkButtonStyle}>Zurück zur Anmeldung</button>
            </div>
          </div>
        )}

        {mode === "no-member" && (
          <div>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".92rem", lineHeight: 1.85, marginBottom: "1.8rem" }}>
              Kein Problem — die Mitgliedschaft ist beitragsfrei und steht eingeschriebenen Studierenden, Alumni sowie Personen mit Bachelor oder Master Professional offen. Stell einfach einen Antrag, der Vorstand meldet sich bei dir.
            </p>
            <a
              href={MITGLIEDSANTRAG_URL}
              target="_blank"
              rel="noopener"
              className="btn-solid link-arrow"
              style={{ ...primaryButton, display: "flex", alignItems: "center", justifyContent: "center", gap: ".6rem", textDecoration: "none", marginBottom: ".7rem" }}
            >
              Mitgliedsantrag stellen <ArrowRightIcon size={13} />
            </a>
            <a
              href="/mitmachen"
              className="btn-ghost"
              style={{ ...secondaryButton, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
            >
              Erst mehr erfahren
            </a>
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button type="button" onClick={() => go("gate")} style={linkButtonStyle}>Zurück</button>
            </div>
          </div>
        )}

        {(mode === "login" || mode === "register") && (
          <>
            {mode === "register" && (
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".72rem", color: "var(--muted2)", lineHeight: 1.7, marginBottom: "1.6rem", paddingBottom: "1.2rem", borderBottom: "1px solid var(--line)" }}>
                Bitte nimm die E-Mail-Adresse, die dem Verein als Mitglied bekannt ist. Andere Adressen weist das System ab.
              </p>
            )}

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
                <button type="button" onClick={resend} disabled={loading} style={{ ...linkButtonStyle, marginBottom: "1rem" }}>
                  Keine E-Mail erhalten? Erneut senden
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-solid"
                style={{ ...primaryButton, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Einen Moment …" : mode === "login" ? "Anmelden" : "Konto erstellen"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button type="button" onClick={() => go(mode === "login" ? "gate" : "login")} style={linkButtonStyle}>
                {mode === "login" ? "Noch kein Konto? Registrieren" : "Bereits registriert? Anmelden"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
