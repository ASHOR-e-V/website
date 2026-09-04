export type Project = {
  title: string;
  badge: string;
  /** Teaser line for the homepage card. */
  short: string;
  /** Full description for the /projects page. */
  desc: string;
};

export const PROJECTS: Project[] = [
  {
    title: "ASHOR Talks",
    badge: "Laufende Serie",
    short: "Unsere Debattierreihe: Infovortrag plus Live-Debatte zweier Teams – lebendig, lehrreich und immer mit Überraschungen.",
    desc: "Unsere Debattierreihe: Infovortrag plus Live-Debatte zweier Teams – lebendig, lehrreich und immer mit Überraschungen. Wir beleuchten gesellschaftliche Themen, die die assyrische Gemeinschaft bewegen.",
  },
  {
    title: "ASHORs Stammtisch",
    badge: "Laufende Serie",
    short: "Regelmäßige, zwanglose Treffen bei Essen und Getränken – zum Austausch und Kennenlernen abseits des Uni-Alltags.",
    desc: "Regelmäßige, zwanglose Treffen bei Essen und Getränken – zum gemütlichen Austausch und Kennenlernen abseits des Uni-Alltags. Offen für Mitglieder und Interessierte.",
  },
  {
    title: "Bildungsreisen & Symposien",
    badge: "Jährlich",
    short: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca.",
    desc: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca, Spanien. Wir vernetzen uns mit assyrischen Akademikern weltweit.",
  },
];
