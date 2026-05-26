export const metadata = { title: "Satzung – ASHOR" };

const paragraphs = [
  { num: "§ 1", title: "Name, Sitz und Geschäftsjahr", content: `(1) Der Verein führt den Namen „Assyrische Hochschulgruppe Rhein-Main e.V.“, abgekürzt ASHOR.\n\n(2) Der Verein hat seinen Sitz in Mainz und ist im Vereinsregister eingetragen.\n\n(3) Das Geschäftsjahr ist das Kalenderjahr.` },
  { num: "§ 2", title: "Zweck und Gemeinnützigkeit", content: `(1) Der Verein verfolgt ausschließlich und unmittelbar gemeinnützige Zwecke im Sinne des Abschnitts „Steuerbegünstigte Zwecke“ der Abgabenordnung.\n\n(2) Zweck des Vereins ist die Förderung der Bildung, Wissenschaft und Forschung sowie die Pflege und Erhaltung der assyrischen Kultur und Sprache.\n\n(3) Der Verein ist selbstlos tätig; er verfolgt nicht in erster Linie eigenwirtschaftliche Zwecke.` },
  { num: "§ 3", title: "Mitgliedschaft", content: "(1) Ordentliches Mitglied kann jede natürliche Person werden, die an einer Hochschule in der Rhein-Main-Region eingeschrieben ist oder dort als Alumni gilt.\n\n(2) Fördermitglieder können natürliche oder juristische Personen werden, die die Ziele des Vereins unterstützen.\n\n(3) Die Mitgliedschaft ist beitragsfrei. Die Mitgliederversammlung kann durch Beschluss einen Beitrag einführen.\n\n(4) Der Aufnahmeantrag ist schriftlich oder per E-Mail an den Vorstand zu richten. Über die Aufnahme entscheidet der Vorstand.\n\n(5) Die Mitgliedschaft endet durch Austritt (schriftliche Erklärung), Tod oder Ausschluss." },
  { num: "§ 4", title: "Organe des Vereins", content: "Organe des Vereins sind:\n1. Die Mitgliederversammlung\n2. Der Vorstand" },
  { num: "§ 5", title: "Vorstand", content: "(1) Der Vorstand besteht aus sieben Mitgliedern:\n- Präsident/in\n- Vizepräsident/in\n- Protokolldirektor/in\n- Finanzdirektor/in\n- Drei Beisitzer/innen\n\n(2) Der Vorstand wird von der Mitgliederversammlung für zwei Semester gewählt.\n\n(3) Der Verein wird gerichtlich und außergerichtlich durch Präsident/in gemeinsam mit einem weiteren Vorstandsmitglied vertreten.\n\n(4) Der Vorstand ist für alle Angelegenheiten des Vereins zuständig, soweit sie nicht durch diese Satzung der Mitgliederversammlung übertragen sind." },
  { num: "§ 6", title: "Mitgliederversammlung", content: "(1) Die ordentliche Mitgliederversammlung findet mindestens einmal pro Studienjahr statt.\n\n(2) Eine außerordentliche Mitgliederversammlung ist einzuberufen, wenn das Interesse des Vereins es erfordert oder wenn mindestens 25 % der Mitglieder dies schriftlich verlangen.\n\n(3) Jedes Vollmitglied hat eine Stimme. Stimmrecht besitzen Mitglieder, die mindestens zwei Veranstaltungen im laufenden Semester besucht haben.\n\n(4) Beschlüsse werden mit einfacher Mehrheit der anwesenden stimmberechtigten Mitglieder gefasst, sofern die Satzung nichts anderes bestimmt." },
  { num: "§ 7", title: "Satzungsänderungen und Auflösung", content: "(1) Satzungsänderungen bedürfen einer Mehrheit von drei Vierteln der anwesenden stimmberechtigten Mitglieder.\n\n(2) Die Auflösung des Vereins bedarf einer Mehrheit von drei Vierteln aller Mitglieder.\n\n(3) Bei Auflösung oder Aufhebung des Vereins oder bei Wegfall steuerbegünstigter Zwecke fällt das Vermögen an eine juristische Person des öffentlichen Rechts oder eine andere steuerbegünstigte Körperschaft, die es unmittelbar und ausschließlich für gemeinnützige, mildtätige oder kirchliche Zwecke zu verwenden hat." },
];

export default function SatzungPage() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ padding: "5rem 1.5rem 2rem", background: "var(--surface2)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", fontWeight: 600, display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
            <span style={{ display: "block", width: 30, height: 1, background: "var(--gold)", borderRadius: 999 }} />
            Rechtliches
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.01em" }}>
            Satzung<br />
            <em style={{ fontStyle: "normal", background: "linear-gradient(100deg,var(--gold),#e8c96a)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>ASHOR e.V.</em>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {paragraphs.map((p, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2.5rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>{p.num}</span>
              <h2 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".9rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text)" }}>{p.title}</h2>
            </div>
            <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", lineHeight: 1.9, whiteSpace: "pre-line" }}>{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
