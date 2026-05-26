export const metadata = { title: "Projekte – ASHOR" };

const projects = [
  { title: "ASHOR Talks", badge: "Laufende Serie", desc: "Unsere Debattierreihe: Infovortrag plus Live-Debatte zweier Teams – lebendig, lehrreich und immer mit Überraschungen. Wir beleuchten gesellschaftliche Themen, die die assyrische Gemeinschaft bewegen." },
  { title: "ASHORs Khigga", badge: "Laufende Serie", desc: "Tanzabende, bei denen assyrische Tänze vermittelt und gemeinsam getanzt werden – kulturelle Praxis als Gemeinschaftserfahrung. Vorkenntnisse sind nicht nötig." },
  { title: "Bildungsreisen & Symposien", badge: "Jährlich", desc: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca, Spanien. Wir vernetzen uns mit assyrischen Akademikern weltweit." },
];

export default function ProjectsPage() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ padding: "5rem 1.5rem 2rem", background: "var(--surface2)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
            <span style={{ display: "block", width: 30, height: 1, background: "var(--gold)", borderRadius: 999 }} />
            Projekte & Spenden
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.01em" }}>
            Unsere<br />
            <em style={{ fontStyle: "normal", background: "linear-gradient(100deg,var(--gold),#e8c96a)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Formate.</em>
          </h1>
        </div>
      </div>

      <div style={{ padding: "4rem 1.5rem", maxWidth: "var(--max)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "5rem" }}>
          {projects.map((p, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--gold),var(--lapis))" }} />
              <span style={{ display: "inline-block", fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", background: "var(--gold-dim)", padding: ".26rem .7rem", borderRadius: 999, border: "1px solid var(--gold-line)", marginBottom: "1rem" }}>{p.badge}</span>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: ".8rem", lineHeight: 1.3 }}>{p.title}</h2>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".95rem", lineHeight: 1.85 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-lg)", padding: "3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "var(--gold)" }} />
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Spenden</div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, marginBottom: "1rem" }}>ASHOR unterstützen</h2>
          <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.9 }}>
            Jede Spende ermöglicht neue Veranstaltungen, Bildungsreisen und kulturelle Projekte. Als eingetragener gemeinnütziger Verein verwenden wir alle Mittel zweckgebunden.
          </p>
          <a href="https://www.paypal.com/donate" target="_blank" rel="noopener" style={{ fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--gold)", padding: "1rem 2.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--gold-line)" }}>
            ♡ Per PayPal spenden
          </a>
        </div>
      </div>
    </div>
  );
}
