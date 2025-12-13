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
    dataPath: process.env.POKEMON_DATA_PATH || '/home/sven/Projects/pokemon-data',
  },
  watch: ['!data/**', '!app/public/images/**'],
  ignore: ['data/**', 'app/public/images/**'],
  nitro: {
    watchOptions: {
      ignored: ['**/data/**', '**/public/images/**'],
    },
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/data/**', '**/public/images/**'],
      },
    },
  },
});
