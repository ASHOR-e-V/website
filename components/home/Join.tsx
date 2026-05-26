const perks = [
  "Zugang zum internen Mitgliederbereich",
  "Einladungen zu allen Veranstaltungen und Formaten",
  "Studienberatung, Mentoring und Netzwerkzugang",
  "Stimmrecht als Vollmitglied ab 2 Veranstaltungen/Semester",
];

export default function Join() {
  return (
    <section id="mitmachen" style={{ padding: "6.5rem 1.5rem", background: "linear-gradient(135deg,rgba(61,111,170,.15) 0%,rgba(201,168,76,.08) 100%)", position: "relative", scrollMarginTop: 74 }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--surface2)" }} />
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
              <span style={{ display: "block", width: 30, height: 1, background: "var(--gold)", borderRadius: 999 }} />
              Mitmachen
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.7vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.2rem", letterSpacing: "-.01em" }}>
              Teil von ASHOR<br />werden.
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: "2rem", maxWidth: 400 }}>
              Mitglied kann jede eingeschriebene Studierende und jeder Alumnus im Rhein-Main-Gebiet werden. Die Mitgliedschaft ist beitragsfrei.
            </p>
            {perks.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: ".9rem" }}>
                <span style={{ color: "var(--gold)", fontSize: "1.1rem", flexShrink: 0, lineHeight: 1.6 }}>✦</span>
                <p style={{ color: "var(--muted)", fontSize: ".88rem", margin: 0 }}>{p}</p>
              </div>
            ))}
            <div style={{ marginTop: "2rem", display: "flex", gap: ".75rem" }}>
              <a href="https://www.instagram.com/ashor_e.v/" target="_blank" rel="noopener" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", padding: ".4rem .9rem", borderRadius: 999, textDecoration: "none" }}>Instagram</a>
              <a href="https://www.tiktok.com/@ashor_e.v" target="_blank" rel="noopener" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", padding: ".4rem .9rem", borderRadius: 999, textDecoration: "none" }}>TikTok</a>
            </div>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-lg)", padding: "2.5rem", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "2rem", right: "2rem", height: 1, background: "var(--gold)" }} />
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: ".4rem" }}>Kontakt aufnehmen</h3>
            <p style={{ color: "var(--muted2)", fontSize: ".78rem", marginBottom: "1.5rem" }}>Für Mitgliedschaft, Kooperationen und Pressekontakt</p>
            <a href="mailto:ashor.jgu@gmail.com" style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: ".85rem", color: "var(--gold)", textDecoration: "none", marginBottom: "1rem", letterSpacing: ".05em" }}>
              ashor.jgu@gmail.com
            </a>
            <p style={{ color: "var(--muted2)", fontSize: ".78rem", lineHeight: 1.7 }}>
              Oder schreib uns direkt auf Instagram – wir antworten in der Regel innerhalb von 24 Stunden.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
