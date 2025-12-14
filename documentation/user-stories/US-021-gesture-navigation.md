# US-021: Kaart navigatie via gestures

## User Story

**Als** een mobiele gebruiker
**Wil ik** door kaarten kunnen navigeren met swipe gestures
**Zodat** ik snel en intuïtief door kaarten kan bladeren zonder knoppen te hoeven gebruiken

---

## Acceptatiecriteria

- [ ] **AC1**: In de CardModal kan de gebruiker naar links swipen om naar de volgende kaart te gaan
- [ ] **AC2**: In de CardModal kan de gebruiker naar rechts swipen om naar de vorige kaart te gaan
- [ ] **AC3**: Er is visuele feedback tijdens het swipen (kaart beweegt mee met de vinger)
- [ ] **AC4**: Bij een incomplete swipe (< 30% van schermbreedte) keert de kaart terug naar originele positie
- [ ] **AC5**: Gesture navigatie werkt naast de bestaande pijltjestoetsen en knoppen
- [ ] **AC6**: Swipe is alleen actief op touch devices (geen conflict met mouse drag)

---

## Technische notities

### Implementatie opties

1. **VueUse `useSwipe`** (aanbevolen)
   ```bash
   npm install @vueuse/core
   ```
   ```typescript
   import { useSwipe } from '@vueuse/core'

   const { direction, isSwiping } = useSwipe(cardRef)
   ```

2. **Hammer.js** - Volledige gesture library
   ```bash
   npm install hammerjs @types/hammerjs
   ```

3. **Native Touch Events** - Handmatig implementeren
   ```typescript
   @touchstart="onTouchStart"
   @touchmove="onTouchMove"
   @touchend="onTouchEnd"
   ```

### Betreffende bestanden

| Bestand | Wijziging |
|---------|-----------|
| `app/components/CardModal.vue` | Swipe gesture handlers toevoegen |
| `package.json` | Eventueel @vueuse/core dependency |

### UX overwegingen

- Swipe threshold: minimaal 50px of 30% van container breedte
- Animatie duur: 200-300ms voor smooth transition
- Haptic feedback op mobiel (indien beschikbaar)
- Disable swipe wanneer er geen vorige/volgende kaart is

---

## Prioriteit

**Medium** - Verbetert mobiele UX aanzienlijk, maar huidige navigatie werkt ook

---

## Gerelateerde stories

- US-006: Mobiel toegankelijk
- US-007: Overview van kaarten binnen een set bekijken

---

## Definition of Done

- [ ] Swipe left navigeert naar volgende kaart
- [ ] Swipe right navigeert naar vorige kaart
- [ ] Visuele feedback tijdens swipe actie
- [ ] Werkt op iOS Safari en Android Chrome
- [ ] Geen regressie in desktop navigatie (pijltjestoetsen)
- [ ] TypeScript types correct
