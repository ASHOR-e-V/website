"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { ArrowRightIcon } from "@/components/icons";

type Thread = {
  id: string;
  title: string;
  body: string;
  author_id: string | null;
  author_name: string;
  pinned: boolean;
  locked: boolean;
  created_at: string;
  forum_replies?: { count: number }[];
};

type Reply = {
  id: string;
  thread_id: string;
  body: string;
  author_id: string | null;
  author_name: string;
  created_at: string;
};

const dateStyle = { fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase" as const, color: "var(--muted2)" };
const cardStyle = { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "1.8rem" };
const inputStyle = { width: "100%", background: "var(--surface2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", color: "var(--text)", padding: ".8rem 1rem", fontFamily: "'Jost', sans-serif", fontSize: ".85rem", outline: "none", marginBottom: ".9rem", boxSizing: "border-box" as const };
const smallBtn = (accent = false) => ({
  fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase" as const,
  fontWeight: 600, cursor: "pointer", padding: ".4rem .8rem", borderRadius: "var(--r-sm)",
  border: `1px solid ${accent ? "var(--gold-line)" : "var(--line)"}`,
  background: accent ? "var(--gold-dim)" : "transparent",
  color: accent ? "var(--gold)" : "var(--muted)",
});

export default function Forum({ user, isBoard, isBanned, displayName }: { user: User; isBoard: boolean; isBanned: boolean; displayName: string }) {
  const [view, setView] = useState<"list" | "thread">("list");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [posting, setPosting] = useState(false);

  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [replying, setReplying] = useState(false);

  const loadThreads = async () => {
    const { data, error } = await supabase
      .from("forum_threads")
      .select("*, forum_replies(count)")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) console.error("forum_threads fetch failed:", error.message);
    setThreads(data ?? []);
    setLoadingThreads(false);
  };

  useEffect(() => { loadThreads(); }, []);

  const createThread = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    const { error } = await supabase.from("forum_threads").insert({
      title: newTitle, body: newBody, author_id: user.id, author_name: displayName,
    });
    if (error) console.error("thread insert failed:", error.message);
    setNewTitle(""); setNewBody(""); setShowNewThread(false);
    await loadThreads();
    setPosting(false);
  };

  const deleteThread = async (id: string) => {
    if (!window.confirm("Dieses Thema mit allen Antworten wirklich löschen?")) return;
    const { error } = await supabase.from("forum_threads").delete().eq("id", id);
    if (error) console.error("thread delete failed:", error.message);
    setView("list");
    setActiveThread(null);
    await loadThreads();
  };

  const togglePinned = async (t: Thread) => {
    const { error } = await supabase.from("forum_threads").update({ pinned: !t.pinned }).eq("id", t.id);
    if (error) console.error("thread pin toggle failed:", error.message);
    setActiveThread(prev => prev && prev.id === t.id ? { ...prev, pinned: !t.pinned } : prev);
    await loadThreads();
  };

  const toggleLocked = async (t: Thread) => {
    const { error } = await supabase.from("forum_threads").update({ locked: !t.locked }).eq("id", t.id);
    if (error) console.error("thread lock toggle failed:", error.message);
    setActiveThread(prev => prev && prev.id === t.id ? { ...prev, locked: !t.locked } : prev);
    await loadThreads();
  };

  const openThread = async (t: Thread) => {
    setActiveThread(t);
    setView("thread");
    setLoadingReplies(true);
    const { data, error } = await supabase.from("forum_replies").select("*").eq("thread_id", t.id).order("created_at", { ascending: true });
    if (error) console.error("forum_replies fetch failed:", error.message);
    setReplies(data ?? []);
    setLoadingReplies(false);
  };

  const postReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread) return;
    setReplying(true);
    const { error } = await supabase.from("forum_replies").insert({
      thread_id: activeThread.id, body: replyBody, author_id: user.id, author_name: displayName,
    });
    if (error) console.error("reply insert failed:", error.message);
    setReplyBody("");
    await openThread(activeThread);
    setReplying(false);
  };

  const deleteReply = async (id: string) => {
    if (!activeThread) return;
    if (!window.confirm("Diese Antwort wirklich löschen?")) return;
    const { error } = await supabase.from("forum_replies").delete().eq("id", id);
    if (error) console.error("reply delete failed:", error.message);
    await openThread(activeThread);
  };

  return (
    <div style={{ paddingTop: 74 }}>
      <div style={{ background: "var(--surface2)", borderBottom: "1px solid var(--line)", padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "var(--max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: ".5rem" }}>Mitgliederbereich</div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700 }}>Forum</h1>
          </div>
          <Link href="/members" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", padding: ".5rem 1rem", borderRadius: "var(--r-sm)", textDecoration: "none" }}>
            Zurück zum Mitgliederbereich
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {view === "list" && (
          <div>
            {isBanned ? (
              <div style={{ ...cardStyle, borderColor: "var(--clay-line)", marginBottom: "2rem", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
                Du wurdest vom Schreiben im Forum ausgeschlossen. Mitlesen kannst du weiterhin.
              </div>
            ) : (
              <div style={{ marginBottom: "2rem" }}>
                {!showNewThread ? (
                  <button onClick={() => setShowNewThread(true)} className="btn-solid" style={{ fontFamily: "'Jost', sans-serif", background: "var(--gold-solid)", color: "var(--on-gold)", padding: ".8rem 1.6rem", borderRadius: "var(--r-sm)", border: "none", cursor: "pointer", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700 }}>
                    Neues Thema
                  </button>
                ) : (
                  <form onSubmit={createThread} style={{ ...cardStyle, borderColor: "var(--gold-line)" }}>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Neues Thema</div>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} required placeholder="Titel" style={inputStyle} />
                    <textarea value={newBody} onChange={e => setNewBody(e.target.value)} required placeholder="Worum geht's?" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                    <div style={{ display: "flex", gap: ".75rem" }}>
                      <button type="submit" disabled={posting} style={{ fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--gold)", padding: ".7rem 1.5rem", borderRadius: "var(--r-sm)", border: "1px solid var(--gold-line)", cursor: "pointer", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>
                        {posting ? "…" : "Veröffentlichen"}
                      </button>
                      <button type="button" onClick={() => setShowNewThread(false)} style={{ fontFamily: "'Jost', sans-serif", background: "none", color: "var(--muted)", padding: ".7rem 1.5rem", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", cursor: "pointer", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>
                        Abbrechen
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {loadingThreads ? (
              <div style={{ color: "var(--muted2)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem" }}>Laden…</div>
            ) : threads.length === 0 ? (
              <div style={{ ...cardStyle, color: "var(--muted)", fontFamily: "'Lora', serif" }}>Noch keine Themen. Sei die*der Erste.</div>
            ) : threads.map(t => (
              <button
                key={t.id}
                onClick={() => openThread(t)}
                style={{
                  ...cardStyle, width: "100%", textAlign: "left", cursor: "pointer", marginBottom: "1rem",
                  display: "block", position: "relative", overflow: "hidden",
                  borderColor: t.pinned ? "var(--gold-line)" : "var(--line)",
                }}
              >
                {t.pinned && <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold-solid), transparent)" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".5rem", flexWrap: "wrap" }}>
                  {t.pinned && <span style={{ ...dateStyle, color: "var(--gold)", border: "1px solid var(--gold-line)", borderRadius: "var(--r-sm)", padding: ".15rem .5rem" }}>Angepinnt</span>}
                  {t.locked && <span style={{ ...dateStyle, borderRadius: "var(--r-sm)", padding: ".15rem .5rem", border: "1px solid var(--line)" }}>Geschlossen</span>}
                </div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".5rem" }}>{t.title}</h2>
                <div style={dateStyle}>
                  {t.author_name} · {new Date(t.created_at).toLocaleDateString("de-DE")} · {(t.forum_replies?.[0]?.count ?? 0)} {(t.forum_replies?.[0]?.count ?? 0) === 1 ? "Antwort" : "Antworten"}
                </div>
              </button>
            ))}
          </div>
        )}

        {view === "thread" && activeThread && (
          <div>
            <button onClick={() => { setView("list"); setActiveThread(null); }} style={{ ...linkBack }}>
              ← Alle Themen
            </button>

            <div style={{ ...cardStyle, marginTop: "1.2rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
              {activeThread.pinned && <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold-solid), transparent)" }} />}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: ".8rem" }}>
                <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>{activeThread.title}</h1>
                <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                  {isBoard && (
                    <>
                      <button onClick={() => togglePinned(activeThread)} style={smallBtn(activeThread.pinned)}>{activeThread.pinned ? "Lösen" : "Anpinnen"}</button>
                      <button onClick={() => toggleLocked(activeThread)} style={smallBtn(activeThread.locked)}>{activeThread.locked ? "Öffnen" : "Schließen"}</button>
                    </>
                  )}
                  {(isBoard || activeThread.author_id === user.id) && (
                    <button onClick={() => deleteThread(activeThread.id)} style={smallBtn()}>Löschen</button>
                  )}
                </div>
              </div>
              <div style={{ ...dateStyle, marginBottom: "1rem" }}>{activeThread.author_name} · {new Date(activeThread.created_at).toLocaleDateString("de-DE")}</div>
              <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".94rem", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{activeThread.body}</p>
            </div>

            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: "1rem" }}>
              {replies.length} {replies.length === 1 ? "Antwort" : "Antworten"}
            </div>

            {loadingReplies ? (
              <div style={{ color: "var(--muted2)", fontFamily: "'Jost', sans-serif", fontSize: ".78rem" }}>Laden…</div>
            ) : replies.map(r => (
              <div key={r.id} style={{ ...cardStyle, marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: ".6rem" }}>
                  <div style={dateStyle}>{r.author_name} · {new Date(r.created_at).toLocaleDateString("de-DE")}</div>
                  {(isBoard || r.author_id === user.id) && (
                    <button onClick={() => deleteReply(r.id)} style={smallBtn()}>Löschen</button>
                  )}
                </div>
                <p style={{ fontFamily: "'Lora', serif", color: "var(--muted)", fontSize: ".92rem", lineHeight: 1.85, whiteSpace: "pre-wrap", margin: 0 }}>{r.body}</p>
              </div>
            ))}

            {isBanned ? (
              <div style={{ ...cardStyle, borderColor: "var(--clay-line)", color: "var(--muted)", fontFamily: "'Lora', serif" }}>
                Du wurdest vom Schreiben im Forum ausgeschlossen.
              </div>
            ) : activeThread.locked && !isBoard ? (
              <div style={{ ...cardStyle, color: "var(--muted)", fontFamily: "'Lora', serif" }}>
                Dieses Thema ist geschlossen — es sind keine weiteren Antworten möglich.
              </div>
            ) : (
              <form onSubmit={postReply} style={{ ...cardStyle, borderColor: "var(--gold-line)" }}>
                <textarea value={replyBody} onChange={e => setReplyBody(e.target.value)} required placeholder="Antworten…" rows={3} style={{ ...inputStyle, resize: "vertical", marginBottom: ".9rem" }} />
                <button type="submit" disabled={replying} className="link-arrow" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontFamily: "'Jost', sans-serif", background: "var(--gold-dim)", color: "var(--gold)", padding: ".7rem 1.5rem", borderRadius: "var(--r-sm)", border: "1px solid var(--gold-line)", cursor: "pointer", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>
                  {replying ? "…" : "Antworten"} {!replying && <ArrowRightIcon size={12} />}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const linkBack = {
  fontFamily: "'Jost', sans-serif", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase" as const,
  color: "var(--muted)", background: "none", border: "none", cursor: "pointer", padding: 0,
};
