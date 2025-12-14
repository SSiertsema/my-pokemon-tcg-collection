<template>
  <div class="collection-page">
    <div class="welcome-section">
      <h1>Welcome back, {{ displayName }}!</h1>
      <p class="welcome-subtitle">Here's your Pokemon TCG collection overview</p>
    </div>

    <div class="stats-grid">
      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <span class="stat-value">{{ collectionStore.ownedCount }}</span>
            <span class="stat-label">Cards Owned</span>
          </div>
        </template>
      </Card>
      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <span class="stat-value">{{ collectionStore.wishlistCount }}</span>
            <span class="stat-label">On Wishlist</span>
          </div>
        </template>
      </Card>
    </div>

    <Card v-if="collectionStore.ownedCount === 0" class="empty-state-card">
      <template #content>
        <div class="empty-state">
          <i class="pi pi-inbox empty-icon" />
          <p>You haven't added any cards to your collection yet.</p>
          <Button
            as="router-link"
            to="/"
            label="Browse Sets"
            icon="pi pi-search"
          />
        </div>
      </template>
    </Card>

    <Card v-else>
      <template #title>
        Your Collection
      </template>
      <template #content>
        <p class="collection-hint">
          Browse sets and click on cards to add them to your collection.
        </p>
        <Button
          as="router-link"
          to="/"
          label="Browse Sets"
          icon="pi pi-search"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useCollectionStore } from '~/stores/collection';

definePageMeta({
  middleware: 'auth',
});

const user = useSupabaseUser();
const collectionStore = useCollectionStore();

const displayName = computed(() => {
  if (!user.value) return '';

  const email = user.value.email || '';
  const name = user.value.user_metadata?.full_name || user.value.user_metadata?.name;

  if (name) return name;

  // Extract name from email (before @)
  return email.split('@')[0];
});
</script>

<style scoped>
.collection-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
}

.welcome-section h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--p-text-color);
  margin: 0 0 0.5rem 0;
}

.welcome-subtitle {
  color: var(--p-text-muted-color);
  font-size: 1.125rem;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card :deep(.p-card-body) {
  padding: 1.5rem;
}

.stat-content {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--p-primary-color);
}

.stat-label {
  display: block;
  color: var(--p-text-muted-color);
  margin-top: 0.5rem;
}

.empty-state-card :deep(.p-card-body) {
  padding: 0;
}

.empty-state {
  text-align: center;
  padding: 3rem;
}

.empty-icon {
  font-size: 3rem;
  color: var(--p-text-muted-color);
  opacity: 0.5;
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--p-text-muted-color);
  margin: 0 0 1.5rem 0;
}

.collection-hint {
  color: var(--p-text-muted-color);
  margin: 0 0 1.5rem 0;
}

@media (max-width: 640px) {
  .collection-page {
    padding: 1rem;
  }

  .welcome-section h1 {
    font-size: 1.5rem;
  }

  .stat-value {
    font-size: 2rem;
  }
}
</style>
