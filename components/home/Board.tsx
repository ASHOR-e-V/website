"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const main = [
  { name: "Caroline Barsoum", role: "Präsidentin", desc: "Leitet den Verein, vertritt ASHOR nach außen und koordiniert die strategische Ausrichtung.", photo: "/team/caroline.jpeg" },
  { name: "Robina Lajin", role: "Vizepräsidentin", desc: "Unterstützt die Präsidentin, koordiniert interne Prozesse und trägt zur inhaltlichen Weiterentwicklung bei.", photo: "/team/robina.jpeg", photoZoom: 1.8 },
  { name: "Severios Isac", role: "Protokolldirektor", desc: "Erstellt und verwaltet Sitzungsprotokolle und sichert die Transparenz der Vereinsarbeit.", photo: "/team/severios.png" },
  { name: "Ninous Andersson", role: "Finanzdirektor", desc: "Verantwortet Finanzen, Mittelverwendung und Finanzberichte des Vereins.", photo: "/team/ninous.jpeg" },
];
const bei = [
  { name: "Dalia Abdo", role: "Beisitzerin", desc: "Unterstützt den Vorstand bei Planung und Durchführung von Veranstaltungen.", photo: "/team/dalia.jpeg" },
  { name: "Roben Lajin", role: "Beisitzer", desc: "Unterstützt den Vorstand bei Planung und Durchführung von Veranstaltungen.", photo: "/team/roben.jpeg" },
];

function BoardCard({ name, role, desc, photo, photoZoom, accent = "var(--gold)", accentLine = "var(--gold-line)" }: { name: string; role: string; desc: string; photo: string; photoZoom?: number; accent?: string; accentLine?: string }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "1.8rem" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", margin: "0 auto 1.2rem", border: `2px solid ${accentLine}` }}>
        <Image src={photo} alt={name} width={100} height={100} style={{ objectFit: "cover", width: "100%", height: "100%", transform: photoZoom ? `scale(${photoZoom})` : undefined }} />
      </div>
      <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: ".3rem", textAlign: "center" }}>{name}</h4>
      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: accent, marginBottom: ".8rem", fontWeight: 600, textAlign: "center" }}>{role}</div>
      <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, textAlign: "center" }}>{desc}</p>
    </motion.div>
  );
}

export default function Board() {
  return (
    <section id="vorstand" style={{ padding: "8rem 1.5rem", scrollMarginTop: 74 }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <motion.div {...fadeUp(0, 22)}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,3.8vw,3.2rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-.01em" }}>Unser Leitungsgremium</h2>
          <p style={{ color: "var(--muted)", maxWidth: 640, marginBottom: "3rem", fontFamily: "'Lora', serif" }}>
            Der Vorstand von ASHOR besteht aus sieben Mitgliedern, gewählt für zwei Semester.
          </p>
        </motion.div>

        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1rem", paddingBottom: ".6rem", borderBottom: "1px solid var(--line)" }}>Geschäftsführender Vorstand</div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }} className="grid-4col" style={{ marginBottom: "2.5rem" }}>
          {main.map(m => <BoardCard key={m.name} {...m} />)}
        </motion.div>

        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1rem", paddingBottom: ".6rem", borderBottom: "1px solid var(--line)" }}>Beisitzer</div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }} className="grid-2col" style={{ maxWidth: 640 }}>
          {bei.map(m => <BoardCard key={m.name} {...m} accent="var(--lapis-text)" accentLine="var(--lapis-line)" />)}
        </motion.div>
      </div>
    </section>
  );
}
