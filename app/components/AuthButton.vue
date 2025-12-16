<template>
  <div class="auth-actions">
    <template v-if="user">
      <Button
        as="router-link"
        to="/profile"
        :label="user.email || 'Profile'"
        icon="pi pi-user"
        text
        class="user-button"
      />
      <Button
        label="Uitloggen"
        icon="pi pi-sign-out"
        severity="secondary"
        outlined
        size="small"
        @click="handleLogout"
      />
    </template>
    <template v-else>
      <Button
        as="router-link"
        to="/login"
        label="Inloggen"
        icon="pi pi-sign-in"
        size="small"
      />
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
.auth-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-button :deep(.p-button-label) {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .user-button :deep(.p-button-label) {
    display: none;
  }
}
</style>
