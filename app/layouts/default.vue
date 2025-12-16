<template>
  <div class="app-layout min-h-screen flex flex-col">
    <!-- Main Content -->
    <main class="app-main flex-1">
      <div class="container mx-auto px-4 py-6 max-w-7xl">
        <slot />
      </div>
    </main>

    <ClientOnly>
      <!-- Menu FAB (Top Right) -->
      <Button
        v-show="!showMenu"
        label="Menu"
        severity="secondary"
        size="large"
        class="fab-menu"
        aria-label="Menu"
        @click="showMenu = true"
      />

      <!-- Settings Dialog -->
      <SettingsDialog v-model:visible="showSettings" />

      <!-- Menu Drawer -->
      <MenuDrawer
        v-model:visible="showMenu"
        @settings="handleSettings"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import SettingsDialog from '~/components/settings/SettingsDialog.vue'
import MenuDrawer from '~/components/menu/MenuDrawer.vue'

const showSettings = ref(false)
const showMenu = ref(false)

function handleSettings() {
  showSettings.value = true
}
</script>

<style scoped>
.app-main {
  padding-top: 80px;
  background: var(--p-surface-50);
}

.dark .app-main {
  background: var(--p-surface-950);
}

.fab-menu {
  position: fixed !important;
  top: 1rem !important;
  right: 1rem !important;
  bottom: auto !important;
  left: auto !important;
  padding: 0.75rem 1.25rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: transparent !important;
  box-shadow: none !important;
  border-radius: 9999px !important;
  transition: all 0.2s ease;
  z-index: 40;
}

.fab-menu:hover,
.fab-menu:active,
.fab-menu:focus {
  background-color: var(--p-button-secondary-background) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
</style>
