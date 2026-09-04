import Join from "@/components/home/Join";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Mitmachen",
  description:
    "Mitglied bei ASHOR werden: offen für eingeschriebene Studierende, Alumni sowie Personen mit Bachelor oder Master Professional. Die Mitgliedschaft ist beitragsfrei.",
};

export default function MitmachenPage() {
  return (
    <div style={{ paddingTop: 74 }}>
      <PageHeader
        kicker="Mitgliedschaft"
        title="Komm dazu"
        lede="Die Mitgliedschaft ist beitragsfrei und offen für alle, die die Ziele des Vereins unterstützen. Schreib uns — der Vorstand entscheidet über die Aufnahme."
      />
      <Join />
    </div>
  );
}
