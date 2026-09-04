"use client";
import { useId, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckIcon } from "@/components/icons";

const types = ["Mitgliedschaft", "Kooperation", "Pressekontakt", "Sonstiges"];

export default function ContactForm() {
  const id = useId();
  const [form, setForm] = useState({ name: "", email: "", institution: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("contact_submissions").insert(form);
    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

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
    marginBottom: "1.1rem",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Jost', sans-serif",
    fontSize: ".62rem",
    letterSpacing: ".2em",
    textTransform: "uppercase" as const,
    color: "var(--muted2)",
    marginBottom: ".5rem",
    fontWeight: 500,
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "2.5rem 1rem" }} role="status">
        <div style={{ color: "var(--gold)", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
          <CheckIcon size={30} />
        </div>
        <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".6rem" }}>
          Anfrage eingegangen
        </h4>
        <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8 }}>
          Wir melden uns in Kürze bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor={`${id}-name`} style={labelStyle}>Name</label>
      <input
        id={`${id}-name`}
        name="name"
        required
        autoComplete="name"
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        placeholder="Dein vollständiger Name"
        style={inputStyle}
      />

      <label htmlFor={`${id}-email`} style={labelStyle}>E-Mail-Adresse</label>
      <input
        id={`${id}-email`}
        name="email"
        required
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => set("email", e.target.value)}
        placeholder="deine@email.de"
        style={inputStyle}
      />

      <label htmlFor={`${id}-institution`} style={labelStyle}>Hochschule / Institution</label>
      <input
        id={`${id}-institution`}
        name="institution"
        autoComplete="organization"
        value={form.institution}
        onChange={(e) => set("institution", e.target.value)}
        placeholder="JGU Mainz, Goethe-Universität Frankfurt …"
        style={inputStyle}
      />

      <label htmlFor={`${id}-type`} style={labelStyle}>Anliegen</label>
      <select
        id={`${id}-type`}
        name="type"
        required
        value={form.type}
        onChange={(e) => set("type", e.target.value)}
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        <option value="">Bitte wählen</option>
        {types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label htmlFor={`${id}-message`} style={labelStyle}>Nachricht</label>
      <textarea
        id={`${id}-message`}
        name="message"
        required
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
        placeholder="Deine Nachricht an den Vorstand …"
        rows={5}
        style={{ ...inputStyle, resize: "vertical" }}
      />

      {status === "error" && (
        <p role="alert" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".78rem", color: "var(--clay)", marginBottom: ".9rem", lineHeight: 1.6 }}>
          Deine Nachricht konnte nicht gesendet werden. Bitte versuch es in ein paar Minuten erneut oder schreib uns direkt an{" "}
          <a href="mailto:ashor.jgu@gmail.com" style={{ color: "var(--gold)" }}>ashor.jgu@gmail.com</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-solid"
        style={{
          width: "100%", fontFamily: "'Jost', sans-serif", fontSize: ".7rem",
          letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700,
          background: "var(--gold-solid)", color: "var(--on-gold)", border: "none",
          borderRadius: 999, padding: "1rem", cursor: status === "sending" ? "wait" : "pointer",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Wird gesendet …" : "Anfrage absenden"}
      </button>

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".64rem", color: "var(--muted2)", marginTop: "1rem", lineHeight: 1.7, textAlign: "center" }}>
        Deine Angaben nutzen wir ausschließlich zur Bearbeitung deiner Anfrage.
      </p>
    </form>
  );
}
