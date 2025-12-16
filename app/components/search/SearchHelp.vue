<template>
  <div class="search-help">
    <button
      class="help-toggle"
      :aria-expanded="isExpanded"
      @click="toggleHelp"
    >
      <i :class="isExpanded ? 'pi pi-chevron-up' : 'pi pi-info-circle'" />
      <span>{{ isExpanded ? 'Hide search tips' : 'Search tips' }}</span>
    </button>

    <Transition name="slide">
      <div v-if="isExpanded" class="help-content">
        <p class="help-intro">Use modifiers to filter your search:</p>

        <div class="modifiers-grid">
          <div v-for="mod in modifiers" :key="mod.key" class="modifier">
            <code class="modifier-key">{{ mod.key }}</code>
            <span class="modifier-desc">{{ mod.description }}</span>
          </div>
        </div>

        <div class="examples-section">
          <span class="examples-label">Try:</span>
          <div class="examples">
            <button
              v-for="example in examples"
              :key="example"
              class="example-chip"
              @click="$emit('use-example', example)"
            >
              {{ example }}
            </button>
          </div>
        </div>

        <p class="help-tip">
          <i class="pi pi-lightbulb" />
          Use quotes for exact matches: <code>"Pikachu VMAX"</code>
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'use-example': [example: string];
}>();

const { getModifiers } = useSearchParser();

const STORAGE_KEY = 'search-help-expanded';

const isExpanded = ref(false);
const modifiers = getModifiers();

const examples = [
  'Charizard type:fire',
  'is:trainer rarity:rare',
  'Pikachu type:lightning',
  '"Mewtwo EX"',
];

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    isExpanded.value = stored === 'true';
  }
});

function toggleHelp() {
  isExpanded.value = !isExpanded.value;
  localStorage.setItem(STORAGE_KEY, String(isExpanded.value));
}
</script>

<style scoped>
.search-help {
  margin-top: 0.5rem;
}

.help-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  background: none;
  border: none;
  color: var(--p-primary-color);
  font-size: 0.8125rem;
  cursor: pointer;
  border-radius: var(--p-border-radius);
  transition: background-color 0.15s;
}

.help-toggle:hover {
  background: var(--p-surface-100);
}

.help-toggle i {
  font-size: 0.875rem;
}

.help-content {
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--p-surface-50);
  border: 1px solid var(--p-surface-200);
  border-radius: var(--p-border-radius);
}

.help-intro {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  color: var(--p-text-color);
}

.modifiers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem 1.5rem;
  margin-bottom: 1rem;
}

.modifier {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.modifier-key {
  font-family: monospace;
  font-size: 0.8125rem;
  padding: 0.125rem 0.375rem;
  background: var(--p-surface-200);
  border-radius: 3px;
  color: var(--p-primary-color);
  white-space: nowrap;
}

.modifier-desc {
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
}

.examples-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.examples-label {
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
}

.examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.example-chip {
  padding: 0.25rem 0.625rem;
  background: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
  border: none;
  border-radius: 1rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: opacity 0.15s;
}

.example-chip:hover {
  opacity: 0.85;
}

.help-tip {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.help-tip i {
  color: var(--p-yellow-500);
}

.help-tip code {
  font-family: monospace;
  padding: 0.125rem 0.375rem;
  background: var(--p-surface-200);
  border-radius: 3px;
}

/* Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (max-width: 600px) {
  .modifiers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
