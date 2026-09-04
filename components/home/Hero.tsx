"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={sectionRef} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>

      {/* Layered background */}
      <div style={{ position: "absolute", inset: 0, background: "var(--bg)" }} />
      <motion.div style={{
        position: "absolute", inset: 0, y: bgY,
        backgroundImage: "linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 20%, transparent 100%)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 800px 500px at 75% 40%,rgba(61,111,170,.16),transparent 65%), radial-gradient(ellipse 600px 400px at 10% 70%,rgba(201,168,76,.10),transparent 65%), radial-gradient(ellipse 500px 400px at 30% 15%,rgba(201,106,69,.07),transparent 65%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, var(--bg), transparent)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--max)", margin: "0 auto", padding: "10rem 1.5rem 6rem", width: "100%" }} className="grid-hero hero-pad">
        <div>

          <motion.h1 {...fadeUp(0.1, 24)} style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(2.6rem,6.2vw,5.75rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: "1.7rem", letterSpacing: "-.01em" }}>
            Zwischen Geschichte<br />und Zukunft.
          </motion.h1>

          <motion.p {...fadeUp(0.35, 24)} style={{ fontFamily: "'Lora', Georgia, serif", color: "var(--muted)", fontSize: "1.08rem", lineHeight: 1.95, maxWidth: 520, marginBottom: "2.8rem" }}>
            ASHOR verbindet assyrische Studierende und Akademiker in der Rhein-Main-Region — für akademischen Austausch, kulturelle Identität und nachhaltige Vernetzung. Mitgliedschaft ist kostenlos.
          </motion.p>

          <motion.div {...fadeUp(0.55, 20)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/mitmachen" style={{
              fontFamily: "'Jost', sans-serif",
              background: "var(--gold-solid)",
              color: "#07090E",
              padding: ".9rem 2rem",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: ".72rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Jetzt Mitglied werden
            </Link>
            <Link href="/events" style={{
              fontFamily: "'Jost', sans-serif",
              background: "transparent",
              color: "var(--muted)",
              padding: ".9rem 1.5rem",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 500,
              fontSize: ".72rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              border: "1px solid var(--line)",
              whiteSpace: "nowrap",
            }}>
              Veranstaltungen →
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div {...fadeUp(0.72, 18)} style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: ".6rem 2rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted2)", whiteSpace: "nowrap" }}>
              Offizielle Hochschulgruppe der JGU Mainz
            </span>
            {[
              { num: "20+", label: "Veranstaltungen" },
              { num: "7", label: "Vorstandsmitglieder" },
              { num: "2024", label: "Gegründet" },
            ].map((s) => (
              <span key={s.num} style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted2)", whiteSpace: "nowrap" }}>
                <span style={{ fontFamily: "'Cinzel', serif", color: "var(--text)", fontWeight: 700, fontSize: ".85rem", marginRight: ".35rem" }}>{s.num}</span>
                {s.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Logo with rings — subtle parallax drift + fade as the page scrolls past */}
        <motion.div {...fadeUp(0.85, 20)} className="hero-visual" style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <motion.div style={{ position: "relative", width: 340, height: 340, display: "flex", alignItems: "center", justifyContent: "center", y: logoY, opacity: logoOpacity }}>
            <div style={{ position: "absolute", inset: -48, borderRadius: "50%", border: "1px solid rgba(209,162,74,0.10)" }} />
            <div style={{ position: "absolute", inset: -24, borderRadius: "50%", border: "1px solid rgba(209,162,74,0.07)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(61,111,170,0.10), transparent 70%)" }} />
            <Image src="/logo.png" alt="ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V." width={280} height={280} className="logo-img" style={{ objectFit: "contain", position: "relative", zIndex: 1 }} priority />
          </motion.div>
        </motion.div>
      </div>

      <div className="scroll-hint" style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", fontFamily: "'Jost', sans-serif", color: "var(--muted2)", fontSize: ".62rem", letterSpacing: ".25em", textTransform: "uppercase" }}>
        <span>Scroll</span>
        <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(to bottom,transparent,var(--gold))", borderRadius: 999, animation: "scrollAnim 2.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
