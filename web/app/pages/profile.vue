<template>
  <div class="profile-container">
    <Card class="profile-card">
      <template #title>
        <h1>Profiel</h1>
      </template>

      <template #content>
        <div v-if="user" class="profile-info">
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">{{ user.email }}</span>
          </div>

          <div class="info-row">
            <span class="info-label">Aangemaakt op</span>
            <span class="info-value">{{ formatDate(user.created_at) }}</span>
          </div>

          <div class="info-row">
            <span class="info-label">Provider</span>
            <Tag :value="provider" />
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
          <Button
            label="Uitloggen"
            icon="pi pi-sign-out"
            severity="danger"
            fluid
            @click="handleLogout"
          />
        </div>

        <Button
          as="router-link"
          to="/"
          label="Terug naar sets"
          icon="pi pi-arrow-left"
          text
          class="back-link"
        />
      </template>
    </Card>
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
}

.profile-card {
  width: 100%;
  max-width: 500px;
}

.profile-card h1 {
  margin: 0;
  font-size: 1.5rem;
}

h2 {
  color: var(--p-text-color);
  font-size: 1rem;
  margin: 0 0 1rem;
}

.profile-info {
  margin-bottom: 2rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--p-surface-200);
}

.info-label {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.info-value {
  color: var(--p-text-color);
  font-weight: 500;
  font-size: 0.875rem;
}

.profile-stats {
  background: var(--p-surface-50);
  padding: 1rem;
  border-radius: var(--p-border-radius);
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
  color: var(--p-primary-color);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}

.profile-actions {
  margin-bottom: 1.5rem;
}

.back-link {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
