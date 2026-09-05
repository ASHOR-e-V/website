"use client";
import { useRef, useState, useEffect, useCallback, forwardRef } from "react";
import { motion } from "framer-motion";
import { MaskReveal, Rise } from "@/components/Reveal";
import Shamash from "@/components/Shamash";
import { easeOut } from "@/lib/motion";

/**
 * "Woher wir kommen" — a scroll-driven narrative.
 *
 * The text is drawn from the association's own Präambel rather than written
 * as filler: this is the passage the Mitgliederversammlung actually adopted.
 * On desktop a diagram stays pinned alongside while the chapters scroll past,
 * crossfading to match whichever chapter you are reading. On narrow screens
 * the same diagrams sit inline above each chapter, so nothing is lost.
 */

type Chapter = {
  id: string;
  ordinal: string;
  heading: string;
  body: string;
  scene: "orte" | "sprache" | "namen" | "heute";
};

const CHAPTERS: Chapter[] = [
  {
    id: "mesopotamien",
    ordinal: "01",
    heading: "Ein Erbe aus dem Zweistromland",
    body: "Das heutige assyrische Volk hat seine Wurzeln in Mesopotamien — einer Region, die Teile des heutigen Irak, Syrien, der Türkei und des Iran umfasst. Assyrer*innen sind die Nachfahren der antiken Zivilisationen des Zweistromlandes: Assyrien, Akkad, Babylon, Sumer und die Aramäer*innen.",
    scene: "orte",
  },
  {
    id: "sprache",
    ordinal: "02",
    heading: "Eine Sprache, zwei Zweige",
    body: "Die modernen Assyrer*innen sprechen Neo-Aramäisch beziehungsweise Neo-Assyrisch. Die Sprache geht aus dem Akkadischen und Aramäischen hervor und teilt sich in zwei Hauptdialekte: den Westdialekt Surayt und den Ostdialekt Surit.",
    scene: "sprache",
  },
  {
    id: "namen",
    ordinal: "03",
    heading: "Wie wir uns nennen",
    body: "Selbst nennen sich Assyrer*innen Suraye/Suroye oder Suryaye/Suryoye. In der Fremdbezeichnung werden Assyrer*in, Chaldäer*in und Aramäer*in verwendet — aus unserer Perspektive bezeichnen alle drei dasselbe Volk. Wir vereinheitlichen zu Assyrer*innen und erkennen alle drei Begriffe als gleichwertig an.",
    scene: "namen",
  },
  {
    id: "heute",
    ordinal: "04",
    heading: "Und heute, in Mainz",
    body: "Als Studierende der Universität Mainz und der umliegenden Region erforschen wir diese Identität auf wissenschaftlicher und kultureller Ebene weiter. Ziel ist es, die antiken Wurzeln und modernen Einflüsse unseres Volkes besser zu verstehen — und dieses Wissen zu teilen.",
    scene: "heute",
  },
];

/* ── Scene primitives ─────────────────────────────────────────────── */

const CIVS = ["Sumer", "Akkad", "Babylon", "Assyrien"];

function SceneOrte({ active }: { active: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "flex-start", margin: "0 auto" }}>
      {CIVS.map((c, i) => (
        <div key={c} style={{ display: "flex", alignItems: "center", gap: "1.1rem", minHeight: 62 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "stretch" }}>
            <motion.span
              style={{ width: 1, flex: 1, background: "var(--gold-line)", transformOrigin: "top", opacity: i === 0 ? 0 : 1 }}
              initial={{ scaleY: 0 }}
              animate={active ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.14, ease: easeOut }}
            />
            <motion.span
              style={{ width: 9, height: 9, borderRadius: "50%", border: "1.5px solid var(--gold-solid)", background: "var(--bg)", flexShrink: 0 }}
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 0.18 + i * 0.14, ease: easeOut }}
            />
            <motion.span
              style={{ width: 1, flex: 1, background: "var(--gold-line)", transformOrigin: "top", opacity: i === CIVS.length - 1 ? 0 : 1 }}
              initial={{ scaleY: 0 }}
              animate={active ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.35, delay: 0.24 + i * 0.14, ease: easeOut }}
            />
          </div>
          <motion.span
            style={{ fontFamily: "'Cinzel', serif", fontSize: "1.32rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-.005em" }}
            initial={{ opacity: 0, x: -10 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.55, delay: 0.24 + i * 0.14, ease: easeOut }}
          >
            {c}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function SceneSprache({ active }: { active: boolean }) {
  const node = (label: string, sub: string, color: string, delay: number, big = false) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.55, delay, ease: easeOut }}
      style={{ textAlign: "center" }}
    >
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: big ? "1.2rem" : ".98rem", fontWeight: 700, color: big ? "var(--gold)" : "var(--text)", lineHeight: 1.3 }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".56rem", letterSpacing: ".18em", textTransform: "uppercase", color, marginTop: ".3rem" }}>
          {sub}
        </div>
      )}
    </motion.div>
  );

  const rule = (delay: number, w = 1, h = 26) => (
    <motion.span
      style={{ display: "block", width: w, height: h, background: "var(--gold-line)", transformOrigin: "top", margin: "0 auto" }}
      initial={{ scaleY: 0 }}
      animate={active ? { scaleY: 1 } : { scaleY: 0 }}
      transition={{ duration: 0.3, delay, ease: easeOut }}
    />
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <div style={{ display: "flex", gap: "2.6rem" }}>
        {node("Akkadisch", "Antik", "var(--muted2)", 0.1)}
        {node("Aramäisch", "Antik", "var(--muted2)", 0.2)}
      </div>
      {rule(0.32)}
      <motion.span
        style={{ display: "block", height: 1, width: 168, background: "var(--gold-line)", transformOrigin: "center" }}
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: easeOut }}
      />
      {rule(0.42)}
      {node("Neo-Aramäisch", "Heute gesprochen", "var(--gold)", 0.5, true)}
      {rule(0.62)}
      <motion.span
        style={{ display: "block", height: 1, width: 200, background: "var(--gold-line)", transformOrigin: "center" }}
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, delay: 0.66, ease: easeOut }}
      />
      {rule(0.76)}
      <div style={{ display: "flex", gap: "3rem" }}>
        {node("Surayt", "Westdialekt", "var(--lapis-text)", 0.84)}
        {node("Surit", "Ostdialekt", "var(--clay)", 0.92)}
      </div>
    </div>
  );
}

