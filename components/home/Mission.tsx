const values = [
  { num: "01", title: "Bildung & Austausch", desc: "Workshops, Vorträge und interdisziplinäre Diskussionsformate für akademische Weiterentwicklung." },
  { num: "02", title: "Kulturelle Identität", desc: "Wissenschaftliche und kulturelle Auseinandersetzung mit Geschichte, Sprache und Gegenwart des assyrischen Volkes." },
  { num: "03", title: "Gemeinschaft & Netzwerk", desc: "Ein stabiles Netzwerk für assyrische Studierende und Akademiker, das über das Studium hinausträgt." },
  { num: "04", title: "Respekt & Werte", desc: "Respektvoller Umgang als Grundprinzip. Wir distanzieren uns ausdrücklich von jeder Form von Diskriminierung." },
];

export default function Mission() {
  return (
    <section id="ueber-uns" style={{ padding: "6.5rem 1.5rem", scrollMarginTop: 74 }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>

        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".32em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
          <span style={{ display: "block", width: 28, height: 1, background: "var(--gold)", borderRadius: 999, opacity: .6 }} />
          Über uns
        </div>

        <div className="grid-mission" style={{ gap: "5rem" }}>

          {/* Left: prose */}
          <div>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, lineHeight: 1.08, marginBottom: "2rem", letterSpacing: "-.01em" }}>
              Akademisch verankert.<br />Kulturell verwurzelt.
            </h2>

            {/* Pull quote */}
            <blockquote style={{ borderLeft: "3px solid var(--lapis)", paddingLeft: "1.4rem", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.75 }}>
                „Das heutige assyrische Volk trägt ein Erbe, das Jahrtausende überspannt — ASHOR gibt diesem Erbe an der Universität eine Stimme."
              </p>
            </blockquote>

            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2, marginBottom: "1.1rem", fontSize: ".95rem" }}>
              Als Nachfahren der antiken Zivilisationen Assyriens, Akkads, Babylons und Sumers verbindet uns eine Geschichte, die Mesopotamien als Wiege menschlicher Zivilisation begründete.
            </p>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2, fontSize: ".95rem" }}>
              ASHOR wurde gegründet, um assyrischen Studierenden und Alumni im Rhein-Main-Gebiet einen Ort des interdisziplinären Austauschs, der kulturellen Verortung und der akademischen Weiterentwicklung zu bieten. Wir kooperieren mit Institutionen und Partnerorganisationen in der gesamten Region.
            </p>
          </div>

          {/* Right: values as editorial list */}
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1.5rem", paddingBottom: ".75rem", borderBottom: "1px solid var(--line)" }}>
              Unsere Grundsätze
            </div>
            {values.map((v, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "1rem", paddingTop: "1.4rem", paddingBottom: "1.4rem", borderBottom: i < values.length - 1 ? "1px solid var(--line)" : "none" }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)", opacity: .45, lineHeight: 1, paddingTop: ".1rem" }}>{v.num}</span>
                <div>
                  <h4 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text)", marginBottom: ".4rem" }}>{v.title}</h4>
                  <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
