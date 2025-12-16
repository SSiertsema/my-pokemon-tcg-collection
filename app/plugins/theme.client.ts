export default defineNuxtPlugin(() => {
  const { initTheme, currentPreset, currentColor, currentMode, currentFont, isDark } = useTheme()
  const themeStore = useThemeStore()

  // Initialize theme from localStorage
  initTheme()

  // Sync with store
  themeStore.init(
    currentPreset.value,
    currentColor.value,
    currentMode.value,
    currentFont.value,
    isDark.value
  )
})
