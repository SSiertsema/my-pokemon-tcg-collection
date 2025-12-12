# US-007: Overview van kaarten binnen een set bekijken

**Epic:** EPIC-01 - Sets & Kaarten Browsen
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Overview van kaarten binnen een set"

---

## User Story

**Als** verzamelaar
**Wil ik** een overview van alle kaarten binnen een set kunnen bekijken
**Zodat** ik kan zien welke kaarten er in een set zitten

---

## Acceptatiecriteria

```gherkin
# AC1: Kaarten van set tonen
Given ik ben op de detailpagina van een set
When de pagina laadt
Then zie ik alle kaarten die tot deze set behoren

# AC2: Kaart informatie tonen
Given ik ben op de detailpagina van een set
When ik de kaarten bekijk
Then zie ik per kaart de afbeelding en basisinformatie

# AC3: Naar kaart navigeren
Given ik ben op de detailpagina van een set
When ik op een kaart klik
Then zie ik de details van die specifieke kaart
```

---

## Afhankelijkheden

- US-004: Overview van sets bekijken
