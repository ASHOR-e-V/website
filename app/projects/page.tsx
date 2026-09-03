import { HeartIcon } from "@/components/icons";
import { projectAccent } from "@/lib/tagColors";

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
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.01em" }}>
            Unsere Formate.
          </h1>
        </div>
      </div>

      <div style={{ padding: "4rem 1.5rem", maxWidth: "var(--max)", margin: "0 auto" }}>
        <div className="grid-3col" style={{ marginBottom: "5rem" }}>
          {projects.map((p, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: projectAccent(p.title).text, background: projectAccent(p.title).dim, padding: ".26rem .7rem", borderRadius: 999, border: `1px solid ${projectAccent(p.title).line}`, marginBottom: "1rem" }}>{p.badge}</span>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: ".8rem", lineHeight: 1.3 }}>{p.title}</h2>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".95rem", lineHeight: 1.85 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-lg)", padding: "3rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, marginBottom: "1rem" }}>ASHOR unterstützen</h2>
          <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.9 }}>
            Jede Spende ermöglicht neue Veranstaltungen, Bildungsreisen und kulturelle Projekte. Als eingetragener gemeinnütziger Verein verwenden wir alle Mittel zweckgebunden.
          </p>
          <a href="https://paypal.me/ashorev" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--gold)", padding: "1rem 2.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--gold-line)" }}>
            <HeartIcon size={13} /> Per PayPal spenden
          </a>
        </div>
      </div>
    </div>
  );
}
