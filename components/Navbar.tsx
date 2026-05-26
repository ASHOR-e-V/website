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
          padding: "0 1.5rem",
          background: scrolled ? "rgba(7,9,14,.88)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,.12)" : "1px solid transparent",
          transition: "all .5s cubic-bezier(.25,.46,.45,.94)",
        }}
      >
        <div style={{ maxWidth: "var(--max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 74 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: ".9rem", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo.png" alt="ASHOR Logo" width={44} height={44} style={{ objectFit: "contain" }} />
            <span>
              <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: ".1em", color: "var(--text)" }}>ASHOR</span>
              <span style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: ".58rem", color: "var(--muted2)", letterSpacing: ".2em", textTransform: "uppercase", marginTop: 2 }}>Assyrische Hochschulgruppe Rhein-Main e.V.</span>
            </span>
          </Link>

          <ul style={{ display: "flex", alignItems: "center", gap: "1.2rem", listStyle: "none" }} className="nav-desktop">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{ fontFamily: "'Jost', sans-serif", color: "var(--muted)", textDecoration: "none", fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 500 }}>
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
                style={{ background: "none", border: "1px solid var(--line)", color: "var(--muted)", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
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
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(7,9,14,.96)", backdropFilter: "blur(22px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "1px solid var(--line)", color: "var(--muted)", width: 42, height: 42, borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}>✕</button>
          {[{ label: "Startseite", href: "/" }, ...links, { label: "Mitmachen", href: "/#mitmachen" }, { label: "♡ Spenden", href: "/#spenden" }, { label: "Mitgliederbereich", href: "/members" }].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--text)", textDecoration: "none", fontSize: "1.9rem", fontWeight: 600, letterSpacing: ".06em" }}>
              {l.label}
            </Link>
          ))}
          <button onClick={() => { toggle(); setMenuOpen(false); }} style={{ background: "none", border: "1px solid var(--line)", color: "var(--muted)", padding: ".4rem 1rem", borderRadius: 999, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: ".75rem", letterSpacing: ".1em" }}>
            {theme === "light" ? "☾ Dunkel" : "☀ Hell"}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
