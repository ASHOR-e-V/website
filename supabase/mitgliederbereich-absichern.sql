-- ═══════════════════════════════════════════════════════════════════════
--  ASHOR — Absicherung des Mitgliederbereichs
--
--  Im Supabase-Dashboard unter SQL Editor komplett einfügen und ausführen.
--  Das Skript ist idempotent, kann also gefahrlos mehrfach laufen.
--
--  WIE DIE PRÜFUNG JETZT LÄUFT (manuelle Freischaltung)
--  Jede Registrierung wird technisch angenommen — niemand wird beim
--  Registrieren automatisch abgewiesen. Neue Konten sehen aber
--  schlicht nichts (profiles.is_approved = false per Default), bis der
--  Vorstand im Mitgliederbereich unter „Verwaltung" manuell freischaltet.
--  Das ist die eigentliche Absicherung, durchgesetzt über Row Level
--  Security — eine Abfrage im Browser wäre nur Nutzerführung, keine
--  Sicherheitsmaßnahme, weil sie sich mit der Entwicklerkonsole oder
--  direkten Aufrufen der Supabase-URL umgehen liesse.
--
--  Damit der Vorstand nicht rätseln muss: Bei jeder Registrierung geht
--  eine Telegram-Nachricht raus (Funktion notify_new_registration,
--  Abschnitt 2 — Zugangsdaten dafür in Abschnitt 6d), und member_allowlist
--  (Abschnitt 6a/6b — E-Mail-Adresse oder Name, optional, nur als
--  Gedächtnisstütze) vermerkt in profiles.matched_via, ob die Person
--  mit bekannter E-Mail-Adresse oder bekanntem Namen registriert hat.
--  Das entscheidet nichts automatisch mehr — nur der Vorstand schaltet
--  frei — aber es macht die Prüfung beim Freischalten schneller.
--
--  REIHENFOLGE BEIM EINRICHTEN
--    1. Dieses Skript ausführen.
--    2. Abschnitt 6d: Telegram-Bot anlegen und Token/Chat-ID eintragen,
--       damit ihr bei jeder Registrierung benachrichtigt werdet.
--    3. Optional, Abschnitt 6a/6b: eure Mitglieder eintragen (E-Mail
--       oder Name) — rein informativ für profiles.matched_via.
--    4. Dir selbst Vorstandsrechte und Freischaltung geben (Abschnitt 6c).
--
--  Der Before-User-Created-Hook (Abschnitt 4) bleibt im Skript, ist aber
--  NICHT mehr der empfohlene Weg und muss nirgends aktiviert werden — er
--  würde Registrierungen automatisch anhand von member_allowlist ablehnen,
--  was ihr bewusst nicht mehr wollt, weil ihr jede Anmeldung selbst sehen
--  und freischalten wollt.
-- ═══════════════════════════════════════════════════════════════════════


-- ═══ 0. Hilfsfunktion ══════════════════════════════════════════════════
-- Vor den Tabellen, weil eine der Tabellen sie in einer generierten
-- Spalte braucht. Vereinheitlicht Gross-/Kleinschreibung und Leerzeichen,
-- damit "Caroline  Barsoum" und "caroline barsoum" als derselbe Name
-- gelten.
create or replace function public.normalize_name(raw text)
returns text language sql immutable as $$
  select nullif(lower(regexp_replace(btrim(coalesce(raw, '')), '\s+', ' ', 'g')), '');
$$;


-- ═══ 1. Tabellen ═══════════════════════════════════════════════════════
-- Zuerst alle Tabellen, danach die Funktionen, erst zum Schluss die
-- Policies — Policies dürfen nur auf Dinge verweisen, die es schon gibt.

-- Die Personen, die sich registrieren dürfen. Pflege durch den Vorstand.
-- email ist die starke Prüfung, full_name die schwächere (siehe Hinweis
-- oben) — mindestens eines der beiden muss gesetzt sein.
create table if not exists public.member_allowlist (
  id          uuid primary key default gen_random_uuid(),
  email       text,
  full_name   text,
  note        text,
  created_at  timestamptz not null default now()
);

-- Migration von der alten Fassung (email als Primärschlüssel, kein
-- Namensabgleich) auf die neue — nur relevant, falls die Tabelle schon
-- in der alten Form existiert; bei einer frischen Installation ist der
-- Block ein no-op.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'member_allowlist' and column_name = 'email'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'member_allowlist' and column_name = 'id'
  ) then
    alter table public.member_allowlist add column id uuid not null default gen_random_uuid();
    alter table public.member_allowlist drop constraint if exists member_allowlist_pkey;
    alter table public.member_allowlist add primary key (id);
    alter table public.member_allowlist alter column email drop not null;
  end if;
