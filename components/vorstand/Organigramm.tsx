"use client";
import { motion } from "framer-motion";
import { ORGANE, SEATS_TOTAL, SEATS_FILLED } from "@/lib/vorstand";
import { MaskReveal, Rise } from "@/components/Reveal";
import Shamash from "@/components/Shamash";
import { easeOut } from "@/lib/motion";

const accentToken = {
  lapis: { text: "var(--lapis-text)", line: "var(--lapis-line)", dim: "var(--lapis-dim)", solid: "var(--lapis)" },
  gold: { text: "var(--gold)", line: "var(--gold-line)", dim: "var(--gold-dim)", solid: "var(--gold-solid)" },
  neutral: { text: "var(--muted)", line: "var(--line-strong)", dim: "var(--surface2)", solid: "var(--muted2)" },
} as const;

/**
 * A vertical connector between two organs. The rule draws itself downward as
 * it enters view and the relationship label fades in behind it — the diagram
 * assembles as you read down the page rather than arriving pre-drawn.
 */
function Connector({ label, refText, delay = 0 }: { label: string; refText: string; delay?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".7rem", padding: "1.5rem 0" }} aria-hidden="true">
      <motion.span
        data-reveal=""
        style={{ display: "block", width: 1, height: 34, background: "linear-gradient(to bottom, var(--gold-line), var(--gold-solid))", transformOrigin: "top center" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.55, delay, ease: easeOut }}
      />
      <motion.span
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.5, delay: delay + 0.28, ease: easeOut }}
        style={{
          display: "inline-flex", alignItems: "center", gap: ".5rem",
          fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".18em",
          textTransform: "uppercase", color: "var(--muted2)",
          border: "1px solid var(--line)", background: "var(--surface)",
          padding: ".34rem .85rem", borderRadius: 999, whiteSpace: "nowrap",
        }}
      >
        {label}
        <span style={{ color: "var(--gold)", letterSpacing: ".08em" }}>{refText}</span>
      </motion.span>
      <motion.span
        data-reveal=""
        style={{ display: "block", width: 1, height: 34, background: "linear-gradient(to bottom, var(--gold-solid), var(--gold-line))", transformOrigin: "top center" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.55, delay: delay + 0.45, ease: easeOut }}
      />
      <motion.svg
        width="11" height="8" viewBox="0 0 11 8" fill="none"
        initial={{ opacity: 0, y: -4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.4, delay: delay + 0.85, ease: easeOut }}
        style={{ marginTop: -4 }}
      >
        <path d="M5.5 8 0 0h11L5.5 8Z" fill="var(--gold-solid)" />
      </motion.svg>
    </div>
  );
}

function OrganCard({ organ, index }: { organ: (typeof ORGANE)[number]; index: number }) {
  const c = accentToken[organ.accent];
  const isVorstand = organ.id === "vorstand";

  return (
    <Rise delay={index * 0.06} y={26}>
      <div
        className="card-hover"
        style={{
          background: isVorstand ? "var(--surface3)" : "var(--surface)",
          border: `1px solid ${isVorstand ? c.line : "var(--line)"}`,
          borderRadius: "var(--r-lg)",
          padding: "2.2rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent rule along the top edge */}
        <span
          aria-hidden="true"
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c.solid}, transparent)` }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: ".9rem" }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase", color: c.text, fontWeight: 600 }}>
            {organ.kicker}
          </span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".1em", color: "var(--muted2)", border: "1px solid var(--line)", borderRadius: 999, padding: ".16rem .55rem", flexShrink: 0 }}>
            {organ.ref}
          </span>
        </div>

        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.15rem,2vw,1.4rem)", fontWeight: 700, color: "var(--text)", lineHeight: 1.25, marginBottom: ".8rem", letterSpacing: "-.005em" }}>
          {organ.name}
        </h3>

        {isVorstand && (
          <div style={{ display: "flex", alignItems: "baseline", gap: ".5rem", marginBottom: ".9rem" }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              {SEATS_FILLED}
            </span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted2)" }}>
              von {SEATS_TOTAL} Sitzen besetzt
            </span>
          </div>
        )}

        <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.85, marginBottom: "1.3rem" }}>
          {organ.desc}
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".55rem", borderTop: "1px solid var(--line)", paddingTop: "1.1rem" }}>
          {organ.facts.map((f) => (
            <li key={f} style={{ display: "flex", gap: ".65rem", alignItems: "flex-start" }}>
              <span aria-hidden="true" style={{ width: 4, height: 4, borderRadius: "50%", background: c.solid, flexShrink: 0, marginTop: ".55rem" }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".76rem", color: "var(--muted)", lineHeight: 1.6 }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </Rise>
  );
}

export default function Organigramm() {
  const [mv, vorstand, mitglieder] = ORGANE;

  return (
    <section id="organe" style={{ padding: "7rem 1.5rem", position: "relative", overflow: "hidden", scrollMarginTop: 100 }} className="section-pad">
      {/* Faint sun disc anchoring the section */}
      <div aria-hidden="true" style={{ position: "absolute", top: "12%", left: "-8%", opacity: 0.035, pointerEvents: "none" }}>
        <Shamash size={520} outline rayWidth={1.5} />
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Rise y={18}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.2rem", textAlign: "center" }}>
            Organe des Vereins · § 6
          </div>
        </Rise>

        <MaskReveal as="h2" style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.015em", textAlign: "center", marginBottom: "1.2rem" }}>
          Wie ASHOR entscheidet
        </MaskReveal>

        <Rise delay={0.2} y={18}>
          <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".98rem", lineHeight: 1.95, textAlign: "center", maxWidth: 560, margin: "0 auto 1rem" }}>
            Zwei Organe, klar getrennt: Die Mitgliederversammlung beschließt, der Vorstand führt aus. Jede Position und jede Mehrheit steht in der Satzung.
          </p>
        </Rise>

        {/* ── The flow ── */}
        <div style={{ marginTop: "3.5rem" }}>
          <OrganCard organ={mv} index={0} />
          <Connector label="wählt für zwei Semester" refText="§ 8 (1)" />
          <OrganCard organ={vorstand} index={0} />
          <Connector label="entscheidet über Aufnahme" refText="§ 4 (2)" />
          <OrganCard organ={mitglieder} index={0} />

          {/* The loop closes: members become the assembly that elects the board */}
          <Rise delay={0.1} y={16}>
            <div
              style={{
                marginTop: "1.6rem", display: "flex", alignItems: "center", justifyContent: "center", gap: ".7rem",
                fontFamily: "'Jost', sans-serif", fontSize: ".68rem", letterSpacing: ".1em", color: "var(--muted2)",
                border: "1px dashed var(--line-strong)", borderRadius: "var(--r-md)", padding: "1rem 1.4rem", textAlign: "center",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--lapis-text)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
                <path d="M18.4 2.6v3.6h-3.6" />
              </svg>
              <span>Vollmitglieder bilden wiederum die Mitgliederversammlung — der Kreis schließt sich.</span>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
