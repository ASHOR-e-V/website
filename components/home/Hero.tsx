"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskReveal, Rise } from "@/components/Reveal";
import Shamash from "@/components/Shamash";
import { ArrowRightIcon, UserPlusIcon } from "@/components/icons";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Three parallax planes moving at different rates — the disc drifts slowly,
  // the texture behind it slower still, so depth reads without any jank.
  const discY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const discRotate = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const discScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const discOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);
  const textureY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: "100svh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}
    >
      {/* ── Background planes ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--bg)" }} />

      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", inset: "-10%",
          y: textureY,
          backgroundImage:
            "linear-gradient(rgba(209,162,74,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(209,162,74,0.045) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage: "radial-gradient(ellipse 85% 80% at 55% 45%, black 10%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 55% 45%, black 10%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 900px 560px at 74% 42%, rgba(61,111,170,.17), transparent 66%), radial-gradient(ellipse 640px 420px at 8% 72%, rgba(209,162,74,.11), transparent 66%), radial-gradient(ellipse 520px 400px at 32% 12%, rgba(201,106,69,.075), transparent 66%)",
        }}
      />

      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "32%", background: "linear-gradient(to top, var(--bg), transparent)" }} />

      {/* ── Content ── */}
      <motion.div
        style={{
          position: "relative", zIndex: 2, maxWidth: "var(--max)", margin: "0 auto",
          padding: "8.5rem 1.5rem 5.5rem", width: "100%",
          y: copyY, opacity: copyOpacity,
        }}
        className="grid-hero hero-pad"
        data-parallax=""
      >
        <div style={{ minWidth: 0 }}>
          <Rise duration={0.75} y={14}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "2rem" }}>
              <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500 }}>
                Hochschulgruppe der JGU Mainz
              </span>
            </div>
          </Rise>

          <h1
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "clamp(2.7rem,6.6vw,6rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              marginBottom: "1.9rem",
              letterSpacing: "-.022em",
            }}
          >
            <MaskReveal delay={0.08} duration={1.15}>Zwischen</MaskReveal>
            <MaskReveal delay={0.19} duration={1.15}>
              <span style={{ color: "var(--gold)" }}>Geschichte</span>
            </MaskReveal>
            <MaskReveal delay={0.3} duration={1.15}>und Zukunft.</MaskReveal>
          </h1>

          <Rise delay={0.5} y={22}>
            <p style={{ fontFamily: "'Lora', Georgia, serif", color: "var(--muted)", fontSize: "1.08rem", lineHeight: 1.95, maxWidth: 500, marginBottom: "2.8rem" }}>
              Wir verbinden assyrische Studierende und Akademiker in der Rhein-Main-Region — für akademischen Austausch, kulturelle Verortung und ein Netzwerk, das über das Studium hinaus trägt.
            </p>
          </Rise>

          <Rise delay={0.66} y={18}>
            <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/mitmachen"
                className="btn-solid"
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".6rem",
                  fontFamily: "'Jost', sans-serif", background: "var(--gold-solid)", color: "var(--on-gold)",
                  padding: "1rem 2.1rem", borderRadius: 999, textDecoration: "none", fontWeight: 700,
                  fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", whiteSpace: "nowrap",
                }}
              >
                <UserPlusIcon size={14} /> Mitglied werden
              </Link>
              <Link
                href="/events"
                className="btn-ghost link-arrow"
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".55rem",
                  fontFamily: "'Jost', sans-serif", background: "transparent", color: "var(--muted)",
                  padding: "1rem 1.7rem", borderRadius: 999, textDecoration: "none", fontWeight: 500,
                  fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase",
                  border: "1px solid var(--line-strong)", whiteSpace: "nowrap",
                }}
              >
                Veranstaltungen <ArrowRightIcon size={13} />
              </Link>
            </div>
          </Rise>

        </div>

        {/* ── The sun disc, with the association mark at its centre ── */}
        <div className="hero-visual" style={{ alignItems: "center", justifyContent: "center" }}>
          <motion.div
            style={{
              position: "relative", width: 400, height: 400,
              display: "flex", alignItems: "center", justifyContent: "center",
              y: discY, scale: discScale, opacity: discOpacity,
            }}
          >
            {/* The sun disc sits concentric with the mark and far behind it —
                an aura rather than a second emblem — and turns with the scroll. */}
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute", top: "50%", left: "50%",
                x: "-50%", y: "-50%", rotate: discRotate,
                opacity: 0.07, pointerEvents: "none", lineHeight: 0,
              }}
            >
              <Shamash size={760} rayWidth={2.8} />
            </motion.div>

            {/* Concentric rings hold the mark without decorating it. */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--gold-line)", opacity: 0.45 }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 42, borderRadius: "50%", border: "1px solid var(--gold-line)", opacity: 0.28 }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 70, borderRadius: "50%", background: "radial-gradient(circle at center, rgba(61,111,170,0.15), transparent 70%)" }} />

            <Image
              src="/logo.png"
              alt="ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V."
              width={232}
              height={232}
              sizes="232px"
              className="logo-img"
              style={{ objectFit: "contain", position: "relative", zIndex: 1 }}
              priority
            />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