end $$;

alter table public.member_allowlist add column if not exists normalized_name text
  generated always as (public.normalize_name(full_name)) stored;

create unique index if not exists member_allowlist_email_uniq
  on public.member_allowlist (email) where email is not null;
create unique index if not exists member_allowlist_name_uniq
  on public.member_allowlist (normalized_name) where email is null;

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  is_board    boolean not null default false,
  is_approved boolean not null default false,
  matched_via text,
  created_at  timestamptz not null default now()
);
alter table public.profiles add column if not exists is_board    boolean not null default false;
alter table public.profiles add column if not exists is_approved boolean not null default false;
alter table public.profiles add column if not exists matched_via text;

-- Zugangsdaten für die Telegram-Benachrichtigung bei neuen Registrierungen
-- (Abschnitt 3b). Zwei Zeilen, vom Vorstand befüllt — siehe Abschnitt 6d.
create table if not exists public.app_settings (
  key   text primary key,
  value text
);
insert into public.app_settings (key, value) values
  ('telegram_bot_token', null),
  ('telegram_chat_id', null)
on conflict (key) do nothing;

create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  content     text,
  created_at  timestamptz not null default now()
);

create table if not exists public.protocols (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date,
  file_url    text,
  created_at  timestamptz not null default now()
);

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


-- ═══ 2. Funktionen ═════════════════════════════════════════════════════

-- Gross-/Kleinschreibung darf bei E-Mail-Adressen nie den Unterschied machen.
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

-- Schickt eine Telegram-Nachricht an den Vorstand, sobald sich jemand
-- registriert. Setzt voraus, dass die pg_net-Extension aktiv ist (unten)
-- und Abschnitt 6d ausgefüllt wurde — solange app_settings leer ist,
-- passiert hier einfach nichts, die Registrierung läuft trotzdem normal
-- weiter. Ein Fehler beim Versenden darf die Registrierung nie verhindern,
-- daher der eigene exception-Block.
create extension if not exists pg_net;

create or replace function public.notify_new_registration(
  p_email       text,
  p_full_name   text,
  p_matched_via text
)
returns void language plpgsql security definer set search_path = public as $$
declare
  token   text;
  chat_id text;
  label   text;
begin
  select value into token   from public.app_settings where key = 'telegram_bot_token';
  select value into chat_id from public.app_settings where key = 'telegram_chat_id';

  if token is null or token = '' or chat_id is null or chat_id = '' then
    return;
  end if;

  label := case p_matched_via
    when 'email' then 'bekannte E-Mail-Adresse'
    when 'name'  then 'bekannter Name'
    else 'weder E-Mail noch Name erkannt — genau prüfen'
  end;

  perform net.http_post(
    url     := 'https://api.telegram.org/bot' || token || '/sendMessage',
    body    := jsonb_build_object(
      'chat_id', chat_id,
      'text',
        'Neue Registrierung im Mitgliederbereich' || chr(10) ||
        coalesce(nullif(p_full_name, ''), '(kein Name angegeben)') || ' — ' || coalesce(p_email, '') || chr(10) ||
        'Abgleich: ' || label || chr(10) ||
        'Freischalten unter Mitgliederbereich → Verwaltung.'
    ),
    headers := jsonb_build_object('Content-Type', 'application/json')
  );
exception when others then
  null;
end;
$$;

-- Profil automatisch anlegen, sobald ein Konto entsteht — und dabei
-- vermerken, worüber die Person schon bekannt war (matched_via), damit
-- der Vorstand beim manuellen Freischalten nicht bei null anfängt.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  candidate_name text := coalesce(new.raw_user_meta_data->>'full_name', '');
  matched        text;
begin
  insert into public.profiles (id, full_name)
  values (new.id, candidate_name)
  on conflict (id) do nothing;

  select case
    when exists (select 1 from public.member_allowlist a where a.email = lower(new.email)) then 'email'
    when exists (select 1 from public.member_allowlist a where a.normalized_name = public.normalize_name(candidate_name)) then 'name'
    else null
  end into matched;

  update public.profiles set matched_via = matched where id = new.id;

  perform public.notify_new_registration(new.email, candidate_name, matched);

  return new;
end;
$$;

