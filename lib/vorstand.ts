/**
 * Vorstand und Organe — Stand der laufenden Amtszeit.
 *
 * Die Struktur folgt § 6 und § 8 der Satzung: der Vorstand besteht aus
 * sieben Mitgliedern, davon fünf im geschäftsführenden Vorstand
 * (Präsident*in, zwei Vize-Präsident*innen, Protokolldirektor*in,
 * Finanzdirektor*in) und zwei Beisitzer*innen. Alle sieben Sitze sind besetzt.
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
    name: "Caroline Somi",
    role: "Präsidentin",
    initials: "CS",
    desc: "Leitet den Verein, vertritt ASHOR nach außen und koordiniert die strategische Ausrichtung. Führt gemeinsam mit dem Finanzdirektor das Vereinskonto.",
    ref: "§ 8 (5)",
  },
  {
    name: "Ninous Andersson",
    role: "Vizepräsident",
    initials: "NA",
    desc: "Unterstützt die Präsidentin, koordiniert interne Prozesse und trägt zur inhaltlichen Weiterentwicklung des Vereins bei.",
    photo: "/team/ninous.jpeg",
  },
  {
    name: "Severios Isac",
    role: "Vizepräsident",
    initials: "SI",
    desc: "Unterstützt die Präsidentin, koordiniert interne Prozesse und trägt zur inhaltlichen Weiterentwicklung des Vereins bei.",
    photo: "/team/severios.jpeg",
  },
  {
    name: "Janette Bitinjan",
    role: "Protokolldirektorin",
    initials: "JB",
    photo: "/team/janette.jpeg",
    desc: "Erstellt und verwaltet die Protokolle von Vorstandssitzungen und Mitgliederversammlungen und sichert die Transparenz der Vereinsarbeit.",
    ref: "§ 7 (11)",
  },
  {
    name: "George Oshana",
    role: "Finanzdirektor",
    initials: "GO",
    photo: "/team/george.jpeg",
    desc: "Verantwortet Finanzen, Mittelverwendung und Finanzberichte. Führt gemeinsam mit der Präsidentin das Vereinskonto.",
    ref: "§ 8 (5)",
  },
];

export const BEISITZENDE: BoardMember[] = [
  {
    name: "Lea Walter",
    role: "Beisitzerin",
    initials: "LW",
    desc: "Unterstützt den Vorstand bei Planung und Durchführung der Veranstaltungen und bringt eigene Formate ein.",
  },
  {
    name: "Natalie Loka-Namrod",
    role: "Beisitzerin",
    initials: "NL",
    photo: "/team/natalie.jpeg",
    desc: "Unterstützt den Vorstand bei Planung und Durchführung der Veranstaltungen und bringt eigene Formate ein.",
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
