# US-020: Offline toegang

**Epic:** EPIC-05 - Account & Toegang
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Offline toegang"

---

## User Story

**Als** verzamelaar
**Wil ik** offline toegang hebben tot mijn collectie
**Zodat** ik ook zonder internetverbinding mijn collectie kan bekijken

---

## Acceptatiecriteria

```gherkin
# AC1: Collectie offline beschikbaar
Given ik ben ingelogd en heb eerder mijn collectie bekeken
When ik geen internetverbinding heb
Then kan ik nog steeds mijn collectie bekijken

# AC2: Offline indicator
Given ik ben offline
When ik de app gebruik
Then zie ik een indicatie dat ik offline ben

# AC3: Synchronisatie na online
Given ik heb offline wijzigingen gemaakt
When ik weer online ben
Then worden mijn wijzigingen gesynchroniseerd
```

---

## Afhankelijkheden

- US-005: Account aanmaken
- US-012: Per set zien welke kaarten in bezit zijn
