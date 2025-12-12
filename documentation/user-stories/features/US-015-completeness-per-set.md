# US-015: Completeness percentage per set zien

**Epic:** EPIC-01 - Sets & Kaarten Browsen
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "In overzicht van sets kunnen zien welke er compleet zijn. (Wellicht completion percentage)"

---

## User Story

**Als** verzamelaar
**Wil ik** in het overzicht van sets kunnen zien welke sets compleet zijn
**Zodat** ik in één oogopslag kan zien hoe ver ik ben met mijn collectie

---

## Acceptatiecriteria

```gherkin
# AC1: Completeness indicator tonen
Given ik ben op het sets overzicht
When ik de lijst bekijk
Then zie ik per set een indicatie van compleetheid

# AC2: Percentage tonen
Given ik heb kaarten van een set in mijn collectie
When ik het sets overzicht bekijk
Then zie ik het percentage kaarten dat ik bezit van die set

# AC3: Volledige set markeren
Given ik heb alle kaarten van een set
When ik het sets overzicht bekijk
Then is die set duidelijk gemarkeerd als compleet
```

---

## Afhankelijkheden

- US-004: Overview van sets bekijken
- US-012: Per set zien welke kaarten in bezit zijn
