export const metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Assyrischen Hochschulgruppe Rhein-Main e.V. (ASHOR) — keine Tracking-Tools, keine Cookies, keine Drittanbieter-Schriftarten.",
};

const sections = [
  {
    title: "1. Datenschutz auf einen Blick",
    content:
      "Diese Website erhebt keine personenbezogenen Daten, es sei denn, du nimmst aktiv Kontakt mit uns auf. Es werden keine Tracking-Tools, keine Cookies und keine Analysedienste eingesetzt.",
  },
  {
    title: "2. Verantwortliche Stelle",
    content:
      "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.\nJohannes Gutenberg-Universität Mainz\n55099 Mainz\nE-Mail: ashor.jgu@gmail.com",
  },
  {
    title: "3. Erhebung und Verarbeitung personenbezogener Daten",
    content:
      "Wir erheben und verarbeiten personenbezogene Daten (z. B. Name, E-Mail-Adresse, Hochschule) nur dann, wenn du sie uns freiwillig mitteilst — etwa per E-Mail oder über das Kontaktformular. Diese Daten verwenden wir ausschließlich zur Bearbeitung deiner Anfrage und geben sie nicht an Dritte weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
  },
  {
    title: "4. Schriftarten",
    content:
      "Alle auf dieser Website verwendeten Schriftarten werden von unserem eigenen Server ausgeliefert. Es besteht keine Verbindung zu Google Fonts oder anderen externen Schriftdiensten; deine IP-Adresse wird dabei an keinen Dritten übertragen.",
  },
  {
    title: "5. Mitgliederbereich",
    content:
      "Der passwortgeschützte Mitgliederbereich verarbeitet Anmeldedaten (E-Mail-Adresse, Passwort) über den Dienst Supabase. Daten werden verschlüsselt übertragen und gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung im Rahmen der Mitgliedschaft).",
  },
  {
    title: "6. Hosting",
    content:
      "Diese Website wird über Cloudflare Pages ausgeliefert. Dabei können technisch notwendige Verbindungsdaten wie die IP-Adresse verarbeitet werden. Weitere Informationen findest du in der Datenschutzerklärung von Cloudflare unter cloudflare.com/privacypolicy.",
  },
  {
    title: "7. Deine Rechte",
    content:
      "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie ein Widerspruchsrecht. Wende dich dazu an ashor.jgu@gmail.com. Außerdem steht dir ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.",
  },
];

export default function Datenschutz() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "5.5rem 1.5rem 6rem" }}>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,4.5vw,2.8rem)", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-.015em" }}>
          Datenschutzerklärung
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
