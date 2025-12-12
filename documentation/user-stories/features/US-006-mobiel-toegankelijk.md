# US-006: Mobiel toegankelijk

**Epic:** EPIC-05 - Account & Toegang
**Persona:** Verzamelaar
**Bron:** Functionele specificatie: "Mobiel toegankelijk"

---

## User Story

**Als** verzamelaar
**Wil ik** de app kunnen gebruiken op mijn mobiele telefoon
**Zodat** ik op ruildagen snel kan checken welke kaarten ik heb

---

## Acceptatiecriteria

```gherkin
# AC1: Responsive design
Given ik open de app op mijn mobiele telefoon
When de pagina laadt
Then past de layout zich aan aan mijn schermformaat

# AC2: Touch-vriendelijk
Given ik gebruik de app op mijn telefoon
When ik interactie heb met de app
Then werken alle functies goed met touch

# AC3: Leesbare tekst
Given ik bekijk de app op mijn telefoon
When ik tekst lees
Then is de tekst leesbaar zonder te hoeven zoomen
```

---

## Afhankelijkheden

- US-001: Nuxt 3 project initialiseren