function SceneNamen({ active }: { active: boolean }) {
  const group = (title: string, items: string[], color: string, line: string, delay: number) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      style={{ border: `1px solid ${line}`, borderRadius: "var(--r-md)", padding: "1.2rem 1.3rem", background: "var(--surface)" }}
    >
      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".55rem", letterSpacing: ".2em", textTransform: "uppercase", color, marginBottom: ".8rem" }}>
        {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem .9rem" }}>
        {items.map((it) => (
          <span key={it} style={{ fontFamily: "'Cinzel', serif", fontSize: ".95rem", fontWeight: 700, color: "var(--text)" }}>
            {it}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
      {group("Autoethnonym — wie wir uns selbst nennen", ["Suraye", "Suroye", "Suryaye", "Suryoye"], "var(--lapis-text)", "var(--lapis-line)", 0.1)}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.34, ease: easeOut }}
        style={{ display: "flex", alignItems: "center", gap: ".8rem", justifyContent: "center" }}
      >
        <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", whiteSpace: "nowrap" }}>
          ein Volk
        </span>
        <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
      </motion.div>
      {group("Xenonym — Bezeichnungen von außen", ["Assyrer*in", "Chaldäer*in", "Aramäer*in"], "var(--clay)", "var(--clay-line)", 0.44)}
    </div>
  );
}

function SceneHeute({ active }: { active: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.6rem", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.86, rotate: -18 }}
        animate={active ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.86, rotate: -18 }}
        transition={{ duration: 1.1, delay: 0.1, ease: easeOut }}
        style={{ lineHeight: 0 }}
      >
        <Shamash size={132} rayWidth={2.6} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
      >
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-.01em" }}>
          Johannes Gutenberg-Universität
        </div>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".24em", textTransform: "uppercase", color: "var(--gold)", marginTop: ".6rem" }}>
          Mainz · seit 2024
        </div>
      </motion.div>
    </div>
  );
}

function Scene({ kind, active }: { kind: Chapter["scene"]; active: boolean }) {
  if (kind === "orte") return <SceneOrte active={active} />;
  if (kind === "sprache") return <SceneSprache active={active} />;
  if (kind === "namen") return <SceneNamen active={active} />;
  return <SceneHeute active={active} />;
}

/* ── Chapter ──────────────────────────────────────────────────────── */

const ChapterBlock = forwardRef<HTMLDivElement, { chapter: Chapter; isLast: boolean }>(
  function ChapterBlock({ chapter, isLast }, ref) {
  return (
    <div ref={ref} style={{ paddingBottom: isLast ? 0 : "clamp(4rem,12vh,9rem)" }}>
      {/* Inline diagram — narrow screens only; the pinned column covers desktop */}
      <div className="roots-inline-scene" aria-hidden="true">
        <div style={{ padding: "2rem 1.25rem", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", background: "var(--surface)", marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
          <Scene kind={chapter.scene} active />
        </div>
      </div>

      <Rise y={20}>
        <div style={{ display: "flex", alignItems: "center", gap: ".9rem", marginBottom: "1.2rem" }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".2em", color: "var(--gold)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {chapter.ordinal}
          </span>
          <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--line)", maxWidth: 56 }} />
        </div>
      </Rise>

      <MaskReveal as="h3" duration={0.95} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem,2.6vw,2rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.01em", marginBottom: "1.1rem" }}>
        {chapter.heading}
      </MaskReveal>

      <Rise delay={0.14} y={18}>
        <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: "1rem", lineHeight: 2, maxWidth: 520 }}>
          {chapter.body}
        </p>
      </Rise>
    </div>
  );
});

