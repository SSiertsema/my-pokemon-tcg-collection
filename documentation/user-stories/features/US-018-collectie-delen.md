# US-018: Collectie delen met anderen

**Epic:** EPIC-03 - Collectiebeheer
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Ik wil mijn collectie kunnen delen met anderen"

---

## User Story

**Als** verzamelaar
**Wil ik** mijn collectie kunnen delen met anderen
**Zodat** ik kan laten zien wat ik heb of kan ruilen

---

## Acceptatiecriteria

```gherkin
# AC1: Deel optie beschikbaar
Given ik ben ingelogd
And ik heb kaarten in mijn collectie
When ik naar mijn collectie ga
Then zie ik een optie om mijn collectie te delen

# AC2: Deelbare link genereren
Given ik wil mijn collectie delen
When ik de deel optie gebruik
Then krijg ik een link die ik kan delen

# AC3: Gedeelde collectie bekijken
Given iemand heeft een collectie link gedeeld
When ik de link open
Then kan ik de collectie van die persoon bekijken
```

---

## Afhankelijkheden

- US-012: Per set zien welke kaarten in bezit zijn
