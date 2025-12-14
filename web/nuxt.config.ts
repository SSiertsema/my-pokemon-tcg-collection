import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/supabase'],
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
