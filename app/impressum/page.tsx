export const metadata = { title: "Impressum – ASHOR" };

export default function Impressum() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "2.5rem", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-.01em" }}>Impressum</h1>
        {[
          { title: "Angaben gemäß § 5 TMG", content: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.\nJohannes Gutenberg-Universität Mainz\n55099 Mainz" },
          { title: "Vertreten durch", content: "Caroline Barsoum (Präsidentin)\nRobina Lajin (Vizepräsidentin)" },
          { title: "Kontakt", content: "E-Mail: ashor.jgu@gmail.com\nInstagram: @ashor_e.v" },
          { title: "Vereinsregister", content: "Eingetragener Verein (e.V.)\nRegistergericht: Amtsgericht Mainz" },
          { title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV", content: "Caroline Barsoum\nJohannes Gutenberg-Universität Mainz\n55099 Mainz" },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, marginBottom: ".8rem" }}>{s.title}</h2>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 1.9, whiteSpace: "pre-line" }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
