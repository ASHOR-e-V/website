"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { EVENTS } from "@/lib/events";
import { eventAccent } from "@/lib/tagColors";
import { Rise } from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import { ArrowRightIcon } from "@/components/icons";

/**
 * The chronicle as a timeline with a rail that fills as you scroll.
 *
 * The rail is two stacked lines: a static faint one for the full extent, and
 * a gold one on top whose scaleY is bound to scroll progress through the
 * list. That gives a continuous sense of position without any per-item
 * scroll listeners.
 */
export default function EventsContent() {
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 60%"] });
  const railScale = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <div style={{ paddingTop: 74 }}>
      <PageHeader
        kicker="Seit Oktober 2024"
        title="Was bisher geschah"
        lede="Jede Veranstaltung, die ASHOR seit der Gründung organisiert hat — Vorträge, Debatten, Tanzabende und Reisen."
      />

      {/* Timeline */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>
        <div ref={listRef} style={{ position: "relative" }}>
        {/* The rail — one continuous spine behind every row. Its horizontal
            position matches the grid column width set in globals.css. */}
        <div className="timeline-rail" aria-hidden="true">
          <span style={{ position: "absolute", inset: 0, background: "var(--line)" }} />
          <motion.span
            data-rail=""
            style={{
              position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--gold-solid), var(--clay))",
              transformOrigin: "top center", scaleY: railScale,
            }}
          />
        </div>

        {EVENTS.map((e, i) => {
          const accent = eventAccent(e.tag);
          const showYear = i === 0 || EVENTS[i - 1].year !== e.year;

          return (
            <div key={`${e.title}-${e.date}`}>
              {showYear && (
                <Rise y={14}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem", marginTop: i === 0 ? 0 : "2.5rem" }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "var(--gold)", lineHeight: 1, letterSpacing: "-.02em", fontVariantNumeric: "tabular-nums" }}>
                      {e.year}
                    </span>
                    <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--line)" }} />
                  </div>
                </Rise>
              )}

              <div className="timeline-row" style={{ position: "relative", zIndex: 1, paddingBottom: "2.5rem" }}>
                {/* Rail column */}
                <div className="timeline-date" style={{ position: "relative", display: "flex", justifyContent: "flex-end", paddingRight: "1.6rem", alignSelf: "stretch" }}>
                  <div className="timeline-date-inner" style={{ textAlign: "right", paddingTop: ".15rem" }}>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {e.date.split(" ")[0]}
                    </div>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted2)", marginTop: ".3rem" }}>
                      {e.location}
                    </div>
                  </div>

                  {/* Node on the rail */}
                  <span
                    aria-hidden="true"
                    className="timeline-node"
                    style={{
                      position: "absolute", right: -5.5, top: ".45rem",
                      width: 11, height: 11, borderRadius: "50%",
                      background: "var(--bg)", border: `1.5px solid ${accent.text}`, zIndex: 2,
                    }}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <Rise y={22}>
                    <div
                      className="card-hover timeline-card"
                      style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "1.9rem 2rem" }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: ".9rem", marginBottom: ".7rem", flexWrap: "wrap" }}>
                        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.18rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
                          {e.title}
                        </h2>
                        <span className={accent.cls} style={{ flexShrink: 0 }}>
                          {e.tag}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".94rem", lineHeight: 1.9, margin: 0 }}>
                        {e.desc}
                      </p>
                    </div>
                  </Rise>
                </div>
              </div>
            </div>
          );
        })}

        </div>

        {/* Closing note */}
        <Rise y={18}>
          <div
            style={{
              marginTop: "1rem", padding: "2.2rem 2rem", borderRadius: "var(--r-lg)",
              border: "1px dashed var(--gold-line)", textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".95rem", lineHeight: 1.9, marginBottom: "1.3rem" }}>
              Die nächsten Termine kündigen wir über Instagram und im Mitgliederbereich an.
            </p>
            <Link
              href="/mitmachen"
              className="btn-solid"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".55rem",
                fontFamily: "'Jost', sans-serif", background: "var(--gold-solid)", color: "var(--on-gold)",
                padding: ".9rem 1.9rem", borderRadius: "var(--r-sm)", textDecoration: "none", fontWeight: 700,
                fontSize: ".7rem", letterSpacing: ".16em", textTransform: "uppercase",
              }}
            >
              Nichts verpassen <ArrowRightIcon size={13} />
            </Link>
          </div>
        </Rise>
      </div>
    </div>
  );
}
