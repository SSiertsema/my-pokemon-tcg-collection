import { defineStore } from 'pinia';
import type { Database } from '~/types/database';

interface CollectionState {
  ownedCards: Record<string, number>;
  wishlist: string[];
  loading: boolean;
  initialized: boolean;
}

export const useCollectionStore = defineStore('collection', {
  state: (): CollectionState => ({
    ownedCards: {},
    wishlist: [],
    loading: false,
    initialized: false,
  }),

  getters: {
    isOwned: (state) => (cardId: string) => cardId in state.ownedCards,
    isWishlisted: (state) => (cardId: string) => state.wishlist.includes(cardId),
    ownedCount: (state) => Object.keys(state.ownedCards).length,
    wishlistCount: (state) => state.wishlist.length,
    getQuantity: (state) => (cardId: string) => state.ownedCards[cardId] || 0,

    getOwnedCardsForSet: (state) => (setId: string) => {
      return Object.keys(state.ownedCards).filter((id) =>
        id.startsWith(`${setId}-`)
      );
    },

    getOwnedCardIds: (state) => Object.keys(state.ownedCards),
    getWishlistCardIds: (state) => [...state.wishlist],
  },

  actions: {
    async loadCollection() {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient<Database>();

      if (!user.value) {
        this.ownedCards = {};
        this.wishlist = [];
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
          this.ownedCards = Object.fromEntries(
            collectionData.map((item) => [item.card_id, item.quantity])
          );
        }

        // Load wishlist
        const { data: wishlistData } = await supabase
          .from('user_wishlists')
          .select('card_id');

        if (wishlistData) {
          this.wishlist = wishlistData.map((item) => item.card_id);
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

      if (cardId in this.ownedCards) {
        // Remove from collection
        delete this.ownedCards[cardId];
        await supabase
          .from('user_collections')
          .delete()
          .eq('card_id', cardId);
      } else {
        // Add to collection
        this.ownedCards[cardId] = 1;
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

      const index = this.wishlist.indexOf(cardId);
      if (index !== -1) {
        // Remove from wishlist
        this.wishlist.splice(index, 1);
        await supabase
          .from('user_wishlists')
          .delete()
          .eq('card_id', cardId);
      } else {
        // Add to wishlist
        this.wishlist.push(cardId);
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
        delete this.ownedCards[cardId];
        await supabase
          .from('user_collections')
          .delete()
          .eq('card_id', cardId);
      } else if (cardId in this.ownedCards) {
        // Update quantity
        this.ownedCards[cardId] = quantity;
        await supabase
          .from('user_collections')
          .update({ quantity })
          .eq('card_id', cardId);
      } else {
        // Add new card
        this.ownedCards[cardId] = quantity;
        await supabase.from('user_collections').insert({
          user_id: user.value.id,
          card_id: cardId,
          quantity,
        });
      }
    },

    clearCollection() {
      this.ownedCards = {};
      this.wishlist = [];
      this.initialized = false;
    },
  },
});