drop trigger if exists trg_handle_new_user on auth.users;
create trigger trg_handle_new_user
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Ist die angemeldete Person Vorstand?
--
-- security definer ist hier zwingend, nicht bequem: die Funktion wird in
-- den Policies der profiles-Tabelle selbst benutzt. Als normale Funktion
-- würde ihre Abfrage wieder gegen dieselben Policies laufen — Postgres
-- bricht das mit „infinite recursion detected in policy" ab.
create or replace function public.is_board()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select p.is_board from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

-- Wurde die angemeldete Person vom Vorstand freigeschaltet? Aus demselben
-- Grund security definer wie is_board() oben.
create or replace function public.is_approved()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select p.is_approved from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

-- Historischer Name, damit die Policies unten unverändert bleiben —
-- "Mitglied" heisst jetzt schlicht "vom Vorstand freigeschaltet".
create or replace function public.is_member()
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_approved();
$$;

grant execute on function public.is_board()     to authenticated;
grant execute on function public.is_approved()  to authenticated;
grant execute on function public.is_member()    to authenticated;


-- ═══ 3. Row Level Security ═════════════════════════════════════════════

alter table public.member_allowlist    enable row level security;
alter table public.profiles            enable row level security;
alter table public.announcements       enable row level security;
alter table public.protocols           enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.app_settings        enable row level security;

-- Telegram-Zugangsdaten: ausschliesslich Vorstand.
drop policy if exists app_settings_board_all on public.app_settings;
create policy app_settings_board_all on public.app_settings
  for all to authenticated
  using (public.is_board()) with check (public.is_board());


-- Mitgliederliste: enthält die Adressen aller Mitglieder, daher nur Vorstand.
drop policy if exists allowlist_board_all on public.member_allowlist;
create policy allowlist_board_all on public.member_allowlist
  for all to authenticated
  using (public.is_board())
  with check (public.is_board());


-- Profile: eigenes Profil sichtbar, Vorstand sieht alle.
drop policy if exists profiles_select_own   on public.profiles;
drop policy if exists profiles_select_board on public.profiles;
drop policy if exists profiles_update_own   on public.profiles;
drop policy if exists profiles_update_board on public.profiles;

create policy profiles_select_own on public.profiles
  for select to authenticated using (id = auth.uid());

create policy profiles_select_board on public.profiles
  for select to authenticated using (public.is_board());

-- Das eigene Profil darf bearbeitet werden, aber weder is_board noch
-- is_approved selbst gesetzt — sonst könnte sich jedes Konto selbst zum
-- Vorstand machen oder sich selbst freischalten. Der Vergleich läuft über
-- is_board()/is_approved(), nicht über eine Unterabfrage auf profiles,
-- weil letztere hier eine Rekursion auslösen würde.
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and is_board = public.is_board() and is_approved = public.is_approved());

create policy profiles_update_board on public.profiles
  for all to authenticated
  using (public.is_board()) with check (public.is_board());


-- Ankündigungen: Mitglieder lesen, Vorstand schreibt.
drop policy if exists announcements_read  on public.announcements;
drop policy if exists announcements_write on public.announcements;

create policy announcements_read on public.announcements
  for select to authenticated using (public.is_member() or public.is_board());

create policy announcements_write on public.announcements
  for all to authenticated
  using (public.is_board()) with check (public.is_board());


-- Protokolle: dito.
drop policy if exists protocols_read  on public.protocols;
drop policy if exists protocols_write on public.protocols;

create policy protocols_read on public.protocols
  for select to authenticated using (public.is_member() or public.is_board());

create policy protocols_write on public.protocols
  for all to authenticated
  using (public.is_board()) with check (public.is_board());


-- Kontaktanfragen: das öffentliche Formular muss schreiben dürfen, lesen
-- darf ausschliesslich der Vorstand.
--
-- ACHTUNG: Ohne diese Policies konnte bislang jede*r mit dem öffentlichen
-- anon-Key — der im JavaScript jeder Seite steht — sämtliche Anfragen samt
-- Namen und E-Mail-Adressen auslesen. Bitte nach dem Ausführen gegenprüfen.
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


-- ═══ 4. Optional: Registrierung automatisch ablehnen (NICHT aktiv) ═════
-- Before-User-Created-Hook. AKTUELL NICHT AKTIVIEREN — ihr habt euch für
-- die manuelle Freischaltung entschieden (siehe oben), die diese
-- Funktion überflüssig macht. Bleibt nur für den Fall im Skript, dass ihr
-- später doch automatisch ablehnen wollt: dann in Authentication → Hooks
-- → Before User Created → diese Funktion wählen.

