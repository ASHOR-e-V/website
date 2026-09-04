"use client";
import Image from "next/image";
import Link from "next/link";
import { MaskReveal, Rise } from "@/components/Reveal";
import { HeartIcon } from "@/components/icons";

const bank = [
  { label: "Empfänger", value: "Assyrische Hochschulgruppe Rhein-Main e.V." },
  { label: "IBAN", value: "DE53 5535 0010 0022 9713 96" },
  { label: "BIC", value: "MALADE51WOR" },
];

export default function Donate() {
  return (
    <section
      id="spenden"
      style={{ padding: "6.5rem 1.5rem", background: "var(--bg)", borderTop: "1px solid var(--line)", scrollMarginTop: 100 }}
      className="section-pad"
    >
      <div className="donate-flex" style={{ maxWidth: "var(--max)", margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 460px", minWidth: 0 }}>
          <Rise y={14}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".85rem", marginBottom: "1.2rem" }}>
              <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "var(--gold-solid)" }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)" }}>
                Spenden
              </span>
            </div>
          </Rise>

          <MaskReveal as="h2" duration={1.05} style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem,3.2vw,2.4rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-.015em" }}>
            ASHOR fördern
          </MaskReveal>

          <Rise delay={0.18} y={18}>
            <p style={{ color: "var(--muted)", fontSize: ".95rem", maxWidth: 520, marginBottom: "1.9rem", fontFamily: "'Lora', serif", lineHeight: 1.95 }}>
              Jede Spende unterstützt unsere Veranstaltungen, Bildungsreisen und kulturellen Projekte. Der Verein ist selbstlos tätig und verwendet alle Mittel ausschließlich für die satzungsgemäßen Zwecke — per PayPal oder Banküberweisung.
            </p>
          </Rise>

          <Rise delay={0.28} y={16}>
            <a
              href="https://paypal.me/ashorev"
              target="_blank"
              rel="noopener"
              className="btn-solid"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".55rem",
                fontFamily: "'Jost', sans-serif", background: "var(--gold-solid)", color: "var(--on-gold)",
                padding: "1rem 2.1rem", borderRadius: 999, textDecoration: "none", fontWeight: 700,
                fontSize: ".76rem", letterSpacing: ".16em", textTransform: "uppercase", whiteSpace: "nowrap",
              }}
            >
              <HeartIcon size={13} /> Per PayPal spenden
            </a>
          </Rise>

          <Rise delay={0.36} y={16}>
            <div style={{ marginTop: "1.8rem", padding: "1.5rem 1.7rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", maxWidth: 460 }}>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1.1rem" }}>
                Banküberweisung
              </div>
              <dl style={{ display: "flex", flexDirection: "column", gap: ".9rem", margin: 0 }}>
                {bank.map((b) => (
                  <div key={b.label}>
                    <dt style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".25rem" }}>
                      {b.label}
                    </dt>
                    <dd style={{ fontFamily: "'Jost', sans-serif", fontSize: ".88rem", color: "var(--text)", fontWeight: 500, margin: 0, letterSpacing: b.label === "IBAN" || b.label === "BIC" ? ".04em" : 0, fontVariantNumeric: "tabular-nums" }}>
                      {b.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".64rem", color: "var(--muted2)", marginTop: "1.2rem", lineHeight: 1.7 }}>
                Für eine Spendenbescheinigung schreib uns an{" "}
                <a href="mailto:ashor.jgu@gmail.com" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  ashor.jgu@gmail.com
                </a>
                .
              </p>
            </div>
          </Rise>
        </div>

        <Rise delay={0.2} y={20} style={{ flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".9rem" }}>
            <a href="https://paypal.me/ashorev" target="_blank" rel="noopener" aria-label="Per PayPal an ASHOR e.V. spenden">
              <Image
                src="/qr-paypal.png"
                alt="QR-Code zur PayPal-Spendenseite von ASHOR e.V."
                width={168}
                height={168}
                sizes="168px"
                style={{ borderRadius: "var(--r-md)", border: "1px solid var(--line)", display: "block", background: "#fff", padding: 6 }}
              />
            </a>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted2)" }}>
              QR-Code scannen
            </span>
            <Link
              href="/satzung#p11"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted2)", textDecoration: "none", border: "1px solid var(--line)", borderRadius: 999, padding: ".28rem .8rem" }}
            >
              Mittelverwendung · § 11
            </Link>
          </div>
        </Rise>
      </div>
    </section>
  );
}
