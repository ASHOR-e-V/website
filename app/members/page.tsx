import MembersArea from "@/components/members/MembersArea";

export const metadata = {
  title: "Mitgliederbereich",
  description: "Interner Bereich für Mitglieder der Assyrischen Hochschulgruppe Rhein-Main e.V.",
  robots: { index: false, follow: false },
};

export default function MembersPage() {
  return <MembersArea />;
}
