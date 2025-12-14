<template>
  <div class="layout">
    <Toolbar class="navbar">
      <template #start>
        <div class="nav-start">
          <NuxtLink to="/" class="brand">
            <i class="pi pi-box mr-2" />
            Pokemon TCG Collection
          </NuxtLink>
          <Button
            v-if="user"
            as="router-link"
            to="/collection"
            label="My Collection"
            icon="pi pi-folder"
            text
          />
        </div>
      </template>

      <template #end>
        <AuthButton />
      </template>
    </Toolbar>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}

.nav-start {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--p-text-color);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: var(--p-border-radius);
  transition: background-color 0.2s;
}

.brand:hover {
  background-color: var(--p-surface-100);
}

.mr-2 {
  margin-right: 0.5rem;
}

.main-content {
  flex: 1;
  background: var(--p-surface-50);
}

@media (max-width: 640px) {
  .brand {
    font-size: 1rem;
  }
}
</style>
