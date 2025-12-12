# Dependencies - User Stories

## Overzicht

Dit document toont de afhankelijkheden tussen user stories.

---

## Dependency Map

```
US-001 (Nuxt 3 project setup)
├── US-002 (Pokemon TCG API integratie)
├── US-003 (Pinia state management)
├── US-004 (Overview sets)
│   ├── US-007 (Overview kaarten)
│   │   ├── US-010 (Zoeken kaart)
│   │   ├── US-011 (Filteren kaarten)
│   │   ├── US-012 (Kaarten in bezit)
│   │   │   ├── US-015 (Completeness per set)
│   │   │   ├── US-016 (Completeness binnen set)
│   │   │   ├── US-017 (Kaarten ontbreken)
│   │   │   ├── US-018 (Collectie delen)
│   │   │   └── US-020 (Offline toegang)
│   │   ├── US-013 (Custom set)
│   │   │   └── US-019 (Deck delen)
│   │   └── US-014 (Wishlist)
│   ├── US-008 (Zoeken set)
│   └── US-009 (Filteren sets)
├── US-005 (Account aanmaken)
│   ├── US-012 (Kaarten in bezit)
│   ├── US-013 (Custom set)
│   ├── US-014 (Wishlist)
│   └── US-020 (Offline toegang)
└── US-006 (Mobiel toegankelijk)
```

---

## Implementatie Volgorde

### Fase 0: Technisch Framework

| Story  | Beschrijving                    | Afhankelijk van |
| ------ | ------------------------------- | --------------- |
| US-001 | Nuxt 3 project initialiseren    | -               |
| US-002 | Pokemon TCG API integratie      | US-001          |
| US-003 | Pinia state management opzetten | US-001          |

### Fase 1: Foundation

| Story  | Beschrijving               | Afhankelijk van |
| ------ | -------------------------- | --------------- |
| US-004 | Overview van sets bekijken | US-001, US-002  |
| US-005 | Account aanmaken           | US-001, US-003  |
| US-006 | Mobiel toegankelijk        | US-001          |

### Fase 2: Core Browse

| Story  | Beschrijving            | Afhankelijk van |
| ------ | ----------------------- | --------------- |
| US-007 | Overview kaarten in set | US-004          |
| US-008 | Zoeken op set           | US-004          |
| US-009 | Filteren van sets       | US-004          |

### Fase 3: Core Collectie

| Story  | Beschrijving         | Afhankelijk van |
| ------ | -------------------- | --------------- |
| US-010 | Zoeken naar kaart    | US-007          |
| US-011 | Filteren van kaarten | US-007          |
| US-012 | Kaarten in bezit     | US-005, US-007  |
| US-013 | Custom set aanmaken  | US-005, US-007  |
| US-014 | Wishlist             | US-005, US-007  |

### Fase 4: Enhanced Features

| Story  | Beschrijving            | Afhankelijk van |
| ------ | ----------------------- | --------------- |
| US-015 | Completeness per set    | US-004, US-012  |
| US-016 | Completeness binnen set | US-007, US-012  |
| US-017 | Kaarten ontbreken       | US-012          |
| US-018 | Collectie delen         | US-012          |
| US-019 | Deck delen              | US-013          |
| US-020 | Offline toegang         | US-005, US-012  |
