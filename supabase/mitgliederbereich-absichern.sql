-- ═══════════════════════════════════════════════════════════════════════
--  ASHOR — Absicherung des Mitgliederbereichs
--
--  Im Supabase-Dashboard unter SQL Editor ausführen. Das Skript ist
--  idempotent, kann also gefahrlos mehrfach laufen.
--
--  WARUM DAS SERVERSEITIG PASSIEREN MUSS
--  Eine Abfrage im Browser ("bist du Mitglied?") ist reine Nutzerführung,
--  keine Sicherheitsmaßnahme. Wer die Entwicklerkonsole öffnet oder die
--  Supabase-URL direkt anspricht, umgeht sie in Sekunden. Verlässlich ist
--  allein, was die Datenbank selbst durchsetzt. Dieses Skript baut deshalb
--  zwei voneinander unabhängige Schichten:
--
--    1. Row Level Security auf jeder Tabelle. Selbst ein angelegtes Konto
--       sieht ohne freigeschaltete Mitgliedschaft schlicht nichts.
--    2. Ein Before-User-Created-Hook, der die Registrierung von Adressen
--       ablehnt, die nicht auf der Mitgliederliste stehen.
--
--  Schicht 1 ist die eigentliche Absicherung. Schicht 2 ist Komfort und
--  zweite Verteidigungslinie — sie allein würde nicht genügen.
-- ═══════════════════════════════════════════════════════════════════════


-- ── 1. Mitgliederliste ─────────────────────────────────────────────────
-- Die Liste der Adressen, die sich registrieren dürfen. Pflege durch den
-- Vorstand, entweder hier per SQL oder später über den Mitgliederbereich.

create table if not exists public.member_allowlist (
  email       text primary key,
  full_name   text,
  note        text,
  created_at  timestamptz not null default now()
);

-- Gross-/Kleinschreibung darf nie den Unterschied machen.
create or replace function public.normalize_allowlist_email()
returns trigger language plpgsql as $$
begin
  new.email := lower(btrim(new.email));
  return new;
end;
$$;

drop trigger if exists trg_normalize_allowlist_email on public.member_allowlist;
create trigger trg_normalize_allowlist_email
  before insert or update on public.member_allowlist
  for each row execute function public.normalize_allowlist_email();

alter table public.member_allowlist enable row level security;

-- Die Liste ist bewusst für niemanden per API lesbar: sie enthält die
-- E-Mail-Adressen aller Mitglieder. Nur der Vorstand darf sie sehen.
drop policy if exists allowlist_board_all on public.member_allowlist;
create policy allowlist_board_all on public.member_allowlist
  for all to authenticated
  using (public.is_board())
  with check (public.is_board());


-- ── 2. Profile ─────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  is_board    boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.profiles add column if not exists is_board boolean not null default false;

-- Profil automatisch anlegen, sobald ein Konto entsteht.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists trg_handle_new_user on auth.users;
create trigger trg_handle_new_user
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ── 3. Hilfsfunktionen ─────────────────────────────────────────────────
-- security definer, damit die Prüfung selbst nicht wieder an RLS scheitert.

-- Ist die angemeldete Person Vorstand?
create or replace function public.is_board()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select p.is_board from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

-- Steht die angemeldete Person auf der Mitgliederliste?
create or replace function public.is_member()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.member_allowlist a
    where a.email = lower((select u.email from auth.users u where u.id = auth.uid()))
  );
$$;

grant execute on function public.is_board()  to authenticated;
grant execute on function public.is_member() to authenticated;


-- ── 4. Row Level Security ──────────────────────────────────────────────

-- Profile: jede*r sieht das eigene, der Vorstand alle.
alter table public.profiles enable row level security;

drop policy if exists profiles_select_own   on public.profiles;
drop policy if exists profiles_select_board on public.profiles;
drop policy if exists profiles_update_own   on public.profiles;
drop policy if exists profiles_update_board on public.profiles;

create policy profiles_select_own on public.profiles
  for select to authenticated using (id = auth.uid());

create policy profiles_select_board on public.profiles
  for select to authenticated using (public.is_board());

-- Wichtig: das eigene Profil darf man bearbeiten, aber is_board nicht
-- selbst setzen — sonst könnte sich jedes Konto zum Vorstand befördern.
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and is_board = (select p.is_board from public.profiles p where p.id = auth.uid()));

