import Image from "next/image";

export default function Donate() {
  return (
    <section id="spenden" style={{ padding: "4rem 1.5rem", background: "var(--surface2)", borderTop: "1px solid var(--line)", scrollMarginTop: 74 }}>
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: ".6rem" }}>Unterstützen</div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: ".6rem" }}>ASHOR fördern</h2>
          <p style={{ color: "var(--muted)", fontSize: ".9rem", maxWidth: 500, marginBottom: "1.5rem" }}>
            Jede Spende unterstützt unsere Veranstaltungen, Bildungsreisen und kulturellen Projekte. Als eingetragener Verein verwenden wir Mittel ausschließlich für gemeinnützige Zwecke.
          </p>
          <a
            href="https://paypal.me/ashorev"
            target="_blank"
            rel="noopener"
            style={{ fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--gold)", padding: "1rem 2rem", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".16em", textTransform: "uppercase", border: "1px solid var(--gold-line)", whiteSpace: "nowrap" }}
          >
            ♡ Per PayPal spenden
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".75rem" }}>
          <a href="https://paypal.me/ashorev" target="_blank" rel="noopener">
            <Image src="/qr-paypal.png" alt="QR-Code – Spende an ASHOR e.V." width={160} height={160} style={{ borderRadius: 8, border: "1px solid var(--line)" }} />
          </a>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted2)" }}>QR-Code scannen</span>
        </div>
      </div>
    </section>
  );
}
