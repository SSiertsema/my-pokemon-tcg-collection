# Database Documentatie

## Platform

- **Provider:** Supabase
- **Database:** PostgreSQL
- **Project URL:** `https://svwxviyshvpfcwbixjng.supabase.co`

## Schema Overzicht

### Tabellen

| Tabel | Beschrijving |
|-------|--------------|
| `user_collections` | Kaarten die een gebruiker in bezit heeft |
| `user_wishlists` | Kaarten op de wishlist van een gebruiker |

### user_collections

| Kolom | Type | Beschrijving |
|-------|------|--------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Foreign key naar auth.users |
| `card_id` | text | Pokemon TCG card ID (bijv. "base1-4") |
| `quantity` | int | Aantal exemplaren (default: 1) |
| `created_at` | timestamptz | Aanmaakdatum |

**Constraints:**
- `unique(user_id, card_id)` - Een gebruiker kan een kaart maar één keer toevoegen

### user_wishlists

| Kolom | Type | Beschrijving |
|-------|------|--------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Foreign key naar auth.users |
| `card_id` | text | Pokemon TCG card ID |
| `created_at` | timestamptz | Aanmaakdatum |

**Constraints:**
- `unique(user_id, card_id)` - Een kaart kan maar één keer op de wishlist

## Row Level Security (RLS)

Beide tabellen hebben RLS ingeschakeld met de volgende policies:

- **user_collections:** Gebruikers kunnen alleen hun eigen collectie zien en bewerken
- **user_wishlists:** Gebruikers kunnen alleen hun eigen wishlist zien en bewerken

Dit betekent dat:
- Queries automatisch gefilterd worden op `user_id = auth.uid()`
- Gebruikers geen toegang hebben tot data van andere gebruikers
- Geen extra filtering nodig is in de applicatiecode

## Authenticatie

Supabase Auth wordt gebruikt met de volgende providers:

- Email + wachtwoord
- Magic link (passwordless)
- Google OAuth
- GitHub OAuth
- Microsoft OAuth

## Schema Uitvoeren

Het schema staat in `schema.sql`. Om uit te voeren:

1. Ga naar Supabase Dashboard
2. Open SQL Editor
3. Kopieer en plak de inhoud van `schema.sql`
4. Klik op "Run"

## Environment Variables

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...
```

Deze staan in `web/.env` (niet in git).
