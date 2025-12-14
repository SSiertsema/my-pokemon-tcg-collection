-- Pokemon Collectie App - Supabase Database Schema
-- Uitgevoerd op: 2025-12-14
-- Platform: Supabase (PostgreSQL)

-- =============================================================================
-- USER COLLECTIONS TABLE
-- Houdt bij welke kaarten een gebruiker in bezit heeft
-- =============================================================================
create table user_collections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  card_id text not null,
  quantity int default 1,
  created_at timestamp with time zone default now(),
  unique(user_id, card_id)
);

-- =============================================================================
-- WISHLIST TABLE
-- Houdt bij welke kaarten een gebruiker op de wishlist heeft
-- =============================================================================
create table user_wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  card_id text not null,
  created_at timestamp with time zone default now(),
  unique(user_id, card_id)
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- Zorgt ervoor dat gebruikers alleen hun eigen data kunnen zien/bewerken
-- =============================================================================
alter table user_collections enable row level security;
alter table user_wishlists enable row level security;

-- Policy: Gebruikers kunnen alleen hun eigen collectie beheren
create policy "Users can manage own collection"
  on user_collections for all using (auth.uid() = user_id);

-- Policy: Gebruikers kunnen alleen hun eigen wishlist beheren
create policy "Users can manage own wishlist"
  on user_wishlists for all using (auth.uid() = user_id);

-- =============================================================================
-- INDEXES (optioneel, voor betere performance)
-- =============================================================================
create index idx_user_collections_user_id on user_collections(user_id);
create index idx_user_collections_card_id on user_collections(card_id);
create index idx_user_wishlists_user_id on user_wishlists(user_id);
create index idx_user_wishlists_card_id on user_wishlists(card_id);
