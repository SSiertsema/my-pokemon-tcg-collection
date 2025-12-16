<template>
  <div class="theme-settings">
    <!-- Preset Theme Selection -->
    <div class="mb-8">
      <label class="block text-sm font-medium mb-3">Design Style</label>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="preset in themeStore.availablePresets"
          :key="preset.value"
          class="preset-card"
          :class="{ 'preset-card-active': themeStore.currentPreset === preset.value }"
          @click="handlePresetChange(preset.value)"
        >
          <div class="flex items-center gap-3">
            <i :class="`pi ${preset.icon} text-xl`"></i>
            <div class="flex-1">
              <div class="font-semibold">{{ preset.name }}</div>
              <div class="text-xs text-surface-500">{{ preset.description }}</div>
            </div>
            <i
              v-if="themeStore.currentPreset === preset.value"
              class="pi pi-check text-primary"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Color Selection -->
    <div class="mb-8">
      <label class="block text-sm font-medium mb-3">Color Scheme</label>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="color in themeStore.availableColors"
          :key="color.value"
          class="color-swatch"
          :class="{ 'color-swatch-active': themeStore.currentColor === color.value }"
          :style="{ backgroundColor: getColorValue(color.value) }"
          @click="handleColorChange(color.value)"
          v-tooltip.top="color.name"
          :aria-label="`Select ${color.name} color`"
        >
          <i
            v-if="themeStore.currentColor === color.value"
            class="pi pi-check text-white drop-shadow"
          ></i>
        </button>
      </div>
    </div>

    <!-- Appearance Mode Selection -->
    <div class="mb-8">
      <label class="block text-sm font-medium mb-3">Appearance</label>
      <div class="flex gap-2">
        <Button
          v-for="mode in themeStore.availableModes"
          :key="mode.value"
          :label="mode.name"
          :icon="`pi ${mode.icon}`"
          :outlined="themeStore.currentMode !== mode.value"
          :severity="themeStore.currentMode === mode.value ? 'primary' : 'secondary'"
          @click="handleModeChange(mode.value)"
          class="flex-1"
        />
      </div>
      <p class="text-xs text-surface-500 mt-2">
        {{ getCurrentModeDescription() }}
      </p>
    </div>

    <!-- Font Family Selection -->
    <div>
      <label class="block text-sm font-medium mb-3">Typography</label>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="font in themeStore.availableFonts"
          :key="font.key"
          class="font-card"
          :class="{ 'font-card-active': themeStore.currentFont === font.key }"
          @click="handleFontChange(font.key)"
        >
          <div class="font-card-title mb-3">{{ font.name }}</div>
          <div
            class="font-preview-sample"
            :style="`font-family: ${font.value} !important;`"
          >
            {{ font.preview }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PresetTheme, Theme, ThemeColor, FontFamily } from '~/types/theme'

const themeStore = useThemeStore()
const { switchPreset, switchColor, setMode, switchFont } = useTheme()

const handlePresetChange = (preset: PresetTheme) => {
  switchPreset(preset)
  themeStore.setPreset(preset)
}

const handleColorChange = (color: ThemeColor) => {
  switchColor(color)
  themeStore.setColor(color)
}

const handleModeChange = (mode: Theme) => {
  setMode(mode)
  themeStore.setMode(mode)
}

const handleFontChange = (font: FontFamily) => {
  switchFont(font)
  themeStore.setFont(font)
}

const getCurrentModeDescription = () => {
  const descriptions = {
    light: 'Always use light appearance',
    dark: 'Always use dark appearance',
    auto: 'Automatically switch between light and dark based on your system settings',
  }
  return descriptions[themeStore.currentMode]
}

const getColorValue = (color: ThemeColor): string => {
  const colorMap: Record<ThemeColor, string> = {
    emerald: '#10b981',
    green: '#22c55e',
    lime: '#84cc16',
    red: '#ef4444',
    orange: '#f97316',
    amber: '#f59e0b',
    yellow: '#eab308',
    teal: '#14b8a6',
    cyan: '#06b6d4',
    sky: '#0ea5e9',
    blue: '#3b82f6',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    purple: '#a855f7',
    fuchsia: '#d946ef',
    pink: '#ec4899',
    rose: '#f43f5e',
    slate: '#64748b',
    gray: '#6b7280',
    zinc: '#71717a',
    neutral: '#737373',
    stone: '#78716c',
  }
  return colorMap[color]
}
</script>

<style scoped>
.preset-card {
  padding: 1rem;
  border: 2px solid var(--p-surface-200);
  border-radius: var(--p-border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--p-surface-0);
}

.preset-card:hover {
  border-color: var(--p-surface-300);
  background: var(--p-surface-50);
}

.preset-card-active {
  border-color: var(--p-primary-color);
  background: var(--p-highlight-background);
}

.dark .preset-card {
  background: var(--p-surface-900);
}

.dark .preset-card:hover {
  background: var(--p-surface-800);
}

.dark .preset-card-active {
  background: var(--p-surface-800);
}

.color-swatch {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-swatch:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.color-swatch-active {
  border-color: var(--p-surface-900);
  box-shadow: 0 0 0 2px var(--p-surface-0), 0 0 0 4px var(--p-surface-900);
}

.dark .color-swatch-active {
  border-color: var(--p-surface-0);
  box-shadow: 0 0 0 2px var(--p-surface-900), 0 0 0 4px var(--p-surface-0);
}

.font-card {
  padding: 1.25rem;
  border: 2px solid var(--p-surface-200);
  border-radius: var(--p-border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--p-surface-0);
}

.font-card:hover {
  border-color: var(--p-surface-300);
  background: var(--p-surface-50);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.font-card-active {
  border-color: var(--p-primary-color);
  background: var(--p-highlight-background);
  box-shadow: 0 0 0 1px var(--p-primary-color);
}

.dark .font-card {
  background: var(--p-surface-900);
}

.dark .font-card:hover {
  background: var(--p-surface-800);
}

.dark .font-card-active {
  background: var(--p-surface-800);
}

.font-card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-text-color);
  font-family: var(--app-font-family);
}

.font-preview-sample {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--p-text-muted-color);
  /* Allow inline style to set the font */
}
</style>
