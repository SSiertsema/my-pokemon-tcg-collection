<template>
  <div class="container">
    <NuxtLink to="/" class="back-link">&larr; Back to sets</NuxtLink>

    <div v-if="pending" class="loading">Loading set...</div>

    <div v-else-if="error" class="error">
      Failed to load set: {{ error.message }}
    </div>

    <template v-else-if="set">
      <header class="set-header">
        <div class="set-logo">
          <img :src="set.images.logo" :alt="set.name" />
        </div>
        <div class="set-meta">
          <h1>{{ set.name }}</h1>
          <div class="meta-details">
            <span class="meta-item">
              <strong>Series:</strong> {{ set.series }}
            </span>
            <span class="meta-item">
              <strong>Released:</strong> {{ formatDate(set.releaseDate) }}
            </span>
            <span class="meta-item">
              <strong>Cards:</strong> {{ set.total }} ({{ set.printedTotal }} printed)
            </span>
            <span v-if="set.ptcgoCode" class="meta-item">
              <strong>PTCGO:</strong> {{ set.ptcgoCode }}
            </span>
          </div>
          <div class="legalities">
            <span
              v-for="(status, format) in set.legalities"
              :key="format"
              class="legality-badge"
              :class="status.toLowerCase()"
            >
              {{ format }}
            </span>
          </div>
        </div>
      </header>

      <section class="cards-section">
        <h2>Cards ({{ cards.length }})</h2>

        <div v-if="cardsPending" class="loading">Loading cards...</div>

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
                <span v-if="collectionStore.isOwned(card.id)" class="badge badge-owned" title="Owned">✓</span>
                <span v-if="collectionStore.isWishlisted(card.id)" class="badge badge-wish" title="Wishlist">★</span>
              </div>
            </div>
            <div class="card-info">
              <p class="card-name">{{ card.name }}</p>
              <p class="card-details">
                #{{ card.number }}
                <span v-if="card.rarity" class="card-rarity">{{ card.rarity }}</span>
              </p>
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
  () => getSet(setId.value)
);

const { data: cardsData, pending: cardsPending } = await useAsyncData(
  `cards-${setId.value}`,
  async () => {
    if (!set.value?.cards) return [];
    return getCardsForSet(set.value.cards);
  },
  { watch: [set] }
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
  display: inline-block;
  color: #3b82f6;
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
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

.set-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
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
  color: #1f2937;
  margin: 0 0 1rem;
}

.meta-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-bottom: 1rem;
}

.meta-item {
  font-size: 0.9rem;
  color: #4b5563;
}

.meta-item strong {
  color: #1f2937;
}

.legalities {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.legality-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: #e5e7eb;
  color: #374151;
  text-transform: capitalize;
}

.legality-badge.legal {
  background: #d1fae5;
  color: #065f46;
}

.cards-section h2 {
  font-size: 1.25rem;
  color: #1f2937;
  margin: 0 0 1rem;
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
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.badge-owned {
  background: #10b981;
  color: white;
}

.badge-wish {
  background: #f59e0b;
  color: white;
}

.card-item.is-owned {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.card-item.is-wishlisted:not(.is-owned) {
  border-color: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
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

.card-details {
  font-size: 0.7rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
}

.card-rarity {
  margin-left: 0.5rem;
  color: #9ca3af;
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
