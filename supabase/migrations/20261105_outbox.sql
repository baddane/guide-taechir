-- File d'envoi de /admin (« Messages préparés »).
--
-- Règle de l'exploitant du 05/11/2026 : TOUT e-mail part depuis /admin, au
-- gabarit du site et depuis contact@guide-taechir.org, plus jamais depuis un
-- Gmail connecté. Les messages préparés hors de l'interface (session Claude,
-- routine) sont déposés ici ; l'admin les relit, les corrige au besoin et
-- clique « Envoyer ». Rien ne part sans ce clic.
--
-- Aucune policy : lecture et écriture passent par les fonctions SECURITY
-- DEFINER protégées par le mot de passe admin (admin_verify).
create table if not exists public.outbox (
  id         uuid primary key default gen_random_uuid(),
  to_email   text not null,
  subject    text not null,
  body       text not null,            -- Markdown
  note       text,                     -- contexte pour l'admin, jamais envoyé
  statut     text not null default 'a_envoyer'
             check (statut in ('a_envoyer', 'envoye', 'abandonne')),
  created_at timestamptz not null default now(),
  sent_at    timestamptz
);
alter table public.outbox enable row level security;
revoke all on table public.outbox from anon, authenticated;

create or replace function public.admin_outbox_list(p_password text)
returns setof public.outbox
language plpgsql security definer set search_path to 'public', 'extensions'
as $$
begin
  if not public.admin_verify(p_password) then
    raise exception 'unauthorized';
  end if;
  return query
    select * from public.outbox
     where statut = 'a_envoyer' or sent_at > now() - interval '7 days'
     order by created_at asc;
end;
$$;

-- Texte relu (NULL = inchangé) et/ou statut. N'agit que sur une ligne encore
-- à envoyer : c'est la « réservation » qui empêche un double envoi.
create or replace function public.admin_outbox_set(
  p_password text, p_id uuid, p_statut text,
  p_subject text default null, p_body text default null
)
returns public.outbox
language plpgsql security definer set search_path to 'public', 'extensions'
as $$
declare v public.outbox;
begin
  if not public.admin_verify(p_password) then
    raise exception 'unauthorized';
  end if;
  update public.outbox
     set subject = coalesce(nullif(p_subject, ''), subject),
         body    = coalesce(nullif(p_body, ''), body),
         statut  = coalesce(nullif(p_statut, ''), statut),
         sent_at = case when p_statut = 'envoye' then now() else sent_at end
   where id = p_id and statut = 'a_envoyer'
  returning * into v;
  return v;
end;
$$;

-- Si Brevo refuse, la route rend la ligne à la file.
create or replace function public.admin_outbox_revert(p_password text, p_id uuid)
returns void
language plpgsql security definer set search_path to 'public', 'extensions'
as $$
begin
  if not public.admin_verify(p_password) then
    raise exception 'unauthorized';
  end if;
  update public.outbox set statut = 'a_envoyer', sent_at = null
   where id = p_id and statut = 'envoye';
end;
$$;
