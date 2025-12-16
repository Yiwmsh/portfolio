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
