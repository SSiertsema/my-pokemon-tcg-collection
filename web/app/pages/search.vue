<template>
  <div class="container">
    <NuxtLink to="/" class="back-link">&larr; Back to sets</NuxtLink>

    <header class="header">
      <h1>Search Cards</h1>
      <p class="subtitle">Search across all {{ totalCards }} cards</p>
    </header>

    <div class="search-section">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search by card name (min. 2 characters)..."
          class="search-input"
          @input="onSearchInput"
        />
        <span v-if="searchQuery.length > 0 && searchQuery.length < 2" class="search-hint">
          Type at least 2 characters
        </span>
      </div>

      <div v-if="hasResults" class="filters">
        <div class="filter-group">
          <label>Type</label>
          <select v-model="selectedType" @change="applyFilters">
            <option value="">All Types ({{ availableFilters.types.length }})</option>
            <option v-for="type in availableFilters.types" :key="type.value" :value="type.value">
              {{ type.value }} ({{ type.count }})
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>Rarity</label>
          <select v-model="selectedRarity" @change="applyFilters">
            <option value="">All Rarities ({{ availableFilters.rarities.length }})</option>
            <option v-for="rarity in availableFilters.rarities" :key="rarity.value" :value="rarity.value">
              {{ rarity.value }} ({{ rarity.count }})
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>Series</label>
          <select v-model="selectedSeries" @change="applyFilters">
            <option value="">All Series ({{ availableFilters.series.length }})</option>
            <option v-for="series in availableFilters.series" :key="series.value" :value="series.value">
              {{ series.value }} ({{ series.count }})
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>Card Type</label>
          <select v-model="selectedSupertype" @change="applyFilters">
            <option value="">All ({{ availableFilters.supertypes.length }})</option>
            <option v-for="st in availableFilters.supertypes" :key="st.value" :value="st.value">
              {{ st.value }} ({{ st.count }})
            </option>
          </select>
        </div>

        <button v-if="hasActiveFilters" class="reset-btn" @click="resetFilters">
          Reset Filters
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading cards index...</div>

    <div v-else-if="searchQuery.length >= 2">
      <div v-if="filteredResults.length === 0" class="no-results">
        <p>No cards found for "{{ searchQuery }}"</p>
        <p class="suggestion">Try a different search term or adjust your filters</p>
      </div>

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
              <p class="card-details">
                #{{ card.nr }}
                <span v-if="card.r" class="card-rarity">{{ card.r }}</span>
              </p>
            </div>
          </button>
        </div>

        <div v-if="filteredResults.length > pageSize" class="pagination">
          <button :disabled="currentPage === 1" @click="currentPage--">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage >= totalPages" @click="currentPage++">
            Next
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>Enter a card name to search</p>
      <p class="examples">Examples: Pikachu, Charizard, Energy, Trainer</p>
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

// State
const cardsIndex = ref<CardIndexEntry[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedType = ref('');
const selectedRarity = ref('');
const selectedSeries = ref('');
const selectedSupertype = ref('');
const currentPage = ref(1);
const pageSize = 50;
const selectedCardIndex = ref(-1);
const selectedCardData = ref<Awaited<ReturnType<typeof getCard>> | null>(null);

// Load cards index on mount
onMounted(async () => {
  try {
    cardsIndex.value = await getCardsIndex();
  } finally {
    loading.value = false;
  }
});

const totalCards = computed(() => cardsIndex.value.length);

// Search results (before filters)
const searchResults = computed(() => {
  if (searchQuery.value.length < 2) return [];

  const query = searchQuery.value.toLowerCase();
  return cardsIndex.value.filter(card =>
    card.n.toLowerCase().includes(query)
  );
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
  const start = (currentPage.value - 1) * pageSize;
  return filteredResults.value.slice(start, start + pageSize);
});

// Methods
function onSearchInput() {
  currentPage.value = 1;
  resetFilters();
}

function applyFilters() {
  currentPage.value = 1;
}

function resetFilters() {
  selectedType.value = '';
  selectedRarity.value = '';
  selectedSeries.value = '';
  selectedSupertype.value = '';
  currentPage.value = 1;
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
  display: inline-block;
  color: #3b82f6;
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
}

.header {
  margin-bottom: 1.5rem;
}

h1 {
  color: #1f2937;
  font-size: 2rem;
  margin: 0 0 0.5rem;
}

.subtitle {
  color: #6b7280;
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

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.15s;
}

.search-input:focus {
  border-color: #3b82f6;
}

.search-hint {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 0.875rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-group label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
}

.filter-group select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  min-width: 150px;
}

.reset-btn {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.reset-btn:hover {
  background: #dc2626;
}

.loading,
.empty-state,
.no-results {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.examples,
.suggestion {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}

.results-count {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.card-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
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
  background: #f3f4f6;
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
  color: #1f2937;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-set {
  font-size: 0.7rem;
  color: #3b82f6;
  margin: 0.125rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-details {
  font-size: 0.7rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
}

.card-rarity {
  margin-left: 0.5rem;
  color: #9ca3af;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.pagination button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background: #2563eb;
}

.pagination span {
  color: #6b7280;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group select {
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
