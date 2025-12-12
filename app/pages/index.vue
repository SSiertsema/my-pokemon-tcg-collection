<template>
  <div class="container">
    <h1>Pokemon TCG API Test Dashboard</h1>

    <div class="test-grid">
      <!-- All Sets -->
      <section class="test-section">
        <h2>All Sets</h2>
        <button @click="loadAllSets" :disabled="loadingAllSets">
          {{ loadingAllSets ? 'Loading...' : 'Load All Sets' }}
        </button>
        <p v-if="loadingAllSets" class="timing">Loading...</p>
        <p v-else-if="allSetsTime" class="timing">{{ allSetsTime }}ms - {{ allSets.length }} results</p>
        <p v-if="allSetsError" class="error">{{ allSetsError }}</p>
        <div v-if="allSets.length" class="results-grid">
          <div v-for="set in allSets.slice(0, 8)" :key="set.id" class="result-card">
            <img :src="set.images.logo" :alt="set.name" class="card-img" />
            <p class="card-title">{{ set.name }}</p>
            <p class="card-sub">{{ set.releaseDate }}</p>
          </div>
        </div>
      </section>

      <!-- Sets after 2020 -->
      <section class="test-section">
        <h2>Sets after 2020</h2>
        <button @click="loadSetsAfter2020" :disabled="loadingSets2020">
          {{ loadingSets2020 ? 'Loading...' : 'Load Sets' }}
        </button>
        <p v-if="loadingSets2020" class="timing">Loading...</p>
        <p v-else-if="sets2020Time" class="timing">{{ sets2020Time }}ms - {{ sets2020.length }} results</p>
        <p v-if="sets2020Error" class="error">{{ sets2020Error }}</p>
        <div v-if="sets2020.length" class="results-grid">
          <div v-for="set in sets2020.slice(0, 8)" :key="set.id" class="result-card">
            <img :src="set.images.logo" :alt="set.name" class="card-img" />
            <p class="card-title">{{ set.name }}</p>
            <p class="card-sub">{{ set.releaseDate }}</p>
          </div>
        </div>
      </section>

      <!-- Cards from Sun & Moon Base -->
      <section class="test-section">
        <h2>Cards from Sun &amp; Moon Base (sm1)</h2>
        <button @click="loadCardsBySet" :disabled="loadingCardsBySet">
          {{ loadingCardsBySet ? 'Loading...' : 'Load Cards' }}
        </button>
        <p v-if="loadingCardsBySet" class="timing">Loading...</p>
        <p v-else-if="cardsBySetTime" class="timing">{{ cardsBySetTime }}ms - {{ cardsBySet.length }} results</p>
        <p v-if="cardsBySetError" class="error">{{ cardsBySetError }}</p>
        <div v-if="cardsBySet.length" class="results-grid">
          <div v-for="card in cardsBySet.slice(0, 8)" :key="card.id" class="result-card">
            <img :src="card.images.small" :alt="card.name" class="card-img card-img-tall" />
            <p class="card-title">{{ card.name }}</p>
          </div>
        </div>
      </section>

      <!-- Fire Cards from Sun & Moon Base -->
      <section class="test-section">
        <h2>Fire Cards from Sun &amp; Moon Base (sm1)</h2>
        <button @click="loadFireCardsBySet" :disabled="loadingFireCards">
          {{ loadingFireCards ? 'Loading...' : 'Load Fire Cards' }}
        </button>
        <p v-if="loadingFireCards" class="timing">Loading...</p>
        <p v-else-if="fireCardsTime" class="timing">{{ fireCardsTime }}ms - {{ fireCards.length }} results</p>
        <p v-if="fireCardsError" class="error">{{ fireCardsError }}</p>
        <div v-if="fireCards.length" class="results-grid">
          <div v-for="card in fireCards.slice(0, 8)" :key="card.id" class="result-card">
            <img :src="card.images.small" :alt="card.name" class="card-img card-img-tall" />
            <p class="card-title">{{ card.name }}</p>
          </div>
        </div>
      </section>

      <!-- Charizard Cards -->
      <section class="test-section">
        <h2>All Charizard Cards</h2>
        <button @click="loadCharizardCards" :disabled="loadingCharizard">
          {{ loadingCharizard ? 'Loading...' : 'Load Charizards' }}
        </button>
        <p v-if="loadingCharizard" class="timing">Loading...</p>
        <p v-else-if="charizardTime" class="timing">{{ charizardTime }}ms - {{ charizardCards.length }} results</p>
        <p v-if="charizardError" class="error">{{ charizardError }}</p>
        <div v-if="charizardCards.length" class="results-grid">
          <div v-for="card in charizardCards.slice(0, 8)" :key="card.id" class="result-card">
            <img :src="card.images.small" :alt="card.name" class="card-img card-img-tall" />
            <p class="card-title">{{ card.name }}</p>
            <p class="card-sub">{{ card.set.name }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Set, Card } from '~/types/pokemon-tcg';

