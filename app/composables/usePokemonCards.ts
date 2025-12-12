import { ref } from 'vue';
import type { Card, QueryParams } from '~/types/pokemon-tcg';

export function usePokemonCards() {
  const api = usePokemonTcgApi();

  const cards = ref<Card[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function findCard(id: string) {
    loading.value = true;
    error.value = null;

    try {
      return await api.getCardById(id);
    } catch (e) {
      error.value = e as Error;
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function searchCards(query: string, params?: QueryParams) {
    loading.value = true;
    error.value = null;

    try {
      cards.value = await api.searchCards(query, params);
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  async function searchCardsByName(name: string, params?: QueryParams) {
    return searchCards(`name:${name}*`, params);
  }

  async function getCardsInSet(setId: string, params?: QueryParams) {
    loading.value = true;
    error.value = null;

    try {
      cards.value = await api.getCardsInSet(setId, params);
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  return {
    cards,
    loading,
    error,
    findCard,
    searchCards,
    searchCardsByName,
    getCardsInSet,
  };
}
