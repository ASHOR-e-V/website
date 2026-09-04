/**
 * Vorstand und Organe — Stand der laufenden Amtszeit.
 *
 * Die Struktur folgt § 6 und § 8 der Satzung: der Vorstand besteht aus
 * sieben Mitgliedern, davon fünf im geschäftsführenden Vorstand
 * (Präsident*in, zwei Vize-Präsident*innen, Protokolldirektor*in,
 * Finanzdirektor*in) und zwei Beisitzer*innen.
 *
 * Eine Vize-Präsidentschaft ist derzeit vakant. Nach § 8 (9) bleibt der
 * Vorstand dadurch handlungsfähig; nach § 9 (4) übernimmt der übrige
 * Vorstand die Aufgaben, bis die Position neu besetzt wird.
 */

export type BoardMember = {
  name: string;
  role: string;
  desc: string;
  photo?: string;
  photoZoom?: number;
  initials: string;
  vacant?: boolean;
  /** Satzungsstelle, die diese Position regelt. */
  ref?: string;
};

export const GESCHAEFTSFUEHRENDER_VORSTAND: BoardMember[] = [
  {
    name: "Caroline Barsoum",
    role: "Präsidentin",
    initials: "CB",
    desc: "Leitet den Verein, vertritt ASHOR nach außen und koordiniert die strategische Ausrichtung. Führt gemeinsam mit dem Finanzdirektor das Vereinskonto.",
    photo: "/team/caroline.jpeg",
    ref: "§ 8 (5)",
  },
  {
    name: "Robina Lajin",
    role: "Vizepräsidentin",
    initials: "RL",
    desc: "Unterstützt die Präsidentin, koordiniert interne Prozesse und trägt zur inhaltlichen Weiterentwicklung des Vereins bei.",
    photo: "/team/robina.jpeg",
    photoZoom: 1.8,
  },
  {
    name: "Vakant",
    role: "Zweite Vizepräsidentschaft",
    initials: "—",
    desc: "Diese Position ist seit einem Rücktritt unbesetzt. Der Vorstand bleibt handlungsfähig und übernimmt die Aufgaben, bis die Position nachbesetzt wird.",
    vacant: true,
    ref: "§ 8 (9), § 9 (4)",
  },
  {
    name: "Severios Isac",
    role: "Protokolldirektor",
    initials: "SI",
    desc: "Erstellt und verwaltet die Protokolle von Vorstandssitzungen und Mitgliederversammlungen und sichert die Transparenz der Vereinsarbeit.",
    photo: "/team/severios.png",
    ref: "§ 7 (11)",
  },
  {
    name: "Ninous Andersson",
    role: "Finanzdirektor",
    initials: "NA",
    desc: "Verantwortet Finanzen, Mittelverwendung und Finanzberichte. Führt gemeinsam mit der Präsidentin das Vereinskonto.",
    photo: "/team/ninous.jpeg",
    ref: "§ 8 (5)",
  },
];

export const BEISITZENDE: BoardMember[] = [
  {
    name: "Dalia Abdo",
    role: "Beisitzerin",
    initials: "DA",
    desc: "Unterstützt den Vorstand bei Planung und Durchführung der Veranstaltungen und bringt eigene Formate ein.",
    photo: "/team/dalia.jpeg",
  },
  {
    name: "Roben Lajin",
    role: "Beisitzer",
    initials: "RL",
    desc: "Unterstützt den Vorstand bei Planung und Durchführung der Veranstaltungen und bringt eigene Formate ein.",
    photo: "/team/roben.jpeg",
  },
];

export const SEATS_TOTAL = GESCHAEFTSFUEHRENDER_VORSTAND.length + BEISITZENDE.length;
export const SEATS_FILLED = [...GESCHAEFTSFUEHRENDER_VORSTAND, ...BEISITZENDE].filter((m) => !m.vacant).length;

/** Die beiden Organe des Vereins nach § 6, plus die Mitgliederbasis. */
export type Organ = {
  id: string;
  name: string;
  kicker: string;
  desc: string;
  accent: "lapis" | "gold" | "neutral";
  facts: string[];
  ref: string;
};

export const ORGANE: Organ[] = [
  {
    id: "mv",
    name: "Mitgliederversammlung",
    kicker: "Oberstes Organ",
    accent: "lapis",
    desc: "Das oberste beschlussfassende Organ des Vereins. Sie wählt den Vorstand, entlastet ihn und entscheidet über Satzungsänderungen.",
    facts: [
      "Tritt mindestens einmal pro Semester zusammen",
      "Beschlussfähig ab 30 % aller Vollmitglieder",
      "Einladung mindestens zwei Wochen vorher",
    ],
    ref: "§ 7",
  },
  {
    id: "vorstand",
    name: "Vorstand",
    kicker: "Leitung des Vereins",
    accent: "gold",
    desc: "Führt die Geschäfte des Vereins, vertritt ihn nach außen und verantwortet Inhalte, Aktionen und Veranstaltungen.",
    facts: [
      "Sieben Mitglieder, gewählt für zwei Semester",
      "Fünf geschäftsführende Positionen, zwei Beisitzende",
      "Beschlussfähig ab vier Mitgliedern",
    ],
    ref: "§ 8",
  },
  {
    id: "mitglieder",
    name: "Mitglieder",
    kicker: "Die Basis",
    accent: "neutral",
    desc: "Studierende, Alumni sowie Personen mit Bachelor oder Master Professional. Vollmitglieder bilden die stimmberechtigte Mitgliederversammlung.",
    facts: [
      "Vollmitglied ab zwei Veranstaltungen pro Semester",
      "Vollmitglieder haben Stimmrecht",
      "Mitgliedschaft ist beitragsfrei",
    ],
    ref: "§ 4",
  },
];
