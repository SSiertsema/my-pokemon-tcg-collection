# US-017: Per set zien welke kaarten ontbreken

**Epic:** EPIC-03 - Collectiebeheer
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Per set in kunnen zien welke kaarten er ontbreken in eigen collectie"

---

## User Story

**Als** verzamelaar
**Wil ik** per set kunnen zien welke kaarten ik nog mis
**Zodat** ik weet welke kaarten ik nog nodig heb om de set compleet te maken

---

## Acceptatiecriteria

```gherkin
# AC1: Ontbrekende kaarten tonen
Given ik ben ingelogd
And ik ben op de detailpagina van een set
When ik kies om ontbrekende kaarten te bekijken
Then zie ik alleen de kaarten die ik nog niet bezit

# AC2: Ontbrekende kaarten indicator
Given ik ben op de detailpagina van een set
When ik de kaarten bekijk
Then kan ik onderscheid maken tussen kaarten die ik heb en kaarten die ik mis
```

---

## Afhankelijkheden

- US-012: Per set zien welke kaarten in bezit zijn
