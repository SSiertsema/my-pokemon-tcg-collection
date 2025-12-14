<template>
  <div class="collection-page">
    <div class="welcome-section">
      <h1>Welcome back, {{ displayName }}!</h1>
      <p class="welcome-subtitle">Here's your Pokemon TCG collection overview</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ collectionStore.ownedCount }}</div>
        <div class="stat-label">Cards Owned</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ collectionStore.wishlistCount }}</div>
        <div class="stat-label">On Wishlist</div>
      </div>
    </div>

    <div v-if="collectionStore.ownedCount === 0" class="empty-state">
      <p>You haven't added any cards to your collection yet.</p>
      <NuxtLink to="/" class="browse-link">Browse Sets</NuxtLink>
    </div>

    <div v-else class="collection-content">
      <h2>Your Collection</h2>
      <p class="collection-hint">
        Browse sets and click on cards to add them to your collection.
      </p>
      <NuxtLink to="/" class="browse-link">Browse Sets</NuxtLink>
    </div>
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
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.welcome-subtitle {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  color: #6b7280;
  margin-top: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.empty-state p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.browse-link {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}

.browse-link:hover {
  background: #2563eb;
}

.collection-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.collection-content h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #1f2937;
}

.collection-hint {
  color: #6b7280;
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
