import Link from "next/link";
import Shamash from "@/components/Shamash";
import { ArrowRightIcon } from "@/components/icons";

export const metadata = { title: "Seite nicht gefunden" };

const suggestions = [
  { label: "Startseite", href: "/" },
  { label: "Veranstaltungen", href: "/events" },
  { label: "Projekte & Formate", href: "/projects" },
  { label: "Vorstand & Organe", href: "/vorstand" },
  { label: "Satzung", href: "/satzung" },
];

export default function NotFound() {
  return (
    <div style={{ paddingTop: 74, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.2rem" }}>
          <Shamash size={72} outline rayWidth={2.4} opacity={0.55} />
        </div>

        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.2rem" }}>
          Fehler 404
        </div>

        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,4.5vw,3rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.02em", marginBottom: "1.2rem" }}>
          Diese Seite gibt es nicht
        </h1>

        <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: "1rem", lineHeight: 1.95, marginBottom: "2.5rem" }}>
          Vielleicht wurde die Adresse geändert oder es hat sich ein Tippfehler eingeschlichen. Hier geht es weiter:
        </p>

        <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap", justifyContent: "center" }}>
          {suggestions.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className={i === 0 ? "btn-solid link-arrow" : "btn-ghost"}
              style={{
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                fontFamily: "'Jost', sans-serif", fontSize: ".68rem", letterSpacing: ".16em",
                textTransform: "uppercase", fontWeight: i === 0 ? 700 : 500,
                textDecoration: "none", borderRadius: 999, padding: ".8rem 1.5rem",
                background: i === 0 ? "var(--gold-solid)" : "transparent",
                color: i === 0 ? "var(--on-gold)" : "var(--muted)",
                border: i === 0 ? "none" : "1px solid var(--line-strong)",
              }}
            >
              {s.label} {i === 0 && <ArrowRightIcon size={12} />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
