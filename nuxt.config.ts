import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: false
        }
      },
      ripple: true,
      inputVariant: 'filled'
    },
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      Roboto: [400, 500, 700],
      Montserrat: [400, 600, 700],
      Raleway: [400, 600, 700],
      'Source Sans Pro': [400, 600, 700],
      Oswald: [400, 500, 700],
      Merriweather: [400, 700],
      'Playfair Display': [400, 700],
      Lora: [400, 700],
      'Crimson Text': [400, 700],
      'Bebas Neue': [400],
      'JetBrains Mono': [400, 500, 700]
    },
    display: 'swap',
    preload: true,
    prefetch: true,
    preconnect: true,
    download: false,
    inject: true
  },
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],
  ssr: true,
  srcDir: 'app/',
  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    pokemonTcgApiKey: process.env.POKEMONTCG_API_KEY,
  },
  supabase: {
    types: false,
    redirectOptions: {
      login: '/login',
      callback: '/auth/confirm',
      exclude: ['/', '/sets/*', '/search'],
    },
  },
});
