import ForumArea from "@/components/members/ForumArea";

export const metadata = {
  title: "Forum",
  description: "Forum im Mitgliederbereich der Assyrischen Hochschulgruppe Rhein-Main e.V.",
  robots: { index: false, follow: false },
};

export default function ForumPage() {
  return <ForumArea />;
}
