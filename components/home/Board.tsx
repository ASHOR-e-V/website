"use client";
import Image from "next/image";
import Link from "next/link";
import { GESCHAEFTSFUEHRENDER_VORSTAND, BEISITZENDE, SEATS_TOTAL, SEATS_FILLED, type BoardMember } from "@/lib/vorstand";
import { MaskReveal, Rise, RiseGroup, RiseItem } from "@/components/Reveal";
import Shamash from "@/components/Shamash";
import { ArrowRightIcon } from "@/components/icons";

function BoardCard({
  member,
  accent = "var(--gold)",
  accentLine = "var(--gold-line)",
}: {
  member: BoardMember;
  accent?: string;
  accentLine?: string;
}) {
  const { name, role, desc, photo, photoZoom, vacant, ref } = member;

  return (
    <RiseItem
      className={vacant ? undefined : "card-hover"}
      style={{
        background: vacant ? "transparent" : "var(--surface)",
        border: vacant ? "1px dashed var(--line-strong)" : "1px solid var(--line)",
        borderRadius: "var(--r-lg)",
        padding: "1.9rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      {/* Portrait, or the sun disc where a seat is open */}
      <div
        style={{
          width: 108, height: 108, borderRadius: "50%", overflow: "hidden",
          marginBottom: "1.2rem", flexShrink: 0,
          border: `2px ${vacant ? "dashed" : "solid"} ${vacant ? "var(--line-strong)" : accentLine}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: vacant ? "var(--surface2)" : undefined,
        }}
      >
        {vacant ? (
          <Shamash size={44} outline rayWidth={3} opacity={0.4} />
        ) : (
          <Image
            src={photo!}
            alt={`${name} — ${role} bei ASHOR e.V.`}
            width={108}
            height={108}
            sizes="108px"
            style={{ objectFit: "cover", width: "100%", height: "100%", transform: photoZoom ? `scale(${photoZoom})` : undefined }}
          />
        )}
      </div>

      <h3
        style={{
          fontFamily: "'Cinzel', serif", fontSize: "1.02rem", fontWeight: 700,
          color: vacant ? "var(--muted2)" : "var(--text)", marginBottom: ".35rem", lineHeight: 1.3,
        }}
      >
        {name}
      </h3>

      <div
        style={{
          fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".16em",
          textTransform: "uppercase", color: vacant ? "var(--muted2)" : accent,
          marginBottom: ".9rem", fontWeight: 600, fontStyle: vacant ? "italic" : "normal",
        }}
      >
        {role}
      </div>

      <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".84rem", lineHeight: 1.8, margin: 0, flex: 1 }}>
        {desc}
      </p>

      {ref && (
        <Link
          href={`/satzung#${ref.includes("8") ? "p8" : ref.includes("9") ? "p9" : ref.includes("7") ? "p7" : "p4"}`}
          style={{
            marginTop: "1.1rem", fontFamily: "'Jost', sans-serif", fontSize: ".58rem",
            letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted2)",
            textDecoration: "none", border: "1px solid var(--line)", borderRadius: 999,
            padding: ".2rem .65rem", whiteSpace: "nowrap",
          }}
        >
          {ref}
        </Link>
      )}
    </RiseItem>
  );
}

function SectionLabel({ children, count }: { children: React.ReactNode; count: string }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem",
        fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".22em",
        textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1.4rem",
        paddingBottom: ".7rem", borderBottom: "1px solid var(--line)",
      }}
    >
      <span>{children}</span>
      <span style={{ color: "var(--gold)", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{count}</span>
    </div>
  );
}

export default function Board() {
  return (
    <section id="vorstand" style={{ padding: "7.5rem 1.5rem", scrollMarginTop: 100 }} className="section-pad">
      <div style={{ maxWidth: "var(--max)", margin: "0 auto" }}>
        <Rise y={16}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.2rem" }}>
            Der Vorstand
          </div>
        </Rise>

        <MaskReveal as="h2" style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.08, marginBottom: "1.2rem", letterSpacing: "-.015em" }}>
          Sieben Sitze, ein Auftrag
        </MaskReveal>

        <Rise delay={0.18} y={18}>
          <p style={{ color: "var(--muted)", maxWidth: 620, marginBottom: "3.5rem", fontFamily: "'Lora', serif", lineHeight: 1.95, fontSize: ".98rem" }}>
            Der Vorstand besteht satzungsgemäß aus sieben Mitgliedern und wird von der Mitgliederversammlung für zwei Semester gewählt. Derzeit sind {SEATS_FILLED} der {SEATS_TOTAL} Sitze besetzt.
          </p>
        </Rise>

        <SectionLabel count={`${GESCHAEFTSFUEHRENDER_VORSTAND.filter((m) => !m.vacant).length} / ${GESCHAEFTSFUEHRENDER_VORSTAND.length}`}>
          Geschäftsführender Vorstand
        </SectionLabel>
        <RiseGroup className="grid-5col" style={{ marginBottom: "3.5rem" }}>
          {GESCHAEFTSFUEHRENDER_VORSTAND.map((m) => (
            <BoardCard key={m.role} member={m} />
          ))}
        </RiseGroup>

        <SectionLabel count={`${BEISITZENDE.length} / ${BEISITZENDE.length}`}>Beisitzende</SectionLabel>
        {/* Same five-column track as above so these cards line up with the
            geschäftsführender Vorstand instead of being noticeably wider. */}
        <RiseGroup className="grid-5col" style={{ alignItems: "stretch" }}>
          {BEISITZENDE.map((m) => (
            <BoardCard key={m.name} member={m} accent="var(--lapis-text)" accentLine="var(--lapis-line)" />
          ))}
        </RiseGroup>

        <Rise delay={0.1} y={16}>
          <Link
            href="/satzung#p8"
            className="link-arrow btn-ghost"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".55rem", marginTop: "3rem",
              fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".16em",
              textTransform: "uppercase", color: "var(--muted)", textDecoration: "none",
              border: "1px solid var(--line)", borderRadius: 999, padding: ".85rem 1.6rem", fontWeight: 600,
            }}
          >
            Aufgaben und Wahl des Vorstands in der Satzung <ArrowRightIcon size={13} />
          </Link>
        </Rise>
      </div>
    </section>
  );
}
