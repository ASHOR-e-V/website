"use client";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { MaskReveal, Rise, RiseGroup, RiseItem } from "@/components/Reveal";
import { InstagramIcon, TikTokIcon, MailIcon } from "@/components/icons";

/**
 * Membership criteria are taken straight from § 4 of the Satzung rather than
 * paraphrased — the earlier copy left out Bachelor/Master Professional
 * holders, who are explicitly eligible.
 */
const perks = [
  { text: "Einladungen zu allen Veranstaltungen und Formaten", ref: "§ 2" },
  { text: "Zugang zum internen Mitgliederbereich", ref: null },
  { text: "Studienberatung, Mentoring und Netzwerkzugang", ref: "§ 2 (2)" },
  { text: "Stimmrecht als Vollmitglied ab zwei Veranstaltungen pro Semester", ref: "§ 4 (4)" },
];

const socials = [
  { href: "https://www.instagram.com/ashor_e.v/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/@ashor_e.v", label: "TikTok", Icon: TikTokIcon },
  { href: "mailto:ashor.jgu@gmail.com", label: "E-Mail", Icon: MailIcon },
];

export default function Join() {
  return (
    <section
      id="mitmachen"
      style={{ padding: "8rem 1.5rem", position: "relative", scrollMarginTop: 100, background: "var(--surface2)", borderTop: "1px solid var(--line)" }}
      className="section-pad"
    >
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="grid-2col" style={{ alignItems: "start" }}>
          <div>
            <Rise y={14}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "1.3rem" }}>
                <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)" }} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Mitmachen
                </span>
              </div>
            </Rise>

            <MaskReveal as="h2" duration={1.05} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: ".3rem" }}>
              Teil von ASHOR
            </MaskReveal>
            <MaskReveal as="h2" delay={0.1} duration={1.05} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: "1.5rem" }}>
              werden.
            </MaskReveal>

            <Rise delay={0.22} y={18}>
              <p style={{ color: "var(--muted)", lineHeight: 2, marginBottom: "2.2rem", maxWidth: 440, fontFamily: "'Lora', serif", fontSize: ".97rem" }}>
                Mitglied werden können eingeschriebene Studierende und Alumni sowie Personen mit einem Bachelor Professional oder Master Professional, die die Ziele des Vereins unterstützen. Die Mitgliedschaft ist beitragsfrei — über die Aufnahme entscheidet der Vorstand.
              </p>
            </Rise>

            <RiseGroup>
              {perks.map((p) => (
                <RiseItem key={p.text} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold-solid)", flexShrink: 0, marginTop: ".62rem" }} />
                  <p style={{ color: "var(--muted)", fontSize: ".9rem", margin: 0, fontFamily: "'Lora', serif", lineHeight: 1.75 }}>
                    {p.text}
                    {p.ref && (
                      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".1em", color: "var(--muted2)", marginLeft: ".55rem", whiteSpace: "nowrap" }}>
                        {p.ref}
                      </span>
                    )}
                  </p>
                </RiseItem>
              ))}
            </RiseGroup>

            <Rise delay={0.12} y={16}>
              <div style={{ marginTop: "2.4rem", display: "flex", gap: ".7rem", flexWrap: "wrap" }}>
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener"}
                    className="btn-ghost"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: ".5rem",
                      fontFamily: "'Jost', sans-serif", fontSize: ".64rem", letterSpacing: ".14em",
                      textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line-strong)",
                      padding: ".5rem 1rem", borderRadius: "var(--r-sm)", textDecoration: "none", fontWeight: 500,
                    }}
                  >
                    <Icon size={13} /> {label}
                  </a>
                ))}
              </div>
            </Rise>

            <Rise delay={0.18} y={14}>
              <p style={{ marginTop: "1.8rem", fontFamily: "'Jost', sans-serif", fontSize: ".7rem", color: "var(--muted2)", lineHeight: 1.7 }}>
                Alle Rechte und Pflichten stehen in{" "}
                <Link href="/satzung#p4" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  § 4 der Satzung
                </Link>
                .
              </p>
            </Rise>
          </div>

          <Rise delay={0.16} y={24} style={{ minWidth: 0 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-lg)", padding: "2.5rem" }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: ".45rem" }}>
                Kontakt aufnehmen
              </h3>
              <p style={{ color: "var(--muted2)", fontSize: ".76rem", marginBottom: "1.7rem", fontFamily: "'Jost', sans-serif", letterSpacing: ".04em" }}>
                Für Mitgliedschaft, Kooperationen und Presse
              </p>
              <ContactForm />
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
