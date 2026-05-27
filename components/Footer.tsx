import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "rgba(3,5,13,.97)", borderTop: "1px solid var(--line)", padding: "4rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <div className="grid-footer">
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: ".1em", color: "#E4DAC8", marginBottom: ".4rem" }}>ASHOR</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", color: "rgba(228,218,200,0.3)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1rem" }}>Assyrische Hochschulgruppe Rhein-Main e.V.</div>
            <p style={{ fontFamily: "'Lora', serif", color: "rgba(228,218,200,0.5)", fontSize: ".85rem", lineHeight: 1.8, maxWidth: 280 }}>
              Anerkannte Hochschulgruppe der Johannes Gutenberg-Universität Mainz. Identität. Bildung. Gemeinschaft.
            </p>
            <div style={{ display: "flex", gap: ".75rem", marginTop: "1rem", flexWrap: "wrap" }}>
              {[{ href: "https://www.instagram.com/ashor_e.v/", label: "Instagram" }, { href: "https://www.tiktok.com/@ashor_e.v", label: "TikTok" }].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(228,218,200,0.4)", border: "1px solid rgba(255,255,255,0.08)", padding: ".35rem .75rem", borderRadius: 999, textDecoration: "none" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(228,218,200,0.25)", marginBottom: "1.2rem" }}>Verein</h5>
            {[{ label: "Über uns", href: "/#ueber-uns" }, { label: "Vorstand", href: "/#vorstand" }, { label: "Satzung", href: "/satzung" }].map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: ".8rem", color: "rgba(228,218,200,0.45)", textDecoration: "none", marginBottom: ".6rem" }}>{l.label}</Link>
            ))}
          </div>
          <div>
            <h5 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(228,218,200,0.25)", marginBottom: "1.2rem" }}>Aktivitäten</h5>
            {[{ label: "Veranstaltungen", href: "/events" }, { label: "Projekte", href: "/projects" }, { label: "Mitmachen", href: "/#mitmachen" }].map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: ".8rem", color: "rgba(228,218,200,0.45)", textDecoration: "none", marginBottom: ".6rem" }}>{l.label}</Link>
            ))}
          </div>
          <div>
            <h5 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(228,218,200,0.25)", marginBottom: "1.2rem" }}>Rechtliches</h5>
            {[{ label: "Impressum", href: "/impressum" }, { label: "Datenschutz", href: "/datenschutz" }].map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: ".8rem", color: "rgba(228,218,200,0.45)", textDecoration: "none", marginBottom: ".6rem" }}>{l.label}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", color: "rgba(228,218,200,0.2)", letterSpacing: ".1em" }}>
            © {new Date().getFullYear()} ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/impressum" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", color: "rgba(228,218,200,0.2)", textDecoration: "none" }}>Impressum</Link>
            <Link href="/datenschutz" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", color: "rgba(228,218,200,0.2)", textDecoration: "none" }}>Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
