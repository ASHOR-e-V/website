import Image from "next/image";

const main = [
  { name: "Caroline Barsoum", role: "Präsidentin", desc: "Leitet den Verein, vertritt ASHOR nach außen und koordiniert die strategische Ausrichtung.", photo: "/team/caroline.jpeg" },
  { name: "Robina Lajin", role: "Vizepräsidentin", desc: "Unterstützt die Präsidentin, koordiniert interne Prozesse und trägt zur inhaltlichen Weiterentwicklung bei.", photo: "/team/robina.jpeg", photoZoom: 1.8 },
  { name: "Severios Isac", role: "Protokolldirektor", desc: "Erstellt und verwaltet Sitzungsprotokolle und sichert die Transparenz der Vereinsarbeit.", photo: "/team/severios.png" },
  { name: "Ninous Andersson", role: "Finanzdirektor", desc: "Verantwortet Finanzen, Mittelverwendung und Finanzberichte des Vereins.", photo: "/team/ninous.jpeg" },
];
const bei = [
  { name: "Dalia Abdo", role: "Beisitzerin", desc: "Unterstützt den Vorstand bei Planung und Durchführung von Veranstaltungen.", photo: "/team/dalia.jpeg" },
  { name: "Roben Lajin", role: "Beisitzer", desc: "Unterstützt den Vorstand bei Planung und Durchführung von Veranstaltungen.", photo: "/team/roben.jpeg" },
];

function BoardCard({ name, role, desc, photo, photoZoom }: { name: string; role: string; desc: string; photo: string; photoZoom?: number }) {
  return (
    <div className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "1.8rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--lapis),var(--gold))" }} />
      <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", margin: "0 auto 1.2rem", border: "2px solid var(--gold-line)" }}>
        <Image src={photo} alt={name} width={100} height={100} style={{ objectFit: "cover", width: "100%", height: "100%", transform: photoZoom ? `scale(${photoZoom})` : undefined }} />
      </div>
      <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: ".3rem", textAlign: "center" }}>{name}</h4>
      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: ".8rem", fontWeight: 600, textAlign: "center" }}>{role}</div>
      <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, textAlign: "center" }}>{desc}</p>
    </div>
  );
}

export default function Board() {
  return (
    <section id="vorstand" style={{ padding: "6.5rem 1.5rem", scrollMarginTop: 74 }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
          <span style={{ display: "block", width: 30, height: 1, background: "var(--gold)", borderRadius: 999 }} />
          Vorstand
        </div>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.7vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-.01em" }}>Unser Leitungsgremium</h2>
        <p style={{ color: "var(--muted)", maxWidth: 640, marginBottom: "2.5rem", fontFamily: "'Lora', serif" }}>
          Der Vorstand von ASHOR besteht aus sieben Mitgliedern, gewählt für zwei Semester.
        </p>

        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1rem", paddingBottom: ".6rem", borderBottom: "1px solid var(--line)" }}>Geschäftsführender Vorstand</div>
        <div className="grid-4col" style={{ marginBottom: "2rem" }}>
          {main.map(m => <BoardCard key={m.name} {...m} />)}
        </div>

        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1rem", paddingBottom: ".6rem", borderBottom: "1px solid var(--line)" }}>Beisitzer</div>
        <div className="grid-2col" style={{ maxWidth: 640 }}>
          {bei.map(m => <BoardCard key={m.name} {...m} />)}
        </div>
      </div>
    </section>
  );
}
