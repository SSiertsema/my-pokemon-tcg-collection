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

### API Integration

**Purpose:** Communicate with the Pokemon TCG API for card data.

**Integration approach:**

- Use the official [pokemon-tcg-sdk-typescript](https://github.com/PokemonTCG/pokemon-tcg-sdk-typescript) SDK
- SDK provides native TypeScript types for Cards, Sets, Attacks, Abilities, etc.
- No code generation needed - types are included in the package

**API Details:**

- API: [Pokemon TCG API](https://docs.pokemontcg.io)
- Rate limits: 1.000/dag zonder key, 20.000/dag met API key
- API key verkrijgbaar via [Developer Portal](https://dev.pokemontcg.io)

Zie [pokemon-api-integratie.md](./pokemon-api-integratie.md) voor gedetailleerde informatie.

### Data Layer (Planned)

**Purpose:** Store and manage user collection data.

**Considerations:**

- Local storage for simple persistence
- Optional backend/database for multi-device sync

## Data Flow

```
[User Action] --> [Vue Component] --> [Composable/Store]
                                            |
                                            v
                                    [Pokemon TCG SDK]
                                            |
                                            v
                                    [Pokemon TCG API]
                                            |
                                            v
                                    [Typed Response]
                                            |
                                            v
                                    [Store Update]
                                            |
                                            v
                                    [UI Re-render]
```

## Directory Structure (Planned)

```
pokemon-collectie-app/
├── .devcontainer/     # Development container configuration
├── .claude/           # Claude Code plugins and commands
├── documentation/     # Project documentation
├── pages/             # Nuxt page components
├── components/        # Reusable Vue components
├── composables/       # Vue composition utilities (incl. Pokemon API wrappers)
├── stores/            # Pinia state stores
├── types/             # TypeScript type definitions (extends SDK types)
├── assets/            # Static assets (images, styles)
├── public/            # Public static files
└── tests/             # Test files
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

### Decision 2: Official Pokemon TCG TypeScript SDK

**Context:** Need type-safe communication with the Pokemon TCG API.

**Decision:** Use the official `pokemon-tcg-sdk-typescript` package instead of generating clients with Orval.

**Rationale:**

- De Pokemon TCG API biedt een officiële TypeScript SDK
- SDK bevat native TypeScript interfaces (Card, Set, Attack, Ability, etc.)
- Geen code-generatie of OpenAPI specs nodig
- Actief onderhouden door de API maintainers

**Consequences:**

- Direct type-safe zonder build stappen
- SDK handelt paginatie automatisch af
- Minder configuratie en onderhoud
- Types blijven in sync met API updates via npm package updates

### Decision 3: Devcontainer Development Environment

**Context:** Need consistent development environment across team members.

**Decision:** Use VS Code devcontainers with Node.js 22.

**Consequences:**

- Consistent environment for all developers
- Pre-configured VS Code extensions
- Easier onboarding for new contributors

## External Integrations

| Integration                                                                            | Purpose              | Configuration                            |
| -------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------- |
| [Pokemon TCG API](https://docs.pokemontcg.io)                                          | Card data and images | `POKEMONTCG_API_KEY` in `.env`           |
| [pokemon-tcg-sdk-typescript](https://github.com/PokemonTCG/pokemon-tcg-sdk-typescript) | Type-safe API client | `npm install pokemon-tcg-sdk-typescript` |

## Future Considerations

- **Authentication:** If user accounts are needed
- **Backend API:** For storing collections server-side
- **Offline support:** PWA capabilities for offline access
- **Import/Export:** Collection data portability
