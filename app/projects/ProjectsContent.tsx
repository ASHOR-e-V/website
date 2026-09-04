"use client";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { projectAccent } from "@/lib/tagColors";
import { Rise, RiseGroup, RiseItem } from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import Shamash from "@/components/Shamash";
import { HeartIcon } from "@/components/icons";

export default function ProjectsContent() {
  return (
    <div style={{ paddingTop: 74 }}>
      <PageHeader
        kicker="Unsere Formate"
        title="Was bei uns läuft"
        lede="Drei wiederkehrende Formate bilden das Rückgrat unserer Arbeit — von der Debattenreihe bis zur jährlichen Bildungsreise."
      />

      <div style={{ padding: "5rem 1.5rem 6rem", maxWidth: "var(--max)", margin: "0 auto" }}>
        <RiseGroup className="grid-3col" style={{ marginBottom: "5rem", alignItems: "stretch" }}>
          {PROJECTS.map((p) => {
            const accent = projectAccent(p.title);
            return (
              <RiseItem
                key={p.title}
                className="card-hover"
                style={{
                  background: "var(--surface)", border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)", padding: "2.5rem",
                  display: "flex", flexDirection: "column", height: "100%",
                  position: "relative", overflow: "hidden",
                }}
              >
                <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent.text}, transparent)` }} />

                <span
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".16em",
                    textTransform: "uppercase", color: accent.text, background: accent.dim,
                    padding: ".24rem .7rem", borderRadius: 999, border: `1px solid ${accent.line}`,
                    marginBottom: "1.2rem",
                  }}
                >
                  {p.badge}
                </span>

                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: ".9rem", lineHeight: 1.3 }}>
                  {p.title}
                </h2>

                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".94rem", lineHeight: 1.9, margin: 0 }}>
                  {p.desc}
                </p>
              </RiseItem>
            );
          })}
        </RiseGroup>

        <Rise y={24}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-lg)", padding: "3.5rem 3rem", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Shamash size={38} outline rayWidth={2.6} opacity={0.8} />
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-.01em" }}>
              ASHOR unterstützen
            </h2>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", maxWidth: 520, margin: "0 auto 2.2rem", lineHeight: 1.95 }}>
              Jede Spende ermöglicht neue Veranstaltungen, Bildungsreisen und kulturelle Projekte. Als gemeinnütziger Verein verwenden wir alle Mittel ausschließlich für die Ziele aus&nbsp;§&nbsp;2 unserer Satzung.
            </p>
            <div style={{ display: "flex", gap: ".85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://paypal.me/ashorev"
                target="_blank"
                rel="noopener"
                className="btn-solid"
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".55rem",
                  fontFamily: "'Jost', sans-serif", background: "var(--gold-solid)", color: "var(--on-gold)",
                  padding: "1rem 2.2rem", borderRadius: 999, textDecoration: "none", fontWeight: 700,
                  fontSize: ".74rem", letterSpacing: ".16em", textTransform: "uppercase",
                }}
              >
                <HeartIcon size={13} /> Per PayPal spenden
              </a>
              <Link
                href="/spenden"
                className="btn-ghost"
                style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "'Jost', sans-serif", color: "var(--muted)",
                  padding: "1rem 1.8rem", borderRadius: 999, textDecoration: "none", fontWeight: 600,
                  fontSize: ".74rem", letterSpacing: ".16em", textTransform: "uppercase",
                  border: "1px solid var(--line-strong)",
                }}
              >
                Bankverbindung
              </Link>
            </div>
          </div>
        </Rise>
      </div>
    </div>
  );
}
