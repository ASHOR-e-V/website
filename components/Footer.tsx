import Link from "next/link";
import Shamash from "@/components/Shamash";
import { InstagramIcon, TikTokIcon, MailIcon, DownloadIcon } from "@/components/icons";

const columns = [
  {
    title: "Verein",
    links: [
      { label: "Über uns", href: "/#ueber-uns" },
      { label: "Woher wir kommen", href: "/#wurzeln" },
      { label: "Vorstand & Organe", href: "/vorstand" },
      { label: "Satzung", href: "/satzung" },
    ],
  },
  {
    title: "Aktivitäten",
    links: [
      { label: "Veranstaltungen", href: "/events" },
      { label: "Projekte & Formate", href: "/projects" },
      { label: "Mitmachen", href: "/mitmachen" },
      { label: "Spenden", href: "/spenden" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Mitgliederbereich", href: "/members" },
    ],
  },
];

const socials = [
  { href: "https://www.instagram.com/ashor_e.v/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/@ashor_e.v", label: "TikTok", Icon: TikTokIcon },
  { href: "mailto:ashor.jgu@gmail.com", label: "E-Mail", Icon: MailIcon },
];

const linkStyle = {
  display: "block",
  fontFamily: "'Jost', sans-serif",
  fontSize: ".82rem",
  color: "rgba(228,218,200,0.48)",
  textDecoration: "none",
  marginBottom: ".7rem",
} as const;

const headingStyle = {
  fontFamily: "'Jost', sans-serif",
  fontSize: ".62rem",
  letterSpacing: ".22em",
  textTransform: "uppercase" as const,
  color: "rgba(228,218,200,0.3)",
  marginBottom: "1.3rem",
};

export default function Footer() {
  return (
    <footer style={{ background: "#04060B", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "4.5rem 1.5rem 2rem", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-38%", left: "50%", transform: "translateX(-50%)", opacity: 0.035, pointerEvents: "none", lineHeight: 0 }}>
        <Shamash size={640} rayWidth={2.4} gold="#D1A24A" lapis="#3D6FAA" clay="#C96A45" />
      </div>

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="grid-footer">
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.15rem", fontWeight: 700, letterSpacing: ".12em", color: "#E4DAC8", marginBottom: ".5rem" }}>
              ASHOR
            </div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", color: "rgba(228,218,200,0.32)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              Assyrische Hochschulgruppe Rhein-Main e.V.
            </div>
            <p style={{ fontFamily: "'Lora', serif", color: "rgba(228,218,200,0.5)", fontSize: ".86rem", lineHeight: 1.85, maxWidth: 290 }}>
              Anerkannte Hochschulgruppe der Johannes Gutenberg-Universität Mainz. Identität, Bildung und Gemeinschaft — seit 2024.
            </p>

            <div style={{ display: "flex", gap: ".6rem", marginTop: "1.4rem", flexWrap: "wrap" }}>
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener"}
                  aria-label={label}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 34, height: 34, borderRadius: "50%",
                    color: "rgba(228,218,200,0.5)", border: "1px solid rgba(255,255,255,0.1)",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 style={headingStyle}>{col.title}</h2>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} style={linkStyle}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        {/* Satzung download, given its own line — it is the document everything
            else on the site refers back to. */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.6rem", marginBottom: "1.6rem" }}>
          <a
            href="/ASHOR-Satzung-14-03-2026.pdf"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".55rem",
              fontFamily: "'Jost', sans-serif", fontSize: ".68rem", letterSpacing: ".14em",
              textTransform: "uppercase", color: "rgba(228,218,200,0.5)", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--r-sm)", padding: ".5rem 1.1rem",
            }}
          >
            <DownloadIcon size={13} /> Satzung als PDF · Fassung 14.03.2026
          </a>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", color: "rgba(228,218,200,0.25)", letterSpacing: ".08em" }}>
            © {new Date().getFullYear()} ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/impressum" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", color: "rgba(228,218,200,0.25)", textDecoration: "none" }}>
              Impressum
            </Link>
            <Link href="/datenschutz" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", color: "rgba(228,218,200,0.25)", textDecoration: "none" }}>
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
