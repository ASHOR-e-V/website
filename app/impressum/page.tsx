export const metadata = {
  title: "Impressum",
  description: "Impressum der Assyrischen Hochschulgruppe Rhein-Main e.V. (ASHOR) gemäß § 5 TMG.",
};

const sections = [
  {
    title: "Angaben gemäß § 5 TMG",
    content: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.\nJohannes Gutenberg-Universität Mainz\n55099 Mainz",
  },
  {
    // § 8 (2) und (12) der Satzung: der geschäftsführende Vorstand bildet den
    // Vorstand im Sinne des § 26 BGB, und jedes Mitglied vertritt allein.
    title: "Vertretungsberechtigter Vorstand (§ 26 BGB)",
    content:
      "Caroline Barsoum (Präsidentin)\nRobina Lajin (Vizepräsidentin)\nSeverios Isac (Protokolldirektor)\nNinous Andersson (Finanzdirektor)\n\nJedes Mitglied des geschäftsführenden Vorstands vertritt den Verein allein (§ 8 Abs. 12 der Satzung).",
  },
  {
    title: "Kontakt",
    content: "E-Mail: ashor.jgu@gmail.com\nInstagram: @ashor_e.v",
  },
  {
    title: "Vereinsregister",
    content: "Eingetragener Verein (e.V.)\nRegistergericht: Amtsgericht Mainz",
  },
  {
    title: "Redaktionell verantwortlich",
    content: "Caroline Barsoum\nJohannes Gutenberg-Universität Mainz\n55099 Mainz",
  },
  {
    title: "Streitbeilegung",
    content:
      "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
  },
];

export default function Impressum() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "5.5rem 1.5rem 6rem" }}>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4.5vw,2.8rem)", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-.015em" }}>
          Impressum
        </h1>

        {sections.map((s) => (
          <section key={s.title} style={{ marginBottom: "2.6rem" }}>
            <h2 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, marginBottom: ".9rem" }}>
              {s.title}
            </h2>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 1.95, whiteSpace: "pre-line" }}>
              {s.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
