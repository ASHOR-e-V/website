"use client";
import { useCountUp } from "@/lib/useCountUp";
import { Rise, RiseGroup, RiseItem } from "@/components/Reveal";

type Stat = { target?: number; text?: string; suffix?: string; label: string; sub: string; color: string };

const stats: Stat[] = [
  { target: 2024, label: "Gründungsjahr", sub: "16. November", color: "var(--gold)" },
  { target: 20, suffix: "+", label: "Veranstaltungen", sub: "seit der Gründung", color: "var(--lapis-text)" },
  { target: 7, label: "Vorstandssitze", sub: "gewählt für 2 Semester", color: "var(--clay)" },
  { text: "JGU", label: "Mainz", sub: "anerkannte Hochschulgruppe", color: "var(--gold)" },
];

const numberStyle = (color: string) => ({
  fontFamily: "'Cinzel', Georgia, serif",
  fontSize: "clamp(2.3rem,4.4vw,3.9rem)",
  fontWeight: 700,
  color,
  display: "block",
  lineHeight: 1,
  letterSpacing: "-.025em",
  fontVariantNumeric: "tabular-nums" as const,
});

function StatNumber({ target, suffix, color }: { target: number; suffix?: string; color: string }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(target);
  return (
    <span ref={ref} style={numberStyle(color)}>
      {value}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section
      aria-label="ASHOR in Zahlen"
      style={{ background: "var(--surface2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden" }}
    >
      <Rise y={20} style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "3.8rem 1.5rem" }}>
        <RiseGroup className="stats-grid" stagger={0.11}>
          {stats.map((s, i) => (
            <RiseItem
              key={s.label}
              style={{
                textAlign: "center",
                padding: "1rem .75rem",
                // Hairline dividers between columns, never on the last one.
                borderRight: i < stats.length - 1 ? "1px solid var(--line)" : "none",
              }}
              className="stat-cell"
            >
              {s.target !== undefined ? (
                <StatNumber target={s.target} suffix={s.suffix} color={s.color} />
              ) : (
                <span style={numberStyle(s.color)}>{s.text}</span>
              )}

              <span
                style={{
                  fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".22em",
                  textTransform: "uppercase", color: "var(--text)", marginTop: ".95rem",
                  display: "block", fontWeight: 600,
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".04em",
                  color: "var(--muted2)", marginTop: ".35rem", display: "block",
                }}
              >
                {s.sub}
              </span>
            </RiseItem>
          ))}
        </RiseGroup>
      </Rise>
    </section>
  );
}
