-- Schéma Supabase pour FN Partners — à exécuter dans le SQL Editor du projet
-- Supabase (Dashboard > SQL Editor), une fois le projet créé et les variables
-- d'environnement NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY /
-- SUPABASE_SERVICE_ROLE_KEY renseignées dans .env.local.
--
-- Toutes les lectures/écritures passent par le service role (route API + espace
-- admin), jamais directement depuis le navigateur : aucune policy publique n'est
-- nécessaire, RLS reste activé par défaut (deny-all) pour bloquer tout accès via la
-- clé anonyme.

-- 1. Demandes de devis --------------------------------------------------------

create table if not exists quote_requests (
  id bigserial primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  company text not null,
  role text,
  sector text not null,
  service_pole text not null,
  revenue_range text,
  headcount_range text,
  location text not null,
  urgency text not null check (urgency in ('normal', 'urgent', 'tres_urgent')),
  budget_range text,
  message text not null,
  attachments jsonb not null default '[]'::jsonb,
  locale text not null check (locale in ('fr', 'en')),
  status text not null default 'nouveau'
    check (status in ('nouveau', 'en_cours', 'devis_envoye', 'mission_gagnee', 'mission_perdue')),
  created_at timestamptz not null default now()
);

create index if not exists quote_requests_created_at_idx on quote_requests (created_at desc);
create index if not exists quote_requests_status_idx on quote_requests (status);

alter table quote_requests enable row level security;

-- 2. Stockage des pièces jointes ----------------------------------------------

insert into storage.buckets (id, name, public)
values ('quote-attachments', 'quote-attachments', false)
on conflict (id) do nothing;

-- 3. Articles du blog ("Actualités") -------------------------------------------
--
-- Colonnes FR/EN parallèles plutôt qu'une table de traductions séparée : deux
-- langues fixes, pas besoin de généraliser. Lecture publique limitée aux articles
-- publiés (policy ci-dessous) ; création/édition/suppression réservées au service
-- role via l'espace admin.

create table if not exists blog_posts (
  id bigserial primary key,
  slug text not null unique,
  title_fr text not null,
  title_en text not null,
  excerpt_fr text,
  excerpt_en text,
  content_fr text not null,
  content_en text not null,
  cover_image text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_created_at_idx
  on blog_posts (published, created_at desc);

alter table blog_posts enable row level security;

create policy "Public can read published posts"
  on blog_posts for select
  to anon, authenticated
  using (published = true);

-- 4. Comptes admin ---------------------------------------------------------
--
-- Un seul rôle admin : géré via auth.users de Supabase directement (Dashboard >
-- Authentication > Users > Add user), pas de table custom.
