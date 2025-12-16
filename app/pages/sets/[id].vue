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

    <ProgressSpinner v-if="pending" class="loading-spinner" />

    <Message v-else-if="error" severity="error" :closable="false">
      Failed to load set: {{ error.message }}
    </Message>

    <template v-else-if="set">
      <header class="set-header">
        <div class="set-logo">
          <img :src="set.images.logo" :alt="set.name" />
        </div>
        <div class="set-meta">
          <h1>{{ set.name }}</h1>
          <div class="meta-details">
            <div class="meta-item">
              <span class="meta-label">Series</span>
              <span class="meta-value">{{ set.series }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Released</span>
              <span class="meta-value">{{ formatDate(set.releaseDate) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Cards</span>
              <span class="meta-value">{{ set.total }} ({{ set.printedTotal }} printed)</span>
            </div>
            <div v-if="set.ptcgoCode" class="meta-item">
              <span class="meta-label">PTCGO</span>
              <span class="meta-value">{{ set.ptcgoCode }}</span>
            </div>
          </div>
          <div class="legalities">
            <Tag
              v-for="(status, format) in set.legalities"
              :key="format"
              :value="String(format)"
              :severity="status === 'Legal' ? 'success' : 'secondary'"
            />
          </div>
        </div>
      </header>

      <section class="cards-section">
        <h2>Cards ({{ cards.length }})</h2>

        <ProgressSpinner v-if="cardsPending" class="loading-spinner" />

        <div v-else class="cards-grid">
          <button
            v-for="(card, index) in cards"
            :key="card.id"
            class="card-item"
            :class="{
              'is-owned': user && collectionStore.isOwned(card.id),
              'is-wishlisted': user && collectionStore.isWishlisted(card.id),
            }"
            @click="selectCard(index)"
          >
            <div class="card-image">
              <img :src="card.images.small" :alt="card.name" loading="lazy" />
              <div v-if="user" class="card-badges">
                <Tag
                  v-if="collectionStore.isOwned(card.id)"
                  icon="pi pi-check"
                  severity="success"
                  rounded
                  class="badge"
                />
                <Tag
                  v-if="collectionStore.isWishlisted(card.id)"
                  icon="pi pi-star-fill"
                  severity="warn"
                  rounded
                  class="badge"
                />
              </div>
            </div>
            <div class="card-info">
              <p class="card-name">{{ card.name }}</p>
              <div class="card-details">
                <Tag :value="`#${card.number}`" size="small" />
                <Tag v-if="card.rarity" :value="card.rarity" severity="secondary" size="small" />
              </div>
            </div>
          </button>
        </div>
      </section>
    </template>

    <CardModal
      v-if="selectedCard"
      :card="selectedCard"
      :has-previous="selectedCardIndex > 0"
      :has-next="selectedCardIndex < cards.length - 1"
      :all-cards="cards"
      :current-index="selectedCardIndex"
      @close="selectedCardIndex = -1"
      @previous="navigateToPrevious"
      @next="navigateToNext"
    />
  </div>
</template>

<script setup lang="ts">
import { useCollectionStore } from '~/stores/collection';

const route = useRoute();
const { getSet, getCardsForSet } = useLocalData();
const user = useSupabaseUser();
const collectionStore = useCollectionStore();

const setId = computed(() => route.params.id as string);
const selectedCardIndex = ref(-1);
const selectedCard = computed(() =>
  selectedCardIndex.value >= 0 ? cards.value[selectedCardIndex.value] : null
);

function selectCard(index: number) {
  selectedCardIndex.value = index;
}

function navigateToPrevious() {
  if (selectedCardIndex.value > 0) {
    selectedCardIndex.value--;
  }
}

function navigateToNext() {
  if (selectedCardIndex.value < cards.value.length - 1) {
    selectedCardIndex.value++;
  }
}

const { data: set, pending, error } = await useAsyncData(
  `set-${setId.value}`,
  () => getSet(setId.value),
  { server: false }
);

const { data: cardsData, pending: cardsPending } = await useAsyncData(
  `cards-${setId.value}`,
  async () => {
    if (!set.value?.cards) return [];
    return getCardsForSet(set.value.cards);
  },
  { watch: [set], server: false }
);

const cards = computed(() => cardsData.value || []);

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('/');
  const date = new Date(Number(year), Number(month) - 1, Number(day) || 1);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: day ? 'numeric' : undefined,
  });
}
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.back-link {
  margin-bottom: 1.5rem;
}

.loading-spinner {
  display: block;
  margin: 3rem auto;
}

.set-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--p-surface-200);
}

.set-logo {
  flex-shrink: 0;
}

.set-logo img {
  max-width: 200px;
  max-height: 100px;
  object-fit: contain;
}

.set-meta h1 {
  font-size: 1.75rem;
  color: var(--p-text-color);
  margin: 0 0 1rem;
}

.meta-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  font-size: 0.9rem;
  color: var(--p-text-color);
  font-weight: 500;
}

.legalities {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cards-section h2 {
  font-size: 1.25rem;
  color: var(--p-text-color);
  margin: 0 0 1rem;
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
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-badges {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.badge {
  width: 1.5rem !important;
  height: 1.5rem !important;
  padding: 0 !important;
  justify-content: center;
}

.card-item.is-owned {
  border-color: var(--p-green-500);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.card-item.is-wishlisted:not(.is-owned) {
  border-color: var(--p-yellow-500);
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
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

.card-details {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .set-header {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }

  .meta-details {
    justify-content: center;
  }

  .legalities {
    justify-content: center;
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
