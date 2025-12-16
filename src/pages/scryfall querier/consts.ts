export const VIEWS = ["Decks", "Query"] as const;

export type ScryfallQuerierView = (typeof VIEWS)[number];
