"use client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Tab = "announcements" | "protocols" | "anfragen" | "verwaltung";

type Announcement = { id: string; title: string; content: string; created_at: string };
type Protocol = { id: string; title: string; date: string; file_url: string | null; created_at: string };
type Profile = { is_board: boolean; full_name: string | null };

export default function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<Tab>("announcements");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.from("profiles").select("is_board, full_name").eq("id", user.id).single()
      .then(({ data }) => setProfile(data));
  }, [user.id]);

  const tabStyle = (t: Tab) => ({
    fontFamily: "'Jost', sans-serif",
    fontSize: ".7rem",
    letterSpacing: ".18em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
    padding: ".6rem 1.2rem",
    borderRadius: 999,
    border: "1px solid",
    cursor: "pointer",
    borderColor: tab === t ? "var(--gold)" : "var(--line)",
    background: tab === t ? "var(--gold-dim)" : "transparent",
    color: tab === t ? "var(--gold)" : "var(--muted)",
  });

  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ background: "var(--surface2)", borderBottom: "1px solid var(--line)", padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>Mitgliederbereich</div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700 }}>Willkommen zurück</h1>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".78rem", color: "var(--muted2)", marginTop: ".3rem" }}>
              {profile?.full_name ?? user.email}
              {profile?.is_board && <span style={{ marginLeft: ".6rem", color: "var(--gold)", fontSize: ".65rem", border: "1px solid var(--gold-line)", padding: ".15rem .5rem", borderRadius: 999 }}>Vorstand</span>}
            </p>
          </div>
          <button onClick={() => supabase.auth.signOut()} style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", background: "none", border: "1px solid var(--line)", padding: ".5rem 1rem", borderRadius: 999, cursor: "pointer" }}>
            Abmelden
          </button>
        </div>
        <div style={{ maxWidth: "var(--max)", margin: "1.5rem auto 0", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <button style={tabStyle("announcements")} onClick={() => setTab("announcements")}>Ankündigungen</button>
          {profile?.is_board && <button style={tabStyle("protocols")} onClick={() => setTab("protocols")}>Protokolle</button>}
          {profile?.is_board && <button style={tabStyle("anfragen")} onClick={() => setTab("anfragen")}>Anfragen</button>}
          {profile?.is_board && <button style={tabStyle("verwaltung")} onClick={() => setTab("verwaltung")}>Verwaltung</button>}
        </div>
      </div>

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {tab === "announcements" && <AnnouncementsTab isBoard={profile?.is_board ?? false} />}
        {tab === "protocols" && profile?.is_board && <ProtocolsTab isBoard={true} />}
        {tab === "anfragen" && profile?.is_board && <AnfragenTab />}
        {tab === "verwaltung" && profile?.is_board && <VerwaltungTab />}
      </div>
    </div>
  );
}

function AnnouncementsTab({ isBoard }: { isBoard: boolean }) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const post = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    await supabase.from("announcements").insert({ title, content });
    setTitle(""); setContent("");
    await load();
    setPosting(false);
  };

  const inputStyle = { width: "100%", background: "var(--surface2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", color: "var(--text)", padding: ".75rem 1rem", fontFamily: "'Jost', sans-serif", fontSize: ".85rem", outline: "none", marginBottom: ".75rem" };

  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Ankündigungen</h2>

      {isBoard && (
        <form onSubmit={post} style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-md)", padding: "1.8rem", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Neue Ankündigung</div>
          <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="Titel" style={inputStyle} />
          <textarea value={content} onChange={e => setContent(e.target.value)} required placeholder="Inhalt…" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
          <button type="submit" disabled={posting} style={{ fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--gold)", padding: ".7rem 1.5rem", borderRadius: 999, border: "1px solid var(--gold-line)", cursor: "pointer", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>
            {posting ? "…" : "Veröffentlichen"}
          </button>
        </form>
      )}

      {loading ? (
        <div style={{ color: "var(--muted2)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem" }}>Laden…</div>
      ) : items.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2rem", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
          Noch keine Ankündigungen.
        </div>
      ) : items.map(a => (
        <div key={a.id} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "1.8rem", marginBottom: "1rem" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>
            {new Date(a.created_at).toLocaleDateString("de-DE")}
          </div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: ".6rem" }}>{a.title}</h3>
          <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".92rem", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{a.content}</p>
        </div>
      ))}
    </div>
  );
}

type Submission = { id: string; name: string; email: string; institution: string | null; type: string; message: string; read: boolean; created_at: string };

