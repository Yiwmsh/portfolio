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

export const MULTI_FACED_CARD_LAYOUTS = [
  "split",
  "flip",
  "transform",
  "double_faced_token",
] as const;

export const CARD_LAYOUTS = [
  ...MULTI_FACED_CARD_LAYOUTS,
  "normal",
  "modal-dfc",
  "meld",
  "leveler",
  "class",
  "case",
  "saga",
  "adventure",
  "mutate",
  "prototype",
  "battle",
  "planar",
  "scheme",
  "vanguard",
  "token",
  "emblem",
  "augment",
  "host",
  "art_series",
  "reversible_card",
] as const;

export type CardLayout = (typeof CARD_LAYOUTS)[number];

export const isMultiFaced = (layout: CardLayout) => {
  return MULTI_FACED_CARD_LAYOUTS.some((mfcl) => mfcl === layout);
};

export interface ScryfallCard {
  id: string;
  oracle_id: string;
  name: string;
  layout: CardLayout;
  image_uris: {
    normal: string;
  };
  score?: number;
  scryfall_uri: string;
  prices: {
    usd: number;
  };
  card_faces?: {
    image_uris: {
      normal: string;
    };
  }[];
}
