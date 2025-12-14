import { defineStore } from 'pinia';
import type { Database } from '~/types/database';

interface CollectionState {
  ownedCards: Map<string, number>;
  wishlist: Set<string>;
  loading: boolean;
  initialized: boolean;
}

export const useCollectionStore = defineStore('collection', {
  state: (): CollectionState => ({
    ownedCards: new Map(),
    wishlist: new Set(),
    loading: false,
    initialized: false,
  }),

  getters: {
    isOwned: (state) => (cardId: string) => state.ownedCards.has(cardId),
    isWishlisted: (state) => (cardId: string) => state.wishlist.has(cardId),
    ownedCount: (state) => state.ownedCards.size,
    wishlistCount: (state) => state.wishlist.size,
    getQuantity: (state) => (cardId: string) => state.ownedCards.get(cardId) || 0,

    getOwnedCardsForSet: (state) => (setId: string) => {
      return [...state.ownedCards.keys()].filter((id) =>
        id.startsWith(`${setId}-`)
      );
    },

    getOwnedCardIds: (state) => [...state.ownedCards.keys()],
    getWishlistCardIds: (state) => [...state.wishlist],
  },

  actions: {
    async loadCollection() {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient<Database>();

      if (!user.value) {
        this.ownedCards = new Map();
        this.wishlist = new Set();
        this.initialized = true;
        return;
      }

      this.loading = true;

      try {
        // Load owned cards
        const { data: collectionData } = await supabase
          .from('user_collections')
          .select('card_id, quantity');

        if (collectionData) {
          this.ownedCards = new Map(
            collectionData.map((item) => [item.card_id, item.quantity] as [string, number])
          );
        }

        // Load wishlist
        const { data: wishlistData } = await supabase
          .from('user_wishlists')
          .select('card_id');

        if (wishlistData) {
          this.wishlist = new Set(wishlistData.map((item) => item.card_id));
        }
      } catch (error) {
        console.error('Failed to load collection:', error);
      } finally {
        this.loading = false;
        this.initialized = true;
      }
    },

    async toggleOwned(cardId: string) {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient<Database>();

      if (!user.value) return;

      if (this.ownedCards.has(cardId)) {
        // Remove from collection
        this.ownedCards.delete(cardId);
        await supabase
          .from('user_collections')
          .delete()
          .eq('card_id', cardId);
      } else {
        // Add to collection
        this.ownedCards.set(cardId, 1);
        await supabase.from('user_collections').insert({
          user_id: user.value.id,
          card_id: cardId,
          quantity: 1,
        });
      }
    },

    async toggleWishlist(cardId: string) {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient<Database>();

      if (!user.value) return;

      if (this.wishlist.has(cardId)) {
        // Remove from wishlist
        this.wishlist.delete(cardId);
        await supabase
          .from('user_wishlists')
          .delete()
          .eq('card_id', cardId);
      } else {
        // Add to wishlist
        this.wishlist.add(cardId);
        await supabase.from('user_wishlists').insert({
          user_id: user.value.id,
          card_id: cardId,
        });
      }
    },

    async updateQuantity(cardId: string, quantity: number) {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient<Database>();

      if (!user.value) return;

      if (quantity <= 0) {
        // Remove card
        this.ownedCards.delete(cardId);
        await supabase
          .from('user_collections')
          .delete()
          .eq('card_id', cardId);
      } else if (this.ownedCards.has(cardId)) {
        // Update quantity
        this.ownedCards.set(cardId, quantity);
        await supabase
          .from('user_collections')
          .update({ quantity })
          .eq('card_id', cardId);
      } else {
        // Add new card
        this.ownedCards.set(cardId, quantity);
        await supabase.from('user_collections').insert({
          user_id: user.value.id,
          card_id: cardId,
          quantity,
        });
      }
    },

    clearCollection() {
      this.ownedCards = new Map();
      this.wishlist = new Set();
      this.initialized = false;
    },
  },
});
