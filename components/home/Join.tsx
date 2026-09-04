"use client";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { DotIcon } from "@/components/icons";
import { fadeUp } from "@/lib/motion";

const perks = [
  "Zugang zum internen Mitgliederbereich",
  "Einladungen zu allen Veranstaltungen und Formaten",
  "Studienberatung, Mentoring und Netzwerkzugang",
  "Stimmrecht als Vollmitglied ab 2 Veranstaltungen/Semester",
];

export default function Join() {
  return (
    <section id="mitmachen" style={{ padding: "8rem 1.5rem", position: "relative", scrollMarginTop: 74 }} className="section-pad">
      <div style={{ position: "absolute", inset: 0, background: "var(--surface2)" }} />
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="grid-2col">
          <motion.div {...fadeUp(0, 24)}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,3.8vw,3.2rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.2rem", letterSpacing: "-.01em" }}>
              Teil von ASHOR<br />werden.
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: "2rem", maxWidth: 400, fontFamily: "'Lora', serif" }}>
              Mitglied können alle eingeschriebenen Studierenden und Alumni im Rhein-Main-Gebiet werden. Die Mitgliedschaft ist beitragsfrei.
            </p>
            {perks.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: ".9rem" }}>
                <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: ".55rem" }}><DotIcon size={6} /></span>
                <p style={{ color: "var(--muted)", fontSize: ".88rem", margin: 0, fontFamily: "'Lora', serif" }}>{p}</p>
              </div>
            ))}
            <div style={{ marginTop: "2rem", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <a href="https://www.instagram.com/ashor_e.v/" target="_blank" rel="noopener" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", padding: ".4rem .9rem", borderRadius: 999, textDecoration: "none" }}>Instagram</a>
              <a href="https://www.tiktok.com/@ashor_e.v" target="_blank" rel="noopener" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", padding: ".4rem .9rem", borderRadius: 999, textDecoration: "none" }}>TikTok</a>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.15, 24)} style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-lg)", padding: "2.5rem" }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: ".4rem" }}>Kontakt aufnehmen</h3>
            <p style={{ color: "var(--muted2)", fontSize: ".78rem", marginBottom: "1.5rem", fontFamily: "'Jost', sans-serif" }}>Für Mitgliedschaft, Kooperationen und Pressekontakt</p>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
