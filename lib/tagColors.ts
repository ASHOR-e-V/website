// Category → accent mapping. Ties each recurring topic to one of the three
// brand accents (gold / lapis / clay) so color carries real meaning instead
// of decorating every tag identically.
type Accent = { text: string; dim: string; line: string };

const gold: Accent = { text: "var(--gold)", dim: "var(--gold-dim)", line: "var(--gold-line)" };
const lapis: Accent = { text: "var(--lapis-text)", dim: "var(--lapis-dim)", line: "var(--lapis-line)" };
const clay: Accent = { text: "var(--clay)", dim: "var(--clay-dim)", line: "var(--clay-line)" };

// Events — by event type.
const eventMap: Record<string, Accent> = {
  "Vortrag & Debatte": gold,
  "Intern": gold,
  "Bildungsreise": lapis,
  "Kultur": clay,
};

export function eventAccent(tag: string): Accent {
  return eventMap[tag] ?? gold;
}

// Projects — by project identity (two formats share the "Laufende Serie"
// badge, so the badge text alone can't tell them apart).
const projectMap: Record<string, Accent> = {
  "ASHOR Talks": gold,
  "ASHORs Stammtisch": clay,
  "Bildungsreisen & Symposien": lapis,
};

export function projectAccent(title: string): Accent {
  return projectMap[title] ?? gold;
}
