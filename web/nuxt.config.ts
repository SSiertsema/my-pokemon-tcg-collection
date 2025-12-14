import { resolve } from 'path';
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/supabase', '@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  css: ['primeicons/primeicons.css'],
  ssr: true,
  srcDir: 'app/',
  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    pokemonTcgApiKey: process.env.POKEMONTCG_API_KEY,
    dataPath: process.env.POKEMON_DATA_PATH || resolve(__dirname, '../data'),
  },
  supabase: {
    types: './app/types/database.ts',
    redirectOptions: {
      login: '/login',
      callback: '/auth/confirm',
      exclude: ['/', '/sets/*', '/search'],
    },
  },
});
