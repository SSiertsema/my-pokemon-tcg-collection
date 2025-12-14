# User Stories - Implementatie Status

**Laatst bijgewerkt:** 2025-12-14 (US-003 toegevoegd)

---

## Legenda

- [x] Voltooid
- [~] Deels geïmplementeerd
- [ ] Nog te doen

---

## Fase 0: Technisch Framework (EPIC-07)

| Status | ID     | Beschrijving                    | Notities                                       |
| ------ | ------ | ------------------------------- | ---------------------------------------------- |
| [x]    | US-001 | Nuxt 3 project initialiseren    | Nuxt 3.11.2, Vue 3.4.19                        |
| [~]    | US-002 | Pokemon TCG API integratie      | Gebruikt lokale data i.p.v. directe API calls  |
| [x]    | US-003 | Pinia state management opzetten | @pinia/nuxt, collection store                  |

---

## Fase 1: Foundation

| Status | ID     | Beschrijving               | Notities                                       |
| ------ | ------ | -------------------------- | ---------------------------------------------- |
| [x]    | US-004 | Overview van sets bekijken | `pages/index.vue` - toont alle sets in grid    |
| [ ]    | US-005 | Account aanmaken           | Niet geïmplementeerd                           |
| [x]    | US-006 | Mobiel toegankelijk        | Responsive CSS aanwezig                        |

---

## Fase 2: Core Browse

| Status | ID     | Beschrijving                                 | Notities                                       |
| ------ | ------ | -------------------------------------------- | ---------------------------------------------- |
| [x]    | US-007 | Overview van kaarten binnen een set bekijken | `pages/sets/[id].vue` - toont kaarten + modal  |
| [ ]    | US-008 | Zoeken op een set                            | Niet geïmplementeerd                           |
| [ ]    | US-009 | Filteren van sets                            | Niet geïmplementeerd                           |

---

## Fase 3: Core Collectie

| Status | ID     | Beschrijving                             | Notities           |
| ------ | ------ | ---------------------------------------- | ------------------ |
| [ ]    | US-010 | Zoeken naar een kaart                    | Niet geïmplementeerd |
| [ ]    | US-011 | Filteren van kaarten                     | Niet geïmplementeerd |
| [ ]    | US-012 | Per set zien welke kaarten in bezit zijn | Niet geïmplementeerd |
| [ ]    | US-013 | Custom set aanmaken                      | Niet geïmplementeerd |
| [ ]    | US-014 | Wishlist-functionaliteit op kaartniveau  | Niet geïmplementeerd |

---

## Fase 4: Enhanced Features

| Status | ID     | Beschrijving                                | Notities           |
| ------ | ------ | ------------------------------------------- | ------------------ |
| [ ]    | US-015 | Completeness percentage per set zien        | Niet geïmplementeerd |
| [ ]    | US-016 | Completeness percentage binnen set bekijken | Niet geïmplementeerd |
| [ ]    | US-017 | Per set zien welke kaarten ontbreken        | Niet geïmplementeerd |
| [ ]    | US-018 | Collectie delen met anderen                 | Niet geïmplementeerd |
| [ ]    | US-019 | Zelfgemaakte deck delen met anderen         | Niet geïmplementeerd |
| [ ]    | US-020 | Offline toegang                             | Niet geïmplementeerd |

---

## Samenvatting

| Fase                     | Voltooid | Deels | Te doen | Totaal |
| ------------------------ | -------- | ----- | ------- | ------ |
| Fase 0: Technisch        | 2        | 1     | 0       | 3      |
| Fase 1: Foundation       | 2        | 0     | 1       | 3      |
| Fase 2: Core Browse      | 1        | 0     | 2       | 3      |
| Fase 3: Core Collectie   | 0        | 0     | 5       | 5      |
| Fase 4: Enhanced         | 0        | 0     | 6       | 6      |
| **Totaal**               | **5**    | **1** | **14**  | **20** |

**Voortgang:** ~28% (5.5 van 20 user stories)

---

## Volgende stappen (aanbevolen)

1. **US-008** - Zoeken op een set
2. **US-009** - Filteren van sets
3. **US-010** - Zoeken naar een kaart
4. **US-011** - Filteren van kaarten
5. **US-012** - Per set zien welke kaarten in bezit zijn (Pinia store klaar)
