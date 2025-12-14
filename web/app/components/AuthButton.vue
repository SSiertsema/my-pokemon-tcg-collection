<template>
  <div class="auth-button">
    <template v-if="user">
      <NuxtLink to="/profile" class="user-info">
        <span class="user-email">{{ user.email }}</span>
      </NuxtLink>
      <button class="btn-logout" @click="handleLogout">
        Uitloggen
      </button>
    </template>
    <template v-else>
      <NuxtLink to="/login" class="btn-login">
        Inloggen
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

async function handleLogout() {
  await supabase.auth.signOut();
  navigateTo('/');
}
</script>

<style scoped>
.auth-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #374151;
}

.user-email {
  font-size: 0.875rem;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-info:hover .user-email {
  color: #3b82f6;
}

.btn-login {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.15s;
}

.btn-login:hover {
  background: #2563eb;
}

.btn-logout {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.btn-logout:hover {
  background: #e5e7eb;
  color: #374151;
}

@media (max-width: 640px) {
  .user-email {
    display: none;
  }
}
</style>
