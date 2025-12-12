# US-014: Wishlist-functionaliteit op kaartniveau

**Epic:** EPIC-06 - Wishlist
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Wishlist-functionaliteit op kaartniveau"

---

## User Story

**Als** verzamelaar
**Wil ik** kaarten kunnen toevoegen aan een wishlist
**Zodat** ik kan bijhouden welke kaarten ik graag wil hebben

---

## Acceptatiecriteria

```gherkin
# AC1: Kaart aan wishlist toevoegen
Given ik ben ingelogd
And ik bekijk een kaart
When ik de kaart toevoeg aan mijn wishlist
Then wordt de kaart opgeslagen in mijn wishlist

# AC2: Wishlist bekijken
Given ik heb kaarten op mijn wishlist
When ik naar mijn wishlist navigeer
Then zie ik alle kaarten die ik heb toegevoegd

# AC3: Kaart van wishlist verwijderen
Given ik heb een kaart op mijn wishlist
When ik de kaart verwijder van mijn wishlist
Then staat de kaart niet meer op mijn wishlist

# AC4: Wishlist indicator bij kaart
Given een kaart staat op mijn wishlist
When ik die kaart bekijk in een overzicht
Then zie ik een indicatie dat de kaart op mijn wishlist staat
```

---

## Afhankelijkheden

- US-005: Account aanmaken
- US-007: Overview van kaarten binnen een set bekijken
