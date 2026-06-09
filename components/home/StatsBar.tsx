const stats = [
  { number: "2024", label: "Gründungsjahr" },
  { number: "20+", label: "Veranstaltungen" },
  { number: "7", label: "Vorstandsmitglieder" },
  { number: "JGU", label: "Mainz" },
];

export default function StatsBar() {
  return (
    <div style={{ background: "var(--surface2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden" }}>
      <div className="stats-wrap" style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ textAlign: "center", padding: "0 clamp(1.5rem,4vw,3.5rem)" }}>
              <span style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: "clamp(2.2rem,4.5vw,4rem)",
                fontWeight: 700,
                background: "linear-gradient(135deg,var(--lapis),var(--gold))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "block",
                lineHeight: 1,
                letterSpacing: "-.02em",
              }}>
                {s.number}
              </span>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: ".58rem",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--muted2)",
                marginTop: ".65rem",
                display: "block",
              }}>
                {s.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <span className="stat-sep" style={{ color: "var(--gold)", fontSize: ".55rem", opacity: 0.35, flexShrink: 0 }}>✦</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
