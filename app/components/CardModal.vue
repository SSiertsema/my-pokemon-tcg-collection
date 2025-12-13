<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <button
        v-if="hasPrevious"
        class="nav-button nav-prev"
        @click="$emit('previous')"
        aria-label="Vorige kaart"
      >
        <span class="nav-icon">&lsaquo;</span>
      </button>

      <div class="modal-content">
        <button class="close-button" @click="$emit('close')" aria-label="Sluiten">
          &times;
        </button>

        <div class="modal-body">
          <div class="card-image-container">
            <img :src="card.images.large" :alt="card.name" class="card-image" />
          </div>

          <div class="card-details">
            <header class="card-header">
              <h2>{{ card.name }}</h2>
              <div class="card-meta">
                <span v-if="card.hp" class="hp">{{ card.hp }} HP</span>
                <span v-if="card.types" class="types">
                  {{ card.types.join(', ') }}
                </span>
              </div>
            </header>

            <div class="detail-section">
              <span class="label">Nummer</span>
              <span class="value">#{{ card.number }}</span>
            </div>

            <div v-if="card.supertype" class="detail-section">
              <span class="label">Type</span>
              <span class="value">{{ card.supertype }}</span>
            </div>

            <div v-if="card.subtypes?.length" class="detail-section">
              <span class="label">Subtypes</span>
              <span class="value">{{ card.subtypes.join(', ') }}</span>
            </div>

            <div v-if="card.evolvesFrom" class="detail-section">
              <span class="label">Evolueert van</span>
              <span class="value">{{ card.evolvesFrom }}</span>
            </div>

            <div v-if="card.abilities?.length" class="abilities-section">
              <h3>Abilities</h3>
              <div v-for="ability in card.abilities" :key="ability.name" class="ability">
                <div class="ability-header">
                  <span class="ability-name">{{ ability.name }}</span>
                  <span class="ability-type">{{ ability.type }}</span>
                </div>
                <p class="ability-text">{{ ability.text }}</p>
              </div>
            </div>

            <div v-if="card.attacks?.length" class="attacks-section">
              <h3>Attacks</h3>
              <div v-for="attack in card.attacks" :key="attack.name" class="attack">
                <div class="attack-header">
                  <span class="attack-cost">
                    <span v-for="(cost, i) in attack.cost" :key="i" class="energy">
                      {{ cost.charAt(0) }}
                    </span>
                  </span>
                  <span class="attack-name">{{ attack.name }}</span>
                  <span v-if="attack.damage" class="attack-damage">{{ attack.damage }}</span>
                </div>
                <p v-if="attack.text" class="attack-text">{{ attack.text }}</p>
              </div>
            </div>

            <div v-if="card.weaknesses?.length" class="detail-section">
              <span class="label">Zwakte</span>
              <span class="value">
                <span v-for="w in card.weaknesses" :key="w.type">
                  {{ w.type }} {{ w.value }}
                </span>
              </span>
            </div>

            <div v-if="card.resistances?.length" class="detail-section">
              <span class="label">Resistentie</span>
              <span class="value">
                <span v-for="r in card.resistances" :key="r.type">
                  {{ r.type }} {{ r.value }}
                </span>
              </span>
            </div>

            <div v-if="card.retreatCost?.length" class="detail-section">
              <span class="label">Terugtrekkosten</span>
              <span class="value">{{ card.retreatCost.length }}</span>
            </div>

            <div v-if="card.rarity" class="detail-section">
              <span class="label">Zeldzaamheid</span>
              <span class="value">{{ card.rarity }}</span>
            </div>

            <div v-if="card.artist" class="detail-section">
              <span class="label">Artiest</span>
              <span class="value">{{ card.artist }}</span>
            </div>

            <p v-if="card.flavorText" class="flavor-text">
              "{{ card.flavorText }}"
            </p>
          </div>
        </div>
      </div>

      <button
        v-if="hasNext"
        class="nav-button nav-next"
        @click="$emit('next')"
        aria-label="Volgende kaart"
      >
        <span class="nav-icon">&rsaquo;</span>
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
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

defineProps<{
  card: Card;
  hasPrevious: boolean;
  hasNext: boolean;
}>();

const emit = defineEmits<{
  close: [];
  previous: [];
  next: [];
}>();

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close');
  } else if (e.key === 'ArrowLeft') {
    emit('previous');
  } else if (e.key === 'ArrowRight') {
    emit('next');
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  z-index: 1001;
}

.nav-button:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.1);
}

.nav-prev {
  left: 1rem;
}

.nav-next {
  right: 1rem;
}

.nav-icon {
  font-size: 2rem;
  color: #374151;
  line-height: 1;
}

.modal-content {
  background: #fff;
  border-radius: 1rem;
  max-width: 900px;
  max-height: 90vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 10;
}

.close-button:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.modal-body {
  display: flex;
  overflow: hidden;
}

.card-image-container {
  flex-shrink: 0;
  padding: 2rem;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  max-height: 70vh;
  max-width: 100%;
  object-fit: contain;
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-details {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  max-height: 80vh;
}

.card-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-header h2 {
  font-size: 1.5rem;
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.hp {
  color: #dc2626;
  font-weight: 600;
}

.types {
  color: #6b7280;
}

.detail-section {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.label {
  color: #6b7280;
  font-size: 0.85rem;
}

.value {
  color: #1f2937;
  font-weight: 500;
  font-size: 0.85rem;
}

.abilities-section,
.attacks-section {
  margin-top: 1.5rem;
}

.abilities-section h3,
.attacks-section h3 {
  font-size: 0.9rem;
  color: #374151;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ability,
.attack {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.ability-header,
.attack-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.ability-name,
.attack-name {
  font-weight: 600;
  color: #1f2937;
}

.ability-type {
  font-size: 0.75rem;
  color: #6b7280;
  background: #e5e7eb;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.attack-cost {
  display: flex;
  gap: 0.125rem;
}

.energy {
  width: 1.25rem;
  height: 1.25rem;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: #374151;
}

.attack-damage {
  margin-left: auto;
  font-weight: 700;
  color: #dc2626;
}

.ability-text,
.attack-text {
  font-size: 0.8rem;
  color: #4b5563;
  margin: 0.25rem 0 0;
  line-height: 1.4;
}

.flavor-text {
  margin-top: 1.5rem;
  font-style: italic;
  color: #6b7280;
  font-size: 0.85rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .modal-body {
    flex-direction: column;
  }

  .card-image-container {
    padding: 1rem;
  }

  .card-image {
    max-height: 40vh;
  }

  .card-details {
    padding: 1rem;
    max-height: 50vh;
  }
}
</style>
