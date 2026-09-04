"use client";
import type { ReactNode } from "react";
import { MaskReveal, Rise } from "@/components/Reveal";
import Shamash from "@/components/Shamash";

/**
 * The masthead every sub-page opens with.
 *
 * Beyond consistency this guarantees each page has exactly one <h1>: several
 * pages previously reused home-page sections whose top heading was an <h2>,
 * leaving them with no <h1> at all.
 */
export default function PageHeader({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header style={{ position: "relative", overflow: "hidden", background: "var(--surface2)", borderBottom: "1px solid var(--line)" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)", opacity: 0.05, pointerEvents: "none", lineHeight: 0 }}>
        <Shamash size={440} outline rayWidth={1.7} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--max)", margin: "0 auto", padding: "6.5rem 1.5rem 4rem" }}>
        <Rise duration={0.7} y={14}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "1.4rem" }}>
            <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)" }}>
              {kicker}
            </span>
          </div>
        </Rise>

        <MaskReveal as="h1" duration={1.1} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.4rem,6vw,4.8rem)", fontWeight: 700, lineHeight: 1.03, letterSpacing: "-.02em" }}>
          {title}
        </MaskReveal>

        {lede && (
          <Rise delay={0.24} y={18}>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: "1rem", lineHeight: 1.95, maxWidth: 560, marginTop: "1.5rem" }}>
              {lede}
            </p>
          </Rise>
        )}

        {children}
      </div>
    </header>
  );
}
