# US-002: Pokemon TCG API integratie

**Epic:** EPIC-07 - Technisch Framework
**Persona:** Developer
**Bron:** Architecture document: API Integration, External Integrations

---

## User Story

**Als** developer
**Wil ik** de Pokemon TCG API geïntegreerd hebben via Orval
**Zodat** ik type-safe API calls kan maken naar de Pokemon TCG API

---

## Acceptatiecriteria

```gherkin
# AC1: Orval configuratie
Given het project is opgezet
When ik de Orval configuratie bekijk
Then is deze geconfigureerd voor de Pokemon TCG API

# AC2: API client genereren
Given Orval is geconfigureerd
When ik het generatie script uitvoer
Then wordt een type-safe API client gegenereerd

# AC3: Sets ophalen
Given de API client is gegenereerd
When ik sets opvraag via de client
Then krijg ik een lijst van Pokemon sets terug

# AC4: Kaarten ophalen
Given de API client is gegenereerd
When ik kaarten van een set opvraag
Then krijg ik een lijst van kaarten terug
```

---

## Afhankelijkheden

- US-001: Nuxt 3 project initialiseren
