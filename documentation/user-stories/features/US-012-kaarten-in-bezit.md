# US-012: Per set zien welke kaarten in bezit zijn

**Epic:** EPIC-03 - Collectiebeheer
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Per set in kunnen zien welke kaarten er in bezit zijn"

---

## User Story

**Als** verzamelaar
**Wil ik** per set kunnen zien welke kaarten ik in bezit heb
**Zodat** ik weet welke kaarten ik al heb

---

## Acceptatiecriteria

```gherkin
# AC1: Bezit indicator
Given ik ben ingelogd
And ik ben op de detailpagina van een set
When ik de kaarten bekijk
Then zie ik welke kaarten ik in bezit heb

# AC2: Kaart als bezit markeren
Given ik ben ingelogd
And ik ben op de detailpagina van een set
When ik een kaart markeer als in bezit
Then wordt die kaart opgeslagen in mijn collectie

# AC3: Bezit verwijderen
Given ik heb een kaart gemarkeerd als in bezit
When ik de markering verwijder
Then is de kaart niet meer in mijn collectie
```

---

## Afhankelijkheden

- US-005: Account aanmaken
- US-007: Overview van kaarten binnen een set bekijken
