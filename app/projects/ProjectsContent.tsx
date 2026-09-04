"use client";
import { motion } from "framer-motion";
import { HeartIcon } from "@/components/icons";
import { projectAccent } from "@/lib/tagColors";
import { fadeUp, stagger } from "@/lib/motion";

const projects = [
  { title: "ASHOR Talks", badge: "Laufende Serie", desc: "Unsere Debattierreihe: Infovortrag plus Live-Debatte zweier Teams – lebendig, lehrreich und immer mit Überraschungen. Wir beleuchten gesellschaftliche Themen, die die assyrische Gemeinschaft bewegen." },
  { title: "ASHORs Stammtisch", badge: "Laufende Serie", desc: "Regelmäßige, zwanglose Treffen bei Essen und Getränken – zum gemütlichen Austausch und Kennenlernen abseits des Uni-Alltags. Offen für Mitglieder und Interessierte." },
  { title: "Bildungsreisen & Symposien", badge: "Jährlich", desc: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca, Spanien. Wir vernetzen uns mit assyrischen Akademikern weltweit." },
];

export default function ProjectsContent() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ padding: "6.5rem 1.5rem 3rem", background: "var(--surface2)", borderBottom: "1px solid var(--line)" }}>
        <motion.div {...fadeUp(0, 22)} style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.2rem,4.6vw,4rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.01em" }}>
            Unsere Formate.
          </h1>
        </motion.div>
      </div>

      <div style={{ padding: "5rem 1.5rem", maxWidth: "var(--max)", margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }} className="grid-3col" style={{ marginBottom: "5rem" }}>
          {projects.map((p, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: projectAccent(p.title).text, background: projectAccent(p.title).dim, padding: ".26rem .7rem", borderRadius: 999, border: `1px solid ${projectAccent(p.title).line}`, marginBottom: "1rem" }}>{p.badge}</span>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: ".8rem", lineHeight: 1.3 }}>{p.title}</h2>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".95rem", lineHeight: 1.85 }}>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0, 24)} style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-lg)", padding: "3rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, marginBottom: "1rem" }}>ASHOR unterstützen</h2>
          <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.9 }}>
            Jede Spende ermöglicht neue Veranstaltungen, Bildungsreisen und kulturelle Projekte. Als eingetragener gemeinnütziger Verein verwenden wir alle Mittel zweckgebunden.
          </p>
          <a href="https://paypal.me/ashorev" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", fontFamily: "'Jost', sans-serif", background: "var(--gold-solid)", color: "#07090E", padding: "1rem 2.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".16em", textTransform: "uppercase" }}>
            <HeartIcon size={13} /> Per PayPal spenden
          </a>
        </motion.div>
      </div>
    </div>
  );
}
