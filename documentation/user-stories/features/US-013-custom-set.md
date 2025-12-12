# US-013: Custom set aanmaken

**Epic:** EPIC-04 - Custom Sets & Decks
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Zelf custom een set aan kunnen maken"

---

## User Story

**Als** verzamelaar
**Wil ik** zelf een custom set kunnen aanmaken
**Zodat** ik kaarten kan groeperen op mijn eigen manier

---

## Acceptatiecriteria

```gherkin
# AC1: Custom set aanmaken
Given ik ben ingelogd
When ik een nieuwe custom set aanmaak
Then wordt de set opgeslagen in mijn account

# AC2: Naam geven aan set
Given ik maak een custom set aan
When ik een naam invoer
Then krijgt de set die naam

# AC3: Kaarten toevoegen aan custom set
Given ik heb een custom set aangemaakt
When ik kaarten toevoeg aan de set
Then worden die kaarten onderdeel van de custom set

# AC4: Custom set bekijken
Given ik heb een custom set met kaarten
When ik de set open
Then zie ik alle kaarten die ik heb toegevoegd
```

---

## Afhankelijkheden

- US-005: Account aanmaken
- US-007: Overview van kaarten binnen een set bekijken
