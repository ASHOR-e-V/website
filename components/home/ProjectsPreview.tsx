"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectAccent } from "@/lib/tagColors";
import { fadeUp, stagger } from "@/lib/motion";

const projects = [
  { title: "ASHOR Talks", desc: "Unsere Debattierreihe: Infovortrag plus Live-Debatte zweier Teams – lebendig, lehrreich und immer mit Überraschungen.", badge: "Laufende Serie" },
  { title: "ASHORs Stammtisch", desc: "Regelmäßige, zwanglose Treffen bei Essen und Getränken – zum gemütlichen Austausch und Kennenlernen abseits des Uni-Alltags.", badge: "Laufende Serie" },
  { title: "Bildungsreisen & Symposien", desc: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca.", badge: "Jährlich" },
];

export default function ProjectsPreview() {
  return (
    <section style={{ padding: "8rem 1.5rem" }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <motion.div {...fadeUp(0, 22)} className="section-header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.6rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,3.8vw,3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.01em" }}>Unsere Formate</h2>
          </div>
          <Link href="/projects" style={{ fontFamily: "'Jost', sans-serif", background: "transparent", color: "var(--muted)", padding: ".88rem 1.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--line)", whiteSpace: "nowrap" }}>
            Alle Projekte
          </Link>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }} className="grid-3col">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className={`${i === 2 ? "hide-mobile" : ""} card-hover`}
              style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.1rem" }}
            >
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".6rem", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.8, marginBottom: "1rem" }}>{p.desc}</p>
              <span style={{ display: "inline-block", fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: projectAccent(p.title).text, background: projectAccent(p.title).dim, padding: ".26rem .7rem", borderRadius: 999, border: `1px solid ${projectAccent(p.title).line}` }}>
                {p.badge}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
