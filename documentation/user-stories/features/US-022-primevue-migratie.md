# US-022: Migratie naar PrimeVue Design System

**Epic:** EPIC-07 - Technisch Framework
**Feature:** Design System Implementatie
**Source:** Gebruikersverzoek

---

## User Story

> **Als** ontwikkelaar en eindgebruiker,
> **Wil ik** dat de applicatie gebruik maakt van PrimeVue als design system,
> **Zodat** de UI consistent, professioneel en onderhoudbaar is.

---

## Description

De applicatie gebruikt momenteel custom CSS met Tailwind-achtige design tokens. Dit wordt gemigreerd naar PrimeVue 4 met het Aura thema voor een consistente, professionele look en betere onderhoudbaarheid.

PrimeVue biedt:
- 90+ UI componenten
- Ingebouwde accessibility (ARIA)
- Consistente theming
- Tree-shaking voor optimale bundle size

---

## Acceptance Criteria

### AC1: PrimeVue geïnstalleerd en geconfigureerd

```gherkin
Given de applicatie draait
When ik de pagina laad
Then worden PrimeVue componenten correct gerenderd
And is PrimeIcons beschikbaar
```

### AC2: Alle buttons vervangen

```gherkin
Given ik een pagina met buttons bekijk
When de pagina laadt
Then gebruiken alle buttons PrimeVue Button component
And hebben ze consistente styling
```

### AC3: Alle form elementen vervangen

```gherkin
Given ik een formulier invul (login, register, search)
When ik de inputs gebruik
Then zijn dit PrimeVue InputText en Dropdown componenten
And werkt validatie correct
```

### AC4: Modal vervangen door Dialog

```gherkin
Given ik op een kaart klik
When de modal opent
Then is dit een PrimeVue Dialog component
And werkt keyboard navigatie (Escape, pijltjes)
```

### AC5: Navigatie met Menubar

```gherkin
Given ik de applicatie gebruik
When ik de header bekijk
Then is dit een PrimeVue Menubar/Toolbar
And werkt navigatie correct
```

### AC6: Consistente theming

```gherkin
Given alle pagina's
When ik door de app navigeer
Then is de styling consistent
And volgt het Aura thema
```

---

## Dependencies

| Story ID | Title | Type | Reason |
|----------|-------|------|--------|
| US-001 | Nuxt 3 project setup | Hard | Framework moet staan |

**Blocked by:** None
**Blocks:** None (verbetering, geen nieuwe functionaliteit)

---

## INVEST Checklist

| Criterion | Status | Notes |
|-----------|--------|-------|
| **I**ndependent | Yes | Kan los van features ontwikkeld worden |
| **N**egotiable | Yes | Specifieke componenten kunnen later toegevoegd worden |
| **V**aluable | Yes | Betere UX, onderhoudbaarheid, accessibility |
| **E**stimable | Yes | Duidelijke scope per component |
| **S**mall | Medium | Meerdere bestanden, maar incrementeel uitvoerbaar |
| **T**estable | Yes | Visueel te verifiëren per component |

---

## Technical Notes

### Gekozen Configuratie

- **Framework:** PrimeVue 4
- **Thema:** Aura (modern, clean design)
- **Icons:** PrimeIcons

### Component Mapping

| Huidige Implementatie | PrimeVue Component |
|----------------------|-------------------|
| `<input type="text">` | `<InputText>` |
| `<input type="password">` | `<Password>` |
| `<select>` | `<Select>` |
| `<button>` | `<Button>` |
| Custom modal (Teleport) | `<Dialog>` |
| Custom navbar | `<Toolbar>` |
| Custom pagination | `<Paginator>` |
| `.legality-badge` | `<Tag>` |
| `.stat-card` | `<Card>` |
| `.error-message` | `<Message>` |

---

## Traceability

**Requirement IDs:** REQ-UI-001
**Specification Section:** Design System
