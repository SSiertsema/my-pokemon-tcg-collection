# US-011: Filteren van kaarten

**Epic:** EPIC-02 - Zoeken & Filteren
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Filteren van kaarten op basis van bijvoorbeeld Naam, Rarity, Type, Subtype (Afhankelijk van mogelijkheden API)"

---

## User Story

**Als** verzamelaar
**Wil ik** kaarten kunnen filteren op basis van Naam, Rarity, Type, Subtype
**Zodat** ik specifieke kaarten kan vinden binnen een grote collectie

---

## Acceptatiecriteria

```gherkin
# AC1: Filteropties beschikbaar
Given ik ben op een kaartenoverzicht
When ik de pagina bekijk
Then zie ik filteropties voor Naam, Rarity, Type, Subtype

# AC2: Filter op rarity
Given ik ben op een kaartenoverzicht
When ik filter op een specifieke rarity
Then zie ik alleen kaarten met die rarity

# AC3: Filter op type
Given ik ben op een kaartenoverzicht
When ik filter op een specifiek type
Then zie ik alleen kaarten van dat type

# AC4: Meerdere filters combineren
Given ik ben op een kaartenoverzicht
When ik meerdere filters toepas
Then zie ik alleen kaarten die aan alle filters voldoen

# AC5: Filters verwijderen
Given ik heb filters toegepast
When ik de filters verwijder
Then zie ik weer alle kaarten
```

---

## Afhankelijkheden

- US-007: Overview van kaarten binnen een set bekijken
