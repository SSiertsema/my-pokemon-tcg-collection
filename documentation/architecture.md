# Architecture

## Overview

Pokemon-collectie-app is a template application for managing Trading Card Game (TCG) collections, specifically designed for Pokemon TCG. The application will allow users to catalog, track, and manage their Pokemon card collections.

## Tech Stack

| Category        | Technology                                                                             |
| --------------- | -------------------------------------------------------------------------------------- |
| Language        | TypeScript                                                                             |
| Framework       | Vue 3 / Nuxt 3                                                                         |
| Runtime         | Node.js 22                                                                             |
| API Client      | [pokemon-tcg-sdk-typescript](https://github.com/PokemonTCG/pokemon-tcg-sdk-typescript) |
| Package Manager | npm                                                                                    |

## Planned System Components

### Frontend (Nuxt 3)

**Purpose:** Provide the user interface for managing Pokemon card collections.

**Planned features:**

- Card browsing and search
- Collection management (add, remove, update cards)
- Card details view with images and stats
- Collection statistics and insights

**Key directories (planned):**

- `pages/` - Nuxt page components
- `components/` - Reusable Vue components
- `composables/` - Vue composition API utilities
- `stores/` - State management (Pinia)

### Data Layer: Lokale JSON Bestanden

**Purpose:** Provide fast, offline-capable access to Pokemon card data.

**Aanpak:**

De applicatie gebruikt lokaal opgeslagen JSON bestanden in plaats van directe API calls:

```
data/
├── sets.json           # Index van alle sets
├── sets/{id}.json      # Set details per set
└── cards/{id}.json     # Individuele kaart data
```

**Voordelen:**
- Snelle laadtijden (geen netwerk latency)
- Werkt offline
- Geen rate limiting
- Voorspelbare performance

**Server API's:**

| Route | Beschrijving |
|-------|--------------|
| `/api/local/sets` | Sets index |
| `/api/local/sets/:id` | Set details |
| `/api/local/cards/:id` | Enkele kaart |
| `/api/local/cards/batch` | Batch kaarten ophalen |

Zie [pokemon-api-integratie.md](./pokemon-api-integratie.md) voor gedetailleerde informatie.

### User Collection Data (Planned)

**Purpose:** Store and manage user collection data.

**Considerations:**

- Local storage for simple persistence
- Optional backend/database for multi-device sync

## Data Flow

```
[User Action] --> [Vue Component] --> [useLocalData()]
                                            |
                                            v
                                    [Nuxt Server API]
                                    (/api/local/*)
                                            |
                                            v
                                    [JSON Bestanden]
                                    (data/sets/, data/cards/)
                                            |
                                            v
                                    [Typed Response]
                                            |
                                            v
                                    [UI Re-render]
```

## Directory Structure

```
pokemon-collectie-app/
├── .devcontainer/        # Development container configuration
├── .claude/              # Claude Code plugins and commands
├── documentation/        # Project documentation
├── data/                 # Lokale Pokemon data
│   ├── sets.json         # Sets index
│   ├── sets/             # Set details (per set)
│   └── cards/            # Kaart data (per kaart)
├── web/                  # Nuxt applicatie
│   ├── app/
│   │   ├── pages/        # Nuxt page components
│   │   ├── components/   # Reusable Vue components
│   │   ├── composables/  # Vue composition utilities
│   │   ├── server/       # Nuxt server API routes
│   │   │   └── api/
│   │   │       └── local/    # Lokale data endpoints
│   │   └── types/        # TypeScript type definitions
│   └── nuxt.config.ts    # Nuxt configuratie
└── scripts/              # Utility scripts
```

## Key Design Decisions

### Decision 1: Vue 3 / Nuxt 3 Framework

**Context:** Need a modern, performant frontend framework with good developer experience.

**Decision:** Use Nuxt 3 with Vue 3 Composition API.

**Consequences:**

- Excellent TypeScript support
- File-based routing simplifies navigation
- Built-in SSR/SSG capabilities for performance
- Large ecosystem of plugins and modules

### Decision 2: Lokale Data in plaats van API Calls

**Context:** Oorspronkelijk plan was om de Pokemon TCG API direct te gebruiken voor alle data.

**Decision:** Data lokaal opslaan als JSON bestanden en serveren via Nuxt server routes.

**Rationale:**

- Pokemon TCG API heeft rate limits (1.000/dag zonder key)
- Card data verandert niet frequent
- Betere user experience door snelle laadtijden
- Offline toegang mogelijk

**Consequences:**

- Snellere response times (geen externe API latency)
- Geen afhankelijkheid van externe service voor runtime
- Data moet periodiek gesynchroniseerd worden voor nieuwe sets
- Meer disk space nodig voor lokale opslag

### Decision 3: Devcontainer Development Environment

**Context:** Need consistent development environment across team members.

**Decision:** Use VS Code devcontainers with Node.js 22.

**Consequences:**

- Consistent environment for all developers
- Pre-configured VS Code extensions
- Easier onboarding for new contributors

## External Integrations

| Integration | Purpose | Status |
|-------------|---------|--------|
| [Pokemon TCG API](https://docs.pokemontcg.io) | Bron van card data | Data lokaal opgeslagen |
| [images.pokemontcg.io](https://images.pokemontcg.io) | Card en set afbeeldingen | Actief (CDN) |

## Future Considerations

- **Authentication:** If user accounts are needed
- **Backend API:** For storing collections server-side
- **Data sync:** Scripts voor nieuwe sets importeren van Pokemon TCG API
- **Import/Export:** Collection data portability
