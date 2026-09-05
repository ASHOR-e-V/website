"use client";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { projectAccent } from "@/lib/tagColors";
import { MaskReveal, Rise, RiseGroup, RiseItem } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export default function ProjectsPreview() {
  return (
    <section style={{ padding: "8rem 1.5rem" }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <div className="section-header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.4rem", marginBottom: "3rem" }}>
          <div>
            <Rise y={14}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "1.1rem" }}>
                <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)" }} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Formate
                </span>
              </div>
            </Rise>
            <MaskReveal as="h2" duration={1.05} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.02em" }}>
              Was wir regelmäßig machen
            </MaskReveal>
          </div>

          <Rise delay={0.14} y={14}>
            <Link
              href="/projects"
              className="btn-ghost link-arrow"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".55rem",
                fontFamily: "'Jost', sans-serif", background: "transparent", color: "var(--muted)",
                padding: ".9rem 1.6rem", borderRadius: "var(--r-sm)", textDecoration: "none", fontWeight: 600,
                fontSize: ".7rem", letterSpacing: ".16em", textTransform: "uppercase",
                border: "1px solid var(--line-strong)", whiteSpace: "nowrap",
              }}
            >
              Alle Formate <ArrowRightIcon size={13} />
            </Link>
          </Rise>
        </div>

        <RiseGroup className="grid-3col" style={{ alignItems: "stretch" }}>
          {PROJECTS.map((p) => {
            const accent = projectAccent(p.title);
            return (
              <RiseItem
                key={p.title}
                className="card-hover"
                style={{
                  background: "var(--surface)", border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)", padding: "2.1rem",
                  display: "flex", flexDirection: "column", height: "100%",
                  position: "relative", overflow: "hidden",
                }}
              >
                <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent.text}, transparent)` }} />

                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.12rem", fontWeight: 700, color: "var(--text)", marginBottom: ".7rem", lineHeight: 1.3 }}>
                  {p.title}
                </h3>

                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.85, flex: 1, margin: 0 }}>
                  {p.short}
                </p>

                <span className={accent.cls} style={{ alignSelf: "flex-start", marginTop: "1.4rem" }}>
                  {p.badge}
                </span>
              </RiseItem>
            );
          })}
        </RiseGroup>
      </div>
    </section>
  );
}
