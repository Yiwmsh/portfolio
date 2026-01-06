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
  "transform",
  "double_faced_token",
] as const;

export const SINGLE_FACED_CARD_LAYOUTS = [
  "split",
  "flip",
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

export const CARD_LAYOUTS = [
  ...MULTI_FACED_CARD_LAYOUTS,
  ...SINGLE_FACED_CARD_LAYOUTS,
] as const;

export type MultiFacedCardLayout = (typeof MULTI_FACED_CARD_LAYOUTS)[number];
export type SingleFacedCardLayout = (typeof SINGLE_FACED_CARD_LAYOUTS)[number];
export type CardLayout = (typeof CARD_LAYOUTS)[number];

export const isMultiFaced = (
  card: ScryfallCard
): card is ScryfallDoubleFacedCard => {
  if (card.image_uris == null) {
    return true;
  } else {
    return false;
  }
};

export const getCardFaces = (card: ScryfallCard) => {
  if (isMultiFaced(card)) {
    return [
      card.card_faces[0].image_uris.normal,
      card.card_faces[1].image_uris.normal,
    ];
  } else {
    return [card.image_uris.normal];
  }
};

export type ScryfallCardBase = {
  id: string;
  oracle_id: string;
  name: string;
  score?: number;
  scryfall_uri: string;
  prices: {
    usd: number;
  };
};

export type ScryfallDoubleFacedCard = ScryfallCardBase & {
  layout: MultiFacedCardLayout;
  image_uris: undefined;
  card_faces: {
    image_uris: {
      normal: string;
    };
  }[];
};

export type ScryfallSingleFacedCard = ScryfallCardBase & {
  layout: SingleFacedCardLayout;
  image_uris: {
    normal: string;
  };
  card_faces?: {
    image_uris?: {
      normal: string;
    };
  }[];
};

export type ScryfallCard = ScryfallSingleFacedCard | ScryfallDoubleFacedCard;
