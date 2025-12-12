# US-009: Filteren van sets

**Epic:** EPIC-02 - Zoeken & Filteren
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Filteren van sets"

---

## User Story

**Als** verzamelaar
**Wil ik** sets kunnen filteren
**Zodat** ik de lijst kan beperken tot relevante sets

---

## Acceptatiecriteria

```gherkin
# AC1: Filteropties beschikbaar
Given ik ben op het sets overzicht
When ik de pagina bekijk
Then zie ik filteropties

# AC2: Filter toepassen
Given ik ben op het sets overzicht
When ik een filter selecteer
Then zie ik alleen sets die aan het filter voldoen

# AC3: Filter verwijderen
Given ik heb een filter toegepast
When ik het filter verwijder
Then zie ik weer alle sets
```

---

## Afhankelijkheden

- US-004: Overview van sets bekijken
