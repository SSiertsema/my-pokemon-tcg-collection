<template>
  <div class="container">
    <Button
      as="router-link"
      to="/"
      label="Back to sets"
      icon="pi pi-arrow-left"
      text
      class="back-link"
    />

    <header class="header">
      <h1>Search Cards</h1>
      <p class="subtitle">Search across all {{ totalCards }} cards</p>
    </header>

    <div class="search-section">
      <div class="search-bar">
        <IconField class="search-field">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            placeholder="Search cards... (e.g. pikachu type:lightning)"
            @input="onSearchInput"
          />
        </IconField>
        <span v-if="searchQuery.length > 0 && parsedSearch.query.length < 2 && !hasModifierFilters" class="search-hint">
          Type at least 2 characters
        </span>
      </div>

      <SearchHelp @use-example="useExample" />

      <div v-if="hasResults" class="filters">
        <Select
          v-model="selectedType"
          :options="typeOptions"
          option-label="label"
          option-value="value"
          placeholder="All Types"
          class="filter-select"
          @change="applyFilters"
        />

        <Select
          v-model="selectedRarity"
          :options="rarityOptions"
          option-label="label"
          option-value="value"
          placeholder="All Rarities"
          class="filter-select"
          @change="applyFilters"
        />

        <Select
          v-model="selectedSeries"
          :options="seriesOptions"
          option-label="label"
          option-value="value"
          placeholder="All Series"
          class="filter-select"
          @change="applyFilters"
        />

        <Select
          v-model="selectedSupertype"
          :options="supertypeOptions"
          option-label="label"
          option-value="value"
          placeholder="All Card Types"
          class="filter-select"
          @change="applyFilters"
        />

        <Button
          v-if="hasActiveFilters"
          label="Reset"
          icon="pi pi-times"
          severity="danger"
          size="small"
          @click="resetFilters"
        />
      </div>
    </div>

    <ProgressSpinner v-if="loading" class="loading-spinner" />

    <div v-else-if="parsedSearch.query.length >= 2 || hasModifierFilters">
      <Message v-if="filteredResults.length === 0" severity="info" :closable="false">
        No cards found for "{{ searchQuery }}". Try a different search term or adjust your filters.
      </Message>

      <div v-else>
        <p class="results-count">
          Showing {{ paginatedResults.length }} of {{ filteredResults.length }} results
        </p>

        <div class="cards-grid">
          <button
            v-for="(card, index) in paginatedResults"
            :key="card.i"
            class="card-item"
            @click="selectCard(index)"
          >
            <div class="card-image">
              <img :src="getCardImage(card)" :alt="card.n" loading="lazy" />
            </div>
            <div class="card-info">
              <p class="card-name">{{ card.n }}</p>
              <p class="card-set">{{ card.sn }}</p>
              <div class="card-details">
                <Tag :value="`#${card.nr}`" size="small" />
                <Tag v-if="card.r" :value="card.r" severity="secondary" size="small" />
              </div>
            </div>
          </button>
        </div>

        <Paginator
          v-if="filteredResults.length > pageSize"
          v-model:first="first"
          :rows="pageSize"
          :total-records="filteredResults.length"
          class="pagination"
        />
      </div>
    </div>

    <div v-else class="empty-state">
      <i class="pi pi-search empty-icon" />
      <p>Enter a card name or use modifiers to search</p>
      <p class="examples">Try: pikachu, type:fire, is:trainer</p>
    </div>

    <CardModal
      v-if="selectedCardData"
      :card="selectedCardData"
      :has-previous="selectedCardIndex > 0"
      :has-next="selectedCardIndex < paginatedResults.length - 1"
      @close="closeModal"
      @previous="navigateToPrevious"
      @next="navigateToNext"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardIndexEntry } from '~/composables/useLocalData';

const { getCardsIndex, getCard } = useLocalData();
const { parseQuery } = useSearchParser();

