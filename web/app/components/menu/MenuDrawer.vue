<template>
  <Drawer v-model:visible="visible" position="right" class="w-80">
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between w-full">
        <h2 class="text-xl font-semibold">Menu</h2>
      </div>
    </template>

    <!-- Menu Items -->
    <div class="flex flex-col gap-4">
      <!-- Navigation Links -->
      <div class="menu-group">
        <NuxtLink
          to="/"
          class="menu-link"
          @click="visible = false"
        >
          <i class="pi pi-home mr-2"></i>
          Sets Browser
        </NuxtLink>

        <NuxtLink
          to="/search"
          class="menu-link"
          @click="visible = false"
        >
          <i class="pi pi-search mr-2"></i>
          Search Cards
        </NuxtLink>

        <NuxtLink
          v-if="user"
          to="/collection"
          class="menu-link"
          @click="visible = false"
        >
          <i class="pi pi-folder mr-2"></i>
          My Collection
        </NuxtLink>

        <NuxtLink
          v-if="user"
          to="/profile"
          class="menu-link"
          @click="visible = false"
        >
          <i class="pi pi-user mr-2"></i>
          Profile
        </NuxtLink>
      </div>

      <!-- Auth Section -->
      <div class="menu-group">
        <template v-if="user">
          <div class="user-info px-1 py-2 text-sm text-surface-500">
            {{ user.email }}
          </div>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            severity="secondary"
            class="w-full justify-start"
            @click="handleLogout"
          />
        </template>
        <template v-else>
          <Button
            label="Login"
            icon="pi pi-sign-in"
            severity="primary"
            class="w-full justify-start"
            @click="handleLogin"
          />
        </template>
      </div>

      <!-- Settings -->
      <div class="menu-group">
        <Button
          label="Theme"
          icon="pi pi-palette"
          severity="secondary"
          class="w-full justify-start"
          @click="handleSettings"
        />
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>('visible', { default: false })
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const emit = defineEmits<{
  settings: []
}>()

function handleSettings() {
  emit('settings')
  visible.value = false
}

async function handleLogout() {
  await supabase.auth.signOut()
  visible.value = false
  navigateTo('/')
}

function handleLogin() {
  visible.value = false
  navigateTo('/login')
}
</script>

<style scoped>
:deep(.p-button) {
  text-align: left;
}

.menu-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: var(--p-border-radius);
  color: var(--p-text-color);
  text-decoration: none;
  transition: all 0.2s;
}

.menu-link:hover {
  background: var(--p-surface-100);
}

.dark .menu-link:hover {
  background: var(--p-surface-700);
}

.mr-2 {
  margin-right: 0.5rem;
}

.user-info {
  color: var(--p-text-muted-color);
}

/* Ensure menu drawer is always on top */
:deep(.p-drawer) {
  z-index: 10000 !important;
}

:deep(.p-drawer-mask) {
  z-index: 9999 !important;
}

/* Make close button perfectly round */
:deep(.p-drawer-close-button) {
  border-radius: 50% !important;
  width: 2rem !important;
  height: 2rem !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
