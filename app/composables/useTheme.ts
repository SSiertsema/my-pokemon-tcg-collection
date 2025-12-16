import { usePreset } from '@primeuix/styled'
import { definePreset } from '@primeuix/themes'
import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'
import Material from '@primevue/themes/material'
import Nora from '@primevue/themes/nora'
import type { PresetTheme, Theme, ThemeColor, FontFamily } from '~/types/theme'
import { FONT_FAMILIES } from '~/types/theme'

const STORAGE_KEYS = {
  PRESET: 'theme-preset',
  COLOR: 'theme-color',
  MODE: 'theme-mode',
  FONT: 'theme-font',
} as const

const PRESET_THEMES = {
  aura: Aura,
  lara: Lara,
  material: Material,
  nora: Nora,
} as const

/**
 * Color palette mappings for PrimeVue primitive colors
 * Maps each ThemeColor to its corresponding primitive color palette
 */
const COLOR_PALETTES: Record<ThemeColor, Record<number, string>> = {
  emerald: {
    50: '{emerald.50}',
    100: '{emerald.100}',
    200: '{emerald.200}',
    300: '{emerald.300}',
    400: '{emerald.400}',
    500: '{emerald.500}',
    600: '{emerald.600}',
    700: '{emerald.700}',
    800: '{emerald.800}',
    900: '{emerald.900}',
    950: '{emerald.950}',
  },
  green: {
    50: '{green.50}',
    100: '{green.100}',
    200: '{green.200}',
    300: '{green.300}',
    400: '{green.400}',
    500: '{green.500}',
    600: '{green.600}',
    700: '{green.700}',
    800: '{green.800}',
    900: '{green.900}',
    950: '{green.950}',
  },
  lime: {
    50: '{lime.50}',
    100: '{lime.100}',
    200: '{lime.200}',
    300: '{lime.300}',
    400: '{lime.400}',
    500: '{lime.500}',
    600: '{lime.600}',
    700: '{lime.700}',
    800: '{lime.800}',
    900: '{lime.900}',
    950: '{lime.950}',
  },
  red: {
    50: '{red.50}',
    100: '{red.100}',
    200: '{red.200}',
    300: '{red.300}',
    400: '{red.400}',
    500: '{red.500}',
    600: '{red.600}',
    700: '{red.700}',
    800: '{red.800}',
    900: '{red.900}',
    950: '{red.950}',
  },
  orange: {
    50: '{orange.50}',
    100: '{orange.100}',
    200: '{orange.200}',
    300: '{orange.300}',
    400: '{orange.400}',
    500: '{orange.500}',
    600: '{orange.600}',
    700: '{orange.700}',
    800: '{orange.800}',
    900: '{orange.900}',
    950: '{orange.950}',
  },
  amber: {
    50: '{amber.50}',
    100: '{amber.100}',
    200: '{amber.200}',
    300: '{amber.300}',
    400: '{amber.400}',
    500: '{amber.500}',
    600: '{amber.600}',
    700: '{amber.700}',
    800: '{amber.800}',
    900: '{amber.900}',
    950: '{amber.950}',
  },
  yellow: {
    50: '{yellow.50}',
    100: '{yellow.100}',
    200: '{yellow.200}',
    300: '{yellow.300}',
    400: '{yellow.400}',
    500: '{yellow.500}',
    600: '{yellow.600}',
    700: '{yellow.700}',
    800: '{yellow.800}',
    900: '{yellow.900}',
    950: '{yellow.950}',
  },
  teal: {
    50: '{teal.50}',
    100: '{teal.100}',
    200: '{teal.200}',
    300: '{teal.300}',
    400: '{teal.400}',
    500: '{teal.500}',
    600: '{teal.600}',
    700: '{teal.700}',
    800: '{teal.800}',
    900: '{teal.900}',
    950: '{teal.950}',
  },
  cyan: {
    50: '{cyan.50}',
    100: '{cyan.100}',
    200: '{cyan.200}',
    300: '{cyan.300}',
    400: '{cyan.400}',
    500: '{cyan.500}',
    600: '{cyan.600}',
    700: '{cyan.700}',
    800: '{cyan.800}',
    900: '{cyan.900}',
    950: '{cyan.950}',
  },
  sky: {
    50: '{sky.50}',
    100: '{sky.100}',
    200: '{sky.200}',
    300: '{sky.300}',
    400: '{sky.400}',
    500: '{sky.500}',
    600: '{sky.600}',
    700: '{sky.700}',
    800: '{sky.800}',
    900: '{sky.900}',
    950: '{sky.950}',
  },
  blue: {
    50: '{blue.50}',
    100: '{blue.100}',
    200: '{blue.200}',
    300: '{blue.300}',
    400: '{blue.400}',
    500: '{blue.500}',
    600: '{blue.600}',
    700: '{blue.700}',
    800: '{blue.800}',
    900: '{blue.900}',
    950: '{blue.950}',
  },
  indigo: {
    50: '{indigo.50}',
    100: '{indigo.100}',
    200: '{indigo.200}',
    300: '{indigo.300}',
    400: '{indigo.400}',
    500: '{indigo.500}',
    600: '{indigo.600}',
    700: '{indigo.700}',
    800: '{indigo.800}',
    900: '{indigo.900}',
    950: '{indigo.950}',
  },
  violet: {
    50: '{violet.50}',
    100: '{violet.100}',
    200: '{violet.200}',
    300: '{violet.300}',
    400: '{violet.400}',
    500: '{violet.500}',
    600: '{violet.600}',
    700: '{violet.700}',
    800: '{violet.800}',
    900: '{violet.900}',
    950: '{violet.950}',
  },
  purple: {
    50: '{purple.50}',
    100: '{purple.100}',
    200: '{purple.200}',
    300: '{purple.300}',
    400: '{purple.400}',
    500: '{purple.500}',
    600: '{purple.600}',
    700: '{purple.700}',
    800: '{purple.800}',
    900: '{purple.900}',
    950: '{purple.950}',
  },
  fuchsia: {
    50: '{fuchsia.50}',
    100: '{fuchsia.100}',
    200: '{fuchsia.200}',
    300: '{fuchsia.300}',
    400: '{fuchsia.400}',
    500: '{fuchsia.500}',
    600: '{fuchsia.600}',
    700: '{fuchsia.700}',
    800: '{fuchsia.800}',
    900: '{fuchsia.900}',
    950: '{fuchsia.950}',
  },
  pink: {
    50: '{pink.50}',
    100: '{pink.100}',
    200: '{pink.200}',
    300: '{pink.300}',
    400: '{pink.400}',
    500: '{pink.500}',
    600: '{pink.600}',
    700: '{pink.700}',
    800: '{pink.800}',
    900: '{pink.900}',
    950: '{pink.950}',
  },
  rose: {
    50: '{rose.50}',
    100: '{rose.100}',
    200: '{rose.200}',
    300: '{rose.300}',
    400: '{rose.400}',
    500: '{rose.500}',
    600: '{rose.600}',
    700: '{rose.700}',
    800: '{rose.800}',
    900: '{rose.900}',
    950: '{rose.950}',
  },
  slate: {
    50: '{slate.50}',
    100: '{slate.100}',
    200: '{slate.200}',
    300: '{slate.300}',
    400: '{slate.400}',
    500: '{slate.500}',
    600: '{slate.600}',
    700: '{slate.700}',
    800: '{slate.800}',
    900: '{slate.900}',
    950: '{slate.950}',
  },
  gray: {
    50: '{gray.50}',
    100: '{gray.100}',
    200: '{gray.200}',
    300: '{gray.300}',
    400: '{gray.400}',
    500: '{gray.500}',
    600: '{gray.600}',
    700: '{gray.700}',
    800: '{gray.800}',
    900: '{gray.900}',
    950: '{gray.950}',
  },
  zinc: {
    50: '{zinc.50}',
    100: '{zinc.100}',
    200: '{zinc.200}',
    300: '{zinc.300}',
    400: '{zinc.400}',
    500: '{zinc.500}',
    600: '{zinc.600}',
    700: '{zinc.700}',
    800: '{zinc.800}',
    900: '{zinc.900}',
    950: '{zinc.950}',
  },
  neutral: {
    50: '{neutral.50}',
    100: '{neutral.100}',
    200: '{neutral.200}',
    300: '{neutral.300}',
    400: '{neutral.400}',
    500: '{neutral.500}',
    600: '{neutral.600}',
    700: '{neutral.700}',
    800: '{neutral.800}',
    900: '{neutral.900}',
    950: '{neutral.950}',
  },
  stone: {
    50: '{stone.50}',
    100: '{stone.100}',
    200: '{stone.200}',
    300: '{stone.300}',
    400: '{stone.400}',
    500: '{stone.500}',
    600: '{stone.600}',
    700: '{stone.700}',
    800: '{stone.800}',
    900: '{stone.900}',
    950: '{stone.950}',
  },
}

