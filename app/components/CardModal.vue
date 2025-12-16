<template>
  <Dialog
    :visible="true"
    modal
    :dismissable-mask="true"
    :closable="true"
    :style="{ width: '900px', maxWidth: '95vw' }"
    :pt="{
      root: { class: 'card-modal' },
      mask: { class: 'card-modal-mask' },
      content: { class: 'card-modal-content' },
    }"
    @update:visible="$emit('close')"
  >
    <template #header>
      <div class="dialog-header">
        <h2>{{ card.name }}</h2>
        <div class="card-meta">
          <Tag v-if="card.hp" :value="`${card.hp} HP`" severity="danger" />
          <Tag v-if="card.types?.length" :value="card.types.join(', ')" severity="secondary" />
        </div>
      </div>
    </template>

    <div class="modal-body">
      <div class="card-image-container">
        <Button
          v-if="hasPrevious"
          icon="pi pi-chevron-left"
          class="nav-button nav-prev"
          rounded
          outlined
          aria-label="Vorige kaart"
          @click="$emit('previous')"
        />
        <div class="image-wrapper">
          <ProgressSpinner v-if="showLoader" class="image-loader" />
          <img
            v-if="!largeImageLoaded"
            :key="`${card.id}-small`"
            :src="card.images.small"
            :alt="card.name"
            class="card-image card-image-small"
            :class="{ 'image-hidden': !smallImageLoaded }"
            @load="onSmallImageLoad"
          />
          <img
            :key="`${card.id}-large`"
            :src="card.images.large"
            :alt="card.name"
            class="card-image card-image-large"
            :class="{ 'image-hidden': !largeImageLoaded }"
            @load="onLargeImageLoad"
          />
        </div>
        <Button
          v-if="hasNext"
          icon="pi pi-chevron-right"
          class="nav-button nav-next"
          rounded
          outlined
          aria-label="Volgende kaart"
          @click="$emit('next')"
        />
      </div>

      <div class="card-details">
        <div v-if="user" class="collection-actions">
          <Button
            :label="isOwned ? 'Owned' : 'Add to Collection'"
            :icon="isOwned ? 'pi pi-check' : 'pi pi-plus'"
            :severity="isOwned ? 'success' : 'secondary'"
            :outlined="!isOwned"
            @click="toggleOwned"
          />
          <Button
            :label="isWishlisted ? 'On Wishlist' : 'Add to Wishlist'"
            :icon="isWishlisted ? 'pi pi-star-fill' : 'pi pi-star'"
            :severity="isWishlisted ? 'warn' : 'secondary'"
            :outlined="!isWishlisted"
            @click="toggleWishlist"
          />
        </div>

        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Nummer</span>
            <span class="detail-value">#{{ card.number }}</span>
          </div>

          <div v-if="card.supertype" class="detail-item">
            <span class="detail-label">Type</span>
            <span class="detail-value">{{ card.supertype }}</span>
          </div>

          <div v-if="card.subtypes?.length" class="detail-item">
            <span class="detail-label">Subtypes</span>
            <span class="detail-value">{{ card.subtypes.join(', ') }}</span>
          </div>

          <div v-if="card.evolvesFrom" class="detail-item">
            <span class="detail-label">Evolueert van</span>
            <span class="detail-value">{{ card.evolvesFrom }}</span>
          </div>

          <div v-if="card.rarity" class="detail-item">
            <span class="detail-label">Zeldzaamheid</span>
            <span class="detail-value">{{ card.rarity }}</span>
          </div>

          <div v-if="card.artist" class="detail-item">
            <span class="detail-label">Artiest</span>
            <span class="detail-value">{{ card.artist }}</span>
          </div>

          <div v-if="card.weaknesses?.length" class="detail-item">
            <span class="detail-label">Zwakte</span>
            <span class="detail-value">
              <Tag
                v-for="w in card.weaknesses"
                :key="w.type"
                :value="`${w.type} ${w.value}`"
                severity="danger"
                class="mr-1"
              />
            </span>
          </div>

          <div v-if="card.resistances?.length" class="detail-item">
            <span class="detail-label">Resistentie</span>
            <span class="detail-value">
              <Tag
                v-for="r in card.resistances"
                :key="r.type"
                :value="`${r.type} ${r.value}`"
                severity="success"
                class="mr-1"
              />
            </span>
          </div>

          <div v-if="card.retreatCost?.length" class="detail-item">
            <span class="detail-label">Terugtrekkosten</span>
            <span class="detail-value">{{ card.retreatCost.length }}</span>
          </div>
        </div>

        <div v-if="card.abilities?.length" class="section">
          <h3>Abilities</h3>
          <Card v-for="ability in card.abilities" :key="ability.name" class="ability-card">
            <template #title>
              <div class="ability-header">
                <span>{{ ability.name }}</span>
                <Tag :value="ability.type" size="small" />
              </div>
            </template>
            <template #content>
              <p class="ability-text">{{ ability.text }}</p>
            </template>
          </Card>
        </div>

        <div v-if="card.attacks?.length" class="section">
          <h3>Attacks</h3>
          <Card v-for="attack in card.attacks" :key="attack.name" class="attack-card">
            <template #title>
              <div class="attack-header">
                <span class="attack-cost">
                  <span v-for="(cost, i) in attack.cost" :key="i" class="energy">
                    {{ cost.charAt(0) }}
                  </span>
                </span>
                <span class="attack-name">{{ attack.name }}</span>
                <Tag v-if="attack.damage" :value="attack.damage" severity="danger" />
              </div>
            </template>
            <template #content>
              <p v-if="attack.text" class="attack-text">{{ attack.text }}</p>
            </template>
          </Card>
        </div>

        <p v-if="card.flavorText" class="flavor-text">
          "{{ card.flavorText }}"
        </p>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useCollectionStore } from '~/stores/collection';

interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  number: string;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  images: { small: string; large: string };
  abilities?: Array<{ name: string; text: string; type: string }>;
  attacks?: Array<{ name: string; cost: string[]; damage?: string; text?: string }>;
  weaknesses?: Array<{ type: string; value: string }>;
  resistances?: Array<{ type: string; value: string }>;
  retreatCost?: string[];
}

const props = defineProps<{
  card: Card;
  hasPrevious: boolean;
  hasNext: boolean;
  allCards?: Card[];
  currentIndex?: number;
}>();

const emit = defineEmits<{
  close: [];
  previous: [];
  next: [];
}>();

const user = useSupabaseUser();
const collectionStore = useCollectionStore();

const smallImageLoaded = ref(false);
const largeImageLoaded = ref(false);

// Show loader only if neither image is loaded yet
const showLoader = computed(() => !smallImageLoaded.value && !largeImageLoaded.value);

const isOwned = computed(() => collectionStore.isOwned(props.card.id));
const isWishlisted = computed(() => collectionStore.isWishlisted(props.card.id));

// Reset loading state when card changes
watch(() => props.card.id, () => {
  smallImageLoaded.value = false;
  largeImageLoaded.value = false;
  preloadAdjacentImages();
});

function onSmallImageLoad() {
  smallImageLoaded.value = true;
}

function onLargeImageLoad() {
  largeImageLoaded.value = true;
}

// Preload adjacent images for smoother navigation
function preloadAdjacentImages() {
  if (!props.allCards || props.currentIndex === undefined) return;

  const preloadCount = 5;
  const imagesToPreload: string[] = [];

  // Get next 5 images
  for (let i = 1; i <= preloadCount; i++) {
    const nextIndex = props.currentIndex + i;
    if (nextIndex < props.allCards.length) {
      imagesToPreload.push(props.allCards[nextIndex].images.large);
    }
  }

  // Get previous 5 images
  for (let i = 1; i <= preloadCount; i++) {
    const prevIndex = props.currentIndex - i;
    if (prevIndex >= 0) {
      imagesToPreload.push(props.allCards[prevIndex].images.large);
    }
  }

  // Preload images
  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

async function toggleOwned() {
  await collectionStore.toggleOwned(props.card.id);
}

async function toggleWishlist() {
  await collectionStore.toggleWishlist(props.card.id);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' && props.hasPrevious) {
    emit('previous');
  } else if (e.key === 'ArrowRight' && props.hasNext) {
    emit('next');
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  preloadAdjacentImages();
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dialog-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.card-meta {
  display: flex;
  gap: 0.5rem;
}

.modal-body {
  display: flex;
  gap: 1.5rem;
}

.card-image-container {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  width: 300px;
  aspect-ratio: 2.5 / 3.5; /* Pokemon card ratio */
  max-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-loader {
  position: absolute;
  width: 2rem !important;
  height: 2rem !important;
}

.card-image {
  max-height: 60vh;
  max-width: 300px;
  object-fit: contain;
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s ease;
}

.card-image-small {
  position: absolute;
}

.card-image-large {
  position: relative;
  z-index: 1;
}

.card-image.image-hidden {
  opacity: 0;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.nav-prev {
  left: -1rem;
}

.nav-next {
  right: -1rem;
}

.card-details {
  flex: 1;
  overflow-y: auto;
  max-height: 70vh;
}

.collection-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-grid {
  display: grid;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--p-surface-200);
}

.detail-label {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.detail-value {
  font-weight: 500;
  font-size: 0.875rem;
}

.section {
  margin-top: 1.5rem;
}

.section h3 {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ability-card,
.attack-card {
  margin-bottom: 0.5rem;
}

.ability-card :deep(.p-card-body) {
  padding: 0.75rem;
}

.attack-card :deep(.p-card-body) {
  padding: 0.75rem;
}

.ability-header,
.attack-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.attack-cost {
  display: flex;
  gap: 0.125rem;
}

.energy {
  width: 1.25rem;
  height: 1.25rem;
  background: var(--p-surface-200);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
}

.attack-name {
  flex: 1;
  font-weight: 600;
}

.ability-text,
.attack-text {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
  margin: 0;
  line-height: 1.4;
}

.flavor-text {
  margin-top: 1.5rem;
  font-style: italic;
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  line-height: 1.5;
}

.mr-1 {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .modal-body {
    flex-direction: column;
  }

  .image-wrapper {
    width: 100%;
    max-width: 250px;
    max-height: 40vh;
  }

  .card-image {
    max-height: 40vh;
    max-width: 100%;
  }

  .card-details {
    max-height: none;
  }

  .nav-button {
    position: static;
    transform: none;
  }

  .card-image-container {
    gap: 0.5rem;
  }
}
</style>
