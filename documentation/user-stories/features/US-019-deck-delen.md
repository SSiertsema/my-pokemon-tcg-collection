# US-019: Zelfgemaakte deck delen met anderen

**Epic:** EPIC-04 - Custom Sets & Decks
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Zelfgemaakte deck kunnen delen met anderen"

---

## User Story

**Als** verzamelaar
**Wil ik** mijn zelfgemaakte deck kunnen delen met anderen
**Zodat** anderen mijn deck kunnen bekijken of kopiëren

---

## Acceptatiecriteria

```gherkin
# AC1: Deel optie voor deck
Given ik ben ingelogd
And ik heb een custom deck aangemaakt
When ik naar mijn deck ga
Then zie ik een optie om het deck te delen

# AC2: Deelbare link voor deck
Given ik wil mijn deck delen
When ik de deel optie gebruik
Then krijg ik een link die ik kan delen

# AC3: Gedeeld deck bekijken
Given iemand heeft een deck link gedeeld
When ik de link open
Then kan ik het deck van die persoon bekijken
```

---

## Afhankelijkheden

- US-013: Custom set aanmaken
