<template>
  <div class="container">
    <header class="header">
      <div class="header-top">
        <h1>Pokemon TCG Sets</h1>
        <NuxtLink to="/search" class="search-all-link">Search All Cards</NuxtLink>
      </div>
      <p class="subtitle">Browse all {{ allSets.length }} sets</p>
    </header>

    <div class="filters-container">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search sets..."
        class="search-input"
      />
      <select v-model="selectedYear" class="filter-select">
        <option value="">All years</option>
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <button
        v-if="hasActiveFilters"
        class="clear-filters"
        @click="clearFilters"
      >
        Clear filters
      </button>
    </div>

    <div v-if="pending" class="loading">Loading sets...</div>

    <div v-else-if="error" class="error">
      Failed to load sets: {{ error.message }}
    </div>

    <div v-else-if="filteredSets.length === 0" class="no-results">
      No sets found matching your filters
    </div>

    <div v-else class="sets-grid">
      <NuxtLink
        v-for="set in filteredSets"
        :key="set.id"
        :to="`/sets/${set.id}`"
        class="set-card"
      >
        <div class="set-logo">
          <img :src="set.logo" :alt="set.name" loading="lazy" />
        </div>
        <div class="set-info">
          <h2 class="set-name">{{ set.name }}</h2>
          <p class="set-date">{{ formatDate(set.releaseDate) }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getSetsIndex } = useLocalData();

const searchQuery = ref('');
const selectedYear = ref('');

const { data, pending, error } = await useAsyncData('sets-index', async () => {
  const response = await getSetsIndex();
  return response.sets;
});

const allSets = computed(() => data.value || []);

const availableYears = computed(() => {
  const years = new Set<string>();
  allSets.value.forEach((set) => {
    const year = set.releaseDate?.split('/')[0];
    if (year) years.add(year);
  });
  return [...years].sort((a, b) => Number(b) - Number(a));
});

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedYear.value !== '';
});

const filteredSets = computed(() => {
  let result = allSets.value;

  if (selectedYear.value) {
    result = result.filter((set) =>
      set.releaseDate?.startsWith(selectedYear.value)
    );
  }

  const query = searchQuery.value.toLowerCase().trim();
  if (query) {
    result = result.filter((set) => {
      if (set.name.toLowerCase().includes(query)) return true;
      if (set.search?.some((term: string) => term.toLowerCase().includes(query)))
        return true;
      return false;
    });
  }

  return result;
});

function clearFilters() {
  searchQuery.value = '';
  selectedYear.value = '';
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('/');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.header {
  margin-bottom: 1rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-all-link {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s;
}

.search-all-link:hover {
  background: #2563eb;
}

.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 200px;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.filter-select {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fff;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.filter-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.clear-filters {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: #6b7280;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.clear-filters:hover {
  background: #e5e7eb;
  color: #374151;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 0.5rem;
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

.loading {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 0.5rem;
}

.sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.set-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.set-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.set-logo {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.set-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.set-info {
  text-align: center;
  width: 100%;
}

.set-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.set-date {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 640px) {
  .sets-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .set-card {
    padding: 0.75rem;
  }

  .set-logo {
    height: 60px;
  }
}
</style>