function ChapterArrow({ direction, onClick, disabled }: { direction: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Vorheriges Kapitel" : "Nächstes Kapitel"}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 34, height: 34, flexShrink: 0,
        background: "none", border: "1px solid var(--line-strong)",
        color: disabled ? "var(--muted2)" : "var(--text)",
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "default" : "pointer",
        transition: "color .2s, border-color .2s, opacity .2s",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: direction === "prev" ? "rotate(180deg)" : undefined }}>
        <path d="M5 12h13M12.5 6l6 6-6 6" />
      </svg>
    </button>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export default function Roots() {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * One scroll handler decides which chapter is current, rather than four
   * independent intersection observers.
   *
   * The previous version gave every chapter its own observer with a narrow
   * band across the middle of the viewport. Two things went wrong with that:
   * the generous spacing between chapters meant nobody was inside the band
   * for part of the scroll, so the diagram froze on the previous chapter;
   * and where two chapters overlapped the band, whichever observer fired
   * last won, which is not the same as whichever chapter you are reading.
   *
   * Measuring all four against a single focus line removes both problems —
   * there is always exactly one answer, and it is the same answer whichever
   * direction you scroll from.
   */
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const focus = window.innerHeight * 0.42;
      let best = 0;
      let bestDistance = Infinity;
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        // Distance from the focus line to the chapter's heading area, which
        // is what the reader's eye is actually on.
        const anchor = top + Math.min(height * 0.35, 220);
        const distance = Math.abs(anchor - focus);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /**
   * Manual navigation scrolls the chapter into place rather than setting the
   * index directly. Scroll position stays the single source of truth, so
   * clicking and scrolling can never disagree about which chapter is current.
   */
  const goTo = useCallback((i: number) => {
    const el = chapterRefs.current[i];
    if (!el) return;
    const target = window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.28;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    <section
      id="wurzeln"
      style={{ padding: "8rem 1.5rem", position: "relative", background: "var(--surface2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", scrollMarginTop: 100 }}
      className="section-pad"
    >
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        {/* Section head */}
        <div style={{ maxWidth: 620, marginBottom: "clamp(3rem,8vh,6rem)" }}>
          <Rise y={16}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "1.4rem" }}>
              <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)" }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)" }}>
                Aus der Präambel unserer Satzung
              </span>
            </div>
          </Rise>

          <MaskReveal as="h2" duration={1.05} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4.4vw,3.4rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.02em" }}>
            Woher wir kommen
          </MaskReveal>

          <Rise delay={0.2} y={18}>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: "1.02rem", lineHeight: 1.95, marginTop: "1.4rem" }}>
              Bevor ASHOR ein Verein war, war es eine Frage: Woher kommen wir eigentlich? Die Antwort steht seit der Gründung im ersten Abschnitt unserer Satzung.
            </p>
          </Rise>
        </div>

        {/* Narrative */}
        <div className="roots-layout">
          {/* Pinned diagram column (desktop) */}
          <div className="roots-sticky">
            <div style={{ position: "sticky", top: 150 }}>
              <div
                style={{
                  position: "relative", minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid var(--line)", borderRadius: "var(--r-lg)", background: "var(--surface)", padding: "2.5rem 2rem",
                }}
              >
                {CHAPTERS.map((ch, i) => (
                  <motion.div
                    key={ch.id}
                    animate={{ opacity: activeIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: easeOut }}
                    style={{
                      position: activeIndex === i ? "relative" : "absolute",
                      inset: activeIndex === i ? undefined : 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: activeIndex === i ? 0 : "2.5rem 2rem",
                      pointerEvents: "none", width: "100%",
                    }}
                  >
                    <Scene kind={ch.scene} active={activeIndex === i} />
                  </motion.div>
                ))}
              </div>

              {/* Chapter control: follows the scroll, and can drive it. */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginTop: "1.5rem" }}>
                <ChapterArrow direction="prev" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} />

                <div style={{ display: "flex", gap: ".45rem", alignItems: "center" }}>
                  {CHAPTERS.map((ch, i) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Kapitel ${ch.ordinal}: ${ch.heading}`}
                      aria-current={activeIndex === i}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        padding: ".55rem .2rem", lineHeight: 0,
                      }}
                    >
                      <span
                        style={{
                          display: "block", height: 2, width: activeIndex === i ? 28 : 13,
                          background: activeIndex === i ? "var(--gold-solid)" : "var(--line-strong)",
                          transition: "width .4s cubic-bezier(.16,1,.3,1), background .3s ease",
                        }}
                      />
                    </button>
                  ))}
                </div>

                <ChapterArrow direction="next" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === CHAPTERS.length - 1} />
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div>
            {CHAPTERS.map((ch, i) => (
              <ChapterBlock
                key={ch.id}
                ref={(el) => { chapterRefs.current[i] = el; }}
                chapter={ch}
                isLast={i === CHAPTERS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