create policy profiles_update_board on public.profiles
  for update to authenticated
  using (public.is_board()) with check (public.is_board());


-- Ankündigungen: lesen dürfen freigeschaltete Mitglieder, schreiben der Vorstand.
create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  content     text,
  created_at  timestamptz not null default now()
);
alter table public.announcements enable row level security;

drop policy if exists announcements_read  on public.announcements;
drop policy if exists announcements_write on public.announcements;

create policy announcements_read on public.announcements
  for select to authenticated using (public.is_member() or public.is_board());

create policy announcements_write on public.announcements
  for all to authenticated
  using (public.is_board()) with check (public.is_board());


-- Protokolle: dito.
create table if not exists public.protocols (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date,
  file_url    text,
  created_at  timestamptz not null default now()
);
alter table public.protocols enable row level security;

drop policy if exists protocols_read  on public.protocols;
drop policy if exists protocols_write on public.protocols;

create policy protocols_read on public.protocols
  for select to authenticated using (public.is_member() or public.is_board());

create policy protocols_write on public.protocols
  for all to authenticated
  using (public.is_board()) with check (public.is_board());


-- Kontaktanfragen: das öffentliche Formular muss schreiben dürfen,
-- lesen darf sie ausschliesslich der Vorstand.
--
-- ACHTUNG: Ohne diese Policies konnte bisher jede*r mit dem öffentlichen
-- anon-Key sämtliche Kontaktanfragen samt Namen und E-Mail-Adressen
-- auslesen. Bitte nach dem Ausführen einmal gegenprüfen.
create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  name         text,
  email        text,
  institution  text,
  type         text,
  message      text,
  read         boolean not null default false,
  created_at   timestamptz not null default now()
);
alter table public.contact_submissions enable row level security;

drop policy if exists contact_insert_public on public.contact_submissions;
drop policy if exists contact_read_board    on public.contact_submissions;
drop policy if exists contact_write_board   on public.contact_submissions;

create policy contact_insert_public on public.contact_submissions
  for insert to anon, authenticated with check (true);

create policy contact_read_board on public.contact_submissions
  for select to authenticated using (public.is_board());

create policy contact_write_board on public.contact_submissions
  for update to authenticated
  using (public.is_board()) with check (public.is_board());


-- ── 5. Registrierung auf die Mitgliederliste beschränken ───────────────
-- Before-User-Created-Hook. Nach dem Ausführen im Dashboard aktivieren:
-- Authentication → Hooks → "Before User Created" → diese Funktion wählen.

create or replace function public.hook_restrict_signup_to_members(event jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  candidate text;
begin
  candidate := lower(btrim(coalesce(event->'user'->>'email', '')));

  if candidate = '' or not exists (
    select 1 from public.member_allowlist a where a.email = candidate
  ) then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'message', 'Diese E-Mail-Adresse ist nicht als ASHOR-Mitglied hinterlegt. Bitte stelle zuerst einen Mitgliedsantrag.',
        'http_code', 403
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

grant execute on function public.hook_restrict_signup_to_members to supabase_auth_admin;
revoke execute on function public.hook_restrict_signup_to_members from authenticated, anon, public;

-- Der Hook muss die Liste lesen dürfen.
grant usage on schema public to supabase_auth_admin;
grant select on public.member_allowlist to supabase_auth_admin;


-- ── 6. Erste Einträge ──────────────────────────────────────────────────
-- Vor dem Aktivieren des Hooks unbedingt befüllen — sonst sperrt ihr euch
-- selbst aus. Adressen in Kleinschreibung, eine Zeile pro Mitglied.

insert into public.member_allowlist (email, full_name, note) values
  ('ashor.jgu@gmail.com', 'ASHOR Vorstand', 'Sammelpostfach')
on conflict (email) do nothing;

-- Bestehende Konten, die schon existieren, hier ergänzen:
-- insert into public.member_allowlist (email, full_name) values
--   ('vorname.nachname@example.com', 'Vorname Nachname')
-- on conflict (email) do nothing;

-- Vorstandsrechte vergeben (nachdem sich die Person registriert hat):
-- update public.profiles set is_board = true
-- where id = (select id from auth.users where lower(email) = 'ninous...@...');


-- ── 7. Kontrolle ───────────────────────────────────────────────────────
-- Sollte für jede Tabelle rowsecurity = true liefern.
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('profiles','announcements','protocols','contact_submissions','member_allowlist')
order by tablename;
