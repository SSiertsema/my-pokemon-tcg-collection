# US-016: Completeness percentage binnen set bekijken

**Epic:** EPIC-01 - Sets & Kaarten Browsen
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Binnen een set ook completeness percentage in kunnen zien"

---

## User Story

**Als** verzamelaar
**Wil ik** binnen een set het completeness percentage kunnen zien
**Zodat** ik weet hoeveel kaarten ik nog nodig heb om de set compleet te maken

---

## Acceptatiecriteria

```gherkin
# AC1: Percentage in set detail
Given ik ben op de detailpagina van een set
When de pagina laadt
Then zie ik het percentage kaarten dat ik bezit

# AC2: Aantal kaarten tonen
Given ik ben op de detailpagina van een set
When ik het completeness overzicht bekijk
Then zie ik hoeveel kaarten ik heb van het totaal
```

---

## Afhankelijkheden

- US-007: Overview van kaarten binnen een set bekijken
- US-012: Per set zien welke kaarten in bezit zijn
