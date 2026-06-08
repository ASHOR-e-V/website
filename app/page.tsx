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
  { label: "Veranstaltungen", sub: "Events & Rückblick", href: "/events", icon: "◈" },
  { label: "Projekte", sub: "Unsere Formate", href: "/projects", icon: "◈" },
  { label: "Vorstand", sub: "Das Leitungsgremium", href: "/vorstand", icon: "◈" },
  { label: "Mitmachen", sub: "Mitglied werden", href: "/mitmachen", icon: "◈" },
  { label: "Spenden", sub: "ASHOR fördern", href: "/spenden", icon: "◈" },
  { label: "Mitgliederbereich", sub: "Interner Bereich", href: "/members", icon: "◈" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />

      <div
        className="mobile-quicknav"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: ".75rem",
          padding: "2rem 1.25rem 3rem",
          background: "var(--bg)",
        }}
      >
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".35rem",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-md)",
              padding: "1.1rem 1rem",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--gold),var(--lapis))" }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
              {item.icon}
            </span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: ".85rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
              {item.label}
            </span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", color: "var(--muted2)", lineHeight: 1.4 }}>
              {item.sub}
            </span>
          </Link>
        ))}
      </div>

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
