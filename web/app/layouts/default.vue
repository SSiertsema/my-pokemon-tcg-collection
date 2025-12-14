<template>
  <div class="layout">
    <nav class="navbar">
      <div class="navbar-content">
        <div class="navbar-left">
          <NuxtLink to="/" class="navbar-brand">
            Pokemon TCG Collection
          </NuxtLink>
          <NuxtLink v-if="user" to="/collection" class="nav-link">
            My Collection
          </NuxtLink>
        </div>
        <AuthButton />
      </div>
    </nav>
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
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #3b82f6;
}

.navbar-brand {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
}

.navbar-brand:hover {
  color: #3b82f6;
}

.main-content {
  flex: 1;
  background: #f9fafb;
}

@media (max-width: 640px) {
  .navbar {
    padding: 0.5rem 1rem;
  }

  .navbar-brand {
    font-size: 1rem;
  }
}
</style>
