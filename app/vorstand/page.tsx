import Board from "@/components/home/Board";
import Organigramm from "@/components/vorstand/Organigramm";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Vorstand & Organe",
  description:
    "Der Vorstand der Assyrischen Hochschulgruppe Rhein-Main e.V. — sieben Sitze, gewählt für zwei Semester — und die Organe des Vereins nach § 6 der Satzung.",
};

export default function VorstandPage() {
  return (
    <div style={{ paddingTop: 74 }}>
      <PageHeader
        kicker="Wer ASHOR führt"
        title="Vorstand & Organe"
        lede="Zwei Organe, klar getrennt: die Mitgliederversammlung beschließt, der Vorstand führt aus. Wer welche Position hält — und welche Stelle der Satzung sie regelt."
      />
      <Board />
      <div style={{ borderTop: "1px solid var(--line)", background: "var(--surface2)" }}>
        <Organigramm />
      </div>
    </div>
  );
}