function AnfragenTab() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("unread");

  const load = async () => {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ read: true }).eq("id", id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  };

  const visible = filter === "unread" ? items.filter(i => !i.read) : items;
  const unreadCount = items.filter(i => !i.read).length;

  const btnStyle = (active: boolean) => ({
    fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase" as const,
    fontWeight: 600, padding: ".4rem .9rem", borderRadius: 999, border: "1px solid",
    cursor: "pointer", borderColor: active ? "var(--gold)" : "var(--line)",
    background: active ? "var(--gold-dim)" : "transparent", color: active ? "var(--gold)" : "var(--muted)",
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700 }}>Kontaktanfragen</h2>
          {unreadCount > 0 && <p style={{ fontFamily: "'Jost', sans-serif", fontSize: ".75rem", color: "var(--gold)", marginTop: ".3rem" }}>{unreadCount} ungelesen</p>}
        </div>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <button style={btnStyle(filter === "unread")} onClick={() => setFilter("unread")}>Ungelesen</button>
          <button style={btnStyle(filter === "all")} onClick={() => setFilter("all")}>Alle</button>
        </div>
      </div>

      {loading ? (
        <div style={{ color: "var(--muted2)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem" }}>Laden…</div>
      ) : visible.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2rem", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
          {filter === "unread" ? "Keine ungelesenen Anfragen." : "Noch keine Anfragen eingegangen."}
        </div>
      ) : visible.map(s => (
        <div key={s.id} style={{ background: "var(--surface)", border: `1px solid ${s.read ? "var(--line)" : "var(--gold-line)"}`, borderRadius: "var(--r-md)", padding: "1.8rem", marginBottom: "1rem", position: "relative", overflow: "hidden" }}>
          {!s.read && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--gold),var(--lapis))" }} />}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".75rem", marginBottom: ".8rem" }}>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".2rem" }}>{s.name}</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".72rem", color: "var(--muted2)", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                <a href={`mailto:${s.email}`} style={{ color: "var(--gold)", textDecoration: "none" }}>{s.email}</a>
                {s.institution && <span>· {s.institution}</span>}
                <span>· {new Date(s.created_at).toLocaleDateString("de-DE")}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold)", background: "var(--gold-dim)", padding: ".22rem .65rem", borderRadius: 999, border: "1px solid var(--gold-line)" }}>{s.type}</span>
              {!s.read && <button onClick={() => markRead(s.id)} style={{ fontFamily: "'Jost', sans-serif", fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", background: "none", border: "1px solid var(--line)", padding: ".22rem .65rem", borderRadius: 999, cursor: "pointer" }}>Gelesen</button>}
            </div>
          </div>
          <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{s.message}</p>
        </div>
      ))}
    </div>
  );
}

type ProfileEntry = { id: string; full_name: string | null; is_board: boolean };

function VerwaltungTab() {
  const [members, setMembers] = useState<ProfileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name, is_board").order("full_name");
    setMembers(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id: string, current: boolean) => {
    setSaving(id);
    await supabase.from("profiles").update({ is_board: !current }).eq("id", id);
    await load();
    setSaving(null);
  };

  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: ".5rem" }}>Mitgliederverwaltung</h2>
      <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".88rem", marginBottom: "2rem" }}>Hier kannst du Mitgliedern Vorstandsrechte geben oder entziehen.</p>

      {loading ? (
        <div style={{ color: "var(--muted2)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem" }}>Laden…</div>
      ) : members.map(m => (
        <div key={m.id} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "1.2rem 1.8rem", marginBottom: ".75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: ".95rem", fontWeight: 700, color: "var(--text)", marginBottom: ".2rem" }}>{m.full_name ?? "—"}</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: m.is_board ? "var(--gold)" : "var(--muted2)" }}>
              {m.is_board ? "Vorstand" : "Mitglied"}
            </div>
          </div>
          <button
            onClick={() => toggle(m.id, m.is_board)}
            disabled={saving === m.id}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", padding: ".5rem 1.1rem", borderRadius: 999, border: "1px solid", borderColor: m.is_board ? "var(--line)" : "var(--gold-line)", background: m.is_board ? "transparent" : "var(--gold-dim)", color: m.is_board ? "var(--muted)" : "var(--gold)" }}
          >
            {saving === m.id ? "…" : m.is_board ? "Zu Mitglied" : "Zu Vorstand"}
          </button>
        </div>
      ))}
    </div>
  );
}

function ProtocolsTab({ isBoard }: { isBoard: boolean }) {
  const [items, setItems] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("protocols").select("*").order("date", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setPosting(true);
    const path = `${Date.now()}_${file.name}`;
    await supabase.storage.from("protocols").upload(path, file);
    const { data: urlData } = supabase.storage.from("protocols").getPublicUrl(path);
    await supabase.from("protocols").insert({ title, date, file_url: urlData.publicUrl });
    setTitle(""); setDate(""); setFile(null);
    await load();
    setPosting(false);
  };

  const inputStyle = { width: "100%", background: "var(--surface2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", color: "var(--text)", padding: ".75rem 1rem", fontFamily: "'Jost', sans-serif", fontSize: ".85rem", outline: "none", marginBottom: ".75rem" };

  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Sitzungsprotokolle</h2>

      {isBoard && (
        <form onSubmit={upload} style={{ background: "var(--surface)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-md)", padding: "1.8rem", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Protokoll hochladen</div>
          <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="Titel (z.B. Vorstandssitzung Mai 2025)" style={inputStyle} />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={inputStyle} />
          <input type="file" accept=".pdf,.docx" onChange={e => setFile(e.target.files?.[0] ?? null)} required style={{ ...inputStyle, cursor: "pointer" }} />
          <button type="submit" disabled={posting} style={{ fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--gold)", padding: ".7rem 1.5rem", borderRadius: 999, border: "1px solid var(--gold-line)", cursor: "pointer", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>
            {posting ? "…" : "Hochladen"}
          </button>
        </form>
      )}

      {loading ? (
        <div style={{ color: "var(--muted2)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem" }}>Laden…</div>
      ) : items.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "2rem", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
          Noch keine Protokolle hochgeladen.
        </div>
      ) : items.map(p => (
        <div key={p.id} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "1.8rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".4rem" }}>
              {new Date(p.date).toLocaleDateString("de-DE")}
            </div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>{p.title}</h3>
          </div>
          {p.file_url && (
            <a href={p.file_url} target="_blank" rel="noopener" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold)", border: "1px solid var(--gold-line)", padding: ".5rem 1rem", borderRadius: 999, textDecoration: "none", background: "var(--gold-dim)", whiteSpace: "nowrap" }}>
              PDF öffnen
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
