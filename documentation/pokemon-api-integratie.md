# Pokemon TCG API Integratie

## Onderzoeksresultaten

### Beschikbare SDK's

Er zijn meerdere opties voor integratie met de Pokemon TCG API:

| Package | Taal | TypeScript Support | Status |
|---------|------|-------------------|--------|
| `pokemon-tcg-sdk-typescript` | TypeScript | Native | **Aanbevolen** |
| `pokemontcgsdk` | JavaScript | Geen | Laatst bijgewerkt 4 jaar geleden |
| Orval (OpenAPI) | TypeScript | Gegenereerd | Niet nodig |

### Conclusie: Orval is NIET nodig

De Pokemon TCG API biedt een **officiële TypeScript SDK** (`pokemon-tcg-sdk-typescript`) die:
- Volledige TypeScript types bevat
- Actief onderhouden wordt
- Direct bruikbaar is zonder code-generatie

Orval is bedoeld voor het genereren van API clients uit OpenAPI specificaties. Dit is overbodig omdat de officiële SDK al type-safe is.

## Aanbevolen Aanpak: TypeScript SDK

### Installatie

```bash
npm install --save pokemon-tcg-sdk-typescript
```

### API Key Configuratie

1. Registreer op [Pokemon TCG Developer Portal](https://dev.pokemontcg.io)
2. Maak een `.env` bestand aan:
   ```
   POKEMONTCG_API_KEY=jouw-api-key
   ```

**Rate Limits:**
| Situatie | Dagelijks | Per minuut |
|----------|-----------|------------|
| Zonder API key | 1.000 requests | 30 requests |
| Met API key | 20.000 requests | Onbeperkt |

### Basis Gebruik

```typescript
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

// Enkele kaart ophalen op ID
const card = await PokemonTCG.Card.find('base1-4')
console.log(card.name) // "Charizard"

// Zoeken met filters
const params: PokemonTCG.IQuery[] = [
  { name: 'name', value: 'Pikachu' }
]
const cards = await PokemonTCG.Card.where(params)

// Alle kaarten van een type ophalen
const fireCards = await PokemonTCG.Card.where([
  { name: 'types', value: 'Fire' }
])

// Sets ophalen
const allSets = await PokemonTCG.Set.all()
const baseSet = await PokemonTCG.Set.find('base1')
```

## Beschikbare TypeScript Interfaces

### Card Interface

```typescript
interface Card {
  id: string
  name: string
  supertype: string           // "Pokémon", "Trainer", "Energy"
  subtypes: string[]          // ["Basic"], ["Stage 1"], ["EX"]
  hp?: string
  types?: string[]            // ["Fire"], ["Water", "Electric"]
  evolvesFrom?: string
  evolvesTo?: string[]
  abilities?: Ability[]
  attacks?: Attack[]
  weaknesses?: Weakness[]
  resistances?: Resistance[]
  retreatCost?: string[]
  convertedRetreatCost?: number
  set: Set
  number: string
  artist?: string
  rarity?: string
  flavorText?: string
  nationalPokedexNumbers?: number[]
  legalities: Legalities
  images: CardImages
  tcgplayer?: TCGPlayer       // Prijzen in USD
  cardmarket?: Cardmarket     // Prijzen in EUR
}
```

### Set Interface

```typescript
interface Set {
  id: string
  name: string
  series: string
  printedTotal: number
  total: number
  legalities: Legalities
  ptcgoCode?: string
  releaseDate: string
  updatedAt: string
  images: SetImages
}
```

### Attack Interface

```typescript
interface Attack {
  cost: string[]              // ["Fire", "Fire", "Colorless"]
  name: string
  text: string
  damage: string              // "100"
  convertedEnergyCost: number
}
```

## Beschikbare API Methodes

### Cards

| Methode | Beschrijving | Return Type |
|---------|--------------|-------------|
| `Card.find(id)` | Enkele kaart op ID | `Promise<Card>` |
| `Card.where(params)` | Kaarten met filters | `Promise<Card[]>` |
| `Card.all()` | Alle kaarten (met paginatie) | `Promise<Card[]>` |

### Sets

| Methode | Beschrijving | Return Type |
|---------|--------------|-------------|
| `Set.find(id)` | Enkele set op ID | `Promise<Set>` |
| `Set.where(params)` | Sets met filters | `Promise<Set[]>` |
| `Set.all()` | Alle sets | `Promise<Set[]>` |

### Metadata

| Methode | Beschrijving | Return Type |
|---------|--------------|-------------|
| `Meta.allTypes()` | Alle kaart types | `Promise<string[]>` |
| `Meta.allSubtypes()` | Alle subtypes | `Promise<string[]>` |
| `Meta.allSupertypes()` | Alle supertypes | `Promise<string[]>` |

## Query Syntax

De SDK ondersteunt geavanceerde queries:

```typescript
// Exacte match
{ name: 'name', value: 'Charizard' }

// Wildcard zoeken
{ name: 'name', value: 'Char*' }

// Meerdere waarden (OR)
{ name: 'types', value: 'fire,water' }

// Numerieke vergelijking
{ name: 'hp', value: '[100 TO *]' }  // HP >= 100

// Gecombineerde query
const params: PokemonTCG.IQuery[] = [
  { name: 'name', value: 'Charizard' },
  { name: 'set.id', value: 'base1' }
]
```

## Integratie met Vue 3 / Nuxt 3

### Composable Voorbeeld

```typescript
// composables/usePokemonCards.ts
import { ref } from 'vue'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

export function usePokemonCards() {
  const cards = ref<PokemonTCG.Card[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function searchCards(name: string) {
    loading.value = true
    error.value = null

    try {
      const params: PokemonTCG.IQuery[] = [
        { name: 'name', value: `${name}*` }
      ]
      cards.value = await PokemonTCG.Card.where(params)
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return { cards, loading, error, searchCards }
}
```

### Nuxt Plugin Voorbeeld

```typescript
// plugins/pokemon-tcg.ts
export default defineNuxtPlugin(() => {
  // API key wordt automatisch gelezen uit POKEMONTCG_API_KEY
  // environment variable door de SDK
})
```

## Bronnen

- [Pokemon TCG API Documentatie](https://docs.pokemontcg.io)
- [TypeScript SDK GitHub](https://github.com/PokemonTCG/pokemon-tcg-sdk-typescript)
- [Developer Portal (API Key)](https://dev.pokemontcg.io)
