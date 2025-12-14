<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1>Profiel</h1>

      <div v-if="user" class="profile-info">
        <div class="info-row">
          <span class="label">Email</span>
          <span class="value">{{ user.email }}</span>
        </div>

        <div class="info-row">
          <span class="label">Aangemaakt op</span>
          <span class="value">{{ formatDate(user.created_at) }}</span>
        </div>

        <div class="info-row">
          <span class="label">Provider</span>
          <span class="value">{{ provider }}</span>
        </div>
      </div>

      <div class="profile-stats">
        <h2>Collectie statistieken</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ collectionStore.ownedCount }}</span>
            <span class="stat-label">Kaarten in bezit</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ collectionStore.wishlistCount }}</span>
            <span class="stat-label">Op wishlist</span>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <button class="btn-logout" @click="handleLogout">
          Uitloggen
        </button>
      </div>

      <NuxtLink to="/" class="back-link">&larr; Terug naar sets</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCollectionStore } from '~/stores/collection';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const collectionStore = useCollectionStore();

definePageMeta({
  middleware: 'auth',
});

const provider = computed(() => {
  if (!user.value) return '';
  const identity = user.value.app_metadata?.provider;
  if (identity === 'email') return 'Email';
  if (identity === 'google') return 'Google';
  if (identity === 'github') return 'GitHub';
  if (identity === 'azure') return 'Microsoft';
  return identity || 'Email';
});

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function handleLogout() {
  await supabase.auth.signOut();
  navigateTo('/');
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
  background: #f9fafb;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h1 {
  color: #1f2937;
  margin: 0 0 1.5rem;
}

h2 {
  color: #374151;
  font-size: 1rem;
  margin: 0 0 1rem;
}

.profile-info {
  margin-bottom: 2rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.label {
  color: #6b7280;
  font-size: 0.875rem;
}

.value {
  color: #1f2937;
  font-weight: 500;
  font-size: 0.875rem;
}

.profile-stats {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.profile-actions {
  margin-bottom: 1.5rem;
}

.btn-logout {
  width: 100%;
  padding: 0.75rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-logout:hover {
  background: #b91c1c;
}

.back-link {
  display: block;
  text-align: center;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
