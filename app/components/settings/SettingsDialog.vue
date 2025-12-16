<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="Theme"
    :style="{ width: '90vw', maxWidth: '600px' }"
    :dismissable-mask="true"
  >
    <div class="settings-content">
      <ThemeSettings />
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          label="Close"
          severity="secondary"
          @click="close"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import ThemeSettings from './ThemeSettings.vue'

const isVisible = defineModel<boolean>('visible', { default: false })

const close = () => {
  isVisible.value = false
}
</script>

<style scoped>
.settings-content {
  padding: 0.5rem 0;
}
</style>
