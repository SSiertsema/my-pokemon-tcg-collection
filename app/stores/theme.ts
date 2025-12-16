import { defineStore } from 'pinia'
import type { PresetTheme, Theme, ThemeColor, FontFamily } from '~/types/theme'
import { THEME_COLORS, FONT_FAMILIES } from '~/types/theme'

interface ThemeState {
  preset: PresetTheme
  color: ThemeColor
  mode: Theme
  font: FontFamily
  isDark: boolean
}

/**
 * Pinia store for theme management
 * Provides reactive state for theme preset and appearance mode
 */
export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    preset: 'aura',
    color: 'emerald',
    mode: 'auto',
    font: 'raleway',
    isDark: false,
  }),

  getters: {
    /**
     * Get current preset theme name
     */
    currentPreset: (state): PresetTheme => state.preset,

    /**
     * Get current theme color
     */
    currentColor: (state): ThemeColor => state.color,

    /**
     * Get current appearance mode
     */
    currentMode: (state): Theme => state.mode,

    /**
     * Get current font family
     */
    currentFont: (state): FontFamily => state.font,

    /**
     * Check if dark mode is active
     */
    isCurrentlyDark: (state): boolean => state.isDark,

    /**
     * Get theme info for UI display
     */
    presetInfo: (state) => {
      const info = {
        aura: {
          name: 'Aura',
          description: 'Modern and clean design with rounded corners',
          icon: 'pi-sparkles',
        },
        lara: {
          name: 'Lara',
          description: 'Material Design inspired with subtle shadows',
          icon: 'pi-box',
        },
        material: {
          name: 'Material',
          description: 'Google Material Design implementation',
          icon: 'pi-palette',
        },
        nora: {
          name: 'Nora',
          description: 'Minimalist and flat design style',
          icon: 'pi-minus',
        },
      }

      return info[state.preset]
    },

    /**
     * Get all available presets with metadata
     */
    availablePresets: () => {
      return [
        {
          value: 'aura' as PresetTheme,
          name: 'Aura',
          description: 'Modern and clean design',
          icon: 'pi-sparkles',
        },
        {
          value: 'lara' as PresetTheme,
          name: 'Lara',
          description: 'Material Design inspired',
          icon: 'pi-box',
        },
        {
          value: 'material' as PresetTheme,
          name: 'Material',
          description: 'Google Material Design',
          icon: 'pi-palette',
        },
        {
          value: 'nora' as PresetTheme,
          name: 'Nora',
          description: 'Minimalist flat design',
          icon: 'pi-minus',
        },
      ]
    },

    /**
     * Get all available appearance modes
     */
    availableModes: () => {
      return [
        {
          value: 'light' as Theme,
          name: 'Light',
          description: 'Light appearance',
          icon: 'pi-sun',
        },
        {
          value: 'dark' as Theme,
          name: 'Dark',
          description: 'Dark appearance',
          icon: 'pi-moon',
        },
        {
          value: 'auto' as Theme,
          name: 'Auto',
          description: 'Follow system preference',
          icon: 'pi-sync',
        },
      ]
    },

    /**
     * Get all available theme colors
     */
    availableColors: () => {
      return Object.entries(THEME_COLORS).map(([key, data]) => ({
        value: key as ThemeColor,
        ...data,
      }))
    },

    /**
     * Get all available font families
     */
    availableFonts: () => {
      return Object.entries(FONT_FAMILIES).map(([key, data]) => ({
        ...data,
        key: key as FontFamily,  // The FontFamily type key (e.g., 'lora')
        // value remains as the CSS font name (e.g., 'Lora')
      }))
    },
  },

  actions: {
    /**
     * Update preset theme
     */
    setPreset(preset: PresetTheme) {
      this.preset = preset
    },

    /**
     * Update theme color
     */
    setColor(color: ThemeColor) {
      this.color = color
    },

    /**
     * Update appearance mode
     */
    setMode(mode: Theme) {
      this.mode = mode
    },

    /**
     * Update font family
     */
    setFont(font: FontFamily) {
      this.font = font
    },

    /**
     * Update dark mode state
     */
    setDark(isDark: boolean) {
      this.isDark = isDark
    },

    /**
     * Initialize theme from composable
     */
    init(preset: PresetTheme, color: ThemeColor, mode: Theme, font: FontFamily, isDark: boolean) {
      this.preset = preset
      this.color = color
      this.mode = mode
      this.font = font
      this.isDark = isDark
    },
  },
})
