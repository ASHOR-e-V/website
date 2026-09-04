import Donate from "@/components/home/Donate";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Spenden",
  description:
    "ASHOR e.V. unterstützen — per PayPal oder Banküberweisung. Als gemeinnütziger Verein verwenden wir alle Mittel ausschließlich für die satzungsgemäßen Zwecke.",
};

export default function SpendenPage() {
  return (
    <div style={{ paddingTop: 74 }}>
      <PageHeader
        kicker="Unterstützen"
        title="Jede Spende zählt"
        lede="Veranstaltungen, Bildungsreisen und kulturelle Projekte finanzieren wir aus freiwilligen Beiträgen und Spenden. Der Verein ist selbstlos tätig."
      />
      <Donate />
    </div>
  );
}
