import localforage from "localforage";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Deck, DeckId } from "../types";

const DECKS_COLLECTION_KEY = "decks";

export const DEFAULT_DECK: Deck = {
  guid: "",
  name: "",
  deckQueryFragment: "",
  lastUpdated: new Date(),
  goals: new Map(),
};

const decksCollection = localforage.createInstance({
  name: DECKS_COLLECTION_KEY,
});

export const useDeck = (deckId: string) =>
  useQuery([DECKS_COLLECTION_KEY, deckId], async () => {
    return (await decksCollection.getItem(deckId)) as Deck;
  });

export const useDecks = () =>
  useQuery(DECKS_COLLECTION_KEY, async () => {
    let decks: DeckId[] = [];
    const deckIds = await decksCollection.keys();

    for (const deckId of deckIds) {
      decks.push((await decksCollection.getItem(deckId)) as DeckId);
    }
    return decks;
  });

export const useUpdateDeckId = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (deck: DeckId) => {
      const fullDeck = (await decksCollection.getItem(deck.guid)) as
        | Deck
        | undefined;
      const updatedDeck: Deck = {
        ...DEFAULT_DECK,
        ...fullDeck,
        ...deck,
      };
      return decksCollection.setItem(deck.guid, updatedDeck);
    },
    onSettled: () => {
      client.invalidateQueries(DECKS_COLLECTION_KEY);
    },
  });
};

export const useUpdateDeck = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (deck: Deck) => decksCollection.setItem(deck.guid, deck),
    onSettled: () => {
      client.invalidateQueries(DECKS_COLLECTION_KEY);
      client.invalidateQueries(SELECTED_DECK_KEY);
    },
  });
};

export const useDeleteDeck = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (deckId: string) => decksCollection.removeItem(deckId),
    onSettled: () => {
      client.invalidateQueries(DECKS_COLLECTION_KEY);
    },
  });
};

export const SELECTED_DECK_KEY = "selected deck";

export const useSelectedDeck = () =>
  useQuery([SELECTED_DECK_KEY], async () => {
    const selectedDeckId: string | null = await localforage.getItem<
      string | null
    >(SELECTED_DECK_KEY);

    const selectedDeck =
      selectedDeckId != null
        ? await decksCollection.getItem<Deck>(selectedDeckId)
        : null;

    return { selectedDeckId, selectedDeck };
  });

export const useSetSelectedDeck = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (selectedDeckId?: string | null) =>
      localforage.setItem(SELECTED_DECK_KEY, selectedDeckId ?? null),
    onSettled: () => client.invalidateQueries(SELECTED_DECK_KEY),
  });
};
