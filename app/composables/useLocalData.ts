interface SetIndex {
  id: string;
  name: string;
  releaseDate: string;
  logo: string;
  search: string[];
}

interface SetsIndex {
  sets: SetIndex[];
}

interface SetDetail {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Record<string, string>;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
  cards: string[];
}

interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  number: string;
  artist?: string;
  rarity?: string;
  images: {
    small: string;
    large: string;
  };
  [key: string]: unknown;
}

// Compact card index entry (short keys to reduce payload size)
// i=id, n=name, si=setId, sn=setName, sr=series, t=types, st=supertype, sb=subtypes, r=rarity, nr=number
export interface CardIndexEntry {
  i: string;    // id
  n: string;    // name
  si: string;   // setId
  sn: string;   // setName
  sr: string;   // series
  t: string[];  // types
  st: string;   // supertype
  sb: string[]; // subtypes
  r: string;    // rarity
  nr: string;   // number
}

async function fetchData<T>(path: string): Promise<T> {
  return await $fetch<T>(path);
}

export function useLocalData() {
  async function getSetsIndex(): Promise<SetsIndex> {
    return await fetchData<SetsIndex>('/data/sets.json');
  }

  async function getSet(id: string): Promise<SetDetail> {
    return await fetchData<SetDetail>(`/data/sets/${id}.json`);
  }

  async function getCard(id: string): Promise<Card> {
    return await fetchData<Card>(`/data/cards/${id}.json`);
  }

  async function getCardsForSet(cardIds: string[]): Promise<Card[]> {
    const cards = await Promise.all(
      cardIds.map(async (id) => {
        try {
          return await fetchData<Card>(`/data/cards/${id}.json`);
        } catch {
          return null;
        }
      })
    );
    return cards.filter((card): card is Card => card !== null);
  }

  async function getCardsIndex(): Promise<CardIndexEntry[]> {
    return await fetchData<CardIndexEntry[]>('/data/cards-index.json');
  }

  return {
    getSetsIndex,
    getSet,
    getCard,
    getCardsForSet,
    getCardsIndex,
  };
}
