export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');

  const url = `https://api.pokemontcg.io/v2/cards/${id}`;

  const headers: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
  };
  if (config.pokemonTcgApiKey) {
    headers['X-Api-Key'] = config.pokemonTcgApiKey;
  }

  const response = await $fetch(url, { headers });
  return response;
});