// State
const searchQuery = ref('');
const selectedType = ref('');
const selectedRarity = ref('');
const selectedSeries = ref('');
const selectedSupertype = ref('');
const selectedSet = ref('');
const first = ref(0);
const pageSize = 50;
const selectedCardIndex = ref(-1);
const selectedCardData = ref<Awaited<ReturnType<typeof getCard>> | null>(null);

// Parsed search query
const parsedSearch = computed(() => parseQuery(searchQuery.value));

const hasModifierFilters = computed(() => {
  const f = parsedSearch.value.filters;
  return !!(f.type || f.rarity || f.series || f.supertype || f.set);
});

// Load cards index
const { data: cardsIndexData, pending: loading } = await useAsyncData(
  'cards-index',
  () => getCardsIndex(),
  { lazy: true }
);

const cardsIndex = computed(() => cardsIndexData.value || []);

const totalCards = computed(() => cardsIndex.value.length);

const currentPage = computed({
  get: () => Math.floor(first.value / pageSize) + 1,
  set: (val) => { first.value = (val - 1) * pageSize; },
});

// Search results (before dropdown filters)
const searchResults = computed(() => {
  const parsed = parsedSearch.value;
  const query = parsed.query.toLowerCase();

  // Need either a 2+ char query OR at least one modifier filter
  if (query.length < 2 && !hasModifierFilters.value) return [];

  return cardsIndex.value.filter((card) => {
    // Name filter
    if (query.length >= 2) {
      if (parsed.exactMatch) {
        if (card.n.toLowerCase() !== query) return false;
      } else {
        if (!card.n.toLowerCase().includes(query)) return false;
      }
    }

    // Modifier filters from search query
    const f = parsed.filters;

    if (f.type && !card.t.some(t => t.toLowerCase() === f.type!.toLowerCase())) {
      return false;
    }

    if (f.rarity && card.r?.toLowerCase() !== f.rarity.toLowerCase()) {
      return false;
    }

    if (f.series && !card.sr?.toLowerCase().includes(f.series.toLowerCase())) {
      return false;
    }

    if (f.supertype && card.st?.toLowerCase() !== f.supertype.toLowerCase()) {
      return false;
    }

    if (f.set && card.si?.toLowerCase() !== f.set.toLowerCase()) {
      return false;
    }

    return true;
  });
});

const hasResults = computed(() => searchResults.value.length > 0);

// Calculate available filter options from search results
const availableFilters = computed(() => {
  const results = searchResults.value;

  const typeCount = new Map<string, number>();
  const rarityCount = new Map<string, number>();
  const seriesCount = new Map<string, number>();
  const supertypeCount = new Map<string, number>();

  for (const card of results) {
    // Types
    for (const type of card.t) {
      typeCount.set(type, (typeCount.get(type) || 0) + 1);
    }
    // Rarity
    if (card.r) {
      rarityCount.set(card.r, (rarityCount.get(card.r) || 0) + 1);
    }
    // Series
    if (card.sr) {
      seriesCount.set(card.sr, (seriesCount.get(card.sr) || 0) + 1);
    }
    // Supertype
    if (card.st) {
      supertypeCount.set(card.st, (supertypeCount.get(card.st) || 0) + 1);
    }
  }

  const toOptions = (map: Map<string, number>) =>
    Array.from(map.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value));

  return {
    types: toOptions(typeCount),
    rarities: toOptions(rarityCount),
    series: toOptions(seriesCount),
    supertypes: toOptions(supertypeCount),
  };
});

// Select options
const typeOptions = computed(() => [
  { label: `All Types (${availableFilters.value.types.length})`, value: '' },
  ...availableFilters.value.types.map((t) => ({ label: `${t.value} (${t.count})`, value: t.value })),
]);

const rarityOptions = computed(() => [
  { label: `All Rarities (${availableFilters.value.rarities.length})`, value: '' },
  ...availableFilters.value.rarities.map((r) => ({ label: `${r.value} (${r.count})`, value: r.value })),
]);

