<template>
  <div class="confirm-container">
    <div class="confirm-card">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Bezig met inloggen...</p>
      </div>

      <div v-else-if="error" class="error">
        <h2>Er ging iets mis</h2>
        <p>{{ error }}</p>
        <NuxtLink to="/login" class="btn-primary">Terug naar login</NuxtLink>
      </div>

      <div v-else class="success">
        <h2>Ingelogd!</h2>
        <p>Je wordt doorgestuurd...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

const user = useSupabaseUser();
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  // Small delay to allow Supabase to process the callback
  await new Promise((resolve) => setTimeout(resolve, 500));
  loading.value = false;
});

watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/');
  }
}, { immediate: true });
</script>

<style scoped>
.confirm-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f9fafb;
}

.confirm-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading p,
.success p {
  color: #6b7280;
}

h2 {
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.error {
  color: #dc2626;
}

.error p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.btn-primary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
}

.btn-primary:hover {
  background: #2563eb;
}
</style>
