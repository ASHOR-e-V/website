export const metadata = { title: "Veranstaltungen – ASHOR" };

const events = [
  { date: "Mai 2025", title: "ASHOR Talks #2", desc: "Infovortrag und Live-Debatte: Frei geboren, traditionell geprägt – Wie modern darf ich in der Diaspora sein? Ein Abend mit zwei Debattierteams, Publikumsfragen und viel Diskussionsraum.", tag: "Vortrag & Debatte", location: "Mainz" },
  { date: "April 2025", title: "Spanienreise & Symposium Salamanca", desc: "Teilnahme am Niniveh Academic Chair of Salamanca 2025 – akademischer Austausch auf europäischer Bühne mit assyrischen Akademikern aus ganz Europa.", tag: "Bildungsreise", location: "Salamanca, Spanien" },
  { date: "März 2025", title: "ASHORs Khigga #2", desc: "Assyrische Tänze Schritt für Schritt lernen und gemeinsam tanzen – Vorkenntnisse nicht nötig. Ein Abend voller Bewegung, Musik und Gemeinschaft.", tag: "Kultur", location: "Mainz" },
  { date: "Januar 2025", title: "ASHOR Talks #1", desc: "Der Auftakt unserer Debattierreihe: Informationsvortrag über ein gesellschaftliches Thema mit anschließender Teamdebatte.", tag: "Vortrag & Debatte", location: "Mainz" },
  { date: "November 2024", title: "ASHORs Khigga #1", desc: "Der erste Tanzabend von ASHOR – ein voller Erfolg mit über 30 Teilnehmenden.", tag: "Kultur", location: "Mainz" },
  { date: "Oktober 2024", title: "Gründungsversammlung & Kickoff", desc: "Offizieller Start von ASHOR als anerkannte Hochschulgruppe der JGU Mainz. Wahl des ersten Vorstands.", tag: "Intern", location: "Mainz" },
];

export default function EventsPage() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ padding: "5rem 1.5rem 2rem", background: "var(--surface2)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
            <span style={{ display: "block", width: 30, height: 1, background: "var(--gold)", borderRadius: 999 }} />
            Alle Veranstaltungen
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.01em" }}>
            Chronologische<br />
            <em style={{ fontStyle: "normal", background: "linear-gradient(100deg,var(--gold),#e8c96a)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Übersicht.</em>
          </h1>
        </div>
      </div>

      <div style={{ padding: "4rem 1.5rem", maxWidth: "var(--max)", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {events.map((e, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "2rem", padding: "2rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", alignItems: "start" }}>
              <div style={{ borderRight: "1px solid var(--line)", paddingRight: "2rem" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, color: "var(--gold)", marginBottom: ".3rem" }}>{e.date}</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted2)" }}>{e.location}</div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".6rem", flexWrap: "wrap" }}>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)" }}>{e.title}</h2>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", background: "var(--gold-dim)", padding: ".2rem .6rem", borderRadius: 999, border: "1px solid var(--gold-line)", flexShrink: 0 }}>{e.tag}</span>
                </div>
                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".95rem", lineHeight: 1.85 }}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
