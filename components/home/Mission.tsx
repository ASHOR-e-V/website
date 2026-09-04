"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const values = [
  { title: "Bildung & Austausch", desc: "Workshops, Vorträge und interdisziplinäre Diskussionsformate für akademische Weiterentwicklung." },
  { title: "Kulturelle Identität", desc: "Wissenschaftliche und kulturelle Auseinandersetzung mit Geschichte, Sprache und Gegenwart des assyrischen Volkes." },
  { title: "Gemeinschaft & Netzwerk", desc: "Ein stabiles Netzwerk für assyrische Studierende und Akademiker, das über das Studium hinausträgt." },
  { title: "Respekt & Werte", desc: "Respektvoller Umgang als Grundprinzip. Wir distanzieren uns ausdrücklich von jeder Form von Diskriminierung." },
];

export default function Mission() {
  return (
    <>
      {/* Big standalone statement — an Apple-style pull quote, given room to breathe */}
      <section style={{ padding: "8rem 1.5rem 5rem", scrollMarginTop: 74 }} className="section-pad">
        <motion.div {...fadeUp(0, 26)} style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontStyle: "normal", fontSize: "clamp(1.5rem,3.4vw,2.6rem)", lineHeight: 1.4, color: "var(--text)", fontWeight: 600, letterSpacing: "-.01em" }}>
            „Das heutige assyrische Volk trägt ein Erbe, das Jahrtausende überspannt — <span style={{ color: "var(--lapis)" }}>ASHOR</span> gibt diesem Erbe an der Universität eine Stimme."
          </p>
        </motion.div>
      </section>

      <section id="ueber-uns" style={{ padding: "3rem 1.5rem 8rem", scrollMarginTop: 74 }} className="section-pad">
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>

          <div className="grid-mission" style={{ gap: "5rem" }}>

            {/* Left: prose */}
            <motion.div {...fadeUp(0, 26)}>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(1.9rem,3.8vw,3rem)", fontWeight: 700, lineHeight: 1.08, marginBottom: "2rem", letterSpacing: "-.01em" }}>
                Akademisch verankert.<br />Kulturell verwurzelt.
              </h2>

              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2, marginBottom: "1.1rem", fontSize: ".98rem" }}>
                Als Nachfahren der antiken Zivilisationen Assyriens, Akkads, Babylons und Sumers verbindet uns eine Geschichte, die Mesopotamien als Wiege menschlicher Zivilisation begründete.
              </p>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 2, fontSize: ".98rem" }}>
                ASHOR wurde gegründet, um assyrischen Studierenden und Alumni im Rhein-Main-Gebiet einen Ort des interdisziplinären Austauschs, der kulturellen Verortung und der akademischen Weiterentwicklung zu bieten. Wir kooperieren mit Institutionen und Partnerorganisationen in der gesamten Region.
              </p>
            </motion.div>

            {/* Right: values as editorial list */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }} style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1.5rem", paddingBottom: ".75rem", borderBottom: "1px solid var(--line)" }}>
                Unsere Grundsätze
              </motion.div>
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                  style={{ paddingTop: "1.4rem", paddingBottom: "1.4rem", borderBottom: i < values.length - 1 ? "1px solid var(--line)" : "none" }}
                >
                  <h4 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text)", marginBottom: ".4rem" }}>{v.title}</h4>
                  <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, margin: 0 }}>{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
