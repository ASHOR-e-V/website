"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const types = ["Mitgliedschaft", "Kooperation", "Pressekontakt", "Sonstiges"];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", institution: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("contact_submissions").insert(form);
    if (error) { setErrorMsg(error.message); setStatus("error"); }
    else setStatus("success");
  };

  const inputStyle = {
    width: "100%", background: "var(--surface2)", border: "1px solid var(--line)",
    borderRadius: "var(--r-sm)", color: "var(--text)", padding: ".75rem 1rem",
    fontFamily: "'Jost', sans-serif", fontSize: ".85rem", outline: "none",
    marginBottom: ".75rem", boxSizing: "border-box" as const,
  };

  if (status === "success") return (
    <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>✦</div>
      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".6rem" }}>Anfrage eingegangen</h3>
      <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8 }}>Wir melden uns in Kürze bei dir.</p>
    </div>
  );

  return (
    <form onSubmit={submit}>
      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>Name</div>
      <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Ihr vollständiger Name" style={inputStyle} />

      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>E-Mail-Adresse</div>
      <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ihre@email.de" style={inputStyle} />

      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>Hochschule / Institution</div>
      <input value={form.institution} onChange={e => set("institution", e.target.value)} placeholder="JGU Mainz, Goethe-Universität Frankfurt …" style={inputStyle} />

      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>Anfrageart</div>
      <select required value={form.type} onChange={e => set("type", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
        <option value="">Bitte wählen</option>
        {types.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>Nachricht</div>
      <textarea required value={form.message} onChange={e => set("message", e.target.value)} placeholder="Ihre Nachricht an den Vorstand …" rows={5} style={{ ...inputStyle, resize: "vertical" }} />

      {status === "error" && (
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".78rem", color: "#e05555", marginBottom: ".75rem" }}>Fehler: {errorMsg || "Bitte versuche es erneut."}</p>
      )}

      <button type="submit" disabled={status === "sending"} style={{ width: "100%", fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, background: "var(--gold-dim)", color: "var(--gold)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-sm)", padding: "1rem", cursor: "pointer" }}>
        {status === "sending" ? "Wird gesendet …" : "Anfrage absenden"}
      </button>
    </form>
  );
}