-- Prüft E-Mail-Adresse ODER Namen (aus dem bei der Registrierung
-- mitgeschickten full_name) gegen die Mitgliederliste. Der Namensabgleich
-- ist die schwächere Prüfung — siehe der grosse Hinweis ganz oben in
-- dieser Datei, insbesondere zum nötigen Live-Test.
create or replace function public.hook_restrict_signup_to_members(event jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  candidate_email text;
  candidate_name  text;
begin
  candidate_email := lower(btrim(coalesce(event->'user'->>'email', '')));
  candidate_name  := public.normalize_name(event->'user'->'user_metadata'->>'full_name');

  if not exists (
    select 1 from public.member_allowlist a
    where (candidate_email <> '' and a.email = candidate_email)
       or (candidate_name is not null and a.normalized_name = candidate_name)
  ) then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'message', 'Dieser Name bzw. diese E-Mail-Adresse ist nicht als ASHOR-Mitglied hinterlegt. Bitte stelle zuerst einen Mitgliedsantrag.',
        'http_code', 403
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

grant execute on function public.hook_restrict_signup_to_members to supabase_auth_admin;
revoke execute on function public.hook_restrict_signup_to_members from authenticated, anon, public;

grant usage on schema public to supabase_auth_admin;
grant select on public.member_allowlist to supabase_auth_admin;


-- ═══ 5. Ausstehende Registrierungen ════════════════════════════════════
-- Wer schon ein Konto hat, aber noch nicht freigeschaltet ist. Dasselbe
-- steht auch im Mitgliederbereich unter „Verwaltung" — hier zusätzlich
-- die Info, ob E-Mail-Adresse oder Name aus Abschnitt 6a/6b bekannt war.

select u.email, p.full_name, p.matched_via, u.created_at
from public.profiles p
join auth.users u on u.id = p.id
where p.is_approved = false
order by u.created_at;

-- Freischalten — E-Mail-Adresse anpassen und ausführen (oder gleich im
-- Mitgliederbereich unter „Verwaltung" auf „Freischalten" klicken):
-- update public.profiles set is_approved = true
-- where id = (select id from auth.users where lower(email) = 'person@adresse.de');


-- ═══ 6. Hier eintragen ═════════════════════════════════════════════════

-- 6a. Optional — mit bekannter E-Mail-Adresse, rein informativ für
-- profiles.matched_via beim Freischalten. Adressen in Kleinschreibung.
insert into public.member_allowlist (email, full_name, note) values
  ('ashor.jgu@gmail.com', 'ASHOR Vorstand', 'Sammelpostfach')
  -- ('caroline...@...',  'Caroline Barsoum'),
  -- ('ninous...@...',    'Ninous Andersson')
on conflict (email) where email is not null do nothing;

-- 6b. Optional — nur mit Namen, ohne bekannte E-Mail-Adresse, ebenfalls
-- rein informativ (siehe Hinweis ganz oben zu Schreibweisen). email
-- bleibt bei diesen Zeilen bewusst leer.
insert into public.member_allowlist (full_name) values
  ('Robina Lajin'),
  ('Severios Isac'),
  ('Dalia Abdo'),
  ('Roben Lajin')
  -- , ('Weiterer Name')
on conflict (normalized_name) where email is null do nothing;

-- 6c. Dir selbst Vorstandsrechte UND Freischaltung geben — sonst siehst
-- du nach dem Registrieren selbst nichts. E-Mail-Adresse anpassen:
-- update public.profiles set is_board = true, is_approved = true
-- where id = (select id from auth.users where lower(email) = 'deine@adresse.de');

-- 6d. Telegram-Bot für die Benachrichtigung bei neuen Registrierungen.
-- Einrichtung: bei Telegram @BotFather anschreiben, /newbot, Namen
-- vergeben — man bekommt einen Token. Danach dem neuen Bot selbst kurz
-- schreiben (irgendein Wort reicht), dann im Browser
-- https://api.telegram.org/bot<TOKEN>/getUpdates öffnen — dort steht
-- eure chat_id. Beides unten eintragen und die Zeilen entkommentieren —
-- solange sie leer bleiben, passiert bei der Registrierung einfach
-- nichts (keine Benachrichtigung, aber auch kein Fehler):
-- update public.app_settings set value = 'HIER_DEN_BOT_TOKEN_EINTRAGEN' where key = 'telegram_bot_token';
-- update public.app_settings set value = 'HIER_DIE_CHAT_ID_EINTRAGEN'   where key = 'telegram_chat_id';


-- ═══ 7. Kontrolle ══════════════════════════════════════════════════════
-- Muss für jede der sechs Tabellen rowsecurity = true liefern.

select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('profiles','announcements','protocols','contact_submissions','member_allowlist','app_settings')
order by tablename;
