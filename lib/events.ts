export type VereinsEvent = {
  date: string;
  /** Sort/grouping key. */
  year: string;
  title: string;
  desc: string;
  tag: string;
  location: string;
};

/** Newest first — the chronicle reads backwards from today. */
export const EVENTS: VereinsEvent[] = [
  {
    date: "Mai 2025",
    year: "2025",
    title: "ASHOR Talks #2",
    desc: "Infovortrag und Live-Debatte: Frei geboren, traditionell geprägt – wie modern darf ich in der Diaspora sein? Ein Abend mit zwei Debattierteams, Publikumsfragen und viel Diskussionsraum.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
  },
  {
    date: "Oktober 2025",
    year: "2025",
    title: "Spanienreise & Symposium Salamanca",
    desc: "Teilnahme am Niniveh Academic Chair of Salamanca 2025 – akademischer Austausch mit assyrischen Professoren und Akademikern aus der ganzen Welt.",
    tag: "Bildungsreise",
    location: "Salamanca, Spanien",
  },
  {
    date: "März 2025",
    year: "2025",
    title: "ASHORs Khigga #2",
    desc: "Assyrische Tänze Schritt für Schritt lernen und gemeinsam tanzen – Vorkenntnisse nicht nötig. Ein Abend voller Bewegung, Musik und Gemeinschaft.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "Januar 2025",
    year: "2025",
    title: "ASHOR Talks #1",
    desc: "Der Auftakt unserer Debattierreihe: Informationsvortrag über ein gesellschaftliches Thema mit anschließender Teamdebatte.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
  },
  {
    date: "November 2024",
    year: "2024",
    title: "ASHORs Khigga #1",
    desc: "Der erste Tanzabend von ASHOR – ein voller Erfolg mit über 30 Teilnehmenden.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "16. November 2024",
    year: "2024",
    title: "Gründungsversammlung & Kickoff",
    desc: "Offizieller Start von ASHOR als anerkannte Hochschulgruppe der JGU Mainz. Wahl des ersten Vorstands.",
    tag: "Intern",
    location: "Mainz",
  },
];

/** Three most recent, for the homepage teaser. */
export const EVENT_HIGHLIGHTS = EVENTS.slice(0, 3);
