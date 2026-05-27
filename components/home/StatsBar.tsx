const stats = [
  { number: "2024", label: "Gründungsjahr" },
  { number: "20+", label: "Veranstaltungen seit Gründung" },
  { number: "7", label: "Vorstandsmitglieder" },
  { number: "JGU", label: "Mainz – Anerkannte Hochschulgruppe" },
];

export default function StatsBar() {
  return (
    <div style={{ background: "var(--surface2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="grid-stats" style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {stats.map((s, i) => (
          <div key={i} className={i < stats.length - 1 ? "stat-border" : ""} style={{ textAlign: "center", padding: "0 1rem" }}>
            <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "2rem", fontWeight: 700, background: "linear-gradient(90deg,var(--lapis),var(--gold))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", display: "block" }}>
              {s.number}
            </span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted2)", marginTop: ".3rem", display: "block" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
