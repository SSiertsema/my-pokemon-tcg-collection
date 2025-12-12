# US-005: Account aanmaken

**Epic:** EPIC-05 - Account & Toegang
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Account aangemaakt worden om persoonlijke progress te tracken"

---

## User Story

**Als** verzamelaar
**Wil ik** een account kunnen aanmaken
**Zodat** mijn persoonlijke progress wordt opgeslagen

---

## Acceptatiecriteria

```gherkin
# AC1: Registratie mogelijk
Given ik ben een nieuwe gebruiker
When ik naar de registratiepagina ga
Then kan ik een account aanmaken

# AC2: Account aanmaken
Given ik ben op de registratiepagina
When ik mijn gegevens invoer en bevestig
Then wordt mijn account aangemaakt

# AC3: Inloggen
Given ik heb een account
When ik mijn inloggegevens invoer
Then ben ik ingelogd

# AC4: Progress opslaan
Given ik ben ingelogd
When ik kaarten toevoeg aan mijn collectie
Then wordt dit opgeslagen bij mijn account
```

---

## Afhankelijkheden

- US-001: Nuxt 3 project initialiseren
- US-003: Pinia state management opzetten
