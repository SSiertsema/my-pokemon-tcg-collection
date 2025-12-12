# US-010: Zoeken naar een kaart

**Epic:** EPIC-02 - Zoeken & Filteren
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Zoeken naar een kaart"

---

## User Story

**Als** verzamelaar
**Wil ik** kunnen zoeken naar een kaart
**Zodat** ik snel een specifieke kaart kan vinden

---

## Acceptatiecriteria

```gherkin
# AC1: Zoekfunctie beschikbaar
Given ik ben in de applicatie
When ik de zoekfunctie gebruik
Then kan ik zoeken naar een kaart

# AC2: Zoeken op kaartnaam
Given ik gebruik de zoekfunctie
When ik een kaartnaam invoer
Then zie ik kaarten die matchen met mijn zoekopdracht

# AC3: Geen resultaten
Given ik gebruik de zoekfunctie
When ik zoek op een kaart die niet bestaat
Then zie ik een melding dat er geen resultaten zijn
```

---

## Afhankelijkheden

- US-007: Overview van kaarten binnen een set bekijken
