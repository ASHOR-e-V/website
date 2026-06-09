"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navText   = scrolled ? "#e8dcc8"                 : "var(--text)";
  const navMuted  = scrolled ? "rgba(232,220,200,.65)"   : "var(--muted)";
  const navMuted2 = scrolled ? "rgba(232,220,200,.45)"   : "var(--muted2)";

  const links = [
    { label: "Über uns", href: "/#ueber-uns" },
    { label: "Veranstaltungen", href: "/events" },
    { label: "Projekte", href: "/projects" },
    { label: "Satzung", href: "/satzung" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: "0 1rem",
          background: scrolled ? "rgba(7,9,14,.88)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,.12)" : "1px solid transparent",
          transition: "all .5s cubic-bezier(.25,.46,.45,.94)",
          boxSizing: "border-box",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "var(--max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 74, width: "100%", minWidth: 0 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: ".75rem", textDecoration: "none", flexShrink: 0, minWidth: 0, overflow: "hidden" }}>
            <Image src="/logo.png" alt="ASHOR Logo" width={40} height={40} className="logo-img" style={{ objectFit: "contain", flexShrink: 0, filter: scrolled ? "none" : undefined }} />
            <span style={{ minWidth: 0 }}>
              <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: ".1em", color: navText, display: "block" }}>ASHOR</span>
              <span className="nav-subtitle" style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: ".55rem", color: navMuted2, letterSpacing: ".15em", textTransform: "uppercase", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Assyrische Hochschulgruppe Rhein-Main e.V.</span>
            </span>
          </Link>

          <ul style={{ display: "flex", alignItems: "center", gap: "1.2rem", listStyle: "none" }} className="nav-desktop">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{ fontFamily: "'Jost', sans-serif", color: navMuted, textDecoration: "none", fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 500 }}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#spenden" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, border: "1px solid var(--gold-line)", padding: ".45rem .95rem", borderRadius: 999, textDecoration: "none" }}>
                ♡ Spenden
              </Link>
            </li>
            <li>
              <Link href="/members" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, border: "1px solid var(--gold-line)", padding: ".45rem .95rem", borderRadius: 999, textDecoration: "none", background: "var(--gold-dim)" }}>
                Mitgliederbereich
              </Link>
            </li>
            <li>
              <button
                onClick={toggle}
                aria-label="Theme wechseln"
                style={{ background: "none", border: `1px solid ${scrolled ? "rgba(232,220,200,.25)" : "var(--line)"}`, color: navMuted, width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {theme === "light" ? "☾" : "☀"}
              </button>
            </li>
          </ul>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ display: "none", flexDirection: "column", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 6 }}
            className="nav-hamburger"
          >
            <span style={{ display: "block", width: 24, height: 1.5, background: "linear-gradient(90deg,var(--lapis),var(--gold))", borderRadius: 999, transition: "all .35s", transform: menuOpen ? "translateY(7.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 24, height: 1.5, background: "linear-gradient(90deg,var(--lapis),var(--gold))", borderRadius: 999, opacity: menuOpen ? 0 : 1, transition: "all .35s" }} />
            <span style={{ display: "block", width: 24, height: 1.5, background: "linear-gradient(90deg,var(--lapis),var(--gold))", borderRadius: 999, transition: "all .35s", transform: menuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(7,9,14,.96)", backdropFilter: "blur(22px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", paddingTop: 74 }}>
          {[
            { label: "Startseite", href: "/" },
            { label: "Veranstaltungen", href: "/events" },
            { label: "Projekte", href: "/projects" },
            { label: "Vorstand", href: "/vorstand" },
            { label: "Mitmachen", href: "/mitmachen" },
            { label: "♡ Spenden", href: "/spenden" },
            { label: "Satzung", href: "/satzung" },
            { label: "Mitgliederbereich", href: "/members" },
          ].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#E4DAC8", textDecoration: "none", fontSize: "1.9rem", fontWeight: 600, letterSpacing: ".06em" }}>
              {l.label}
            </Link>
          ))}
          <button onClick={() => { toggle(); setMenuOpen(false); }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(232,220,200,.5)", padding: ".4rem 1rem", borderRadius: 999, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: ".75rem", letterSpacing: ".1em" }}>
            {theme === "light" ? "☾ Dunkel" : "☀ Hell"}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-subtitle { display: none !important; }
        }
      `}</style>
    </>
  );
}
