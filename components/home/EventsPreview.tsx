"use client";
import Link from "next/link";
import { EVENT_HIGHLIGHTS } from "@/lib/events";
import { eventAccent } from "@/lib/tagColors";
import { MaskReveal, Rise, RiseGroup, RiseItem } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export default function EventsPreview() {
  return (
    <section style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }} className="section-pad">
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(700px 400px at 15% 20%, rgba(61,111,170,.09), transparent 65%), radial-gradient(600px 380px at 85% 75%, rgba(209,162,74,.07), transparent 65%)",
        }}
      />

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="section-header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.4rem", marginBottom: "3rem" }}>
          <div>
            <Rise y={14}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "1.1rem" }}>
                <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)" }} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Veranstaltungen
                </span>
              </div>
            </Rise>
            <MaskReveal as="h2" duration={1.05} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.02em" }}>
              Zuletzt bei ASHOR
            </MaskReveal>
          </div>

          <Rise delay={0.14} y={14}>
            <Link
              href="/events"
              className="btn-ghost link-arrow"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".55rem",
                fontFamily: "'Jost', sans-serif", background: "transparent", color: "var(--muted)",
                padding: ".9rem 1.6rem", borderRadius: "var(--r-sm)", textDecoration: "none", fontWeight: 600,
                fontSize: ".7rem", letterSpacing: ".16em", textTransform: "uppercase",
                border: "1px solid var(--line-strong)", whiteSpace: "nowrap",
              }}
            >
              Alle Veranstaltungen <ArrowRightIcon size={13} />
            </Link>
          </Rise>
        </div>

        <RiseGroup className="grid-3col" style={{ alignItems: "stretch" }}>
          {EVENT_HIGHLIGHTS.map((e, i) => {
            const accent = eventAccent(e.tag);
            return (
              <RiseItem
                key={e.title}
                className={`${i === 2 ? "hide-mobile" : ""} card-hover`}
                style={{
                  background: "var(--surface)", border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)", padding: "2rem",
                  display: "flex", flexDirection: "column", height: "100%",
                }}
              >
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: ".55rem" }}>
                  <span aria-hidden="true" style={{ display: "block", width: 14, height: 1, background: accent.text, borderRadius: "var(--r-sm)" }} />
                  {e.date}
                </div>

                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".6rem", lineHeight: 1.3 }}>
                  {e.title}
                </h3>

                {/* flex:1 pushes the tag to a shared baseline across all cards */}
                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.85, flex: 1, margin: 0 }}>
                  {e.desc}
                </p>

                <span className={accent.cls} style={{ alignSelf: "flex-start", marginTop: "1.4rem" }}>
                  {e.tag}
                </span>
              </RiseItem>
            );
          })}
        </RiseGroup>
      </div>
    </section>
  );
}
