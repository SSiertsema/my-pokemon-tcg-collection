import { defineStore } from 'pinia';

interface CollectionState {
  ownedCards: Set<string>;
  wishlist: Set<string>;
}

export const useCollectionStore = defineStore('collection', {
  state: (): CollectionState => ({
    ownedCards: new Set(),
    wishlist: new Set(),
  }),

  getters: {
    isOwned: (state) => (cardId: string) => state.ownedCards.has(cardId),
    isWishlisted: (state) => (cardId: string) => state.wishlist.has(cardId),
    ownedCount: (state) => state.ownedCards.size,
    wishlistCount: (state) => state.wishlist.size,

    getOwnedCardsForSet: (state) => (setId: string) => {
      return [...state.ownedCards].filter((id) => id.startsWith(`${setId}-`));
    },
  },

  actions: {
    toggleOwned(cardId: string) {
      if (this.ownedCards.has(cardId)) {
        this.ownedCards.delete(cardId);
      } else {
        this.ownedCards.add(cardId);
      }
    },

    toggleWishlist(cardId: string) {
      if (this.wishlist.has(cardId)) {
        this.wishlist.delete(cardId);
      } else {
        this.wishlist.add(cardId);
      }
    },

    addOwned(cardId: string) {
      this.ownedCards.add(cardId);
    },

    removeOwned(cardId: string) {
      this.ownedCards.delete(cardId);
    },

    addToWishlist(cardId: string) {
      this.wishlist.add(cardId);
    },

    removeFromWishlist(cardId: string) {
      this.wishlist.delete(cardId);
    },
  },
});
