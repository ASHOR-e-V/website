"use client";
import Link from "next/link";
import { MaskReveal, Rise, RiseGroup, RiseItem } from "@/components/Reveal";
import { ShamashDivider } from "@/components/Shamash";
import { ArrowRightIcon } from "@/components/icons";

const values = [
  {
    title: "Bildung & Austausch",
    desc: "Workshops, Vorträge und interdisziplinäre Diskussionsformate — plus Studienberatung für Schüler*innen, Berufstätige und Fachwechsler*innen.",
    ref: "§ 2 (1–2)",
  },
  {
    title: "Kulturelle Identität",
    desc: "Wissenschaftliche und kulturelle Auseinandersetzung mit Geschichte, Sprache und Gegenwart des assyrischen Volkes.",
    ref: "§ 2 (2)",
  },
  {
    title: "Gemeinschaft & Netzwerk",
    desc: "Ein Netzwerk für assyrische Studierende und Alumni, das über das Studium hinausträgt — mit Kooperationen in der ganzen Region.",
    ref: "§ 2 (3)",
  },
  {
    title: "Respekt & Werte",
    desc: "Wir vertreten unsere kulturellen Werte und dulden keine Diskriminierung, Belästigung sowie übergriffiges Verhalten.",
    ref: "§ 5",
  },
];

export default function Mission() {
  return (
    <>
      {/* A line from the association's own Präambel, given the whole width. */}
      <section style={{ padding: "8rem 1.5rem 4.5rem", scrollMarginTop: 100 }} className="section-pad">
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <MaskReveal
            as="blockquote"
            duration={1.15}
            bleed={16}
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "clamp(1.5rem,3.6vw,2.7rem)",
              lineHeight: 1.38,
              color: "var(--text)",
              fontWeight: 600,
              letterSpacing: "-.015em",
            }}
          >
            „Die Assyrische Hochschulgruppe ist für jeden offen, der sich für das moderne assyrische Volk interessiert."
          </MaskReveal>

          <Rise delay={0.28} y={16}>
            <div style={{ marginTop: "2.2rem" }}>
              <ShamashDivider maxWidth={220} />
              <Link
                href="/satzung#praeambel"
                style={{
                  display: "inline-block", marginTop: "1.4rem",
                  fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".22em",
                  textTransform: "uppercase", color: "var(--muted2)", textDecoration: "none",
                }}
              >
                Präambel der Satzung
              </Link>
            </div>
          </Rise>
        </div>
      </section>

      <section id="ueber-uns" style={{ padding: "3.5rem 1.5rem 8rem", scrollMarginTop: 100 }} className="section-pad">
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div className="grid-mission" style={{ gap: "5rem" }}>
            {/* Left: what the association is for */}
            <div>
              <Rise y={16}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "1.4rem" }}>
                  <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)" }} />
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)" }}>
                    Über uns
                  </span>
                </div>
              </Rise>

              <MaskReveal as="h2" duration={1.05} style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(1.9rem,3.9vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: ".4rem" }}>
                Akademisch verankert.
              </MaskReveal>
              <MaskReveal as="h2" delay={0.1} duration={1.05} style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(1.9rem,3.9vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "2rem" }}>
                Kulturell verwurzelt.
              </MaskReveal>

              <Rise delay={0.24} y={20}>
                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2.05, marginBottom: "1.2rem", fontSize: ".99rem" }}>
                  ASHOR ist die anerkannte assyrische Hochschulgruppe der Johannes Gutenberg-Universität Mainz. Wir organisieren Vorträge, Debatten, Bildungsreisen und kulturelle Formate — und schaffen einen Ort, an dem fachlicher Austausch und kulturelle Verortung zusammengehören.
                </p>
                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2.05, fontSize: ".99rem" }}>
                  Offen ist die Gruppe für alle, die sich für das moderne assyrische Volk interessieren. Mitglied werden können eingeschriebene Studierende, Alumni sowie Personen mit Bachelor oder Master Professional. Die Mitgliedschaft ist beitragsfrei.
                </p>
              </Rise>

              <Rise delay={0.34} y={16}>
                <Link
                  href="/mitmachen"
                  className="link-arrow"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: ".55rem", marginTop: "2rem",
                    fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".16em",
                    textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", fontWeight: 600,
                  }}
                >
                  So wirst du Mitglied <ArrowRightIcon size={13} />
                </Link>
              </Rise>
            </div>

            {/* Right: the four aims, each tied to the clause that defines it */}
            <div>
              <Rise y={16}>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".22em",
                    textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1.4rem",
                    paddingBottom: ".8rem", borderBottom: "1px solid var(--line)",
                  }}
                >
                  Unsere Ziele — und wo sie festgeschrieben sind
                </div>
              </Rise>

              <RiseGroup>
                {values.map((v, i) => (
                  <RiseItem
                    key={v.title}
                    style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < values.length - 1 ? "1px solid var(--line)" : "none" }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: ".5rem" }}>
                      <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".8rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text)" }}>
                        {v.title}
                      </h3>
                      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".08em", color: "var(--gold)", flexShrink: 0, whiteSpace: "nowrap" }}>
                        {v.ref}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.85, margin: 0 }}>
                      {v.desc}
                    </p>
                  </RiseItem>
                ))}
              </RiseGroup>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
