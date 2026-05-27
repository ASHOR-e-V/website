import Link from "next/link";

const projects = [
  { title: "ASHOR Talks", desc: "Unsere Debattierreihe: Infovortrag plus Live-Debatte zweier Teams – lebendig, lehrreich und immer mit Überraschungen.", badge: "Laufende Serie" },
  { title: "ASHORs Khigga", desc: "Tanzabende, bei denen assyrische Tänze vermittelt und gemeinsam getanzt werden – kulturelle Praxis als Gemeinschaftserfahrung.", badge: "Laufende Serie" },
  { title: "Bildungsreisen & Symposien", desc: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca.", badge: "Jährlich" },
];

export default function ProjectsPreview() {
  return (
    <section style={{ padding: "6.5rem 1.5rem" }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <div className="section-header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.2rem" }}>
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
              <span style={{ display: "block", width: 30, height: 1, background: "var(--gold)", borderRadius: 999 }} />
              Projekte
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.7vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.01em" }}>Unsere Formate</h2>
          </div>
          <Link href="/projects" style={{ fontFamily: "'Jost', sans-serif", background: "transparent", color: "var(--muted)", padding: ".88rem 1.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--line)", whiteSpace: "nowrap" }}>
            Alle Projekte
          </Link>
        </div>
        <div className="grid-3col">
          {projects.map((p, i) => (
            <div key={i} className={i === 2 ? "hide-mobile" : ""} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--gold),var(--lapis))" }} />
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".6rem", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.8, marginBottom: "1rem" }}>{p.desc}</p>
              <span style={{ display: "inline-block", fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", background: "var(--gold-dim)", padding: ".26rem .7rem", borderRadius: 999, border: "1px solid var(--gold-line)" }}>
                {p.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
