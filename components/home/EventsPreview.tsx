"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { eventAccent } from "@/lib/tagColors";
import { fadeUp, stagger } from "@/lib/motion";

const events = [
  { date: "Mai 2025", title: "ASHOR Talks #2", desc: "Infovortrag und Live-Debatte: Frei geboren, traditionell geprägt – Wie modern darf ich in der Diaspora sein?", tag: "Vortrag & Debatte" },
  { date: "April 2025", title: "Spanienreise & Symposium Salamanca", desc: "Teilnahme am Niniveh Academic Chair of Salamanca 2025 – akademischer Austausch mit assyrischen Professoren und Akademikern aus der ganzen Welt.", tag: "Bildungsreise" },
  { date: "März 2025", title: "ASHORs Khigga #2", desc: "Assyrische Tänze Schritt für Schritt lernen und gemeinsam tanzen – Vorkenntnisse nicht nötig.", tag: "Kultur" },
];

export default function EventsPreview() {
  return (
    <section style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }} className="section-pad">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(700px 400px at 15% 20%,rgba(61,111,170,.09),transparent 65%), radial-gradient(600px 380px at 85% 75%,rgba(201,168,76,.07),transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp(0, 22)} className="section-header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.6rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,3.8vw,3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.01em" }}>Ausgewählte Highlights</h2>
          </div>
          <Link href="/events" style={{ fontFamily: "'Jost', sans-serif", background: "transparent", color: "var(--muted)", padding: ".88rem 1.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--line)", whiteSpace: "nowrap" }}>
            Alle Veranstaltungen
          </Link>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }} className="grid-3col">
          {events.map((e, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className={`${i === 2 ? "hide-mobile" : ""} card-hover`}
              style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2rem" }}
            >
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".63rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".6rem", display: "flex", alignItems: "center", gap: ".55rem" }}>
                <span style={{ display: "block", width: 12, height: 1, background: "var(--gold)", borderRadius: 999 }} />
                {e.date}
              </div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".55rem", lineHeight: 1.3 }}>{e.title}</h3>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.8 }}>{e.desc}</p>
              <span style={{ display: "inline-block", marginTop: ".9rem", fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: eventAccent(e.tag).text, background: eventAccent(e.tag).dim, padding: ".26rem .7rem", borderRadius: 999, border: `1px solid ${eventAccent(e.tag).line}` }}>
                {e.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
