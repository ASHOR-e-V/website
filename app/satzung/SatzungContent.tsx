"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PRAEAMBEL, PARAGRAPHS, HISTORIE, SATZUNG_FASSUNG } from "@/lib/satzung";
import { Rise } from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import Shamash, { ShamashDivider } from "@/components/Shamash";
import { DownloadIcon } from "@/components/icons";

export default function SatzungContent() {
  const [active, setActive] = useState<string>("praeambel");
  const docRef = useRef<HTMLDivElement>(null);

  // Reading progress across the document body only (not the whole page),
  // so the bar reads "how much of the Satzung have I read".
  const { scrollYProgress } = useScroll({ target: docRef, offset: ["start 20%", "end 80%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Highlight the paragraph currently nearest the top of the viewport.
  useEffect(() => {
    const ids = ["praeambel", ...PARAGRAPHS.map((p) => p.id)];
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ paddingTop: 74 }}>
      <PageHeader
        kicker="Assyrische Hochschulgruppe Rhein-Main e.V."
        title="Satzung"
        lede={`Die vollständige, geltende Satzung des Vereins — ${SATZUNG_FASSUNG}, beschlossen von der Mitgliederversammlung.`}
      >
        <Rise delay={0.38} y={16}>
          <a
            href="/ASHOR-Satzung-14-03-2026.pdf"
            target="_blank"
            rel="noopener"
            className="btn-solid"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".6rem", marginTop: "2.2rem",
              fontFamily: "'Jost', sans-serif", background: "var(--gold-solid)", color: "var(--on-gold)",
              padding: ".95rem 1.9rem", borderRadius: 999, textDecoration: "none", fontWeight: 700,
              fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase",
            }}
          >
            <DownloadIcon size={14} /> Satzung als PDF
          </a>
        </Rise>
      </PageHeader>

      {/* ── Reading progress ── */}
      <div style={{ position: "sticky", top: 74, zIndex: 50, height: 2, background: "transparent" }}>
        <motion.div style={{ height: "100%", background: "var(--gold-solid)", transformOrigin: "0% 50%", scaleX: progress }} />
      </div>

      <div ref={docRef} className="satzung-layout" style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "4.5rem 1.5rem 6rem" }}>
        {/* ── Sticky index ── */}
        <nav className="satzung-toc" aria-label="Inhaltsverzeichnis der Satzung">
          <div style={{ position: "sticky", top: 118 }}>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".24em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1.1rem", paddingBottom: ".7rem", borderBottom: "1px solid var(--line)" }}>
              Inhalt
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".1rem" }}>
              {[{ id: "praeambel", num: "", title: "Präambel" }, ...PARAGRAPHS].map((p) => {
                const isActive = active === p.id;
                return (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      style={{
                        display: "flex", gap: ".55rem", alignItems: "baseline",
                        fontFamily: "'Jost', sans-serif", fontSize: ".76rem", lineHeight: 1.45,
                        textDecoration: "none", padding: ".38rem .6rem", borderRadius: 6,
                        color: isActive ? "var(--text)" : "var(--muted2)",
                        background: isActive ? "var(--gold-dim)" : "transparent",
                        borderLeft: `2px solid ${isActive ? "var(--gold-solid)" : "transparent"}`,
                        transition: "color .2s, background .2s, border-color .2s",
                      }}
                    >
                      {p.num && <span style={{ color: isActive ? "var(--gold)" : "var(--muted2)", fontVariantNumeric: "tabular-nums", flexShrink: 0, fontWeight: 600 }}>{p.num}</span>}
                      <span>{p.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* ── Document body ── */}
        <article style={{ minWidth: 0 }}>
          {/* Präambel — set apart as the document's opening statement */}
          <section id="praeambel" style={{ scrollMarginTop: 120, marginBottom: "4.5rem" }}>
            <Rise y={20}>
              <div style={{ display: "flex", alignItems: "center", gap: ".9rem", marginBottom: "1.8rem" }}>
                <Shamash size={19} outline rayWidth={3.6} />
                <h2 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Präambel
                </h2>
              </div>
            </Rise>

            {PRAEAMBEL.map((para, i) => (
              <Rise key={i} delay={i * 0.04} y={18}>
                <p
                  style={{
                    fontFamily: "'Lora', serif",
                    color: i === 0 ? "var(--text)" : "var(--muted)",
                    fontSize: i === 0 ? "1.06rem" : ".97rem",
                    lineHeight: i === 0 ? 1.95 : 1.95,
                    marginBottom: "1.35rem",
                  }}
                >
                  {para}
                </p>
              </Rise>
            ))}
          </section>

          <div style={{ margin: "0 0 4.5rem" }}>
            <ShamashDivider />
          </div>

          {/* Paragraphs */}
          {PARAGRAPHS.map((p, i) => (
            <section
              key={p.id}
              id={p.id}
              style={{
                scrollMarginTop: 120,
                paddingBottom: "3rem",
                marginBottom: "3rem",
                borderBottom: i < PARAGRAPHS.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <Rise y={22}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.1rem", marginBottom: "1.4rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 700,
                      color: "var(--gold)", flexShrink: 0, letterSpacing: "-.01em", lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {p.num}
                  </span>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.15rem,2.2vw,1.55rem)", fontWeight: 700, color: "var(--text)", lineHeight: 1.25, letterSpacing: "-.005em" }}>
                    {p.title}
                  </h2>
                </div>
                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2.05, whiteSpace: "pre-line", fontSize: ".96rem" }}>
                  {p.content}
                </p>
              </Rise>
            </section>
          ))}

          {/* Änderungshistorie */}
          <Rise y={22}>
            <div style={{ marginTop: "4rem", padding: "2.5rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)" }}>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".24em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1.5rem" }}>
                Änderungshistorie
              </div>
              <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {HISTORIE.map((h, i) => (
                  <li key={h.date} style={{ display: "flex", gap: "1.1rem", alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: ".92rem",
                        color: i === HISTORIE.length - 1 ? "var(--gold)" : "var(--muted2)",
                        flexShrink: 0, fontVariantNumeric: "tabular-nums", minWidth: "5.6rem",
                      }}
                    >
                      {h.date}
                    </span>
                    <span style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.7 }}>
                      {h.label}
                      {i === HISTORIE.length - 1 && (
                        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold)", background: "var(--gold-dim)", border: "1px solid var(--gold-line)", borderRadius: 999, padding: ".18rem .6rem", marginLeft: ".7rem", whiteSpace: "nowrap" }}>
                          Geltende Fassung
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Rise>
        </article>
      </div>
    </div>
  );
}
