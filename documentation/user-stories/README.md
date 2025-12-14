# User Stories - Pokemon Collectie App

**Gegenereerd:** 2025-12-12
**Persona:** Manon de Verzamelaar (Casual Collector)
**Bron:** documentation/functional/functional-specs.md, documentation/architecture.md

---

## Epics Overzicht

| Epic    | Beschrijving           | Stories |
| ------- | ---------------------- | ------- |
| EPIC-07 | Technisch Framework    | 3       |
| EPIC-01 | Sets & Kaarten Browsen | 4       |
| EPIC-02 | Zoeken & Filteren      | 4       |
| EPIC-03 | Collectiebeheer        | 3       |
| EPIC-04 | Custom Sets & Decks    | 2       |
| EPIC-05 | Account & Toegang      | 3       |
| EPIC-06 | Wishlist               | 1       |

**Totaal:** 21 user stories

---

## User Stories op volgorde van implementatie

### Fase 0: Technisch Framework (EPIC-07)

| ID     | Beschrijving                    |
| ------ | ------------------------------- |
| US-001 | Nuxt 3 project initialiseren    |
| US-002 | Pokemon TCG API integratie      |
| US-003 | Pinia state management opzetten |

### Fase 1: Foundation

| ID     | Beschrijving               | Epic    |
| ------ | -------------------------- | ------- |
| US-004 | Overview van sets bekijken | EPIC-01 |
| US-005 | Account aanmaken           | EPIC-05 |
| US-006 | Mobiel toegankelijk        | EPIC-05 |

### Fase 2: Core Browse

| ID     | Beschrijving                                 | Epic    |
| ------ | -------------------------------------------- | ------- |
| US-007 | Overview van kaarten binnen een set bekijken | EPIC-01 |
| US-008 | Zoeken op een set                            | EPIC-02 |
| US-009 | Filteren van sets                            | EPIC-02 |
| US-021 | Globaal zoeken naar kaarten                  | EPIC-02 |

### Fase 3: Core Collectie

| ID     | Beschrijving                             | Epic    |
| ------ | ---------------------------------------- | ------- |
| US-010 | Zoeken naar een kaart                    | EPIC-02 |
| US-011 | Filteren van kaarten                     | EPIC-02 |
| US-012 | Per set zien welke kaarten in bezit zijn | EPIC-03 |
| US-013 | Custom set aanmaken                      | EPIC-04 |
| US-014 | Wishlist-functionaliteit op kaartniveau  | EPIC-06 |

### Fase 4: Enhanced Features

| ID     | Beschrijving                                | Epic    |
| ------ | ------------------------------------------- | ------- |
| US-015 | Completeness percentage per set zien        | EPIC-01 |
| US-016 | Completeness percentage binnen set bekijken | EPIC-01 |
| US-017 | Per set zien welke kaarten ontbreken        | EPIC-03 |
| US-018 | Collectie delen met anderen                 | EPIC-03 |
| US-019 | Zelfgemaakte deck delen met anderen         | EPIC-04 |
| US-020 | Offline toegang                             | EPIC-05 |

---

## Bestanden

- `features/` - User story bestanden
- `dependencies.md` - Afhankelijkheden tussen stories
