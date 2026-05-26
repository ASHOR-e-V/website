export const metadata = { title: "Datenschutz – ASHOR" };

export default function Datenschutz() {
  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "2.5rem", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-.01em" }}>Datenschutzerklärung</h1>
        {[
          { title: "1. Datenschutz auf einen Blick", content: "Diese Website erhebt keine personenbezogenen Daten, es sei denn, Sie nehmen aktiv Kontakt mit uns auf. Es werden keine Tracking-Tools, Cookies oder Analysetools eingesetzt." },
          { title: "2. Verantwortliche Stelle", content: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.\nJohannes Gutenberg-Universität Mainz\n55099 Mainz\nE-Mail: ashor.jgu@gmail.com" },
          { title: "3. Erhebung und Verarbeitung personenbezogener Daten", content: "Wir erheben und verarbeiten personenbezogene Daten (z.B. Name, E-Mail-Adresse) nur dann, wenn Sie uns diese freiwillig mitteilen, etwa per E-Mail oder durch eine Mitgliedschaftsanfrage. Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben." },
          { title: "4. Mitgliederbereich", content: "Der passwortgeschützte Mitgliederbereich verarbeitet Anmeldedaten (E-Mail, Passwort) über Supabase, einem datenschutzkonformen Dienst. Daten werden verschlüsselt übertragen und gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)." },
          { title: "5. Ihre Rechte", content: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich dazu an: ashor.jgu@gmail.com" },
          { title: "6. Hosting", content: "Diese Website wird über Cloudflare Pages gehostet. Cloudflare verarbeitet möglicherweise IP-Adressen zur Auslieferung von Inhalten. Weitere Informationen finden Sie in der Datenschutzerklärung von Cloudflare: cloudflare.com/privacypolicy" },
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