/**
 * Composable for managing application theme
 * Handles preset theme switching, color selection, and dark mode (light/dark/auto)
 */
export function useTheme() {
  const isDark = ref(false)
  const currentPreset = ref<PresetTheme>('aura')
  const currentColor = ref<ThemeColor>('emerald')
  const currentMode = ref<Theme>('auto')
  const currentFont = ref<FontFamily>('raleway')
  const isReady = ref(false)

  /**
   * Apply a theme preset with a color palette using definePreset
   */
  const applyTheme = (preset: PresetTheme, color: ThemeColor) => {
    const basePreset = PRESET_THEMES[preset]
    const colorPalette = COLOR_PALETTES[color]

    // Create a custom preset by combining base preset with color palette
    const customPreset = definePreset(basePreset, {
      semantic: {
        primary: colorPalette,
      },
    })

    usePreset(customPreset)
  }

  /**
   * Apply font family by updating CSS variable
   */
  const applyFont = (font: FontFamily) => {
    if (!import.meta.client) return

    const fontConfig = FONT_FAMILIES[font]
    const themeFontStack = `${fontConfig.value}, ${getFallbackFonts(font)}`

    // Body font stays fixed for readability (Inter)
    const bodyFontStack = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

    // Update CSS variables on document root
    // Theme font for headlines and interactive elements
    document.documentElement.style.setProperty('--app-font-theme', themeFontStack)

    // Body font for readable text
    document.documentElement.style.setProperty('--app-font-body', bodyFontStack)

    // PrimeVue uses body font by default for readability
    document.documentElement.style.setProperty('--p-font-family', bodyFontStack)
    document.documentElement.style.setProperty('--font-family', bodyFontStack)
  }

  /**
   * Get fallback fonts for a given font family
   */
  const getFallbackFonts = (font: FontFamily): string => {
    if (font === 'system') {
      return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }
    return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  }

  /**
   * Initialize theme from localStorage or defaults
   */
  const initTheme = () => {
    if (!import.meta.client) return

    // Load saved preferences
    const savedPreset = localStorage.getItem(STORAGE_KEYS.PRESET) as PresetTheme | null
    const savedColor = localStorage.getItem(STORAGE_KEYS.COLOR) as ThemeColor | null
    const savedMode = localStorage.getItem(STORAGE_KEYS.MODE) as Theme | null
    const savedFont = localStorage.getItem(STORAGE_KEYS.FONT) as FontFamily | null

    // Set preset theme
    if (savedPreset && savedPreset in PRESET_THEMES) {
      currentPreset.value = savedPreset
    } else {
      currentPreset.value = 'aura'
    }

    // Set color
    if (savedColor && savedColor in COLOR_PALETTES) {
      currentColor.value = savedColor
    } else {
      currentColor.value = 'emerald'
    }

    // Apply combined theme
    applyTheme(currentPreset.value, currentColor.value)

    // Set font
    if (savedFont && savedFont in FONT_FAMILIES) {
      currentFont.value = savedFont
    } else {
      currentFont.value = 'raleway'
    }

    // Apply font
    applyFont(currentFont.value)

    // Set appearance mode
    if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
      currentMode.value = savedMode
    } else {
      currentMode.value = 'auto'
    }

    // Apply dark mode based on mode setting
    applyDarkMode()

    // Listen for system theme changes if in auto mode
    if (import.meta.client) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    }

    // Mark theme as ready
    isReady.value = true
  }

  /**
   * Handle system theme preference changes
   */
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (currentMode.value === 'auto') {
      isDark.value = e.matches
      updateDarkModeClass(e.matches)
    }
  }

  /**
   * Apply dark mode based on current mode setting
   */
  const applyDarkMode = () => {
    if (!import.meta.client) return

    let shouldBeDark = false

    if (currentMode.value === 'dark') {
      shouldBeDark = true
    } else if (currentMode.value === 'light') {
      shouldBeDark = false
    } else { // auto
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    isDark.value = shouldBeDark
    updateDarkModeClass(shouldBeDark)
  }

  /**
   * Update dark mode CSS class on document
   */
  const updateDarkModeClass = (dark: boolean) => {
    if (!import.meta.client) return

    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Switch to a different preset theme
   */
  const switchPreset = (preset: PresetTheme) => {
    if (!(preset in PRESET_THEMES)) {
      console.error(`Invalid preset theme: ${preset}`)
      return
    }

    currentPreset.value = preset
    applyTheme(preset, currentColor.value)

    // Save to localStorage
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEYS.PRESET, preset)
    }
  }

  /**
   * Switch to a different color palette
   */
  const switchColor = (color: ThemeColor) => {
    if (!(color in COLOR_PALETTES)) {
      console.error(`Invalid theme color: ${color}`)
      return
    }

    currentColor.value = color
    applyTheme(currentPreset.value, color)

    // Save to localStorage
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEYS.COLOR, color)
    }
  }

  /**
   * Set appearance mode (light/dark/auto)
   */
  const setMode = (mode: Theme) => {
    if (!['light', 'dark', 'auto'].includes(mode)) {
      console.error(`Invalid theme mode: ${mode}`)
      return
    }

    currentMode.value = mode
    applyDarkMode()

    // Save to localStorage
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEYS.MODE, mode)
    }
  }

  /**
   * Switch to a different font family
   */
  const switchFont = (font: FontFamily) => {
    if (!(font in FONT_FAMILIES)) {
      console.error(`Invalid font family: ${font}`)
      return
    }

    currentFont.value = font
    applyFont(font)

    // Save to localStorage
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEYS.FONT, font)
    }
  }

  /**
   * Get theme metadata for UI display
   */
  const getPresetInfo = (preset: PresetTheme) => {
    const info = {
      aura: {
        name: 'Aura',
        description: 'Modern and clean design with rounded corners',
      },
      lara: {
        name: 'Lara',
        description: 'Material Design inspired with subtle shadows',
      },
      material: {
        name: 'Material',
        description: 'Google Material Design implementation',
      },
      nora: {
        name: 'Nora',
        description: 'Minimalist and flat design style',
      },
    }

    return info[preset]
  }

  return {
    // State
    isDark: readonly(isDark),
    currentPreset: readonly(currentPreset),
    currentColor: readonly(currentColor),
    currentMode: readonly(currentMode),
    currentFont: readonly(currentFont),
    isReady: readonly(isReady),

    // Methods
    initTheme,
    switchPreset,
    switchColor,
    setMode,
    switchFont,
    getPresetInfo,
  }
}
