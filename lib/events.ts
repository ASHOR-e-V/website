export type VereinsEvent = {
  date: string;
  /** Sort/grouping key. */
  year: string;
  title: string;
  desc: string;
  tag: string;
  location: string;
  /**
   * Marks the handful of events worth surfacing on the homepage teaser.
   * The chronicle below lists every event, including routine Stammtische —
   * without this flag, EVENT_HIGHLIGHTS (the newest three) would just show
   * whichever regulars' meetup happened most recently instead of the talks,
   * trips, and milestones actually worth a first impression.
   */
  featured?: boolean;
};

/**
 * Newest first — the chronicle reads backwards from today.
 *
 * Source: the association's own event log. A few dates here correct
 * earlier placeholder entries on this page (ASHORs Khigga #1 and #2, and
 * ASHOR Talks #2, had been given wrong months) — this list is the
 * authoritative one going forward.
 *
 * "19.12.2025 – Stammtisch mit Kano" was given to us as 19.12.2026; that
 * falls between two other December-2025 entries and reads as a typo, so
 * it's dated 2025 here. Flag it if that's wrong.
 *
 * "MV WiSe 2026/27" (19.09.2026) isn't listed yet — as of this write-up
 * it's still in the future, and this page is a record of what's already
 * happened.
 */
export const EVENTS: VereinsEvent[] = [
  {
    date: "22. August 2026",
    year: "2026",
    title: "Cosmos Bowling",
    desc: "Geselliger Bowling-Abend.",
    tag: "Kultur",
    location: "Cosmos Bowling",
  },
  {
    date: "22. Juli 2026",
    year: "2026",
    title: "Stammtisch",
    desc: "Lockerer Austausch bei Essen und Gesprächen.",
    tag: "Kultur",
    location: "Simone",
  },
  {
    date: "24. Juni 2026",
    year: "2026",
    title: "Stammtisch",
    desc: "Lockerer Austausch bei Essen und Gesprächen.",
    tag: "Kultur",
    location: "Symposium",
  },
  {
    date: "29. Mai 2026",
    year: "2026",
    title: "ASHOR Talks #3",
    desc: "Zwischen Einheit und Spaltung: Ist assyrischer Patriotismus defensiv oder muss er offensiver werden? Infovortrag mit anschließender Diskussion.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
    featured: true,
  },
  {
    date: "20. Mai 2026",
    year: "2026",
    title: "Stammtisch",
    desc: "Lockerer Austausch bei Essen und Gesprächen.",
    tag: "Kultur",
    location: "Du & Ich",
  },
  {
    date: "9. Mai 2026",
    year: "2026",
    title: "Anahit-Vortrag",
    desc: "Genocide, Statelessness and Resilience: The Assyrian Case in Historical Perspective. Vortrag von Anahit über Genozid, Staatenlosigkeit und Resilienz am Beispiel der Assyrer*innen.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
    featured: true,
  },
  {
    date: "2. Mai 2026",
    year: "2026",
    title: "ASHOR x Gudo d'Ornina",
    desc: "Gemeinsame Veranstaltung mit Gudo d'Ornina.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "18. April 2026",
    year: "2026",
    title: "Game-Night",
    desc: "Geselliger Spieleabend.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "14. März 2026",
    year: "2026",
    title: "MV SoSe 2026",
    desc: "Mitgliederversammlung zum Sommersemester 2026.",
    tag: "Intern",
    location: "Mainz",
  },
  {
    date: "15. Februar 2026",
    year: "2026",
    title: "Stammtisch",
    desc: "Lockerer Austausch bei Essen und Gesprächen.",
    tag: "Kultur",
    location: "Noodlemaker",
  },
  {
    date: "10. Januar 2026",
    year: "2026",
    title: "Game-Night",
    desc: "Geselliger Spieleabend.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "19. Dezember 2025",
    year: "2025",
    title: "Stammtisch mit Kano",
    desc: "Stammtisch mit Kano, kombiniert mit einem Besuch des Weihnachtsmarkts und dem ALEX.",
    tag: "Kultur",
    location: "ALEX",
  },
  {
    date: "13. Dezember 2025",
    year: "2025",
    title: "Jubiläumsfeier",
    desc: "Feier zum einjährigen Bestehen von ASHOR.",
    tag: "Kultur",
    location: "Mainz",
    featured: true,
  },
  {
    date: "5. Dezember 2025",
    year: "2025",
    title: "Weihnachtsmarkt",
    desc: "Gemeinsamer Besuch des Weihnachtsmarkts.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "22. November 2025",
    year: "2025",
    title: "Robinas Vortrag",
    desc: "Wo kommen die Assyrer eigentlich her? Ein Blick in den Ursprung unseres Volkes. Vortrag von Robina über den Ursprung des assyrischen Volkes.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
    featured: true,
  },
  {
    date: "14. November 2025",
    year: "2025",
    title: "ASHORs Khigga #2",
    desc: "Assyrische Tänze Schritt für Schritt lernen und gemeinsam tanzen – Vorkenntnisse nicht nötig. Ein Abend voller Bewegung, Musik und Gemeinschaft.",
    tag: "Kultur",
    location: "Mainz",
    featured: true,
  },
  {
    date: "2. November 2025",
    year: "2025",
    title: "Stammtisch",
    desc: "Stammtisch beim Bowling.",
    tag: "Kultur",
    location: "Cosmos Bowling",
  },
  {
    date: "17. Oktober 2025",
    year: "2025",
    title: "ASHORs Khigga #1",
    desc: "Der erste Tanzabend von ASHOR – assyrische Tänze gemeinsam lernen und tanzen.",
    tag: "Kultur",
    location: "Mainz",
    featured: true,
  },
  {
    date: "5.–10. Oktober 2025",
    year: "2025",
    title: "Spanienreise & Symposium Salamanca",
    desc: "Teilnahme am Niniveh Academic Chair of Salamanca 2025 – akademischer Austausch mit assyrischen Professoren und Akademikern aus der ganzen Welt.",
    tag: "Bildungsreise",
    location: "Salamanca, Spanien",
    featured: true,
  },
  {
    date: "16. September 2025",
    year: "2025",
    title: "MV WiSe 2025/26",
    desc: "Mitgliederversammlung zum Wintersemester 2025/26.",
    tag: "Intern",
    location: "Mainz",
  },
  {
    date: "29. August 2025",
    year: "2025",
    title: "Vortrag Sliwo & Silvian",
    desc: "Loslassen nach David R. Hawkins: Wie Emotionen uns bewegen, ohne dass wir sie wahrnehmen. Vortrag von Sliwo und Silvian.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
  },
  {
    date: "14. August 2025",
    year: "2025",
    title: "Game-Night",
    desc: "Geselliger Spieleabend.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "12. Juli 2025",
    year: "2025",
    title: "Film-Doku „Retour à Babylone“",
    desc: "Gemeinsames Anschauen der Dokumentation Retour à Babylone mit anschließendem Austausch.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "21. Juni 2025",
    year: "2025",
    title: "ASHOR Talks #2",
    desc: "Infovortrag und Live-Debatte: Frei geboren, traditionell geprägt – wie modern darf ich in der Diaspora sein? Ein Abend mit zwei Debattierteams, Publikumsfragen und viel Diskussionsraum.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
    featured: true,
  },
  {
    date: "15. Mai 2025",
    year: "2025",
    title: "Stammtisch",
    desc: "Lockerer Austausch bei Essen und Gesprächen.",
    tag: "Kultur",
    location: "Ratskeller Biebrich",
  },
  {
    date: "10. Mai 2025",
    year: "2025",
    title: "Ausflug Palmengarten",
    desc: "Gemeinsamer Ausflug in den Palmengarten Frankfurt.",
    tag: "Kultur",
    location: "Palmengarten, Frankfurt am Main",
  },
  {
    date: "3. Mai 2025",
    year: "2025",
    title: "Sayfo-Filmabend",
    desc: "Filmabend zum Gedenken an den Sayfo, den Genozid an den Assyrer*innen.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "26. April 2025",
    year: "2025",
    title: "Schüler-Info-Tag",
    desc: "Informationstag für Schüler*innen zu ASHOR und studentischem Engagement.",
    tag: "Kultur",
    location: "Mainz",
  },
  {
    date: "8. März 2025",
    year: "2025",
    title: "MV SoSe 2025",
    desc: "Mitgliederversammlung zum Sommersemester 2025.",
    tag: "Intern",
    location: "Mainz",
  },
  {
    date: "21. Februar 2025",
    year: "2025",
    title: "ASHOR Talks #1",
    desc: "Zurück in die Heimat – Vision oder Illusion? Wie könnte ein assyrisches Comeback gelingen? Der Auftakt unserer Debattierreihe.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
    featured: true,
  },
  {
    date: "17. Januar 2025",
    year: "2025",
    title: "Vortrag Silvian",
    desc: "Vom Studium zur ersten Immobilie: Tipps für einen erfolgreichen Start. Vortrag von Silvian.",
    tag: "Vortrag & Debatte",
    location: "Mainz",
  },
  {
    date: "27. Dezember 2024",
    year: "2024",
    title: "Gründungs- und Weihnachtsfeier",
    desc: "Gemeinsame Feier zur Vereinsgründung und zum Jahresausklang.",
    tag: "Kultur",
    location: "Mainz",
    featured: true,
  },
  {
    date: "23. November 2024",
    year: "2024",
    title: "Austausch mit Assyrer*innen der Uni Marburg",
    desc: "Vernetzungstreffen mit der assyrischen Studierendengruppe der Philipps-Universität Marburg.",
    tag: "Kultur",
    location: "Marburg",
  },
  {
    date: "16. November 2024",
    year: "2024",
    title: "Gründungsversammlung & Kickoff",
    desc: "Offizieller Start von ASHOR als anerkannte Hochschulgruppe der JGU Mainz. Wahl des ersten Vorstands.",
    tag: "Intern",
    location: "Mainz",
    featured: true,
  },
  {
    date: "10. Oktober 2024",
    year: "2024",
    title: "Stammtisch",
    desc: "Lockerer Austausch bei Essen und Gesprächen.",
    tag: "Kultur",
    location: "Café Nina",
  },
  {
    date: "10. September 2024",
    year: "2024",
    title: "Stammtisch",
    desc: "Lockerer Austausch bei Essen und Gesprächen — eines der ersten Treffen der Gruppe.",
    tag: "Kultur",
    location: "La Olivia",
  },
];

/** The handful of events worth a homepage first impression — see `featured`. */
export const EVENT_HIGHLIGHTS = EVENTS.filter((e) => e.featured).slice(0, 3);
