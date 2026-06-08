"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
});

export default function Hero() {
  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>

      {/* Layered background */}
      <div style={{ position: "absolute", inset: 0, background: "var(--bg)" }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 20%, transparent 100%)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 800px 500px at 75% 40%,rgba(61,111,170,.16),transparent 65%), radial-gradient(ellipse 600px 400px at 10% 70%,rgba(201,168,76,.10),transparent 65%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, var(--bg), transparent)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--max)", margin: "0 auto", padding: "9rem 1.5rem 5rem", width: "100%" }} className="grid-hero hero-pad">
        <div>

          {/* Authority badge */}
          <motion.div {...fadeUp(0.1)} style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", background: "var(--gold-dim)", border: "1px solid var(--gold-line)", borderRadius: 999, padding: ".38rem .9rem", marginBottom: "2rem" }}>
            <span style={{ color: "var(--gold)", fontSize: ".55rem", lineHeight: 1 }}>✦</span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
              Offizielle Hochschulgruppe · JGU Mainz
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.28)} style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(2.4rem,5.5vw,5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-.01em" }}>
            Zwischen Geschichte<br />und{" "}
            <em style={{ fontStyle: "normal", background: "linear-gradient(100deg,var(--gold),#e8c96a,var(--gold))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Zukunft.</em>
          </motion.h1>

          <motion.p {...fadeUp(0.42)} style={{ fontFamily: "'Lora', Georgia, serif", color: "var(--muted)", fontSize: "1rem", lineHeight: 1.95, maxWidth: 500, marginBottom: "2.6rem" }}>
            ASHOR verbindet assyrische Studierende und Akademiker in der Rhein-Main-Region — für akademischen Austausch, kulturelle Identität und nachhaltige Vernetzung. Mitgliedschaft ist kostenlos.
          </motion.p>

          <motion.div {...fadeUp(0.55)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/mitmachen" style={{
              fontFamily: "'Jost', sans-serif",
              background: "var(--gold)",
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
          <motion.div {...fadeUp(0.68)} style={{ marginTop: "2.8rem", display: "flex", alignItems: "center", gap: "1.4rem", flexWrap: "wrap" }}>
            {[
              { num: "20+", label: "Veranstaltungen" },
              { num: "7", label: "Vorstandsmitglieder" },
              { num: "2024", label: "Gegründet" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.4rem" }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted2)" }}>
                  <span style={{ fontFamily: "'Cinzel', serif", color: "var(--text)", fontWeight: 700, fontSize: ".85rem", marginRight: ".35rem" }}>{s.num}</span>
                  {s.label}
                </span>
                {i < 2 && <span style={{ width: 1, height: 14, background: "var(--line)", display: "block", flexShrink: 0 }} />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Logo with rings */}
        <motion.div {...fadeUp(0.78)} className="hero-visual" style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <div style={{ position: "relative", width: 340, height: 340, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: -48, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.10)" }} />
            <div style={{ position: "absolute", inset: -24, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.07)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(61,111,170,0.10), transparent 70%)" }} />
            <Image src="/logo.png" alt="ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V." width={280} height={280} className="logo-img" style={{ objectFit: "contain", position: "relative", zIndex: 1 }} priority />
          </div>
        </motion.div>
      </div>

      <div className="scroll-hint" style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", fontFamily: "'Jost', sans-serif", color: "var(--muted2)", fontSize: ".62rem", letterSpacing: ".25em", textTransform: "uppercase" }}>
        <span>Scroll</span>
        <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(to bottom,transparent,var(--gold))", borderRadius: 999, animation: "scrollAnim 2.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
