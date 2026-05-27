const values = [
  { num: "01", title: "Bildung & interdisziplinärer Austausch", desc: "Wir fördern den Wissensaustausch zwischen Studierenden verschiedener Fachrichtungen und unterstützen die akademische Weiterentwicklung durch Workshops, Vorträge und Diskussionsformate." },
  { num: "02", title: "Kulturelle Identität & assyrisches Erbe", desc: "Wir befassen uns wissenschaftlich und kulturell mit Geschichte, Sprache und Gegenwart des assyrischen Volkes – differenziert, sachlich und zukunftsorientiert." },
  { num: "03", title: "Gemeinschaft & Vernetzung", desc: "Wir schaffen ein stabiles Netzwerk für assyrische Studierende und Akademiker in der Rhein-Main-Region, das über das Studium hinausträgt." },
  { num: "04", title: "Werte & Respekt", desc: "Ein respektvoller Umgang steht im Mittelpunkt unserer Gemeinschaft. Wir distanzieren uns ausdrücklich von jeder Form von Diskriminierung und Belästigung." },
];

export default function Mission() {
  return (
    <section id="ueber-uns" style={{ padding: "6.5rem 1.5rem", scrollMarginTop: 74 }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
          <span style={{ display: "block", width: 30, height: 1, background: "var(--gold)", borderRadius: 999 }} />
          Über uns
        </div>
        <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(1.8rem,3.7vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-.01em" }}>
          Akademisch verankert.<br />Kulturell verwurzelt.
        </h2>

        <div className="grid-mission">
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.5rem", boxShadow: "var(--shadow)" }}>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2, marginBottom: "1.1rem" }}>
              Das heutige assyrische Volk hat seine Wurzeln in Mesopotamien – einer Region, die Teile des heutigen Irak, Syrien, der Türkei und des Iran umfasst. Als Nachfahren der antiken Zivilisationen Assyriens, Akkads, Babylons und Sumers tragen wir ein Erbe, das Jahrtausende überspannt.
            </p>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2, marginBottom: "1.1rem" }}>
              ASHOR wurde gegründet, um assyrischen Studierenden und Alumnis im Rhein-Main-Gebiet einen Ort des interdisziplinären Austauschs, der kulturellen Verortung und der akademischen Weiterentwicklung zu bieten.
            </p>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2 }}>
              Wir sind eine anerkannte Hochschulgruppe der Johannes Gutenberg-Universität Mainz und kooperieren mit Institutionen und Partnerorganisationen in der gesamten Rhein-Main-Region.
            </p>
          </div>

          <div style={{ background: "var(--surface2)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
            {values.map((v, i) => (
              <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1.4rem 1.6rem", borderBottom: i < values.length - 1 ? "1px solid var(--line)" : "none" }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, color: "var(--gold)", width: 40, flexShrink: 0, lineHeight: 1, paddingTop: ".25rem" }}>{v.num}</span>
                <div>
                  <h4 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".8rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text)", marginBottom: ".35rem" }}>{v.title}</h4>
                  <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.8 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
