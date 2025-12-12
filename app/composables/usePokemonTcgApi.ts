import type { ApiResponse, Card, Set, QueryParams } from '~/types/pokemon-tcg';

export function usePokemonTcgApi() {
  async function fetchApi<T>(
    endpoint: string,
    params?: QueryParams
  ): Promise<ApiResponse<T>> {
    const queryParams = new URLSearchParams();

    if (params?.q) queryParams.set('q', params.q);
    if (params?.page) queryParams.set('page', String(params.page));
    if (params?.pageSize) queryParams.set('pageSize', String(params.pageSize));
    if (params?.orderBy) queryParams.set('orderBy', params.orderBy);
    if (params?.select) queryParams.set('select', params.select);

    const queryString = queryParams.toString();
    const url = `/api/pokemon${endpoint}${queryString ? `?${queryString}` : ''}`;

    return await $fetch<ApiResponse<T>>(url);
  }

  async function getAllSets(params?: QueryParams): Promise<Set[]> {
    const response = await fetchApi<Set[]>('/sets', params);
    return response.data;
  }

  async function getSetById(id: string): Promise<Set> {
    const response = await fetchApi<Set>(`/sets/${id}`);
    return response.data;
  }

  async function searchSets(
    query: string,
    params?: QueryParams
  ): Promise<Set[]> {
    const response = await fetchApi<Set[]>('/sets', { ...params, q: query });
    return response.data;
  }

  async function getAllCards(params?: QueryParams): Promise<Card[]> {
    const response = await fetchApi<Card[]>('/cards', params);
    return response.data;
  }

  async function getCardById(id: string): Promise<Card> {
    const response = await fetchApi<Card>(`/cards/${id}`);
    return response.data;
  }

  async function searchCards(
    query: string,
    params?: QueryParams
  ): Promise<Card[]> {
    const response = await fetchApi<Card[]>('/cards', { ...params, q: query });
    return response.data;
  }

  async function getCardsInSet(
    setId: string,
    params?: QueryParams
  ): Promise<Card[]> {
    return searchCards(`set.id:${setId}`, params);
  }

  return {
    getAllSets,
    getSetById,
    searchSets,
    getAllCards,
    getCardById,
    searchCards,
    getCardsInSet,
  };
}
