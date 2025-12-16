import { useCollectionStore } from '~/stores/collection';

export default defineNuxtPlugin(() => {
  const user = useSupabaseUser();
  const collectionStore = useCollectionStore();

  // Watch for auth state changes
  watch(
    user,
    async (newUser) => {
      if (newUser) {
        // User logged in - load their collection
        await collectionStore.loadCollection();
      } else {
        // User logged out - clear collection
        collectionStore.clearCollection();
      }
    },
    { immediate: true }
  );
});
