# US-004: Overview van sets bekijken

**Epic:** EPIC-01 - Sets & Kaarten Browsen
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Overview van sets"

---

## User Story

**Als** verzamelaar
**Wil ik** een overview van alle beschikbare sets kunnen bekijken
**Zodat** ik kan zien welke sets er bestaan en kan navigeren naar een specifieke set

---

## Acceptatiecriteria

```gherkin
# AC1: Sets overview tonen
Given ik ben op de hoofdpagina
When ik naar het sets overzicht navigeer
Then zie ik een lijst van alle beschikbare Pokemon sets

# AC2: Set informatie tonen
Given ik ben op het sets overzicht
When ik de lijst bekijk
Then zie ik per set de naam en relevante informatie

# AC3: Naar set navigeren
Given ik ben op het sets overzicht
When ik op een set klik
Then navigeer ik naar de detailpagina van die set
```

---

## Afhankelijkheden

- US-001: Nuxt 3 project initialiseren
- US-002: Pokemon TCG API integratie
