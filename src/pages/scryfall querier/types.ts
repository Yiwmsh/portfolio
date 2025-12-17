export type DeckGoal = {
  name: string;
  queryTerms: string;
  score: number;
  dateLastCached?: Date;
};

export type DeckId = {
  guid: string;
  name: string;
  lastUpdated: Date;
};

export type Deck = DeckId & {
  deckQueryFragment: string;
  goals: Map<string, DeckGoal>;
};

export interface ScryfallCard {
  id: string;
  oracle_id: string;
  name: string;
  image_uris: {
    normal: string;
  };
  score?: number;
  scryfall_uri: string;
  prices: {
    usd: number;
  };
}
