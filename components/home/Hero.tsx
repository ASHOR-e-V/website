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
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 700px 450px at 75% 40%,rgba(61,111,170,.14),transparent 65%), radial-gradient(ellipse 500px 350px at 20% 65%,rgba(201,168,76,.09),transparent 65%)" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--max)", margin: "0 auto", padding: "9rem 1.5rem 5rem" }} className="grid-hero hero-pad">
        <div>
          <motion.div {...fadeUp(0.15)} style={{ fontFamily: "'Jost', sans-serif", fontSize: ".68rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "block", width: 40, height: 1, background: "var(--gold)", borderRadius: 999 }} />
            Assyrische Hochschulgruppe Rhein-Main e.V.
          </motion.div>

          <motion.h1 {...fadeUp(0.28)} style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(2.4rem,5.5vw,5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1.1rem", letterSpacing: "-.01em" }}>
            Zwischen Geschichte<br />und{" "}
            <em style={{ fontStyle: "normal", background: "linear-gradient(100deg,var(--gold),#e8c96a,var(--gold))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Zukunft.</em>
          </motion.h1>

          <motion.p {...fadeUp(0.42)} style={{ fontFamily: "'Jost', sans-serif", fontSize: ".9rem", fontWeight: 500, letterSpacing: ".25em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.9rem" }}>
            <span style={{ color: "var(--text)" }}>Identität.</span>{" "}
            <span style={{ color: "var(--text)" }}>Bildung.</span>{" "}
            <span style={{ color: "var(--text)" }}>Gemeinschaft.</span>
          </motion.p>

          <motion.p {...fadeUp(0.55)} style={{ fontFamily: "'Lora', Georgia, serif", color: "var(--muted)", fontSize: "1rem", lineHeight: 1.9, maxWidth: 540, marginBottom: "2.6rem" }}>
            ASHOR ist eine anerkannte Hochschulgruppe der Johannes Gutenberg-Universität Mainz. Wir verbinden assyrische Studierende und Akademiker in der Rhein-Main-Region.
          </motion.p>

          <motion.div {...fadeUp(0.68)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/#mitmachen" style={{ fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--text)", padding: ".88rem 1.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--gold-line)" }}>
              Mitglied werden
            </Link>
            <Link href="/#ueber-uns" style={{ fontFamily: "'Jost', sans-serif", background: "transparent", color: "var(--muted)", padding: ".88rem 1.5rem", borderRadius: 999, textDecoration: "none", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--line)" }}>
              Mehr erfahren
            </Link>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.78)} className="hero-visual" style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <Image src="/logo.png" alt="ASHOR Logo" width={360} height={360} className="logo-img" style={{ objectFit: "contain" }} priority />
        </motion.div>
      </div>

      <div className="scroll-hint" style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", fontFamily: "'Jost', sans-serif", color: "var(--muted2)", fontSize: ".62rem", letterSpacing: ".25em", textTransform: "uppercase" }}>
        <span>Scroll</span>
        <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(to bottom,transparent,var(--gold))", borderRadius: 999, animation: "scrollAnim 2.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
