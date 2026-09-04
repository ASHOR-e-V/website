"use client";
import { motion } from "framer-motion";
import { DotIcon } from "@/components/icons";
import { useCountUp } from "@/lib/useCountUp";
import { fadeUp } from "@/lib/motion";

const stats: { target: number; suffix: string; label: string; color: string }[] = [
  { target: 2024, suffix: "", label: "Gründungsjahr", color: "var(--gold)" },
  { target: 20, suffix: "+", label: "Veranstaltungen", color: "var(--lapis-text)" },
  { target: 7, suffix: "", label: "Vorstandsmitglieder", color: "var(--clay)" },
];

function StatNumber({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(target);
  return (
    <span
      ref={ref}
      style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "clamp(2.4rem,4.8vw,4.4rem)",
        fontWeight: 700,
        color,
        display: "block",
        lineHeight: 1,
        letterSpacing: "-.02em",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}{suffix}
    </span>
  );
}

function StatItem({ children, withSep }: { children: React.ReactNode; withSep: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "0 clamp(1.5rem,4vw,3.5rem)" }}>{children}</div>
      {withSep && <span className="stat-sep" style={{ color: "var(--gold)", opacity: 0.35, flexShrink: 0 }}><DotIcon /></span>}
    </div>
  );
}

export default function StatsBar() {
  return (
    <div style={{ background: "var(--surface2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden" }}>
      <motion.div {...fadeUp(0, 22)} className="stats-wrap" style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "3.5rem 1.5rem" }}>
        {stats.map((s, i) => (
          <StatItem key={s.label} withSep={i < stats.length - 1}>
            <StatNumber target={s.target} suffix={s.suffix} color={s.color} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginTop: ".7rem", display: "block" }}>
              {s.label}
            </span>
          </StatItem>
        ))}
        <StatItem withSep={false}>
          <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(2.4rem,4.8vw,4.4rem)", fontWeight: 700, color: "var(--gold)", display: "block", lineHeight: 1, letterSpacing: "-.02em" }}>JGU</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginTop: ".7rem", display: "block" }}>Mainz</span>
        </StatItem>
      </motion.div>
    </div>
  );
}