const { getAllSets, searchSets, searchCards } = usePokemonTcgApi();

const SM1_SET_ID = 'sm1';

// All Sets
const allSets = ref<Set[]>([]);
const loadingAllSets = ref(false);
const allSetsError = ref('');
const allSetsTime = ref<number | null>(null);

async function loadAllSets() {
  loadingAllSets.value = true;
  allSetsError.value = '';
  allSetsTime.value = null;
  const start = Date.now();
  try {
    allSets.value = await getAllSets();
    allSetsTime.value = Date.now() - start;
  } catch (e) {
    allSetsError.value = e instanceof Error ? e.message : 'Unknown error';
  } finally {
    loadingAllSets.value = false;
  }
}

// Sets after 2020
const sets2020 = ref<Set[]>([]);
const loadingSets2020 = ref(false);
const sets2020Error = ref('');
const sets2020Time = ref<number | null>(null);

async function loadSetsAfter2020() {
  loadingSets2020.value = true;
  sets2020Error.value = '';
  sets2020Time.value = null;
  const start = Date.now();
  try {
    sets2020.value = await searchSets('releaseDate:[2020/01/01 TO *]', { orderBy: '-releaseDate' });
    sets2020Time.value = Date.now() - start;
  } catch (e) {
    sets2020Error.value = e instanceof Error ? e.message : 'Unknown error';
  } finally {
    loadingSets2020.value = false;
  }
}

// Cards from Sun & Moon Base (sm1)
const cardsBySet = ref<Card[]>([]);
const loadingCardsBySet = ref(false);
const cardsBySetError = ref('');
const cardsBySetTime = ref<number | null>(null);

async function loadCardsBySet() {
  loadingCardsBySet.value = true;
  cardsBySetError.value = '';
  cardsBySetTime.value = null;
  const start = Date.now();
  try {
    cardsBySet.value = await searchCards(`set.id:${SM1_SET_ID}`);
    cardsBySetTime.value = Date.now() - start;
  } catch (e) {
    cardsBySetError.value = e instanceof Error ? e.message : 'Unknown error';
  } finally {
    loadingCardsBySet.value = false;
  }
}

// Fire Cards from Sun & Moon Base (sm1)
const fireCards = ref<Card[]>([]);
const loadingFireCards = ref(false);
const fireCardsError = ref('');
const fireCardsTime = ref<number | null>(null);

async function loadFireCardsBySet() {
  loadingFireCards.value = true;
  fireCardsError.value = '';
  fireCardsTime.value = null;
  const start = Date.now();
  try {
    fireCards.value = await searchCards(`set.id:${SM1_SET_ID} types:Fire`);
    fireCardsTime.value = Date.now() - start;
  } catch (e) {
    fireCardsError.value = e instanceof Error ? e.message : 'Unknown error';
  } finally {
    loadingFireCards.value = false;
  }
}

// Charizard Cards
const charizardCards = ref<Card[]>([]);
const loadingCharizard = ref(false);
const charizardError = ref('');
const charizardTime = ref<number | null>(null);

async function loadCharizardCards() {
  loadingCharizard.value = true;
  charizardError.value = '';
  charizardTime.value = null;
  const start = Date.now();
  try {
    charizardCards.value = await searchCards('name:Charizard');
    charizardTime.value = Date.now() - start;
  } catch (e) {
    charizardError.value = e instanceof Error ? e.message : 'Unknown error';
  } finally {
    loadingCharizard.value = false;
  }
}
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

h1 {
  color: #1f2937;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.test-section {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.test-section h2 {
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 0.75rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input-group input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  white-space: nowrap;
}

button:hover:not(:disabled) {
  background-color: #2563eb;
}

button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.timing {
  font-size: 0.75rem;
  color: #059669;
  margin: 0.5rem 0;
}

.error {
  color: #dc2626;
  font-size: 0.75rem;
  margin: 0.5rem 0;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.result-card {
  background: #f9fafb;
  border-radius: 0.375rem;
  padding: 0.5rem;
  text-align: center;
}

.card-img {
  width: 100%;
  height: 50px;
  object-fit: contain;
}

.card-img-tall {
  height: 100px;
}

.card-title {
  font-size: 0.7rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0.25rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-sub {
  font-size: 0.65rem;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 900px) {
  .test-grid {
    grid-template-columns: 1fr;
  }
}
</style>
