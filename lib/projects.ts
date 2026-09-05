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
    title: "ASHORs Gamenight",
    badge: "Laufende Serie",
    short: "Spieleabende von Karten- und Brettspielen bis Konsole — unkompliziert, gesellig und ohne Anmeldung.",
    desc: "Spieleabende von Karten- und Brettspielen bis Konsole. Ein unkomplizierter Einstieg für alle, die ASHOR erst einmal kennenlernen wollen — ohne Anmeldung, ohne Vorwissen.",
  },
  {
    title: "ASHORs Karaoke",
    badge: "Laufende Serie",
    short: "Assyrische und internationale Songs, offene Bühne — Gesangstalent ausdrücklich keine Voraussetzung.",
    desc: "Assyrische und internationale Songs auf offener Bühne. Ein Abend für Musik, Sprache und gute Laune — Gesangstalent ist ausdrücklich keine Voraussetzung.",
  },
  {
    title: "Bildungsreisen & Symposien",
    badge: "Jährlich",
    short: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca.",
    desc: "Gemeinsame Reisen zu internationalen Konferenzen – zuletzt das Niniveh Academic Chair Symposium in Salamanca, Spanien. Wir vernetzen uns mit assyrischen Akademikern weltweit.",
  },
];
