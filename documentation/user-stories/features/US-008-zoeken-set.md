# US-008: Zoeken op een set

**Epic:** EPIC-02 - Zoeken & Filteren
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Zoeken op een Set"

---

## User Story

**Als** verzamelaar
**Wil ik** kunnen zoeken op een set
**Zodat** ik snel een specifieke set kan vinden

---

## Acceptatiecriteria

```gherkin
# AC1: Zoekfunctie beschikbaar
Given ik ben op het sets overzicht
When ik de pagina bekijk
Then zie ik een zoekveld

# AC2: Zoeken op naam
Given ik ben op het sets overzicht
When ik een setnaam invoer in het zoekveld
Then zie ik alleen sets die matchen met mijn zoekopdracht

# AC3: Geen resultaten
Given ik ben op het sets overzicht
When ik zoek op een set die niet bestaat
Then zie ik een melding dat er geen resultaten zijn
```

---

## Afhankelijkheden

- US-004: Overview van sets bekijken
