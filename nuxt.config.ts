export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  srcDir: 'app/',
  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    pokemonTcgApiKey: process.env.POKEMONTCG_API_KEY,
  },
});
