# US-021: Globaal zoeken naar kaarten

**Epic:** EPIC-02 - Zoeken & Filteren
**Feature:** Globale kaartzoekfunctie
**Source:** documentation/functional/functional-specs.md

---

## User Story

> **As a** verzamelaar,
> **I want** kunnen zoeken naar een kaart over alle sets heen,
> **So that** ik snel een specifieke kaart kan vinden zonder eerst een set te moeten selecteren.

---

## Description

Manon is op een ruildag en iemand biedt haar een Charizard aan. Ze wil snel kunnen checken of ze deze kaart al heeft, maar ze weet niet precies uit welke set de kaart komt. Met de globale zoekfunctie kan ze simpelweg "Charizard" intypen en alle Charizard-kaarten uit alle sets zien.

Deze functionaliteit verschilt van US-010 (zoeken binnen een set) doordat het een dedicated zoekpagina biedt die alle kaarten doorzoekt, onafhankelijk van sets.

---

## Acceptance Criteria

### AC1: Zoekpagina beschikbaar

```gherkin
Given ik ben in de applicatie
When ik naar de zoekpagina navigeer
Then zie ik een zoekbalk voor kaarten
And zie ik instructies of placeholder tekst die uitlegt wat ik kan zoeken
```

### AC2: Zoeken op kaartnaam

```gherkin
Given ik ben op de zoekpagina
When ik "Pikachu" invoer in de zoekbalk
Then zie ik alle kaarten met "Pikachu" in de naam
And zie ik bij elke kaart uit welke set deze komt
And zijn de resultaten gesorteerd op relevantie of set-datum
```

### AC3: Zoekresultaten tonen kaartinformatie

```gherkin
Given ik heb gezocht op een kaartnaam
When de resultaten worden getoond
Then zie ik per kaart: afbeelding, naam, set naam, en nummer
And kan ik op een kaart klikken voor meer details
```

### AC4: Minimale zoeklengte

```gherkin
Given ik ben op de zoekpagina
When ik minder dan 2 karakters invoer
Then wordt er nog niet gezocht
And zie ik een melding dat ik minimaal 2 karakters moet invoeren
```

### AC5: Geen resultaten gevonden

```gherkin
Given ik ben op de zoekpagina
When ik zoek op "xyz123nonexistent"
Then zie ik een vriendelijke melding dat er geen kaarten gevonden zijn
And krijg ik suggesties om mijn zoekopdracht aan te passen
```

### AC6: Filteren op set/serie

```gherkin
Given ik heb gezocht op "Charizard" met 50+ resultaten
When ik filter op een specifieke serie (bijv. "Scarlet & Violet")
Then zie ik alleen Charizard kaarten uit die serie
And zie ik hoeveel resultaten er nog over zijn
```

### AC7: Filteren op type

```gherkin
Given ik heb zoekresultaten
When ik filter op type (bijv. "Fire", "Water", "Trainer")
Then zie ik alleen kaarten van dat type
And kan ik meerdere types selecteren
```

### AC8: Filteren op rarity

```gherkin
Given ik heb zoekresultaten
When ik filter op rarity (bijv. "Rare Holo", "Common", "Ultra Rare")
Then zie ik alleen kaarten met die zeldzaamheid
```

### AC9: Filters combineren

```gherkin
Given ik heb gezocht op "Pikachu"
When ik filter op type "Lightning" EN rarity "Rare Holo"
Then zie ik alleen holografische Lightning-type Pikachu kaarten
And kan ik filters eenvoudig resetten
```

### AC10: Filter opties tonen beschikbare waarden

```gherkin
Given ik heb zoekresultaten
When ik de filter opties bekijk
Then zie ik alleen filter waarden die voorkomen in de huidige resultaten
And zie ik bij elke filter optie hoeveel kaarten er matchen
```

### AC11: Zoekresultaten limiet met paginering

```gherkin
Given er zijn meer dan 50 kaarten die matchen met mijn zoekopdracht
When de resultaten worden getoond
Then zie ik de eerste 50 resultaten
And kan ik naar volgende pagina's navigeren of meer laden
```

### AC12: Direct naar kaartdetail navigeren

```gherkin
Given ik zie zoekresultaten
When ik op een kaart klik
Then navigeer ik naar de kaartdetail pagina
Or opent er een modal met kaartdetails
And kan ik van daaruit naar de set navigeren waar de kaart bij hoort
```

---

## Dependencies

| Story ID | Title | Type | Reason |
|----------|-------|------|--------|
| US-001 | Nuxt 3 project setup | Hard | Basis framework moet staan |
| US-002 | Data integratie | Hard | Kaartdata moet beschikbaar zijn |
| US-007 | Overview kaarten in set | Soft | CardModal component kan hergebruikt worden |

**Blocked by:** None (US-001 en US-002 zijn af)
**Blocks:** None

---

## INVEST Checklist

| Criterion | Status | Notes |
|-----------|--------|-------|
| **I**ndependent | Yes | Kan los van andere features ontwikkeld worden |
| **N**egotiable | Yes | Exacte zoeklogica en UI kunnen nog besproken worden |
| **V**aluable | Yes | Core use case voor Manon: snel kaart checken op ruildag |
| **E**stimable | Yes | Duidelijke scope: zoekpagina met filters |
| **S**mall | Medium | Zoeken + filtering is substantieel, maar binnen 1 sprint |
| **T**estable | Yes | Alle 12 AC's zijn verifieerbaar |

---

## Technical Notes

### Data Aanpak

Aangezien alle kaartdata lokaal opgeslagen is in `/data/cards/*.json`, zijn er twee mogelijke implementaties:

1. **Server-side zoeken**: Endpoint maken die door alle JSON bestanden zoekt
2. **Client-side index**: Bij opstarten een zoekindex laden met kaartnamen en IDs

### Suggestie: Zoekindex met filterbare velden

Maak een `cards-index.json` met zoekbare en filterbare velden:
```json
[
  {
    "id": "base1-4",
    "name": "Charizard",
    "setId": "base1",
    "setName": "Base",
    "series": "Base",
    "types": ["Fire"],
    "supertype": "Pokémon",
    "rarity": "Rare Holo",
    "image": "https://images.pokemontcg.io/base1/4.png"
  }
]
```

Dit maakt client-side zoeken én filteren snel zonder alle kaartdata te laden.

### Filter implementatie

Filters worden toegepast op zoekresultaten:
1. Eerst zoeken op naam (tekst match)
2. Dan filters toepassen (AND logica tussen categorieën)
3. Dynamisch filter opties berekenen op basis van huidige resultaten

---

## Traceability

**Requirement IDs:** REQ-SEARCH-001
**Specification Section:** "Zoeken naar een kaart"
