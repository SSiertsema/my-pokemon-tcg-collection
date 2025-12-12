export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const params = new URLSearchParams();
  if (query.q) params.set('q', String(query.q));
  if (query.page) params.set('page', String(query.page));
  if (query.pageSize) params.set('pageSize', String(query.pageSize));
  if (query.orderBy) params.set('orderBy', String(query.orderBy));

  const queryString = params.toString();
  const url = `https://api.pokemontcg.io/v2/cards${queryString ? `?${queryString}` : ''}`;

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
