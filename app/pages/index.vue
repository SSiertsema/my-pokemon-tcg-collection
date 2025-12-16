<template>
  <div class="container">
    <header class="header">
      <div class="header-top">
        <h1>Pokemon TCG Sets</h1>
        <Button
          as="router-link"
          to="/search"
          label="Search All Cards"
          icon="pi pi-search"
        />
      </div>
      <p class="subtitle">Browse all {{ allSets.length }} sets</p>
    </header>

    <div class="filters-container">
      <IconField class="search-field">
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchQuery"
          placeholder="Search sets..."
        />
      </IconField>

      <Select
        v-model="selectedYear"
        :options="yearOptions"
        option-label="label"
        option-value="value"
        placeholder="All years"
        class="year-select"
      />

      <Button
        v-if="hasActiveFilters"
        label="Clear filters"
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="clearFilters"
      />
    </div>

    <ProgressSpinner v-if="pending" class="loading-spinner" />

    <Message v-else-if="error" severity="error" :closable="false">
      Failed to load sets: {{ error.message }}
    </Message>

    <Message v-else-if="filteredSets.length === 0" severity="info" :closable="false">
      No sets found matching your filters
    </Message>

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
          <Tag :value="formatDate(set.releaseDate)" severity="secondary" />
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
}, { server: false });

const allSets = computed(() => data.value || []);

const availableYears = computed(() => {
  const years = new Set<string>();
  allSets.value.forEach((set) => {
    const year = set.releaseDate?.split('/')[0];
    if (year) years.add(year);
  });
  return [...years].sort((a, b) => Number(b) - Number(a));
});

const yearOptions = computed(() => [
  { label: 'All years', value: '' },
  ...availableYears.value.map((year) => ({ label: year, value: year })),
]);

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

.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.search-field {
  flex: 1;
  min-width: 200px;
  max-width: 400px;
}

.year-select {
  min-width: 150px;
}

.loading-spinner {
  display: block;
  margin: 3rem auto;
}

.sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.set-card {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: var(--p-border-radius);
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
  border-color: var(--p-primary-color);
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
  color: var(--p-text-color);
  margin: 0 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