const seriesOptions = computed(() => [
  { label: `All Series (${availableFilters.value.series.length})`, value: '' },
  ...availableFilters.value.series.map((s) => ({ label: `${s.value} (${s.count})`, value: s.value })),
]);

const supertypeOptions = computed(() => [
  { label: `All (${availableFilters.value.supertypes.length})`, value: '' },
  ...availableFilters.value.supertypes.map((st) => ({ label: `${st.value} (${st.count})`, value: st.value })),
]);

// Filtered results (after applying filters)
const filteredResults = computed(() => {
  let results = searchResults.value;

  if (selectedType.value) {
    results = results.filter(card => card.t.includes(selectedType.value));
  }
  if (selectedRarity.value) {
    results = results.filter(card => card.r === selectedRarity.value);
  }
  if (selectedSeries.value) {
    results = results.filter(card => card.sr === selectedSeries.value);
  }
  if (selectedSupertype.value) {
    results = results.filter(card => card.st === selectedSupertype.value);
  }

  return results;
});

const hasActiveFilters = computed(() =>
  selectedType.value || selectedRarity.value || selectedSeries.value || selectedSupertype.value
);

// Pagination
const totalPages = computed(() => Math.ceil(filteredResults.value.length / pageSize));

const paginatedResults = computed(() => {
  return filteredResults.value.slice(first.value, first.value + pageSize);
});

// Methods
function onSearchInput() {
  first.value = 0;
  resetFilters();
}

function useExample(example: string) {
  searchQuery.value = example;
  first.value = 0;
  resetFilters();
}

function applyFilters() {
  first.value = 0;
}

function resetFilters() {
  selectedType.value = '';
  selectedRarity.value = '';
  selectedSeries.value = '';
  selectedSupertype.value = '';
  first.value = 0;
}

function getCardImage(card: CardIndexEntry): string {
  return `https://images.pokemontcg.io/${card.si}/${card.nr}.png`;
}

async function selectCard(index: number) {
  selectedCardIndex.value = index;
  const card = paginatedResults.value[index];
  selectedCardData.value = await getCard(card.i);
}

function closeModal() {
  selectedCardIndex.value = -1;
  selectedCardData.value = null;
}

async function navigateToPrevious() {
  if (selectedCardIndex.value > 0) {
    await selectCard(selectedCardIndex.value - 1);
  }
}

async function navigateToNext() {
  if (selectedCardIndex.value < paginatedResults.value.length - 1) {
    await selectCard(selectedCardIndex.value + 1);
  }
}
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.back-link {
  margin-bottom: 1rem;
}

.header {
  margin-bottom: 1.5rem;
}

h1 {
  color: var(--p-text-color);
  font-size: 2rem;
  margin: 0 0 0.5rem;
}

.subtitle {
  color: var(--p-text-muted-color);
  font-size: 1rem;
  margin: 0;
}

.search-section {
  margin-bottom: 1.5rem;
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-field {
  width: 100%;
}

.search-hint {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  padding: 1rem;
  background: var(--p-surface-50);
  border-radius: var(--p-border-radius);
}

.filter-select {
  min-width: 150px;
}

.loading-spinner {
  display: block;
  margin: 3rem auto;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--p-text-muted-color);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.examples {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.results-count {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.card-item {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: var(--p-border-radius);
  overflow: hidden;
  transition: transform 0.15s, box-shadow 0.15s;
  cursor: pointer;
  padding: 0;
  text-align: left;
  font-family: inherit;
}

.card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-image {
  aspect-ratio: 2.5 / 3.5;
  background: var(--p-surface-100);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-info {
  padding: 0.5rem;
}

.card-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--p-text-color);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-set {
  font-size: 0.7rem;
  color: var(--p-primary-color);
  margin: 0.125rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-details {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.pagination {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    width: 100%;
  }

  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
