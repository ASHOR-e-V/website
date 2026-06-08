import Link from "next/link";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Mission from "@/components/home/Mission";
import EventsPreview from "@/components/home/EventsPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Board from "@/components/home/Board";
import Join from "@/components/home/Join";
import Donate from "@/components/home/Donate";

const quickLinks = [
  { num: "01", label: "Veranstaltungen", sub: "Events & Rückblick", href: "/events" },
  { num: "02", label: "Projekte", sub: "Unsere Formate", href: "/projects" },
  { num: "03", label: "Vorstand", sub: "Das Leitungsgremium", href: "/vorstand" },
  { num: "04", label: "Mitmachen", sub: "Kostenlose Mitgliedschaft", href: "/mitmachen" },
  { num: "05", label: "Spenden", sub: "ASHOR unterstützen", href: "/spenden" },
  { num: "06", label: "Mitgliederbereich", sub: "Interner Bereich", href: "/members" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />

      {/* Mobile navigation — editorial list, hidden on desktop */}
      <nav className="mobile-quicknav" aria-label="Bereiche" style={{ flexDirection: "column", padding: "0 0 3rem", borderBottom: "1px solid var(--line)" }}>
        <div style={{ padding: "2rem 1.4rem 1rem", fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)" }}>
          Entdecken
        </div>
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1.1rem 1.4rem",
              borderTop: "1px solid var(--line)",
              textDecoration: "none",
              gap: "1.2rem",
            }}
            className="mobile-nav-item"
          >
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: ".78rem", fontWeight: 700, color: "var(--gold)", opacity: .45, minWidth: "2rem", flexShrink: 0 }}>
              {item.num}
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: ".95rem", fontWeight: 700, color: "var(--text)", display: "block", lineHeight: 1.2, marginBottom: ".2rem" }}>
                {item.label}
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", color: "var(--muted2)", letterSpacing: ".06em" }}>
                {item.sub}
              </span>
            </span>
            <span style={{ color: "var(--gold)", fontSize: ".75rem", opacity: .5, flexShrink: 0 }}>→</span>
          </Link>
        ))}
      </nav>

      {/* Desktop-only sections */}
      <div className="desktop-section">
        <Mission />
        <EventsPreview />
        <ProjectsPreview />
        <Board />
        <Join />
        <Donate />
      </div>
    </>
  );
}
