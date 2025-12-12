import { ref } from 'vue';
import type { Set, QueryParams } from '~/types/pokemon-tcg';

export function usePokemonSets() {
  const api = usePokemonTcgApi();

  const sets = ref<Set[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function fetchAllSets(params?: QueryParams) {
    loading.value = true;
    error.value = null;

    try {
      sets.value = await api.getAllSets(params);
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  async function findSet(id: string) {
    loading.value = true;
    error.value = null;

    try {
      return await api.getSetById(id);
    } catch (e) {
      error.value = e as Error;
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function searchSets(query: string, params?: QueryParams) {
    loading.value = true;
    error.value = null;

    try {
      sets.value = await api.searchSets(query, params);
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  return {
    sets,
    loading,
    error,
    fetchAllSets,
    findSet,
    searchSets,
  };
}
